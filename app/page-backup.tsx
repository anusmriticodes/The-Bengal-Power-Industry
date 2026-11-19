
import Link from 'next/link';

import {
  ArrowUpRight,
  Factory,
  Users,
  Leaf,
  HeartHandshake,
  ChartNoAxesCombined,
} from 'lucide-react';

import PublicNav from '@/components/PublicNav';

const themes = [
  'Business operations, market growth and access',
  'Intelligent manufacturing and Industry 5.0 readiness',
  'Export development and global competitiveness',
  'Product innovation and marketing innovation',
  'Responsible, inclusive and collaborative industry development',
];

const phases = [
  'Listen to manufacturers across Bengal',
  'Identify shared business challenges and growth opportunities',
  'Map export potential and market access priorities',
  'Explore product, marketing and manufacturing innovation',
  'Develop an evidence-led direction for industry collaboration',
];

const principles = [
  {
    title: 'Inclusive opportunity',
    text: 'Recognising the contribution and potential of MSMEs, emerging entrepreneurs, skilled workers, women and diverse talent.',
    Icon: Users,
  },
  {
    title: 'Responsible industry',
    text: 'Encouraging energy efficiency, responsible resource use, environmentally conscious manufacturing and long-term resilience.',
    Icon: Leaf,
  },
  {
    title: 'Human well-being',
    text: 'Valuing workplace safety, dignity of work, mental well-being, healthy work environments and meaningful human collaboration.',
    Icon: HeartHandshake,
  },
  {
    title: 'Innovation and shared prosperity',
    text: 'Connecting product and marketing innovation with technology adoption, research and wider economic opportunity.',
    Icon: ChartNoAxesCombined,
  },
];


const leaders = [
  {
    initials: 'SM',
    name: 'Saptarshi Mitra',
    role: 'Founder | Industry Development & Strategic Initiatives',
    biography: [
      'Saptarshi Mitra is an Applied Electronics and Instrumentation Engineer with a professional focus on engineering, manufacturing and strategic business initiatives.',
      'He currently serves as Head Strategic Initiatives at BMC Electroplast, where his work is associated with industrial development and strategic growth. His interests span Industry 4.0 and 5.0, smart manufacturing, digital transformation and technology-led innovation.',
      'He brings an engineering-oriented perspective to understanding industry challenges and identifying practical opportunities for collaboration.',
      'As the founder of this initiative, he is focused on strengthening the electrical and engineering manufacturing ecosystem through industry engagement, product innovation, market development and export competitiveness.',
    ],
  },
  {
    initials: 'JS',
    name: 'Dr. Jagat Shah',
    role: 'Chief Mentor | Cluster Development & International Business',
    biography: [
      'Dr. Jagat Shah is an international business advisor and mentor with a focus on cluster development, export growth and global market access.',
      'His professional work encompasses supporting businesses in exploring international opportunities, strengthening market-entry strategies and developing industry networks. He brings a strategic perspective on building collaborative industry ecosystems and improving the global competitiveness of businesses.',
      'His areas of engagement include export facilitation, international business development, business mentoring and cluster-led growth.',
      'As the strategic guide to this initiative, he contributes guidance and insights towards developing a stronger, more connected and globally competitive electrical and engineering industry in West Bengal.',
    ],
  },
];


