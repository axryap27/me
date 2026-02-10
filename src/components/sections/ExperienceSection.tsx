export function ExperienceSection() {
  const experiences = [
    {
      title: "Research Assistant",
      company: "Northwestern Computer Science Department",
      period: "Feb 2026 - Present",
      description: "Adaptive/dual process reasoning in diffusion models",
      technologies: [],
      logo: "/images/cs_research.png",
    },
    {
      title: "Digital Design Engineer",
      company: "IEEE Northwestern Branch",
      period: "Jan 2026 - Present",
      description: "AXI-DMA Engine in SystemVerilog.",
      technologies: ["SystemVerilog", "AXI4-Lite", "Shell"],
      logo: "/images/northwestern_university_ieee_student_branch_logo.jpeg",
    },
    {
      title: "Software Engineer Intern",
      company: "Shelter Rock Management",
      period: "June 2025 - Aug 2025",
      description: "Equity analysis and portfolio backtesting.",
      technologies: ["Python", "Jupyter", "Alpaca API", "Pandas"],
      logo: "/images/shelter-rock.png",
    },
    {
      title: "Software Developer Intern",
      company: "Alpime Health",
      period: "Oct 2024 - April 2025",
      description: "ML/Backend & Web Development.",
      technologies: ["Python", "Google Cloud Document AI", "React", "TypeScript", "REST APIs"],
      logo: "/images/alpime-health.png",
    },
    {
      title: "Researcher",
      company: "Queens College",
      period: "Sept 2022 - Feb 2024",
      description: "α-attractor models in Inflationary Cosmology.",
      technologies: ["Python", "Jupyter", "HACC", "PolyChord"],
      logo: "/images/queens-college.png",
    },
  ];

  return (
    <section id="experience" className="py-24 bg-black text-white">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              EXPERIENCE
            </h2>
            <p className="text-base text-gray-400">
              Professional journey and key accomplishments.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-12 border-l-2 border-gray-800 hover:border-gray-600 transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full border-4 border-black" />

                <div className="flex gap-4 items-start">
                  {/* Company Logo */}
                  {exp.logo && (
                    <div className="flex-shrink-0">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-[60px] h-[60px] object-contain rounded-lg bg-white/5 p-1.5"
                      />
                    </div>
                  )}

                  {/* Experience Details */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-base text-gray-400 mb-1">{exp.company}</div>
                      <div className="text-xs text-gray-500">{exp.period}</div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
