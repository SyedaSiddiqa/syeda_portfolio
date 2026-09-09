import professionalPhoto from './images/professional-photo.jpeg';
import furniroImage from './images/furniro.png';
import animateduiImage from './images/animatedui.png';
import smartImage from './images/smart.png';
import mediqueueImage from './images/mediqueue.png';
import aivoicecontImage from './images/aivoicecont.png';
import websimpleImage from './images/websimple.png';
import halloweenImage from './images/halloween.png';
import netflixImage from './images/netflix.png';
import ecocarsImage from './images/ecocars.png';




import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Check,
  Loader2,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THEMES = {
  dark: {
    bg: '#0A0A0A',
    bgSecondary: '#111111',
    card: '#171717',
    text: '#FAFAF7',
    textSecondary: '#A3A3A3',
    accent: '#F4D06F',
    accentLight: '#FFE8A3',
    accentHover: '#E8BD4A',
    border: '#292929',
  },
  light: {
    bg: '#fff4d4',
    bgSecondary: '#FFF9E8',
    card: '#FFFFFF',
    text: '#171717',
    textSecondary: '#666666',
    accent: '#D9A928',
    accentLight: '#F4D06F',
    accentHover: '#B88A18',
    border: '#E8E1D2',
  },
};

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

/*
   Shared: 3D tilt hook
*/
function useTilt(strength = 12) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [strength, -strength]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-strength, strength]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    rotateX,
    rotateY,
    onMouseMove,
    onMouseLeave,
  };
}

