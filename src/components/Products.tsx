import { useSearchParams } from "react-router-dom";
import { useState } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────

const phoneNumber = "254111924282";

function createWhatsAppLink(message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Availability = "available" | "coming_soon" | "out_of_season";

interface Variety { crop: string; icon: string; cultivars: string[]; note: string }
interface Seedling { id: string; name: string; price: number; priceLabel: string; badge: string; image: string; description: string; varieties: Variety[] }
interface Seasonal { name: string; icon: string; season: string; image: string; availability: Availability; description: string }
interface LivestockItem { name: string; icon: string; image: string; status: string; description: string }

// ─── Data ────────────────────────────────────────────────────────────────────

const seedlings: Seedling[] = [
  {
    id: "grafted",
    name: "Grafted Seedlings",
    price: 350,
    priceLabel: "KSh 350",
    badge: "Premium",
    image: "/projects/avo.jpg",
    description: "High-quality grafted fruit seedlings ensuring faster maturity, superior yields, and improved disease resistance.",
    varieties: [
      { crop: "Avocado", icon: "🥑", cultivars: ["Hass", "Fuerte", "Jumbo", "Reed"], note: "Most popular variety. Hass matures in 3–4 yrs vs 7+ for seedlings." },
      { crop: "Macadamia", icon: "🌰", cultivars: ["816", "842", "Beaumont", "Own Choice"], note: "Grafted macadamia begins producing in 3–5 yrs." },
    ],
  },
  {
    id: "ungrafted",
    name: "Ungrafted Seedlings",
    price: 50,
    priceLabel: "KSh 50",
    badge: "Affordable",
    image: "/projects/macadamia.jpg",
    description: "Affordable seedlings for farmers who prefer natural propagation. Longer growth cycles, lower initial cost.",
    varieties: [
      { crop: "Avocado", icon: "🥑", cultivars: ["Fuerte", "Local Variety"], note: "Grows true to seed. Matures in 7–10 years." },
      { crop: "Macadamia", icon: "🌰", cultivars: ["Local Variety"], note: "Slower but resilient. Ideal for long-term investment." },
    ],
  },
];

const seasonal: Seasonal[] = [
  { name: "Arrowroots",    icon: "🌿", season: "Maturity: ~6 months",      image: "/projects/arrowroot.gif",      availability: "available",    description: "Nutritious arrowroots grown in well-managed soil. Rich in carbohydrates and minerals." },
  { name: "Sweet Potatoes",icon: "🍠", season: "Maturity: ~3–5 months",    image: "/projects/sweetpotatoes.jpg",  availability: "available",    description: "Locally grown sweet potatoes harvested at peak maturity. Great for home and market." },
  { name: "Green Maize",   icon: "🌽", season: "Maturity: ~3 months",       image: "/projects/greenmaize.jpg",     availability: "coming_soon",  description: "Fresh green maize harvested at milk stage, perfect for roasting or boiling." },
  { name: "Beans",         icon: "🫘", season: "Maturity: ~2–3 months",    image: "/projects/beans.jpg",          availability: "out_of_season",description: "Protein-rich beans grown under sustainable farming practices." },
  { name: "Bananas",       icon: "🍌", season: "First harvest: ~9–12 months",image: "/projects/bananas.jpg",       availability: "available",    description: "Sweet, nutritious bananas suitable for local markets and home consumption." },
];

const livestock: LivestockItem[] = [
  { name: "Rabbit Program", icon: "🐇", image: "/projects/rabbits.jpg", status: "planning", description: "A rabbit farming program currently in planning. Fast reproduction, low feeding costs, and high profitability. Express interest to be notified at launch." },
];

// ─── Availability ─────────────────────────────────────────────────────────────

const availabilityConfig: Record<Availability, { label: string; dot: string; pill: string; pulse: boolean }> = {
  available:     { label: "Available Now",  dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", pulse: true },
  coming_soon:   { label: "Coming Soon",    dot: "bg-amber-400",   pill: "bg-amber-50 text-amber-700 border border-amber-200",       pulse: false },
  out_of_season: { label: "Out of Season",  dot: "bg-slate-300",   pill: "bg-slate-50 text-slate-500 border border-slate-200",       pulse: false },
};

function AvailabilityBadge({ status }: { status: Availability }) {
  const cfg = availabilityConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
      {cfg.label}
    </span>
  );
}

// ─── Cart (Order Seedlings) ───────────────────────────────────────────────────

interface CartItem { seedlingId: string; seedlingName: string; crop: string; cultivar: string; qty: number; price: number }

function CartView() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", county: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  // Build selectable options: one row per seedling × crop × cultivar
  const options = seedlings.flatMap((s) =>
    s.varieties.flatMap((v) =>
      v.cultivars.map((c) => ({
        key:          `${s.id}-${v.crop}-${c}`,
        seedlingId:   s.id,
        seedlingName: s.name,
        crop:         v.crop,
        icon:         v.icon,
        cultivar:     c,
        price:        s.price,
        priceLabel:   s.priceLabel,
        badge:        s.badge,
      }))
    )
  );

  const addToCart = (opt: typeof options[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.seedlingId === opt.seedlingId && i.crop === opt.crop && i.cultivar === opt.cultivar);
      if (existing) return prev.map((i) => i === existing ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { seedlingId: opt.seedlingId, seedlingName: opt.seedlingName, crop: opt.crop, cultivar: opt.cultivar, qty: 1, price: opt.price }];
    });
  };

  const updateQty = (key: string, qty: number) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => `${i.seedlingId}-${i.crop}-${i.cultivar}` !== key));
    else setCart((prev) => prev.map((i) => `${i.seedlingId}-${i.crop}-${i.cultivar}` === key ? { ...i, qty } : i));
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const handleOrder = () => {
    if (!form.name || !form.phone || cart.length === 0) return;
    const lines = [
      `Hello Oscar Farms 🌿`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.county ? `County: ${form.county}` : "",
      ``,
      `ORDER SUMMARY:`,
      ...cart.map((i) => `• ${i.crop} (${i.cultivar}) — ${i.qty} × KSh ${i.price.toLocaleString()} = KSh ${(i.qty * i.price).toLocaleString()}`),
      ``,
      `TOTAL: KSh ${totalPrice.toLocaleString()} for ${totalItems} seedling${totalItems !== 1 ? "s" : ""}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");

    window.open(createWhatsAppLink(lines), "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Order Sent via WhatsApp!</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">The Oscar Farms team will confirm your order and arrange delivery. Thank you, {form.name}!</p>
        <button onClick={() => { setSubmitted(false); setCart([]); setForm({ name: "", phone: "", county: "", notes: "" }); }}
          className="bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition">
          Start a New Order
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left: product picker */}
      <div className="lg:col-span-2">
        <h3 className="text-lg font-extrabold text-green-900 mb-4">Select Seedlings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const inCart = cart.find((i) => i.seedlingId === opt.seedlingId && i.crop === opt.crop && i.cultivar === opt.cultivar);
            return (
              <div key={opt.key}
                className={`bg-white rounded-2xl border-2 p-4 flex items-center gap-3 transition-all ${inCart ? "border-green-500 bg-green-50" : "border-green-100 hover:border-green-300"}`}>
                <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-green-900 text-sm truncate">{opt.crop} — {opt.cultivar}</p>
                  <p className="text-xs text-stone-500">{opt.seedlingName}</p>
                  <p className="text-xs font-bold text-green-600 mt-0.5">{opt.priceLabel} each</p>
                </div>
                {inCart ? (
                  <div className="flex items-center gap-1 border-2 border-green-300 rounded-xl overflow-hidden flex-shrink-0">
                    <button onClick={() => updateQty(opt.key, inCart.qty - 1)}
                      className="w-8 h-8 text-green-700 font-bold text-lg hover:bg-green-100 flex items-center justify-center transition-colors">−</button>
                    <span className="w-8 text-center font-bold text-sm text-green-900">{inCart.qty}</span>
                    <button onClick={() => updateQty(opt.key, inCart.qty + 1)}
                      className="w-8 h-8 text-green-700 font-bold text-lg hover:bg-green-100 flex items-center justify-center transition-colors">+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(opt)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-green-700 text-white text-xs font-bold hover:bg-green-800 transition">
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: cart summary + form */}
      <div className="flex flex-col gap-5">

        {/* Cart summary */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
          <div className="bg-green-700 px-5 py-3 flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">Your Order</h3>
            {totalItems > 0 && (
              <span className="bg-lime-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="p-6 text-center text-stone-400 text-sm">
              <div className="text-3xl mb-2">🛒</div>
              No seedlings added yet. Select from the list.
            </div>
          ) : (
            <div className="divide-y divide-green-50">
              {cart.map((item) => {
                const key = `${item.seedlingId}-${item.crop}-${item.cultivar}`;
                return (
                  <div key={key} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-green-900 truncate">{item.crop} — {item.cultivar}</p>
                      <p className="text-xs text-stone-400">{item.qty} × KSh {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => updateQty(key, item.qty - 1)}
                        className="w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-sm hover:bg-green-200 flex items-center justify-center">−</button>
                      <span className="w-6 text-center text-sm font-bold text-green-900">{item.qty}</span>
                      <button onClick={() => updateQty(key, item.qty + 1)}
                        className="w-6 h-6 rounded-full bg-green-100 text-green-700 font-bold text-sm hover:bg-green-200 flex items-center justify-center">+</button>
                    </div>
                    <p className="text-xs font-bold text-green-700 w-16 text-right flex-shrink-0">
                      KSh {(item.qty * item.price).toLocaleString()}
                    </p>
                  </div>
                );
              })}
              <div className="flex items-center justify-between px-4 py-3 bg-green-50">
                <p className="text-sm font-extrabold text-green-900">Total</p>
                <p className="text-lg font-extrabold text-green-700">KSh {totalPrice.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
          <p className="text-xs font-bold tracking-widest text-green-600 uppercase mb-3">Your Details</p>
          <div className="flex flex-col gap-3">
            {[
              { key: "name",   label: "Full Name *",      placeholder: "e.g. Jane Wanjiku" },
              { key: "phone",  label: "Phone / WhatsApp *",placeholder: "e.g. 0712 345 678" },
              { key: "county", label: "County",            placeholder: "e.g. Tharaka Nithi" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-green-700 uppercase tracking-wide block mb-1">{f.label}</label>
                <input
                  className="w-full border-2 border-green-100 rounded-xl px-3 py-2.5 text-sm bg-amber-50 outline-none focus:border-green-400 transition-colors"
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-green-700 uppercase tracking-wide block mb-1">Notes</label>
              <textarea rows={2}
                className="w-full border-2 border-green-100 rounded-xl px-3 py-2.5 text-sm bg-amber-50 outline-none focus:border-green-400 transition-colors resize-none"
                placeholder="Delivery notes, questions..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
        </div>

        <button onClick={handleOrder}
          disabled={!form.name || !form.phone || cart.length === 0}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0">
          📲 Send Order via WhatsApp
        </button>
        {cart.length === 0 && <p className="text-xs text-center text-stone-400">Add at least one seedling to place an order.</p>}
      </div>
    </div>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({ item, type, onClose }: { item: Seedling | Seasonal | LivestockItem; type: "seedling" | "seasonal" | "livestock"; onClose: () => void }) {
  const [selected, setSelected] = useState<Variety | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", qty: "", notes: "" });

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const lines = [
      `Hello Oscar Farms 🌿`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Product: ${item.name}`,
      selected ? `Crop: ${selected.crop}` : "",
      selected ? `Varieties: ${selected.cultivars.join(", ")}` : "",
      form.qty ? `Quantity: ${form.qty}` : "",
      form.notes ? `Notes: ${form.notes}` : "",
      ``,
      `I would like to place an order.`,
    ].filter(Boolean).join("\n");
    window.open(createWhatsAppLink(lines), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-green-700 rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-green-200 text-xs uppercase tracking-widest font-semibold">Inquiry</p>
            <h3 className="text-white text-xl font-bold mt-0.5">{item.name}</h3>
          </div>
          <button onClick={onClose} className="text-green-200 hover:text-white text-2xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-5">
          {type === "seedling" && (item as Seedling).varieties && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Select Crop & Variety</p>
              <div className="space-y-3">
                {(item as Seedling).varieties.map((v) => (
                  <div key={v.crop}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition ${selected?.crop === v.crop ? "border-green-600 bg-green-50" : "border-gray-100 hover:border-green-300"}`}
                    onClick={() => setSelected(v)}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{v.icon}</span>
                      <span className="font-semibold text-gray-800">{v.crop}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {v.cultivars.map((c) => (
                        <span key={c} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{c}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{v.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "seasonal" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
              <AvailabilityBadge status={(item as Seasonal).availability} />
              <span className="text-sm text-gray-600">{(item as Seasonal).season}</span>
            </div>
          )}
          {type === "livestock" && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
              🐇 This program is in planning. Your inquiry helps us gauge interest and prioritise launch.
            </div>
          )}
          <div className="space-y-3">
            {[
              { key: "name",  label: "Your Name *",       placeholder: "e.g. Jane Wanjiku" },
              { key: "phone", label: "Phone / WhatsApp *", placeholder: "e.g. 0712 345 678" },
              { key: "qty",   label: "Quantity / Units",   placeholder: "e.g. 50 seedlings" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">{f.label}</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">Additional Notes</label>
              <textarea rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                placeholder="Delivery location, questions..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={!form.name || !form.phone}
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-40">
            📲 Send Inquiry via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function SeedlingCard({ item }: { item: Seedling }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:shadow-xl transition duration-300 group">
        <div className="relative overflow-hidden h-52">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{item.badge}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h4 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h4>
          <p className="text-gray-500 text-sm flex-1 mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.varieties.map((v) => (
              <span key={v.crop} className="text-xs bg-green-50 border border-green-200 text-green-700 px-2.5 py-0.5 rounded-full font-medium">
                {v.icon} {v.crop}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-700 font-extrabold text-lg">{item.priceLabel}</span>
            <button onClick={() => setOpen(true)} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
              Inquire
            </button>
          </div>
        </div>
      </div>
      {open && <InquiryModal item={item} type="seedling" onClose={() => setOpen(false)} />}
    </>
  );
}

function SeasonalCard({ item }: { item: Seasonal }) {
  const [open, setOpen] = useState(false);
  const isUnavailable = item.availability === "out_of_season";
  return (
    <>
      <div className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition duration-300 group ${isUnavailable ? "opacity-70" : "hover:-translate-y-1 hover:shadow-xl transform"}`}>
        <div className="relative overflow-hidden h-48">
          <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition duration-500 ${isUnavailable ? "grayscale" : "group-hover:scale-105"}`} />
          <div className="absolute top-3 right-3"><AvailabilityBadge status={item.availability} /></div>
          <div className="absolute bottom-3 left-3 text-3xl">{item.icon}</div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h4 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h4>
          <p className="text-gray-500 text-sm flex-1 mb-3">{item.description}</p>
          <p className="text-xs text-green-700 font-semibold mb-4 flex items-center gap-1">🗓 {item.season}</p>
          <button
            disabled={isUnavailable}
            onClick={() => { if (!isUnavailable) setOpen(true); }}
            className="border-2 border-green-700 text-green-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-50 transition w-full disabled:opacity-40 disabled:cursor-not-allowed">
            {isUnavailable ? "Out of Season" : "Inquire via WhatsApp"}
          </button>
        </div>
      </div>
      {open && <InquiryModal item={item} type="seasonal" onClose={() => setOpen(false)} />}
    </>
  );
}

function LivestockCard({ item }: { item: LivestockItem }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 hover:shadow-xl transition duration-300 group border-2 border-dashed border-amber-200">
        <div className="relative overflow-hidden h-48">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow">🚧 In Planning</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
          </div>
          <p className="text-gray-500 text-sm flex-1 mb-4">{item.description}</p>
          <button onClick={() => setOpen(true)} className="bg-amber-400 text-amber-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-500 transition w-full">
            Express Interest
          </button>
        </div>
      </div>
      {open && <InquiryModal item={item} type="livestock" onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-green-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function AvailabilityLegend() {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {(Object.entries(availabilityConfig) as [Availability, typeof availabilityConfig[Availability]][]).map(([key, cfg]) => (
        <span key={key} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${cfg.pill}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
          {cfg.label}
        </span>
      ))}
    </div>
  );
}

// ─── Tab nav ──────────────────────────────────────────────────────────────────

const tabs = [
  { key: "",         label: "All Products",     icon: "🌿" },
  { key: "avocado",  label: "Avocado",           icon: "🥑" },
  { key: "macadamia",label: "Macadamia",          icon: "🌰" },
  { key: "seasonal", label: "Seasonal Produce",  icon: "🌾" },
  { key: "cart",     label: "Order Seedlings",   icon: "🛒" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "";

  const setType = (t: string) => setSearchParams(t ? { type: t } : {});

  // Filter seedlings by crop type
  const filteredSeedlings = seedlings.filter((s) => {
    if (!type || type === "cart") return true;
    if (type === "avocado")   return s.varieties.some((v) => v.crop === "Avocado");
    if (type === "macadamia") return s.varieties.some((v) => v.crop === "Macadamia");
    return true;
  });

  const showSeedlings = !type || type === "avocado" || type === "macadamia";
  const showSeasonal  = !type || type === "seasonal";
  const showLivestock = !type;
  const showCart      = type === "cart";

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600 bg-green-100 px-4 py-1.5 rounded-full mb-4">
            Fresh from the Farm
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">Our Farm Products</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-base">
            Sustainably grown seedlings, seasonal produce, and livestock programs — straight from our farm to you.
          </p>
        </div>

        {/* Tab filter bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setType(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                type === tab.key
                  ? "bg-green-700 text-white border-green-700 shadow-md"
                  : "bg-white text-green-700 border-green-200 hover:border-green-400 hover:bg-green-50"
              }`}>
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Cart / Order view */}
        {showCart && <CartView />}

        {/* Seedlings */}
        {showSeedlings && (
          <div className="mb-16">
            <SectionHeader
              title={type === "avocado" ? "🥑 Avocado Seedlings" : type === "macadamia" ? "🌰 Macadamia Seedlings" : "🌱 Seedlings"}
              subtitle="Grafted and ungrafted varieties — tap Inquire to see available cultivars and send via WhatsApp."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSeedlings.map((item) => <SeedlingCard key={item.id} item={item} />)}
            </div>
          </div>
        )}

        {/* Seasonal */}
        {showSeasonal && (
          <div className="mb-16">
            <SectionHeader title="🌾 Seasonal Produce" subtitle="Availability updates in real time as the season progresses." />
            <AvailabilityLegend />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seasonal.map((item) => <SeasonalCard key={item.name} item={item} />)}
            </div>
          </div>
        )}

        {/* Livestock */}
        {showLivestock && (
          <div className="mb-8">
            <SectionHeader title="🐾 Livestock" subtitle="Our rabbit farming program is being developed. Express your interest below." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {livestock.map((item) => <LivestockCard key={item.name} item={item} />)}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}