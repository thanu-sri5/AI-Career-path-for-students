
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Eye, EyeOff, Loader2 } from "lucide-react";
import { CP_STORAGE } from "@/lib/storage";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent, type: 'login' | 'register') => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email');
      const name = formData.get('name') || email?.toString().split('@')[0];

      CP_STORAGE.saveUser({
        name,
        email,
        id: Math.random().toString(36).substr(2, 9),
        role: 'Professional Pilot',
        joined: new Date().toLocaleDateString()
      });

      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0B14] p-4 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-headline font-bold">CareerPilot <span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-3xl font-headline font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Resume your professional journey today</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password"
                      type={showPassword ? "text" : "password"} 
                      required 
                      className="bg-white/5 border-white/10 pr-10"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <input type="checkbox" id="remember" className="rounded border-white/10 bg-white/5" />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">Remember for 30 days</label>
                </div>
                <Button type="submit" className="w-full gradient-bg h-12 text-lg" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => handleAuth(e, 'register')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input id="reg-name" name="name" placeholder="John Doe" required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email Address</Label>
                  <Input id="reg-email" name="email" type="email" placeholder="name@example.com" required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" type="password" required className="bg-white/5 border-white/10" />
                </div>
                <p className="text-xs text-muted-foreground py-2 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
                <Button type="submit" className="w-full gradient-bg h-12 text-lg" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-8 text-center text-muted-foreground text-sm">
          Protected by industry standard encryption.
        </p>
      </div>
    </div>
  );
}
