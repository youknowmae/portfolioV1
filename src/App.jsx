import { useEffect, useRef, useState } from 'react'
import angelPhoto from './assets/angel.png'
import './App.css'

/* ── DATA ──────────────────────────────────────────────── */
const tools = [
  { icon: '💰', name: 'QuickBooks Online', cat: 'Finance' },
  { icon: '📊', name: 'Microsoft Excel', cat: 'Spreadsheet' },
  { icon: '📋', name: 'Google Sheets', cat: 'Spreadsheet' },
  { icon: '📧', name: 'Microsoft Outlook', cat: 'Communication' },
  { icon: '☁️', name: 'SharePoint', cat: 'Cloud Storage' },
  { icon: '💾', name: 'OneDrive', cat: 'Cloud Storage' },
  { icon: '✍️', name: 'DocuSign', cat: 'Contracts' },
  { icon: '📅', name: 'Calendly', cat: 'Scheduling' },
  { icon: '⚡', name: 'Power Automate', cat: 'Automation' },
  { icon: '💬', name: 'Microsoft Teams', cat: 'Communication' },
  { icon: '🔍', name: 'Indeed', cat: 'Recruitment' },
  { icon: '🎥', name: 'Zoom', cat: 'Video Calls' },
  { icon: '🗂️', name: 'Google Drive', cat: 'Cloud Storage' },
  { icon: '📝', name: 'Google Docs', cat: 'Documents' },
  { icon: '📦', name: 'Pirate Ship', cat: 'Shipping' },
  { icon: '🚀', name: 'Microsoft Word', cat: 'Documents' },
  { icon: '📌', name: 'Google Forms', cat: 'Data Collection' },
  { icon: '🖥️', name: 'Microsoft PowerPoint', cat: 'Presentations' },
]

const works = [
  {
    tag: 'Bookkeeping',
    title: 'Bank Reconciliation — Multi-Company',
    desc: 'Performed full bank reconciliation for multiple companies including Enopoly Distribution and La Chelé Medical Aesthetics. Compared bank statements against spreadsheets, identified discrepancies, and created detailed summary reports with highlighted exceptions.',
    tools: ['Microsoft Excel', 'QuickBooks Online', 'PDF Bank Statements'],
    result: 'Accurate discrepancy reports delivered across 3+ months of statements',
  },
  {
    tag: 'HR & Recruitment',
    title: 'End-to-End Recruitment — Fast & Forward',
    desc: 'Managed full recruitment pipeline for warehouse associate positions: posted jobs on Indeed, screened applicants against qualification criteria, built an Excel applicant tracker with dropdowns and color-coded statuses, coordinated interviews, and handled all onboarding documentation.',
    tools: ['Indeed', 'Microsoft Excel', 'Outlook', 'DocuSign'],
    result: 'Custom applicant tracker built with automated dropdowns; full pipeline managed independently',
  },
  {
    tag: 'Admin Automation',
    title: 'Automated Payroll Reminder System',
    desc: 'Set up a fully automated bi-weekly payroll reminder email system using Microsoft Power Automate. Configured recurring schedule, set Eastern Time timezone, built HTML email body with proper bullet formatting, and ensured correct delivery to all managers.',
    tools: ['Power Automate', 'Microsoft Outlook', 'HTML'],
    result: 'Zero-touch automated reminder system running every 2 weeks without manual intervention',
  },
  {
    tag: 'System Building',
    title: 'Applicant Tracker — Excel with Dropdowns',
    desc: 'Designed and built a comprehensive applicant tracking spreadsheet from scratch. Included color-coded statuses, dropdown validations for all key fields, screening criteria reference section, and an annual summary dashboard — all formula-driven with no manual calculations needed.',
    tools: ['Microsoft Excel', 'Data Validation', 'Formulas'],
    result: 'Production-ready tracker used live for recruitment screening process',
  },
  {
    tag: 'HR Operations',
    title: 'Onboarding Coordination — New Hires',
    desc: 'Managed complete onboarding process for new hires including sending onboarding forms, following up on required IDs and government documents, coordinating background checks, and communicating next steps — all while maintaining organized records.',
    tools: ['Microsoft Outlook', 'Google Forms', 'SharePoint'],
    result: 'Smooth onboarding pipeline managed independently with consistent candidate communication',
  },
  {
    tag: 'Financial Tracking',
    title: 'Cash Stuffing Tracker — Weekly Budget',
    desc: 'Built a fully automated personal finance tracker with weekly salary tracking across 5 savings categories. Designed with aesthetic color-coding, 52-week coverage, automatic remaining balance formulas, and an annual summary dashboard.',
    tools: ['Microsoft Excel', 'openpyxl', 'Formulas'],
    result: 'Full-year tracker with zero manual calculations — type in, rest is automatic',
  },
]

