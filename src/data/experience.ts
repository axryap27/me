export interface Experience {
  role: string;
  org: string;
  location?: string;
  start: string;
  end: string; // "Present" for current roles
  summary: string;
  highlights: string[];
  stack: string[];
  logo?: string;
}

export const experience: Experience[] = [
  {
    role: 'Quant Developer Intern',
    org: 'Hidden Road (Ripple Prime)',
    start: 'Jun 2026',
    end: 'Sep 2026',
    summary: 'Exchange reference data ingestion, automated data validation, and a backend service to deliver SVI model parameters for risk.',
    highlights: [],
    stack: ['Python', 'SQL', 'AWS', 'Snowflake', 'Apache Airflow'],
  },
  {
    role: 'Research Assistant',
    org: 'MAGICS Lab, Northwestern University',
    start: 'Feb 2026',
    end: 'Present',
    summary: 'Researching Joint-Embedding Predictive Architectures (JEPA) with a Ph.D. student.',
    highlights: [],
    stack: [],
    logo: '/images/cs_research.png',
  },
  {
    role: 'Digital Design Engineer',
    org: 'IEEE Student Branch, Northwestern University',
    start: 'Jan 2026',
    end: 'May 2026',
    summary: 'FPGA driver development and firmware for an AXI DMA engine.',
    highlights: [],
    stack: ['SystemVerilog', 'C', 'Python'],
    logo: '/images/northwestern_university_ieee_student_branch_logo.jpeg',
  },
  {
    role: 'Software Engineer Intern',
    org: 'Shelter Rock Management',
    start: 'Jun 2025',
    end: 'Aug 2025',
    summary: 'Portfolio analysis and backend risk software.',
    highlights: [],
    stack: ['Python', 'C++', 'Jupyter', 'Alpaca API'],
    logo: '/images/shelter-rock.png',
  },
  {
    role: 'Software Developer Intern',
    org: 'Alpime Health',
    start: 'Oct 2024',
    end: 'Apr 2025',
    summary: 'Scalable backend pipelines for document processing.',
    highlights: [],
    stack: ['Python', 'Google Cloud Platform', 'TypeScript', 'Firebase'],
    logo: '/images/alpime-health.png',
  },
];
