import { useState } from "react";

const generateWhatsAppLink = () => {
  const message = `
Hello Oscar Farms,

I would like to make an order:

- Avocado Seedlings: ${avocadoQty || 0}
- Macadamia Seedlings: ${macadamiaQty || 0}

Type: ${selectedType || "Not specified"}

Please assist me with availability and delivery.

Thank you.
  `;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/254111924282?text=${encodedMessage}`;
};

function QtyControl({ value, onChange }) {
  return (
    <div className="flex items-center border-2 border-green-300 rounded-xl overflow-hidden bg-amber-50">
      <button onClick={() => onChange(Math.max(0, value - 1))}
        className="w-11 h-11 text-green-700 text-2xl font-bold hover:bg-green-100 active:bg-green-200 transition-colors flex items-center justify-center">−</button>
      <input type="number" value={value} min={0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-14 h-11 text-center border-x-2 border-green-300 text-base font-bold text-green-900 bg-amber-50 outline-none"
        style={{appearance:"textfield",MozAppearance:"textfield"}} />
      <button onClick={() => onChange(value + 1)}
        className="w-11 h-11 text-green-700 text-2xl font-bold hover:bg-green-100 active:bg-green-200 transition-colors flex items-center justify-center">+</button>
    </div>
  );
}

function PlantSection({ icon, name, varieties, variety, onVarietyChange, qty, onQtyChange, price }) {
  const subtotal = qty * price;
  return (
    <div className="border-2 border-green-200 rounded-2xl p-5 bg-amber-50 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-green-900 text-lg">{name}</h3>
      </div>
      <div className="flex flex-col gap-3">
        <select value={variety} onChange={(e) => onVarietyChange(e.target.value)}
          className="w-full border-2 border-green-200 rounded-xl px-3 py-3 text-base font-medium text-green-900 bg-amber-50 outline-none cursor-pointer focus:border-green-500">
          {varieties.map(v => <option key={v}>{v}</option>)}
        </select>
        <QtyControl value={qty} onChange={onQtyChange} />
      </div>
      {qty > 0 && (
        <p className="text-right text-sm text-green-600 font-semibold mt-3">
          {qty} × KSh {price.toLocaleString()} = <span className="text-green-800 font-bold">KSh {subtotal.toLocaleString()}</span>
        </p>
      )}
    </div>
  );
}

export default function SeedlingSelector() {
  const avocadoVarieties = ["Fuerte","Hass","Local"];
  const macVarieties = ["Kiambu 3","Kiambu 4","Embu 1","Taita Taveta 1","Taita Taveta 2","Kirinyaga 15","Murang'a 20"];

  const [type, setType] = useState("grafted");
  const [avocadoVariety, setAvocadoVariety] = useState("Fuerte");
  const [macVariety, setMacVariety] = useState("Kiambu 3");
  const [avocadoQty, setAvocadoQty] = useState(0);
  const [macQty, setMacQty] = useState(0);

  const price = type === "grafted" ? 350 : 50;
  const total = (avocadoQty + macQty) * price;
  const totalQty = avocadoQty + macQty;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-green-100 flex items-start justify-center p-4">
      <div className="w-full max-w-3xl bg-stone-100 rounded-3xl shadow-xl overflow-hidden mt-4 border border-green-200">
        <div className="h-2 bg-gradient-to-r from-green-700 via-green-500 to-lime-500" />
        <div className="p-7">

          <p className="text-sm font-bold tracking-widest text-green-600 uppercase mb-1">Nursery Order</p>
          <h2 className="text-3xl font-extrabold text-green-950 mb-7">Order Seedlings</h2>

          <p className="text-sm font-bold tracking-wider text-green-600 uppercase mb-2">Seedling Type</p>
          <div className="grid grid-cols-2 gap-1 bg-green-100 rounded-2xl p-1 mb-7 max-w-sm">
            {[{value:"grafted",label:"Grafted",badge:"KSh 350"},{value:"ungrafted",label:"Ungrafted",badge:"KSh 50"}].map(({value,label,badge}) => (
              <button key={value} onClick={() => setType(value)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold transition-all ${type===value ? "bg-amber-50 text-green-900 shadow-sm border border-green-200" : "text-green-600 hover:text-green-800"}`}>
                {label}
                <span className={`text-xs px-2 py-0.5 rounded-lg font-bold ${type===value ? "bg-green-100 text-green-700" : "text-green-500"}`}>{badge}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
            <PlantSection icon="🥑" name="Avocado" varieties={avocadoVarieties} variety={avocadoVariety} onVarietyChange={setAvocadoVariety} qty={avocadoQty} onQtyChange={setAvocadoQty} price={price} />
            <PlantSection icon="🌰" name="Macadamia" varieties={macVarieties} variety={macVariety} onVarietyChange={setMacVariety} qty={macQty} onQtyChange={setMacQty} price={price} />
          </div>

          <div className="border-t-2 border-dashed border-green-200 mb-6" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center justify-between bg-green-100 rounded-2xl px-6 py-5 flex-1 border border-green-200">
              <div>
                <p className="text-sm font-bold tracking-widest text-green-600 uppercase">Total</p>
                {totalQty > 0 && <p className="text-sm text-green-500 font-semibold mt-0.5">{totalQty} seedling{totalQty !== 1 ? "s" : ""}</p>}
              </div>
              <p className="text-4xl font-extrabold text-green-950">
                <span className="text-base font-bold text-green-600 mr-1">KSh</span>{total.toLocaleString()}
              </p>
            </div>
            <button disabled={totalQty === 0}
              className="w-full sm:w-52 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-500 text-white font-bold text-lg shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              Place Inquiry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}