const tickerItems = [
  'Virtual Assistant', 'QuickBooks Online', 'HR & Recruitment',
  'Bank Reconciliation', 'Admin Support', 'Onboarding', 'Data Management', 'Remote Ready',
]

/* ── HOOKS ─────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100)
        }
      })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx - 3 + 'px'
      dot.style.top = my - 3 + 'px'
    }
    document.addEventListener('mousemove', move)
    const anim = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      ring.style.left = rx - 18 + 'px'
      ring.style.top = ry - 18 + 'px'
      requestAnimationFrame(anim)
    }
    anim()
    const hoverEls = document.querySelectorAll('a, button, .work-card, .tool-block, .skill-row, .exp-card, .info-card')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '52px'; ring.style.height = '52px'
        ring.style.borderRadius = '0'; ring.style.borderColor = 'rgba(255,255,255,0.7)'
      })
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px'
        ring.style.borderRadius = '50%'; ring.style.borderColor = 'rgba(255,255,255,0.25)'
      })
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])
}

/* ── COMPONENTS ─────────────────────────────────────────── */
function Cursor() {
  return (
    <>
      <div id="cursor-dot" style={{ position: 'fixed', width: 6, height: 6, background: '#fff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference', transition: 'transform .1s' }} />
      <div id="cursor-ring" style={{ position: 'fixed', width: 36, height: 36, border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998, transition: 'width .3s, height .3s, border-color .3s, border-radius .3s' }} />
    </>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-logo">AMG</div>
      <ul className="nav-links">
        {['skills', 'experience', 'tools', 'work', 'about', 'contact'].map(s => (
          <li key={s}><a href={`#${s}`}>{s}</a></li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-photo">
        <img src={angelPhoto} alt="Angel Mae Gaña" />
        <div className="hero-slash" />
        <div className="photo-caption">Angel Mae Gaña · Virtual Assistant</div>
      </div>
      <div className="hero-text">
        <div className="hero-counter">— 001 / INTRO</div>
        <h1 className="hero-name">
          <span className="l1">Angel Mae</span>
          <span className="l2">Gaña</span>
        </h1>
        <div className="hero-tags">
          {['QuickBooks', 'HR & Recruitment', 'Admin Support', 'Bookkeeping'].map(t => (
            <span key={t} className="hero-tag">{t}</span>
          ))}
        </div>
        <p className="hero-desc">
          Proactive Virtual Assistant with expertise in administrative support, HR documentation,
          and financial recordkeeping. Dedicated to supporting business growth by managing
          complex tasks independently.
        </p>
        <a href="#contact" className="hero-cta"><span>Hire Me Now →</span></a>
        <div className="scroll-line"><span>Scroll</span></div>
      </div>
    </section>
  )
}

function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const stats = [
    { n: '2+', l: 'Years Experience' },
    { n: '3', l: 'Core Specialties' },
    { n: '18+', l: 'Tools Mastered' },
    { n: '100%', l: 'Remote Ready' },
  ]
  return (
    <div className="stats-row">
      {stats.map(s => (
        <div key={s.l} className="stat reveal">
          <div className="stat-n">{s.n}</div>
          <div className="stat-l">{s.l}</div>
        </div>
      ))}
    </div>
  )
}

function Skills() {
  const skills = [
    {
      num: '01', title: 'Admin & Scheduling',
      sub: 'End-to-end administrative support, calendar management, and workflow automation for busy executives.',
      tags: ['Email Management', 'Calendar Scheduling', 'Data Entry', 'Purchase Orders', 'SharePoint', 'Power Automate', 'Excel Trackers', 'File Organization'],
    },
    {
      num: '02', title: 'HR & Recruitment',
      sub: 'Full-cycle recruitment coordination from job posting to onboarding, ensuring smooth candidate experiences.',
      tags: ['Resume Screening', 'Interview Scheduling', 'Onboarding Docs', 'Applicant Tracking', 'Indeed Management', 'Candidate Comms', 'Background Checks', 'DocuSign'],
    },
    {
      num: '03', title: 'Bookkeeping & Reconciliation',
      sub: 'Meticulous financial recordkeeping, bank reconciliation, and QuickBooks data management for data integrity.',
      tags: ['Bank Reconciliation', 'QuickBooks Online', 'Receipt Auditing', 'Invoice Processing', 'Payroll Support', 'Financial Trackers', 'Vendor Encoding', 'Discrepancy Reports'],
    },
  ]
  return (
    <section className="skills-section section" id="skills">
      <div className="sec-eyebrow"><span>What I Do</span></div>
      <h2 className="sec-title">Core<br /><em>Expertise</em></h2>
      <div className="skills-accordion">
        {skills.map(s => (
          <div key={s.num} className="skill-row reveal">
            <div className="skill-index">{s.num}</div>
            <div className="skill-main">
              <div className="skill-title">{s.title}</div>
              <div className="skill-sub">{s.sub}</div>
            </div>
            <div className="skill-tags-col">
              {s.tags.map(t => <span key={t} className="sk-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const exps = [
    {
      status: 'Current Position', current: true,
      role: ['Virtual', 'Assistant'],
      date: 'April 2026 — Present',
      duties: [
        'Manages financial data integrity by auditing receipts, encoding vendor and customer details, and performing bank reconciliations',
        'Facilitates end-to-end recruitment and onboarding processes including resume screening, candidate scheduling, and coordinating onsite interviews',
        'Develops and maintains administrative trackers using Excel and Google Sheets to monitor financial items and applicant status',
        'Provides high-level executive support by organizing email correspondence, managing professional calendars, and acting as primary gatekeeper',
        'Ensures accurate data entry and documentation across SharePoint, OneDrive, and DocuSign for contract management',
      ],
    },
    {
      status: 'Previous Role', current: false,
      role: ['HR & Admin', 'Assistant'],
      date: 'August 2025 — April 2026',
      duties: [
        'Provided full-time HR and administrative support using computer-based systems and digital tools',
        'Assisted in payroll preparation by monitoring attendance, validating records, and organizing payroll-related data',
        'Handled Purchase Requests and Purchase Orders including preparation, tracking, and documentation',
        'Maintained tracking sheets, databases, and inventory records using Excel and Google Sheets',
        'Assisted in recruitment activities including resume screening, interview scheduling, and coordination with applicants and staff',
        'Organized digital files and ensured accurate data entry across all systems',
      ],
    },
  ]
  return (
    <section className="section exp-section" id="experience">
      <div className="sec-eyebrow"><span>Career History</span></div>
      <h2 className="sec-title">Professional<br /><em>Experience</em></h2>
      <div className="exp-grid">
        {exps.map((e, i) => (
          <div key={i} className="exp-card reveal" data-num={`0${i + 1}`}>
            <div className="exp-status">
              <span className={`exp-dot ${e.current ? 'current' : ''}`} />
              <span className="exp-status-text">{e.status}</span>
            </div>
            <div className="exp-role">{e.role.map(r => <span key={r}>{r}<br /></span>)}</div>
            <div className="exp-date">{e.date}</div>
            <ul className="exp-list">
              {e.duties.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Tools() {
  return (
    <section className="tools-section section" id="tools">
      <div className="sec-eyebrow"><span>Tech Stack</span></div>
      <h2 className="sec-title">Tools &<br /><em>Platforms</em></h2>
      <div className="tools-layout">
        <div className="tools-intro reveal">
          <div className="tools-count">18+</div>
          <div className="tools-count-label">Tools Mastered</div>
          <br /><br />
          <p>Proficient across a wide range of platforms — from financial software to HR systems, cloud tools to communication platforms. Always ready to adapt to new tech.</p>
        </div>
        <div className="tools-visual reveal">
          {tools.map(t => (
            <div key={t.name} className="tool-block">
              <div className="tool-icon">{t.icon}</div>
              <div className="tool-name">{t.name}</div>
              <div className="tool-cat">{t.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  const scrollRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollL, setScrollL] = useState(0)

  const onMouseDown = (e) => {
    setIsDown(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollL(scrollRef.current.scrollLeft)
  }
  const onMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollL - (x - startX) * 2
  }

  return (
    <section className="work-section" id="work">
      <div className="work-header">
        <div className="sec-eyebrow"><span>Portfolio</span></div>
        <h2 className="sec-title">Proven<br /><em>Work</em></h2>
      </div>
      <div
        className="work-scroll-outer"
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={() => setIsDown(false)}
        onMouseUp={() => setIsDown(false)}
        onMouseMove={onMouseMove}
      >
        <div className="work-scroll">
          {works.map((w, i) => (
            <div key={i} className="work-card" data-num={`0${i + 1}`}>
              <div className="work-card-tag">{w.tag}</div>
              <div className="work-card-title">{w.title}</div>
              <div className="work-card-desc">{w.desc}</div>
              <div className="work-card-tools">
                {w.tools.map(t => <span key={t} className="work-tool">{t}</span>)}
              </div>
              <div className="work-result">
                <div className="work-result-label">Outcome</div>
                <div className="work-result-text">{w.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="drag-hint">
        <div className="drag-line" />
        <span>Drag to explore more work</span>
      </div>
    </section>
  )
}

function About() {
  const qualities = ['Detail-Oriented', 'Tech-Savvy', 'Fast Learner', 'Self-Managed', 'Dependable', 'Remote-Ready']
  const cards = [
    { label: 'Education', value: 'BS Information Technology', sub: 'Gordon College · 2021 – 2025' },
    { label: 'Location', value: 'Olongapo City, Philippines', sub: 'Available for global remote work' },
    { label: 'Availability', value: 'Open to Remote Roles', sub: 'Full-time & Part-time considered' },
    { label: 'Work Style', value: 'Independent & Collaborative', sub: 'Adaptable to new systems & workflows' },
  ]
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div className="about-left reveal">
          <div className="sec-eyebrow"><span>About Me</span></div>
          <h2 className="sec-title" style={{ marginBottom: 32 }}>The Person<br /><em>Behind</em></h2>
          <p className="about-text">I'm a proactive Virtual Assistant based in Olongapo City, Philippines with a BS in Information Technology from Gordon College. I specialize in keeping businesses organized and efficient — whether through financial recordkeeping, HR coordination, or complex admin tasks.</p>
          <p className="about-text">I thrive on solving problems, building systems, and making my clients' lives easier. I take ownership of every task and bring precision to everything I do.</p>
          <div className="qual-list">
            {qualities.map(q => (
              <div key={q} className="qual-item">
                <span>{q}</span>
                <span className="qual-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-right reveal">
          {cards.map(c => (
            <div key={c.label} className="info-card">
              <div className="info-label">{c.label}</div>
              <div className="info-value">{c.value}</div>
              <div className="info-sub">{c.sub}</div>
            </div>
          ))}
          <div className="avail-badge">
            <span className="avail-dot" />
            <span>Available for new opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-giant">HIRE ME</div>
      <div className="footer-main">
        <div className="footer-left">
          <div className="f-name">Angel Mae Gaña</div>
          <div className="f-role">Virtual Assistant · QuickBooks · HR · Admin</div>
        </div>
        <div className="footer-right">
          <div className="f-contact"><a href="mailto:ganaangelmae@gmail.com">ganaangelmae@gmail.com</a></div>
          <div className="f-contact">+63 967 452 6639</div>
          <div className="f-contact">Olongapo City, Philippines</div>
        </div>
      </div>
      <div className="footer-copy">© 2026 Angel Mae Gaña. All rights reserved.</div>
    </footer>
  )
}

/* ── APP ────────────────────────────────────────────────── */
export default function App() {
  useReveal()
  useCursor()
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <Skills />
      <Experience />
      <Tools />
      <Work />
      <About />
      <Footer />
    </>
  )
}
