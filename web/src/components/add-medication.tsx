"use client";

import React, { useState } from "react";
import { Plus, X, Pill, AlertTriangle } from "lucide-react";

interface FormData {
  name: string;
  dosage: string;
  unit?: string;
  frequency: string;
  sideEffects: string[];
}

const AddMedicationForm = ({
  setShowAddMedicationModal,
}: {
  setShowAddMedicationModal: (value: boolean) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dosage: "",
    unit: "mg",
    frequency: "daily",
    sideEffects: [],
  });

  const [customSideEffect, setCustomSideEffect] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const frequencyOptions = [
    { value: "daily", label: "Once Daily", times: 1 },
    { value: "twice-daily", label: "Twice Daily", times: 2 },
    { value: "three-times", label: "Three Times Daily", times: 3 },
    { value: "four-times", label: "Four Times Daily", times: 4 },
    { value: "weekly", label: "Weekly", times: 1 },
    { value: "as-needed", label: "As Needed", times: 0 },
  ];

  const unitOptions = ["mg", "ml", "tablets", "drops", "puffs", "units"];

  const commonSideEffects = [
    "Nausea",
    "Dizziness",
    "Drowsiness",
    "Headache",
    "Dry mouth",
    "Insomnia",
    "Fatigue",
    "Loss of appetite",
    "Weight gain",
    "Anxiety",
  ];

  const purposeOptions = [
    "Depression",
    "Anxiety",
    "Bipolar disorder",
    "ADHD",
    "Sleep disorders",
    "Pain management",
    "High blood pressure",
    "Diabetes",
    "Other",
  ];

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFrequencyChange = (frequency: string) => {
    const option = frequencyOptions.find((opt) => opt.value === frequency);
    const newTimes: string[] = [];

    if (option?.times === 1) {
      newTimes.push("09:00");
    } else if (option?.times === 2) {
      newTimes.push("09:00", "21:00");
    } else if (option?.times === 3) {
      newTimes.push("08:00", "14:00", "20:00");
    } else if (option?.times === 4) {
      newTimes.push("08:00", "12:00", "16:00", "20:00");
    }

    setFormData((prev) => ({
      ...prev,
      frequency,
      times: newTimes,
    }));
  };

  const addSideEffect = (effect: string) => {
    if (!formData.sideEffects.includes(effect)) {
      setFormData((prev) => ({
        ...prev,
        sideEffects: [...prev.sideEffects, effect],
      }));
    }
  };

  const removeSideEffect = (effect: string) => {
    setFormData((prev) => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((se) => se !== effect),
    }));
  };

  const addCustomSideEffect = () => {
    if (
      customSideEffect.trim() &&
      !formData.sideEffects.includes(customSideEffect.trim())
    ) {
      addSideEffect(customSideEffect.trim());
      setCustomSideEffect("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData.name || !formData.dosage) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      alert("🎉 Medication added.");
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dosage: "",
      unit: "mg",
      frequency: "daily",
      sideEffects: [],
    });
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 bg-white/10 bg-opacity-0 flex items-center justify-center z-50  p-4 overflow-y-scroll">
      <div className="h-[90vh] overflow-y-scroll">
      <div className="bg-[#100C08] rounded-xl shadow-lg border ">
        <div onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <div className="space-y-6">
            <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-[#F8F8FF] flex items-center gap-2">
              <div className="w-4 h-4 bg-[#005AEE] rounded-full flex items-center justify-center text-white text-sm">
                1
              </div>
              Basic Information
            </h2>
            <div>
            <button
              onClick={() => setShowAddMedicationModal(false)}
              className="text-white hover:text-amber-200"
            >
              <X size={20} />
            </button>
          </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Medication Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Sertraline"
                  className="w-full placeholder:text-amber-50 placeholder:text-sm text-white  p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Dosage *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    value={formData.dosage}
                    onChange={(e) =>
                      handleInputChange("dosage", e.target.value)
                    }
                    placeholder="50"
                    className="flex-1 p-3 placeholder:text-amber-50 placeholder:text-sm text-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                    className="w-24 p-3 placeholder:text-amber-50 placeholder:text-sm text-white border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  >
                    {unitOptions.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg text-[#F8F8FF] font-semibold  flex items-center gap-2">
              <div className="w-4 h-4 bg-[#005AEE] rounded-full flex items-center justify-center text-[#F8F8FF] text-xs">
                2
              </div>
              Schedule & Frequency
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Frequency *
                </label>
                <select
                  required
                  value={formData.frequency}
                  onChange={(e) => handleFrequencyChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                >
                  {frequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F8F8FF]  flex items-center gap-2">
              <div className="w-4 h-4 bg-[#005AEE] rounded-full flex items-center justify-center text-[#F8F8FF]  text-xs">
                3
              </div>
              Medical Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-[#F8F8FF] mb-1">
                <AlertTriangle
                  size={16}
                  className="inline mr-1 text-amber-500"
                />
                Known Side Effects
              </label>

              <div className="mb-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSideEffect}
                    onChange={(e) => setCustomSideEffect(e.target.value)}
                    placeholder="Add custom side effect"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCustomSideEffect())
                    }
                  />
                  <button
                    type="button"
                    onClick={addCustomSideEffect}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                {commonSideEffects.map((effect) => (
                  <button
                    key={effect}
                    type="button"
                    onClick={() => addSideEffect(effect)}
                    className={`p-1 text-xs rounded-md transition-all ${
                      formData.sideEffects.includes(effect)
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {effect}
                  </button>
                ))}
              </div>

              {formData.sideEffects.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-2">
                    Selected side effects:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.sideEffects.map((effect) => (
                      <div
                        key={effect}
                        className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {effect}
                        <button
                          type="button"
                          onClick={() => removeSideEffect(effect)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          {/*<div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#F8F8FF] flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                  4
                </div>
                Preferences
              </h2>

               <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="reminder"
                  // checked={formData.reminder}
                  // onChange={(e) => handleInputChange('reminder', e.target.checked)}
                  className="w-5 h-5 text-purple-500 border-gray-300 rounded "
                />
                <label
                  htmlFor="reminder"
                  className="text-sm font-medium text-[#F8F8FF]"
                >
                  Enable smart contract reminders and compliance tracking
                </label>
              </div> 
            </div>*/}

          {/* Blockchain Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔗</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-blue-800 mb-2">
                  Blockchain Security & Privacy
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>
                    • Your medication data will be encrypted and stored on the
                    blockchain
                  </li>
                  <li>• Smart contracts will automatically track adherence</li>
                  <li>• Only you control access to your health data</li>
                  <li>
                    • Anonymous research participation opportunities available
                  </li>
                  <li>
                    • Immutable audit trail for insurance and medical providers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-[#005AEE] text-white py-4 px-6 rounded-lg font-semibold hover:to-pink-600 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Plus size={20} />
              Add Medication to Blockchain
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Clear Form
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            By adding this medication, you agree to our Terms of Service and
            Privacy Policy
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddMedicationForm;
