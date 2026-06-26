import { useState, useRef, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

// ─── ICONS ────────────────────────────────────────────────────────────────
const Icon = {
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Loader: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-spin">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// ─── LOGIN SCREEN ──────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!username || !password) { setError("Completá usuario y contraseña."); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) { setError("Usuario o contraseña incorrectos."); setLoading(false); return; }
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      onLogin(data.access);
    } catch { setError("No se pudo conectar con el servidor."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0B0F0C", fontFamily: "'DM Sans', sans-serif" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#6EE7B7" }} />
      <div className="relative w-full max-w-md rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(110,231,183,0.15)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#163D2A,#0B0F0C)", border: "1px solid rgba(110,231,183,0.2)", boxShadow: "0 0 24px rgba(110,231,183,0.15)" }}>
            <span style={{ color: "#6EE7B7" }}><Icon.Map /></span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Urban<span style={{ color: "#6EE7B7" }}>IA</span></h1>
          <p className="text-sm mt-1" style={{ color: "#A1A1AA" }}>Plataforma de monitoreo urbano inteligente</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#A1A1AA" }}>Usuario</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="Ingresá tu usuario" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }} onFocus={e => e.target.style.borderColor = "#6EE7B7"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#A1A1AA" }}>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder="Ingresá tu contraseña" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }} onFocus={e => e.target.style.borderColor = "#6EE7B7"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
        </div>
        {error && <div className="mb-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5" }}>❌ {error}</div>}
        <button onClick={handleSubmit} disabled={loading} className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg,#163D2A,#0d2b1e)", border: "1px solid rgba(110,231,183,0.3)", color: "#6EE7B7", boxShadow: "0 4px 20px rgba(110,231,183,0.1)" }}>
          {loading ? <><Icon.Loader /> Ingresando...</> : "Ingresar a UrbanIA"}
        </button>
        <p className="text-center text-xs mt-6" style={{ color: "#3F3F46" }}>UrbanIA · Detección urbana con IA</p>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────
function Navbar({ onUploadClick, setSection, section, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6" style={{ background: "linear-gradient(135deg,#163D2A 0%,#0B0F0C 100%)", boxShadow: "0 2px 16px rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(110,231,183,0.1)" }}>
      <div className="flex items-center gap-2.5 mr-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg,#163D2A,#0B0F0C)", border: "1px solid rgba(110,231,183,0.2)", boxShadow: "0 0 16px rgba(110,231,183,0.2)" }}>
          <span style={{ color: "#6EE7B7" }}><Icon.Map /></span>
        </div>
        <span className="font-bold text-white tracking-tight text-xl">Urban<span style={{ color: "#6EE7B7" }}>IA</span></span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {["dashboard","analysis","reports","settings"].map((s) => (
          <button key={s} onClick={() => setSection(s)} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200" style={{ background: section === s ? "rgba(110,231,183,0.1)" : "transparent", color: section === s ? "#6EE7B7" : "#A1A1AA", borderBottom: section === s ? "2px solid #6EE7B7" : "2px solid transparent" }} onMouseEnter={e => { if (section !== s) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }} onMouseLeave={e => { if (section !== s) e.currentTarget.style.background = "transparent"; }}>
            {s === "dashboard" ? "Dashboard" : s === "analysis" ? "Análisis" : s === "reports" ? "Reportes" : "Configuración"}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border" style={{ borderColor: "rgba(110,231,183,0.2)", background: "rgba(110,231,183,0.05)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EE7B7" }} />
          <span className="text-xs font-medium" style={{ color: "#6EE7B7" }}>IA activa</span>
        </div>
        <button onClick={onUploadClick} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03]" style={{ background: "linear-gradient(135deg,#163D2A,#0d2b1e)", border: "1px solid rgba(110,231,183,0.3)", color: "#6EE7B7", boxShadow: "0 2px 12px rgba(110,231,183,0.1)" }}>
          <Icon.Upload /> Subir imagen
        </button>
        <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-[1.03]" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#FCA5A5" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}>
          <Icon.LogOut /> Salir
        </button>
      </div>
    </nav>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent }) {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)", borderLeft: `4px solid ${accent || "#6EE7B7"}` }}>
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl" style={{ background: accent || "#6EE7B7", opacity: 0.08 }} />
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#52525B" }}>{label}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${accent}15`, color: accent || "#6EE7B7" }}>{icon}</div>
      </div>
      <p className="text-4xl font-extrabold" style={{ color: "#FFFFFF" }}>{value}</p>
    </div>
  );
}

