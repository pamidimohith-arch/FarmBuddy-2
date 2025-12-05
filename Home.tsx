import React from 'react';
import { ArrowRight, CheckCircle2, IndianRupee, FileText, Search, Tractor } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Your Partner in Every Seed, <br/>
            <span className="text-yellow-400">Every Subsidy</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mb-10">
            Millions of farmers miss out on government funds due to lack of awareness. 
            FarmBuddy helps you discover eligible schemes and apply in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/profile"
              className="px-8 py-4 bg-yellow-500 text-green-900 font-bold rounded-lg hover:bg-yellow-400 transition shadow-lg flex items-center justify-center gap-2"
            >
              Check My Eligibility <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats / Trust Bar */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-wrap justify-around gap-8 text-center text-slate-600">
          <div>
            <p className="text-3xl font-bold text-green-700">₹ Billions</p>
            <p className="text-sm">Unused Subsidies</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">100+</p>
            <p className="text-sm">Central & State Schemes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">AI Powered</p>
            <p className="text-sm">Personalized Guidance</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How FarmBuddy Works</h2>
          <p className="text-slate-600">Three simple steps to claim what is rightfully yours.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Search className="h-7 w-7 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">1. Discover</h3>
            <p className="text-slate-600 text-center">
              Enter your basic details (land size, state, crop). Our AI matches you with the perfect schemes instantly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FileText className="h-7 w-7 text-yellow-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">2. Prepare</h3>
            <p className="text-slate-600 text-center">
              Get a clear checklist of documents needed. No more confusion or running around government offices.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
              <IndianRupee className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">3. Benefit</h3>
            <p className="text-slate-600 text-center">
              Apply directly or get guided instructions. Receive funds directly into your bank account.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement Highlight */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">Why we built this</h2>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                 <span className="text-slate-700">Farmers are unaware of new schemes.</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                 <span className="text-slate-700">Application processes are too complicated.</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                 <span className="text-slate-700">Language barriers prevent access to information.</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                 <span className="text-slate-700">No personalized suggestions based on land or crops.</span>
               </li>
             </ul>
           </div>
           <div className="flex-1">
             <img 
              src="https://images.unsplash.com/photo-1595248192667-88544e730b2c?q=80&w=2070&auto=format&fit=crop" 
              alt="Indian Farmer" 
              className="rounded-2xl shadow-2xl"
             />
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;