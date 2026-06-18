
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Database, 
  BrainCircuit, 
  Layout, 
  Terminal,
  Play,
  Trophy,
  History
} from "lucide-react";

const skillCategories = [
  { id: 'html-css', name: 'Web Fundamentals', icon: Layout, level: 'Beginner', questions: 15, color: 'text-orange-500' },
  { id: 'javascript', name: 'JavaScript Engine', icon: Code2, level: 'Intermediate', questions: 20, color: 'text-yellow-400' },
  { id: 'python', name: 'Python for AI', icon: Terminal, level: 'Intermediate', questions: 18, color: 'text-blue-500' },
  { id: 'database', name: 'SQL & Databases', icon: Database, level: 'Advanced', questions: 12, color: 'text-purple-500' },
  { id: 'ml-ai', name: 'Machine Learning', icon: BrainCircuit, level: 'Expert', questions: 25, color: 'text-pink-500' },
];

export default function SkillsPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Skill Assessments</h1>
            <p className="text-muted-foreground">Validate your technical expertise and earn verified badges.</p>
          </div>
          <Button variant="outline" className="h-11 px-6">
            <History className="w-4 h-4 mr-2" /> Assessment History
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="glass-card rounded-2xl p-6 group transition-all hover:border-primary/50">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl bg-white/5 ${cat.color}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="border-white/10 bg-white/5">{cat.level}</Badge>
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">{cat.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Play className="w-3 h-3" /> {cat.questions} Questions</span>
                <span className="flex items-center gap-1.5"><Trophy className="w-3 h-3" /> 200 XP</span>
              </div>
              <Button className="w-full h-11 border border-white/10 bg-white/5 hover:gradient-bg transition-all hover:border-none">
                Start Assessment
              </Button>
            </div>
          ))}
        </div>

        {/* Global Leaderboard Snapshot */}
        <div className="glass-card rounded-3xl p-8 mt-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full -z-10" />
          <h2 className="text-xl font-headline font-bold mb-6">Weekly Skill Leaderboard</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold italic text-muted-foreground w-6">#{i}</div>
                  <div className="w-10 h-10 rounded-full bg-muted border border-white/10" />
                  <div>
                    <div className="font-bold">Pilot_{Math.floor(Math.random()*9000)+1000}</div>
                    <div className="text-xs text-muted-foreground">JavaScript Master</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">2,450 XP</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Top 1%</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full text-center mt-6 text-muted-foreground hover:text-primary">
            View Full Leaderboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