export default function Home() {
  return (
    <>
      <PublicNav />

      <main>
        <header className="hero">
          <div className="container hero-inner">
            <div className="eyebrow">
              An industry research initiative · Kolkata & West Bengal
            </div>

            <h1>
              THE BENGAL
              <br />
              ELECTRICAL INDUSTRY
            </h1>

            <div className="hero-sub">
              Market Growth &amp; Export Study
            </div>

            <p className="hero-tagline">
              <i>From industrial capability to wider opportunity.</i>
            </p>

            <p>
              A manufacturer-focused study to understand business priorities,
              strengthen market access, encourage innovation and explore
              opportunities for Bengal’s electrical and engineering ecosystem.
            </p>

            <div className="hero-attribution">
              Founded by Saptarshi Mitra
              <span />
              With Chief Mentorship of Dr. Jagat Shah
            </div>

            <div className="hero-actions">
              <Link className="btn" href="/consultation">
                Participate in the Industry Study
                <ArrowUpRight size={16} />
              </Link>

              <a className="btn btn-outline" href="#initiative">
                Explore the Initiative
              </a>
            </div>

            <div className="hero-meta">
              <span className="gold-line" />
              Listening first. Evidence before recommendations.
            </div>
          </div>

          
<div className="hero-art" aria-hidden="true">
  <svg
    className="bengal-illustration"
    viewBox="0 0 720 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Howrah Bridge inspired engineering structure */}
    <g className="bridge-lines">
      <path d="M55 290 H665" />
      <path d="M70 303 H650" />

      <path d="M155 300 L180 65 L205 300" />
      <path d="M515 300 L540 65 L565 300" />

      <path d="M180 65 H540" />
      <path d="M180 85 H540" />

      <path d="M180 100 L540 260" />
      <path d="M540 100 L180 260" />

      <path d="M180 125 L540 230" />
      <path d="M540 125 L180 230" />

      <path d="M180 150 L540 200" />
      <path d="M540 150 L180 200" />

      <path d="M155 300 L100 265 L70 265" />
      <path d="M565 300 L620 265 L650 265" />

      <path d="M180 65 L155 40 L130 65" />
      <path d="M540 65 L565 40 L590 65" />

      <path d="M205 300 L515 300" />
    </g>

    {/* Victoria Memorial inspired dome silhouette */}
    <g className="memorial-lines">
      <path d="M420 280 C420 250 450 235 480 235 C510 235 540 250 540 280" />
      <path d="M435 235 C435 205 455 185 480 185 C505 185 525 205 525 235" />
      <path d="M455 185 L480 155 L505 185" />
      <path d="M480 155 V140" />
      <path d="M465 280 V245 H495 V280" />
      <path d="M420 280 H540" />
    </g>

    {/* Hooghly-inspired flowing river lines */}
    <g className="river-lines">
      <path d="M55 340 C140 320 200 360 285 340 S430 320 515 340 S610 355 665 335" />
      <path d="M95 370 C180 350 240 390 325 370 S470 350 555 370 S625 380 660 365" />
      <path d="M180 400 C260 385 320 415 400 400 S540 385 610 400" />
    </g>
  </svg>

  <div className="circuit circuit-one" />
  <div className="circuit circuit-two" />
  <div className="circuit-node node-one" />
  <div className="circuit-node node-two" />
  <div className="circuit-node node-three" />

  <Factory className="hero-factory" strokeWidth={0.7} />
</div>

        </header>

        <section className="content-section" id="initiative">
          <div className="container story-grid">
            <div>
              <div className="eyebrow">The context</div>

              <h2 className="section-title">
                A New Chapter in Bengal’s Industrial Story
              </h2>

              <p className="lead">
                West Bengal has always been a land of enterprise, ideas and
                industrial ambition, where generations have contributed to
                India&apos;s economic and technological progress.
              </p>

              <p className="lead">
                Kolkata and West Bengal have a distinguished place in India’s
                electrical and engineering journey. Generations of
                manufacturers, engineers and entrepreneurs have built
                capabilities that continue to serve industries and communities.
              </p>

              <p className="lead">
                Today, businesses are navigating changing customer
                expectations, global competition, evolving standards,
                technology adoption and the need for stronger market access.
              </p>

              <p className="lead">
                This study seeks to listen to manufacturers, understand their
                priorities and identify practical opportunities for market
                growth, export development, product innovation and marketing
                innovation.
              </p>

              <p className="lead">
                The objective is to turn individual business experiences into
                a collective understanding of what can help Bengal’s electrical
                industry grow stronger and compete globally.
              </p>

              <p className="lead vision-close">
                Industrial progress should not be measured by production and
                profits alone. It should also be seen in the opportunities
                created for people, the dignity and safety of work, mental
                well-being, inclusive participation, responsible use of
                resources and the possibility of a sustainable future shared
                more widely.
              </p>
            </div>

            <aside className="story-aside">
              “Industrial progress is strongest when business opportunity and
              human progress move forward together.”
              <small>
                A research-led approach grounded in the experience and
                ambitions of manufacturers.
              </small>
            </aside>
          </div>
        </section>

        <section className="content-section soft-bg" id="themes">
          <div className="container">
            <div className="eyebrow">What the study will explore</div>

            <h2 className="section-title">
              A connected view of industry growth.
            </h2>

            <p className="lead">
              The study will explore the capabilities, constraints and
              ambitions shaping the competitiveness of Bengal’s electrical
              and engineering manufacturers.
            </p>

            <div className="theme-grid">
              {themes.map((theme, index) => (
                <article className="theme-card" key={theme}>
                  <div className="theme-num">0{index + 1}</div>
                  <h3>{theme}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="principles">
          <div className="container">
            <div className="eyebrow">A broader vision of development</div>

            <h2 className="section-title">
              Industry growth with people and purpose at its centre.
            </h2>

            <p className="lead">
              A future-ready industrial ecosystem is built not only through
              stronger companies, but through opportunity, responsible
              practices and shared progress.
            </p>

            <div className="principle-grid">
              {principles.map(({ title, text, Icon }) => (
                <article className="principle-card" key={title}>
                  <div className="principle-icon">
                    <Icon size={21} strokeWidth={1.5} />
                  </div>

                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section soft-bg">
          <div className="container">
            <div className="eyebrow">The research approach</div>

            <h2 className="section-title">
              From listening to a shared direction.
            </h2>

            <p className="lead">
              The first phase will build an evidence base from manufacturer
              consultations across Kolkata and West Bengal.
            </p>

            <div className="roadmap">
              {phases.map((phase, index) => (
                <div className="roadmap-item" key={phase}>
                  <span>PHASE 0{index + 1}</span>
                  <h3>{phase}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section leadership-section" id="leadership">
          <div className="container">
            <div className="eyebrow">Leadership &amp; Strategic Guidance</div>

            <h2 className="section-title">
              Engineering-led vision. Strategic industry perspective.
            </h2>

            <p className="lead">
              The initiative is shaped by engineering-led industry development,
              strategic business insight and a shared commitment to
              strengthening Bengal’s electrical and engineering manufacturing
              ecosystem.
            </p>

            <div className="people-grid">
              {leaders.map((leader, index) => (
                <article className="person-card" key={leader.name}>
                  <div className="avatar">{leader.initials}</div>

                  <div className="person-content">
                    <div className="person-index">
                      {index === 0 ? '01 / FOUNDER' : '02 / STRATEGIC GUIDE'}
                    </div>

                    <h3>{leader.name}</h3>

                    <div className="person-role">{leader.role}</div>

                    <div className="person-divider" />

	{leader.biography.map((paragraph) => (
  <p key={paragraph}>{paragraph}</p>
))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <div className="eyebrow gold-text">
              An invitation to contribute
            </div>

            <h2>
              Your experience can help shape the next chapter of Bengal’s
              electrical and engineering industry.
            </h2>

            <p>
              Share your organisation’s perspective through a guided
              consultation. Your input will contribute to a collective
              understanding of market growth, export opportunities and
              innovation priorities.
            </p>

            <Link className="btn btn-gold" href="/consultation">
              Begin the Industry Consultation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} The Bengal Electrical Industry —
            Market Growth &amp; Export Study
          </span>

          <span>
            Founded by Saptarshi Mitra | With Chief Mentorship of Dr. Jagat Shah
          </span>

          <Link href="/login">Founder access</Link>
        </div>
      </footer>
    </>
  );
}
