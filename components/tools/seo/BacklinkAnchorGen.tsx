'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Shuffle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function BacklinkAnchorGen() {
    const [brand, setBrand] = useState('Antigravity');
    const [keyword, setKeyword] = useState('Web Tools');
    const [url, setUrl] = useState('https://tools.example.com');
    const [results, setResults] = useState<any[]>([]);

    const generate = () => {
        const anchors = [
            { type: 'Branded', text: brand },
            { type: 'Keyword', text: keyword },
            { type: 'B+K', text: `${brand} ${keyword}` },
            { type: 'Generic', text: 'click here' },
            { type: 'Generic', text: 'visit website' },
            { type: 'Naked', text: url.replace('https://', '') },
        ];
        setResults(anchors);
        toast.info('Anchor Profile Generated');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Link className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Backlink Anchor Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Diversify your link building strategy with smart anchor text variations.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary font-bold">Brand Name</label>
                        <Input value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded-xl border-primary/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary font-bold">Target Keyword</label>
                        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="rounded-xl border-primary/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary font-bold">Landing URL</label>
                        <Input value={url} onChange={(e) => setUrl(e.target.value)} className="rounded-xl border-primary/10" />
                    </div>
                </div>

                <Button size="lg" className="w-full rounded-2xl h-16 font-black gap-2 shadow-lg shadow-primary/20" onClick={generate}>
                    <Shuffle className="h-6 w-6" /> Create Diversified Profile
                </Button>

                {results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-500">
                        {results.map((r, i) => (
                            <div key={i} className="flex justify-between items-center p-6 rounded-3xl bg-muted/20 border border-primary/5 hover:border-primary/20 transition-all group">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded leading-none">{r.type}</span>
                                    <p className="text-sm font-bold truncate max-w-[150px]">{r.text}</p>
                                </div>
                                <Button variant="ghost" className="rounded-xl h-10 w-10 p-0 hover:bg-primary/20" onClick={() => {
                                    navigator.clipboard.writeText(`<a href="${url}">${r.text}</a>`);
                                    toast.success('HTML Code Copied');
                                }}>
                                    <Copy className="h-4 w-4 text-primary" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
