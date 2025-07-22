import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio showcasing Three.js capabilities with smooth animations and responsive design.",
      tech: ["Three.js", "React", "TypeScript", "GSAP"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates, team collaboration, and analytics.",
      tech: ["Next.js", "Prisma", "WebSockets", "Tailwind"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "AI Chat Assistant",
      description: "Intelligent chatbot with natural language processing and context-aware responses.",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Crypto Trading Dashboard",
      description: "Real-time cryptocurrency trading dashboard with portfolio tracking and market analysis.",
      tech: ["Vue.js", "D3.js", "WebSockets", "Express"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Social Media Platform",
      description: "Modern social media platform with real-time messaging, media sharing, and social features.",
      tech: ["React Native", "GraphQL", "MongoDB", "AWS"],
      image: "/api/placeholder/400/300",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my recent work, demonstrating expertise in modern web technologies 
              and innovative problem-solving approaches.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="glass hover:glow-primary transition-smooth group overflow-hidden">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-primary opacity-50">⚡</div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-secondary group-hover:text-primary transition-smooth">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-primary text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button size="sm" className="gradient-primary text-primary-foreground glow-primary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-secondary">More Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="glass hover:glow-secondary transition-smooth group">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-secondary transition-smooth">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs border-muted-foreground text-muted-foreground">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary-foreground hover:bg-secondary">
                        <Github className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
