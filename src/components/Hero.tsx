import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ShieldAlert, Skull } from "lucide-react";

interface HeroProps {
  heroImageUrl: string;
  wingsImageUrl: string;
  onExploreClick: () => void;
}

export default function Hero({ heroImageUrl, wingsImageUrl, onExploreClick }: HeroProps) {
  const [isSworn, setIsSworn] = useState(false);
  const [oathCount, setOathCount] = useState(0);

  const handleOath = () => {
    setIsSworn(true);
    setOathCount((prev) => prev + 1);

    // Play a brief synthesized metal sword clash + fire crackle sound
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      // Sword clash sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      // Low bass drum hit
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = "sine";
      kickOsc.frequency.setValueAtTime(120, ctx.currentTime);
      kickOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
      kickGain.gain.setValueAtTime(0.5, ctx.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
      kickOsc.start();
      kickOsc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      // Ignore audio failure
    }
  };

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950 text-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
          transform: isSworn ? "scale(1.05)" : "scale(1.0)"
        }}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-900/40" />

      {/* Floating Embers Particle Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-red-500/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -120],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
              scale: [0.5, Math.random() * 1.5 + 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 flex items-center gap-2"
        >
          <img 
            src={wingsImageUrl} 
            alt="Scout Wings" 
            className="h-14 w-14 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 block">
              PARADIS ARMY ARCHIVE
            </span>
            <span className="text-xs font-bold text-red-500 font-mono">
              WALL ROSE COORD-9021
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 mb-4 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          Shingeki <br className="sm:hidden" />
          <span className="text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">No Kyojin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 font-sans tracking-wide leading-relaxed mb-8 font-light"
        >
          Selamat datang di portal portofolio taktis pertahanan pulau Paradis. Jelajahi dokumen rahasia 
          tentang Pasukan Penyelidik, data visual Sembilan Titan, kronologi sejarah perjuangan manusia, 
          dan uji kesiapan militermu sekarang.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center"
        >
          <button
            onClick={onExploreClick}
            id="btn-explore-archive"
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-zinc-100 text-zinc-950 font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl shadow-black/40 text-xs sm:text-sm font-sans"
          >
            Buka Arsip Militer
          </button>

          <button
            onClick={handleOath}
            id="btn-scout-oath"
            className={`w-full sm:w-auto px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 border flex items-center justify-center gap-2 ${
              isSworn 
                ? "bg-red-950/60 border-red-500 text-red-400 shadow-lg shadow-red-900/30" 
                : "bg-transparent border-zinc-500 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-300"
            }`}
          >
            {isSworn ? <Skull className="h-4 w-4 animate-bounce text-red-500" /> : <ShieldAlert className="h-4 w-4" />}
            {isSworn ? `DEDICATED HEARTS! (x${oathCount})` : "Sumpah Prajurit"}
          </button>
        </motion.div>
      </div>

      {/* Scout Oath Feedback Alert banner */}
      {isSworn && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-24 bg-red-950/90 border border-red-600 px-6 py-3 rounded-lg flex items-center gap-3 max-w-sm mx-4 backdrop-blur-md shadow-2xl shadow-red-950/50 z-20"
        >
          <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <p className="text-xs font-mono text-red-200 uppercase tracking-widest text-left">
            &quot;Sasageyo! Jantungmu telah diserahkan untuk kebebasan Paradis.&quot;
          </p>
        </motion.div>
      )}

      {/* Floating Down Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={onExploreClick}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1 text-zinc-500">Mulai Menjelajah</span>
        <ChevronDown className="h-5 w-5 text-zinc-400 animate-bounce" />
      </div>
    </div>
  );
}
