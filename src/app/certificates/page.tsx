
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Award, 
  Search, 
  Plus, 
  Trash2, 
  ExternalLink,
  Filter,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { CP_STORAGE } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCerts(CP_STORAGE.getCertificates());
  }, []);

  const filtered = certs.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    CP_STORAGE.removeCertificate(id);
    setCerts(CP_STORAGE.getCertificates());
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">Certificate Vault</h1>
            <p className="text-muted-foreground">Manage and showcase your professional achievements.</p>
          </div>
          <div className="flex gap-2">
            <Button className="gradient-bg h-11 px-6">
              <Plus className="w-4 h-4 mr-2" /> Add Certificate
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title or category..." 
              className="pl-10 h-11 bg-white/5 border-white/10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 px-6">
            <Filter className="w-4 h-4 mr-2" /> Categories
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert) => (
            <div key={cert.id} className="glass-card rounded-2xl p-6 group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary w-6 h-6" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-muted-foreground hover:text-white"><ExternalLink className="w-4 h-4" /></button>
                  <button 
                    onClick={() => handleDelete(cert.id)} 
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <Badge variant="outline" className="mb-3 border-white/10 text-[10px] tracking-widest uppercase">{cert.category}</Badge>
                <h3 className="text-xl font-headline font-bold mb-2">{cert.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Verified on {cert.date}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-white/10 border-2 border-background" />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[8px] font-bold">
                    +12
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Shared with 1.2k recruiters</span>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card rounded-3xl">
              <Award className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-headline font-bold mb-2">No certificates found</h3>
              <p className="text-muted-foreground">Try adjusting your search or add a new one.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
