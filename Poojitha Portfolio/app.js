const {
  useState,
  useEffect,
  useRef
} = React;

/* ---------- data pulled from resume ---------- */
const PROFILE = {
  name: "Sri Sai Poojitha Palepu",
  title: "Backend Engineer Â· AI/ML Researcher Â· Cybersecurity Practitioner",
  location: "Rajahmundry, Andhra Pradesh, India",
  email: "saipoojitha.palepu@gmail.com",
  phone: "+91 76599 40342",
  github: "github.com/Darkside098",
  linkedin: "linkedin.com/in/sri-sai-poojitha-palepu-015529304"
};
const NAV_ITEMS = ["journey", "impact", "expertise", "experience", "projects", "certifications", "contact"];
const TIMELINE = [{
  path: "~/experience/jobiak",
  title: "Back-End Internship",
  org: "Jobiak Software Pvt Ltd, Visakhapatnam",
  meta: "Dec 2025 â€“ Mar 2026"
}, {
  path: "~/education/mca",
  title: "Master of Computer Applications",
  org: "Vignan's Institute of Information Technology Â· CGPA 8.00",
  meta: "2024 â€“ 2026"
}, {
  path: "~/research/gccmiea-2025",
  title: "Presented research at GCCMIEA-2025",
  org: "Thammasat University, Bangkok, Thailand",
  meta: "2025"
}, {
  path: "~/education/bsc",
  title: "B.Sc. Computer Science",
  org: "Aditya Degree College for Women Â· CGPA 8.38",
  meta: "2021 â€“ 2024"
}, {
  path: "~/education/intermediate",
  title: "Board of Intermediate Education",
  org: "Sri Chaitanya Junior College Â· 77.9%",
  meta: "2019 â€“ 2021"
}];
const STATS = [{
  num: "10+",
  label: "certifications Â· AWS / Cisco / NPTEL / Palo Alto"
}, {
  num: "01",
  label: "international research paper, GCCMIEA-2025"
}, {
  num: "6%",
  label: "Turnitin similarity Â· 0% AI detection"
}, {
  num: "03",
  label: "end-to-end applied projects shipped"
}];
const EXPERTISE = [{
  title: "Backend & Systems",
  desc: "Designing REST APIs and data layers that hold up under real traffic, from auth to schema design.",
  tags: ["Node.js", "Express.js", "MongoDB Â· Mongoose", "JWT Auth", "Multer", "REST APIs", "Git & GitHub", "Postman"]
}, {
  title: "AI/ML & Signal Processing",
  desc: "Turning raw audio and visual signal into features a model can reason about â€” the core of my published research.",
  tags: ["Python", "OpenCV", "MediaPipe", "Librosa", "Scikit-learn", "TensorFlow", "PyTorch", "NumPy Â· Pandas"]
}, {
  title: "Cybersecurity & Networks",
  desc: "Grounded in network fundamentals and hands-on security programs from Cisco and Palo Alto.",
  tags: ["NPTEL Cyber Security (IIT Madras)", "Palo Alto AICTE-EduSkills", "Cisco CCNA", "Cisco Cybersecurity Essentials", "TCP/IP Â· DNS Â· HTTP(S)"]
}];
const PROJECTS = [{
  featured: true,
  tag: "Published Research",
  title: "Dysarthria (Speech Impairment) Movement Monitor",
  desc: "An AI-powered system that fuses real-time facial-landmark and acoustic signal data to monitor dysarthria severity, with a live Tkinter dashboard so clinicians can track speech patterns without specialised hardware. Presented at the GCCMIEA-2025 International Conference, Thammasat University.",
  stack: ["Python", "OpenCV", "MediaPipe", "Librosa", "NumPy", "Pandas"]
}, {
  tag: "Full-Stack Â· AI",
  title: "AI-Based Customer Support & Intelligent Ticket Routing",
  desc: "A MERN platform with JWT-secured REST APIs, role-based access, and automated ticket categorization that cut manual triage effort by roughly 30%.",
  stack: ["Python", "Node.js", "Express.js", "MongoDB", "NLP", "REST APIs"]
}, {
  tag: "IoT Â· Data",
  title: "Real-Time Environmental Condition Monitoring",
  desc: "An end-to-end pipeline â€” NodeMCU sensors to a Wi-Fi-enabled dashboard â€” for live environmental data collection, transmission, and visualization.",
  stack: ["NodeMCU", "IoT Sensors", "Python", "Data Analytics"]
}];
const CERTS = [{
  name: "Cyber Security and Privacy",
  org: "NPTEL â€” IIT Madras"
}, {
  name: "Palo Alto Cybersecurity Virtual Internship",
  org: "AICTE EduSkills"
}, {
  name: "Cisco CCNA: Switching, Routing & Wireless",
  org: "Cisco Networking Academy"
}, {
  name: "Cisco Cybersecurity Essentials",
  org: "Cisco Networking Academy"
}, {
  name: "AWS Machine Learning Foundations",
  org: "AWS"
}, {
  name: "AWS Generative AI Foundations",
  org: "AWS"
}, {
  name: "Samsung Innovation Campus â€” AI",
  org: "Samsung"
}, {
  name: "Python Essentials 1 & 2",
  org: "Cisco Networking Academy"
}, {
  name: "Node.js, Express.js & MongoDB",
  org: "Jobiak Software Internship Certificate"
}];

