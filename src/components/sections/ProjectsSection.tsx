import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  const projects = [
    {
      title: "Atlas",
      description: "Full-stack cross-platform mobile application designed for socializing fitness tracking.",
      tech: ["React Native", "Node.js", "TypeScript", "Supabase", "REST APIs"],
      category: "Mobile App",
      year: "Currently Building",
      githubUrl: "https://github.com/axryap27/atlas",
      externalUrl: undefined,
      images: ["/images/atlas.png", "/images/atlas2.png", "/images/atlas4.png", "/images/atlas3.png"],
    },
    {
      title: "E.V.A.",
      description: "Embedded Virtual Assistant. Local LLM & voice AI assistant with OS access - Jarvis wannabe.",
      tech: ["Rust", "Objective C", "Swift", "Tauri 2.0", "Agentic AI"],
      category: "Backend systems, local AI agents, OS",
      year: "Currently Building",
      githubUrl: "https://github.com/axryap27/E.V.A.",
      externalUrl: undefined,
      images: ["/images/E.V.A.-mvp.png"],
    },
    {
      title: "Sentra",
      description: "VS Code extension that detects security risks in your codebase.",
      tech: ["Go", "TypeScript", "Local AI", "VS Code API"],
      category: "Developer Tools, Security",
      year: "Currently building",
      githubUrl: "https://github.com/axryap27/sentra",
      externalUrl: "https://marketplace.visualstudio.com/items?itemName=aaryapatel.sentra",
      images: ["/images/apollo-file-management.jpg"],
    },
    {
      title: "Python Debugger Engine",
      description: "CLI Debugging tool built in C++ for NU Python programs, featuring a symbolic RAM system.",
      tech: ["C++", "C", "Python", "Data Structures"],
      category: "Introductory systems programming",
      year: "May 2025",
      githubUrl: "https://github.com/axryap27/python-debugger",
      externalUrl: undefined,
      images: [],
    },
    {
      title: "Mini-Ethereum",
      description: "Python-based mini-Ethereum with PoW blockchain, ECDSA wallets, and CLI for mining and transactions.",
      tech: ["Python", "Cryptography", "Blockchain"],
      category: "Backend Systems, Blockchain Simulation",
      year: "Jan 2025 - Aug 2025",
      githubUrl: "https://github.com/axryap27/mini-ethereum",
      externalUrl: undefined,
      images: ["/images/mini-ethereum.png"],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-black text-white">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              SELECTED PROJECTS
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Exploring full-stack development, my personal interests,
              and creative solutions to problems that matter to me!
            </p>
          </div>

          {/* All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tech={project.tech}
                category={project.category}
                year={project.year}
                githubUrl={project.githubUrl}
                externalUrl={project.externalUrl}
                images={project.images}
                size={index === 0 ? 'phone' : 'square'}
                layout="vertical"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