/*
   Preloader — 1% to 100% (always black + butter, brand moment)
*/
const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 2100;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      setCount(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 350);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
      style={{ backgroundColor: '#0A0A0A' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="font-display loader-count text-7xl md:text-8xl font-light tracking-tight"
          style={{ color: '#FAFAF7' }}
        >
          {count}
          <span style={{ color: '#F4D06F' }}>%</span>
        </div>

        <div
          className="mt-6 text-xs tracking-[0.2em]"
          style={{ color: '#A3A3A3' }}
        >
          loading portfolio
        </div>

        <div
          className="mt-8 h-[2px] w-56 md:w-72 overflow-hidden rounded-full"
          style={{ backgroundColor: '#292929' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${count}%`,
              backgroundColor: '#F4D06F',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/*
   Navbar
*/
const Navbar = () => {
  const { isDark, toggleTheme, c } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    'Home',
    'About',
    'Skills',
    'Projects',
    'Journey',
    'Contact',
  ];

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: `${c.bg}CC`,
        borderColor: c.border,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="font-display text-2xl font-semibold"
          style={{ color: c.text }}
        >
          Syeda Siddiqa
          <span style={{ color: c.accent }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium"
              style={{ color: c.textSecondary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = c.text)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = c.textSecondary)
              }
            >
              {item}
            </a>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border"
            style={{
              borderColor: c.border,
              color: c.accent,
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border"
            style={{
              borderColor: c.border,
              color: c.accent,
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: c.text }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t overflow-hidden"
            style={{
              backgroundColor: c.bgSecondary,
              borderColor: c.border,
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="py-2 font-medium border-b last:border-none"
                  style={{
                    color: c.text,
                    borderColor: c.border,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/*
   Hero — parallax blobs, animated underline, floating
   particles, rotating ring, 3D tilt card
*/
const headline = [
  'Frontend',
  'Developer',
  '&',
  'Undergraduate',
  'Software',
  'Engineer',
];

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 4 + (i % 3) * 3,
  delay: i * 0.35,
  duration: 4 + (i % 4),
}));

const Hero = () => {
  const { c } = useTheme();
  const tilt = useTilt(10);
  const sectionRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const blobAX = useSpring(
    useTransform(mx, [-0.5, 0.5], [-24, 24]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const blobAY = useSpring(
    useTransform(my, [-0.5, 0.5], [-24, 24]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const blobBX = useSpring(
    useTransform(mx, [-0.5, 0.5], [20, -20]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const blobBY = useSpring(
    useTransform(my, [-0.5, 0.5], [20, -20]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const handleSectionMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();

    mx.set(
      (e.clientX - rect.left) / rect.width - 0.5
    );

    my.set(
      (e.clientY - rect.top) / rect.height - 0.5
    );
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: c.bg }}
    >
      <motion.div
        className="blob-a absolute w-[26rem] h-[26rem] rounded-full blur-3xl opacity-30"
        style={{
          background: c.accent,
          top: '-6rem',
          left: '-6rem',
          x: blobAX,
          y: blobAY,
        }}
      />

      <motion.div
        className="blob-b absolute w-[22rem] h-[22rem] rounded-full blur-3xl opacity-20"
        style={{
          background: c.accentLight,
          bottom: '-4rem',
          right: '-4rem',
          x: blobBX,
          y: blobBY,
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: c.accent,
            opacity: 0.5,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-[1.3fr_1fr] gap-16 items-center w-full">
        {/* Left: headline */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium mb-5"
            style={{ color: c.accentHover }}
          >
            Portfolio
          </motion.p>

          <h1
            className="font-display text-5xl md:text-6xl leading-[1.05] mb-2"
            style={{ color: c.text }}
          >
            <span className="block">
              Hi, I'm Syeda Siddiqa
            </span>

            <span className="relative inline-block">
              <span
                className="block font-normal italic"
                style={{ color: c.textSecondary }}
              >
                I build interfaces
              </span>

              <svg
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 w-full h-3"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 Q 80 2, 150 7 T 298 6"
                  fill="none"
                  stroke={c.accent}
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1.1,
                    duration: 0.9,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            </span>

            <span className="block mt-2">
              that feel alive.
            </span>
          </h1>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-6 mb-8">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4 + i * 0.08,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="text-lg"
                style={{
                  color:
                    word === '&'
                      ? c.accent
                      : c.textSecondary,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
            }}
            className="max-w-md mb-10"
            style={{ color: c.textSecondary }}
          >
            15+ projects delivered with React, Tailwind,
            and motion design that makes products feel
            considered, not just functional.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.05,
              duration: 0.5,
            }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
              style={{
                backgroundColor: c.accent,
                color: '#0A0A0A',
              }}
            >
              View my work

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border"
              style={{
                borderColor: c.border,
                color: c.text,
              }}
            >
              Let's talk
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-4 mt-10"
          >
            {[Github, Linkedin, Mail].map(
              (Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{
                    scale: 1.15,
                    rotate: 6,
                  }}
                  className="p-2.5 rounded-full border"
                  style={{
                    borderColor: c.border,
                    color: c.textSecondary,
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              )
            )}
          </motion.div>
        </div>

        {/* Right: 3D tilt card + rotating ring */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            rotate: -4,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="tilt-wrap hidden md:block relative"
        >
          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -inset-6 rounded-full border-2 border-dashed pointer-events-none"
            style={{
              borderColor: `${c.accent}55`,
            }}
          />

          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              backgroundColor: c.card,
              borderColor: c.border,
            }}
            className="tilt-card relative aspect-[4/5] rounded-3xl border p-8 flex flex-col justify-between shadow-2xl"
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${c.accentLight}, transparent 60%)`,
              }}
            />

            <div className="relative flex items-center justify-between">
              <span
                className="text-xs tracking-wide"
                style={{ color: c.textSecondary }}
              >
                Available for work
              </span>

              <motion.span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: c.accent,
                }}
                animate={{
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
              />
            </div>

            <div className="relative">
              <div
                className="font-display text-4xl mb-2"
                style={{ color: c.text }}
              >
                Syeda
              </div>

              <p
                className="text-sm"
                style={{ color: c.textSecondary }}
              >
                React &middot; Tailwind &middot; GSAP
                &middot; Framer Motion
              </p>
            </div>

            <div className="relative grid grid-cols-3 gap-3">
              {[
                ['15+', 'Projects'],
                ['3+', 'Years'],
                ['100%', 'Happy'],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl px-3 py-3"
                  style={{
                    backgroundColor: c.bgSecondary,
                  }}
                >
                  <div
                    className="font-display text-xl"
                    style={{
                      color: c.accentHover,
                    }}
                  >
                    {v}
                  </div>

                  <div
                    className="text-[11px]"
                    style={{
                      color: c.textSecondary,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs"
        style={{ color: c.textSecondary }}
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >
        scroll

        <span
          className="w-px h-8"
          style={{ backgroundColor: c.border }}
        />
      </motion.a>
    </section>
  );
};

/*
   Marquee strip
*/
const Marquee = () => {
  const { c } = useTheme();

  const items = [
    'React',
    'Tailwind CSS',
    'TypeScript',
    'GSAP',
    'Framer Motion',
    'Next.js',
    'Figma',
    'Accessibility',
  ];

  const row = [...items, ...items];

  return (
    <div
      className="marquee-row border-y py-4 overflow-hidden"
      style={{
        backgroundColor: c.bgSecondary,
        borderColor: c.border,
      }}
    >
      <div className="marquee-track flex gap-10 w-max">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl whitespace-nowrap"
            style={{ color: c.textSecondary }}
          >
            {item}{' '}
            <span style={{ color: c.accent }}>
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

/*
   About
*/
const About = () => {
  const { c } = useTheme();
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      label: 'Projects',
      value: '9+',
    },
    {
      label: 'Years experience',
      value: '3+',
    },
    {
      label: 'Happy clients',
      value: '100%',
    },
  ];

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-24 px-6"
      style={{ backgroundColor: c.bg }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="about-reveal">
          {/* Professional Photo */}
          <div
            className="relative aspect-square rounded-3xl overflow-hidden border"
            style={{
              backgroundColor: c.bgSecondary,
              borderColor: c.border,
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${c.accentLight}, transparent 60%)`,
              }}
            />

            <img
              src={professionalPhoto}
              alt="Syeda Siddiqa - Professional Photo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <p
            className="about-reveal text-sm font-medium mb-3"
            style={{ color: c.accentHover }}
          >
            About me
          </p>

          <h2
            className="about-reveal font-display text-4xl md:text-5xl mb-6"
            style={{ color: c.text }}
          >
            Undergraduate software engineer,
            <br />
            detail-obsessed builder.
          </h2>

          <p
            className="about-reveal mb-5 max-w-lg"
            style={{ color: c.textSecondary }}
          >
            I'm an undergraduate software engineering
            student and frontend developer who cares as
            much about how an interface feels as how it
            functions. Across 9+ projects and three years
            of practice, I've learned that the smallest
            transition is often what makes a product
            memorable.
          </p>

          <p
            className="about-reveal mb-8 max-w-lg"
            style={{ color: c.textSecondary }}
          >
            I'm currently pursuing MERN stack development
            alongside my degree, with a toolkit centered
            on React, Tailwind CSS, GSAP, and Framer
            Motion — built to ship interfaces that are
            fast, accessible, and genuinely pleasant to
            use.
          </p>

          <div className="about-reveal grid grid-cols-3 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border px-4 py-4"
                style={{
                  borderColor: c.border,
                  backgroundColor: c.card,
                }}
              >
                <div
                  className="font-display text-2xl"
                  style={{
                    color: c.accentHover,
                  }}
                >
                  {s.value}
                </div>

                <div
                  className="text-xs mt-1"
                  style={{
                    color: c.textSecondary,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="about-reveal inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium"
            style={{
              backgroundColor: c.accent,
              color: '#0A0A0A',
            }}
          >
            Work with me
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

/*
   Skills
*/
const Skills = () => {
  const { c } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      category: 'Frontend',
      skills: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML/CSS',
        'Tailwind CSS',
        'Bootstrap',
        'Next.js',
      ],
    },
    {
      category: 'Languages',
      skills: [
        'Java',
        'C++',
        'Python',
        'JavaScript',
      ],
    },
    {
      category: 'Animation',
      skills: [
        'GSAP',
        'Framer Motion',
        'CSS Animations',
      ],
    },
    {
      category: 'Tools',
      skills: [
        'Vite',
        'Git',
        'VS Code',
        'Figma',
        'npm',
      ],
    },
    {
      category: 'Performance',
      skills: [
        'Responsive Design',
        'Optimization',
        'SEO',
        'Accessibility',
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-6"
      style={{ backgroundColor: c.bgSecondary }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-4xl md:text-5xl mb-14"
          style={{ color: c.text }}
        >
          Skills &amp; expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.category}
              whileHover={{ y: -6 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className="skill-card p-6 rounded-2xl border"
              style={{
                borderColor: c.border,
                backgroundColor: c.card,
              }}
            >
              <h3
                className="font-display text-xl mb-4"
                style={{
                  color: c.accentHover,
                }}
              >
                {cat.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors"
                    style={{
                      backgroundColor: c.bgSecondary,
                      color: c.text,
                      borderColor: c.border,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        c.accent;
                      e.currentTarget.style.color =
                        c.accentHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        c.border;
                      e.currentTarget.style.color =
                        c.text;
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
/* 
   Projects — tilt + scale
 */
const ProjectCard = ({ project }) => {
  const { c } = useTheme();
  const tilt = useTilt(6);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        backgroundColor: c.card,
        borderColor: c.border,
      }}
      className="group rounded-3xl border overflow-hidden"
    >
      {/* Project Image */}
      <div
        className="h-52 relative overflow-hidden"
        style={{ backgroundColor: c.bg }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Clickable Hover Arrow */}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
            aria-label={`Open live demo for ${project.title}`}
          >
            <ArrowUpRight
              className="text-white"
              size={28}
            />
          </a>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3
          className="font-display text-xl mb-2"
          style={{ color: c.text }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm mb-4"
          style={{ color: c.textSecondary }}
        >
          {project.desc}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: c.bgSecondary,
                color: c.accentHover,
                borderColor: c.border,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Demo + Code Buttons */}
        <div className="flex gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg text-sm font-medium text-center"
            style={{
              backgroundColor: c.accent,
              color: '#0A0A0A',
            }}
          >
            Demo
          </a>

          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg text-sm font-medium border text-center"
            style={{
              borderColor: c.border,
              color: c.text,
            }}
          >
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};


/* 
   Featured Projects
 */
const FeaturedProjects = () => {
  const { c } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-fade', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.6,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Furniro-Web',
      desc: 'A fully responsive, multi-page furniture e-commerce website built with vanilla HTML, CSS, and JavaScript, featuring GSAP animations and a functional localStorage-based cart system.',
      tech: [
        'Vanilla JavaScript',
        'CSS',
        'localStorage',
        'GSAP 3',
        'ScrollTrigger',
      ],
      image: furniroImage,
      demo: 'https://furniro-clone.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/furniro-clone-',
    },

    {
      title: 'Responsive-landingpage-animated-ui',
      desc: 'A production-grade animated React UI system built with Framer Motion, featuring consistent design tokens, smooth spring animations, and modular components like navbar, hero, feature grid, testimonials, accordion, modal, and sidebar.',
      tech: [
        'React',
        'Framer Motion',
        'JavaScript',
        'Tailwind CSS',
      ],
      image: animateduiImage,
      demo: 'https://responsive-landingpage-animated-ui.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/Nexe-agent-Internship/tree/master/nexus-ui',
    },

    {
      title: 'Smart-study-sheduler-project',
      desc: 'A single-file, client-side web application that helps students plan exam study sessions by resolving overlapping time blocks using classical scheduling algorithms.',
      tech: [
        'JavaScript',
        'HTML',
        'CSS',
        'Bootstrap',
      ],
      image: smartImage,
      demo: 'https://smart-study-sheduler-project.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/smart-study-sheduler',
    },

    {
      title: 'Mediqueue-smartclinic-queue-system',
      desc: 'MediQueue is a web-based smart queue management system designed to solve the problem of long and unorganized waiting times in clinics and small healthcare centers. Built using only HTML, CSS, and JavaScript.',
      tech: [
        'JavaScript',
        'localStorage',
        'CSS3',
      ],
      image: mediqueueImage,
      demo: 'https://mediqueue-smartclinic-queue-system.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/MediQueue-Smart-Clinic-Queue-System',
    },

    {
      title: 'Eco-cars-motor',
      desc: 'A fully responsive frontend clone of the Eco Cars Motor Company website, built using HTML, CSS, and JavaScript. This project recreates the original website layout, design, and user interface.',
      tech: [
        'JavaScript',
        'CSS',
        'HTML5',
      ],
      image: ecocarsImage,
      demo: 'https://eco-cars11.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/Eco-cars-motor',
    },

    {
      title: 'AI-Voice-Controlled-Virtual-Assistant-Java',
      desc: 'An AI-based Voice-Controlled Virtual Assistant developed in Java that allows users to interact with their computer using voice or text commands.',
      tech: [
        'Java',
        'VoskAPI',
        'JavaFX',
      ],
      image: aivoicecontImage,
      demo: 'https://www.linkedin.com/posts/syeda-siddiqa-abid_ai-voiceassistant-java-activity-7418334764857909250-SM-D?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFcyg1sB-wKs0ejDPmQzlpK0aatfcvxlml4',
      code: 'https://github.com/SyedaSiddiqa/AI-Voice-Controlled-Virtual-Assistant-Java-',
    },

    {
      title: 'WebSimple-Design',
      desc: 'A modern business growth website built with HTML and CSS, designed to showcase digital services such as web development, SEO, social media management, and AI solutions.',
      tech: [
        'HTML',
        'CSS',
        'JavaScript',
        'Bootstrap',
      ],
      image: websimpleImage,
      demo: 'https://websimple-design.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/WebSimple-Design',
    },

    {
      title: 'Halloween-websiteee',
      desc: 'A responsive Halloween-themed website built with HTML, CSS, and Bootstrap, featuring Flexbox, Grid layouts, animations, and smooth transitions for an interactive UI experience.',
      tech: [
        'JavaScript',
        'CSS',
        'HTML',
      ],
      image: halloweenImage,
      demo: 'https://halloween-websiteee.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/Halloween-Website-',
    },

    {
      title: 'Netflix-Landing-page-clone',
      desc: 'A Netflix-inspired clone website featuring a clean landing page and a user-friendly signup flow, designed to replicate the look and feel of a modern streaming platform using responsive frontend design.',
      tech: [
        'JavaScript',
        'HTML',
        'CSS',
      ],
      image: netflixImage,
      demo: 'https://stellular-griffin-94d997.netlify.app/',
      code: 'https://github.com/SyedaSiddiqa/Netflix-Landing-page-clone',
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6"
      style={{ backgroundColor: c.bg }}
    >
      <div className="max-w-6xl mx-auto">

        <h2
          className="font-display text-4xl md:text-5xl mb-14"
          style={{ color: c.text }}
        >
          Featured projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              className="project-fade"
              key={p.title}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


/* 
   Journey / Experience
 */
const Experience = () => {
  const { c } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.6,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: '2022',
      title: 'Learning Java & Python',
      desc: 'Started with core programming fundamentals and OOP concepts.',
    },
    {
      year: '2022',
      title: 'JavaScript & React basics',
      desc: 'Moved into web development with JavaScript and React JS.',
    },
    {
      year: '2023',
      title: 'React JS developer',
      desc: 'Built full applications and reusable component systems in React.',
    },
    {
      year: '2024',
      title: 'Animations with Tailwind & GSAP',
      desc: 'Learned motion design using Tailwind CSS and GSAP.',
    },
    {
      year: '2025',
      title: 'Responsive design',
      desc: 'Focused on responsive, accessible layouts across devices.',
    },
    {
      year: '2026',
      title: 'Modern UI developer',
      desc: '9+ projects completed, currently pursuing MERN stack development.',
    },
  ];

  return (
    <section
      id="journey"
      ref={ref}
      className="py-24 px-6"
      style={{ backgroundColor: c.bgSecondary }}
    >
      <div className="max-w-3xl mx-auto">

        <h2
          className="font-display text-4xl md:text-5xl mb-14"
          style={{ color: c.text }}
        >
          My journey
        </h2>

        <div
          className="relative pl-8 border-l"
          style={{ borderColor: c.border }}
        >
          {timeline.map((item, i) => (
            <div
              key={i}
              className="timeline-item relative pb-12 last:pb-0"
            >
              <span
                className="absolute -left-[2.35rem] top-1 w-3.5 h-3.5 rounded-full ring-4"
                style={{
                  backgroundColor: c.accent,
                  boxShadow: `0 0 0 4px ${c.bgSecondary}`,
                }}
              />

              <div
                className="font-display text-2xl mb-1"
                style={{ color: c.accentHover }}
              >
                {item.year}
              </div>

              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: c.text }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm"
                style={{ color: c.textSecondary }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


/* 
   Contact — spotlight + floating labels + animated submit
 */
const Contact = () => {
  const { c } = useTheme();
  const panelRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const handleMouseMove = (e) => {
    const rect = panelRef.current.getBoundingClientRect();

    panelRef.current.style.setProperty(
      '--mx',
      `${e.clientX - rect.left}px`
    );

    panelRef.current.style.setProperty(
      '--my',
      `${e.clientY - rect.top}px`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status !== 'idle') return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('done');
    }, 1400);

    setTimeout(() => {
      setStatus('idle');
    }, 3600);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ backgroundColor: c.bg }}
    >
      <div className="max-w-5xl mx-auto">

        <h2
          className="font-display text-4xl md:text-5xl mb-14"
          style={{ color: c.text }}
        >
          Get in touch
        </h2>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10">

          {/* Contact Form */}
          <div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            className="spotlight-panel rounded-3xl border p-8 md:p-10"
            style={{
              borderColor: c.border,
              backgroundColor: c.card,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative space-y-7"
            >

              <div className="grid sm:grid-cols-2 gap-7">

                <div className="field">
                  <input
                    type="text"
                    placeholder=" "
                    required
                  />
                  <label>Name</label>
                  <span className="underline" />
                </div>

                <div className="field">
                  <input
                    type="email"
                    placeholder=" "
                    required
                  />
                  <label>Email</label>
                  <span className="underline" />
                </div>

              </div>

              <div className="field">
                <input
                  type="text"
                  placeholder=" "
                  required
                />
                <label>Subject</label>
                <span className="underline" />
              </div>

              <div className="field">
                <textarea
                  rows="4"
                  placeholder=" "
                  required
                />
                <label>Message</label>
                <span className="underline" />
              </div>

              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileHover={
                  status === 'idle'
                    ? { scale: 1.02 }
                    : {}
                }
                whileTap={
                  status === 'idle'
                    ? { scale: 0.98 }
                    : {}
                }
                className="w-full py-3.5 rounded-full font-medium flex items-center justify-center gap-2"
                style={{
                  backgroundColor: c.accent,
                  color: '#0A0A0A',
                  opacity: status === 'idle' ? 1 : 0.9,
                }}
              >

                <AnimatePresence
                  mode="wait"
                  initial={false}
                >

                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send message
                    </motion.span>
                  )}

                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending
                    </motion.span>
                  )}

                  {status === 'done' && (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check
                        size={18}
                        className="pop-check"
                      />
                      Sent
                    </motion.span>
                  )}

                </AnimatePresence>

              </motion.button>

            </form>
          </div>


          {/* Social / Contact Links */}
          <div className="space-y-4">

            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'syedasiddiqaabid@gmail.com',
                href: 'mailto:syedasiddiqaabid@gmail.com',
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'www.linkedin.com/in/syeda-siddiqa-abid',
                href: 'https://www.linkedin.com/in/syeda-siddiqa-abid',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'https://github.com/SyedaSiddiqa',
                href: 'https://github.com/SyedaSiddiqa',
              },
            ].map((c2) => {

              const Icon = c2.icon;

              return (
                <motion.a
                  href={c2.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={c2.label}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border"
                  style={{
                    borderColor: c.border,
                    backgroundColor: c.card,
                  }}
                >

                  <div
                    className="p-2.5 rounded-full"
                    style={{
                      backgroundColor: c.bgSecondary,
                      color: c.accentHover,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div>

                    <div
                      className="text-xs"
                      style={{
                        color: c.textSecondary,
                      }}
                    >
                      {c2.label}
                    </div>

                    <div
                      className="font-medium"
                      style={{ color: c.text }}
                    >
                      {c2.value}
                    </div>

                  </div>

                </motion.a>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
};


/* 
   Footer
 */
const Footer = () => {
  const { c } = useTheme();

  return (
    <footer
      className="border-t py-10 px-6"
      style={{
        borderColor: c.border,
        backgroundColor: c.bg,
      }}
    >
      <div className="max-w-6xl mx-auto text-center">

        <p
          className="font-display text-lg mb-1"
          style={{ color: c.text }}
        >
          Built with React, Tailwind, GSAP &amp; Framer Motion
        </p>

        <p
          className="text-sm"
          style={{ color: c.textSecondary }}
        >
          © 2026 Syeda Siddiqa. All rights reserved.
        </p>

      </div>
    </footer>
  );
};


/* ============================================================
   Back to Top
============================================================ */
const BackToTop = () => {
  const { c } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>

      {visible && (
        <motion.button
          type="button"
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 16,
          }}
          whileHover={{
            scale: 1.08,
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className="fixed bottom-8 right-8 p-3 rounded-full z-40 shadow-lg"
          style={{
            backgroundColor: c.accent,
            color: '#0A0A0A',
          }}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}

    </AnimatePresence>
  );
};


/* 
   App
 */
export default function App() {

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');

    return saved
      ? saved === 'dark'
      : true;
  });

  const [loading, setLoading] = useState(true);

  const c = THEMES[isDark ? 'dark' : 'light'];

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );

    localStorage.setItem(
      'theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  useEffect(() => {
    document.body.style.overflow =
      loading ? 'hidden' : 'auto';
  }, [loading]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme: () =>
          setIsDark((d) => !d),
        c,
      }}
    >

      <AnimatePresence>
        {loading && (
          <Preloader
            onDone={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          backgroundColor: c.bg,
          minHeight: '100vh',
          transition: 'background-color 0.4s ease',
        }}
      >

        <Navbar />

        <Hero />

        <Marquee />

        <About />

        <Skills />

        <FeaturedProjects />

        <Experience />

        <Contact />

        <Footer />

        <BackToTop />

      </div>

    </ThemeContext.Provider>
  );
}