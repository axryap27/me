import { SectionHeader } from '@/components/layout/SectionHeader';
import { Stagger, StaggerItem } from '@/components/motion/primitives';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export function WorkSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-[68rem]">
          <SectionHeader
            index="02"
            eyebrow="Selected work"
            title="What I'm building"
            description="My most recent projects. The full gallery is on the projects page."
            action={{ label: `All projects (${projects.length})`, to: '/projects' }}
          />
          <Stagger
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.12}
          >
            {featured.map((p) => (
              <StaggerItem key={p.title} className="flex">
                <ProjectCard project={p} className="w-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
