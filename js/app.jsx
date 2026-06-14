/* YouAsk — app: assembles page, scroll reveal */

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function App() {
  const [variant, setVariant] = useState(() => localStorage.getItem("ya-hero") || "A");
  useEffect(() => { localStorage.setItem("ya-hero", variant); }, [variant]);
  useReveal(variant);

  return (
    <React.Fragment>
      <Nav />
      <Hero variant={variant} />
      <Categories />
      <HowItWorks />
      <HowVideo />
      <FeaturedExperts />
      <BecomeExpert />
      {/* <Stats /> */}
      {/* <Testimonials /> */}
      <FAQ />
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
