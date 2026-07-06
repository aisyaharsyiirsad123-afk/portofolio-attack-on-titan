import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ShieldAlert } from "lucide-react";

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodeRef = useRef<OscillatorNode | null>(null);
  const drone2NodeRef = useRef<OscillatorNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const melodyTimerRef = useRef<number | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Filter to keep it dark and bassy
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filterNodeRef.current = filter;

      // Gain node for volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime); // fade in
      gainNodeRef.current = masterGain;

      // Connections
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  };

  const startDrone = () => {
    if (!audioCtxRef.current || !filterNodeRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Main low rumble (55Hz - A1 note)
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(55, ctx.currentTime);

    // Detuned second rumble (55.4Hz) for chorusing
    const osc2 = ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(55.4, ctx.currentTime);

    osc1.connect(filterNodeRef.current);
    osc2.connect(filterNodeRef.current);

    osc1.start();
    osc2.start();

    droneNodeRef.current = osc1;
    drone2NodeRef.current = osc2;

    // Fade in
    gainNodeRef.current.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2.0);

    // Start playing dramatic periodic plucks
    triggerMelody();
  };

  const stopDrone = () => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
    }
    if (droneNodeRef.current) {
      try {
        droneNodeRef.current.stop();
      } catch (e) {}
      droneNodeRef.current = null;
    }
    if (drone2NodeRef.current) {
      try {
        drone2NodeRef.current.stop();
      } catch (e) {}
      drone2NodeRef.current = null;
    }
    if (melodyTimerRef.current) {
      clearInterval(melodyTimerRef.current);
      melodyTimerRef.current = null;
    }
  };

  const triggerMelody = () => {
    if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);

    const snkMotif = [220, 261.63, 329.63, 293.66, 220, 261.63, 196.00]; // A3, C4, E4, D4, A3, C4, G3 (Dramatic Shingeki vibe)
    let noteIdx = 0;

    const playNote = () => {
      if (!audioCtxRef.current || !isPlaying) return;
      const ctx = audioCtxRef.current;

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteFilter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(snkMotif[noteIdx], ctx.currentTime);

      noteFilter.type = "lowpass";
      noteFilter.frequency.setValueAtTime(800, ctx.currentTime);

      noteGain.gain.setValueAtTime(0.0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);

      noteIdx = (noteIdx + 1) % snkMotif.length;
    };

    // Play a motif note every 1.8 seconds
    melodyTimerRef.current = window.setInterval(playNote, 1800);
  };

  const handleToggle = () => {
    initAudio();
    if (isPlaying) {
      stopDrone();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startDrone();
    } else {
      stopDrone();
    }
    return () => stopDrone();
  }, [isPlaying]);

  return (
    <div id="audio-ambience" className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider shadow-lg transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? "bg-red-950/80 border-red-500 text-red-400 hover:bg-red-900/90 shadow-red-900/30"
            : "bg-zinc-900/85 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`}
        title="Putar Ambient Musik Shingeki"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-4 w-4 animate-pulse text-red-500" />
            <span className="hidden md:inline">Ambience: Aktif</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            <span className="hidden md:inline font-mono">Musik Atmosfer</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="absolute right-0 bottom-12 mb-2 w-48 text-right pr-2">
          <p className="text-[10px] font-mono text-red-500/80 uppercase animate-pulse">
            🔊 SINKRONISASI COORD-DRONE
          </p>
        </div>
      )}
    </div>
  );
}
