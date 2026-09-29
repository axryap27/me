import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { EASE_OUT, Magnetic, SplitText } from '@/components/motion/primitives';
import { TiltCard } from '@/components/ui/TiltCard';
import { experience } from '@/data/experience';
import { site } from '@/data/site';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease: EASE_OUT },
});

const current = experience.find((e) => e.end === 'Present');
const previous = experience.find((e) => e.end !== 'Present');

export function HomeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToNext = () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Photo */}
          <motion.div style={{ y: photoY }} className="flex-shrink-0">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 22px)', scale: 1.06 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
            >
              <TiltCard
                intensity={10}
                className="group overflow-hidden rounded-[22px] border border-white/10"
              >
                <div className="relative h-[380px] w-[290px] sm:h-[440px] sm:w-[340px]">
                  <img src="/images/profile.jpg" alt={site.name} className="h-full w-full object-cover" />
                  {/* Green edge accent, hover only */}
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-moss/80 opacity-0 shadow-[inset_0_0_18px_rgba(107,122,58,0.35)] transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

          {/* Intro */}
          <motion.div style={{ y: contentY }} className="w-full max-w-xl flex-1">
            <motion.div
              {...enter(0.5)}
              className="mb-6 font-space-mono text-[11px] uppercase tracking-[0.2em] text-gray-400"
            >
              Computer Engineering &amp; Math · Northwestern
            </motion.div>

            <h1 className="mb-6 font-inter-tight text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              <SplitText text={site.name} animateOnMount delay={0.55} stagger={0.08} />
            </h1>

            <motion.p {...enter(0.8)} className="mb-10 text-lg leading-relaxed text-gray-300">
              I'm a student at Northwestern studying Computer Engineering and Math, working across digital design, ML
              systems, and backend infrastructure.
            </motion.p>

            <motion.dl
              {...enter(0.95)}
              className="mb-10 grid grid-cols-[88px_1fr] gap-y-3 border-t border-white/10 pt-6 text-sm"
            >
              {current && (
                <>
                  <dt className="flex items-center gap-2 font-space-mono text-[11px] uppercase tracking-[0.15em] text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss-light" />
                    Now
                  </dt>
                  <dd className="text-gray-200">
                    {current.role} <span className="text-gray-500">·</span>{' '}
                    <span className="text-gray-400">{current.org}</span>
                  </dd>
                </>
              )}
              {previous && (
                <>
                  <dt className="pl-3.5 font-space-mono text-[11px] uppercase tracking-[0.15em] text-gray-500">Prev</dt>
                  <dd className="text-gray-200">
                    {previous.role} <span className="text-gray-500">·</span>{' '}
                    <span className="text-gray-400">{previous.org}</span>
                  </dd>
                </>
              )}
            </motion.dl>

            <motion.div {...enter(1.1)} className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.15}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#ecefe6] px-6 py-3 text-sm font-medium text-[#0b0f0c] transition-colors hover:bg-white"
                >
                  Get in touch
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.15}>
                <button
                  onClick={scrollToNext}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/35 hover:bg-white/5"
                >
                  View work
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
              {[
                { href: site.github, icon: Github, label: 'GitHub' },
                { href: site.linkedin, icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div style={{ opacity: fade }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={scrollToNext}
          aria-label="Scroll to experience"
          className="flex flex-col items-center gap-3 font-space-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 transition-colors hover:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="scroll-cue absolute left-0 top-0 h-4 w-px bg-white/70" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
