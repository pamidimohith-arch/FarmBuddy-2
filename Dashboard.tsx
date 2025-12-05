import React, { useEffect, useState } from 'react';
import { FarmerProfile, SubsidyScheme } from '../types';
import { fetchPersonalizedSubsidies } from '../services/geminiService';
import { Loader2, IndianRupee, FileCheck, Calendar, Bell, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface DashboardProps {
  profile: FarmerProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [subsidies, setSubsidies] = useState<SubsidyScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadSubsidies = async () => {
      if (!profile) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPersonalizedSubsidies(profile);
        setSubsidies(data);
      } catch (err) {
        setError("Failed to load recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadSubsidies();
  }, [profile]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!profile) {
    return <div className="p-8 text-center">Please complete your profile first.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Namaste, {profile.name} 🙏</h1>
          <p className="text-slate-600 mt-1">
            Based on your <span className="font-semibold">{profile.landSize} acre</span> land in <span className="font-semibold">{profile.state}</span> practicing <span className="font-semibold">{profile.farmingType}</span>.
          </p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm">
                <Bell className="h-4 w-4 text-yellow-600" />
                Alerts
            </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
          <p className="text-lg text-slate-600 animate-pulse">Analyzing government databases for you...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Content Grid */}
      {!loading && !error && (
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" /> Recommended Schemes
            </h2>

            {subsidies.length === 0 ? (
               <div className="p-8 bg-white rounded-xl text-center shadow">No specific schemes found for this profile. Try updating details.</div>
            ) : (
                subsidies.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition hover:shadow-md">
                    <div 
                        className="p-6 cursor-pointer"
                        onClick={() => toggleExpand(scheme.id)}
                    >
                    <div className="flex justify-between items-start">
                        <div>
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full mb-2 ${scheme.category === 'Central' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
                                {scheme.category} Government
                            </span>
                            <h3 className="text-xl font-bold text-slate-900">{scheme.name}</h3>
                            <p className="text-green-700 font-bold mt-1 text-lg flex items-center gap-1">
                                <IndianRupee className="h-5 w-5" /> {scheme.amount}
                            </p>
                        </div>
                        <button className="text-slate-400">
                            {expandedId === scheme.id ? <ChevronUp /> : <ChevronDown />}
                        </button>
                    </div>
                    
                    <p className="text-slate-600 mt-3 line-clamp-2">{scheme.description}</p>
                    </div>

                    {/* Expanded Details */}
                    {expandedId === scheme.id && (
                        <div className="px-6 pb-6 bg-slate-50 border-t border-slate-100">
                            <div className="mt-4 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                        <FileCheck className="h-4 w-4" /> Eligibility
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                        {scheme.eligibility.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                        <FileCheck className="h-4 w-4" /> Documents Required
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                        {scheme.documentsRequired.map((doc, idx) => (
                                            <li key={idx}>{doc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex gap-4">
                                <button className="flex-1 bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition">
                                    Apply Now
                                </button>
                                <button className="flex-1 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 transition">
                                    Save for Later
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                ))
            )}
          </div>

          {/* Sidebar / Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-lg text-yellow-900 mb-4">FarmBuddy Tips</h3>
                <ul className="space-y-3 text-sm text-yellow-800">
                    <li className="flex gap-2 items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 mt-1.5 shrink-0" />
                        Keep your Aadhaar linked to your bank account for DBT.
                    </li>
                    <li className="flex gap-2 items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 mt-1.5 shrink-0" />
                        Update your land records at the local Tehsil office.
                    </li>
                    <li className="flex gap-2 items-start">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 mt-1.5 shrink-0" />
                        Kisan Credit Card (KCC) offers low interest loans.
                    </li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                        <div className="bg-red-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">PM-KUSUM Registration</p>
                            <p className="text-xs text-red-600 font-medium">Expires in 5 days</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;