/* YouAsk Explainer — Stage composition & timeline */
(function () {
  const E = window.EB;
  const S = window.EScreens;
  const { Stage, Sprite, useTime, useSprite, interpolate, Easing, clamp } = window;
  const { BLUE, BLUE300, INK, INK2, GREEN, AMBER, VIOLET, FONT, SOFT } = E;

  /* scene windows */
  const SC = {
    stuck:  [0.0, 4.0],
    ask:    [4.0, 8.5],
    match:  [8.5, 13.5],
    book:   [13.5, 18.5],
    call:   [18.5, 24.0],
    solved: [24.0, 27.5],
    earn:   [27.5, 31.0],
    outro:  [31.0, 34.5],
  };
  const DUR = 34.5;

  /* cursor for the Match scene */
  function MatchCursor({ localTime }) {
    const x = interpolate([0, 1.0, 2.2, 2.7, 5], [232, 232, 178, 178, 178], Easing.easeInOutCubic)(localTime);
    const y = interpolate([0, 1.0, 2.2, 2.7, 5], [520, 520, 196, 196, 196], Easing.easeInOutCubic)(localTime);
    const pressed = localTime > 2.4 && localTime < 2.75;
    return <E.Cursor x={x} y={y} pressed={pressed} />;
  }
  /* cursor for the Book scene */
  function BookCursor({ localTime }) {
    const x = interpolate([0, 0.8, 1.5, 1.8, 2.6, 2.95, 5], [232, 232, 198, 198, 160, 141, 141], Easing.easeInOutCubic)(localTime);
    const y = interpolate([0, 0.8, 1.5, 1.8, 2.6, 2.95, 5], [520, 520, 246, 246, 430, 542, 542], Easing.easeInOutCubic)(localTime);
    const pressed = (localTime > 1.5 && localTime < 1.8) || (localTime > 2.95 && localTime < 3.25);
    return <E.Cursor x={x} y={y} pressed={pressed} />;
  }

  /* persistent phone — fades out for the outro */
  function PhoneStack() {
    const t = useTime();
    const float = Math.sin(t * 1.15) * 6;
    const fade = interpolate([31.0, 31.55], [1, 0], Easing.easeInCubic)(t);
    if (fade <= 0.01) return null;
    return (
      <div style={{ opacity: fade, transform: `scale(${0.96 + 0.04 * fade})`, transformOrigin: "50% 60%" }}>
        {/* floor shadow */}
        <div style={{ position: "absolute", left: 196, top: 660 + float * 0.3, width: 216, height: 26, borderRadius: "50%", background: "rgba(14,23,51,.18)", filter: "blur(14px)" }} />
        <E.Phone x={150} y={48} float={float}>
          <Sprite start={SC.stuck[0]} end={SC.stuck[1]}>{() => <S.ScreenStuck />}</Sprite>
          <Sprite start={SC.ask[0]} end={SC.ask[1]}>{() => <S.ScreenAsk />}</Sprite>
          <Sprite start={SC.match[0]} end={SC.match[1]}>{({ localTime }) => <S.ScreenMatch cursor={<MatchCursor localTime={localTime} />} />}</Sprite>
          <Sprite start={SC.book[0]} end={SC.book[1]}>{({ localTime }) => <S.ScreenBook cursor={<BookCursor localTime={localTime} />} />}</Sprite>
          <Sprite start={SC.call[0]} end={SC.call[1]}>{() => <S.ScreenCall />}</Sprite>
          <Sprite start={SC.solved[0]} end={SC.solved[1]}>{() => <S.ScreenSolved />}</Sprite>
          <Sprite start={SC.earn[0]} end={SC.earn[1]}>{() => <S.ScreenEarn />}</Sprite>
        </E.Phone>
      </div>
    );
  }

  /* captions per scene */
  function Captions() {
    return (
      <React.Fragment>
        <Sprite start={SC.stuck[0]} end={SC.stuck[1]}>
          <E.Caption step={1} kicker="The problem" title={"Stuck on\nsomething?"} sub="A question you can't crack alone — an interview, your resume, a tricky decision." accent={BLUE} />
        </Sprite>
        <Sprite start={SC.ask[0]} end={SC.ask[1]}>
          <E.Caption step={2} kicker="Ask" title={"Just ask\nanything."} sub="Describe your problem in plain words. No forms, no waiting rooms." accent={BLUE} />
        </Sprite>
        <Sprite start={SC.match[0]} end={SC.match[1]}>
          <E.Caption step={3} kicker="Match" title={"Meet a verified\nexpert."} sub="We instantly match you with rated, identity-checked experts who know your topic." accent={VIOLET} />
        </Sprite>
        <Sprite start={SC.book[0]} end={SC.book[1]}>
          <E.Caption step={4} kicker="Book" title={"Pick a time\nthat works."} sub="Choose a slot in seconds. Pay securely — funds are only released after the session." accent={BLUE} />
        </Sprite>
        <Sprite start={SC.call[0]} end={SC.call[1]}>
          <E.Caption step={5} kicker="Connect" title={"Talk it through,\n1-on-1."} sub="Meet live over video call and get real, personal guidance — not generic answers." accent={GREEN} />
        </Sprite>
        <Sprite start={SC.solved[0]} end={SC.solved[1]}>
          <E.Caption step={6} kicker="Resolved" title={"Problem\nsolved."} sub="Walk away with a clear answer and a plan. Rate your expert in a tap." accent={GREEN} />
        </Sprite>
        <Sprite start={SC.earn[0]} end={SC.earn[1]}>
          <E.Caption step={6} kicker="And experts earn" title={"Knowledge,\nrewarded."} sub="Every session pays the expert who helped — turning what they know into income." accent={AMBER} />
        </Sprite>
      </React.Fragment>
    );
  }

  /* brand watermark top-left (persists over scenes, hides on outro) */
  function Watermark() {
    const t = useTime();
    if (t >= 31) return null;
    return (
      <div style={{ position: "absolute", left: 56, top: 50, display: "flex", alignItems: "center", opacity: 0.95 }}>
        <E.Wordmark height={30} />
      </div>
    );
  }

  /* outro */
  function Outro() {
    const { localTime } = useSprite();
    const logoE = E.entry(localTime - 0.1, { dur: 0.7, from: 0.5, ease: Easing.easeOutBack });
    const tagE = E.entry(localTime - 0.5, { dur: 0.6, rise: 22 });
    const flow = ["Ask", "Connect", "Resolve", "Earn"];
    return (
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1342be 0%,#1d60fc 50%,#3f7bff 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", background: "rgba(255,255,255,.08)", top: -160, right: -120 }} />
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.07)", bottom: -180, left: -90 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: logoE.o, transform: `scale(${logoE.s})` }}>
            <div style={{ background: "#fff", borderRadius: 26, padding: "22px 40px", boxShadow: "0 24px 60px rgba(8,18,54,.32)" }}>
              <E.Wordmark height={76} />
            </div>
          </div>
          <div style={{ opacity: tagE.o, transform: `translateY(${tagE.ty}px)`, fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,.92)", marginTop: 22 }}>
            Turn your knowledge into income.
          </div>
          <div style={{ opacity: tagE.o, display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
            {flow.map((f, i) => (
              <React.Fragment key={f}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,.16)", padding: "9px 18px", borderRadius: 100, border: "1px solid rgba(255,255,255,.25)" }}>{f}</span>
                {i < flow.length - 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* per-second screen label for commenting */
  function SecondLabel() {
    const t = useTime();
    const ref = React.useRef(null);
    const sec = Math.floor(t);
    React.useEffect(() => { if (ref.current) ref.current.setAttribute("data-screen-label", "t=" + sec + "s"); }, [sec]);
    return <div ref={ref} data-screen-label="t=0s" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
  }

  function Video() {
    const embed = new URLSearchParams(location.search).has("embed");
    return (
      <Stage width={1280} height={720} duration={DUR} background="#f2f6ff"
        persistKey="youask-explainer" chrome={!embed} letterbox={embed ? "#f2f6ff" : "#0a0a0a"}>
        <SecondLabel />
        <E.BlobField />
        <Watermark />
        <PhoneStack />
        <Captions />
        <Sprite start={SC.outro[0]} end={SC.outro[1]}>{() => <Outro />}</Sprite>
      </Stage>
    );
  }

  ReactDOM.createRoot(document.getElementById("video-root")).render(<Video />);
})();
