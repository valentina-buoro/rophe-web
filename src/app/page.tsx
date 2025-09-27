import Image from "next/image";
import Link from 'next/link'
import SymptomScreen from "./(symptom-tracker)/page";
import axios from "axios";

export default function Home() {
  return (
    <div className="bg-[#100C08] min-h-screen px-16 py-16">
      <div className="flex justify-end items-center">
        <button className="px-5 py-4 rounded-lg bg-[#005AEE] text-[#F8F8FF] ">
          {" "}
        <Link href='/add-medication'>  Add New Medication</Link>
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-[#ED9F00] text-2xl text center font-bold md:text-4xl">
          {" "}
          How are you feeling today?
        </h2>
      </div>
      <div>
        <SymptomScreen/>
      </div>

      <div className="text-left pt-10 pl-10 font-semibold">
        <p className="text-[#F8F8FF] text-lg">Recent Medications</p>
      </div>
      <div className="grid grid-cols-2 gap-16 px-10  pt-1">
        <div className="border-[#005AEE] border-2 col-span-1 text-[#F8F8FF] rounded-xl px-10 py-8">
          <div className="grid grid-cols-2">
            <p className="col-span-1">Medication Name</p>
            <p className="col-span-1">Paracetamol</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="col-span-1">Dosage Strength</p>
            <p className="col-span-1">500mg</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="col-span-1">Dosage Frequency</p>
            <p className="col-span-1">Once daily</p>
          </div>
          <div className="pt-10">
            <p>Side effects experiencing</p>
          </div>
        </div>
        <div className="border-[#005AEE] border-2 col-span-1 text-[#F8F8FF] rounded-xl px-10 py-8">
          <div className="grid grid-cols-2">
            <p className="col-span-1">Medication Name</p>
            <p className="col-span-1">Paracetamol</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="col-span-1">Dosage Strength</p>
            <p className="col-span-1">500mg</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="col-span-1">Dosage Frequency</p>
            <p className="col-span-1">Once daily</p>
          </div>
          <div className="pt-10">
            <p>Side effects experiencing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