/* ---------- small components ---------- */

function Reveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.unobserve(el);
      }
    }, {
      threshold: 0.15
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: `reveal ${visible ? "in-view" : ""} ${className}`,
    ...rest
  }, children);
}
function Magnetic({
  children,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: className,
    ...rest,
    style: {
      display: "inline-block"
    }
  }, children);
}
function Waveform() {
  return /*#__PURE__*/React.createElement("div", {
    className: "waveform-wrap",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1200 160",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    className: "wave-path",
    d: "M0,90 C 60,40 120,140 180,90 C 240,40 300,140 360,90 C 420,40 480,140 540,90 C 600,40 660,140 720,90 C 780,40 840,140 900,90 C 960,40 1020,140 1080,90 C 1120,60 1160,110 1200,90"
  }), /*#__PURE__*/React.createElement("path", {
    className: "wave-path amber",
    d: "M0,120 C 80,100 160,140 240,120 C 320,100 400,140 480,120 C 560,100 640,140 720,120 C 800,100 880,140 960,120 C 1040,100 1120,140 1200,120"
  })));
}

/* icons (inline svg, no external deps) */
const Icon = {
  mail: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7l9 6 9-6"
  })),
  phone: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z"
  })),
  pin: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "2.5"
  })),
  github: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.7 1.7.2 3 .1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.6-2.7 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"
  })),
  linkedin: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.7 2.5 4.7 5.8V21h-4v-5.6c0-1.3 0-3-1.85-3s-2.14 1.4-2.14 2.9V21H9z"
  })),
  sun: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
  })),
  moon: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"
  })),
  arrow: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  cube: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l8 4.5v9L12 21l-8-4.5v-9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 7.5L12 12l8-4.5M12 12v9"
  })),
  brain: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.8V15a3 3 0 0 0 3 3h1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.8V15a3 3 0 0 1-3 3h-1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 4v16M15 4v16"
  })),
  shield: p => /*#__PURE__*/React.createElement("svg", {
    ...p,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l7 3v6c0 5-3.4 7.7-7 9-3.6-1.3-7-4-7-9V6z"
  }))
};
function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("journey");
  const [glow, setGlow] = useState({
    x: -500,
    y: -500,
    opacity: 0
  });
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      setProgress(pct);
      let current = NAV_ITEMS[0];
      for (const id of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onMove = e => setGlow({
      x: e.clientX,
      y: e.clientY,
      opacity: 1
    });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": theme
  }, /*#__PURE__*/React.createElement("div", {
    className: `loader ${loading ? "" : "hide"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "loader-mark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }), "\xA0 compiling portfolioâ€¦")), /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: `${progress}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cursor-glow",
    style: {
      left: glow.x,
      top: glow.y
    }
  }), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-mark mono"
  }, "poojitha", /*#__PURE__*/React.createElement("span", null, ".dev")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, NAV_ITEMS.map(id => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`,
    className: active === id ? "active" : ""
  }, "~/", id)), /*#__PURE__*/React.createElement("button", {
    className: "theme-toggle",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    "aria-label": "Toggle color theme"
  }, theme === "dark" ? /*#__PURE__*/React.createElement(Icon.sun, null) : /*#__PURE__*/React.createElement(Icon.moon, null), " ", theme === "dark" ? "light" : "dark")))), /*#__PURE__*/React.createElement("header", {
    className: "hero wrap",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-tag mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " open to backend, AI/ML & cybersecurity roles"), /*#__PURE__*/React.createElement("h1", null, PROFILE.name, /*#__PURE__*/React.createElement("br", null), "builds ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "signal"), " into systems."), /*#__PURE__*/React.createElement("p", {
    className: "hero-statement"
  }, "MCA graduate turning raw signal â€” API traffic, audio, network packets â€” into software that holds up. Backend engineer by training, AI/ML researcher by publication, and a security-minded builder across the stack."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: "#projects",
    className: "btn btn-primary"
  }, "View my work ", /*#__PURE__*/React.createElement(Icon.arrow, null))), /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "btn btn-ghost"
  }, "Get in touch"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Icon.pin, {
    style: {
      verticalAlign: "-3px",
      marginRight: "6px"
    }
  }), " ", PROFILE.location), /*#__PURE__*/React.createElement("div", null, "CGPA ", /*#__PURE__*/React.createElement("b", null, "8.00"), " Â· MCA, 2026"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "GCCMIEA-2025"), " published researcher")), /*#__PURE__*/React.createElement(Waveform, null)), /*#__PURE__*/React.createElement("section", {
    id: "journey",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "journey"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "A path shaped by three disciplines"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Education, research, and hands-on engineering, laid out in order.")), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, TIMELINE.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: "tl-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-path mono"
  }, t.path), /*#__PURE__*/React.createElement("div", {
    className: "tl-title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "tl-org"
  }, t.org), /*#__PURE__*/React.createElement("div", {
    className: "tl-meta"
  }, t.meta))))), /*#__PURE__*/React.createElement("section", {
    id: "impact",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "impact"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "The numbers behind the resume"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "A quick read on research integrity, credentialing, and shipped work.")), /*#__PURE__*/React.createElement("div", {
    className: "stats-grid"
  }, STATS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: "stat-cell",
    style: {
      transitionDelay: `${i * 80}ms`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, s.num), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, s.label))))), /*#__PURE__*/React.createElement("section", {
    id: "expertise",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "expertise"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Three domains, one engineering mindset"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Backend systems, applied AI/ML, and security fundamentals â€” built to reinforce each other.")), /*#__PURE__*/React.createElement("div", {
    className: "expertise-grid"
  }, EXPERTISE.map((e, i) => {
    const icons = [Icon.cube, Icon.brain, Icon.shield];
    const IconC = icons[i];
    return /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      className: "expertise-card",
      style: {
        transitionDelay: `${i * 100}ms`
      }
    }, /*#__PURE__*/React.createElement(IconC, {
      className: "expertise-icon",
      style: {
        color: i === 0 ? "var(--amber)" : i === 1 ? "var(--teal)" : "var(--coral)"
      }
    }), /*#__PURE__*/React.createElement("h3", null, e.title), /*#__PURE__*/React.createElement("p", null, e.desc), /*#__PURE__*/React.createElement("div", {
      className: "pill-row"
    }, e.tags.map((tag, j) => /*#__PURE__*/React.createElement("span", {
      className: "pill",
      key: j
    }, tag))));
  }))), /*#__PURE__*/React.createElement("section", {
    id: "experience",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "experience"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Professional experience")), /*#__PURE__*/React.createElement(Reveal, {
    className: "exp-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "exp-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "exp-role"
  }, "Back-End Intern"), /*#__PURE__*/React.createElement("div", {
    className: "exp-org"
  }, "Jobiak Software Pvt Ltd"), /*#__PURE__*/React.createElement("div", {
    className: "exp-dates"
  }, "Dec 2025 â€“ Mar 2026", /*#__PURE__*/React.createElement("br", null), "Visakhapatnam")), /*#__PURE__*/React.createElement("ul", {
    className: "exp-list"
  }, /*#__PURE__*/React.createElement("li", null, "Developed scalable RESTful APIs with Node.js and Express.js, improving backend response efficiency by approximately 30%."), /*#__PURE__*/React.createElement("li", null, "Integrated MongoDB with Mongoose ODM to design NoSQL schemas for user and product management systems."), /*#__PURE__*/React.createElement("li", null, "Implemented secure authentication and file-handling workflows using JWT and Multer middleware."), /*#__PURE__*/React.createElement("li", null, "Built and tested backend modules for shopping cart and order management using Postman and Git-based workflows."), /*#__PURE__*/React.createElement("li", null, "Collaborated in an agile environment to improve application functionality and API reliability.")))), /*#__PURE__*/React.createElement("section", {
    id: "projects",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "projects"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Selected work"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "From published research to full-stack platforms and IoT pipelines.")), /*#__PURE__*/React.createElement("div", {
    className: "projects-grid"
  }, PROJECTS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: `project-card ${p.featured ? "featured" : ""}`,
    style: {
      transitionDelay: `${i * 90}ms`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "project-tag"
  }, p.tag), /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "stack-row"
  }, p.stack.map((s, j) => /*#__PURE__*/React.createElement("span", {
    className: "pill",
    key: j
  }, s)))))))), /*#__PURE__*/React.createElement("section", {
    id: "certifications",
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "certifications & research"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Credentials that back the work")), /*#__PURE__*/React.createElement("div", {
    className: "cert-grid"
  }, CERTS.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: "cert-item",
    style: {
      transitionDelay: `${i % 3 * 70}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot2"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, c.name), /*#__PURE__*/React.createElement("span", null, c.org))))), /*#__PURE__*/React.createElement(Reveal, {
    className: "pub-callout"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Dysarthria (Speech Impairment) Movement Monitor"), /*#__PURE__*/React.createElement("p", null, "Presented at the GCCMIEA-2025 International Conference, Thammasat University, Bangkok â€” an AI system combining facial-landmark and acoustic signal analysis for dysarthria severity monitoring.")), /*#__PURE__*/React.createElement("div", {
    className: "pub-metrics"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, "6%"), /*#__PURE__*/React.createElement("div", {
    className: "l mono"
  }, "TURNITIN")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, "0%"), /*#__PURE__*/React.createElement("div", {
    className: "l mono"
  }, "AI DETECTED"))))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "wrap contact-block"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      justifyContent: "center"
    }
  }, "contact"), /*#__PURE__*/React.createElement("h2", null, "Let's build something reliable together."), /*#__PURE__*/React.createElement("p", {
    className: "section-sub",
    style: {
      margin: "0 auto"
    }
  }, "Open to backend, AI/ML, and cybersecurity roles â€” fresher positions, contract work, and collaborations welcome."), /*#__PURE__*/React.createElement("div", {
    className: "contact-links"
  }, /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${PROFILE.email}`
  }, /*#__PURE__*/React.createElement(Icon.mail, null), " ", PROFILE.email)), /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: `tel:${PROFILE.phone.replace(/\s/g, "")}`
  }, /*#__PURE__*/React.createElement(Icon.phone, null), " ", PROFILE.phone)), /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: `https://${PROFILE.linkedin}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon.linkedin, null), " LinkedIn")), /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: `https://${PROFILE.github}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon.github, null), " GitHub"))))), /*#__PURE__*/React.createElement("footer", {
    className: "mono"
  }, "Â© 2026 ", PROFILE.name, " Â· built with signal, not noise."));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
