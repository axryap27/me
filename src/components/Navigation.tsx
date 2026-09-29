import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { EASE_OUT } from '@/components/motion/primitives';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeSection?: string;
}

type NavItem = { id: string; label: string; section?: string; path?: string };

const items: NavItem[] = [
  { id: 'experience', label: 'Experience', section: 'experience' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'books', label: 'Books', path: '/books' },
  { id: 'art', label: 'Art', path: '/art' },
  { id: 'contact', label: 'Contact', section: 'contact' },
];

export function Navigation({ activeSection }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 4 && !menuOpen);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (item: NavItem) => {
    setMenuOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    if (location.pathname === '/') {
      document.getElementById(item.section!)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: item.section } });
    }
  };

  const isActive = (item: NavItem) =>
    item.path ? location.pathname.startsWith(item.path) : location.pathname === '/' && activeSection === item.section;

  const current = items.find(isActive)?.id;
  const highlighted = hovered ?? current;

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'transition-[background-color,backdrop-filter,border-color,padding] duration-500',
            scrolled || menuOpen
              ? 'border-b border-white/5 bg-[#070908]/70 py-3 backdrop-blur-xl'
              : 'border-b border-transparent py-6',
          )}
        >
          <div className="container mx-auto flex items-center justify-between px-6">
            <Link
              to="/"
              className="group flex items-center"
              onClick={() => {
                setMenuOpen(false);
                if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="/images/favicon.png"
                alt=""
                className="h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[-8deg]"
              />
              <span className="ml-3 font-inter-tight text-sm font-bold tracking-wide text-white">{site.name}</span>
              <span className="mx-3 hidden h-4 w-px bg-gray-700 sm:block" />
              <span className="hidden font-space-mono text-xs text-gray-400 sm:block">{site.tagline}</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item)}
                  onMouseEnter={() => setHovered(item.id)}
                  className={cn(
                    'relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300',
                    isActive(item) || hovered === item.id ? 'text-white' : 'text-gray-400',
                  )}
                >
                  {highlighted === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn(
                        'absolute inset-0 rounded-full border',
                        hovered === item.id && !isActive(item)
                          ? 'border-white/10 bg-white/[0.04]'
                          : 'border-white/15 bg-white/[0.08]',
                      )}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="absolute h-px w-5 bg-white"
                animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute h-px w-5 bg-white"
                animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#070908]/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.15 } }}
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                  }}
                >
                  <button
                    onClick={() => go(item)}
                    className={cn(
                      'flex w-full items-baseline gap-4 py-2 text-left font-inter-tight text-4xl font-semibold tracking-tight',
                      isActive(item) ? 'text-white' : 'text-gray-500',
                    )}
                  >
                    <span className="font-space-mono text-xs text-gray-600">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
