/* YouAsk — content data. Exposed as window.YA */
/* Resource resolver: returns inlined blob URL when bundled (standalone),
   otherwise the original relative path. Keyed by the path itself. */
window.RES = function (p) { return (window.__resources && window.__resources[p]) || p; };
window.YA = {
  categories: [
    { title: "Career Advice", desc: "1:1 guidance on growth, switching tracks and landing the next role.", img: "assets/category-career-advice-2.png", color: "#1d60fc" },
    { title: "Resume Review", desc: "Get a recruiter-grade teardown and rewrite of your CV in 48 hours.", img: "assets/category-resume-review.png", color: "#1faf6b" },
    { title: "Tech Experts", desc: "Debug, architect and code-review with senior engineers, live.", img: "assets/category-tech-expert.png", color: "#7a5cff" },
    { title: "Interview Prep", desc: "Mock interviews and feedback from people who do the hirings ss.", img: "assets/interview.svg", color: "#ff7a59" },
  ],

  steps: [
    { gif: "assets/Timeline.gif", title: "Create your profile", desc: "Show your expertise, set your topics and tell people how you can help." },
    { gif: "assets/Time Slot.gif", title: "Set your time slots", desc: "Open the hours that work for you. Async questions or live calls — your call." },
    { gif: "assets/interview.svg", title: "Answer & advise", desc: "Connect over video call and give people the answers they came for." },
    { gif: "assets/Earn.gif", title: "Get paid", desc: "Earn for every session and withdraw your balance whenever you like." },
  ],

  experts: [
    { name: "Aarav Mehta", role: "Senior SWE · ex-Razorpay", initials: "AM", color: "#1d60fc", online: true, tags: ["System Design", "Backend", "Interviews"], rate: "₹1,200", unit: "/ 30 min", rating: "4.9", reviews: 214 },
    { name: "Priya Nair", role: "Career Coach · 10 yrs", initials: "PN", color: "#1faf6b", online: true, tags: ["Career Switch", "LinkedIn", "Salary"], rate: "₹900", unit: "/ 30 min", rating: "5.0", reviews: 168 },
    { name: "Rohan Kapoor", role: "Tech Recruiter · FAANG", initials: "RK", color: "#ff7a59", online: false, tags: ["Resume", "ATS", "Mock Interview"], rate: "₹750", unit: "/ review", rating: "4.8", reviews: 302 },
    { name: "Sara Khan", role: "Product Manager · ex-Swiggy", initials: "SK", color: "#7a5cff", online: true, tags: ["PM Interviews", "Roadmaps", "Metrics"], rate: "₹1,500", unit: "/ 45 min", rating: "4.9", reviews: 121 },
    { name: "Vikram Rao", role: "Data Scientist · PhD", initials: "VR", color: "#0ea5b7", online: false, tags: ["ML", "SQL", "Portfolio"], rate: "₹1,100", unit: "/ 30 min", rating: "4.7", reviews: 96 },
    { name: "Ananya Iyer", role: "UX Lead · Design mentor", initials: "AI", color: "#e0457b", online: true, tags: ["Portfolio", "UX Critique", "Hiring"], rate: "₹950", unit: "/ 30 min", rating: "5.0", reviews: 143 },
  ],

  stats: [
    // { num: "12k+",  lab: "Verified experts" },
    // { num: "480k",  lab: "Questions answered" },
    // { num: "4.9★",  lab: "Average rating" },
    // { num: "₹3.2Cr", lab: "Paid out to experts" },
  ],

  testimonials: [
    { q: "I answer questions for two hours after work and it now covers my rent. YouAsk made my side-knowledge an actual income.", name: "Karan D.", role: "Backend Engineer", initials: "KD", color: "#1d60fc", stars: 5 },
    { q: "Booked a resume review on a Sunday and had three interviews lined up by Friday. The expert knew exactly what recruiters scan for.", name: "Meera S.", role: "Marketing Grad", initials: "MS", color: "#1faf6b", stars: 5 },
    { q: "As a coach, the scheduling and payouts just work. I focus on the conversation, YouAsk handles everything else.", name: "Imran H.", role: "Career Coach", initials: "IH", color: "#ff7a59", stars: 5 },
  ],

  pricing: [
    { name: "Ask", desc: "For anyone with a question that needs a real answer.", amt: "Free", per: "", popular: false, cta: "Start asking", feats: ["Browse all experts", "Pay per session, no lock-in", "Chat & video sessions", "Secure payments"] },
    { name: "Expert", desc: "For professionals turning knowledge into income.", amt: "₹0", per: "/mo to join", popular: true, cta: "Become an expert", feats: ["Keep 85% of every session", "Set your own rates & hours", "Profile & timeline page", "Weekly automatic payouts", "Priority in search"] },
    { name: "Business", desc: "For teams hiring expertise on demand.", amt: "Custom", per: "", popular: false, cta: "Talk to sales", feats: ["Pooled team credits", "Vetted expert shortlists", "Invoicing & GST billing", "Dedicated success manager"] },
  ],

  faqs: [
    { q: "What is YouAsk?", a: "YouAsk is a powerful tool that allows you to connect with your company or technical experts through personalized 1:1 sessions, enabling you to share your expertise and maximize the value of your time. Simply add your services, set your availability, and define your charges. Once your link is ready, share it with your followers, who can easily book a call to connect with you directly." },
    { q: "Is using YouAsk free?", a: "Yes! Our platform is free to use. We only charge a small 7% commission on your earnings, ensuring we grow together with your success." },
    { q: "How far in advance do I need to book a session?", a: "Bookings must be made at least 6 hours before the session start time. You can schedule sessions up to 7 days in advance." },
    { q: "What happens if I try to book a session less than 6 hours before the start time?", a: "Sessions will no longer be available for booking if there are less than 6 hours remaining before the scheduled start time." },
    { q: "When can I join the session?", a: "You can join the session up to 5 minutes before the scheduled start time." },
    { q: "What if I can't attend my scheduled session?", a: "If you are unable to attend or need to leave early, the host is required to wait for a minimum of 10 minutes before ending the session or until the remaining session time expires, whichever comes first." },
    { q: "What should I do if the host is unable to join the session?", a: "If the host does not join or leaves during the session, you should wait for at least 10 minutes before leaving." },
    { q: "What types of services can I create or book?", a: "YouAsk offers a wide range of professional services, including IT, marketing, accounting, teaching, and many more. You can both provide and book services to enhance your skills and earnings." },
    { q: "How much can I charge for my sessions?", a: "The pricing of your sessions is entirely up to you. You can choose to offer your services for free or set a specific rate based on the value you provide." },
    { q: "Can I offer services in multiple categories?", a: "Yes! You can list multiple services across various categories based on your expertise, allowing you to reach a broader audience." },
    { q: "Is there a review or rating system for service providers?", a: "Yes, after each completed session, users can leave reviews and ratings to maintain service quality and improve the overall experience." },
    { q: "Can I cancel my booking?", a: "Yes, you may cancel your booking up to 12 hours before the scheduled session start time and receive a 90% refund. Cancellations made within 12 hours of the session are non-refundable." },
    { q: "What if the host cancels the session?", a: "If the host cancels the session at least 2 hours before the scheduled start time, the user will receive a full refund." },
    { q: "What happens if neither the host nor the user attends the session?", a: "If both the host and the user fail to attend, the full amount will be refunded to the user's account." },
    { q: "What if I am dissatisfied with the service?", a: "If you are dissatisfied with a session, you can raise a dispute within 24 hours. Our internal team will review the case and determine if a refund is warranted." },
    { q: "Can I get a refund if I end the session early due to an issue?", a: "If you leave a session early due to an issue and raise a dispute within 24 hours, our team will review the case. You may receive a partial refund of up to 50%, or a higher amount depending on the circumstances." },
    { q: "What if there are technical issues during the session?", a: "If technical issues, network problems, power failures, or hardware malfunctions occur on the host's end, you can raise a dispute within 24 hours. If the claim is valid, a partial refund may be issued." },
    { q: "How long does it take to process refunds?", a: "Refunds are processed within 2 working days after our internal review is completed." },
    { q: "What happens after a service is successfully completed?", a: "Once the service is completed, the payment will be transferred to the host's account within 2 working days." },
  ],

  social: [
    { img: "assets/share-linkedin.png", label: "LinkedIn", url: "https://www.linkedin.com/company/youask" },
    { img: "assets/share-insta.png", label: "Instagram", url: "https://www.instagram.com/youask.in" },
    { img: "assets/share-reddit.png", label: "Reddit", url: "https://www.reddit.com/r/youask_in" },
  ],
};
