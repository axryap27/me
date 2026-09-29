import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { EASE_OUT } from '@/components/motion/primitives';
import { experience } from '@/data/experience';

export function ExperienceSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            index="01"
            eyebrow="Experience"
            title="Where I've worked"
            description="Research, internships, and the teams I've learned from."
          />

          <div ref={listRef} className="relative">
            {/* Track + animated progress line */}
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 md:left-[199px]" />
            <motion.div
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-moss-light via-moss to-pacific md:left-[199px]"
              style={{ scaleY: progress }}
            />

            <div className="space-y-4">
              {experience.map((exp, i) => {
                const current = exp.end === 'Present';
                return (
                  <motion.div
                    key={exp.role + exp.org}
                    className="group relative grid gap-3 pl-9 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: EASE_OUT }}
                  >
                    {/* Dot */}
                    <motion.span
                      className="absolute left-0 top-7 h-[11px] w-[11px] rounded-full border-2 border-black md:left-[194px]"
                      initial={{ backgroundColor: 'rgb(55 65 81)', scale: 0.6 }}
                      whileInView={{ backgroundColor: 'rgb(255 255 255)', scale: 1 }}
                      viewport={{ once: true, margin: '0px 0px -40% 0px' }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                      {current && <span className="absolute -inset-1 rounded-full border border-moss-light/50" />}
                    </motion.span>

                    {/* Period */}
                    <div className="pt-6 font-space-mono text-xs text-gray-500 md:pr-10 md:text-right">
                      {exp.start && (
                        <>
                          {exp.start} — <span className={current ? 'text-moss-light' : ''}>{exp.end}</span>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-transparent p-0 transition-colors duration-500 md:ml-8 md:p-6 md:group-hover:border-white/10 md:group-hover:bg-white/[0.02]">
                      <div className="flex items-start gap-4">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt=""
                            className="h-12 w-12 flex-shrink-0 rounded-xl bg-white/5 object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-inter-tight text-lg font-semibold text-gray-300 transition-transform duration-500 group-hover:scale-105">
                            {exp.org.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-inter-tight text-xl font-semibold tracking-tight text-white">{exp.role}</h3>
                          <div className="mt-0.5 text-sm text-gray-400">{exp.org}</div>
                        </div>
                      </div>

                      <p className="mt-4 text-[15px] leading-relaxed text-gray-300">{exp.summary}</p>

                      {exp.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-500" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {exp.stack.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.stack.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
