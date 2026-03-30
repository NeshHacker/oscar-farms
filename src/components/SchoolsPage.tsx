import { useState } from "react";

const schools = [
  {
    name: "Magenka High School",
    county: "Tharaka Nithi",
    seedlings: ["Hass Avocado", "Kiambu 3 Macadamia"],
    year: "2024",
    testimonial: "The grafted seedlings arrived healthy and were exactly what we needed for our practical agriculture farm.",
    logo: "/projects/magenka-logo.jpeg",
    image: "/projects/magenka.jpg",
  },
  {
    name: "Mukuuni High School",
    county: "Thara-Nithi",
    seedlings: ["Fuerte Avocado", "Kiambu 4 Macadamia"],
    year: "2025",
    testimonial: "Our agriculture students now have a thriving demonstration orchard. Excellent quality and professional delivery.",
    logo: "/projects/mukuuni-logo.jpg",
    image: "/projects/mukuuni.jpg",
  },
  {
    name: "Kigogo High School",
    county: "Tharaka Nithi",
    seedlings: ["Hass Avocado", "Local Avocado"],
    year: "2025",
    testimonial: "Prof. Mugendi personally advised us on variety selection for our altitude. The results have been outstanding.",
    logo: "/projects/kigogo-logo.jpeg",
    image: "/projects/kigogo.png",
  },
  {
    name: "Mutaaruni High School",
    county: "Tharaka Nithi",
    seedlings: ["Kiambu 3 Macadamia", "Kiambu 4 Macadamia"],
    year: "2025",
    testimonial: "We've worked with Oscar Farms for our KCSE practical farm and would recommend them to any school in the region.",
    logo: "/projects/mutaaruni-logo.png",
    image: "/projects/mutaaruni.jpg",
  },
];

const packages = [
  {
    name: "Starter Pack",
    emoji: "🌱",
    price: "KSh 5,000",
    seedlings: "10 Seedlings",
    desc: "Ideal for small school demonstration gardens. Includes 5 avocado + 5 macadamia grafted seedlings.",
    includes: ["10 grafted seedlings", "Planting guide booklet", "Basic care schedule", "WhatsApp support"],
    highlight: false,
  },
  {
    name: "KCSE Project Pack",
    emoji: "🏫",
    price: "KSh 17,500",
    seedlings: "50 Seedlings",
    desc: "Designed specifically for KCSE agriculture practical farms. Covers a standard school plot with variety diversity.",
    includes: ["50 grafted seedlings", "Full planting manual", "Teacher training session", "One farm visit", "Certificate of supply"],
    highlight: true,
  },
  {
    name: "School Farm Pack",
    emoji: "🌳",
    price: "From KSh 35,000",
    seedlings: "100+ Seedlings",
    desc: "For schools establishing a serious commercial demonstration farm. Custom variety mix and layout planning included.",
    includes: ["100+ grafted seedlings", "Farm layout design", "Two farm visits", "Soil testing", "Teacher training", "Annual seedling review"],
    highlight: false,
  },
];

const faqs = [
  { q: "Are your seedlings approved for KCSE practical examinations?", a: "Yes. All seedlings supplied by Oscar Farms are grafted, labelled, and traceable — meeting KNEC requirements for practical agriculture assessment." },
  { q: "How far in advance should we order?", a: "We recommend placing orders at least 6 weeks before planting. This gives us time to prepare your specific variety mix and ensure seedlings are at the right stage for transplanting." },
  { q: "Do you deliver to schools?", a: "Yes. We deliver across Tharaka Nithi, Meru, Embu, Kitui, Murang'a, and Kirinyaga counties. Delivery fees apply outside the immediate region." },
  { q: "Can the professor visit our school?", a: "Prof. Mugendi offers school farm advisory visits as part of the KCSE Project Pack and above. He can also be arranged separately for teacher training days." },
];

