import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmerProfile, INDIAN_STATES, FARMING_TYPES } from '../types';
import { Loader2 } from 'lucide-react';

interface ProfileSetupProps {
  setProfile: (profile: FarmerProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ setProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FarmerProfile>({
    name: '',
    state: '',
    landSize: 0,
    farmingType: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'landSize' ? Number(value) : value
    }));
  };

  const fillExample = () => {
    setFormData({
      name: "Ramesh Singh",
      state: "Madhya Pradesh",
      landSize: 2,
      farmingType: "Organic Farming"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.state || !formData.farmingType) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate processing delay for better UX
    setTimeout(() => {
      setProfile(formData);
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Tell us about your Farm</h2>
          <p className="text-slate-600 mt-2">We will find the best schemes for you.</p>
          <button 
            type="button" 
            onClick={fillExample}
            className="text-sm text-green-600 font-medium hover:underline mt-2"
          >
            Use Example (Ramesh Singh)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="e.g. Ramesh Singh"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                required
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Land Size (Acres)</label>
              <input
                type="number"
                name="landSize"
                value={formData.landSize || ''}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. 2.5"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Farming Type</label>
            <select
              name="farmingType"
              value={formData.farmingType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none bg-white"
              required
            >
              <option value="">Select Farming Type</option>
              {FARMING_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white font-bold text-lg py-4 rounded-xl hover:bg-green-800 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Finding Schemes...
                </>
              ) : (
                "Find My Subsidies"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;