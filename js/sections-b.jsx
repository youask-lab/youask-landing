/* YouAsk — sections part B: Earn, Stats, Testimonials, Pricing, FAQ, CTA */

const Check = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12.5l4.5 4.5L19 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

function BecomeExpert() {
  const points = [
    ["Keep 85% of everything you earn", "The lowest platform fee in the category. What you charge is what you keep."],
    ["You're in full control", "Set your rates, pick your topics and open only the time slots you want."],
    ["Weekly automatic payouts", "Earnings land in your bank or UPI every week — no invoicing, no chasing."],
  ];
  return (
    <section className="section earn" id="earn">
      <div className="wrap earn-grid">
        <div className="reveal">
          <span className="eyebrow on-blue">For experts</span>
          <h2 style={{ marginTop: 14 }}>Your knowledge already has value. Start charging for it.</h2>
          <p className="lead">Thousands of professionals use YouAsk as a flexible second income — answering questions in the gaps of their week.</p>
          <div className="earn-list">
            {points.map((p, i) => (
              <div className="earn-li" key={i}>
                <span className="ck"><Check /></span>
                <span><b>{p[0]}.</b> {p[1]}</span>
              </div>
            ))}
          </div>
          <a href="https://app.youask.in/login" className="btn btn-white btn-lg">Become an expert — it's free</a>
        </div>
        <div className="earn-art reveal">
          <img src={RES("assets/Earn.gif")} alt="An expert attracting clients and rewards" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = window.YA.stats;
  return (
    <section className="stats-band">
      <div className="wrap section" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat reveal" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="num">{s.num}</div>
              <div className="lab">{s.lab}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = window.YA.testimonials;
  return (
    <section className="section" id="stories">
      <div className="wrap">
        <SectHead eyebrow="Loved by both sides" title="Stories from the YouAsk community" />
        <div className="tst-grid">
          {t.map((x, i) => (
            <div className="tst reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="stars">{"★".repeat(x.stars)}</div>
              <p className="q">"{x.q}"</p>
              <div className="tst-by">
                <div className="tst-av" style={{ background: x.color }}>{x.initials}</div>
                <div><div className="n">{x.name}</div><div className="r">{x.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = window.YA.pricing;
  return (
    <section className="section how" id="pricing">
      <div className="wrap">
        <SectHead
          eyebrow="Simple, fair pricing"
          title="Free to ask. Free to earn."
          lead="No subscriptions to start. You only ever pay for the sessions you book — and experts only ever share a small fee."
        />
        <div className="price-grid">
          {plans.map((p, i) => (
            <div className={"price reveal" + (p.popular ? " pop" : "")} key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{p.name}</h3>
              <p className="desc">{p.desc}</p>
              <div className="amt"><b>{p.amt}</b> <span>{p.per}</span></div>
              <ul>
                {p.feats.map((f, k) => <li key={k}><span className="ck"><Check /></span>{f}</li>)}
              </ul>
              <a href="#top" className={"btn btn-lg " + (p.popular ? "btn-primary" : "btn-ghost") + " btn-block"}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = window.YA.faqs.slice(0, 5);
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <SectHead eyebrow="Good to know" title="Questions, answered" />
        <div className="faq-wrap">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={"faq-item reveal" + (isOpen ? " open" : "")} key={i}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}
                  <span className="faq-ic">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
                  </span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? "480px" : "0" }}>
                  <div className="faq-a-in">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <h2>Start earning with YouAsk today</h2>
          <p>Create your expert profile in minutes. It's free to join, and your first payout could be this week.</p>
          <div className="hero-actions">
            <a href="https://app.youask.in/login" className="btn btn-white btn-lg">Become an expert</a>
            <a href="#categories" className="btn btn-light btn-lg">Ask a question</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BecomeExpert, Stats, Testimonials, Pricing, FAQ, CTABand });
