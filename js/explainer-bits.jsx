/* YouAsk Explainer — shared visual primitives (brand-styled, all SVG/CSS) */
const EB = (function () {
  const BLUE = "#1d60fc", BLUE600 = "#1750e0", BLUE300 = "#6f9bff";
  const INK = "#16203a", INK2 = "#41496a", INK3 = "#8b93ad";
  const SOFT = "#f5f8ff", BLUE50 = "#eef3ff", LINE = "#e9edf6";
  const GREEN = "#1faf6b", AMBER = "#ff7a59", VIOLET = "#7a5cff", NAVY = "#0e1733";
  const FONT = '"Plus Jakarta Sans", system-ui, sans-serif';

  const { useSprite, Easing, clamp, interpolate } = window;

  /* ---- entry helper: returns {o, ty, s} for a sprite-local entrance ---- */
  function entry(localTime, { dur = 0.5, rise = 18, from = 0.92, ease = Easing.easeOutCubic } = {}) {
    const t = ease(clamp(localTime / dur, 0, 1));
    return { o: t, ty: (1 - t) * rise, s: from + (1 - from) * t };
  }

  /* ---- Phone frame (persistent device) ---- */
  function Phone({ x, y, w = 308, h = 624, children, float = 0 }) {
    const pad = 13, sr = 40;
    return (
      <div style={{ position: "absolute", left: x, top: y + float, width: w, height: h, willChange: "transform" }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: sr + pad,
          background: "linear-gradient(155deg,#1a2547,#0a1130)",
          padding: pad, boxShadow: "0 40px 90px rgba(14,23,51,.34), 0 8px 22px rgba(14,23,51,.2)",
        }}>
          <div style={{
            position: "absolute", inset: pad, borderRadius: sr, background: "#fff",
            overflow: "hidden",
          }}>
            {/* notch */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 116, height: 26, background: "#0a1130",
              borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 40,
            }} />
            {children}
          </div>
        </div>
      </div>
    );
  }

  /* status bar inside the phone screen */
  function StatusBar() {
    return (
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 46, zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 22px", fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK,
      }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Bars /><Wifi /><Batt />
        </span>
      </div>
    );
  }
  const Bars = () => (<svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill={INK}/><rect x="4.5" y="5" width="3" height="6" rx="1" fill={INK}/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill={INK}/><rect x="13.5" y="0" width="3" height="11" rx="1" fill={INK}/></svg>);
  const Wifi = () => (<svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.2c2.5 0 4.8 1 6.4 2.5l-1.4 1.5A7 7 0 008 4.3 7 7 0 003 6.2L1.6 4.7A9 9 0 018 2.2z" fill={INK}/><path d="M8 6c1.3 0 2.5.5 3.4 1.4l-1.5 1.5A2.7 2.7 0 008 8.1c-.7 0-1.4.3-1.9.8L4.6 7.4A4.8 4.8 0 018 6z" fill={INK}/><circle cx="8" cy="10" r="1.2" fill={INK}/></svg>);
  const Batt = () => (<svg width="26" height="13" viewBox="0 0 26 13"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" fill="none" stroke={INK} strokeOpacity="0.4"/><rect x="2.5" y="2.5" width="15" height="8" rx="1.5" fill={INK}/><rect x="24" y="4" width="2" height="5" rx="1" fill={INK} fillOpacity="0.4"/></svg>);

  /* app header bar with small YouAsk icon mark */
  function AppHeader({ title }) {
    return (
      <div style={{
        position: "absolute", top: 46, left: 0, right: 0, height: 50, zIndex: 20,
        display: "flex", alignItems: "center", gap: 9, padding: "0 22px",
        borderBottom: `1px solid ${LINE}`, fontFamily: FONT,
      }}>
        <Mark size={22} />
        <span style={{ fontWeight: 800, fontSize: 16, color: INK, letterSpacing: "-.01em", whiteSpace: "nowrap" }}>{title || "YouAsk"}</span>
      </div>
    );
  }

  /* YouAsk icon mark (real logo, cropped) */
  function Mark({ size = 30 }) {
    return <img src="assets/youask-mark.png" alt="YouAsk" width={size} height={size} style={{ display: "block", borderRadius: "22%", flex: "none" }} />;
  }
  /* YouAsk full wordmark (real logo) — white variant for dark backgrounds */
  function Wordmark({ height = 30, white = false }) {
    return <img src={white ? "assets/youask-wordmark-white.png" : "assets/youAsk.png"} alt="YouAsk"
      style={{ height, width: "auto", display: "block" }} />;
  }

  /* avatar with initials */
  function Avatar({ initials, color = BLUE, size = 44, ring = false, online = false }) {
    return (
      <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
        <div style={{
          width: size, height: size, borderRadius: "50%", background: color,
          display: "grid", placeItems: "center", color: "#fff", fontWeight: 800,
          fontFamily: FONT, fontSize: size * 0.36,
          boxShadow: ring ? `0 0 0 3px #fff, 0 0 0 6px ${color}` : "none",
        }}>{initials}</div>
        {online && <span style={{
          position: "absolute", right: -1, bottom: -1, width: size * 0.28, height: size * 0.28,
          borderRadius: "50%", background: GREEN, border: "2.5px solid #fff",
        }} />}
      </div>
    );
  }

  /* small star rating */
  function Stars({ n = 5, size = 12 }) {
    return (
      <span style={{ display: "inline-flex", gap: 1, color: "#ffb020", fontSize: size }}>
        {"★★★★★".slice(0, n)}
      </span>
    );
  }

  /* generic pill / tag */
  function Tag({ children, bg = SOFT, color = INK2 }) {
    return (
      <span style={{
        fontFamily: FONT, fontSize: 11.5, fontWeight: 700, color, background: bg,
        padding: "4px 9px", borderRadius: 100, whiteSpace: "nowrap",
      }}>{children}</span>
    );
  }

  /* caption block on the right side of the stage */
  function Caption({ step, total = 6, kicker, title, sub, accent = BLUE }) {
    const { localTime } = useSprite();
    const e = entry(localTime, { dur: 0.55, rise: 26 });
    const e2 = entry(localTime - 0.12, { dur: 0.55, rise: 26 });
    const e3 = entry(localTime - 0.22, { dur: 0.55, rise: 22 });
    return (
      <div style={{ position: "absolute", left: 712, top: 232, width: 470, fontFamily: FONT }}>
        <div style={{ opacity: e.o, transform: `translateY(${e.ty}px)`, display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
          <span style={{
            display: "inline-grid", placeItems: "center", width: 46, height: 46, borderRadius: 13,
            background: accent, color: "#fff", fontWeight: 800, fontSize: 17,
            boxShadow: `0 12px 26px ${accent}40`,
          }}>{String(step).padStart(2, "0")}</span>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: accent }}>{kicker}</span>
        </div>
        <div style={{ opacity: e2.o, transform: `translateY(${e2.ty}px)`, fontSize: 52, lineHeight: 1.06, fontWeight: 800, color: INK, letterSpacing: "-.03em" }}>{title}</div>
        {sub && <div style={{ opacity: e3.o, transform: `translateY(${e3.ty}px)`, fontSize: 20, lineHeight: 1.5, color: INK2, marginTop: 18, maxWidth: 430 }}>{sub}</div>}
        {/* progress dots */}
        <div style={{ opacity: e3.o, display: "flex", gap: 7, marginTop: 34 }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{
              width: i + 1 === step ? 26 : 8, height: 8, borderRadius: 100,
              background: i + 1 === step ? accent : "#d3ddf2", transition: "all .3s",
            }} />
          ))}
        </div>
      </div>
    );
  }

  /* soft floating background blobs */
  function BlobField() {
    const t = window.useTime();
    const blob = (cx, cy, r, color, sp, ph) => {
      const dx = Math.sin(t * sp + ph) * 16;
      const dy = Math.cos(t * sp * 0.8 + ph) * 14;
      return <div style={{
        position: "absolute", left: cx + dx, top: cy + dy, width: r, height: r, borderRadius: "50%",
        background: color, filter: "blur(2px)", opacity: 0.5,
      }} />;
    };
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {blob(120, 470, 220, "#dfeaff", 0.5, 0)}
        {blob(980, 90, 260, "#e7eeff", 0.4, 2)}
        {blob(560, 560, 150, "#eaf2ff", 0.6, 4)}
        <Dots />
      </div>
    );
  }
  function Dots() {
    const cells = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      cells.push(<circle key={r + "-" + c} cx={c * 16} cy={r * 16} r="1.7" fill={BLUE} />);
    }
    return (
      <svg width="120" height="90" viewBox="-2 -2 120 90" style={{ position: "absolute", left: 612, top: 96, opacity: 0.18 }}>{cells}</svg>
    );
  }

  /* cursor / pointer */
  function Cursor({ x, y, pressed = false }) {
    return (
      <div style={{ position: "absolute", left: x, top: y, zIndex: 60, transform: `scale(${pressed ? 0.86 : 1})`, transition: "transform .12s", willChange: "transform" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,.28))" }}>
          <path d="M5 3l14 7-6 1.6L9.5 18 5 3z" fill="#fff" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        {pressed && <span style={{ position: "absolute", left: 2, top: 2, width: 26, height: 26, borderRadius: "50%", border: `2px solid ${BLUE}`, opacity: 0.6 }} />}
      </div>
    );
  }

  return {
    BLUE, BLUE600, BLUE300, INK, INK2, INK3, SOFT, BLUE50, LINE, GREEN, AMBER, VIOLET, NAVY, FONT,
    entry, Phone, StatusBar, AppHeader, Mark, Wordmark, Avatar, Stars, Tag, Caption, BlobField, Cursor,
  };
})();
window.EB = EB;
