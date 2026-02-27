"use client";

import { useEffect, useState } from 'react';
import MedalTable from '@/components/MedalTable';
import { Trophy, RefreshCcw, Snowflake } from 'lucide-react';

interface CountryMedal {
  rank: number;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  code: string;
}

export default function Home() {
  const [data, setData] = useState<CountryMedal[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/medals');
      const medals = await res.json();
      setData(medals);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Failed to fetch medals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen px-4 py-12 md:px-12 lg:px-24">
      {/* Background Orbs for WOW Factor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-olympic-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-olympic-red/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="p-3 rounded-2xl bg-white/10 glass-card">
               <Snowflake className="text-white animate-pulse" size={32} />
             </div>
             <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40">Milano Cortina 2026</h2>
          </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Medal <span className="text-transparent bg-clip-text bg-gradient-to-r from-olympic-gold via-white to-olympic-silver">Standings</span>
            </h1>
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10 w-fit mx-auto md:mx-0">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Last Updated</p>
                <p className="text-xs text-white/80 font-mono min-h-[16px]">{mounted ? lastUpdated : ''}</p>
              </div>
              <button 
                onClick={fetchData}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                disabled={loading}
              >
                <RefreshCcw size={18} className={`text-white/60 group-hover:text-white ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 glass-card rounded-2xl border-l-4 border-olympic-gold">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Top Nation</p>
            <h3 className="text-2xl font-black text-white">{data[0]?.country || '...'}</h3>
            <p className="text-olympic-gold font-bold mt-2 flex items-center gap-2">
              <Trophy size={16} /> {data[0]?.gold || 0} Gold Medals
            </p>
          </div>
          <div className="p-6 glass-card rounded-2xl border-l-4 border-olympic-blue">
             <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Countries</p>
             <h3 className="text-2xl font-black text-white">{data.length} Participating</h3>
             <p className="text-olympic-blue font-bold mt-2 italic">Official Tallies</p>
          </div>
          <div className="p-6 glass-card rounded-2xl border-l-4 border-olympic-black bg-white/5">
             <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Current Event</p>
             <h3 className="text-xl font-black text-white">Winter Olympics</h3>
             <p className="text-white/60 font-medium mt-2">Italy 2026</p>
          </div>
        </div>

        {/* Table Section */}
        {loading && data.length === 0 ? (
          <div className="w-full h-64 flex items-center justify-center glass-card rounded-2xl">
             <RefreshCcw className="text-white animate-spin opacity-20" size={48} />
          </div>
        ) : (
          <MedalTable data={data} />
        )}
      </div>

      <footer className="mt-24 text-center">
        <p className="text-white/20 text-xs font-medium tracking-widest uppercase pb-12">
          Tracking Excellence • Milano Cortina 2026 • Real-time Data
        </p>
      </footer>
    </main>
  );
}
