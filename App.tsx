import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import { FarmerProfile } from './types';

function App() {
  // Simple state management for the user profile
  // In a real app, this would be in a Context or Redux
  const [profile, setProfile] = useState<FarmerProfile | null>(null);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/profile" 
            element={<ProfileSetup setProfile={setProfile} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              profile ? <Dashboard profile={profile} /> : <Navigate to="/profile" replace />
            } 
          />
          {/* Simple About placeholder */}
          <Route path="/about" element={
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="text-3xl font-bold mb-4">About FarmBuddy</h1>
              <p className="text-slate-600">
                FarmBuddy bridges the gap between government schemes and farmers. 
                Our mission is to empower farmers by providing easy access to subsidies, increasing productivity and income.
              </p>
            </div>
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;