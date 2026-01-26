'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Map, Compass, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NicheKeywordResearch() {
    const [seed, setSeed] = useState('modern coffee makers');
    const [results, setResults] = useState<any[]>([]);

    const generate = () => {
        const topics = [
            { kw: `best ${seed} 2024`, volume: '1.2K', kd: 'Easy' },
            { kw: `cheap ${seed} under $100`, volume: '800', kd: 'Medium' },
            { kw: `how to clean ${seed}`, volume: '2.5K', kd: 'Very Easy' },
            { kw: `${seed} reviews reddit`, volume: '450', kd: 'Easy' },
            { kw: `${seed} vs espresso machine`, volume: '1.8K', kd: 'Hard' },
        ];
        setResults(topics);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Niche Keyword Research</CardTitle>
                <p className="text-muted-foreground mt-2">Discover untapped long-tail keywords for your content strategy.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex gap-4">
                    <Input
                        placeholder="Enter seed topic (e.g. gaming pc)..."
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        className="h-14 rounded-2xl bg-muted/20 border-primary/20 text-lg flex-1"
                    />
                    <Button size="lg" className="h-14 rounded-2xl px-10 font-bold" onClick={generate}>Research</Button>
                </div>

                {results.length > 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6">
                        <div className="flex items-center justify-between px-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Opportunity Map</h4>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Easy</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Medium</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-destructive" /> Hard</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {results.map((r, i) => (
                                <div key={i} className="p-6 rounded-[2rem] bg-background border border-primary/5 hover:border-primary/20 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-muted/30 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{r.kw}</span>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase transparency-widest text-muted-foreground">Volume</p>
                                            <p className="text-xs font-black">{r.volume}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r.kd === 'Easy' || r.kd === 'Very Easy' ? 'bg-green-500/10 text-green-500' :
                                                r.kd === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-destructive/10 text-destructive'
                                            }`}>
                                            {r.kd}
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
