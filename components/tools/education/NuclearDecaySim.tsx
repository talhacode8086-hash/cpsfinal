"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ChevronRight, Info, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function NuclearDecaySim() {
    const [initialAmount, setInitialAmount] = useState<number>(100);
    const [halfLife, setHalfLife] = useState<number>(10); // years
    const [timePassed, setTimePassed] = useState<number>(5); // years

    const decayData = useMemo(() => {
        // N(t) = N0 * (1/2)^(t / T_half)
        const lambda = Math.log(2) / halfLife;
        const currentAmount = initialAmount * Math.pow(0.5, timePassed / halfLife);
        const percentLeft = (currentAmount / initialAmount) * 100;
        const activity = lambda * currentAmount;

        const graph = [];
        for (let i = 0; i <= 50; i++) {
            const t = (i / 50) * (halfLife * 4); // Show up to 4 half-lives
            const n = initialAmount * Math.pow(0.5, t / halfLife);
            graph.push({ t, n });
        }

        return { currentAmount, percentLeft, lambda, graph, activity };
    }, [initialAmount, halfLife, timePassed]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldAlert className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Nuclear Decay Simulator</CardTitle>
                <p className="text-muted-foreground mt-2">Radioactive Half-Life & Decay Activity.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Initial Amount (N_0)</label>
                                <span className="font-mono text-primary font-bold">{initialAmount} g</span>
                            </div>
                            <Slider value={[initialAmount]} min={1} max={1000} step={1} onValueChange={([val]) => setInitialAmount(val)} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Half-Life (T_1/2)</label>
                                <span className="font-mono text-primary font-bold">{halfLife} Years</span>
                            </div>
                            <Slider value={[halfLife]} min={0.1} max={100} step={0.1} onValueChange={([val]) => setHalfLife(val)} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Elapsed Time (t)</label>
                                <span className="font-mono text-primary font-bold">{timePassed} Years</span>
                            </div>
                            <Slider value={[timePassed]} min={0} max={halfLife * 4} step={0.1} onValueChange={([val]) => setTimePassed(val)} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 justify-center">
                        <div className="p-8 rounded-[2rem] bg-secondary/20 border border-primary/10 text-center relative overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-primary/5 transition-all duration-500"
                                style={{ width: `${decayData.percentLeft}%` }}
                            />
                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase text-muted-foreground mb-2">Remaining Amount (N)</div>
                                <div className="text-4xl font-black text-foreground mb-1">{decayData.currentAmount.toFixed(4)} g</div>
                                <div className="text-sm font-bold text-primary">{decayData.percentLeft.toFixed(1)}% Left</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-card border border-border rounded-2xl text-center">
                                <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Decay Constant (λ)</div>
                                <div className="font-mono font-bold">{decayData.lambda.toFixed(4)}</div>
                            </div>
                            <div className="p-4 bg-card border border-border rounded-2xl text-center">
                                <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Current Activity</div>
                                <div className="font-mono font-bold">{decayData.activity.toFixed(4)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Decay Curve</h3>
                    <div className="h-48 bg-card rounded-2xl border border-primary/5 p-4 relative">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polyline
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                points={decayData.graph.map((d, i) => `${(d.t / (halfLife * 4)) * 100},${100 - (d.n / initialAmount) * 100}`).join(' ')}
                            />
                            {/* Current Point */}
                            <circle
                                cx={(timePassed / (halfLife * 4)) * 100}
                                cy={100 - (decayData.currentAmount / initialAmount) * 100}
                                r="2"
                                fill="hsl(var(--primary))"
                                className="animate-pulse"
                            />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-primary/5">
                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h4 className="flex items-center gap-2 font-bold mb-3 text-primary">
                            <History className="w-4 h-4" /> Real-World Examples
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => { setHalfLife(5730); setTimePassed(2000); }}>Carbon-14 (Dating)</Button>
                            <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => { setHalfLife(8); setTimePassed(10); }}>Iodine-131 (Medical)</Button>
                        </div>
                    </div>
                    <div className="space-y-4 flex flex-col justify-center">
                        <div className="p-3 bg-secondary/10 rounded-xl border border-border flex justify-between font-mono text-xs">
                            <span>N(t) = N₀e^(-λt)</span>
                            <span className="text-muted-foreground">Exponential Law</span>
                        </div>
                        <div className="p-3 bg-secondary/10 rounded-xl border border-border flex justify-between font-mono text-xs">
                            <span>λ = ln(2) / T_{1 / 2}</span>
                            <span className="text-muted-foreground">Constant Relation</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
