/* YouAsk — Nav + Footer chrome */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo"><img src={RES("assets/youAsk.png")} alt="YouAsk" /></a>
        <div className="nav-links">
          <a href="#categories">Categories</a>
          <a href="#how">How it works</a>
          <a href="company.html">Company</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div className="nav-cta">
          <a href="https://app.youask.in/login" className="nav-login">Log in</a>
          <a href="https://app.youask.in/register" className="btn btn-primary">Get started</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const social = window.YA.social;
  const cols = [
    { h: "Product", links: [["Categories", "#categories"], ["How it works", "#how"], ["Experts", "#experts"]] },
    { h: "Company", links: [["About YouAsk", "company.html#about"], ["Contact", "company.html#contact"], ["FAQ", "faq.html"], ["Policies", "policy.html"]] },
    { h: "Support", links: [["Help center", "faq.html"], ["Privacy Policy", "policy.html#privacy"], ["Cookie Policy", "policy.html#cookies"], ["Terms of Service", "policy.html#terms"]] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <span style={{ display: "inline-block", background: "#fff", borderRadius: 12, padding: "8px 14px" }}>
              <img className="foot-logo" style={{ marginBottom: 0 }} src={RES("assets/youAsk.png")} alt="YouAsk" />
            </span>
            <p style={{ marginTop: 18 }}>Making knowledge accessible, conversations meaningful and expert advice easy to reach. Ask anything — or earn from what you know.</p>
            <div className="foot-soc">
              {social.map((s, i) => (
                <a href={s.url} key={i} aria-label={s.label} title={s.label}
                  {...(s.url && s.url !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <img src={RES(s.img)} alt={s.label} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div className="foot-col" key={i}>
              <h4>{c.h}</h4>
              {c.links.map((l, k) => <a href={l[1]} key={k}>{l[0]}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-bot">
          <span>© 2025 Asktek Innovation and Solution Private Limited · Jaipur, India</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 480);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      className={"to-top" + (show ? " show" : "")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top" title="Back to top"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}

Object.assign(window, { Nav, Footer, BackToTop });
