import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = {
  id: string;
  title: string;
  category: string;
  type: "Full-time" | "Part-time" | "Seasonal" | "Volunteer";
  description: string;
  skills: string[];
  icon: string;
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  location: string;
  experience: string;
  message: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const roles: Role[] = [
  {
    id: "farmhand",
    title: "Farmhand",
    category: "Field Operations",
    type: "Full-time",
    icon: "🌱",
    description: "Planting, soil preparation, and filling polythene sleeves for seedling propagation.",
    skills: ["Physical stamina", "Attention to detail", "Teamwork"],
  },
  {
    id: "irrigation",
    title: "Irrigation Assistant",
    category: "Field Operations",
    type: "Full-time",
    icon: "💧",
    description: "Manage drip and sprinkler irrigation systems, monitor moisture levels, and maintain equipment.",
    skills: ["Basic plumbing", "Schedule adherence", "Problem solving"],
  },
  {
    id: "harvesting",
    title: "Harvesting Assistant",
    category: "Field Operations",
    type: "Seasonal",
    icon: "🌾",
    description: "Assist with crop harvesting, sorting, and post-harvest handling during peak seasons.",
    skills: ["Crop handling", "Speed & efficiency", "Teamwork"],
  },
  {
    id: "grafting",
    title: "Grafting Specialist",
    category: "Skilled Labour",
    type: "Full-time",
    icon: "✂️",
    description: "Perform grafting of avocado and macadamia seedlings with precision and consistency.",
    skills: ["Grafting techniques", "Steady hands", "Horticultural knowledge"],
  },
  {
    id: "packaging",
    title: "Seedling Packaging & Delivery",
    category: "Logistics",
    type: "Part-time",
    icon: "📦",
    description: "Package, label, and coordinate delivery of seedlings to clients across the region.",
    skills: ["Organisation", "Driving (preferred)", "Customer care"],
  },
  {
    id: "general",
    title: "General Farm Operations",
    category: "Field Operations",
    type: "Full-time",
    icon: "🚜",
    description: "Support day-to-day farm activities including weeding, mulching, and infrastructure upkeep.",
    skills: ["Versatility", "Physical fitness", "Reliability"],
  },
  {
    id: "admin",
    title: "Administrative Support",
    category: "Office",
    type: "Part-time",
    icon: "🗂️",
    description: "Handle records, client communication, invoicing, and social media for the farm.",
    skills: ["Computer literacy", "Communication", "Organisation"],
  },
  {
    id: "outreach",
    title: "Community Outreach",
    category: "Programs",
    type: "Volunteer",
    icon: "🏫",
    description: "Lead school visits, community workshops, and awareness programs on sustainable farming.",
    skills: ["Public speaking", "Passion for agriculture", "Empathy"],
  },
];

const categories = ["All", ...Array.from(new Set(roles.map((r) => r.category)))];

const typeBadgeStyle: Record<string, string> = {
  "Full-time":  "bg-green-100 text-green-800 border border-green-200",
  "Part-time":  "bg-blue-100 text-blue-800 border border-blue-200",
  Seasonal:     "bg-amber-100 text-amber-800 border border-amber-200",
  Volunteer:    "bg-purple-100 text-purple-800 border border-purple-200",
};

const categoryAccent: Record<string, string> = {
  "Field Operations": "bg-green-500",
  "Skilled Labour":   "bg-teal-500",
  Logistics:          "bg-blue-500",
  Office:             "bg-indigo-500",
  Programs:           "bg-purple-500",
};

const categoryCardBg: Record<string, string> = {
  "Field Operations": "bg-green-50",
  "Skilled Labour":   "bg-teal-50",
  Logistics:          "bg-blue-50",
  Office:             "bg-indigo-50",
  Programs:           "bg-purple-50",
};

const MAX_SELECTIONS = 3;

// ─── Role Card ────────────────────────────────────────────────────────────────

function RoleCard({
  role,
  selected,
  onToggle,
  disabled,
}: {
  role: Role;
  selected: boolean;
  onToggle: () => void;
  disabled: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const accentBar = categoryAccent[role.category] ?? "bg-gray-400";
  const cardBg    = selected
    ? "border-green-500 bg-green-50 shadow-xl shadow-green-100"
    : disabled
    ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
    : `border-gray-200 ${categoryCardBg[role.category] ?? "bg-white"} hover:border-green-400 hover:shadow-lg cursor-pointer`;

  return (
    <div className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden flex ${cardBg}`}>

      {/* Left accent bar */}
      <div className={`w-1.5 shrink-0 ${selected ? "bg-green-500" : accentBar}`} />

      <div className="flex-1 p-6">

        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-4 right-4 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Icon + title */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-4xl leading-none mt-0.5">{role.icon}</span>
          <div className="flex-1 min-w-0 pr-8">
            <h3 className="font-extrabold text-gray-900 text-xl leading-tight mb-1">{role.title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${typeBadgeStyle[role.type]}`}>
                {role.type}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{role.category}</span>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-4 leading-relaxed">{role.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {role.skills.map((s) => (
            <span key={s} className="text-xs font-semibold bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full shadow-sm">
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            disabled={disabled && !selected}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition
              ${selected
                ? "bg-green-600 text-white hover:bg-green-700"
                : disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
              }`}
          >
            {selected ? "✓ Selected" : "Select This Role"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="px-3 py-2.5 rounded-xl text-sm border-2 border-gray-200 text-gray-600 font-semibold hover:bg-white transition"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-1.5">
            <p><span className="font-bold text-gray-800">Category:</span> {role.category}</p>
            <p><span className="font-bold text-gray-800">Employment type:</span> {role.type}</p>
            <p className="text-xs text-gray-500 mt-2">
              Select this role and complete the application form. We respond within 5 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function SelectionBar({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
        {count}/{MAX_SELECTIONS} selected
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: MAX_SELECTIONS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i < count ? "bg-green-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");
  const [step, setStep] = useState<"browse" | "apply" | "success">("browse");
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", location: "", experience: "", message: "",
  });

  const toggleRole = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((r) => r !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  };

  const filtered = filter === "All" ? roles : roles.filter((r) => r.category === filter);
  const selectedRoles = roles.filter((r) => selected.includes(r.id));

  const handleSubmit = () => {
    if (!form.name || !form.phone || selected.length === 0) return;
    setStep("success");
  };

  // ── Success screen ──
  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🌿</div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-2">Application Received!</h2>
          <p className="text-gray-500 mb-6">
            Thank you, <strong>{form.name}</strong>. We'll review your interest and reach out within 5 business days.
          </p>
          <div className="bg-green-50 rounded-2xl p-4 mb-6 text-left space-y-1">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Applied Roles</p>
            {selectedRoles.map((r) => (
              <p key={r.id} className="text-sm text-gray-700 flex items-center gap-2">
                <span>{r.icon}</span> {r.title}
              </p>
            ))}
          </div>
          <button
            onClick={() => { setStep("browse"); setSelected([]); setForm({ name: "", phone: "", email: "", location: "", experience: "", message: "" }); }}
            className="bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  // ── Apply form screen ──
  if (step === "apply") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
        <div className="max-w-2xl mx-auto">

          <button onClick={() => setStep("browse")} className="text-sm text-green-700 font-semibold mb-8 flex items-center gap-1 hover:underline">
            ← Back to roles
          </button>

          <div className="mb-8">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Step 2 of 2</p>
            <h1 className="text-3xl font-extrabold text-green-900">Your Application</h1>
            <p className="text-gray-500 mt-1">Fill in your details below. Fields marked * are required.</p>
          </div>

          {/* Selected roles summary */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 mb-8">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">Applying for</p>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((r) => (
                <span key={r.id} className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                  {r.icon} {r.title}
                  <button onClick={() => toggleRole(r.id)} className="text-green-400 hover:text-red-500 ml-1 leading-none">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Full Name *</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. John Kamau"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Phone / WhatsApp *</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. 0712 345 678"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Email (optional)</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="you@example.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Your Location</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="e.g. Kirinyaga, Nyeri..."
                  value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Years of Experience</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}>
                <option value="">Select...</option>
                <option>No experience (willing to learn)</option>
                <option>Less than 1 year</option>
                <option>1–3 years</option>
                <option>3–5 years</option>
                <option>5+ years</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Tell us about yourself</label>
              <textarea rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                placeholder="Why are you interested? Any relevant experience or background..."
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.phone}
              className="w-full bg-green-700 text-white py-3.5 rounded-xl font-bold text-base hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Application 🌿
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Browse screen (default) ──
  return (
    <div className="min-h-screen bg-white">

      {/* Compact Hero Banner */}
      <div className="bg-green-900 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Oscar Farms · Careers
            </span>
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              Join Our Team 🌿
            </h1>
            <p className="text-green-300 text-sm mt-1 max-w-md">
              Select up to {MAX_SELECTIONS} roles you're interested in, then submit your details.
            </p>
          </div>
          <div className="flex gap-6 shrink-0">
            {[
              { label: "Open Roles", value: `${roles.length}` },
              { label: "Response", value: "5 days" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-green-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 pt-10 pb-32">
        <div className="max-w-5xl mx-auto">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition border
                    ${filter === cat
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <SelectionBar count={selected.length} />
          </div>

          {/* Role grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filtered.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                selected={selected.includes(role.id)}
                onToggle={() => toggleRole(role.id)}
                disabled={selected.length >= MAX_SELECTIONS && !selected.includes(role.id)}
              />
            ))}
          </div>

          {/* Max notice */}
          {selected.length === MAX_SELECTIONS && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-sm text-amber-800 font-medium mb-10 text-center">
              ✋ You've reached the maximum of {MAX_SELECTIONS} roles. Deselect one to choose another.
            </div>
          )}

          {/* ── University Attachment Section ── */}
          <div className="mt-4 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">University Attachment Program</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">

                {/* Left content */}
                <div className="flex-1">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-900/60 border border-emerald-700 px-3 py-1 rounded-full mb-4">
                    🎓 Industrial Attachment
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                    Hands-On Farm Training for Agriculture Students
                  </h2>
                  <p className="text-green-200 text-sm leading-relaxed mb-5">
                    Oscar Farms proudly partners with <strong className="text-white">Chuka University</strong> — one of Kenya's leading institutions in Agricultural & Food Sciences — to offer structured industrial attachment opportunities. Students gain real-world experience in grafting, irrigation, crop management, and sustainable farming practices.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Horticulture", "Crop Science", "Agribusiness", "Food Science", "Environmental Studies"].map((field) => (
                      <span key={field} className="text-xs bg-white/10 text-green-100 border border-white/20 px-2.5 py-1 rounded-full font-medium">
                        {field}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: "📅", label: "Duration", value: "3–6 months" },
                      { icon: "🏡", label: "Location", value: "On-farm, Tharaka Nithi" },
                      { icon: "📋", label: "Report", value: "Provided on request" },
                    ].map((d) => (
                      <div key={d.label} className="bg-white/10 rounded-xl p-3">
                        <p className="text-lg mb-1">{d.icon}</p>
                        <p className="text-xs text-green-300 font-semibold uppercase tracking-wide">{d.label}</p>
                        <p className="text-sm text-white font-bold mt-0.5">{d.value}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep("apply")}
                    className="bg-emerald-400 text-green-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-emerald-300 transition"
                  >
                    Apply for Attachment →
                  </button>
                </div>

                {/* Partner badge */}
                <div className="md:w-48 shrink-0 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-3">
                    🎓
                  </div>
                  <p className="text-white font-extrabold text-base leading-tight">Chuka University</p>
                  <p className="text-green-300 text-xs mt-1">Leading Partner</p>
                  <div className="mt-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl px-3 py-2">
                    <p className="text-emerald-300 text-xs font-semibold">✓ Official Partnership</p>
                  </div>
                  <p className="text-green-400 text-xs mt-4 leading-relaxed">
                    Students from Chuka University's Faculty of Agriculture are prioritised for placement.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Sticky apply bar */}
          {selected.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl px-6 py-4 z-40">
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {selected.length} role{selected.length > 1 ? "s" : ""} selected
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedRoles.map((r) => r.title).join(" · ")}
                  </p>
                </div>
                <button
                  onClick={() => setStep("apply")}
                  className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition whitespace-nowrap"
                >
                  Continue to Apply →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}