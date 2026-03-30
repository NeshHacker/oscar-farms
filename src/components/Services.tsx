import { useState } from "react";

// ─── Shared ───────────────────────────────────────────────────────────────────

const phoneNumber = "254111924282";
function whatsapp(msg: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
}

function WAButton({ label, message, className = "" }: { label: string; message: string; className?: string }) {
  return (
    <a href={whatsapp(message)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg ${className}`}>
      {label}
    </a>
  );
}

const tabs = [
  { key: "consultancy", label: "Consultancy",    icon: "🔬" },
  { key: "training",    label: "Training",        icon: "📚" },
  { key: "tree",        label: "Tree Initiative", icon: "🌳" },
];

// ─── Shared Professor Card ────────────────────────────────────────────────────
function ProfCard() {
  return (
    <div className="bg-green-900 rounded-3xl p-7 text-white flex flex-col sm:flex-row gap-6 items-start mt-14">
      <div className="w-16 h-16 rounded-2xl bg-green-700 border-2 border-lime-400/50 flex items-center justify-center font-extrabold text-2xl flex-shrink-0 overflow-hidden">
        <img src="/projects/professor.png" alt="Prof. Oscar Mugendi" className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = "OM"; }} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-1">Meet Our Lead Agronomist</p>
        <h3 className="text-xl font-extrabold text-white mb-1">Prof. Oscar Mugendi</h3>
        <p className="text-lime-300 text-sm font-semibold mb-3">Senior Lecturer in Agronomy · Chuka University</p>
        <p className="text-stone-300 text-sm leading-relaxed">
          With over <strong className="text-white">30 years of experience</strong> in practical agriculture, soil science, and farmer training,
          Prof. Mugendi has helped hundreds of farmers transition from subsistence to profitable agribusiness across Central and Eastern Kenya.
          His philosophy: <em className="text-lime-200">"Every farm has potential. The right knowledge unlocks it."</em>
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {["PhD in Agronomy", "Chuka University Faculty", "30+ Years Experience", "200+ Farmers Trained"].map((tag) => (
            <span key={tag} className="text-xs bg-green-800 text-lime-300 font-semibold px-3 py-1 rounded-full border border-green-700">✓ {tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. CONSULTANCY
// ═══════════════════════════════════════════════════════════════════════════════

const painPoints = [
  { icon: "📉", title: "Poor yields despite effort",      desc: "You're working hard but the harvest doesn't reflect it. The problem is almost never effort — it's knowledge." },
  { icon: "🌱", title: "Wrong crop or variety selection", desc: "Planting the wrong variety for your altitude or rainfall zone quietly costs you years of income." },
  { icon: "🧪", title: "Soil fertility issues",           desc: "Most farms in Central Kenya have uncorrected pH problems. Your fertiliser may be working against you." },
  { icon: "🐛", title: "Pest & disease losses",          desc: "Late identification and wrong treatment choices destroy entire seasons. Prevention costs far less than cure." },
  { icon: "📦", title: "No market strategy",             desc: "Growing a surplus without knowing where to sell is just as costly as growing nothing at all." },
  { icon: "📐", title: "Poor farm layout & planning",    desc: "Spacing, windbreaks, irrigation positioning — getting these wrong at establishment is expensive to fix later." },
];

const consultancyServices = [
  { icon: "🗺️", label: "Farm Planning & Layout" },
  { icon: "🌿", label: "Crop & Variety Selection" },
  { icon: "🧪", label: "Soil Testing & Recommendations" },
  { icon: "💧", label: "Irrigation Advisory" },
  { icon: "🐛", label: "Pest & Disease Management" },
  { icon: "📊", label: "Agribusiness Profitability Strategy" },
  { icon: "🏫", label: "Institutional Farm Setup" },
  { icon: "🔗", label: "Market Linkage & Value Chains" },
];

const consultancyPackages = [
  {
    name: "Starter",
    price: "KSh 3,000 – 5,000",
    tag: "Remote",
    borderClass: "border-green-200",
    highlight: false,
    includes: ["30–45 min phone or video consultation", "Crop / variety recommendation", "Soil management advice", "Written summary via WhatsApp"],
    cta: "Book Phone Consultation",
    msg: "Hello Prof. Mugendi 👋\nI'd like to book a Starter Phone Consultation.\nName: \nLocation: \nMain challenge: ",
  },
  {
    name: "Farm Visit",
    price: "From KSh 10,000",
    tag: "Most Popular",
    borderClass: "border-green-600",
    highlight: true,
    includes: ["Physical visit to your farm", "Full soil & crop assessment", "Written recommendations report", "Variety & input guidance", "Follow-up WhatsApp support (2 weeks)"],
    cta: "Book Farm Visit",
    msg: "Hello Prof. Mugendi 👋\nI'd like to book a Farm Visit consultation.\nName: \nFarm location: \nFarm size (acres): \nMain challenge: ",
  },
  {
    name: "Premium Advisory",
    price: "Monthly Retainer",
    tag: "Best Value",
    borderClass: "border-amber-400",
    highlight: false,
    includes: ["Continuous monthly guidance", "WhatsApp support (priority)", "Seasonal planting calendar", "Monthly check-in call", "Pest & disease alerts", "Market price updates"],
    cta: "Inquire About Retainer",
    msg: "Hello Prof. Mugendi 👋\nI'm interested in the Premium Monthly Advisory retainer.\nName: \nFarm type & size: \nLocation: ",
  },
];

function ConsultancyPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute right-0 bottom-0 text-[10rem] opacity-5 select-none leading-none">🔬</div>
        <div className="relative max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-widest text-lime-300 uppercase bg-green-800/60 border border-lime-500/30 px-4 py-1.5 rounded-full mb-5">🔬 Expert Farm Consultancy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Turn Your Farm Into a<br /><span className="text-lime-300">High-Yield, Profitable Enterprise.</span>
          </h2>
          <p className="text-stone-200 text-base leading-relaxed mb-2">
            Backed by <strong className="text-white">30+ years of agricultural expertise</strong> and university-grade research. Serving farmers, institutions, and agribusinesses across Kenya.
          </p>
          <p className="text-stone-300 text-sm italic mb-7">
            "Most farm problems are not land problems. They are knowledge problems. Let's fix that."
            <span className="text-lime-300 font-semibold not-italic"> — Prof. Oscar Mugendi</span>
          </p>
          <WAButton label="📲 Book Consultation via WhatsApp" message="Hello Prof. Mugendi 👋\nI'd like to book a farm consultation.\nName: \nLocation: \nMy main challenge: " className="bg-lime-400 text-green-900 px-7 py-3.5 text-base" />
        </div>
      </div>

      {/* Pain points */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Sound Familiar?</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-2">Problems We Solve</h3>
        <p className="text-sm text-stone-500 mb-5 max-w-xl">If any of these resonate, you are losing money every season you wait.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-red-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="text-2xl mb-3 block">{p.icon}</span>
              <h4 className="font-extrabold text-red-800 text-sm mb-1">{p.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <p className="text-sm text-red-800 font-semibold">One consultation with Prof. Mugendi typically saves farmers <span className="font-extrabold">more than its cost</span> in the first season alone.</p>
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">What's Covered</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Consultancy Areas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {consultancyServices.map((s) => (
            <div key={s.label} className="bg-white border border-green-100 rounded-2xl p-4 flex items-center gap-3 hover:border-green-300 hover:shadow-sm transition-all">
              <span className="text-xl flex-shrink-0">{s.icon}</span>
              <span className="text-xs font-bold text-green-900 leading-snug">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Transparent Pricing</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-6">Consultancy Packages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {consultancyPackages.map((pkg) => (
            <div key={pkg.name} className={`rounded-2xl border-2 overflow-hidden bg-white hover:-translate-y-1 transition-all ${pkg.borderClass} ${pkg.highlight ? "shadow-xl" : "shadow-sm"}`}>
              {pkg.highlight && <div className="bg-green-600 text-center text-xs font-bold text-white py-1.5 tracking-widest uppercase">⭐ Most Popular</div>}
              <div className="p-6">
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">{pkg.tag}</p>
                <h4 className="text-xl font-extrabold text-green-950 mb-1">{pkg.name}</h4>
                <p className="text-2xl font-extrabold text-green-700 mb-4">{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="w-4 h-4 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <WAButton label={`📲 ${pkg.cta}`} message={pkg.msg}
                  className={`w-full py-3 text-sm ${pkg.highlight ? "bg-gradient-to-r from-green-700 to-green-500 text-white" : "border-2 border-green-200 text-green-700 bg-transparent hover:bg-green-50 shadow-none"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProfCard />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. TRAINING
// ═══════════════════════════════════════════════════════════════════════════════

const audiences = [
  { icon: "👨‍🌾", label: "Individual Farmers",         desc: "One-on-one or small group sessions tailored to your farm and crops." },
  { icon: "🤝",  label: "Farmer Groups & Co-ops",     desc: "Group workshops designed for cooperatives, chamas, and self-help groups." },
  { icon: "🏫",  label: "Secondary Schools",            desc: "KCSE agriculture practical training aligned to the national curriculum." },
  { icon: "👩‍💼", label: "Youth Agribusiness Programs", desc: "Entry-level agripreneurship training for young people entering farming." },
];

const trainingTopics = [
  { icon: "🥑", label: "Avocado Farming (Export-Grade)" },
  { icon: "🌰", label: "Macadamia Production" },
  { icon: "🌱", label: "Nursery Establishment" },
  { icon: "🍃", label: "Organic Farming Practices" },
  { icon: "🌦️", label: "Climate-Smart Agriculture" },
  { icon: "📊", label: "Agribusiness & Value Chains" },
  { icon: "🧪", label: "Soil Health Management" },
  { icon: "💧", label: "Water & Irrigation Management" },
];

const deliveryFormats = [
  { icon: "🚜", title: "On-Farm Training",   desc: "We come to your farm. Learning happens in context — on your soil, with your crops." },
  { icon: "🏟️", title: "Workshops",           desc: "Half-day and full-day group sessions held at convenient community venues." },
  { icon: "🏫", title: "School Sessions",    desc: "Scheduled practical sessions at your school farm. Linked to KNEC curriculum." },
  { icon: "💻", title: "Online (Zoom/Meet)", desc: "Remote sessions for learners outside the region or with scheduling constraints." },
];

const trainingModules = [
  { duration: "Half Day", level: "All Levels",   levelColor: "bg-green-100 text-green-700",  title: "Farm Record-Keeping & Simple Bookkeeping",   price: "From KSh 1,500/person", desc: "Paper and mobile-based systems to track inputs, outputs, and margins." },
  { duration: "1 Day",    level: "Beginner",     levelColor: "bg-lime-100 text-lime-700",    title: "Seedling Production Fundamentals",            price: "From KSh 2,500/person", desc: "Grafting, rootstock selection, nursery hygiene, and quality assurance." },
  { duration: "1 Day",    level: "All Levels",   levelColor: "bg-green-100 text-green-700",  title: "KCSE Agriculture Practical Coaching",          price: "From KSh 5,000/school", desc: "Hands-on sessions aligned with KNEC practical paper requirements." },
  { duration: "2 Days",   level: "Intermediate", levelColor: "bg-amber-100 text-amber-700",  title: "Soil Health & Fertiliser Management",         price: "From KSh 4,000/person", desc: "Reading soil reports, nutrient management, and corrective programmes." },
  { duration: "2 Days",   level: "Intermediate", levelColor: "bg-amber-100 text-amber-700",  title: "Climate-Smart Agriculture Practices",         price: "From KSh 4,500/person", desc: "Mulching, water harvesting, agroforestry integration, and resilience." },
  { duration: "3 Days",   level: "Advanced",     levelColor: "bg-red-100 text-red-700",      title: "Commercial Orchard Establishment",            price: "From KSh 8,000/person", desc: "Site selection, land preparation, planting, and first-year management." },
];

function TrainingPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-800 to-green-800 rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute right-0 bottom-0 text-[10rem] opacity-5 select-none leading-none">📚</div>
        <div className="relative max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-widest text-lime-300 uppercase bg-green-800/60 border border-lime-500/30 px-4 py-1.5 rounded-full mb-5">📚 Farmer Training Programmes</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Learn Modern, Profitable Farming<br /><span className="text-lime-300">From an Expert Who Has Done It.</span>
          </h2>
          <p className="text-stone-200 text-base leading-relaxed mb-2">
            Trained <strong className="text-white">200+ farmers</strong> across Kenya. Hands-on, practical, results-focused — not textbook farming, but farming that works in the field.
          </p>
          <p className="text-stone-300 text-sm italic mb-7">
            "Classroom agriculture produces farmers who can pass an exam. Oscar Farms produces farmers who can feed a county."
            <span className="text-lime-300 font-semibold not-italic"> — Prof. Oscar Mugendi</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WAButton label="📲 Book Training Session" message="Hello Oscar Farms 👋\nI'd like to book a training session.\nName: \nOrganisation/Farm: \nGroup size: \nTopic of interest: " className="bg-lime-400 text-green-900 px-7 py-3.5 text-base" />
            <WAButton label="📋 Request Custom Programme" message="Hello Oscar Farms 👋\nI'd like to request a custom training programme.\nOrganisation: \nTarget group: \nEstimated participants: \nPreferred dates: " className="border-2 border-white/50 text-white px-7 py-3.5 text-base bg-transparent shadow-none" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[{ value: "200+", label: "Farmers Trained" }, { value: "30+", label: "Years Teaching" }, { value: "8+", label: "Training Topics" }, { value: "4", label: "Delivery Formats" }].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-green-100 p-5 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-green-700">{s.value}</p>
            <p className="text-xs text-stone-500 font-semibold mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Audiences */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Who This Is For</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Training For Every Type of Farmer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {audiences.map((a) => (
            <div key={a.label} className="bg-white rounded-2xl border border-green-100 p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="text-3xl flex-shrink-0">{a.icon}</span>
              <div>
                <h4 className="font-extrabold text-green-900 text-base mb-1">{a.label}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">What You'll Learn</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Training Topics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trainingTopics.map((t) => (
            <div key={t.label} className="bg-white border border-green-100 rounded-2xl p-4 flex items-center gap-3 hover:border-green-300 hover:shadow-sm transition-all">
              <span className="text-xl flex-shrink-0">{t.icon}</span>
              <span className="text-xs font-bold text-green-900 leading-snug">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery formats */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">How We Deliver</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Training Formats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deliveryFormats.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-green-100 p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h4 className="font-extrabold text-green-900 text-base mb-1">{f.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Structured Modules</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Training Programmes & Pricing</h3>
        <div className="flex flex-col gap-4">
          {trainingModules.map((mod) => (
            <div key={mod.title} className="bg-white rounded-2xl border border-green-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-all">
              <div className="flex-shrink-0">
                <div className="bg-green-50 rounded-xl px-4 py-2 inline-block text-center">
                  <p className="text-base font-extrabold text-green-700 leading-none">{mod.duration}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-sm font-extrabold text-green-950">{mod.title}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${mod.levelColor}`}>{mod.level}</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{mod.desc}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                <p className="text-sm font-extrabold text-green-700">{mod.price}</p>
                <WAButton label="Enquire →" message={`Hello Oscar Farms 👋\nI'd like to enquire about: "${mod.title}"\nName: \nGroup size: \nPreferred date: `}
                  className="border-2 border-green-200 text-green-700 px-4 py-2 text-xs bg-transparent hover:bg-green-50 shadow-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center">
        <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-2">For Groups & Institutions</p>
        <h3 className="text-xl font-extrabold text-green-950 mb-2">Need a Custom Programme?</h3>
        <p className="text-sm text-stone-600 mb-5 max-w-lg mx-auto">We design bespoke programmes for cooperatives, county governments, NGOs, and schools. Tell us your group size, topic, and budget — we'll build something that works.</p>
        <WAButton label="📩 Request Custom Programme" message="Hello Oscar Farms 👋\nI'd like to request a custom training programme.\nOrganisation: \nTarget group: \nEstimated participants: \nTopics needed: \nBudget range: "
          className="bg-gradient-to-r from-green-700 to-green-500 text-white px-8 py-3.5 text-base" />
      </div>

      <ProfCard />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. TREE INITIATIVE
// ═══════════════════════════════════════════════════════════════════════════════

const treeActivities = [
  { icon: "🌳", title: "Tree Planting Campaigns",   desc: "Community-wide planting events coordinated across sub-counties, with follow-up monitoring and care training." },
  { icon: "🏫", title: "School Greening Programs",  desc: "Engaging students in planting and caring for trees — building the next generation of environmental stewards." },
  { icon: "📢", title: "Community Outreach",         desc: "Awareness campaigns on the economic and environmental value of trees in farming landscapes." },
  { icon: "🌾", title: "Agroforestry Promotion",    desc: "Integrating trees with crops to improve soil health, reduce erosion, and create diversified income streams." },
];

const treeSpecies = [
  { emoji: "🥑", name: "Avocado",            reason: "Dual-purpose: food security + household income" },
  { emoji: "🌰", name: "Macadamia",          reason: "Long-term wealth tree for smallholder families" },
  { emoji: "🌳", name: "Grevillea",          reason: "Fast-growing windbreak and timber species" },
  { emoji: "🫘", name: "Leucaena",           reason: "Nitrogen fixer and high-protein livestock fodder" },
  { emoji: "🌿", name: "Moringa",            reason: "High nutritional and medicinal value" },
  { emoji: "🌲", name: "Indigenous Species", reason: "Biodiversity restoration and watershed protection" },
];

const partners = [
  { icon: "🏛️", label: "County Governments", desc: "Partnering on environmental and food security mandates" },
  { icon: "🌍", label: "NGOs & INGOs",        desc: "Joint campaigns on climate resilience and reforestation" },
  { icon: "🏫", label: "Schools & Colleges",  desc: "Greening school compounds and educating students" },
  { icon: "🏢", label: "Corporate CSR",        desc: "Tree sponsorship and offset programmes for businesses" },
];

const monetize = [
  { icon: "🌱", title: "Sponsored Tree Planting",    desc: "Individuals or businesses sponsor specific trees at KSh 500–2,000 per tree, with photo updates and a certificate.", cta: "Sponsor Trees",        msg: "Hello Oscar Farms 👋\nI'd like to sponsor tree planting.\nName / Organisation: \nNumber of trees: \nBudget: " },
  { icon: "🤝", title: "Corporate CSR Partnerships", desc: "Annual or seasonal partnership packages for companies seeking verified environmental impact for their CSR reporting.", cta: "Discuss Partnership", msg: "Hello Oscar Farms 👋\nWe're interested in a Corporate CSR tree partnership.\nCompany: \nContact person: \nCSR budget range: " },
  { icon: "🏫", title: "School Seedling Supply",     desc: "Schools buy seedlings for their greening programmes and KCSE practical farms at subsidised rates.",                  cta: "Order for Our School", msg: "Hello Oscar Farms 👋\nWe'd like to order seedlings for our school's greening programme.\nSchool name: \nCounty: \nNumber of seedlings: " },
];

function TreeInitiativePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-950 to-emerald-800 rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute right-0 bottom-0 text-[12rem] opacity-5 select-none leading-none">🌳</div>
        <div className="relative max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-widest text-lime-300 uppercase bg-green-800/60 border border-lime-500/30 px-4 py-1.5 rounded-full mb-5">🌳 Community Tree Initiative</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Restoring the Environment,<br /><span className="text-lime-300">One Tree at a Time.</span>
          </h2>
          <p className="text-stone-200 text-base leading-relaxed mb-3">
            A community-centred programme planting <strong className="text-white">10,000 trees</strong> across Tharaka Nithi and neighbouring counties by 2026. Every seedling is traceable. Every community receives follow-up care training.
          </p>
          <p className="text-stone-300 text-sm italic mb-7">
            "A farmer who plants a tree is making a promise to the next generation."
            <span className="text-lime-300 font-semibold not-italic"> — Prof. Oscar Mugendi</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WAButton label="🤝 Partner With Us" message="Hello Oscar Farms 👋\nI'd like to discuss partnering with the Tree Initiative.\nOrganisation: \nPartnership interest: " className="bg-lime-400 text-green-900 px-7 py-3.5 text-base" />
            <WAButton label="🌱 Sponsor Tree Planting" message="Hello Oscar Farms 👋\nI'd like to sponsor tree planting.\nName / Organisation: \nNumber of trees: " className="border-2 border-white/50 text-white px-7 py-3.5 text-base bg-transparent shadow-none" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[{ value: "500+", label: "Trees Planted" }, { value: "5+", label: "Schools Engaged" }, { value: "6", label: "Sub-Counties" }, { value: "2026", label: "Target Year" }].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-green-100 p-5 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-green-700">{s.value}</p>
            <p className="text-xs text-stone-500 font-semibold mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Activities */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">What We Do</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Programme Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {treeActivities.map((a) => (
            <div key={a.title} className="bg-white rounded-2xl border border-green-100 p-5 flex items-start gap-4 hover:shadow-md transition-all">
              <span className="text-3xl flex-shrink-0">{a.icon}</span>
              <div>
                <h4 className="font-extrabold text-green-900 text-base mb-1">{a.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Species */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">What We Plant</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Species We Work With</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {treeSpecies.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl border border-green-100 p-4 flex items-start gap-3 hover:shadow-sm transition-all">
              <span className="text-2xl flex-shrink-0">{s.emoji}</span>
              <div>
                <p className="text-sm font-extrabold text-green-900">{s.name}</p>
                <p className="text-xs text-stone-500 leading-snug">{s.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monetization / Get Involved */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Get Involved</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-2">Support the Initiative</h3>
        <p className="text-sm text-stone-500 mb-6 max-w-xl">Whether you're an individual, a school, or a corporation — there's a meaningful way for you to be part of this.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {monetize.map((m) => (
            <div key={m.title} className="bg-white rounded-2xl border border-green-100 p-6 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-3xl mb-3">{m.icon}</span>
              <h4 className="font-extrabold text-green-900 text-base mb-2">{m.title}</h4>
              <p className="text-xs text-stone-500 leading-relaxed flex-1 mb-4">{m.desc}</p>
              <WAButton label={`📲 ${m.cta}`} message={m.msg} className="bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-3 text-sm w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Who We Work With</p>
        <h3 className="text-2xl font-extrabold text-green-950 mb-5">Partnership Opportunities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.label} className="bg-white rounded-2xl border border-green-100 p-5 text-center hover:shadow-md transition-all">
              <span className="text-3xl block mb-2">{p.icon}</span>
              <h4 className="font-extrabold text-green-900 text-sm mb-1">{p.label}</h4>
              <p className="text-xs text-stone-500 leading-snug">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-green-900 rounded-3xl p-8 text-white text-center">
        <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-2">Ready to Make an Impact?</p>
        <h3 className="text-2xl font-extrabold mb-2">Join the Oscar Farms Tree Initiative</h3>
        <p className="text-stone-300 text-sm mb-6 max-w-lg mx-auto">Whether you have land, funding, students, or simply the will to make a difference — contact us and we'll find your role in this.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <WAButton label="🤝 Partner With Us" message="Hello Oscar Farms 👋\nI'd like to discuss a partnership with the Tree Initiative.\nOrganisation: \nPartnership type: " className="bg-lime-400 text-green-900 px-8 py-3.5 text-base" />
          <WAButton label="🌱 Sponsor Tree Planting" message="Hello Oscar Farms 👋\nI'd like to sponsor tree planting.\nName: \nTrees to sponsor: " className="border-2 border-white/40 text-white px-8 py-3.5 text-base bg-transparent shadow-none" />
        </div>
      </div>

      <ProfCard />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

type ActiveTab = "consultancy" | "training" | "tree";

export default function ServicesPage() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const initTab: ActiveTab = hash === "#training" ? "training" : hash === "#tree-initiative" ? "tree" : "consultancy";
  const [active, setActive] = useState<ActiveTab>(initTab);

  const setTab = (t: ActiveTab) => {
    setActive(t);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", t === "tree" ? "#tree-initiative" : `#${t}`);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />

      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-2">Expert Agricultural Services</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Designed to Increase Productivity,<br className="hidden sm:block" /> Profitability, and Sustainability.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Every service offered by Oscar Farms is personally designed and delivered by
            <span className="text-lime-300 font-semibold"> Prof. Oscar Mugendi</span> — not a junior consultant. You get the expert.
          </p>
        </div>
      </div>

      {/* Sticky tab nav */}
      <div className="sticky top-0 z-30 bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setTab(tab.key as ActiveTab)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 ${
                active === tab.key ? "border-green-600 text-green-800" : "border-transparent text-stone-400 hover:text-green-700"
              }`}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 pb-16">
        {active === "consultancy" && <ConsultancyPage />}
        {active === "training"    && <TrainingPage />}
        {active === "tree"        && <TreeInitiativePage />}
      </div>
    </div>
  );
}