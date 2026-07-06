import { useState } from "react";
import { TIMELINE } from "../data";
import { TimelineEvent } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Skull, ShieldCheck, MapPin, Flag } from "lucide-react";

export default function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(TIMELINE[0]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Walls": return "bg-zinc-800 text-zinc-300 border-zinc-700/60";
      case "Expedition": return "bg-blue-950 text-blue-400 border-blue-900/40";
      case "Infiltration": return "bg-indigo-950 text-indigo-400 border-indigo-900/40";
      case "Uprising": return "bg-purple-950 text-purple-400 border-purple-900/40";
      case "Marley": return "bg-amber-950 text-amber-400 border-amber-900/40";
      case "Rumbling": return "bg-red-950 text-red-400 border-red-900/40 animate-pulse";
      default: return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-red-500 block mb-2">
            KRONOLOGI PERJUANGAN MANUSIA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-white mb-4">
            Garis Waktu Peristiwa Sejarah
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400 font-light">
            Rekaman historis pertahanan gerbang, ekspedisi di luar tembok, infiltrasi taktis, 
            hingga pemicuan Rumbling yang mengguncang peradaban dunia. Klik peristiwa untuk meneliti laporan militer lengkap.
          </p>
        </div>

        {/* Layout: Timeline Left + Event Inspector Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Vertical Timeline Ledger (col-span-7) */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-10">
            {/* Direct vertical connecting line */}
            <div className="absolute left-10 top-2 bottom-2 w-0.5 bg-zinc-800" />

            <div className="space-y-10">
              {TIMELINE.map((event) => {
                const isSelected = selectedEvent?.id === event.id;
                return (
                  <div 
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="relative flex gap-4 sm:gap-8 items-start cursor-pointer group"
                  >
                    {/* Timeline Node Point Ring */}
                    <div className="absolute left-0.5 sm:-left-3.5 flex items-center justify-center z-10">
                      <div className={`h-7 w-7 rounded-full border-2 bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? "border-red-500 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                          : "border-zinc-800 group-hover:border-zinc-500"
                      }`}>
                        <Calendar className={`h-3 w-3 ${isSelected ? "text-red-500" : "text-zinc-500"}`} />
                      </div>
                    </div>

                    {/* Timeline Event Content Card */}
                    <div className={`flex-1 p-5 rounded-xl border transition-all duration-300 ml-4 sm:ml-6 ${
                      isSelected 
                        ? "bg-zinc-900 border-red-600 shadow-lg shadow-red-950/10" 
                        : "bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/50 hover:border-zinc-700"
                    }`}>
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-black text-red-500 tracking-wider">
                          {event.year}
                        </span>
                        <span className={`text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">{event.subtitle}</p>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light mt-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Inspector Detail Panel (col-span-5) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-zinc-900/85 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] text-red-500 uppercase block mb-1">
                        LAPORAN INTELIJEN • {selectedEvent.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-black uppercase text-white leading-tight">
                        {selectedEvent.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 mt-0.5">{selectedEvent.subtitle}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                        URAIAN PERISTIWA SEJARAH
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                        {selectedEvent.description}
                      </p>
                    </div>

                    {/* Meta section: Deaths or Battles */}
                    <div className="space-y-3.5 pt-4 border-t border-zinc-800">
                      {selectedEvent.significantDeath && (
                        <div className="p-3 bg-red-950/35 border border-red-900/50 rounded-xl flex gap-3 items-start">
                          <Skull className="h-4.5 w-4.5 text-red-500 mt-0.5 shrink-0" />
                          <div>
                            <h5 className="text-xs font-bold text-red-400 uppercase font-mono">
                              KORBAN JIWA SIGNIFIKAN
                            </h5>
                            <p className="text-xs text-red-200/80 mt-0.5">
                              {selectedEvent.significantDeath}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedEvent.battleOutcome && (
                        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex gap-3 items-start">
                          <Flag className="h-4.5 w-4.5 text-zinc-400 mt-0.5 shrink-0" />
                          <div>
                            <h5 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                              HASIL AKHIR PERTEMPURAN
                            </h5>
                            <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed font-light">
                              {selectedEvent.battleOutcome}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-64 flex items-center justify-center p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10 text-center">
                  <p className="text-zinc-500 font-mono text-sm">Pilih peristiwa garis waktu untuk mempelajari detail kejadian.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
