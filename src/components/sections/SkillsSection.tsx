import { Scene3D } from '../3d/Scene3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js/WebGL", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      title: "Backend Development", 
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "GraphQL", level: 80 },
        { name: "PostgreSQL", level: 85 },
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "AWS", level: 80 },
        { name: "Docker", level: 85 },
        { name: "Git", level: 95 },
        { name: "CI/CD", level: 80 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D showSkills={true} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
              Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and areas of expertise, 
              built through years of hands-on experience and continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="glass hover:glow-primary transition-smooth">
                <CardHeader>
                  <CardTitle className="text-center text-secondary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-muted"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">20+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}