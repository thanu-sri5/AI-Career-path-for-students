
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Trophy, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Award,
  ArrowRight,
  CircleCheck,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CP_STORAGE } from "@/lib/storage";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({ hours: 0, careerScore: 0, completedSkills: 0 });
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    setStats(CP_STORAGE.getProgress());
    setSkills(CP_STORAGE.getSkills());
  }, []);

  const statCards = [
    { label: "Career Score", value: stats.careerScore, icon: Trophy, color: "text-yellow-500", suffix: "/100" },
    { label: "Skills Gained", value: stats.completedSkills, icon: BookOpen, color: "text-primary", suffix: "" },
    { label: "Learning Hours", value: stats.hours, icon: Clock, color: "text-secondary", suffix: "h" },
    { label: "Growth Rate", value: "+12.5%", icon: TrendingUp, color: "text-green-500", suffix: "" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-headline font-bold mb-2">Welcome Back, Pilot!</h1>
          <p className="text-muted-foreground">Here's your professional flight report for today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-xs text-muted-foreground">Monthly</div>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-headline font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground mb-1">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Roadmap Card */}
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                <Calendar className="w-32 h-32" />
              </div>
              <h2 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary w-5 h-5" /> Active Career Roadmap
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-white">Full Stack AI Developer</span>
                    <span className="text-primary">65% Completed</span>
                  </div>
                  <Progress value={65} className="h-2 bg-white/5" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs text-muted-foreground mb-1">Current Milestone</div>
                    <div className="font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" /> Advanced React & AI Tools
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs text-muted-foreground mb-1">Next Up</div>
                    <div className="font-bold flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-muted" /> Machine Learning Basics
                    </div>
                  </div>
                </div>
                <Button className="w-full gradient-bg h-11">Continue Roadmap <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-xl font-headline font-bold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[
                  { title: "Skill Assessment Completed", desc: "You scored 92% in JavaScript Basics", time: "2 hours ago", icon: CircleCheck },
                  { title: "New Certificate Added", desc: "Advanced CSS Design", time: "Yesterday", icon: Award },
                  { title: "Roadmap Milestone Reached", desc: "Frontend Fundamentals", time: "3 days ago", icon: Trophy },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{activity.title}</div>
                      <div className="text-xs text-muted-foreground mb-1">{activity.desc}</div>
                      <div className="text-[10px] text-muted-foreground/60">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-lg font-headline font-bold mb-4">Quick Skills</h2>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span>{skill.name}</span>
                      <span className="text-primary">{skill.score}%</span>
                    </div>
                    <Progress value={skill.score} className="h-1 bg-white/5" />
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-primary px-0 mt-4">View all skills <ArrowRight className="w-3 h-3 ml-1" /></Button>
            </div>

            <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-4">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold mb-2">Daily Challenge</h3>
              <p className="text-sm text-muted-foreground mb-4">Complete a 5-minute Python quiz to maintain your streak.</p>
              <Button size="sm" className="w-full bg-white text-black hover:bg-white/90">Start Challenge</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
