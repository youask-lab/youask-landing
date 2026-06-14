/* YouAsk — Hero with 3 swappable animated-text treatments */
const { useState, useEffect, useRef } = React;

/* ---------- Animated text engines ---------- */

// A) Typewriter
function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = words[i % words.length];
    let t;
    if (!del && txt === full) {
      t = setTimeout(() => setDel(true), 1300);
    } else if (del && txt === "") {
      setDel(false); setI(v => (v + 1) % words.length);
    } else {
      t = setTimeout(() => {
        setTxt(full.substring(0, txt.length + (del ? -1 : 1)));
      }, del ? 45 : 95);
    }
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span className="type-line">{txt}<span className="type-caret"></span></span>
  );
}

// B) Pill swap
function PillSwap({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words]);
  return (
    <span className="pill-rot">
      <span className="pw" key={i}>{words[i]}</span>
    </span>
  );
}

// C) Vertical reel
function Reel({ words }) {
  const list = [...words, words[0]];
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setI(v => v + 1), 2400);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (i === words.length) {
      const t = setTimeout(() => { setAnim(false); setI(0); }, 720);
      return () => clearTimeout(t);
    } else if (!anim) {
      const t = setTimeout(() => setAnim(true), 40);
      return () => clearTimeout(t);
    }
  }, [i, anim, words.length]);
  return (
    <span className="reel">
      <span className="reel-track" style={{ transform: `translateY(-${i * 1.04}em)`, transition: anim ? undefined : "none" }}>
        {list.map((w, k) => <span key={k}>{w}</span>)}
      </span>
    </span>
  );
}

// D) Gradient shimmer swap
function GradientWord({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words]);
  return <span className="grad-word" key={i}>{words[i]}</span>;
}

// E) Blur-in swap
function BlurWord({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2300);
    return () => clearInterval(t);
  }, [words]);
  return <span className="blur-word" key={i}>{words[i]}</span>;
}

// F) 3D flip swap
function FlipWord({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words]);
  return <span className="flip-wrap"><span className="flip-word" key={i}>{words[i]}</span></span>;
}

/* ---------- shared art ---------- */
function HeroArt() {
  return (
    <div className="hero-art reveal">
      <div className="hero-art-panel">
        <img src={RES("assets/category-career-advice-2.png")} alt="An expert advising a client over a video conversation" />
      </div>
      <div className="float-card fc-earn">
        <div className="fc-ic" style={{ background: "#e9fbf2", color: "#1faf6b" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round"/></svg>
        </div>
        <div><div className="fc-t">Earned today</div><div className="fc-v">₹4,250</div></div>
      </div>
      <div className="float-card fc-rating">
        <div className="fc-ic" style={{ background: "#fff3ec", color: "#ff7a59" }}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5 20.4l1.4-6.8L1.3 9l6.9-.7z"/></svg>
        </div>
        <div><div className="fc-t">Avg. rating</div><div className="fc-v">4.9 / 5.0</div></div>
      </div>
      <div className="float-card fc-live">
        <span className="dot-live"></span>
        <div className="fc-v" style={{ fontSize: "14px" }}>318 experts online</div>
      </div>
    </div>
  );
}

function TrustRow() {
  const a = [["#1d60fc","AM"],["#1faf6b","PN"],["#ff7a59","RK"],["#7a5cff","SK"]];
  return (
    <div className="hero-trust">
      <div className="avatars">
        {a.map((x,k) => <span key={k} style={{ background: x[0] }}>{x[1]}</span>)}
      </div>
      <div className="hero-trust-txt">
        <div className="stars">★★★★★</div>
        <b>12,000+ experts</b> already earning on YouAsk
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="hero-actions">
      <a href="https://app.youask.in/login" className="btn btn-primary btn-lg">
        Become an expert
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
      <a href="#how" className="btn btn-ghost btn-lg">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        How it works
      </a>
    </div>
  );
}

/* ---------- Hero variants ---------- */
function Hero({ variant }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="kicker reveal">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" style={{color:"var(--blue)"}}><path d="M12 2l2.4 5.3L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.7z"/></svg>
            Turn knowledge into income
          </span>

          {variant === "A" && (
            <h1 className="reveal">Get paid to share<br/>what you <Typewriter words={["know.", "love.", "do best.", "mastered."]} /></h1>
          )}
          {variant === "B" && (
            <h1 className="reveal">Answer questions.<br/>Earn <PillSwap words={["money", "clients", "income", "respect"]} /></h1>
          )}
          {variant === "C" && (
            <h1 className="reveal">Your expertise is<br/>worth <Reel words={["advice.", "answers.", "income.", "impact."]} /></h1>
          )}
          {variant === "D" && (
            <h1 className="reveal">Build income from<br/>your <GradientWord words={["knowledge.", "skills.", "network.", "advice."]} /></h1>
          )}
          {variant === "E" && (
            <h1 className="reveal">Help people.<br/>Get <BlurWord words={["paid.", "booked.", "rated.", "noticed."]} /></h1>
          )}
          {variant === "F" && (
            <h1 className="reveal">Turn what you know<br/>into <FlipWord words={["income.", "impact.", "clients.", "growth."]} /></h1>
          )}

          <p className="lead reveal">YouAsk connects curious people with verified experts for real, paid conversations. Open your slots, answer questions and build an income from what you already know.</p>
          <div className="reveal"><Actions /></div>
          <div className="reveal"><TrustRow /></div>
        </div>
        <HeroArt />
      </div>
    </header>
  );
}

window.Hero = Hero;
