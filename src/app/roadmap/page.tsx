
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  MapPin, 
  CircleCheck, 
  Lock, 
  ChevronRight,
  Target,
  Clock,
  ExternalLink
} from "lucide-react";

const steps = [
  { id: 1, title: 'Frontend Basics', desc: 'Master HTML5, CSS3 and Responsive Design principles.', status: 'completed', duration: '4 weeks' },
  { id: 2, title: 'Advanced JavaScript', desc: 'Deep dive into ES6+, Async/Await, and DOM manipulation.', status: 'completed', duration: '6 weeks' },
  { id: 3, title: 'React Ecosystem', desc: 'Hooks, Context API, Redux Toolkit and Next.js basics.', status: 'current', duration: '8 weeks' },
  { id: 4, title: 'Full Stack Integration', desc: 'Node.js, Express, and MongoDB or PostgreSQL.', status: 'locked', duration: '6 weeks' },
  { id: 5, title: 'AI & Vector Databases', desc: 'Understanding LLMs, LangChain, and RAG architectures.', status: 'locked', duration: '10 weeks' },
];

export default function RoadmapPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Career Roadmap</h1>
            <p className="text-muted-foreground">Your step-by-step path to becoming a Senior AI Fullstack Engineer.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-11">Download Path</Button>
            <Button className="gradient-bg h-11">Switch Goal</Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative py-10">
          {/* Vertical Line */}
          <div className="absolute left-[21px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-white/5" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.id} className="relative pl-14 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 100}ms` }}>
                {/* Node Indicator */}
                <div className={`absolute left-0 top-0 w-11 h-11 rounded-full flex items-center justify-center z-10 border-4 border-[#0D0B14] shadow-xl ${
                  step.status === 'completed' ? 'bg-primary' : 
                  step.status === 'current' ? 'bg-primary animate-pulse' : 'bg-muted border-white/5'
                }`}>
                  {step.status === 'completed' ? <CircleCheck className="w-5 h-5 text-white" /> : 
                   step.status === 'current' ? <Target className="w-5 h-5 text-white" /> : 
                   <Lock className="w-4 h-4 text-muted-foreground" />}
                </div>

                <div className={`glass-card p-6 rounded-2xl transition-all ${step.status === 'current' ? 'border-primary shadow-[0_0_20px_rgba(145,94,255,0.15)] ring-1 ring-primary/30' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Phase 0{step.id}</span>
                        {step.status === 'current' && <Badge className="bg-primary hover:bg-primary/90 text-[10px]">IN PROGRESS</Badge>}
                      </div>
                      <h3 className="text-xl font-headline font-bold">{step.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {step.duration}</span>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Remote</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">{step.desc}</p>
                  
                  {step.status === 'current' ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">FreeCodeCamp: React</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground">Resource • 12 hours left</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                        <Button variant="ghost" className="w-full text-xs hover:bg-primary/10 hover:text-primary">
                          Mark Phase Complete <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : step.status === 'completed' ? (
                    <div className="text-xs text-primary font-bold flex items-center gap-1.5">
                      <CircleCheck className="w-4 h-4" /> Phase Mastered on Jan 12, 2024
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 italic">
                      Complete previous phase to unlock
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Motivation Card */}
        <div className="fixed bottom-8 right-8 max-w-xs glass-card p-6 rounded-2xl shadow-2xl border-primary/20 hidden xl:block animate-in fade-in slide-in-from-right-8 duration-1000">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
               <Rocket className="w-5 h-5 text-white" />
             </div>
             <div>
               <div className="font-bold text-sm">Keep it up!</div>
               <div className="text-xs text-muted-foreground">You're in the top 5% this month</div>
             </div>
           </div>
           <p className="text-xs text-muted-foreground mb-4">You've completed 2 phases faster than 80% of other students. Keep the momentum going!</p>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-primary w-[80%]" />
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