function SchoolCard({ school }: { school: typeof schools[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
      {/* School image */}
      <div className="h-36 bg-gradient-to-br from-green-100 to-amber-100 relative overflow-hidden">
        <img
          src={school.image}
          alt={school.name}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Logo */}
        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white border-2 border-green-200 shadow-md flex items-center justify-center overflow-hidden">
          <img
            src={school.logo}
            alt={`${school.name} logo`}
            className="w-full h-full object-contain p-1"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = "🏫"; }}
          />
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold bg-lime-400 text-green-900 px-2 py-0.5 rounded-full">{school.year}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-extrabold text-green-950 text-base mb-0.5">{school.name}</h3>
        <p className="text-xs text-green-600 font-semibold mb-2">{school.county} County</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {school.seedlings.map((s) => (
            <span key={s} className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-100">{s}</span>
          ))}
        </div>
        <p className="text-xs text-stone-500 italic leading-relaxed">"{school.testimonial}"</p>
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-green-900 text-sm hover:bg-green-50 transition-colors">
        {q}
        <span className={`text-green-500 text-lg transition-transform duration-200 flex-shrink-0 ml-3 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm text-stone-600 leading-relaxed border-t border-green-50">{a}</div>}
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />

      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-2">For Secondary Schools</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Seedlings for KCSE Agriculture Projects</h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Grafted, labelled, and examination-ready seedlings — supplied by a university agronomist who understands exactly what KNEC examiners look for in a school practical farm.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Prof quote */}
        <div className="bg-white rounded-3xl border border-green-100 shadow-md p-8 mb-10 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0 overflow-hidden">
            <img src="/projects/professor.jpg" alt="Prof. Mugendi" className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = "OM"; }} />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">A Word From the Professor</p>
            <p className="text-sm text-stone-600 leading-relaxed">
              "I have seen too many KCSE students fail their practical papers not because they lacked effort, but because their school farm had the wrong varieties, poorly grafted stock, or no expert guidance on management.
              <span className="font-semibold text-green-900"> Oscar Farms exists to close that gap.</span> Every seedling we supply to a school is the same quality I would plant on my own farm — because I believe every student deserves a practical farm they can be proud of."
            </p>
            <p className="text-xs font-bold text-green-700 mt-2">— Prof. Oscar Mugendi, Agronomist · Chuka University</p>
          </div>
        </div>

        {/* Packages */}
        <h2 className="text-lg font-extrabold text-green-950 mb-5">School Seedling Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`rounded-2xl overflow-hidden border-2 transition-all hover:-translate-y-1 ${pkg.highlight ? "border-green-600 shadow-lg" : "border-green-100 shadow-sm"}`}>
              {pkg.highlight && (
                <div className="bg-green-600 text-white text-center text-xs font-bold py-1.5 tracking-widest uppercase">Most Popular</div>
              )}
              <div className="bg-white p-6">
                <span className="text-3xl mb-2 block">{pkg.emoji}</span>
                <h3 className="font-extrabold text-green-950 text-base mb-0.5">{pkg.name}</h3>
                <p className="text-xs text-stone-500 mb-3 leading-relaxed">{pkg.desc}</p>
                <p className="text-2xl font-extrabold text-green-700 mb-0.5">{pkg.price}</p>
                <p className="text-xs text-stone-400 mb-4">{pkg.seedlings}</p>
                <ul className="space-y-1.5 mb-5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                      <span className="w-4 h-4 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact"
                  className={`block w-full py-2.5 rounded-xl font-bold text-sm transition-all text-center ${pkg.highlight ? "bg-gradient-to-r from-green-700 to-green-500 text-white shadow hover:-translate-y-0.5" : "border-2 border-green-200 text-green-700 hover:bg-green-50"}`}>
                  Order for Our School
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Past buyers */}
        <h2 className="text-lg font-extrabold text-green-950 mb-2">Schools We've Supplied — 2024</h2>
        <p className="text-sm text-stone-500 mb-5">Proud to have partnered with these institutions on their KCSE agriculture projects.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {schools.map((s) => <SchoolCard key={s.name} school={s} />)}
        </div>

        {/* FAQ */}
        <h2 className="text-lg font-extrabold text-green-950 mb-4">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-3 mb-12">
          {faqs.map((f) => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>

        {/* CTA */}
        <div className="bg-green-700 rounded-3xl p-8 text-white text-center">
          <p className="text-xs font-bold tracking-widest text-lime-300 uppercase mb-2">Ready to Order?</p>
          <h3 className="text-xl font-extrabold mb-2">Get Seedlings for Your School This Term</h3>
          <p className="text-stone-200 text-sm mb-5 max-w-md mx-auto">Contact us with your school name, county, number of seedlings needed, and preferred varieties. We'll get back to you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/contact" className="px-6 py-3 rounded-xl bg-lime-400 text-green-900 font-bold text-sm shadow hover:-translate-y-0.5 transition-all">
              📋 Place a School Order
            </a>
            <a href="tel: +254 0111924282" className="px-6 py-3 rounded-xl border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-all">
              📞 Call Us Directly
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}