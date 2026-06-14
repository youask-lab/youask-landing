/* YouAsk — sections part A: Categories, How it works, Featured experts */

function SectHead({ eyebrow, title, lead }) {
  return (
    <div className="sect-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-sect" style={{ marginTop: 14 }}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

function Categories() {
  const cats = window.YA.categories;
  return (
    <section className="section" id="categories">
      <div className="wrap">
        <SectHead
          eyebrow="Explore expertise"
          title="Whatever you need, an expert knows it"
          lead="Browse the topics people ask about most — or list yourself under the ones you can answer."
        />
        <div className="cat-grid">
          {cats.map((c, i) => (
            <div className="cat-card reveal" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="cat-thumb"><img src={RES(c.img)} alt={c.title} className={/\.gif(\?|$)/i.test(c.img) ? "fill" : ""} /></div>
              <div className="cat-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <a className="cat-link" href="https://app.youask.in/login" style={{ color: c.color }}>
                  Find an expert
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = window.YA.steps;
  return (
    <section className="section how" id="how">
      <div className="wrap">
        <SectHead
          eyebrow="From sign-up to payout"
          title="Start earning in four simple steps"
          lead="No upfront cost, no minimum hours. Set things up once and let the questions come to you."
        />
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="step-no">{i + 1}</span>
              <img className="step-gif" src={RES(s.gif)} alt={s.title} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured experts — live from the public search API ---------- */
const YA_SEARCH_API = "https://api.youask.in/api/search/open";
const EXP_COLORS = ["#1d60fc", "#1faf6b", "#ff7a59", "#7a5cff", "#0ea5b7", "#e0457b"];

function expColor(seed) {
  const s = typeof seed === "number" ? seed
    : String(seed || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return EXP_COLORS[Math.abs(s) % EXP_COLORS.length];
}
function expInitials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "YA";
  return ((parts[0][0] || "") + (parts[1] ? parts[1][0] : "")).toUpperCase();
}
function catLabel(cat) {
  if (!cat) return "Service";
  return String(cat).toLowerCase().replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
function mapService(it) {
  const u = it.users || {};
  return {
    id: it.id,
    name: (u.name || "YouAsk Expert").trim(),
    pic: u.profile_picture || null,
    role: (u.designation || (it.designation && it.designation.name) || (it.company && it.company.name) || catLabel(it.service_category)),
    title: (it.title || catLabel(it.service_category)).trim(),
    cat: catLabel(it.service_category),
    skills: (it.service_skills || []).map(s => s.skill && s.skill.name).filter(Boolean),
    amount: it.amount,
    duration: it.duration,
    rating: Number(it.rating) || 0,
    exp: it.experience_years ? Math.round(it.experience_years) : null,
  };
}

function ServiceCard({ s, i }) {
  const [imgOk, setImgOk] = useState(Boolean(s.pic));
  const tags = s.skills.slice(0, 3);
  const extra = s.skills.length - tags.length;
  const showImg = s.pic && imgOk;
  return (
    <div className="exp-card appear" style={{ animationDelay: `${(i % 3) * 80}ms` }}>
      <div className="exp-top">
        <div className="exp-av" style={{ background: showImg ? "var(--soft)" : expColor(s.id || s.name) }}>
          {showImg
            ? <img src={s.pic} alt={s.name} loading="lazy" onError={() => setImgOk(false)} />
            : expInitials(s.name)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="exp-name">{s.name}</div>
          <div className="exp-role">{s.role}</div>
        </div>
      </div>
      <div className="exp-service">
        <span className="exp-cat">{s.cat}</span>
        <h4 className="exp-service-title" title={s.title}>{s.title}</h4>
      </div>
      <div className="exp-tags">
        {tags.map((t, k) => <span className="tag" key={k}>{t}</span>)}
        {extra > 0 && <span className="tag">+{extra}</span>}
      </div>
      <div className="exp-foot">
        <div className="exp-rate"><b>{s.amount ? "₹" + Number(s.amount).toLocaleString("en-IN") : "Free"}</b> <span>{s.duration ? `/ ${s.duration} min` : ""}</span></div>
        <div className="exp-rev">
          {s.rating > 0
            ? <React.Fragment><span className="stars" style={{ fontSize: 13 }}>★</span> <b>{s.rating.toFixed(1)}</b></React.Fragment>
            : (s.exp ? <React.Fragment><b>{s.exp}</b>+ yrs exp</React.Fragment> : <b>New</b>)}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="exp-card sk">
      <div className="exp-top">
        <span className="sk-box" style={{ width: 56, height: 56, borderRadius: 16 }}></span>
        <div style={{ flex: 1 }}>
          <span className="sk-line" style={{ width: "60%" }}></span>
          <span className="sk-line" style={{ width: "40%", marginTop: 9 }}></span>
        </div>
      </div>
      <span className="sk-line" style={{ width: "85%", height: 15, marginTop: 20 }}></span>
      <div className="exp-tags">
        <span className="sk-line" style={{ width: 64, height: 24, borderRadius: 100 }}></span>
        <span className="sk-line" style={{ width: 52, height: 24, borderRadius: 100 }}></span>
      </div>
      <div className="exp-foot"><span className="sk-line" style={{ width: 82 }}></span><span className="sk-line" style={{ width: 58 }}></span></div>
    </div>
  );
}

function FallbackCard({ e }) {
  return (
    <div className="exp-card">
      <div className="exp-top">
        <div className="exp-av" style={{ background: e.color }}>{e.initials}{e.online && <span className="on"></span>}</div>
        <div><div className="exp-name">{e.name}</div><div className="exp-role">{e.role}</div></div>
      </div>
      <div className="exp-tags">{e.tags.map((t, k) => <span className="tag" key={k}>{t}</span>)}</div>
      <div className="exp-foot">
        <div className="exp-rate"><b>{e.rate}</b> <span>{e.unit}</span></div>
        <div className="exp-rev"><span className="stars" style={{ fontSize: 13 }}>★</span> <b>{e.rating}</b> · {e.reviews} reviews</div>
      </div>
    </div>
  );
}

function FeaturedExperts() {
  const [items, setItems] = useState(null);   // null = loading
  const [total, setTotal] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(YA_SEARCH_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { limit: 6 } }),
    })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(json => {
        if (!alive) return;
        const resp = (json && json.response) || {};
        const list = Array.isArray(resp.items) ? resp.items.map(mapService) : [];
        setItems(list);
        setTotal(typeof resp.total_results === "number" ? resp.total_results : list.length);
      })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, []);

  const count = total != null ? Number(total).toLocaleString("en-IN") : null;

  let cards;
  if (failed) {
    cards = window.YA.experts.map((e, i) => <FallbackCard e={e} key={i} />);
  } else if (items === null) {
    cards = Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />);
  } else if (items.length) {
    cards = items.slice(0, 6).map((s, i) => <ServiceCard s={s} i={i} key={s.id} />);
  } else {
    cards = <p className="muted" style={{ gridColumn: "1 / -1", textAlign: "center" }}>No services available right now.</p>;
  }

  return (
    <section className="section" id="experts">
      <div className="wrap">
        <SectHead
          eyebrow="Meet the experts"
          title="Real people, verified and rated"
          lead="Every expert is identity-checked and rated by the people they've helped. Here are a few earning on YouAsk right now."
        />
        <div className="exp-grid">{cards}</div>
        <div className="center reveal" style={{ marginTop: 44 }}>
          <a href="https://app.youask.in/search/open" className="btn btn-ghost btn-lg">
            {count ? `Browse all services` : "Browse all services"}
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectHead, Categories, HowItWorks, FeaturedExperts, HowVideo });

function HowVideo() {
  return (
    <section className="section" id="watch" style={{ background: "#fff" }}>
      <div className="wrap">
        <SectHead
          eyebrow="See it in action"
          title="From stuck to solved, in minutes"
          lead="Watch how a question becomes a real answer on YouAsk — and how every session pays the expert who helped."
        />
        <div className="video-frame reveal">
          <div className="video-bar">
            <span className="vd r"></span><span className="vd y"></span><span className="vd g"></span>
            <span className="video-url">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ opacity: .6 }}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round"/></svg>
              youask.in/how-it-works
            </span>
          </div>
          <div className="video-stage">
            <iframe className="video-iframe" src="how-it-works.html?embed=1" title="How YouAsk works" loading="lazy" scrolling="no"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
