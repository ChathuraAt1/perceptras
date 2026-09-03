import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const VALUES = [
  {
    num: '01',
    title: 'Instant Reaction Time',
    description:
      'We believe smart systems should respond immediately. By running AI directly where your cameras are located, we eliminate delays and keep your operations moving smoothly.',
  },
  {
    num: '02',
    title: 'Your Privacy Stays Intact',
    description:
      'Your video feeds never leave your facility. Everything is processed on your local network, ensuring your proprietary data and privacy remain completely protected.',
  },
  {
    num: '03',
    title: 'Works with What You Have',
    description:
      'You should not need to replace your existing setup. Our software connects with standard cameras and runs on widely available computers and devices.',
  },
  {
    num: '04',
    title: 'Clarity Over Complexity',
    description:
      'We focus on practical results that solve real operational problems, rather than making technology difficult to use or understand.',
  },
];

const TEAM = [
  {
    name: 'Dr. Alistair Vance',
    role: 'Co-Founder & CEO',
    initials: 'AV',
    image: '/images/about/leaders (3).webp',
    gradient: 'from-zinc-800 to-zinc-950',
    background:
      'Spent over a decade leading robotics and vision teams, helping automated warehouses and mobile robots navigate complex spaces safely.',
  },
  {
    name: 'Mira Sorensen',
    role: 'Co-Founder & Chief Architect',
    initials: 'MS',
    image: '/images/about/leaders.webp',
    gradient: 'from-zinc-700 to-zinc-900',
    background:
      'Specialist in making artificial intelligence models run fast and efficiently on everyday hardware devices without expensive servers.',
  },
  {
    name: 'Tarek El-Masri',
    role: 'Head of Engineering',
    initials: 'TE',
    image: '/images/about/leaders (4).webp',
    gradient: 'from-zinc-800 to-zinc-900',
    background:
      'Expert in building reliable, high-speed software systems that connect hundreds of cameras and sensors simultaneously without crashing.',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Head of Research',
    initials: 'ER',
    image: '/images/about/leaders (2).webp',
    gradient: 'from-zinc-700 to-zinc-950',
    background:
      'Dedicated to helping systems understand 3D physical spaces and track objects smoothly across multiple camera angles.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* ── 1. Hero & Company Overview ───────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        {/* Ambient 3D Grid Perception Lens Background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-25 dark:opacity-45 select-none flex items-center justify-center">
          <Image
            src="/images/about/hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 flex flex-col items-center">
            <MonoTag>ABOUT PERCEPTRAS</MonoTag>

            <Display className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Giving machines the ability to see and understand the physical world.
            </Display>

            <p className="font-mono text-base text-muted leading-relaxed pt-2 max-w-2xl mx-auto">
              Perceptras is a software company that helps businesses connect their cameras to artificial intelligence. We make it easy for robots, factories, and smart facilities to understand movement, prevent accidents, and operate with precision in real time.
            </p>

            {/* Company Profile Directory Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border font-mono text-xs w-full max-w-xl">
              <span className="text-muted uppercase text-[10px] tracking-widest">
                Verified Company Profiles:
              </span>
              <a
                href="https://www.crunchbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Crunchbase</span>
                <ExternalLink className="h-3 w-3 text-muted" />
              </a>
              <a
                href="https://www.f6s.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>F6S Community</span>
                <ExternalLink className="h-3 w-3 text-muted" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. What We Do & Our Mission ──────────────────────── */}
      <Section borders={{ top: true, bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5 space-y-3">
              <MonoTag>OUR PURPOSE</MonoTag>
              <h2 className="font-syne text-2xl md:text-4xl font-bold uppercase text-foreground leading-snug">
                Why We Exist
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 font-mono text-sm text-muted leading-relaxed">
              <p className="text-foreground font-semibold text-base">
                Cameras are everywhere, but most of them only record video for humans to watch later.
              </p>
              <p>
                We believe the physical world needs systems that understand what is happening right now. When a warehouse robot is moving, an assembly line is running, or people are navigating a busy space, waiting seconds for a cloud server to process video is simply too slow.
              </p>
              <p>
                Perceptras provides the software foundation that turns ordinary camera feeds into immediate understanding, helping teams automate workflows, protect workers, and build smarter physical spaces.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. What Inspired Us (The Story) ──────────────────── */}
      <Section borders={{ bottom: true }} className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>WHAT INSPIRED US</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              The Story Behind Perceptras
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Before starting Perceptras, our team spent years building vision systems for manufacturing plants and logistics hubs. We kept seeing the exact same three problems:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 01
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Cloud Delays
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Sending video to the cloud was too slow and consumed too much internet bandwidth, causing unacceptable delays for fast-moving equipment.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 02
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Privacy Concerns
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Many businesses could not risk streaming sensitive factory floor video or private facility feeds over external internet connections.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 03
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Complicated Setup
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Getting cameras to talk to AI models required months of custom software development and specialized engineering teams.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 border border-border bg-surface">
            <h3 className="font-syne text-base font-bold uppercase text-foreground mb-2">
              Our Solution
            </h3>
            <p className="font-mono text-xs text-muted leading-relaxed">
              We built Perceptras to remove all of that friction. We created a clean, fast software platform that runs right inside your building, connects to standard cameras in minutes, and gives you instant intelligence with total privacy.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── 4. Core Values ───────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>HOW WE WORK</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              Our Guiding Values
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              These principles guide how we build our software and support our customers every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {VALUES.map((v) => (
              <div key={v.num} className="border-t border-border pt-6 space-y-3">
                <span className="font-mono text-xs font-bold text-muted">{v.num}</span>
                <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                  {v.title}
                </h3>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. Our Team ──────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>THE PEOPLE BEHIND PERCEPTRAS</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              Our Leadership Team
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              We are a team of engineers, researchers, and builders who are passionate about making physical perception simple and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group border-t border-border pt-6 flex items-start gap-5 transition-colors"
              >
                {/* Left Square Avatar Container with Hover Effects */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-border bg-surface overflow-hidden group-hover:border-foreground transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Corner crosshairs on hover */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Right Text Description */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground group-hover:text-foreground transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-foreground font-semibold">
                    {member.role}
                  </p>
                  <p className="font-mono text-xs text-muted leading-relaxed pt-1">
                    {member.background}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 6. Simple Call to Action ─────────────────────────── */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Volumetric light ray atmospheric background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-20 dark:opacity-35 select-none flex items-center justify-center">
          <Image
            src="/images/about/ready to work.webp"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </div>

        <Container className="text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <Display as="h2" className="text-3xl md:text-5xl font-bold">
              Ready to work together?
            </Display>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Whether you are looking to deploy perception across your facilities or want to learn more about our platform, we are here to help.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/contact/">
                <Button variant="primary" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/products/">
                <Button variant="outline" size="lg">
                  Explore Products →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
