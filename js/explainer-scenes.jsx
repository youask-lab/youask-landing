/* YouAsk Explainer — phone-screen content per scene */
(function () {
  const E = window.EB;
  const { useSprite, Easing, clamp, interpolate } = window;
  const { BLUE, BLUE600, BLUE300, INK, INK2, INK3, SOFT, BLUE50, LINE, GREEN, AMBER, VIOLET, FONT } = E;

  const CONTENT_TOP = 108;
  const card = (extra = {}) => ({
    background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16,
    boxShadow: "0 6px 18px rgba(22,32,58,.06)", ...extra,
  });

  /* ===== Scene 0 — STUCK ===== */
  function ScreenStuck() {
    const { localTime } = useSprite();
    const pulse = 1 + Math.sin(localTime * 3.2) * 0.04;
    const chips = [
      ["How do I crack my interview?", 26, 150, 0.3, BLUE],
      ["Is my resume good enough?", 150, 250, 0.6, VIOLET],
      ["Which career path fits me?", 18, 380, 0.9, AMBER],
    ];
    return (
      <div style={{ position: "absolute", inset: 0, background: SOFT }}>
        <E.StatusBar /><E.AppHeader title="YouAsk" />
        {chips.map((c, i) => {
          const e = E.entry(localTime - c[3], { dur: 0.5, rise: 14 });
          const fl = Math.sin(localTime * 2 + i) * 4;
          return (
            <div key={i} style={{
              position: "absolute", left: c[1], top: c[2] + fl, opacity: e.o * 0.96,
              transform: `translateY(${e.ty}px)`, ...card({ padding: "10px 13px", borderRadius: 13 }),
              fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: INK2, maxWidth: 180,
            }}>
              <span style={{ color: c[4], fontWeight: 800, marginRight: 5 }}>?</span>{c[0]}
            </div>
          );
        })}
        <div style={{
          position: "absolute", left: "50%", top: 300, transform: `translate(-50%,-50%) scale(${pulse})`,
          width: 118, height: 118, borderRadius: "50%",
          background: "linear-gradient(150deg,#1d60fc,#6f9bff)", display: "grid", placeItems: "center",
          color: "#fff", fontSize: 64, fontWeight: 800, fontFamily: FONT,
          boxShadow: "0 22px 50px rgba(29,96,252,.4)",
        }}>?</div>
        <div style={{
          position: "absolute", left: "50%", top: 300, transform: "translate(-50%,-50%)",
          width: 118 * pulse + 24, height: 118 * pulse + 24, borderRadius: "50%",
          border: `2px solid ${BLUE300}`, opacity: 0.5,
        }} />
      </div>
    );
  }

  /* ===== Scene 1 — ASK ===== */
  function ScreenAsk() {
    const { localTime } = useSprite();
    const full = "How do I crack a system design interview?";
    const chars = Math.floor(clamp((localTime - 0.5) / 1.8, 0, 1) * full.length);
    const typed = full.slice(0, chars);
    const done = chars >= full.length;
    const sendE = E.entry(localTime - 2.6, { dur: 0.4, from: 0.6 });
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        <E.StatusBar /><E.AppHeader title="Ask" />
        <div style={{
          position: "absolute", top: CONTENT_TOP, left: 0, right: 0, bottom: 0,
          padding: "10px 20px 20px", display: "flex", flexDirection: "column", fontFamily: FONT,
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, letterSpacing: "-.02em", lineHeight: 1.18 }}>What do you need help with?</div>
          <div style={{ fontSize: 13, color: INK3, marginTop: 6 }}>Describe it and we'll match an expert.</div>
          {/* input */}
          <div style={{
            position: "relative", marginTop: 16, minHeight: 124,
            ...card({ borderRadius: 18, padding: "16px 16px 58px" }),
            borderColor: BLUE300, boxShadow: "0 0 0 4px #eef3ff",
          }}>
            <div style={{ fontSize: 15.5, lineHeight: 1.5, color: INK, fontWeight: 600 }}>
              {typed}<span style={{ opacity: done ? 0 : (Math.floor(localTime * 2) % 2), color: BLUE, fontWeight: 700 }}>|</span>
            </div>
            <div style={{
              position: "absolute", right: 14, bottom: 12, width: 40, height: 40, borderRadius: 12,
              background: BLUE, display: "grid", placeItems: "center",
              transform: `scale(${sendE.s})`, opacity: sendE.o, boxShadow: "0 8px 18px rgba(29,96,252,.4)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
          {/* suggestion chips */}
          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 9 }}>
            {["Interviews", "Resume", "Tech help", "Career"].map((t, i) => {
              const e = E.entry(localTime - (0.3 + i * 0.12), { dur: 0.4, rise: 10 });
              const active = i === 0;
              return <span key={t} style={{
                opacity: e.o, transform: `translateY(${e.ty}px)`, fontSize: 13, fontWeight: 700,
                padding: "8px 14px", borderRadius: 100, color: active ? "#fff" : INK2,
                background: active ? BLUE : SOFT, border: `1px solid ${active ? BLUE : LINE}`,
              }}>{t}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ===== Scene 2 — MATCH ===== */
  const EXPERTS = [
    ["AM", "Aarav Mehta", "Senior SWE · ex-Razorpay", BLUE, "4.9", "System Design"],
    ["PN", "Priya Nair", "Career Coach · 10 yrs", GREEN, "5.0", "Interviews"],
    ["RK", "Rohan Kapoor", "Tech Recruiter · FAANG", AMBER, "4.8", "Mock Interview"],
  ];
  function ScreenMatch({ cursor }) {
    const { localTime } = useSprite();
    const picked = localTime > 2.6; // top card selected
    return (
      <div style={{ position: "absolute", inset: 0, background: SOFT }}>
        <E.StatusBar /><E.AppHeader title="Experts" />
        <div style={{ position: "absolute", top: CONTENT_TOP, left: 20, right: 20, fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK3 }}>
          3 verified experts matched
        </div>
        {EXPERTS.map((x, i) => {
          const e = E.entry(localTime - (0.3 + i * 0.22), { dur: 0.5, rise: 22 });
          const sel = i === 0 && picked;
          return (
            <div key={i} style={{
              position: "absolute", top: CONTENT_TOP + 30 + i * 116, left: 20, right: 20,
              opacity: e.o, transform: `translateY(${e.ty}px) scale(${sel ? 1.02 : 1})`,
              ...card({ padding: 15, borderRadius: 18 }),
              borderColor: sel ? BLUE : LINE, boxShadow: sel ? "0 14px 30px rgba(29,96,252,.24)" : "0 6px 18px rgba(22,32,58,.06)",
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <E.Avatar initials={x[0]} color={x[3]} size={46} online={i === 0} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: INK }}>{x[1]}</span>
                    {sel && <Verified />}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 11.5, color: INK3, marginTop: 2 }}>{x[2]}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                <E.Tag bg={BLUE50} color={BLUE600}>{x[5]}</E.Tag>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: FONT, fontSize: 12.5, color: INK2, fontWeight: 700 }}>
                  <E.Stars n={5} size={11} /> {x[4]}
                </span>
              </div>
            </div>
          );
        })}
        {cursor}
      </div>
    );
  }
  function Verified() {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "#e9fbf2", color: GREEN, fontFamily: FONT, fontWeight: 800, fontSize: 10.5, padding: "3px 7px", borderRadius: 100 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Verified
      </span>
    );
  }

  /* ===== Scene 3 — BOOK ===== */
  function ScreenBook({ cursor }) {
    const { localTime } = useSprite();
    const days = [["Mon", 12], ["Tue", 13], ["Wed", 14], ["Thu", 15], ["Fri", 16]];
    const slots = ["10:00", "11:30", "2:00", "4:30"];
    const pickedSlot = localTime > 1.6 ? 1 : -1;
    const confirmed = localTime > 3.1;
    const confE = E.entry(localTime - 2.4, { dur: 0.4, from: 0.7 });
    return (
      <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
        <E.StatusBar /><E.AppHeader title="Booking" />
        <div style={{ position: "absolute", top: CONTENT_TOP, left: 20, right: 20, fontFamily: FONT }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: INK }}>March 2025</div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {days.map((d, i) => {
              const e = E.entry(localTime - (0.2 + i * 0.08), { dur: 0.4, rise: 12 });
              const active = i === 2;
              return (
                <div key={i} style={{
                  flex: 1, opacity: e.o, transform: `translateY(${e.ty}px)`, textAlign: "center",
                  padding: "9px 0", borderRadius: 12, background: active ? BLUE : SOFT,
                  color: active ? "#fff" : INK2, border: `1px solid ${active ? BLUE : LINE}`,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>{d[0]}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{d[1]}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: INK3, margin: "20px 0 10px" }}>Available times</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            {slots.map((s, i) => {
              const e = E.entry(localTime - (0.5 + i * 0.1), { dur: 0.4, rise: 10 });
              const sel = i === pickedSlot;
              return (
                <div key={i} style={{
                  opacity: e.o, transform: `translateY(${e.ty}px)`, textAlign: "center", padding: "13px 0",
                  borderRadius: 13, fontFamily: FONT, fontWeight: 800, fontSize: 15,
                  background: sel ? BLUE : "#fff", color: sel ? "#fff" : INK,
                  border: `1.5px solid ${sel ? BLUE : LINE}`, boxShadow: sel ? "0 10px 22px rgba(29,96,252,.3)" : "none",
                }}>{s} PM</div>
              );
            })}
          </div>
        </div>
        {/* confirm button */}
        <div style={{
          position: "absolute", left: 20, right: 20, bottom: 30, height: 52, borderRadius: 15,
          background: confirmed ? GREEN : BLUE, display: "grid", placeItems: "center",
          color: "#fff", fontFamily: FONT, fontWeight: 800, fontSize: 16,
          opacity: confE.o, transform: `scale(${confE.s})`, boxShadow: `0 12px 26px ${confirmed ? "rgba(31,175,107,.4)" : "rgba(29,96,252,.4)"}`,
        }}>
          {confirmed
            ? <span style={{ display: "flex", alignItems: "center", gap: 8 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 6" strokeLinecap="round" strokeLinejoin="round" /></svg>Booked!</span>
            : "Confirm booking"}
        </div>
        {cursor}
      </div>
    );
  }

  /* ===== Scene 4 — CALL ===== */
  function ScreenCall() {
    const { localTime } = useSprite();
    const bubbles = [
      ["Hi! Walk me through your problem.", false, 0.6],
      ["I freeze on system design rounds.", true, 1.5],
      ["Let's start with the basics →", false, 2.5],
    ];
    const wave = (i) => 6 + Math.abs(Math.sin(localTime * 4 + i)) * 16;
    return (
      <div style={{ position: "absolute", inset: 0, background: "#0e1733" }}>
        {/* expert video tile */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% 0%, #1b2b57 0%, #0e1733 70%)" }} />
        <div style={{ position: "absolute", top: 92, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <E.Avatar initials="PN" color={GREEN} size={92} />
            <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: "3px solid rgba(31,175,107,.5)", animation: "none" }} />
          </div>
          <div style={{ fontFamily: FONT, color: "#fff", fontWeight: 800, fontSize: 16, marginTop: 14 }}>Priya Nair</div>
          <div style={{ fontFamily: FONT, color: "rgba(255,255,255,.6)", fontSize: 12, marginTop: 3, display: "flex", gap: 6, alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN }} /> Live · 30:00
          </div>
          {/* speaking waveform */}
          <div style={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "flex-end", height: 24, marginTop: 12 }}>
            {[0, 1, 2, 3, 4].map(i => <span key={i} style={{ width: 3, height: wave(i), borderRadius: 2, background: GREEN }} />)}
          </div>
        </div>
        {/* chat bubbles */}
        <div style={{ position: "absolute", left: 16, right: 16, top: 270, display: "flex", flexDirection: "column", gap: 8 }}>
          {bubbles.map((b, i) => {
            const e = E.entry(localTime - b[2], { dur: 0.4, rise: 10, from: 0.8 });
            if (e.o < 0.02) return null;
            return (
              <div key={i} style={{ alignSelf: b[1] ? "flex-end" : "flex-start", opacity: e.o, transform: `translateY(${e.ty}px) scale(${e.s})`, maxWidth: "78%" }}>
                <div style={{
                  fontFamily: FONT, fontSize: 12.5, fontWeight: 600, lineHeight: 1.4, padding: "9px 13px",
                  borderRadius: 15, color: b[1] ? "#fff" : INK,
                  background: b[1] ? BLUE : "#fff",
                  borderBottomRightRadius: b[1] ? 4 : 15, borderBottomLeftRadius: b[1] ? 15 : 4,
                }}>{b[0]}</div>
              </div>
            );
          })}
        </div>
        {/* self PiP */}
        <div style={{ position: "absolute", right: 16, top: 64, width: 64, height: 84, borderRadius: 12, background: "linear-gradient(160deg,#41496a,#222a45)", border: "2px solid rgba(255,255,255,.15)", display: "grid", placeItems: "center", overflow: "hidden" }}>
          <E.Avatar initials="You" color={VIOLET} size={40} />
        </div>
        {/* controls */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, display: "flex", justifyContent: "center", gap: 14 }}>
          {[["mic", "#243054"], ["cam", "#243054"], ["end", "#ff4d4d"]].map((c, i) => (
            <div key={i} style={{ width: 46, height: 46, borderRadius: "50%", background: c[1], display: "grid", placeItems: "center" }}>
              <CallIc kind={c[0]} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  function CallIc({ kind }) {
    if (kind === "end") return <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 9c-1.6 0-3.2.3-4.7.7v3.1c0 .4-.2.7-.5.9-.8.4-1.6.9-2.3 1.5-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3L.3 12.4c-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7C3.4 8.2 7.5 6.5 12 6.5s8.6 1.7 11.7 4.5c.2.2.3.4.3.7 0 .3-.1.5-.3.7l-2.5 2.8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.7-.6-1.5-1.1-2.3-1.5-.3-.2-.5-.5-.5-.9V9.7C15.2 9.3 13.6 9 12 9z" /></svg>;
    if (kind === "cam") return <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" /></svg>;
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" /><path d="M19 11a7 7 0 01-14 0M12 18v3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
  }

  /* ===== Scene 5 — SOLVED ===== */
  function ScreenSolved() {
    const { localTime } = useSprite();
    const ring = clamp(localTime / 0.7, 0, 1);
    const checkE = E.entry(localTime - 0.4, { dur: 0.5, from: 0.3, ease: Easing.easeOutBack });
    const C = 2 * Math.PI * 52;
    return (
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg,#f5f8ff,#eaf2ff)" }}>
        <E.StatusBar />
        <div style={{ position: "absolute", left: "50%", top: 210, transform: "translateX(-50%)", textAlign: "center" }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="52" fill="none" stroke="#d4e6dc" strokeWidth="10" />
            <circle cx="70" cy="70" r="52" fill="none" stroke={GREEN} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - ring)} transform="rotate(-90 70 70)" />
            <g style={{ opacity: checkE.o, transform: `scale(${checkE.s})`, transformOrigin: "70px 70px" }}>
              <path d="M48 71l14 14 30-32" fill="none" stroke={GREEN} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", fontFamily: FONT }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: INK, letterSpacing: "-.02em", opacity: E.entry(localTime - 0.8, { dur: 0.4 }).o }}>Problem solved!</div>
          <div style={{ fontSize: 14, color: INK2, marginTop: 8, opacity: E.entry(localTime - 1.0, { dur: 0.4 }).o }}>You rated this session</div>
          <div style={{ marginTop: 12, fontSize: 30, letterSpacing: 4, opacity: E.entry(localTime - 1.2, { dur: 0.4 }).o }}>
            {[0, 1, 2, 3, 4].map(i => {
              const se = E.entry(localTime - (1.2 + i * 0.12), { dur: 0.3, from: 0.2, ease: Easing.easeOutBack });
              return <span key={i} style={{ display: "inline-block", color: "#ffb020", transform: `scale(${se.s})`, opacity: se.o }}>★</span>;
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ===== Scene 6 — EARN ===== */
  function ScreenEarn() {
    const { localTime } = useSprite();
    const amount = Math.floor(clamp(localTime / 1.6, 0, 1) * 1200);
    const coins = [[40, 0.2], [120, 0.5], [200, 0.35], [80, 0.8], [170, 0.65]];
    return (
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg,#0e1733,#16224a)" }}>
        <E.StatusBar />
        {/* falling coins */}
        {coins.map((c, i) => {
          const p = clamp((localTime - c[1]) / 1.2, 0, 1);
          const y = -40 + p * 250;
          return (
            <div key={i} style={{ position: "absolute", left: c[0], top: y, opacity: p > 0 ? 1 : 0, transform: `rotate(${p * 220}deg)` }}>
              <Coin />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: "50%", top: 250, transform: "translateX(-50%)", textAlign: "center", fontFamily: FONT }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: BLUE300, letterSpacing: ".12em", textTransform: "uppercase" }}>Session complete</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#fff", letterSpacing: "-.03em", marginTop: 10 }}>₹{amount.toLocaleString("en-IN")}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginTop: 6 }}>added to your balance</div>
        </div>
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 40, ...{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 16, padding: 16 }, fontFamily: FONT, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(31,175,107,.2)", display: "grid", placeItems: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.4"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" /></svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>Weekly payout</div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12, marginTop: 2 }}>Auto-transfer every Friday</div>
          </div>
        </div>
      </div>
    );
  }
  function Coin() {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15" fill="#ffce4d" stroke="#f0b429" strokeWidth="2" />
        <circle cx="17" cy="17" r="10.5" fill="none" stroke="#f0b429" strokeWidth="1.4" opacity="0.6" />
        <text x="17" y="23" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="16" fill="#9a6a00">₹</text>
      </svg>
    );
  }

  window.EScreens = { ScreenStuck, ScreenAsk, ScreenMatch, ScreenBook, ScreenCall, ScreenSolved, ScreenEarn };
})();
