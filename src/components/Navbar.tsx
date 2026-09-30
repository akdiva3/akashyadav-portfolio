import { Linkedin, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, .1, .5] });
    document.querySelectorAll("#home, #about, #work, #contact").forEach(el => observer.observe(el));
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  return <nav aria-label="Primary navigation" className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[680px] -translate-x-1/2 rounded-full border border-stroke px-3 py-2 backdrop-blur-xl transition-all duration-300 md:top-6 md:px-4 ${scrolled ? "bg-surface/95 shadow-[0_18px_40px_var(--shadow)]" : "bg-surface/80"}`}>
    <div className="flex h-10 items-center justify-between gap-3">
      <a href="#home" onClick={() => setOpen(false)} aria-label={`${portfolio.name}, home`} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-stroke bg-gradient-accent p-[1px] font-semibold">
        <span className="flex size-full items-center justify-center rounded-full bg-bg text-xs text-primary">{portfolio.initials}</span>
      </a>
      <div className="hidden items-center gap-1 md:flex">
        {links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href.slice(1) ? "page" : undefined} className={`rounded-full px-4 py-2 text-xs font-medium transition-colors hover:text-primary ${active === link.href.slice(1) ? "bg-elevated text-primary" : "text-muted"}`}>{link.label}</a>)}
      </div>
      <span className="hidden pr-1 text-[10px] uppercase text-muted md:block">{portfolio.role}</span>
      <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex size-9 shrink-0 items-center justify-center rounded-full border border-stroke text-primary transition-colors hover:border-accent-blue"><Linkedin className="size-4" /></a>
      <a href="#contact" className="ml-auto rounded-full border border-stroke px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-accent-blue md:hidden">Contact</a>
      <Button type="button" size="icon" variant="ghost" className="size-9 rounded-full text-primary md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-1 overflow-hidden border-t border-stroke pt-2 md:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-sm text-primary hover:bg-elevated">{link.label}</a>)}<a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-full px-4 py-3 text-sm text-primary hover:bg-elevated"><Linkedin className="size-4" /> LinkedIn</a></motion.div>}
  </nav>;
}
