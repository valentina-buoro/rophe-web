"use client";
import { useState, useEffect } from "react";
import { getMidnightProvider } from "../scripts/midnight-provider";
import { useWalletStore } from "@/lib/walletStore";
import { contractService } from "@/lib/CONTRACT_SERVICE";
import { CONTRACT_CONFIG } from "@/lib/CONTRACT_CONFIG";
import SymptomScreen from "@/components/symptom-tracker";
import RecentMedication from "@/components/recent-medication";
import Navbar from "@/components/navbar";

import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const mockMoodHistory = [
    {
      date: "2024-09-26",
      mood: "😊",
      intensity: 8,
      note: "Great day at work!",
      nft: true,
    },
    {
      date: "2024-09-25",
      mood: "😔",
      intensity: 4,
      note: "Feeling overwhelmed",
      nft: false,
    },
    {
      date: "2024-09-24",
      mood: "😴",
      intensity: 6,
      note: "Tired but okay",
      nft: false,
    },
  ];
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const provider = getMidnightProvider();
      if (!provider)
        throw new Error(
          "Midnight provider not injected. Open Lace (Midnight testnet profile) and reload."
        );

      // 🔴 old: await provider.enable(); window.dispatchEvent(new CustomEvent("midnight:connected"));
      // ✅ new: pass the API in the event detail
      const api =
        typeof provider.enable === "function"
          ? await provider.enable()
          : provider;

      setConnected(true);
      window.dispatchEvent(
        new CustomEvent("midnight:connected", { detail: { api, provider } })
      );
    } catch (err: any) {
      alert(err?.message || String(err));
      console.error("Wallet connection failed:", err);
    }
  };

  const [contractState, setContractState] = useState(contractService.getState());
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

  const handleInputChange = (paramName: string, value: string) => {
    setInputValues(prev => ({ ...prev, [paramName]: value }));
  };

  const executeFunction = async (functionName: string, params: string[]) => {
    if (!connected) {
      toast.error('Please connect your Midnight Lace wallet');
      return;
    }

    setLoading(true);
    try {
      const args = params.map(param => inputValues[param]);
      const result = await contractService.callFunction(functionName, args);
      if (result.success) {
        toast.success(result.message || `${functionName} executed successfully!`);
        setContractState(contractService.getState());
        setInputValues({}); // Clear inputs after successful execution
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Contract execution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#100C08] min-h-screen px-16 py-16">
      <Navbar connected={connected} />

      <div className="text-center mt-10">
        <h2 className="text-[#ED9F00] text-2xl text center font-bold md:text-4xl">
          {" "}
          How are you feeling today?
        </h2>
      </div>
      <div>
        <SymptomScreen />
      </div>

      <div className="grid grid-cols-2 gap-16 px-10  pt-1">
        <div>
          <div className="text-left pt-10  font-semibold">
            <p className="text-[#F8F8FF] text-lg">Recent Mood -last 7 days</p>
          </div>
          <div className="">
            <div className="space-y-6">
              {mockMoodHistory.map((entry, index) => (
                <div
                  key={index}
                  className=" shadow-xl shadow-[#005AEE] text-[#F8F8FF] rounded-xl px-10 py-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.mood}</span>
                      <div>
                        <div className="font-medium text-[#F8F8FF]">
                          {entry.date}
                        </div>
                        <div className="text-sm text-[#F8F8FF]">
                          Intensity: {entry.intensity}/10
                        </div>
                      </div>
                    </div>
                  </div>
                  {entry.note && (
                    <div className="mt-2 text-[#F8F8FF] text-sm  p-2 ">
                      {entry.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <RecentMedication />
        </div>
      </div>

      {!connected && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4 w-full bg-white/10 bg-opacity-0">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full h-[40vh] overflow-y-auto">
            <div className="bg-[#100C08] py-10 flex flex-col justify-between items-center h-full text-white p-4 rounded-t-xl">
              <div className="">
                <p className="text-3xl font-bold">Welcome to Rophe👋🏼</p>
                <p className="text-lg font-semibold">Please connect to your midnight wallet</p>
              </div>

              <div>
                <button
                  onClick={connectWallet}
                  className="px-4 py-3 rounded-lg bg-[#005AEE] text-[#F8F8FF] font-semibold  inset-shadow-sm  inset-shadow-[#031636]"
                >
                  {"Connect Midnight Lace Wallet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