// ─── UPLOAD ZONE ──────────────────────────────────────────────────────────
function UploadZone({ onFileSelect, uploading }) {
  const inputRef = useRef(null);
  const handleChange = (e) => { const files = Array.from(e.target.files); if (files.length) onFileSelect(files); };
  return (
    <div onClick={() => inputRef.current?.click()} className="cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300" style={{ borderColor: "rgba(110,231,183,0.15)", background: "rgba(110,231,183,0.02)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#6EE7B7"; e.currentTarget.style.background = "rgba(110,231,183,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(110,231,183,0.15)"; e.currentTarget.style.background = "rgba(110,231,183,0.02)"; }}>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleChange} />
      <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}>{uploading ? <Icon.Loader /> : <Icon.Upload />}</div>
      <p className="font-semibold mb-1" style={{ color: "#FFFFFF" }}>{uploading ? "Procesando..." : "Subir imágenes"}</p>
      <p className="text-sm" style={{ color: "#A1A1AA" }}>PNG, JPG, WEBP · Arrastrá o hacé clic</p>
    </div>
  );
}

// ─── REPORT CARD ──────────────────────────────────────────────────────────
function ReportCard({ report, onRemove, onSelect }) {
  if (report.status === "loading") {
    return (
      <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
        <div className="aspect-video" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="p-4">
          <div className="space-y-2 mb-3">
            <div className="h-3 w-32 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-2 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
          <div className="p-3 rounded-xl border space-y-2" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="h-2 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="h-2 w-full rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="h-2 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }} onClick={() => onSelect(report)} onMouseEnter={e => { e.currentTarget.style.borderColor = "#6EE7B7"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(110,231,183,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(110,231,183,0.08)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div className="aspect-video bg-black relative overflow-hidden">
        <img src={report.preview} alt={report.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-sm" style={{ color: "#FFFFFF" }}>{report.name}</p>
            <p className="text-xs" style={{ color: "#A1A1AA" }}>{report.date}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onRemove(report.id); }} className="p-1.5 rounded-lg transition-all duration-150" style={{ color: "#A1A1AA" }} onMouseEnter={e => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.color = "#A1A1AA"; e.currentTarget.style.background = "transparent"; }}>
            <Icon.X />
          </button>
        </div>
        <div className="p-3 rounded-xl border" style={{ background: "rgba(110,231,183,0.03)", borderColor: "rgba(110,231,183,0.08)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon.Zap />
            <span className="text-xs font-bold tracking-wide" style={{ color: "#6EE7B7" }}>Análisis IA</span>
          </div>
          <p className="text-xs" style={{ color: "#71717A" }}>{report.result}</p>
          {report.category && (
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: report.category === "sin detección" ? "rgba(255,255,255,0.05)" : "rgba(110,231,183,0.1)", color: report.category === "sin detección" ? "#71717A" : "#6EE7B7", border: report.category === "sin detección" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(110,231,183,0.25)" }}>
              {report.category}
            </span>
          )}
          {report.confidence != null && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "#A1A1AA" }}>Confianza</span>
                <span style={{ color: "#6EE7B7", fontWeight: 700 }}>{report.confidence}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${report.confidence}%`, background: "linear-gradient(90deg,#163D2A,#6EE7B7)" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── REPORT MODAL ─────────────────────────────────────────────────────────
function ReportModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: "#0B0F0C", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", border: "1px solid rgba(110,231,183,0.12)" }} onClick={(e) => e.stopPropagation()}>
        <img src={report.preview} alt={report.name} className="w-full max-h-80 object-cover" />
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-lg shadow-md transition-all" style={{ background: "rgba(0,0,0,0.6)", color: "#FFFFFF" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.85)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}>
          <Icon.X />
        </button>
        <div className="p-6 space-y-4">
          <div>
            <p className="font-bold text-xl" style={{ color: "#FFFFFF" }}>{report.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>{report.date}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>{report.result}</p>
          {report.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: report.category === "sin detección" ? "rgba(255,255,255,0.05)" : "rgba(110,231,183,0.1)", color: report.category === "sin detección" ? "#71717A" : "#6EE7B7", border: report.category === "sin detección" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(110,231,183,0.25)" }}>
              {report.category}
            </span>
          )}
          {report.confidence != null && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "#A1A1AA" }}>Confianza</span>
                <span style={{ color: "#6EE7B7", fontWeight: 700 }}>{report.confidence}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${report.confidence}%`, background: "linear-gradient(90deg,#163D2A,#6EE7B7)" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAP VIEW ─────────────────────────────────────────────────────────────
const CORDOBA = { lat: -31.4201, lng: -64.1888 };

function MapView({ reports, onNewReport, token }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [clickCoords, setClickCoords] = useState(null);
  const [formDesc, setFormDesc] = useState("");
  const [formFile, setFormFile] = useState(null);
  const [formFilePreview, setFormFilePreview] = useState(null);
  const [formSaving, setFormSaving] = useState(false);
  const formFileRef = useRef(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    import("maplibre-gl").then((maplibregl) => {
      const L = maplibregl.default || maplibregl;

      const map = new L.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm-layer", type: "raster", source: "osm" }],
        },
        center: [CORDOBA.lng, CORDOBA.lat],
        zoom: 11,
        attributionControl: false,
      });

      map.addControl(new L.NavigationControl({ showCompass: false }), "top-right");

      map.on("click", (e) => {
        setClickCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        setFormDesc("");
        setFormFile(null);
        setPopupInfo(null);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const timer = setTimeout(() => {
      import("maplibre-gl").then((maplibregl) => {
        const L = maplibregl.default || maplibregl;

        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        // ── CAMBIO: solo mostrar marcador si tiene coordenadas reales ──
        reports.filter((r) => r.status === "done").forEach((report) => {
          if (report.lat == null || report.lng == null) return;
          const lat = report.lat;
          const lng = report.lng;

          const el = document.createElement("div");
          el.style.cssText = `width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${report.category === "sin detección" ? "#163D2A" : "#0d2b1e"};border:2px solid #6EE7B7;box-shadow:0 0 10px rgba(110,231,183,0.4);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:box-shadow 0.2s;`;

          const dot = document.createElement("div");
          dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:#6EE7B7;transform:rotate(45deg);";
          el.appendChild(dot);

          el.addEventListener("mouseenter", () => { el.style.boxShadow = "0 0 18px rgba(110,231,183,0.7)"; });
          el.addEventListener("mouseleave", () => { el.style.boxShadow = "0 0 10px rgba(110,231,183,0.4)"; });
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setClickCoords(null);
            setPopupInfo((prev) => prev?.id === report.id ? null : { ...report, lat, lng });
          });

          const marker = new L.Marker({ element: el, anchor: "bottom" }).setLngLat([lng, lat]).addTo(mapRef.current);
          markersRef.current.push(marker);
        });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [reports]);

  const handleFormSave = async () => {
    if (!clickCoords) return;
    setFormSaving(true);
    try {
      const formData = new FormData();
      if (formFile) formData.append("image", formFile);
      if (formDesc) formData.append("description", formDesc);
      formData.append("lat", clickCoords.lat);
      formData.append("lng", clickCoords.lng);

      const res = await fetch(DJANGO_API, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = res.ok ? await res.json().catch(() => ({})) : {};

      const newReport = {
        id: data.id || Date.now(),
        name: formFile ? formFile.name : `Reporte manual`,
        date: new Date().toLocaleDateString("es-AR"),
        status: "done",
        preview: formFile ? URL.createObjectURL(formFile) : null,
        result: formDesc || "Reporte manual creado desde el mapa",
        category: data.category || "manual",
        confidence: data.confidence ?? null,
        lat: clickCoords.lat,
        lng: clickCoords.lng,
      };

      if (onNewReport) onNewReport(newReport);
      setClickCoords(null);
      setFormDesc("");
      setFormFile(null);
      if (formFilePreview) URL.revokeObjectURL(formFilePreview);
      setFormFilePreview(null);
    } catch (err) {
      console.error(err);
    }
    setFormSaving(false);
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(110,231,183,0.12)", boxShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(22,61,42,0.6)", borderBottom: "1px solid rgba(110,231,183,0.1)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#6EE7B7" }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6EE7B7" }}>Mapa urbano — Córdoba Capital</span>
        </div>
        <span className="text-xs" style={{ color: "#A1A1AA" }}>
          {reports.filter((r) => r.status === "done" && r.lat != null).length} detecciones
          <span className="ml-2 opacity-50">· clic para reportar</span>
        </span>
      </div>

      <div ref={mapContainer} style={{ width: "100%", height: "450px" }} />

      {clickCoords && (
        <div className="p-4" style={{ background: "rgba(22,61,42,0.5)", borderTop: "1px solid rgba(110,231,183,0.15)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6EE7B7" }}>Nuevo reporte</p>
              <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>
                {clickCoords.lat.toFixed(5)}, {clickCoords.lng.toFixed(5)}
              </p>
            </div>
            <button onClick={() => setClickCoords(null)} className="p-1.5 rounded-lg transition-all" style={{ color: "#A1A1AA" }} onMouseEnter={e => e.currentTarget.style.color = "#FFFFFF"} onMouseLeave={e => e.currentTarget.style.color = "#A1A1AA"}>
              <Icon.X />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all" style={{ border: "1px dashed rgba(110,231,183,0.3)", background: formFile ? "transparent" : "rgba(110,231,183,0.04)" }} onClick={() => formFileRef.current?.click()}>
              <input ref={formFileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0] || null; setFormFile(f); if (formFilePreview) URL.revokeObjectURL(formFilePreview); setFormFilePreview(f ? URL.createObjectURL(f) : null); }} />
              {formFile ? (
                <img src={formFilePreview} alt="preview" className="w-full h-full rounded-xl object-cover" />
              ) : (
                <span style={{ color: "#6EE7B7", opacity: 0.5 }}><Icon.Image /></span>
              )}
            </div>
            <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Descripción del problema urbano..." rows={2} className="flex-1 px-3 py-2 rounded-xl text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(110,231,183,0.15)", color: "#FFFFFF" }} onFocus={e => e.target.style.borderColor = "#6EE7B7"} onBlur={e => e.target.style.borderColor = "rgba(110,231,183,0.15)"} />
            <button onClick={handleFormSave} disabled={formSaving} className="flex-shrink-0 px-4 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] disabled:opacity-50" style={{ background: "linear-gradient(135deg,#163D2A,#0d2b1e)", border: "1px solid rgba(110,231,183,0.3)", color: "#6EE7B7" }}>
              {formSaving ? <Icon.Loader /> : "Guardar"}
            </button>
          </div>
        </div>
      )}

      {popupInfo && !clickCoords && (
        <div className="flex items-center gap-4 p-4" style={{ background: "rgba(22,61,42,0.4)", borderTop: "1px solid rgba(110,231,183,0.1)" }}>
          {popupInfo.preview && (
            <img src={popupInfo.preview} alt={popupInfo.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "#FFFFFF" }}>{popupInfo.name}</p>
            {popupInfo.category && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: popupInfo.category === "sin detección" ? "rgba(255,255,255,0.05)" : "rgba(110,231,183,0.1)", color: popupInfo.category === "sin detección" ? "#71717A" : "#6EE7B7", border: popupInfo.category === "sin detección" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(110,231,183,0.25)" }}>
                {popupInfo.category}
              </span>
            )}
            {popupInfo.confidence != null && (
              <div className="mt-2">
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${popupInfo.confidence}%`, background: "linear-gradient(90deg,#163D2A,#6EE7B7)" }} />
                </div>
                <p className="text-xs mt-1" style={{ color: "#6EE7B7" }}>{popupInfo.confidence}% confianza</p>
              </div>
            )}
          </div>
          <button onClick={() => setPopupInfo(null)} className="flex-shrink-0 p-1.5 rounded-lg transition-all" style={{ color: "#A1A1AA" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")} onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}>
            <Icon.X />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl flex items-center gap-2" style={type === "error" ? { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", boxShadow: "0 4px 20px rgba(239,68,68,0.15)" } : { background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)", color: "#6EE7B7", boxShadow: "0 4px 20px rgba(110,231,183,0.1)" }}>
      {type === "error" ? "❌" : "✔"} {msg}
    </div>
  );
}

// ─── API ──────────────────────────────────────────────────────────────────
const DJANGO_API = "http://127.0.0.1:8000/api/reports/";
const DJANGO_MEDIA = "http://127.0.0.1:8000";
let nextId = 1;
const fakeResult = (name) => `Imagen urbana analizada: ${name}`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [reports, setReports] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [section, setSection] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const uploadRef = useRef(null);
  const navInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;
    fetch(DJANGO_API, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { if (res.status === 401) { handleLogout(); return; } return res.json(); })
      .then((data) => {
        if (!data) return;
        setReports(data.map((item, index) => ({
          id: item.id || index,
          name: item.image?.split("/").pop() || "Imagen",
          size: "Guardado",
          date: new Date().toLocaleDateString("es-AR"),
          status: "done",
          preview: `${DJANGO_MEDIA}${item.image}`,
          result: item.description || "Reporte urbano generado",
          category: item.category,
          confidence: item.confidence,
          // ── CAMBIO: leer lat y lng reales desde Django ──
          lat: item.lat ?? null,
          lng: item.lng ?? null,
        })));
      })
      .catch(console.error);
  }, [token]);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); if (toastTimerRef.current) clearTimeout(toastTimerRef.current); toastTimerRef.current = setTimeout(() => setToast(null), 4000); };

  const handleFiles = async (files) => {
    setUploading(true);
    setSection("reports");
    const newReports = files.map((f) => ({ id: nextId++, name: f.name, size: `${(f.size / 1024).toFixed(0)} KB`, date: new Date().toLocaleDateString("es-AR"), status: "loading", preview: URL.createObjectURL(f), result: null, category: null, confidence: null, _file: f }));
    setReports((prev) => [...newReports, ...prev]);
    for (const report of newReports) {
      try {
        const formData = new FormData();
        formData.append("image", report._file);
        const res = await fetch(DJANGO_API, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
        if (res.status === 401) { handleLogout(); return; }
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json().catch(() => ({}));
        setReports((prev) => prev.map((r) => {
          if (r.id !== report.id) return r;
          if (r.preview && r.preview.startsWith("blob:")) URL.revokeObjectURL(r.preview);
          return { ...r, status: "done", preview: data.image ? `${DJANGO_MEDIA}${data.image}` : r.preview, result: data.result || fakeResult(report.name), category: data.category, confidence: data.confidence, lat: data.lat ?? null, lng: data.lng ?? null };
        }));
        showToast(`"${report.name}" procesada`);
      } catch (error) {
        console.error(error);
        showToast(`Error al procesar "${report.name}"`, "error");
        setReports((prev) => prev.map((r) => {
          if (r.id !== report.id) return r;
          if (r.preview && r.preview.startsWith("blob:")) URL.revokeObjectURL(r.preview);
          return { ...r, status: "error", result: "Error al procesar" };
        }));
      }
    }
    setUploading(false);
  };

  const removeReport = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/reports/${id}/`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setReports((prev) => prev.filter((r) => r.id !== id));
      showToast("Reporte eliminado");
    } catch (error) { console.error(error); showToast("Error al eliminar el reporte", "error"); }
  };

  const topCategory = (() => {
    const done = reports.filter((r) => r.status === "done" && r.category && r.category !== "sin detección");
    if (!done.length) return "—";
    const freq = done.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {});
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  })();

  const stats = [
    { label: "Imágenes", value: reports.length, icon: <Icon.Camera />, accent: "#6EE7B7" },
    { label: "Análisis", value: reports.filter((r) => r.status === "done").length, icon: <Icon.BarChart />, accent: "#F97316" },
    { label: "Categoría frecuente", value: topCategory, icon: <Icon.Shield />, accent: "#6EE7B7" },
  ];

  const sectionLabel = section === "dashboard" ? "Resumen general de detecciones urbanas" : section === "analysis" ? "Motor de análisis con Roboflow activo" : section === "reports" ? "Imágenes procesadas y resultados de IA" : "Preferencias de la plataforma";

  if (!token) return <LoginScreen onLogin={setToken} />;

  return (
    <>
      <div className="min-h-screen" style={{ background: "#0B0F0C", fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar setSection={setSection} section={section} onUploadClick={() => navInputRef.current?.click()} onLogout={handleLogout} />

        <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
          <input ref={navInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { const files = Array.from(e.target.files); if (files.length) handleFiles(files); e.target.value = ""; }} />

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#6EE7B7" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F97316", letterSpacing: "0.15em" }}>{sectionLabel}</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-3 leading-tight" style={{ color: "#FFFFFF" }}>Urban<span style={{ color: "#6EE7B7" }}>IA</span></h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "#A1A1AA" }}>Plataforma inteligente de monitoreo urbano. Detecta residuos, contenedores y zonas críticas con visión artificial.</p>
          </div>

          {section === "dashboard" && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {stats.map((s) => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} accent={s.accent} />)}
              </div>
              <div className="mb-6">
                <MapView reports={reports} token={token} onNewReport={(newReport) => setReports((prev) => [newReport, ...prev])} />
              </div>
              <div className="rounded-2xl p-6 mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}><Icon.Map /></div>
                  <h2 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Resumen urbano</h2>
                </div>
                <p className="leading-relaxed" style={{ color: "#A1A1AA" }}>UrbanIA analiza imágenes urbanas en tiempo real para detectar infraestructura dañada, residuos y zonas críticas mediante inteligencia artificial con Roboflow.</p>
              </div>
              {reports.filter((r) => r.status === "done").length > 0 && (
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.08)", color: "#F97316" }}><Icon.Zap /></div>
                    <h2 className="text-lg font-bold" style={{ color: "#FFFFFF" }}>Actividad reciente</h2>
                  </div>
                  <div className="space-y-2">
                    {reports.filter((r) => r.status === "done").slice(0, 3).map((r) => (
                      <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-150" style={{ background: "transparent" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(110,231,183,0.04)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }} onClick={() => setSelectedReport(r)}>
                        <img src={r.preview} alt={r.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate" style={{ color: "#FFFFFF" }}>{r.name}</p>
                          <p className="text-xs truncate" style={{ color: "#A1A1AA" }}>{r.category ?? "—"}</p>
                        </div>
                        {r.confidence != null && <span className="text-xs font-bold flex-shrink-0 px-2 py-1 rounded-lg" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}>{r.confidence}%</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {section === "analysis" && (() => {
            const done = reports.filter((r) => r.status === "done");
            const conDeteccion = done.filter((r) => r.category && r.category !== "sin detección");
            const sinDeteccion = done.filter((r) => r.category === "sin detección");
            const promConfianza = conDeteccion.length ? (conDeteccion.reduce((acc, r) => acc + (r.confidence || 0), 0) / conDeteccion.length).toFixed(1) : 0;
            const freq = conDeteccion.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {});
            const categorias = Object.entries(freq).sort((a, b) => b[1] - a[1]);
            const maxFreq = categorias.length ? categorias[0][1] : 1;
            return (
              <div className="space-y-4">
                <div className="rounded-2xl p-6" style={{ background: "rgba(110,231,183,0.03)", border: "1px solid rgba(110,231,183,0.12)", boxShadow: "0 2px 16px rgba(110,231,183,0.04)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}><Icon.Zap /></div>
                    <h2 className="text-xl font-bold" style={{ color: "#6EE7B7" }}>Panel de análisis IA</h2>
                  </div>
                  <p className="leading-relaxed" style={{ color: "#A1A1AA" }}>UrbanIA detecta automáticamente categorías urbanas como residuos y contenedores mediante Roboflow. Cada análisis devuelve la categoría detectada y el nivel de confianza de la predicción.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[{ label: "Total analizadas", value: done.length, accent: "#6EE7B7" }, { label: "Confianza promedio", value: `${promConfianza}%`, accent: "#F97316" }, { label: "Sin detección", value: sinDeteccion.length, accent: "#FB923C" }].map((s) => (
                    <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", borderLeft: `4px solid ${s.accent}`, boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl" style={{ background: s.accent, opacity: 0.08 }} />
                      <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#52525B" }}>{s.label}</p>
                      <p className="text-4xl font-extrabold" style={{ color: "#FFFFFF" }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                {categorias.length > 0 && (
                  <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#52525B" }}>Categorías detectadas</h3>
                    <div className="space-y-4">
                      {categorias.map(([cat, count]) => (
                        <div key={cat}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-semibold capitalize" style={{ color: "#E4E4E7" }}>{cat}</span>
                            <span style={{ color: "#A1A1AA" }}>{count} imagen{count !== 1 ? "es" : ""}</span>
                          </div>
                          <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                            <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${(count / maxFreq) * 100}%`, background: "linear-gradient(90deg,#163D2A,#6EE7B7)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {done.length === 0 && (
                  <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}><Icon.BarChart /></div>
                    <p className="text-sm font-medium" style={{ color: "#A1A1AA" }}>Todavía no hay imágenes analizadas.</p>
                    <p className="text-xs mt-1" style={{ color: "#52525B" }}>Subí una imagen para ver las estadísticas aquí.</p>
                  </div>
                )}
              </div>
            );
          })()}

          {section === "reports" && (
            <>
              <div ref={uploadRef} className="mb-8"><UploadZone onFileSelect={handleFiles} uploading={uploading} /></div>
              {reports.length === 0 ? (
                <div className="rounded-3xl p-14 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
                  <div className="w-20 h-20 mx-auto mb-5 rounded-3xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}><Icon.Image /></div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#FFFFFF" }}>No hay reportes todavía</h3>
                  <p className="max-w-md mx-auto mb-6" style={{ color: "#A1A1AA" }}>Subí imágenes urbanas para comenzar el análisis inteligente con UrbanIA.</p>
                  <button onClick={() => uploadRef.current?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-2xl font-semibold transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg,#163D2A,#0d2b1e)", border: "1px solid rgba(110,231,183,0.3)", color: "#6EE7B7", boxShadow: "0 4px 16px rgba(110,231,183,0.1)" }}>
                    Subir primera imagen
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reports.map((r) => <ReportCard key={r.id} report={r} onRemove={removeReport} onSelect={setSelectedReport} />)}
                </div>
              )}
            </>
          )}

          {section === "settings" && (
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(110,231,183,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7" }}><Icon.Shield /></div>
                <h2 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>Configuración</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "rgba(110,231,183,0.06)" }}>
                  <div>
                    <p className="font-semibold" style={{ color: "#FFFFFF" }}>Modo oscuro</p>
                    <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>Interfaz optimizada para análisis nocturno</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7", borderColor: "rgba(110,231,183,0.2)" }}>Activado</span>
                </div>
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "rgba(110,231,183,0.06)" }}>
                  <div>
                    <p className="font-semibold" style={{ color: "#FFFFFF" }}>Motor de detección</p>
                    <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>Roboflow — modelo urbano v1</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7", borderColor: "rgba(110,231,183,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EE7B7" }} /> Activo
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <p className="font-semibold" style={{ color: "#FFFFFF" }}>Backend</p>
                    <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>Django — {DJANGO_API}</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold" style={{ background: "rgba(110,231,183,0.08)", color: "#6EE7B7", borderColor: "rgba(110,231,183,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#6EE7B7" }} /> Conectado
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>

        {toast && <Toast msg={toast.msg} type={toast.type} />}
        <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      </div>
    </>
  );
}