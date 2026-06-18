
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Rocket, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  { q: "How does the AI Resume Analyzer work?", a: "Our AI uses advanced Natural Language Processing to scan your resume text, comparing it against thousands of successful resumes and current ATS (Applicant Tracking System) criteria to provide actionable feedback." },
  { q: "Are the skill assessments accredited?", a: "Our assessments are designed by industry experts. While not university-accredited, they are widely recognized by our partner recruiters and top-tier tech companies as proof of competence." },
  { q: "Can I use CareerPilot AI for free?", a: "Yes, we offer a generous free tier that includes 3 resume scans per month and access to basic skill assessments. Our Premium plan unlocks unlimited scans and personalized roadmaps." },
  { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption for all data storage and never share your personal information or resume content with third parties without your explicit consent." },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0D0B14]">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-headline font-bold">CareerPilot AI</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Back to App</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have questions about CareerPilot AI? We're here to help you navigate your professional journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-headline font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" required className="bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required className="bg-white/5 border-white/10 min-h-[150px]" placeholder="How can we help you?" />
              </div>
              <Button type="submit" className="w-full gradient-bg h-12 text-lg" disabled={submitting}>
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email Support</h3>
                  <p className="text-muted-foreground">Response time: within 24h</p>
                  <Link href="mailto:support@careerpilot.ai" className="text-primary hover:underline font-medium">support@careerpilot.ai</Link>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Live Chat</h3>
                  <p className="text-muted-foreground">Available Mon-Fri, 9am - 6pm EST</p>
                  <Button variant="link" className="p-0 text-secondary hover:underline h-auto">Start chatting</Button>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h3 className="text-xl font-headline font-bold mb-6">Join our Community</h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href} 
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-primary/50 hover:bg-white/10 transition-all group"
                  >
                    <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h3 className="font-headline font-bold mb-2">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest career tips and AI insights delivered weekly.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter email" className="bg-white/5 border-white/10" />
                <Button className="gradient-bg">Join</Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold mb-4">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass-card px-6 rounded-2xl border-none mb-4">
                <AccordionTrigger className="hover:no-underline font-headline font-bold py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
