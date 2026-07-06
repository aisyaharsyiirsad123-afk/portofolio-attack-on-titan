import { useState } from "react";
import { QUIZ_QUESTIONS, MILITARY_BRANCHES } from "../data";
import { MilitaryBranch } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Compass, Shield, Crown, Swords, RotateCcw, CheckCircle2 } from "lucide-react";

export default function MilitaryAptitudeTest() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<{ scouts: number; garrison: number; police: number; warriors: number }>>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [assignedBranch, setAssignedBranch] = useState<MilitaryBranch | null>(null);

  const handleSelectOption = (scores: { scouts: number; garrison: number; police: number; warriors: number }) => {
    const updatedAnswers = [...answers, scores];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Calculate final scores
      const totals = updatedAnswers.reduce(
        (acc, curr) => ({
          scouts: acc.scouts + curr.scouts,
          garrison: acc.garrison + curr.garrison,
          police: acc.police + curr.police,
          warriors: acc.warriors + curr.warriors,
        }),
        { scouts: 0, garrison: 0, police: 0, warriors: 0 }
      );

      // Find branch with highest score
      let highestBranchId = "scouts";
      let highestScore = totals.scouts;

      if (totals.garrison > highestScore) {
        highestBranchId = "garrison";
        highestScore = totals.garrison;
      }
      if (totals.police > highestScore) {
        highestBranchId = "police";
        highestScore = totals.police;
      }
      if (totals.warriors > highestScore) {
        highestBranchId = "warriors";
        highestScore = totals.warriors;
      }

      const branch = MILITARY_BRANCHES.find((b) => b.id === highestBranchId) || MILITARY_BRANCHES[0];
      setAssignedBranch(branch);
      setQuizFinished(true);

      // Sound feedback for quiz completion
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15); // A4
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.3); // C#5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setQuizFinished(false);
    setAssignedBranch(null);
  };

  const renderBranchIcon = (iconName: string) => {
    const size = "h-12 w-12 text-red-500 mb-4";
    switch (iconName) {
      case "Compass": return <Compass className={size} />;
      case "Shield": return <Shield className={size} />;
      case "Crown": return <Crown className={size} />;
      case "Swords": return <Swords className={size} />;
      default: return <Compass className={size} />;
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
  const progressPercent = ((currentQuestionIdx) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section id="aptitude-test" className="py-24 px-6 md:px-12 bg-zinc-950 text-white border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-red-500 block mb-2">
            EVALUASI PSIKOLOGIS MILITER
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-white mb-4">
            Uji Kelayakan Cabang Militer
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full" />
          <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400 font-light">
            Selesaikan simulasi psikologis taktis untuk menentukan di divisi militer mana kamu akan ditempatkan. 
            Masing-masing divisi memiliki hak istimewa, tanggung jawab, dan tingkat kematian yang berbeda.
          </p>
        </div>

        {/* Interactive Quiz Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-10 backdrop-blur-sm shadow-xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-zinc-500">
                    <span>PERTANYAAN {currentQuestionIdx + 1} DARI {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(progressPercent)}% SELESAI</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                    <div 
                      className="h-full bg-red-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-relaxed">
                  {currentQuestion.text}
                </h3>

                {/* Options list */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.scores)}
                      className="w-full text-left p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 hover:border-red-600 text-sm leading-relaxed text-zinc-300 hover:text-white transition-all duration-200 group flex justify-between items-center"
                    >
                      <span>{option.text}</span>
                      <span className="h-4 w-4 rounded-full border border-zinc-700 group-hover:border-red-500 shrink-0 ml-4 group-hover:bg-red-950/50 flex items-center justify-center transition-colors">
                        <span className="h-2 w-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Quiz Results Card */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-center flex flex-col items-center py-4"
              >
                {assignedBranch ? (
                  <div className="flex flex-col items-center">
                    {renderBranchIcon(assignedBranch.iconName)}
                    
                    <span className="text-xs font-mono tracking-[0.25em] text-red-500 uppercase font-bold block mb-1">
                      HASIL EVALUASI SELESAI
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase text-white mb-2">
                      {assignedBranch.name}
                    </h3>
                    <p className="text-sm font-mono text-zinc-400 italic mb-1">
                      &quot;{assignedBranch.motto}&quot;
                    </p>
                    <p className="text-xs text-zinc-500 font-mono mb-6">
                      ({assignedBranch.mottoTranslation})
                    </p>

                    <div className="h-px w-full bg-zinc-800 my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left w-full mt-2">
                      <div className="md:col-span-7 space-y-4">
                        <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                          RINGKASAN REKRUTMEN
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                          {assignedBranch.description}
                        </p>
                        <p className="text-xs font-mono text-zinc-500 bg-zinc-950 p-3 rounded-lg border border-zinc-850 leading-relaxed">
                          🛡️ <span className="text-zinc-400 font-semibold">Tanda Lambang:</span> {assignedBranch.insigniaDescription}
                        </p>
                      </div>

                      <div className="md:col-span-5 space-y-3.5">
                        <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                          TUGAS PERTEMPURAN UTAMA
                        </h4>
                        <ul className="space-y-2">
                          {assignedBranch.primaryDuties.map((duty, idx) => (
                            <li key={idx} className="flex gap-2.5 items-start text-xs text-zinc-300">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="mt-10 px-6 py-3 rounded-lg bg-zinc-100 hover:bg-red-600 hover:text-white text-zinc-950 font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Ulangi Tes Psikologi
                    </button>
                  </div>
                ) : (
                  <p className="text-zinc-500 font-mono text-sm">Gagal mengevaluasi cabang militer.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
