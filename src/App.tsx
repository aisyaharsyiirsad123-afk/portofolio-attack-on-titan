import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import CharacterSection from "./components/CharacterSection";
import TitanEncyclopedia from "./components/TitanEncyclopedia";
import MilitaryAptitudeTest from "./components/MilitaryAptitudeTest";
import TitanSlayerMiniGame from "./components/TitanSlayerMiniGame";
import TimelineSection from "./components/TimelineSection";
import AudioAmbience from "./components/AudioAmbience";
import { Swords, Menu, X, Landmark, Compass, ShieldAlert } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Asset paths (from generated images)
  const heroImg = "/src/assets/images/aot_hero_banner_1783312656114.jpg";
  const colossusImg = "/src/assets/images/aot_colossus_wall_1783312671076.jpg";
  const wingsImg = "/src/assets/images/aot_scout_wings_1783312684752.jpg";

  // Watch scroll positions to update current highlighted nav section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ["hero", "characters", "titans", "aptitude-test", "mini-game", "timeline"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "characters", label: "Karakter" },
    { id: "titans", label: "Nine Titans" },
    { id: "aptitude-test", label: "Tes Militer" },
    { id: "mini-game", label: "Game ODM" },
    { id: "timeline", label: "Timeline" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-red-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <header className="fixed top-0 inset-x-0 h-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 z-40 flex items-center justify-between px-6 md:px-12">
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img 
            src={wingsImg} 
            alt="Scout Wings Logo" 
            className="h-9 w-9 transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="font-sans font-black text-sm tracking-[0.15em] text-white block">
              SHINGEKI
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-red-500 uppercase block font-bold">
              HQ DATABASE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 relative py-1 ${
                  isActive ? "text-red-500 font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Explore CTA inside header */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("mini-game")}
            className="px-4 py-2 border border-red-600/50 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300"
          >
            LATIHAN ODM
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white transition-colors"
          title="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-zinc-950 z-30 pt-24 px-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-lg font-bold uppercase tracking-widest py-3 border-b border-zinc-900 ${
                  activeSection === item.id ? "text-red-500" : "text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("mini-game")}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs rounded-lg transition-colors mt-4"
          >
            Mulai Bermain Game ODM
          </button>
        </div>
      )}

      {/* Main Container Layout */}
      <main className="pt-0">
        
        {/* 1. Hero Landing Section */}
        <Hero 
          heroImageUrl={heroImg} 
          wingsImageUrl={wingsImg}
          onExploreClick={() => scrollToSection("characters")}
        />

        {/* 2. Character Section */}
        <CharacterSection />

        {/* Cinematic Wall Divider Graphic banner between sections */}
        <div 
          className="h-44 sm:h-56 md:h-64 relative bg-cover bg-center overflow-hidden flex items-center justify-center border-y border-zinc-900"
          style={{ backgroundImage: `url(${colossusImg})` }}
          referrerPolicy="no-referrer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950" />
          <div className="relative text-center px-4 max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.25em] text-red-500 uppercase font-black">
              TEMBOK PERTAHANAN PARADIS
            </span>
            <p className="text-sm sm:text-base md:text-lg text-zinc-100 font-sans italic tracking-wide mt-2">
              &quot;Jika kita tidak berjuang, kita tidak akan pernah bisa menang. Dunia ini keras, tapi kita harus melangkah.&quot;
            </p>
          </div>
        </div>

        {/* 3. Titan Encyclopedia */}
        <TitanEncyclopedia />

        {/* 4. Military Aptitude Test */}
        <MilitaryAptitudeTest />

        {/* 5. ODM Mini-game */}
        <TitanSlayerMiniGame />

        {/* 6. Historic Events Timeline */}
        <TimelineSection />

      </main>

      {/* Floating Audio Controller */}
      <AudioAmbience />

      {/* Immersive Responsive Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 px-6 md:px-12 text-zinc-500 text-xs text-center relative overflow-hidden">
        {/* Decorative badge overlay */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <img 
            src={wingsImg} 
            alt="Scout Wings Footer" 
            className="h-10 w-10 opacity-35 grayscale"
            referrerPolicy="no-referrer"
          />

          <p className="max-w-md text-zinc-400 font-sans italic text-center font-light leading-relaxed">
            &quot;Dedikasikan hatimu untuk perjuangan panjang yang belum selesai. Umat manusia di balik tembok akan selalu mengingat pengorbananmu.&quot;
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-zinc-600 font-mono text-[10px] uppercase">
            <span>© 2026 Shingeki no Kyojin Portofolio</span>
            <span>•</span>
            <span>Paradis Military Command HQ</span>
            <span>•</span>
            <span>Desain Responsif Premium</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
