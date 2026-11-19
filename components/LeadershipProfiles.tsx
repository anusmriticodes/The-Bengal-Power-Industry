'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const profiles = [
  {
    initials: 'JS',
    name: 'Dr. Jagat Shah',
    role: 'Chief Mentor | International Business, Export Development & Industry Cluster Development',
    intro: 'Dr. Jagat Shah is an international business advisor, export mentor and industry-development strategist with over 28 years of experience spanning international trade consulting, market research, B2B matchmaking, investment promotion, innovation and cluster development. His professional engagements extend across 45 countries, with work involving MSME competitiveness, global market access, international trade delegations, joint ventures and collaborative industrial development.',
    linkedin: 'https://www.linkedin.com/in/clusterpulse/',
    metrics: [
      ['28+', 'Years of experience'],
      ['45', 'Countries'],
      ['102', 'Industrial clusters'],
      ['185', 'Overseas trade delegations'],
    ],
    sections: [
      {
        title: 'International Business & Export Development',
        text: 'With over 28 years of experience, Dr. Shah’s work spans international trade consulting, market research, B2B matchmaking, export strategy, investment promotion, innovation and cluster development. His professional engagements extend across Asia, Europe, Africa, North America, South America and the Middle East. Sector experience includes engineering, automotive, electronics, agriculture, food processing, infrastructure, renewable energy, pharmaceuticals, textiles, handicrafts, biotechnology, ICT, aviation and education.',
      },
      {
        title: 'Areas of Expertise',
        bullets: [
          'International business advisory and global trade strategy',
          'MSME export strategy and export development',
          'Market research and international market-entry strategies',
          'B2B matchmaking and international trade delegations',
          'Joint ventures, foreign collaboration and technology transfer',
          'Investment promotion and finance facilitation',
          'Innovation ecosystems and industrial cluster development',
          'Sustainable competitiveness and technology adoption',
        ],
      },
      {
        title: 'Cluster Development & Industrial Competitiveness',
        text: 'Dr. Shah founded and leads Cluster Pulse. His work has involved 102 industrial clusters, with a focus on competitiveness strategies, MSME productivity, technology adoption, common facilities and stronger domestic and international market connections. Projects have been associated with organisations including UNIDO, USAID, the World Bank, IFC, GIZ, DFID, the European Commission and the Commonwealth Secretariat.',
      },
      {
        title: 'International Trade & Government Engagement',
        text: 'He served for nine years as Trade and Investment Commissioner for the Government of Manitoba, Canada, in India. His work included trade promotion, investment facilitation, joint ventures, technology transfer and commercial links. He has also led trade and investment delegations, including engagements involving the US Department of Commerce and business delegations to the United States and the UAE.',
      },
      {
        title: 'Promoting Indian Technology & Global Market Access',
        text: 'His international work has included identifying 100 technology-transfer opportunities for local entrepreneurs in Senegal and connecting them with Indian technology and machinery suppliers. He has also supported Indian MSME clusters through overseas delegations, buyer-seller meetings, exhibitions and export initiatives.',
      },
      {
        title: 'Export Training & Business Mentorship',
        text: 'Through the Global Network Institute and Global Network Digital Institute, Dr. Shah has been involved in export training, global trade seminars and business mentoring. Figures reported on his professional profile include 255 export training batches, 1,020 global trade seminars, 600+ clients, 3,800 companies exporting, 7,300 companies trained on exports and US$3.5 billion in business generated for clients.',
      },
      {
        title: 'Mentor on Road',
        text: 'His Mentor on Road initiatives have included a journey across 35 US states, 35 cities and 9,602 miles over 78 days, as well as a Canada journey covering six provinces, 15 cities, 30 events and 4,960 km. These engagements involved businesses, startups, SMEs, women-owned businesses and Indian-American networks.',
      },
      {
        title: 'Smart Village & Inclusive Development',
        text: 'His development work has included engagement with 62 villages across 19 Indian states, focusing on community-led development, technology solutions, livelihoods and local entrepreneurship. This work also recognises the importance of women-owned businesses and wider participation in economic opportunity.',
      },
      {
        title: 'Role as Chief Mentor',
        text: 'For The Bengal Power Industry, Dr. Shah contributes strategic guidance on cluster development, export competitiveness, international market access, partnerships and joint ventures, global buyer networks, investment and technology transfer, MSME development and collaborative innovation. His guidance supports the ambition of building a connected, sustainable and globally competitive industrial ecosystem for Bengal.',
      },
    ],
  },
  {
    initials: 'SM',
    name: 'Saptarshi Mitra',
    role: 'Founder | Industry Development & Strategic Initiatives',
    intro: 'Saptarshi Mitra is an Applied Electronics and Instrumentation Engineer with a professional focus on engineering, manufacturing and strategic business initiatives. He currently serves as Head – Strategic Initiatives at BMC Electroplast, where his work is associated with industrial development and strategic growth. His interests span Industry 4.0 and 5.0, smart manufacturing, digital transformation and technology-led innovation. As the founder of this initiative, he is focused on strengthening the electrical and engineering manufacturing ecosystem through industry engagement, product innovation, market development and export competitiveness.',
    linkedin: 'https://www.linkedin.com/in/mitra-saptarshi95/',
    sections: [
      {
        title: 'Engineering & Professional Background',
        text: 'Saptarshi is an Applied Electronics and Instrumentation Engineer whose professional interests bring together engineering, manufacturing and strategic business development. He currently serves as Head – Strategic Initiatives at BMC Electroplast, contributing to work associated with industrial development and strategic growth.',
      },
      {
        title: 'Technology & Innovation Interests',
        bullets: [
          'Industry 4.0 and Industry 5.0',
          'Smart manufacturing and automation',
          'Engineering and product innovation',
          'Digital transformation and technology-led growth',
          'Strategic business development',
          'International collaborations and joint ventures',
          'Global market development and export competitiveness',
          'Promoting Indian technologies, engineering capabilities and products internationally',
        ],
      },
      {
        title: 'Role as Founder',
        text: 'As the founder of The Bengal Power Industry, Saptarshi is focused on strengthening Bengal’s electrical and engineering manufacturing ecosystem. The initiative seeks to engage manufacturers, understand shared industry challenges, encourage product and marketing innovation, explore international partnerships and support export growth.',
      },
      {
        title: 'Vision & Industry Development',
        text: 'His vision is to connect engineering capabilities, industry collaboration, technology and global markets. He is also committed to a broader understanding of industrial progress that values sustainability, inclusivity, workplace dignity and safety, mental well-being and shared opportunity.',
      },
    ],
  },
];

