export type Field = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'number' | 'textarea' | 'radio' | 'checkbox' | 'gst' | 'consent';
  required?: boolean;
  options?: string[];
  max?: number;
  otherField?: string;
  hint?: string;
};
export type Section = { title: string; intro?: string; fields: Field[] };

export const sections: Section[] = [
  {
    title: 'Company Profile',
    intro: 'Tell us about your organisation and the products or services that define its work.',
    fields: [
      { id: 'company_name', label: 'Company name', type: 'text', required: true },
      { id: 'company_address', label: 'Company address', type: 'textarea', required: true },
      { id: 'company_gst_number', label: 'Company GST number', type: 'gst', required: true, hint: 'Enter the 15-character GSTIN.' },
      { id: 'city', label: 'City', type: 'text', required: true },
      { id: 'specialisation_products_services', label: 'Specialisation / Products / Services', type: 'textarea', required: true },
    ],
  },
  {
    title: 'Business Operations, Growth & Challenges',
    intro: 'Help us understand where operational constraints arise and what would enable sustainable business growth.',
    fields: [
      {
        id: 'business_challenges',
        label: 'Which areas of your business operations and management present the greatest challenges or opportunities for improvement?',
        type: 'checkbox', required: true, otherField: 'business_challenges_other',
        options: ['Raw Material Sourcing', 'Operational Planning', 'Logistics', 'Inventory Management', 'Designs and Product Development', 'Sales', 'Market Access', 'Policy Compliance', 'Finance', 'Audits and Standards Compliance', 'Other (please specify)'],
      },
      {
        id: 'business_impact',
        label: 'What do these challenges affect most?',
        type: 'checkbox', otherField: 'business_impact_other',
        options: ['Time and Productivity', 'Production Cost', 'Quality and Rework', 'Delivery Commitments', 'Customer Satisfaction', 'Working Capital', 'Business Growth / Increase in Order Volume', 'Other (please specify)'],
      },
      { id: 'government_support', label: 'What kind of government hand-holding or institutional support would help your company overcome these challenges and grow?', type: 'textarea' },
      { id: 'recurring_obstacle', label: 'What is one recurring obstacle you would most like to resolve?', type: 'textarea' },
      { id: 'resolution_attempts', label: 'Have you tried addressing this obstacle? What has prevented a lasting solution?', type: 'textarea' },
    ],
  },
  {
    title: 'Technology, Manufacturing & Future Readiness',
    intro: 'Which capabilities would help your company become more competitive, productive and future-ready?',
    fields: [
      {
        id: 'desired_technologies',
        label: 'Which of the following capabilities would help your company become more competitive and future-ready?',
        type: 'checkbox', required: true, otherField: 'technology_other',
        options: ['Intelligent Manufacturing & Smart Factories', 'Export-Level Sales & Marketing', 'Global Standards & Quality Compliance', 'Skilled Workforce & Human Collaboration', 'AI-Assisted Analytical Decision-Making', 'Energy Efficiency & Resource Optimisation', 'Product Innovation', 'Marketing Innovation', 'Other (please specify)'],
      },
      { id: 'implemented_technologies', label: 'Which of these capabilities or technologies has your company already implemented?', type: 'textarea' },
      { id: 'desired_but_unavailable', label: 'Which capabilities would you like to adopt but are not yet able to implement?', type: 'textarea' },
      {
        id: 'technology_barriers',
        label: 'What are the barrier(s) holding your company back from adopting these capabilities or expanding its market presence?',
        type: 'checkbox', otherField: 'technology_barriers_other',
        options: ['Investment Constraints', 'Lack of Skilled Workforce', 'Technical Expertise', 'Infrastructure Limitations', 'Technology Availability', 'Market Access', 'Export Market Intelligence', 'Global Certification and Compliance', 'Uncertainty About Returns', 'Other (please specify)'],
      },
      { id: 'technology_notes', label: 'Any additional priorities or observations on technology and manufacturing transformation?', type: 'textarea' },
    ],
  },
  {
    title: 'Export & Market Growth Opportunities',
    intro: 'Share your export journey, target markets and priorities for expanding business opportunities.',
    fields: [
      { id: 'export_status', label: 'Which best describes your company’s international business journey?', type: 'radio', required: true, options: ['Regular exporter', 'Occasional exporter', 'Previously exported', 'Received international enquiries', 'Interested in exporting, but not started', 'Have not explored exports yet'] },
      { id: 'target_markets', label: 'Which domestic or international markets would your company like to enter or expand in?', type: 'textarea' },
      { id: 'export_barriers', label: 'What are the main barrier(s) to export and market expansion?', type: 'checkbox', otherField: 'export_barriers_other', options: ['Finding verified buyers', 'International certifications and standards', 'Export documentation and compliance', 'Pricing and competition', 'Logistics and supply-chain requirements', 'Market intelligence', 'International connections', 'Product adaptation', 'Sales and marketing capabilities', 'Other (please specify)'] },
      { id: 'export_notes', label: 'What market access, buyer connections, information or institutional support would help your company grow?', type: 'textarea' },
      { id: 'innovation_products', label: 'What product innovation or product development opportunities would strengthen your competitiveness?', type: 'textarea' },
      { id: 'marketing_innovation', label: 'What marketing innovation, positioning or sales capabilities would help your company reach new customers and markets?', type: 'textarea' },
    ],
  },
  {
    title: 'Consent & Submission',
    intro: 'Please review the statement below before submitting your company consultation.',
    fields: [
      { id: 'consent_ack', label: 'I voluntarily agree to participate in this industry consultation and understand that the information provided may be used for the Bengal Electrical Industry — Market Growth & Export Study. I understand that any identifiable company information will be handled in accordance with the agreed confidentiality and attribution arrangements.', type: 'consent', required: true },
    ],
  },
];

export const infrastructureOptions: string[] = [];
