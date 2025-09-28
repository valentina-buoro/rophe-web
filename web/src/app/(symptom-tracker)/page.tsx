"use client";

import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  Users,
  Award,
  Wallet,
  Plus,
  BarChart3,
  Share2,
} from "lucide-react";

export default function SymptomScreen() {
  const [selectedMood, setSelectedMood] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😔", label: "Sad", color: "bg-blue-400" },
    { emoji: "😡", label: "Angry", color: "bg-red-400" },
    { emoji: "😰", label: "Anxious", color: "bg-purple-400" },
    { emoji: "😴", label: "Tired", color: "bg-gray-400" },
    { emoji: "🤔", label: "Thoughtful", color: "bg-green-400" },
    { emoji: "🥳", label: "Excited", color: "bg-pink-400" },
    { emoji: "😌", label: "Peaceful", color: "bg-indigo-400" },
  ];

  const submitMood = () => {
    if (!selectedMood) return;

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      mood: selectedMood,
      intensity,
      note,
      nft: Math.random() > 0.7, // 30% chance of rare mood NFT
    };

    // Reset form
    setSelectedMood("");
    setIntensity(5);
    setNote("");

    alert(
      `🎉 Mood recorded! +10 MOOD tokens earned ${
        newEntry.nft ? "🏆 Rare Mood NFT unlocked!" : ""
      }`
    );
  };

  return (
    <>
      <div className="grid grid-cols-8 gap-3 mb-6 pt-10">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            onClick={() => setSelectedMood(mood.emoji)}
            className={`p-4 cursor-pointer transition-all hover:scale-105 hover:border-[#21252c] ${
              selectedMood === mood.emoji
                ? "rounded-xl border-2 border-[#005AEE] bg-[#1b1e32] shadow-lg"
                : " hover:border-[#719adc]"
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-gray-600">
              {mood.label}
            </div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-4 bg-[#1b1e32] p-4 rounded-lg border">
          <div>
            <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
              Intensity: {intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e: any) => setIntensity(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-base font-medium text-[#F8F8FF] mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
              Describe how you are feeling
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ie nauseous,having headaches"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <p>Are you taking any medications?</p>
          </div>

          <button
            onClick={submitMood}
            className=" bg-[#005AEE] text-[#F8F8FF] py-3 px-4 rounded-lg font-medium  transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Record Mood
          </button>
        </div>
      )}
    </>
  );
  // ...
}
