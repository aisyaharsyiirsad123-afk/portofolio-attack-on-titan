import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Swords, Award, AlertTriangle, ShieldAlert, Sparkles, Play, RotateCcw } from "lucide-react";

interface TitanTarget {
  id: number;
  name: string;
  type: "Pure" | "Abnormal" | "Colossal-Child";
  x: number; // percentage width
  y: number; // percentage height
  scale: number;
  size: number; // diameter in pixels
  speed: number;
  health: number;
  duration: number; // remaining seconds before it escapes
}

export default function TitanSlayerMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("aot_slayer_highscore") || "0", 10);
    } catch (e) {
      return 0;
    }
  });

  const [gas, setGas] = useState(100); // percentage
  const [blades, setBlades] = useState(100); // durability percentage
  const [combo, setCombo] = useState(0);
  const [titans, setTitans] = useState<TitanTarget[]>([]);
  const [message, setMessage] = useState<string | null>("PILIH BILAH DAN MULAI MISI!");

  const nextIdRef = useRef(0);
  const gameIntervalRef = useRef<number | null>(null);

  // Load high score
  useEffect(() => {
    try {
      localStorage.setItem("aot_slayer_highscore", highScore.toString());
    } catch (e) {}
  }, [highScore]);

  // Handle Game Loop
  useEffect(() => {
    if (isPlaying) {
      // Spawn Titan periodically
      gameIntervalRef.current = window.setInterval(() => {
        spawnTitan();

        // Drain active resources slightly
        setGas((prev) => Math.max(prev - 2, 0));
        
        // Age active titans
        setTitans((prev) => {
          const updated = prev
            .map((t) => ({ ...t, duration: t.duration - 1 }))
            .filter((t) => {
              if (t.duration <= 0) {
                setMessage("Tembok didekati! Titan berhasil menghindar!");
                setCombo(0);
                return false;
              }
              return true;
            });
          return updated;
        });
      }, 1000);
    } else {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null;
      }
      setTitans([]);
    }

    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Audio synthesis helpers
  const playSynthesizedSound = (type: "gas" | "slash" | "refill" | "empty") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      if (type === "gas") {
        // High pass filtered white noise (gas sound)
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      } 
      else if (type === "slash") {
        // High pitch metal blade swipe
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(1200, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(800, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.25);
        osc2.stop(ctx.currentTime + 0.25);
      } 
      else if (type === "refill") {
        // Double clank loading sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
      else if (type === "empty") {
        // Low pitch click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {}
  };

  const spawnTitan = () => {
    if (titans.length >= 4) return; // limit active targets

    const types = [
      { name: "Titan Murni (Pure)", type: "Pure" as const, size: 70, speed: 1.0, health: 1, duration: 6 },
      { name: "Titan Abnormal", type: "Abnormal" as const, size: 55, speed: 2.0, health: 1, duration: 4 },
      { name: "Anak Colossal (Junior)", type: "Colossal-Child" as const, size: 90, speed: 0.5, health: 2, duration: 8 }
    ];

    const chosen = types[Math.floor(Math.random() * types.length)];
    const newTitan: TitanTarget = {
      id: nextIdRef.current++,
      name: chosen.name,
      type: chosen.type,
      x: 10 + Math.random() * 80, // %
      y: 15 + Math.random() * 65, // %
      scale: 0.8 + Math.random() * 0.4,
      size: chosen.size,
      speed: chosen.speed,
      health: chosen.health,
      duration: chosen.duration
    };

    setTitans((prev) => [...prev, newTitan]);
  };

  const handleSlashNape = (titanId: number) => {
    if (gas <= 0) {
      setMessage("Gas habis! Tekan ISI GAS untuk lanjut terbang!");
      playSynthesizedSound("empty");
      return;
    }
    if (blades <= 0) {
      setMessage("Pisau tumpul! Ganti pisau barumu sekarang!");
      playSynthesizedSound("empty");
      return;
    }

    // Spend assets
    playSynthesizedSound("gas");
    setGas((g) => Math.max(g - 6, 0));
    setBlades((b) => Math.max(b - 12, 0));

    // Handle targeting
    setTitans((prev) => {
      const match = prev.find((t) => t.id === titanId);
      if (!match) return prev;

      const newHealth = match.health - 1;
      if (newHealth <= 0) {
        // Destroyed!
        playSynthesizedSound("slash");
        const nextScore = score + (match.type === "Abnormal" ? 3 : match.type === "Colossal-Child" ? 4 : 2);
        setScore(nextScore);
        setCombo((c) => c + 1);

        if (nextScore > highScore) {
          setHighScore(nextScore);
        }

        setMessage(`TEBASAN BERHASIL! Tengkuk ${match.name} dihancurkan!`);
        return prev.filter((t) => t.id !== titanId);
      } else {
        // Damaged
        setMessage(`Titan tahan tebasan! Serang sekali lagi!`);
        return prev.map((t) => (t.id === titanId ? { ...t, health: newHealth } : t));
      }
    });
  };

  const handleRefillGas = () => {
    playSynthesizedSound("refill");
    setGas(100);
    setMessage("Gas tabung ODM berhasil diisi ulang penuh!");
  };

  const handleRefillBlades = () => {
    playSynthesizedSound("refill");
    setBlades(100);
    setMessage("Bilah besi baja ganda diganti baru!");
  };

  const handleStartGame = () => {
    setScore(0);
    setCombo(0);
    setGas(100);
    setBlades(100);
    setMessage("SIAPKAN JANTUNGMU... SERANG!");
    setIsPlaying(true);
    // spawn initial right away
    spawnTitan();
  };

  const handleStopGame = () => {
    setIsPlaying(false);
    setMessage("MISI PERTAHANAN BERAKHIR.");
  };

  // Determine Scout Tier Title based on High Score
  const getScoutRank = (scoreVal: number) => {
    if (scoreVal >= 35) return { title: "Prajurit Terkuat Umat Manusia (Levi-Tier)", color: "text-red-500 font-black animate-pulse" };
    if (scoreVal >= 20) return { title: "Komandan Prajurit Penyelidik Elite", color: "text-orange-400 font-bold" };
    if (scoreVal >= 10) return { title: "Prajurit Penyelidik Tangguh (Survey Corps)", color: "text-blue-400" };
    if (scoreVal >= 4) return { title: "Prajurit Pertahanan Tembok (Garrison)", color: "text-zinc-300" };
    return { title: "Kadet Pelatih Baru (Recruit)", color: "text-zinc-500 font-light" };
  };

  const activeRank = getScoutRank(highScore);

  return (
    <section id="mini-game" className="py-24 px-6 md:px-12 bg-zinc-900/10 text-white border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-red-500 block mb-2">
            SIMULATOR TAKTIS (CADET DRILL)
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-white mb-4">
            ODM Gear: Titan-Slayer Arena
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400 font-light">
            Latih refleks penggunaan manuver 3D-mu. Klik atau ketuk titik lemah merah (tengkuk) 
            Titan yang bermunculan sebelum kabur. Kelola gas dan ketajaman pedangmu agar tidak terjatuh!
          </p>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">SCORE AKTIF</p>
              <p className="text-2xl font-mono font-black text-white">{score}</p>
            </div>
            <Swords className="h-6 w-6 text-red-500" />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">REKOR TINGGI</p>
              <p className="text-2xl font-mono font-black text-red-500">{highScore}</p>
            </div>
            <Award className="h-6 w-6 text-yellow-500" />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-center">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>BATERAI GAS</span>
              <span className={gas <= 20 ? "text-red-500 font-bold animate-pulse" : "text-zinc-300"}>{gas}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className={`h-full transition-all duration-200 ${gas <= 20 ? "bg-red-600" : "bg-sky-500"}`} 
                style={{ width: `${gas}%` }}
              />
            </div>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col justify-center">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>BILAH PEDANG</span>
              <span className={blades <= 20 ? "text-red-500 font-bold animate-pulse" : "text-zinc-300"}>{blades}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className={`h-full transition-all duration-200 ${blades <= 20 ? "bg-red-500" : "bg-emerald-500"}`} 
                style={{ width: `${blades}%` }}
              />
            </div>
          </div>
        </div>

        {/* The Game Arena Canvas Container */}
        <div className="relative h-[380px] sm:h-[450px] w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Grid visual lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <AnimatePresence>
            {!isPlaying ? (
              /* Start overlay screen */
              <motion.div 
                key="start-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center text-center p-6 z-20"
              >
                <div className="p-4 bg-red-950/30 rounded-full border border-red-900/50 mb-4 animate-pulse">
                  <ShieldAlert className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  Mulai Simulasi Pembasmi Titan
                </h3>
                
                <div className="my-3 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Pangkat Menembakmu saat ini:</span>
                  <span className={`text-xs font-mono font-bold uppercase ${activeRank.color}`}>
                    {activeRank.title}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
                  Titan akan bermunculan secara acak. Klik pada lingkaran merah &quot;NAPE&quot; untuk mengaitkan kawat dan menebas tengkuk Titan sebelum mereka merusak gerbang kota.
                </p>

                <button
                  onClick={handleStartGame}
                  className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all duration-300 shadow-xl shadow-red-950/40"
                >
                  <Play className="h-4 w-4" />
                  Dedikasikan Jantungmu
                </button>
              </motion.div>
            ) : (
              /* Active Titan targets arena */
              <div className="absolute inset-0 select-none">
                {titans.map((titan) => (
                  <motion.div
                    key={titan.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: titan.scale, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className="absolute flex flex-col items-center cursor-crosshair justify-center"
                    style={{
                      left: `${titan.x}%`,
                      top: `${titan.y}%`,
                      width: `${titan.size}px`,
                      height: `${titan.size}px`,
                    }}
                  >
                    {/* Visual Titan Skull Shape Placeholder */}
                    <div className="absolute inset-0 rounded-full bg-zinc-900/90 border-2 border-zinc-700/80 shadow-lg flex items-center justify-center relative overflow-hidden group">
                      
                      {/* Hair block top */}
                      <div className="absolute top-0 inset-x-0 h-1/3 bg-zinc-800" />
                      
                      {/* Eyes inside */}
                      <div className="flex gap-4 mt-2">
                        <div className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                        <div className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse" />
                      </div>

                      {/* Titan Name badge top */}
                      <span className="absolute bottom-1 text-[8px] font-mono font-bold uppercase text-zinc-500 bg-black/50 px-1 py-0.5 rounded">
                        {titan.type === "Abnormal" ? "⚠️ ABNORMAL" : "TITAN"}
                      </span>
                    </div>

                    {/* RED INTERACTIVE NAPE WEAKSPOT TARGET (glowing ring) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSlashNape(titan.id);
                      }}
                      className="absolute -top-3 h-9 w-9 rounded-full bg-red-600/30 hover:bg-red-600/60 border-2 border-red-500 flex items-center justify-center z-10 animate-pulse cursor-crosshair shadow-[0_0_15px_rgba(239,68,68,0.8)] transition-transform active:scale-95"
                      title="TEBAS TENGKUK!"
                    >
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                    </button>

                    {/* Expiry time display indicator circle */}
                    <span className="absolute -bottom-5 text-[9px] font-mono bg-black/60 px-1.5 rounded text-zinc-400 font-semibold border border-zinc-850">
                      T: {titan.duration}s
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Danger Border Flash if gas/blades are empty */}
          {(gas <= 0 || blades <= 0) && isPlaying && (
            <div className="absolute inset-0 pointer-events-none border-4 border-red-600/70 animate-pulse z-10" />
          )}
        </div>

        {/* Controls Bar & Tactic Feedback */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl flex-1 flex items-center gap-2.5 min-h-[50px]">
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
            <p className="text-xs font-mono text-zinc-400">
              <span className="text-zinc-500">KADET-LOG:</span> {message}
            </p>
          </div>

          {isPlaying && (
            <div className="flex gap-2">
              <button
                onClick={handleRefillGas}
                className="px-4 py-2.5 bg-sky-950/80 hover:bg-sky-900 border border-sky-500 text-sky-400 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 flex items-center gap-1.5"
              >
                <Zap className="h-3.5 w-3.5" />
                Isi Gas (Gas)
              </button>
              <button
                onClick={handleRefillBlades}
                className="px-4 py-2.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500 text-emerald-400 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 flex items-center gap-1.5"
              >
                <Swords className="h-3.5 w-3.5" />
                Ganti Pisau (Blades)
              </button>
              <button
                onClick={handleStopGame}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-red-700 hover:text-white border border-zinc-700 text-zinc-400 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200"
              >
                Menyerah
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
