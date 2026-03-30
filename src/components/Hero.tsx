import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 10000, suffix: "+", label: "Seedlings Supplied" },
  { end: 200,   suffix: "+", label: "Farmers Served" },
  { end: 15,    suffix: "+", label: "Counties Reached" },
  { end: 8,     suffix: "+", label: "Years Experience" },
];

function useCountUp(end: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
}

function StatCard({ end, suffix, label, started, delay = 0 }: {
  end: number; suffix: string; label: string; started: boolean; delay?: number;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (started) {
      const t = setTimeout(() => setActive(true), delay);
      return () => clearTimeout(t);
    }
  }, [started, delay]);

  const count = useCountUp(end, 2000, active);
  const display = end >= 1000
    ? (count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K` : count)
    : count;

  return (
    <div className="flex flex-col items-center py-4 px-3 bg-black/25 hover:bg-black/35 transition-colors">
      <span className="text-2xl font-extrabold text-lime-300 leading-none tabular-nums">
        {display}{suffix}
      </span>
      <span className="text-xs font-semibold text-stone-300 mt-1 tracking-wide">{label}</span>
    </div>
  );
}

export default function Hero() {
  const images = [
    "/projects/hero.jpg",
    "/projects/hero1.jpg",
    "/projects/hero2.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Trigger count-up when stats bar scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[68vh]">
      {images.map((img, i) => (
        <div key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-700 via-green-500 to-lime-500 z-10" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-14 pb-8 min-h-[68vh]">
        <div className="flex-1 flex flex-col items-center justify-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-black/30 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
            <span className="text-base">🌱</span>
            <span className="text-xs font-bold tracking-widest text-lime-300 uppercase">Oscar Farms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Advancing Agriculture Through Knowledge and Quality Seedlings
          </h1>
          <p className="text-sm sm:text-base font-medium text-stone-200 mb-7 leading-relaxed max-w-xl">
            Oscar Farms supplies high-quality avocado and macadamia seedlings,
            supports schools through agricultural programs, and provides
            expert consultancy to farmers and institutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all">
              🌿 Explore Seedlings
            </button>
            <button className="px-6 py-3 rounded-2xl border-2 border-white/50 text-white font-bold text-sm backdrop-blur-sm hover:bg-white/10 transition-all">
              📋 Book Consultation
            </button>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === index ? "w-6 h-2 bg-lime-400" : "w-2 h-2 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        {/* Animated stats bar */}
        <div ref={statsRef} className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10">
          {stats.map(({ end, suffix, label }, i) => (
            <StatCard key={label} end={end} suffix={suffix} label={label} started={statsStarted} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}