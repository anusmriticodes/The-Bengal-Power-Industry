
import Link from 'next/link';

import {
  ArrowUpRight,
  Users,
  Leaf,
  HeartHandshake,
  ChartNoAxesCombined,
} from 'lucide-react';

import PublicNav from '@/components/PublicNav';
import LeadershipProfiles from '@/components/LeadershipProfiles';

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
              POWER INDUSTRY
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
  <img
    src="/kolkata-skyline.png"
    alt=""
    className="kolkata-skyline"
  />
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
              Industrial progress is strongest when business opportunity and
              human progress move forward together.
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

        <LeadershipProfiles />

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
            © {new Date().getFullYear()} The Bengal Power Industry —
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
