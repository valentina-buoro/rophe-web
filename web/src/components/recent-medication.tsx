"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  prescribed: string;
  commonSideEffects: string[];
}

interface SideEffectFormData {
  effects: string[];
  severity: number;
  notes: string;
  time: string;
}

interface SelectedMedication {
  id: number;
  name: string;
}

interface SideEffectReport {
  medicationId: number;
  medicationName: string;
  effects: string[];
  severity: number;
  notes: string;
  time: string;
  timestamp: string;
}

const RecentMedication = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [sideEffectReports, setSideEffectReports] = useState<
    Record<string, SideEffectReport[]>
  >({});
  const [showSideEffectModal, setShowSideEffectModal] = useState(false);
  const [showReportedSideEffects, setShowReportedSideEffects] = useState(false)

  const [selectedMedication, setSelectedMedication] =
    useState<SelectedMedication | null>(null);
  const [sideEffectFormData, setSideEffectFormData] =
    useState<SideEffectFormData>({
      effects: [],
      severity: 1,
      notes: "",
      time: new Date().toTimeString().slice(0, 5),
    });

  const mockMedications: Medication[] = [
    {
      id: 1,
      name: "Sertraline",
      dosage: "50mg",
      time: "09:00",
      frequency: "Daily",
      prescribed: "2024-08-15",
      commonSideEffects: [
        "Nausea",
        "Dizziness",
        "Drowsiness",
        "Dry mouth",
        "Insomnia",
      ],
    },
    {
      id: 2,
      name: "Melatonin",
      dosage: "3mg",
      time: "22:00",
      frequency: "Daily",
      prescribed: "2024-09-01",
      commonSideEffects: ["Drowsiness", "Headache", "Dizziness", "Nausea"],
    },
  ];

  useEffect(() => {
    setMedications(mockMedications);

    // Initialize medication tracking for today
    const today = new Date().toISOString().split("T")[0];
  }, []);

  const openReportedSideEffect =()=>{
    setShowReportedSideEffects(!showReportedSideEffects)
  }

  const reportSideEffect = (medId: number, medName: string) => {
    setSelectedMedication({ id: medId, name: medName });
    setShowSideEffectModal(true);
    setSideEffectFormData({
      effects: [],
      severity: 1,
      notes: "",
      time: new Date().toTimeString().slice(0, 5),
    });
  };

  const addSideEffectToReport = (effect: string) => {
    if (!sideEffectFormData.effects.includes(effect)) {
      setSideEffectFormData((prev) => ({
        ...prev,
        effects: [...prev.effects, effect],
      }));
    }
  };

  const removeSideEffectFromReport = (effect: string) => {
    setSideEffectFormData((prev) => ({
      ...prev,
      effects: prev.effects.filter((e) => e !== effect),
    }));
  };

  const submitSideEffectReport = () => {
    if (selectedMedication && sideEffectFormData.effects.length > 0) {
      const report = {
        medicationId: selectedMedication.id,
        medicationName: selectedMedication.name,
        ...sideEffectFormData,
        timestamp: new Date().toISOString(),
      };

      setSideEffectReports((prev) => ({
        ...prev,
        [selectedMedication.id]: [
          ...(prev[selectedMedication.id] || []),
          report,
        ],
      }));

      setShowSideEffectModal(false);
      setSelectedMedication(null);
      setSideEffectFormData({
        effects: [],
        severity: 1,
        notes: "",
        time: new Date().toTimeString().slice(0, 5),
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-10  font-semibold">
        <p className="text-[#F8F8FF] text-lg">Recent Medications</p>
        <Link href='/add-medication' className="underline text-[#F8F8FF]"> Add New Medication</Link>
      </div>

      {medications.map((med) => {
        return (
          <div
            key={med.id}
            className="border-[#005AEE] border-2  text-[#F8F8FF] rounded-xl px-10 py-5 mt-4"
          >
            <div className="text-lg font-semibold text-[#F8F8FF] ">
              {med.name}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-900 font-medium ">
                <span className="bg-[#ED3F27] px-2 py-1 rounded mr-2">
                  {med.dosage}
                </span>
                <span className="bg-[#134686] px-2 py-1 rounded mr-2">
                  {med.time}
                </span>
                <span className="bg-[#FEB21A] px-2 py-1 rounded">
                  {med.frequency}
                </span>
              </div>
              <button
                onClick={() => reportSideEffect(med.id, med.name)}
                className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium hover:bg-amber-200 transition-all"
              >
                Report Side Effects
              </button>
            </div>
          </div>
        );
      })}

      <div className="mt-10">
        <button
        onClick={()=>openReportedSideEffect()}
          className="text-[#F8F8FF] underline"
        >
          {showReportedSideEffects? 'Close ': 'See '}
           Reported Side Effects
        </button>
      </div>

      {/* Side Effect Reporting Modal */}
      {showSideEffectModal && selectedMedication && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-[#005AEE] text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Report Side Effect</h3>
                  <p className="text-amber-100 text-sm">
                    {selectedMedication.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowSideEffectModal(false)}
                  className="text-white hover:text-amber-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which side effects are you experiencing? *
                </label>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {medications
                    .find((m) => m.id === selectedMedication.id)
                    ?.commonSideEffects?.map((effect) => (
                      <button
                        key={effect}
                        type="button"
                        onClick={() => addSideEffectToReport(effect)}
                        className={`p-2 text-sm rounded-lg transition-all border ${
                          sideEffectFormData.effects.includes(effect)
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-red-300"
                        }`}
                      >
                        {effect}
                      </button>
                    )) || []}
                </div>

                {sideEffectFormData.effects.length > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-xs font-medium text-red-800 mb-2">
                      Selected:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sideEffectFormData.effects.map((effect) => (
                        <div
                          key={effect}
                          className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                          {effect}
                          <button
                            onClick={() => removeSideEffectFromReport(effect)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity: {sideEffectFormData.severity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sideEffectFormData.severity}
                  onChange={(e) =>
                    setSideEffectFormData((prev) => ({
                      ...prev,
                      severity: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mild</span>
                  <span>Severe</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={sideEffectFormData.time}
                    onChange={(e) =>
                      setSideEffectFormData((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={sideEffectFormData.notes}
                    onChange={(e) =>
                      setSideEffectFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Optional details..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-blue-800">
                  <strong>Privacy:</strong> Data encrypted & anonymously shared
                  with researchers.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={submitSideEffectReport}
                  className="flex-1 bg-[#005AEE] text-white py-2 px-3 rounded-lg font-medium hover:from-amber-600 hover:to-red-600 transition-all"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowSideEffectModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {
        showReportedSideEffects && (
            <div>
            {Object.keys(sideEffectReports).length > 0 && (
              <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
                  <span>⚠️</span>
                  Recent Side Effect Reports
                </h4>
                <div className="space-y-2">
                  {Object.values(sideEffectReports)
                    .flat()
                    .slice(-3)
                    .map((report, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-800">
                            {report.medicationName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(report.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Severity: {report.severity}/10
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {report.effects.map((effect: string) => (
                            <span
                              key={effect}
                              className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs"
                            >
                              {effect}
                            </span>
                          ))}
                        </div>
                        {report.notes && (
                          <div className="text-xs text-gray-500 mt-2 italic">
                            "{report.notes}"
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )
     }
    </div>
  );
};

export default RecentMedication;
