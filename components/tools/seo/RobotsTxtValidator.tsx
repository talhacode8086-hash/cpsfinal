'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, CheckCircle2, History, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function RobotsTxtValidator() {
    const [input, setInput] = useState('User-agent: *\nDisallow: /admin/\nAllow: /\n\nSitemap: https://example.com/sitemap.xml');
    const [issues, setIssues] = useState<any[]>([]);

    const validate = () => {
        const found = [];
        const lines = input.split('\n');

        let hasUserAgent = false;
        lines.forEach((line, i) => {
            if (line.toLowerCase().startsWith('user-agent:')) hasUserAgent = true;

            if (line.trim() && !line.includes(':') && !line.startsWith('#')) {
                found.push({ type: 'error', line: i + 1, msg: `Missing colon in rule: "${line}"` });
            }
        });

        if (!hasUserAgent && input.trim()) {
            found.push({ type: 'error', line: 1, msg: 'Missing User-agent directive. Every group must start with User-agent.' });
        }

        if (!input.toLowerCase().includes('sitemap:')) {
            found.push({ type: 'warn', line: lines.length, msg: 'No Sitemap reference found. This helps crawlers find your content faster.' });
        }

        setIssues(found);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Robots.txt Validator</CardTitle>
                <p className="text-muted-foreground mt-2">Check your crawler access rules for syntax errors and indexing conflicts.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Robots.txt Content</label>
                    <Textarea
                        className="h-64 rounded-[2.5rem] bg-muted/20 border-2 border-primary/5 font-mono text-xs p-8"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); validate(); }}
                    />
                    <Button size="lg" className="w-full rounded-2xl h-14 font-black" onClick={validate}>Validate Directives</Button>
                </div>

                <div className="space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-4">
                        <History className="h-4 w-4" /> Compliance Log
                    </h4>
                    <div className="space-y-2">
                        {issues.map((issue, i) => (
                            <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 animate-in slide-in-from-left-2 ${issue.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                }`}>
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase opacity-70">Line {issue.line}</p>
                                    <p className="text-xs font-bold leading-tight">{issue.msg}</p>
                                </div>
                            </div>
                        ))}
                        {issues.length === 0 && input.length > 0 && (
                            <div className="p-12 rounded-[2.5rem] bg-green-500/5 border-2 border-green-500/10 text-center animate-in zoom-in-95">
                                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-black text-green-500 uppercase tracking-tighter">Perfectly Optimized</h3>
                                <p className="text-xs text-muted-foreground italic mt-2">Crawlers will be able to parse your rules without ambiguity.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 flex gap-4">
                    <ShieldAlert className="h-6 w-6 text-destructive shrink-0" />
                    <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                        <b>Critical Warning:</b> Be extremely careful with `Disallow: /`. This single line will hide your ENTIRE website from search engines, causing total loss of traffic.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
