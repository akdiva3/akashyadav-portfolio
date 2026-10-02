import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { portfolio } from "@/data/portfolio";
import type { ProfileDraft } from "@/lib/profile-ai.functions";
import portraitAsset from "@/asset/akash-yadav-portrait.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akash Yadav — Payment Specialist at RBL Bank" },
      { name: "description", content: "Portfolio of Akash Yadav, Payment Specialist at RBL Bank in Gurugram. Credit card operations, payment reconciliation, Finacle, VisionPLUS and CTS." },
      { property: "og:title", content: "Akash Yadav — Payment Specialist at RBL Bank" },
      { property: "og:description", content: "Explore Akash Yadav's professional profile, banking experience and payments expertise." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const viewport = { once: true, amount: .15 as const };

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="mb-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[.22em] text-muted"><span className="text-accent-blue">{number}</span><span className="h-px w-8 bg-stroke" />{children}</div>;
}

function Index() {
  const [profileDraft, setProfileDraft] = useState<ProfileDraft | null>(null);
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("profile-draft");
      if (saved) setProfileDraft(JSON.parse(saved) as ProfileDraft);
    } catch { /* ignore malformed draft */ }
  }, []);
  const [introComplete, setIntroComplete] = useState(false);
  const completeIntro = useCallback(() => setIntroComplete(true), []);
  const heroText = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const about = profileDraft?.about.split(/\n\s*\n/).filter(Boolean) ?? [...portfolio.about];
  const skills = profileDraft ? [{ category: "Expertise", items: profileDraft.skills.split(/[,.\n]/).map(item => item.trim()).filter(Boolean) }] : portfolio.skills;

  useEffect(() => {
    if (!introComplete || !heroText.current || reducedMotion) return;
    const animation = gsap.fromTo(heroText.current.children, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: .85, stagger: .12, ease: "power3.out" });
    return () => { animation.kill(); };
  }, [introComplete, reducedMotion]);

  return <div className="min-h-screen overflow-x-clip bg-bg font-sans text-primary antialiased">
    <LoadingScreen onComplete={completeIntro} />
    <Navbar />

    <main>
      <section id="home" className="relative flex min-h-[min(850px,94svh)] flex-col justify-end overflow-hidden border-b border-stroke px-5 pb-20 pt-36 sm:px-8 md:min-h-[min(920px,91svh)] md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-surface" aria-hidden="true" />
        <img src={portraitAsset} alt="Akash Yadav portrait" fetchPriority="high" className="absolute inset-y-0 right-0 h-full w-[90%] object-cover object-[center_24%] opacity-55 grayscale-[20%] sm:w-[70%] md:w-[58%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--bg))_0%,hsl(var(--bg)/.86)_30%,transparent_85%),linear-gradient(0deg,hsl(var(--bg))_0%,transparent_65%)]" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-accent opacity-35" aria-hidden="true" />
        <div ref={heroText} className="relative z-10 mx-auto w-full max-w-[1500px]">
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[.28em] text-primary/75">Personal portfolio <span className="mx-3 text-accent-blue">/</span> Payments & banking</p>
          <h1 className="max-w-[12ch] font-display text-[clamp(4.8rem,12vw,11rem)] italic leading-[.83] text-primary">Akash<br />Yadav<span className="text-gradient-accent">.</span></h1>
          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:gap-20">
            <p className="max-w-[27ch] text-lg font-light leading-relaxed text-primary md:text-xl">{profileDraft?.headline ?? portfolio.headline}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-primary px-6 text-bg transition-transform hover:scale-[1.03] hover:bg-primary/90"><a href="#work">View My Work <ArrowUpRight /></a></Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-stroke bg-bg/45 px-6 text-primary backdrop-blur-sm transition-transform hover:scale-[1.03] hover:border-accent-blue"><a href="#contact">Contact Me <ArrowRight /></a></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.3em] text-muted md:flex">Scroll <span className="scroll-indicator" /></div>
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-primary/60 md:right-12"><MapPin size={12} />{portfolio.location}</div>
      </section>

      <section id="about" className="scroll-mt-28 border-b border-stroke px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .7 }} className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div><SectionLabel number="01">The profile</SectionLabel><h2 className="max-w-[12ch] text-4xl font-light leading-[1.1] md:text-6xl">Focused on the <em className="font-display text-5xl not-italic text-primary md:text-7xl">payments</em> ecosystem.</h2></div>
          <div className="flex flex-col justify-end gap-6 text-base font-light leading-[1.85] text-muted md:text-lg">{about.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<p className="flex items-center gap-3 text-primary"><Mail size={15} /> <a href="mailto:akash.yadav.rbl@gmail.com" className="underline-offset-4 hover:underline">akash.yadav.rbl@gmail.com</a></p></div>
        </motion.div>
      </section>

      <section id="skills" className="border-b border-stroke px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]"><SectionLabel number="02">What I work with</SectionLabel>
          <motion.h2 initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .6 }} className="mb-16 text-5xl font-light md:text-7xl">Skills & <em className="font-display not-italic text-primary">expertise</em>.</motion.h2>
          <div className="grid gap-0 border-t border-stroke md:grid-cols-2">{skills.map((group, i) => <motion.div key={group.category} initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .5, delay: i * .08 }} className="border-b border-stroke px-0 py-8 md:px-8 md:py-10"><h3 className="mb-6 text-[11px] font-medium uppercase tracking-[.2em] text-muted">{group.category}</h3><ul className="flex flex-wrap gap-2">{group.items.map(item => <li key={item} className="rounded-full border border-stroke bg-surface px-3 py-2 text-sm text-primary/80">{item}</li>)}</ul></motion.div>)}</div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-b border-stroke px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]"><SectionLabel number="03">Selected work</SectionLabel>
          <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end"><h2 className="text-5xl font-light md:text-7xl">Work <em className="font-display font-normal not-italic text-primary">highlights</em>.</h2><Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.22em] text-accent-blue">Explore all <ArrowUpRight size={14} /></Link></div>
          <div className="grid gap-4 md:grid-cols-12 md:gap-5">{portfolio.workPlaceholders.map((project, i) => <motion.article key={project.title} initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .55, delay: i * .08 }} className="group relative overflow-hidden rounded-[28px] border border-stroke bg-surface p-6 md:col-span-6 md:p-8"><div className="pointer-events-none absolute -right-6 -top-16 font-display text-[14rem] italic leading-none text-primary/[.035] transition-transform duration-700 group-hover:scale-105">{String(i + 1).padStart(2, "0")}</div><div className="relative flex items-start justify-between gap-4"><span className="text-[11px] uppercase tracking-[.2em] text-accent-blue">0{i + 1}</span></div><div className="relative max-w-xl"><p className="mb-4 text-xs text-muted">{project.category}</p><h3 className="max-w-[19ch] text-3xl font-light leading-tight md:text-5xl">{project.title}</h3><p className="mt-5 max-w-md text-sm leading-7 text-muted">{project.description}</p></div></motion.article>)}</div>
        </div>
      </section>

      <section id="experience" className="border-b border-stroke px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1400px]"><SectionLabel number="04">The journey</SectionLabel><h2 className="mb-16 text-5xl font-light md:text-7xl">Experience & <em className="font-display not-italic text-primary">education</em>.</h2>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div><h3 className="mb-8 text-[11px] uppercase tracking-[.2em] text-muted">Professional experience</h3><div className="border-l border-accent-blue/60 pl-7 md:pl-9">{portfolio.experience.map(exp => <motion.div key={exp.company} initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .45 }} className="mb-8 last:mb-0"><p className="text-xs uppercase tracking-[.22em] text-accent-blue">{exp.period}</p><h4 className="mt-3 text-2xl font-light text-primary">{exp.role}</h4><p className="mt-2 text-sm text-muted">{exp.company}</p><p className="mt-4 max-w-lg text-base leading-7 text-muted">{exp.summary}</p></motion.div>)}</div></div>
            <div><h3 className="mb-8 text-[11px] uppercase tracking-[.2em] text-muted">Education</h3><div className="border-l border-stroke pl-7 md:pl-9">{portfolio.education.map(edu => <motion.div key={edu.degree} initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .45 }} className="mb-8 last:mb-0"><p className="text-xs uppercase tracking-[.22em] text-accent-blue">{edu.period}</p><h4 className="mt-3 text-2xl font-light text-primary">{edu.degree}</h4><p className="mt-2 text-sm text-muted">{edu.institution}</p></motion.div>)}</div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: .6 }} className="mx-auto flex max-w-[1400px] flex-col gap-7 rounded-[32px] border border-stroke bg-surface p-8 md:flex-row md:items-end md:justify-between md:p-12"><div><p className="text-[11px] uppercase tracking-[.3em] text-accent-blue">Let’s connect</p><h2 className="mt-4 text-4xl font-light md:text-6xl">Open to <em className="font-display not-italic text-primary">payments</em> and banking roles.</h2></div><Button asChild className="h-12 rounded-full bg-primary px-6 text-bg transition-transform hover:scale-[1.03] hover:bg-primary/90"><a href="mailto:akash.yadav.rbl@gmail.com">Get in touch <ArrowUpRight /></a></Button></motion.div></section>
    </main>
    <footer className="border-t border-stroke px-5 py-7 sm:px-8 md:px-12 lg:px-20"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-5 text-xs text-muted sm:flex-row sm:items-center"><p>© 2025 Akash Yadav</p><div className="flex items-center gap-5"><a href="#home" className="hover:text-primary">Top</a><a href="#work" className="hover:text-primary">Work</a><a href="#contact" className="hover:text-primary">Contact</a></div></div></footer>
  </div>;
}
