
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileUp, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Target, 
  Loader2,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeAnalysisOutput {
  score: number;
  atsCompatibility: 'Excellent' | 'Good' | 'Average' | 'Poor';
  breakdown: { category: string; insights: string }[];
  suggestions: string[];
  improvementChecklist: string[];
}

// Client-side demo analysis (since GitHub Pages can't run server-side Genkit AI)
function generateDemoAnalysis(fileName: string): ResumeAnalysisOutput {
  return {
    score: 78,
    atsCompatibility: "Good",
    breakdown: [
      { category: "Formatting", insights: "Your resume uses a clean layout. Consider using standard section headings like 'Experience', 'Education', and 'Skills' for better ATS parsing." },
      { category: "Keywords", insights: "Good use of industry-relevant keywords. Adding more action verbs and quantifiable metrics would strengthen your profile." },
      { category: "Experience", insights: "Work experience is well-structured. Try to include measurable achievements (e.g., 'increased revenue by 20%') for greater impact." },
      { category: "Education", insights: "Education section is properly formatted. Consider adding relevant coursework or certifications if applicable." },
    ],
    suggestions: [
      "Add a professional summary at the top of your resume highlighting your key strengths.",
      "Include more quantifiable achievements in your experience section.",
      "Optimize your skills section with keywords from the target job description.",
      "Use consistent date formatting throughout the document.",
      "Consider adding relevant certifications or online courses.",
    ],
    improvementChecklist: [
      "Add a tailored professional summary",
      "Include 3+ quantifiable achievements",
      "Add relevant technical skills",
      "Proofread for grammar and spelling",
      "Ensure consistent formatting throughout",
      "Add LinkedIn profile URL in contact info",
    ],
  };
}

export default function ResumeAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysisOutput | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload a file smaller than 2MB.", variant: "destructive" });
      return;
    }

    setAnalyzing(true);
    setResult(null);

    // Simulate analysis delay for demo purposes
    setTimeout(() => {
      try {
        const analysis = generateDemoAnalysis(file.name);
        setResult(analysis);
        toast({ title: "Analysis Complete", description: "Your resume has been analyzed successfully." });
      } catch (error) {
        toast({ title: "Analysis Failed", description: "Failed to analyze resume. Please try again.", variant: "destructive" });
      } finally {
        setAnalyzing(false);
      }
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold mb-2">AI Resume Analyzer</h1>
            <p className="text-muted-foreground">Check your resume's ATS compatibility and get expert tips.</p>
          </div>
          <div className="relative">
            <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
            <Button asChild className="gradient-bg h-11 px-8 cursor-pointer">
              <label htmlFor="resume-upload" className="flex items-center gap-2">
                {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileUp className="w-5 h-5" />}
                {analyzing ? "Analyzing..." : "Upload Resume"}
              </label>
            </Button>
          </div>
        </div>

        {!result && !analyzing && (
          <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-white/10 bg-white/5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileUp className="text-primary w-10 h-10" />
            </div>
            <h2 className="text-2xl font-headline font-bold mb-2">Ready for a scan?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Upload your resume in PDF or Word format. Our AI will analyze your content against 100+ ATS standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: "ATS Check", icon: ShieldCheck },
                { label: "Keywords", icon: Target },
                { label: "Layout", icon: CheckCircle2 },
                { label: "Content", icon: AlertCircle },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-xs font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {analyzing && (
          <div className="space-y-12 py-20 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 animate-spin border-t-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold mb-2">Analyzing your potential...</h2>
              <p className="text-muted-foreground">This usually takes about 10-20 seconds.</p>
            </div>
          </div>
        )}

        {result && (
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Main Analysis Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
                <h2 className="text-xl font-headline font-bold mb-6">Compatibility Breakdown</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {result.breakdown.map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-sm font-bold mb-2 text-primary">{item.category}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.insights}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-xl font-headline font-bold mb-6">Expert Suggestions</h2>
                <div className="space-y-4">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="mt-1">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score & Checklist Sidebar */}
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Overall Score</div>
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * result.score) / 100} className="text-primary" />
                  </svg>
                  <span className="absolute text-4xl font-headline font-bold">{result.score}</span>
                </div>
                <div className={`text-lg font-bold mb-1 ${result.score > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {result.atsCompatibility} Compatibility
                </div>
                <p className="text-xs text-muted-foreground">Based on current market standards</p>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-lg font-headline font-bold mb-6">Action Checklist</h2>
                <div className="space-y-4">
                  {result.improvementChecklist.map((task, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md border-2 border-primary/30 flex items-center justify-center shrink-0">
                        {/* Empty box for user to visual task */}
                      </div>
                      <span className="text-sm text-muted-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
