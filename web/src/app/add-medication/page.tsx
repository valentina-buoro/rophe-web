"use client";

import React, { useState } from 'react';
import { Plus, X, Clock, Pill, Calendar, AlertTriangle, Check } from 'lucide-react';

interface FormData {
  name: string;
  genericName: string;
  dosage: string;
  unit: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  prescribedBy: string;
  purpose: string;
  sideEffects: string[];
  instructions: string;
  withFood: string;
  reminder: boolean;
}

const AddMedicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    genericName: '',
    dosage: '',
    unit: 'mg',
    frequency: 'daily',
    times: ['09:00'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescribedBy: '',
    purpose: '',
    sideEffects: [],
    instructions: '',
    withFood: 'optional',
    reminder: true
  });

  const [customSideEffect, setCustomSideEffect] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Once Daily', times: 1 },
    { value: 'twice-daily', label: 'Twice Daily', times: 2 },
    { value: 'three-times', label: 'Three Times Daily', times: 3 },
    { value: 'four-times', label: 'Four Times Daily', times: 4 },
    { value: 'weekly', label: 'Weekly', times: 1 },
    { value: 'as-needed', label: 'As Needed', times: 0 }
  ];

  const unitOptions = ['mg', 'ml', 'tablets', 'drops', 'puffs', 'units'];

  const commonSideEffects = [
    'Nausea', 'Dizziness', 'Drowsiness', 'Headache', 'Dry mouth', 
    'Insomnia', 'Fatigue', 'Loss of appetite', 'Weight gain', 'Anxiety'
  ];

  const purposeOptions = [
    'Depression', 'Anxiety', 'Bipolar disorder', 'ADHD', 'Sleep disorders',
    'Pain management', 'High blood pressure', 'Diabetes', 'Other'
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFrequencyChange = (frequency: string) => {
    const option = frequencyOptions.find(opt => opt.value === frequency);
    const newTimes: string[] = [];
    
    if (option?.times === 1) {
      newTimes.push('09:00');
    } else if (option?.times === 2) {
      newTimes.push('09:00', '21:00');
    } else if (option?.times === 3) {
      newTimes.push('08:00', '14:00', '20:00');
    } else if (option?.times === 4) {
      newTimes.push('08:00', '12:00', '16:00', '20:00');
    }

    setFormData(prev => ({
      ...prev,
      frequency,
      times: newTimes
    }));
  };

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = time;
    setFormData(prev => ({
      ...prev,
      times: newTimes
    }));
  };

  const addSideEffect = (effect: string) => {
    if (!formData.sideEffects.includes(effect)) {
      setFormData(prev => ({
        ...prev,
        sideEffects: [...prev.sideEffects, effect]
      }));
    }
  };

  const removeSideEffect = (effect: string) => {
    setFormData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.filter(se => se !== effect)
    }));
  };

  const addCustomSideEffect = () => {
    if (customSideEffect.trim() && !formData.sideEffects.includes(customSideEffect.trim())) {
      addSideEffect(customSideEffect.trim());
      setCustomSideEffect('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData.name || !formData.dosage || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitted(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      alert('🎉 Medication added to blockchain! +5 MOOD tokens earned. Smart contract deployed for medication tracking.');
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      genericName: '',
      dosage: '',
      unit: 'mg',
      frequency: 'daily',
      times: ['09:00'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      prescribedBy: '',
      purpose: '',
      sideEffects: [],
      instructions: '',
      withFood: 'optional',
      reminder: true
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border shadow-lg">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Medication Added Successfully!</h2>
            <p className="text-gray-600 mb-6">Your medication has been securely stored on the blockchain with encrypted health data.</p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-green-800">
                <strong>Blockchain Transaction:</strong> 0x7d2f...8a1b<br />
                <strong>Smart Contract:</strong> MedTracker_v2.0<br />
                <strong>Tokens Earned:</strong> +5 MOOD
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-[#005AEE] text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Add Another Medication
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#100C08]'>
    <div className="max-w-4xl mx-auto p-12 border- border-2  ">
      <div className="bg-[#100C08] rounded-xl shadow-lg border">

        <div className="bg-[#005AEE] text-white p-6 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Pill className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Add New Medication</h1>
              <p className="text-purple-100">Secure blockchain-based medication tracking</p>
            </div>
          </div>
        </div>

        <div onSubmit={handleSubmit} className="p-6 space-y-8">
       
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F8F8FF] flex items-center gap-2">
              <div className="w-6 h-6 bg-[#005AEE] rounded-full flex items-center justify-center text-white text-sm">1</div>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Medication Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Sertraline, Adderall XR"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Generic Name
                </label>
                <input
                  type="text"
                  value={formData.genericName}
                  onChange={(e) => handleInputChange('genericName', e.target.value)}
                  placeholder="e.g., sertraline hydrochloride"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent"
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
                    onChange={(e) => handleInputChange('dosage', e.target.value)}
                    placeholder="50"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Prescribed By
                </label>
                <input
                  type="text"
                  value={formData.prescribedBy}
                  onChange={(e) => handleInputChange('prescribedBy', e.target.value)}
                  placeholder="Dr. Smith, Toronto General Hospital"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
            </div>
          </div>

    
          <div className="space-y-6">
            <h2 className="text-xl font-semibold  flex items-center gap-2">
              <div className="w-6 h-6 bg-[#005AEE] rounded-full flex items-center justify-center text-white text-sm">2</div>
              Schedule & Frequency 
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Take with food?
                </label>
                <select
                  value={formData.withFood}
                  onChange={(e) => handleInputChange('withFood', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                >
                  <option value="optional">Optional</option>
                  <option value="with-food">With food</option>
                  <option value="empty-stomach">Empty stomach</option>
                </select>
              </div>
            </div>

            {formData.frequency !== 'as-needed' && formData.times.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Daily Times
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.times.map((time, index) => (
                    <input
                      key={index}
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F8F8FF]  flex items-center gap-2">
              <div className="w-6 h-6 bg-[#005AEE] rounded-full flex items-center justify-center text-[#F8F8FF]  text-sm">3</div>
              Medical Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                Purpose/Condition
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 -purple-500 focus:border-transparent"
              >
                <option value="">Select condition</option>
                {purposeOptions.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                <AlertTriangle size={16} className="inline mr-1 text-amber-500" />
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
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSideEffect())}
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
                {commonSideEffects.map(effect => (
                  <button
                    key={effect}
                    type="button"
                    onClick={() => addSideEffect(effect)}
                    className={`p-2 text-sm rounded-lg transition-all ${
                      formData.sideEffects.includes(effect)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {effect}
                  </button>
                ))}
              </div>

              {formData.sideEffects.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-2">Selected side effects:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.sideEffects.map(effect => (
                      <div key={effect} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
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

            <div>
              <label className="block text-sm font-medium text-[#F8F8FF] mb-2">
                Special Instructions
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                placeholder="e.g., Take with full glass of water, avoid alcohol, may cause drowsiness..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F8F8FF] flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">4</div>
              Preferences
            </h2>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reminder"
                checked={formData.reminder}
                onChange={(e) => handleInputChange('reminder', e.target.checked)}
                className="w-5 h-5 text-purple-500 border-gray-300 rounded "
              />
              <label htmlFor="reminder" className="text-sm font-medium text-[#F8F8FF]">
                Enable smart contract reminders and compliance tracking
              </label>
            </div>
          </div>

          {/* Blockchain Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔗</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Blockchain Security & Privacy</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your medication data will be encrypted and stored on the blockchain</li>
                  <li>• Smart contracts will automatically track adherence and provide rewards</li>
                  <li>• Only you control access to your health data</li>
                  <li>• Anonymous research participation opportunities available</li>
                  <li>• Immutable audit trail for insurance and medical providers</li>
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
            By adding this medication, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default AddMedicationForm;