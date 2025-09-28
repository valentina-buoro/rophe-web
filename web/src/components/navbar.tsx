"use client"
import { useState } from "react";
import { getMidnightProvider } from "../scripts/midnight-provider";

export default function Navbar({
    connected
}: { connected: boolean }) {
  
    
  return (
    <nav className="fixed top-0 left-0 w-full h-[5rem] flex items-center justify-end pr-8 z-50 bg-[#100C08]">
      <button
        
        className="px-5 py-4 rounded-lg bg-[#005AEE] text-[#F8F8FF] font-semibold  inset-shadow-sm  inset-shadow-[#031636]"
      >
        {connected ? "✅ Connected" : "❌ Not Connected to Midnight"}
      </button>
    </nav>
  );
}