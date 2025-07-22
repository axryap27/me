import { ProjectCarousel } from "@/components/ui/ProjectCarousel";

export function ProjectsSection() {
  const projects = [
    {
      title: "Atlas: Fitness tracking made fun",
      description: "Full-stack cross-platform mobile application designed to gamify fitness tracking and progression.",
      tech: ["React Native", "Node.js", "Javascript", "PostgreSQL", "REST APIs"],
      category: "Mobile Development",
      year: "2025",
      githubUrl: "#",
    },
    {
      title: "Python Debugger Engine",
      description: "High-performance debugging tool built in C++ for Python programs, featuring advanced breakpoint management and memory analysis.",
      tech: ["C++", "C", "Python", "Data Structures"],
      category: "Fundamentals",
      year: "2025",
      githubUrl: "#",
    },
    {
      title: "Apollo File Manager",
      description: "AI-powered file management system for small businesses with intelligent organization and automated workflow optimization.",
      tech: ["TypeScript", "React", "Node.js", "AI", "Python"],
      category: "Agents and backend systems",
      year: "2025",
      githubUrl: "#",
    },
    {
      title: "Mini-Ethereum",
      description: "Scalable real-time messaging platform with end-to-end encryption and microservices architecture.",
      tech: ["Python", "Cryptography", "Blockchain"],
      category: "Backend Systems",
      year: "2023",
      githubUrl: "#",
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
              A collection of projects showcasing my expertise in full-stack development, 
              systems programming, and innovative problem-solving.
            </p>
          </div>

          {/* Project Carousel */}
          <ProjectCarousel projects={projects} />
        </div>
      </div>
    </section>
  );
}
