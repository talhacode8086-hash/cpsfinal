'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, GitBranch, Link, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InternalLinkStrategist() {
    const [strategy, setStrategy] = useState<'silo' | 'chain' | 'hub'>('hub');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Internal Link Strategist</CardTitle>
                <p className="text-muted-foreground mt-2">Map out your site structure for optimal SEO authority distribution.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-3 gap-4">
                    <StrategyOption
                        active={strategy === 'silo'}
                        icon={<GitBranch />}
                        label="SILO Structure"
                        onClick={() => setStrategy('silo')}
                    />
                    <StrategyOption
                        active={strategy === 'chain'}
                        icon={<Link />}
                        label="Chain Linking"
                        onClick={() => setStrategy('chain')}
                    />
                    <StrategyOption
                        active={strategy === 'hub'}
                        icon={<Shield />}
                        label="Hub & Spoke"
                        onClick={() => setStrategy('hub')}
                    />
                </div>

                <div className="relative p-12 rounded-[4rem] bg-muted/10 border-2 border-primary/10 overflow-hidden min-h-[400px] flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

                    {strategy === 'hub' && (
                        <div className="relative flex flex-col items-center gap-12 animate-in zoom-in-50 duration-500">
                            <div className="w-40 h-40 bg-primary/20 rounded-full border-4 border-primary/30 flex items-center justify-center shadow-2xl">
                                <span className="font-black text-xl text-primary text-center">CORNERSTONE<br />PAGE</span>
                            </div>
                            <div className="flex gap-12">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-24 h-24 bg-background border-2 border-primary/10 rounded-[2rem] flex items-center justify-center shadow-xl group hover:border-primary/40 transition-all">
                                        <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary">Sub-Topic</span>
                                        {/* Connector Line */}
                                        <div className="absolute top-0 w-[2px] h-12 bg-primary/10 -translate-y-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {strategy === 'silo' && (
                        <div className="relative flex flex-col gap-6 animate-in slide-in-from-left-8 duration-500">
                            <div className="w-64 h-20 bg-primary/20 rounded-2xl border-2 border-primary/30 flex items-center justify-center">
                                <span className="font-black text-primary uppercase">Main Category</span>
                            </div>
                            <div className="ml-12 w-64 h-20 bg-muted/50 rounded-2xl border-2 border-primary/5 flex items-center justify-center">
                                <span className="font-bold text-muted-foreground">Article 1.1</span>
                            </div>
                            <div className="ml-12 w-64 h-20 bg-muted/50 rounded-2xl border-2 border-primary/5 flex items-center justify-center">
                                <span className="font-bold text-muted-foreground">Article 1.2</span>
                            </div>
                        </div>
                    )}

                    {strategy === 'chain' && (
                        <div className="flex gap-4 items-center animate-in slide-in-from-right-8 duration-500">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-primary/5 border-2 border-primary/20 rounded-full flex items-center justify-center font-black text-primary">PAGE {i}</div>
                                    {i < 3 && <Link className="h-6 w-6 text-primary/20" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h4 className="font-black text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                            <Info className="h-4 w-4" /> Strategy Insight
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            {strategy === 'hub' ? 'Concentrates authority into a single "Power Page" to rank for high-volume keywords.' :
                                strategy === 'silo' ? 'Groups related content tightly to dominate specific niche sub-topics.' :
                                    'Creates a path for users to discover related content sequentially, lowering bounce rates.'}
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <p className="text-[10px] font-black text-primary uppercase mb-1">SEO Impact</p>
                        <p className="text-2xl font-black">HIGH</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StrategyOption({ active, icon, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${active ? 'bg-primary/10 border-primary text-primary shadow-xl shadow-primary/10' : 'bg-muted/10 border-primary/5 text-muted-foreground hover:bg-muted/20'
                }`}
        >
            <div className={`h-8 w-8 ${active ? 'animate-bounce' : ''}`}>{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
