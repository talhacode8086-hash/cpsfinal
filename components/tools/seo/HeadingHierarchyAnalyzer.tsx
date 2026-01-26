'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Type, AlertTriangle, ChevronRight, BarChart3, Fingerprint, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Heading {
    level: number;
    text: string;
    issue?: string;
}

export default function HeadingHierarchyAnalyzer() {
    const [input, setInput] = useState('');
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [analyzed, setAnalyzed] = useState(false);

    const scan = () => {
        const hTags = input.match(/<h[1-6].*?>.*?<\/h[1-6]>/gi) || [];
        const processed: Heading[] = hTags.map((tag, index) => {
            const level = parseInt(tag.match(/h([1-6])/i)?.[1] || '0');
            const text = tag.replace(/<.*?>|&nbsp;/g, '').trim();
            return { level, text };
        });

        // Detect issues
        processed.forEach((h, i) => {
            if (i > 0) {
                const prevLevel = processed[i - 1].level;
                if (h.level > prevLevel + 1) {
                    h.issue = `Skipped level: H${prevLevel} to H${h.level}`;
                }
            }
            if (h.level === 1 && i > 0) {
                h.issue = 'Multiple H1 tags detected';
            }
        });

        setHeadings(processed);
        setAnalyzed(true);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-primary/10 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                            <Type className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle>Heading Structure Audit</CardTitle>
                            <CardDescription>Validate H1-H6 hierarchy for SEO and accessibility</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/70">HTML Source Code</label>
                        <Textarea
                            placeholder="Paste your HTML here (e.g. <h1>Title</h1> <h2>Subtitle</h2>)..."
                            className="h-48 rounded-2xl border-primary/10 bg-muted/20 font-mono text-xs focus-visible:ring-primary/20 transition-all"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <Button size="lg" className="flex-1 rounded-2xl h-14 font-black shadow-xl shadow-primary/20" onClick={scan}>
                                <BarChart3 className="mr-2 h-5 w-5" /> Analyze Structure
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-2xl h-14 w-14" onClick={() => { setInput(''); setAnalyzed(false); }}>
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {analyzed && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Insights Panel */}
                    <div className="space-y-6">
                        <Card className="rounded-3xl border-primary/5 shadow-lg overflow-hidden">
                            <CardContent className="p-6 space-y-4">
                                <h4 className="font-bold text-xs uppercase tracking-widest opacity-60 flex items-center gap-2">
                                    <Fingerprint className="h-4 w-4" /> SEO Insights
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                                        <span className="text-xs font-bold">Total Headings</span>
                                        <Badge variant="secondary">{headings.length}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                                        <span className="text-xs font-bold">H1 Count</span>
                                        <Badge variant={headings.filter(h => h.level === 1).length === 1 ? 'default' : 'destructive'}>
                                            {headings.filter(h => h.level === 1).length}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border">
                                        <span className="text-xs font-bold">Accessibility Gaps</span>
                                        <Badge variant={headings.filter(h => h.issue).length === 0 ? 'outline' : 'destructive'}>
                                            {headings.filter(h => h.issue).length} Issues
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {headings.filter(h => h.issue).length > 0 && (
                            <Card className="rounded-3xl border-destructive/20 bg-destructive/5 shadow-lg overflow-hidden">
                                <CardContent className="p-6 space-y-3">
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-destructive flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4" /> Structural Errors
                                    </h4>
                                    <div className="space-y-2">
                                        {headings.filter(h => h.issue).map((h, i) => (
                                            <div key={i} className="text-xs p-2.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 font-medium leading-tight">
                                                {h.issue}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Structure Map */}
                    <Card className="lg:col-span-2 rounded-[2.5rem] border-primary/5 shadow-xl bg-background overflow-hidden">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-primary" /> Visual Outline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {headings.map((h, i) => (
                                <div key={i} className="group relative flex items-start gap-3 transition-all duration-300" style={{ paddingLeft: `${(h.level - 1) * 1.5}rem` }}>
                                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${h.issue ? 'bg-destructive text-destructive-foreground' : 'bg-primary/10 text-primary'}`}>
                                        H{h.level}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className={`font-bold leading-tight ${h.level === 1 ? 'text-xl text-primary' : 'text-sm'}`}>
                                            {h.text}
                                            <span className="ml-2 text-[10px] opacity-0 group-hover:opacity-40 transition-opacity font-normal">({h.text.length} chars)</span>
                                        </p>
                                        {h.issue && <p className="text-[10px] text-destructive font-black uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {h.issue}</p>}
                                    </div>
                                </div>
                            ))}
                            {headings.length === 0 && (
                                <div className="text-center py-20 opacity-30 italic">No headings detected in source code.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
