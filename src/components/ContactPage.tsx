import { useState } from "react";

const reasons = [
  "Order Seedlings",
  "Book a Consultation",
  "Training Enquiry",
  "School / KCSE Project",
  "Tree Initiative",
  "Media / Research",
  "Other",
];

const contactInfo = [
  { icon: "📍", label: "Location", value: "Oscar Farms, Tharaka Nithi County\nChuka South Sub-County\nKaramani Sub-location\nMutaaruni Village, Kenya" },
  { icon: "📞", label: "Phone", value: "+254 0111924282" },
  { icon: "✉️", label: "Email", value: "info@oscarfarms.co.ke" },
  { icon: "🎓", label: "Academic Office", value: "Dept. of Agriculture\nChuka University, Chuka" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />

      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-lime-400 uppercase mb-2">Get In Touch</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Contact Oscar Farms</h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Whether you're a farmer, a school, a student, or a fellow researcher — we would love to hear from you. Prof. Oscar personally reviews every enquiry.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="bg-white rounded-2xl border border-green-100 p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-0.5">{c.label}</p>
                  <p className="text-sm font-semibold text-green-950 whitespace-pre-line">{c.value}</p>
                </div>
              </div>
            ))}

            {/* Prof card */}
            <div className="bg-green-800 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-600 border-2 border-lime-400/40 flex items-center justify-center font-extrabold text-sm flex-shrink-0 overflow-hidden">
                  <img src="/projects/professor.png" alt="Prof. Oscar" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerHTML = "OM"; }} />
                </div>
                <div>
                  <p className="text-sm font-extrabold">Prof. Oscar Mugendi</p>
                  <p className="text-xs text-lime-300">Agronomist · Chuka University</p>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "No question about farming is too small. I've spent thirty years answering them — and I'm not stopping now."
              </p>
            </div>

            {/* Office hours */}
            <div className="bg-white rounded-2xl border border-green-100 p-5">
              <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-3">Response Times</p>
              <ul className="space-y-2">
                {[
                  { day: "Mon – Fri", time: "Within 24 hours" },
                  { day: "Saturday", time: "Within 48 hours" },
                  { day: "Sunday / Public Holidays", time: "Next business day" },
                ].map((r) => (
                  <li key={r.day} className="flex justify-between text-xs">
                    <span className="font-semibold text-green-800">{r.day}</span>
                    <span className="text-stone-500">{r.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-green-100 shadow-md p-7">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <span className="text-5xl mb-4">🌱</span>
                <h3 className="text-xl font-extrabold text-green-900 mb-2">Message Received!</h3>
                <p className="text-sm text-stone-500 max-w-sm leading-relaxed">
                  Thank you for reaching out. Prof. Oscar or a member of the Oscar Farms team will respond within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", reason: "", message: "" }); }}
                  className="mt-5 px-5 py-2.5 rounded-xl border-2 border-green-200 text-green-700 font-bold text-sm hover:bg-green-50 transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold tracking-widest text-lime-600 uppercase mb-1">Send a Message</p>
                <h2 className="text-lg font-extrabold text-green-950 mb-6">How Can We Help You?</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="e.g. John Mugendi"
                        className="w-full border-2 border-green-100 rounded-xl px-4 py-3 text-sm text-green-950 bg-amber-50 outline-none focus:border-green-400 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full border-2 border-green-100 rounded-xl px-4 py-3 text-sm text-green-950 bg-amber-50 outline-none focus:border-green-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@gmail.com"
                      className="w-full border-2 border-green-100 rounded-xl px-4 py-3 text-sm text-green-950 bg-amber-50 outline-none focus:border-green-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Reason for Contact *</label>
                    <select name="reason" required value={form.reason} onChange={handleChange}
                      className="w-full border-2 border-green-100 rounded-xl px-4 py-3 text-sm text-green-950 bg-amber-50 outline-none focus:border-green-400 transition-colors appearance-none cursor-pointer">
                      <option value="">Select a reason...</option>
                      {reasons.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-green-700 uppercase tracking-wide block mb-1">Your Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us what you need — the more detail, the better we can help."
                      className="w-full border-2 border-green-100 rounded-xl px-4 py-3 text-sm text-green-950 bg-amber-50 outline-none focus:border-green-400 transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? "Sending..." : "📩 Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}