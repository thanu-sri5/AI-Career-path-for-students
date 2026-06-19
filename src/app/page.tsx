
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  ChevronRight, 
  Star,
  Users,
  Award,
  Github
} from "lucide-react";

const stats = [
  { label: "Active Pilots", value: "10K+", icon: Users },
  { label: "AI Recommendations", value: "50K+", icon: Rocket },
  { label: "Success Rate", value: "94%", icon: ShieldCheck },
  { label: "Certifications", value: "15K+", icon: Award },
];

const features = [
  {
    title: "AI Resume Analysis",
    description: "Upload your resume and get instant ATS compatibility scores and personalized improvement tips.",
    icon: Target,
  },
  {
    title: "Skill Assessments",
    description: "Test your knowledge across multiple domains and track your learning progress over time.",
    icon: BarChart3,
  },
  {
    title: "Visual Roadmaps",
    description: "Interactive timeline-based career paths tailored to your specific goals and skills.",
    icon: Rocket,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-headline font-bold">CareerPilot <span className="text-primary">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="/roadmap" className="text-sm font-medium hover:text-primary transition-colors">Roadmaps</Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
            <Button asChild className="gradient-bg border-none">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 py-1.5 px-4 rounded-full border-primary/20 text-primary bg-primary/5">
            Introducing CareerPilot 2.0
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-6 tracking-tight">
            Pilot Your Career with <br />
            <span className="gradient-text">Precision Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one AI platform for modern professionals. Analyze resumes, assess skills, and follow data-driven roadmaps to your dream job.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="gradient-bg hover:scale-105 transition-transform w-full sm:w-auto text-lg h-14 px-8">
              <Link href="/login">Launch Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg h-14 px-8">
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-headline font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0D0B14]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Everything you need to <span className="text-primary">Accelerate</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our AI suite covers every step of your professional journey, from first resume to final promotion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <Link href="/login" className="flex items-center gap-2 text-primary font-medium hover:underline">
                  Try it now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold mb-4">Loved by Pilots Everywhere</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/5">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">"CareerPilot AI completely transformed how I approached my job search. The resume analysis gave me insights I never would have seen myself."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative">
                    <Image src={`https://picsum.photos/seed/user${i}/100/100`} fill alt="User" data-ai-hint="user portrait" />
                  </div>
                  <div>
                    <div className="font-bold">Alex Johnson</div>
                    <div className="text-xs text-muted-foreground">Product Designer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#08060A]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Rocket className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-headline font-bold">CareerPilot <span className="text-primary">AI</span></span>
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6">
                The leading AI-powered career growth platform designed for the next generation of professionals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="/resume-analyzer">Resume Analyzer</Link></li>
                <li><Link href="/skills">Skill Assessment</Link></li>
                <li><Link href="/roadmap">Career Roadmaps</Link></li>
                <li><Link href="/analytics">Learning Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="/contact">Contact Us</Link></li>
                <li><a href="https://github.com/thanu-sri5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Github className="w-4 h-4" /> GitHub Profile</a></li>
                <li><a href="https://github.com/thanu-sri5/CareerPilot-AI-Final-Project" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Source Code</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-xs pt-8 border-t border-white/5">
            © 2025 CareerPilot AI by <a href="https://github.com/thanu-sri5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">thanu-sri5</a>. Built for the future of work.
          </div>
        </div>
      </footer>
    </div>
  );
}
