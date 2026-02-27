"use strict";

import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface CountryMedal {
  rank: number;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  code: string;
}

export default function MedalTable({ data }: { data: CountryMedal[] }) {
  return (
    <div className="w-full overflow-hidden glass-card rounded-2xl animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 font-semibold text-white/60 text-sm tracking-wider uppercase">Rank</th>
              <th className="px-6 py-4 font-semibold text-white/60 text-sm tracking-wider uppercase">Country</th>
              <th className="px-6 py-4 font-semibold text-olympic-gold text-sm tracking-wider uppercase flex items-center gap-2">
                <Medal size={18} /> Gold
              </th>
              <th className="px-6 py-4 font-semibold text-olympic-silver text-sm tracking-wider uppercase">
                <Medal size={18} className="inline mr-2" /> Silver
              </th>
              <th className="px-6 py-4 font-semibold text-olympic-bronze text-sm tracking-wider uppercase">
                <Medal size={18} className="inline mr-2" /> Bronze
              </th>
              <th className="px-6 py-4 font-semibold text-white text-sm tracking-wider uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={item.country} 
                className="medal-row border-b border-white/5 last:border-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 text-white font-medium">{item.rank}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">{item.country}</span>
                    <span className="text-white/30 text-xs font-mono">{item.code}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-olympic-gold font-bold text-lg">{item.gold}</td>
                <td className="px-6 py-4 text-olympic-silver font-bold text-lg">{item.silver}</td>
                <td className="px-6 py-4 text-olympic-bronze font-bold text-lg">{item.bronze}</td>
                <td className="px-6 py-4 text-white font-bold text-lg">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
