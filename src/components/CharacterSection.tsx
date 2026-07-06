import { useState } from "react";
import { CHARACTERS } from "../data";
import { Character } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Search, Shield, Swords, Sparkles, Quote, RefreshCw } from "lucide-react";

export default function CharacterSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(CHARACTERS[0]);
  const [quoteIndexes, setQuoteIndexes] = useState<Record<string, number>>({});

  // Cycle through quotes for a specific character
  const cycleQuote = (charId: string, quotesLength: number) => {
    setQuoteIndexes((prev) => {
      const currentIdx = prev[charId] ?? 0;
      return {
        ...prev,
        [charId]: (currentIdx + 1) % quotesLength,
      };
    });
  };

  const filteredCharacters = CHARACTERS.filter((char) => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          char.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = filterDivision === "All" || char.division === filterDivision;
    return matchesSearch && matchesDivision;
  });

  const getStatLabel = (key: string) => {
    switch (key) {
      case "combat": return "Kemampuan Tempur (Combat)";
      case "initiative": return "Inisiatif Tempur (Initiative)";
      case "wits": return "Kecerdasan Taktis (Wits)";
      case "teamwork": return "Kerja Sama Tim (Teamwork)";
      case "sacrifice": return "Jiwa Pengorbanan (Sacrifice)";
      default: return key;
    }
  };

  return (
    <section id="characters" className="py-24 px-6 md:px-12 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-red-500 block mb-2">
            ARSIPI MILITER PARADIS (TOP SECRET)
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase tracking-tight text-white mb-4">
            Profil Karakter Utama
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400 font-light">
            Berkas taktis intelijen mengenai prajurit terkuat umat manusia dan pejuang asing. Filter, 
            cari, dan klik karakter untuk melihat metrik kemampuan perang mereka secara detail.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {["All", "Scout Regiment", "Marley Warrior Unit"].map((division) => (
              <button
                key={division}
                onClick={() => setFilterDivision(division)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all duration-300 ${
                  filterDivision === division
                    ? "bg-red-600 text-white shadow-md shadow-red-900/20"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {division === "All" ? "Semua Divisi" : division}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari prajurit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Characters Grid List (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCharacters.map((char) => {
                const isSelected = selectedCharacter?.id === char.id;
                return (
                  <motion.div
                    key={char.id}
                    layoutId={`card-${char.id}`}
                    onClick={() => setSelectedCharacter(char)}
                    className={`group relative p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-zinc-900 border-red-600 shadow-xl shadow-red-950/20"
                        : "bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700"
                    }`}
                  >
                    {/* Corner accents */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">
                        {char.division}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold tracking-wider font-mono uppercase ${
                        char.status === "Active" 
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50" 
                          : "bg-red-950 text-red-400 border border-red-900/50"
                      }`}>
                        {char.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                      {char.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mb-3">{char.jpName}</p>

                    <p className="text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed mb-4">
                      {char.bio}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-red-500 font-mono">
                        COMBAT STAT: {(char.stats.combat * 10).toString()}%
                      </span>
                      {char.titanForm && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-orange-950/40 border border-orange-900/50 text-[10px] text-orange-400 font-mono font-bold uppercase">
                          <Swords className="h-3 w-3" />
                          Titan Shifter
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredCharacters.length === 0 && (
              <div className="col-span-2 text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
                <p className="text-zinc-500 font-mono text-sm">Tidak ada prajurit yang cocok dengan pencarian.</p>
              </div>
            )}
          </div>

          {/* Detailed Soldier Inspector View (col-span-5) */}
          <div className="lg:col-span-5">
            {selectedCharacter ? (
              <motion.div
                key={selectedCharacter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/85 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden"
              >
                {/* Background red visual glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-xs font-mono tracking-[0.25em] text-red-500 uppercase block mb-1">
                      {selectedCharacter.division} • PROFILE FILE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase text-white">
                      {selectedCharacter.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1">
                      <span className="text-xs font-mono text-zinc-400">{selectedCharacter.jpName}</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-xs font-mono text-zinc-400">Tinggi: {selectedCharacter.height}</span>
                      <span className="text-zinc-700">•</span>
                      <span className="text-xs font-mono text-zinc-400">{selectedCharacter.gender === "Male" ? "Laki-laki" : "Perempuan"}</span>
                    </div>
                  </div>

                  {/* Character Bio */}
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1.5">
                      BIOGRAFI MILITER
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                      {selectedCharacter.bio}
                    </p>
                  </div>

                  {/* Shifter Alert */}
                  {selectedCharacter.titanForm && (
                    <div className="p-3.5 bg-orange-950/30 border border-orange-500/30 rounded-xl flex gap-3 items-start">
                      <Sparkles className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-orange-400 uppercase font-mono">
                          BENTUK TITAN WARISAN
                        </h5>
                        <p className="text-xs text-orange-200/80 font-mono mt-0.5">
                          {selectedCharacter.titanForm}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tactical Capabilities (Stats Bars) */}
                  <div className="space-y-3.5 mt-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      ANALISIS KEMAMPUAN TAKTIS
                    </h4>
                    {Object.entries(selectedCharacter.stats).map(([key, val]) => {
                      const statVal = val as number;
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-400 font-medium">{getStatLabel(key)}</span>
                            <span className="font-mono font-bold text-red-500">{statVal * 10} / 100</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${statVal * 10}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                statVal >= 9 
                                  ? "bg-gradient-to-r from-red-600 to-red-400" 
                                  : statVal >= 7 
                                  ? "bg-gradient-to-r from-red-700 to-orange-500" 
                                  : "bg-zinc-500"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quotes Box with toggle cycle */}
                  <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl relative group">
                    <div className="absolute top-3.5 left-3.5 text-zinc-800">
                      <Quote className="h-6 w-6" />
                    </div>
                    <div className="pl-6 relative z-10">
                      <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed min-h-[50px] flex items-center">
                        &quot;{selectedCharacter.quotes[quoteIndexes[selectedCharacter.id] ?? 0]}&quot;
                      </p>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-zinc-900">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                          Kutipan { (quoteIndexes[selectedCharacter.id] ?? 0) + 1 } dari { selectedCharacter.quotes.length }
                        </span>
                        <button
                          onClick={() => cycleQuote(selectedCharacter.id, selectedCharacter.quotes.length)}
                          className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw className="h-3 w-3 animate-spin-slow" />
                          Ganti Kutipan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10 text-center">
                <p className="text-zinc-500 font-mono text-sm">Pilih prajurit dari daftar untuk meninjau detail analisis militer.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
