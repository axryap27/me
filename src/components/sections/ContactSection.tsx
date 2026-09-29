import { ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Magnetic, Reveal, SplitText } from '@/components/motion/primitives';
import { site } from '@/data/site';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-32 md:py-44">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal blur={false} y={12}>
            <div className="mb-6 font-space-mono text-xs uppercase tracking-[0.2em] text-gray-500">Contact</div>
          </Reveal>
          <h2 className="font-inter-tight text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            <SplitText text="Get in touch." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-gray-400">
              Open to new opportunities, research, and collaborations. Email is the best way to reach me, and I'm always happy to chat.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center rounded-full bg-[#ecefe6] p-1 pl-6 text-[#0b0f0c]">
                <a href={`mailto:${site.email}`} className="group flex items-center gap-2 pr-4 text-sm font-medium">
                  {site.email}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <button
                  onClick={copy}
                  aria-label="Copy email address"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'check' : 'copy'}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {copied ? <Check className="h-4 w-4 text-moss-deep" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
            </div>
            <div className="flex gap-3">
              {[
                { href: site.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: site.github, icon: Github, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/5"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
