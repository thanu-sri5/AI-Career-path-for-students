
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  Award, 
  FileSearch, 
  PieChart, 
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CP_STORAGE } from "@/lib/storage";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Skill Assessment", icon: BookOpen, path: "/skills" },
  { name: "Career Roadmap", icon: Compass, path: "/roadmap" },
  { name: "Certificates", icon: Award, path: "/certificates" },
  { name: "Resume Analyzer", icon: FileSearch, path: "/resume-analyzer" },
  { name: "Analytics", icon: PieChart, path: "/analytics" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    setUser(CP_STORAGE.getUser());
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D0B14]">
      {/* Desktop Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-card border-r-white/5 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-headline font-bold">CareerPilot <span className="text-primary">AI</span></span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === item.path ? 'gradient-bg text-white shadow-lg purple-glow' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-destructive transition-colors rounded-xl">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-white">
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search insights..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold">{user?.name || "Pilot"}</div>
                <div className="text-xs text-muted-foreground">{user?.role || "Explorer"}</div>
              </div>
              <Avatar className="w-9 h-9 border-2 border-primary/20">
                <AvatarImage src={`https://picsum.photos/seed/${user?.name}/100/100`} />
                <AvatarFallback>{user?.name?.[0] || "P"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
