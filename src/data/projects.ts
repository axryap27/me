export type ProjectStatus = 'building' | 'shipped' | 'paused';
export type ProjectArea = 'Hardware' | 'ML' | 'Software';

export interface Project {
  title: string;
  summary: string;
  area: ProjectArea;
  category: string;
  period: string;
  status: ProjectStatus;
  stack: string[];
  github?: string;
  live?: string;
  images: string[];
  /** Show on the home page. */
  featured?: boolean;
  /** Screenshots are phone-shaped; render them fanned out instead of cropped. */
  phone?: boolean;
  /** CSS object-position for the cover image, e.g. 'right top'. */
  imagePosition?: string;
}

export const projects: Project[] = [
  {
    title: 'Verified RTL Synthesis Pipeline',
    summary: 'Claude agents that turn natural-language specs into formally verified Verilog via stepwise refinement.',
    area: 'ML',
    category: 'AI Agents · Formal Verification · RTL',
    period: '2026',
    status: 'shipped',
    stack: ['Python', 'Anthropic SDK', 'TLA+', 'C++', 'Verilog'],
    github: 'https://github.com/axryap27/verified-RTL-synthesis-pipeline',
    images: [],
    featured: true,
  },
  {
    title: 'AXI4-Lite DMA Engine',
    summary: 'Scatter-gather DMA between AXI4 memory and on-chip SRAM. Built on a team of 5.',
    area: 'Hardware',
    category: 'Digital Design · SoC · Firmware',
    period: '2026',
    status: 'shipped',
    stack: ['SystemVerilog', 'C', 'AXI4-Lite', 'Shell'],
    github: 'https://github.com/xuyizhou8129/axi-dma-engine',
    images: ['/images/axi4_dma.webp'],
    featured: true,
  },
  {
    title: 'ESP32 Audio Classifier',
    summary: 'Real-time music genre classification on an ESP32 with TensorFlow Lite.',
    area: 'ML',
    category: 'Edge ML · Embedded · DSP',
    period: '2026',
    status: 'shipped',
    stack: ['C++', 'Python', 'TensorFlow Lite'],
    github: 'https://github.com/axryap27/esp32-audio-classifier',
    images: ['/images/esp32_audio_classifier.jpg'],
    featured: true,
  },
  {
    title: 'Sentra',
    summary: 'VS Code extension that flags security risks using a local model.',
    area: 'Software',
    category: 'Developer Tools · Security',
    period: '2025',
    status: 'shipped',
    stack: ['Go', 'TypeScript', 'Local AI', 'VS Code API'],
    github: 'https://github.com/axryap27/sentra',
    live: 'https://marketplace.visualstudio.com/items?itemName=aaryapatel.sentra',
    images: ['/images/apollo-file-management.png'],
  },
  {
    title: 'Atlas',
    summary: 'Cross-platform social fitness tracking app.',
    area: 'Software',
    category: 'Mobile · Full-stack',
    period: '2025',
    status: 'paused',
    stack: ['React Native', 'Node.js', 'TypeScript', 'Supabase'],
    github: 'https://github.com/axryap27/atlas',
    images: ['/images/atlas.png', '/images/atlas2.png', '/images/atlas4.png'],
    phone: true,
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  building: 'In progress',
  shipped: 'Shipped',
  paused: 'Paused',
};
