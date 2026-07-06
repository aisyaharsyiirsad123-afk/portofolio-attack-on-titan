import { useState } from "react";
import { TITANS } from "../data";
import { TitanInfo } from "../types";
import { motion } from "motion/react";
import { Eye, ShieldAlert, Sparkles, User, TreePine } from "lucide-react";

export default function TitanEncyclopedia() {
  const [selectedTitan, setSelectedTitan] = useState<TitanInfo>(TITANS.find(t => t.id === "attack") || TITANS[0]);

  // Calculate percentage height relative to the max height (Colossus Titan - 60m)
  const getScalePercentage = (meters: number) => {
    // We want some minimum height visually so it is visible, and maximum is 100% at 60m.
    return Math.max((meters / 60) * 100, 8);
  };

  return (
    <section id="titans" className="py-24 px-6 md:px-12 bg-zinc-900/10 text-white border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-red-500 block mb-2">
            ENCYCLOPEDIA ANATOMI RAKSASA (TOP SECRET)
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-white mb-4">
            Katalog Kekuatan Sembilan Titan
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400 font-light">
            Sembilan fragmen jiwa Ymir Fritz yang diwariskan lintas generasi Eldia. Bandingkan skala 
            tinggi fisik mereka secara interaktif dengan prajurit biasa dan dinding pertahanan setinggi 50 meter.
          </p>
        </div>

        {/* Layout: Selector Grid + Inspector & Interactive Height Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Selector Tabs List (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2 px-1">
              PILIH TITAN UNTUK DIANALISIS
            </h3>
            {TITANS.map((titan) => {
              const isSelected = selectedTitan.id === titan.id;
              return (
                <button
                  key={titan.id}
                  onClick={() => setSelectedTitan(titan)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                    isSelected
                      ? "bg-zinc-900 border-red-600 text-white shadow-lg"
                      : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm tracking-wide">{titan.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">{titan.jpName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-zinc-900 px-2 py-0.5 rounded text-red-500 border border-zinc-800">
                      {titan.height}m
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Column 2: Details & Height Comparison Visualizer (col-span-8) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative">
            
            {/* Titan Profile & Lore (col-span-7) */}
            <div className="md:col-span-7 flex flex-col gap-5 justify-between">
              <div>
                <span className="text-xs font-mono tracking-widest text-red-500 uppercase block mb-1">
                  WARISAN TITAN • TINGGI {selectedTitan.height} METER
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tight text-white">
                  {selectedTitan.name}
                </h3>
                <p className="text-xs font-mono text-zinc-500 mt-0.5 italic">{selectedTitan.jpName}</p>
                
                <p className="text-xs sm:text-sm text-zinc-300 font-light mt-4 leading-relaxed">
                  {selectedTitan.description}
                </p>
              </div>

              {/* Special abilities badges */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  KEMAMPUAN UTAMA (ABILITIES)
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTitan.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold font-mono bg-zinc-900 border border-zinc-800/80 text-red-400 px-2.5 py-1 rounded-md"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Holders & Weakness */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4 mt-2">
                <div>
                  <h5 className="text-[9px] font-mono text-zinc-500 uppercase">Pewaris Sekarang</h5>
                  <p className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-zinc-400" />
                    {selectedTitan.currentHolder}
                  </p>
                </div>
                <div>
                  <h5 className="text-[9px] font-mono text-zinc-500 uppercase">Kelemahan Taktis</h5>
                  <p className="text-xs text-red-400 mt-1 font-mono leading-tight">
                    {selectedTitan.weakness}
                  </p>
                </div>
              </div>
            </div>

            {/* Height Comparison Visualizer Chart (col-span-5) */}
            <div className="md:col-span-5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between items-center min-h-[350px]">
              <div className="w-full text-center pb-2 border-b border-zinc-800">
                <h4 className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  SIMULATOR SKALA TINGGI
                </h4>
                <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Bandingkan proporsi fisik</p>
              </div>

              {/* Graphical Arena */}
              <div className="flex items-end justify-around w-full h-64 px-2 relative border-b border-zinc-800 pt-4">
                
                {/* 1. Human (1.7m) */}
                <div className="flex flex-col items-center z-10">
                  <div 
                    className="w-2 bg-blue-500 rounded-t-sm relative transition-all duration-500"
                    style={{ height: `${getScalePercentage(1.7)}px` }}
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] font-mono text-blue-400 font-bold">
                      1.7m
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase">Manusia</span>
                </div>

                {/* 2. Selected Titan */}
                <div className="flex flex-col items-center z-10">
                  <motion.div 
                    key={selectedTitan.id}
                    initial={{ height: 0 }}
                    animate={{ height: `${getScalePercentage(selectedTitan.height)}px` }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="w-8 bg-gradient-to-t from-red-800 to-red-500 rounded-t-md relative hover:brightness-110 transition-all cursor-pointer"
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-red-400 font-bold">
                      {selectedTitan.height}m
                    </div>
                    {/* Glowing skin veins */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,rgba(239,68,68,0.4)_50%,transparent_55%)] bg-[length:200%_100%] animate-pulse" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-zinc-400 mt-1 uppercase text-center truncate w-16">
                    {selectedTitan.name.split(" ")[0]}
                  </span>
                </div>

                {/* 3. Wall Rose (50m) */}
                <div className="flex flex-col items-center z-10">
                  <div 
                    className="w-12 bg-zinc-700 border-x border-t border-zinc-600 rounded-t-lg relative transition-all duration-500 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
                    style={{ height: `${getScalePercentage(50)}px` }}
                  >
                    {/* Brick pattern lines */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:6px_4px]" />
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-zinc-400 font-bold">
                      50m
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase">Tembok</span>
                </div>

                {/* Background Grid Lines */}
                <div className="absolute bottom-0 inset-x-0 h-full pointer-events-none flex flex-col justify-between opacity-10">
                  <div className="w-full border-t border-dashed border-zinc-100" />
                  <div className="w-full border-t border-dashed border-zinc-100" />
                  <div className="w-full border-t border-dashed border-zinc-100" />
                  <div className="w-full border-t border-dashed border-zinc-100" />
                  <div className="w-full border-t border-dashed border-zinc-100" />
                </div>
              </div>

              <div className="w-full bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center mt-3">
                <p className="text-[9px] text-zinc-400 font-mono leading-snug">
                  {selectedTitan.height >= 50 ? (
                    <span className="text-red-500 font-bold">⚠️ MELAMPAUI TINGGI TEMBOK!</span>
                  ) : (
                    <span>Aman di bawah ketinggian Tembok Rose (50m).</span>
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
