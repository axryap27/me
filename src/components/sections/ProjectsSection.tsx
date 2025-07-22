import { ProjectCarousel } from "@/components/ui/ProjectCarousel";

export function ProjectsSection() {
  const projects = [
    {
      title: "Atlas",
      description: "Full-stack cross-platform mobile application designed for socializing fitness tracking & progression.",
      tech: ["React Native", "Node.js", "Javascript", "PostgreSQL", "REST APIs"],
      category: "Mobile Development",
      year: "Currently Building",
      githubUrl: "https://github.com/axryap27/atlas",
    },
    {
      title: "Python Debugger Engine",
      description: "CLI Debugging tool built in C++ for NU Python programs, featuring a symbolic RAM system.",
      tech: ["C++", "C", "Python", "Data Structures"],
      category: "Introductory systems programming",
      year: "2025",
      githubUrl: "https://github.com/axryap27/python-debugger",
    },
    {
      title: "Apollo File Manager",
      description: "AI-powered file management system for small businesses with intelligent organization and automated workflow optimization.",
      tech: ["TypeScript", "React", "Node.js", "AI", "N8N"],
      category: "Agents and backend systems",
      year: "Currently building",
      githubUrl: "https://github.com/axryap27/apollo",
    },
    {
      title: "Mini-Ethereum",
      description: "Python-based mini-Ethereum with PoW blockchain, ECDSA wallets, and CLI for mining and transactions.",
      tech: ["Python", "Cryptography", "Blockchain"],
      category: "Backend Systems",
      year: "2024-2025",
      githubUrl: "https://github.com/axryap27/mini-ethereum",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-black text-white">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              SELECTED WORK
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              A collection of projects exploring full-stack development, my personal interest,
              and creative solutions to problems that matter to me.
            </p>
          </div>

          {/* Project Carousel */}
          <ProjectCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
