'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Info, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CanonicalURLChecker() {
    const [html, setHtml] = useState('');
    const [canonical, setCanonical] = useState('');

    const scan = () => {
        const match = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
        setCanonical(match ? match[1] : 'None detected');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Canonical URL Validator</CardTitle>
                <p className="text-muted-foreground mt-2">Prevent duplicate content issues by verifying your primary source identification.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Paste Page HTML Head</label>
                    <textarea
                        className="w-full h-48 p-6 rounded-3xl bg-muted/20 border-2 border-primary/5 font-mono text-xs focus:border-primary/20 outline-none transition-all"
                        placeholder="<head>...<link rel=&apos;canonical&apos; href=&apos;...&apos; />...</head>"
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                    />
                    <Button size="lg" className="w-full rounded-2xl h-14 font-black" onClick={scan}>Check Canonical Tag</Button>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col md:flex-row items-center gap-6 ${canonical && canonical !== 'None detected' ? 'bg-green-500/10 border-green-500/20' : 'bg-destructive/10 border-destructive/20'
                    }`}>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="font-black text-sm uppercase tracking-tighter mb-1 text-primary">Crawl Signal Output</h4>
                        <p className="font-mono text-sm break-all">{canonical}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/30 flex gap-3 text-xs">
                        <Info className="h-4 w-4 text-primary shrink-0" />
                        <p className="text-muted-foreground italic">If missing, search engines might divide ranking power between multiple versions of the same page.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 flex gap-3 text-xs">
                        <Link className="h-4 w-4 text-primary shrink-0" />
                        <p className="text-muted-foreground italic">Always point the canonical to the &quot;original&quot; URL to consolidate SEO authority.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
