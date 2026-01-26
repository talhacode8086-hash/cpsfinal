'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ALTTextAccessibility() {
    const [html, setHtml] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const scan = () => {
        const imgTags = html.match(/<img.*?>/gi) || [];
        const processed = imgTags.map(tag => {
            const altMatch = tag.match(/alt=["'](.*?)["']/i);
            const srcMatch = tag.match(/src=["'](.*?)["']/i);
            const alt = altMatch ? altMatch[1] : null;
            const src = srcMatch ? srcMatch[1] : 'unknown';
            return { tag, alt, src };
        });
        setResults(processed);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">ALT Text Accessibility Scan</CardTitle>
                <p className="text-muted-foreground mt-2">Identify missing image descriptions to improve accessibility and SEO rankings.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Paste HTML Content</label>
                    <Textarea
                        placeholder="<img src='logo.png'> <img src='hero.jpg' alt='premium tools'>..."
                        className="h-48 rounded-3xl border-primary/10 bg-muted/20 font-mono text-xs"
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                    />
                    <Button size="lg" className="w-full rounded-2xl h-14 font-black" onClick={scan}>Scan for Accessibility Gaps</Button>
                </div>

                {results.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center px-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Image Audit</h4>
                            <span className="text-[10px] font-black bg-destructive/10 text-destructive px-3 py-1 rounded-full uppercase tracking-tighter">
                                {results.filter(r => !r.alt).length} ISSUES FOUND
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {results.map((r, i) => (
                                <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 ${r.alt ? 'bg-green-500/5 border-green-500/10' : 'bg-destructive/5 border-destructive/10'
                                    }`}>
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-primary/5">
                                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-muted-foreground truncate">{r.src}</p>
                                        <p className={`text-sm font-bold truncate ${!r.alt ? 'text-destructive italic' : 'text-primary'}`}>
                                            {r.alt || 'MISSING ALT TEXT'}
                                        </p>
                                    </div>
                                    {r.alt ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> : <AlertCircle className="h-5 w-5 text-destructive shrink-0" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