export default function LeadershipProfiles() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="content-section leadership-section" id="leadership">
      <div className="container">
        <div className="eyebrow">Leadership &amp; Strategic Guidance</div>
        <h2 className="section-title">
          Engineering-led vision. Strategic industry perspective.
        </h2>
        <p className="lead">
          The initiative brings together engineering-led industry development,
          international business insight and a shared commitment to strengthening
          Bengal’s electrical and engineering manufacturing ecosystem.
        </p>

        <div className="leadership-list">
          {profiles.map((person) => {
            const isOpen = expanded === person.name;

            return (
              <article className="leadership-profile" key={person.name}>
                <div className="leadership-main">
                  <div className="leadership-monogram" aria-hidden="true">
                    {person.initials}
                  </div>

                  <div className="leadership-summary">
                    <h3>{person.name}</h3>
                    <div className="leadership-role">{person.role}</div>
                    <p>{person.intro}</p>

                    {person.metrics && (
                      <div className="leadership-metrics">
                        {person.metrics.map(([value, label]) => (
                          <div className="leadership-metric" key={label}>
                            <strong>{value}</strong>
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="leadership-actions">
                      <button
                        className="know-more-button"
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : person.name)}
                      >
                        {isOpen ? 'Show Less' : 'Know More'}
                        <ChevronDown
                          size={16}
                          className={isOpen ? 'chevron-open' : ''}
                        />
                      </button>

                      <a
                        className="linkedin-link"
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View LinkedIn Profile <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className={`leadership-expanded ${isOpen ? 'is-open' : ''}`}>
                  <div className="leadership-expanded-inner">
                    {person.sections.map((section) => (
                      <section className="leadership-detail" key={section.title}>
                        <h4>{section.title}</h4>
                        {'text' in section && <p>{section.text}</p>}
                        {'bullets' in section && section.bullets && (
                          <ul>
                            {section.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
