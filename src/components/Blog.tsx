import { useState } from "react";

const featured = {
  tag: "Expert Insight",
  title: "Why Kenya's Avocado Future Depends on Grafted Seedlings — Not Luck",
  excerpt: "After three decades of studying soil science, crop physiology, and smallholder farming systems across the Mt. Kenya region, one truth has crystallised: the difference between a thriving avocado farm and a failing one is rarely effort. It is genetics — specifically, the quality of the seedling in the ground.",
  author: "Prof. Oscar Mugendi",
  role: "Agronomist & Founder, Oscar Farms · Chuka University",
  date: "March 14, 2025",
  readTime: "8 min read",
  emoji: "🥑",
};

const posts = [
  { tag: "Macadamia", emoji: "🌰", title: "Kiambu 3 vs Kiambu 4: Which Macadamia Variety Wins in Central Kenya?", excerpt: "A field-by-field comparison drawn from five seasons of data across Kirinyaga, Murang'a, and Kiambu counties. The results may surprise conventional wisdom.", date: "Feb 28, 2025", readTime: "6 min read" },
  { tag: "School Agriculture", emoji: "🏫", title: "How KCSE Agriculture Students Are Outperforming National Averages With Living Farms", excerpt: "Schools that moved from textbook diagrams to real seedling projects are seeing measurable improvements in both practical scores and student engagement.", date: "Feb 10, 2025", readTime: "5 min read" },
  { tag: "Soil Science", emoji: "🌍", title: "The pH Factor: Why Most Smallholder Farmers Are Losing Yield Without Knowing It", excerpt: "Soil acidity is the silent yield killer in the Mt. Kenya region. Here's how to test, interpret, and correct it with locally available inputs.", date: "Jan 22, 2025", readTime: "7 min read" },
  { tag: "Tree Initiative", emoji: "🌳", title: "Planting 10,000 Trees: What We Learned in Year One", excerpt: "Our community tree initiative passed its first anniversary. The data, the surprises, and the communities that made it possible.", date: "Jan 5, 2025", readTime: "4 min read" },
  { tag: "Training", emoji: "📚", title: "Farmer Field Schools vs. Lecture-Based Training: A Practitioner's Verdict", excerpt: "Having trained over 200 farmers using both models, the evidence is clear — but the answer is more nuanced than the debate suggests.", date: "Dec 18, 2024", readTime: "6 min read" },
  { tag: "Consultancy", emoji: "🔬", title: "The Five Questions Every Farmer Should Ask Before Planting an Acre of Avocado", excerpt: "Questions that save money, time, and heartbreak — drawn from hundreds of farm visits across Eastern and Central Kenya.", date: "Dec 2, 2024", readTime: "5 min read" },
  { tag: "Soil Science", emoji: "🧪", title: "Understanding Your Soil Test Results: A Plain-Language Guide for Kenyan Farmers", excerpt: "Laboratory reports are full of numbers most farmers never learn to read. This guide breaks down every value that matters.", date: "Nov 15, 2024", readTime: "8 min read" },
  { tag: "Avocado", emoji: "🥑", title: "When to Irrigate, When to Wait: Water Management for Young Avocado Orchards", excerpt: "Overwatering kills more avocado seedlings than drought does. Understanding the balance could save your establishment-phase trees.", date: "Nov 1, 2024", readTime: "5 min read" },
  { tag: "Macadamia", emoji: "🌰", title: "The Business Case for Macadamia in Tharaka Nithi: A 10-Year Projection", excerpt: "Using real farm data from the region, we model what a 1-acre macadamia investment looks like from establishment to peak production.", date: "Oct 18, 2024", readTime: "9 min read" },
];

const tags = ["All", "Avocado", "Macadamia", "School Agriculture", "Soil Science", "Tree Initiative", "Training", "Consultancy"];

function TagBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-green-100 text-green-700">
      {label}
    </span>
  );
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />

      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-2">Oscar Farms · Knowledge Hub</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Field Notes & Farm Wisdom</h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Insights from over 30 years in the field — where academic rigour meets soil under the fingernails.
            Written by <span className="text-lime-300 font-semibold">Prof. Oscar Mugendi</span>, agronomist, educator, and practitioner.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Featured post */}
        <div className="bg-white rounded-3xl border border-green-100 shadow-md overflow-hidden mb-10">
          <div className="bg-gradient-to-br from-green-800 to-green-600 p-8 sm:p-10 relative">
            <div className="absolute top-4 right-6 text-6xl opacity-20">{featured.emoji}</div>
            <TagBadge label={featured.tag} />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3 mb-3 leading-snug max-w-2xl">{featured.title}</h2>
            <p className="text-stone-200 text-sm leading-relaxed max-w-2xl mb-5">{featured.excerpt}</p>
            <button className="px-5 py-2.5 rounded-xl bg-lime-400 text-green-900 font-bold text-sm hover:-translate-y-0.5 transition-all shadow">
              Read Full Article →
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-8 py-4 bg-green-50 border-t border-green-100">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">OM</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-900">{featured.author}</p>
              <p className="text-xs text-green-600">{featured.role}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all border ${
                activeTag === tag
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-green-700 border-green-200 hover:border-green-400"
              }`}>
              {tag}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filtered.map((post) => (
            <div key={post.title}
              className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden group cursor-pointer">
              <div className="bg-gradient-to-br from-green-50 to-amber-50 p-5 border-b border-green-50">
                <span className="text-3xl">{post.emoji}</span>
              </div>
              <div className="p-5">
                <TagBadge label={post.tag} />
                <h3 className="text-sm font-extrabold text-green-950 mt-2 mb-2 leading-snug group-hover:text-green-700 transition-colors">{post.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                  <span>{post.date}</span>
                  <span className="text-green-600 font-bold">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professor bio */}
        <div className="bg-white rounded-3xl border border-green-100 shadow-md p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 overflow-hidden">
            <img src="/projects/professor.jpg" alt="Prof. Mugendi" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = "OM"; }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">About the Author</p>
            <h3 className="text-lg font-extrabold text-green-950 mb-1">Prof. Oscar Mugendi</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Senior lecturer in Agronomy at <span className="font-semibold text-green-800">Chuka University</span> and founder of Oscar Farms. With over 30 years bridging academic research and practical farming, Prof. Oscar is one of the region's most trusted voices on smallholder crop production, seedling quality, and sustainable land use.
            </p>
          </div>
          <a href="/contact" className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-sm shadow hover:-translate-y-0.5 transition-all">
            Book a Consultation
          </a>
        </div>

      </div>
    </div>
  );
}