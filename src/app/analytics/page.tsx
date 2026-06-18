
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Download, 
  Filter,
  ArrowUpRight,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

const weeklyData = [
  { name: 'Mon', value: 2.5 },
  { name: 'Tue', value: 4.8 },
  { name: 'Wed', value: 3.2 },
  { name: 'Thu', value: 6.5 },
  { name: 'Fri', value: 5.1 },
  { name: 'Sat', value: 8.4 },
  { name: 'Sun', value: 4.0 },
];

const skillRadarData = [
  { subject: 'Frontend', A: 120, fullMark: 150 },
  { subject: 'Backend', A: 98, fullMark: 150 },
  { subject: 'AI/ML', A: 86, fullMark: 150 },
  { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'DevOps', A: 85, fullMark: 150 },
  { subject: 'Logic', A: 130, fullMark: 150 },
];

const categoryPieData = [
  { name: 'Engineering', value: 400 },
  { name: 'Data Science', value: 300 },
  { name: 'Soft Skills', value: 200 },
  { name: 'Management', value: 150 },
];

const PIE_COLORS = ['#915EFF', '#4D79FF', '#C084FC', '#6366F1'];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Learning Analytics</h1>
            <p className="text-muted-foreground">Deep insights into your professional growth and habits.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-11"><Filter className="w-4 h-4 mr-2" /> Last 30 Days</Button>
            <Button className="gradient-bg h-11"><Download className="w-4 h-4 mr-2" /> Export PDF</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Growth Area Chart */}
          <div className="glass-card p-8 rounded-2xl flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="text-primary w-5 h-5" /> Weekly Learning Intensity
              </h2>
              <div className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +14.2%
              </div>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#915EFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#915EFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1725', borderColor: '#2D293B', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#915EFF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="glass-card p-8 rounded-2xl flex flex-col h-[400px]">
            <h2 className="text-lg font-headline font-bold mb-8 flex items-center gap-2">
              <Target className="text-primary w-5 h-5" /> Skill Proficiency Matrix
            </h2>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                  <PolarGrid stroke="#2D293B" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                  <Radar name="Pilot" dataKey="A" stroke="#915EFF" fill="#915EFF" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Bar Chart */}
          <div className="glass-card p-8 rounded-2xl flex flex-col h-[350px]">
             <h2 className="text-lg font-headline font-bold mb-8 flex items-center gap-2">
               <Calendar className="text-primary w-5 h-5" /> Monthly Progression
             </h2>
             <div className="flex-1 w-full min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={weeklyData}>
                   <Bar dataKey="value" fill="#4D79FF" radius={[4, 4, 0, 0]} />
                   <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#1A1725', border: 'none', borderRadius: '8px' }} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-card p-8 rounded-2xl flex flex-col h-[350px]">
             <h2 className="text-lg font-headline font-bold mb-8 flex items-center gap-2">
               <Award className="text-primary w-5 h-5" /> Certification Categories
             </h2>
             <div className="flex-1 w-full min-h-0 flex items-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={categoryPieData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {categoryPieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip contentStyle={{ backgroundColor: '#1A1725', border: 'none', borderRadius: '8px' }} />
                 </PieChart>
               </ResponsiveContainer>
               <div className="space-y-2 pr-4">
                 {categoryPieData.map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                     <span className="text-xs text-muted-foreground whitespace-nowrap">{item.name}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
