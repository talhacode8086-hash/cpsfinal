'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Info, Maximize2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function ProbabilityPro() {
    const [mode, setMode] = useState<'Normal' | 'Binomial'>('Normal');
    const [mean, setMean] = useState('0');
    const [stdDev, setStdDev] = useState('1');
    const [n, setN] = useState('10');
    const [p, setP] = useState('0.5');

    const generateNormalData = () => {
        const data = [];
        const m = parseFloat(mean) || 0;
        const s = parseFloat(stdDev) || 1;

        for (let x = m - 4 * s; x <= m + 4 * s; x += 0.1 * s) {
            const y = (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - m) / s, 2));
            data.push({ x: x.toFixed(2), y });
        }
        return data;
    };

    const generateBinomialData = () => {
        const data = [];
        const nv = parseInt(n) || 10;
        const pv = parseFloat(p) || 0.5;

        const factorial = (num: number): number => (num <= 1 ? 1 : num * factorial(num - 1));
        const nCr = (n: number, r: number) => factorial(n) / (factorial(r) * factorial(n - r));

        for (let k = 0; k <= nv; k++) {
            const prob = nCr(nv, k) * Math.pow(pv, k) * Math.pow(1 - pv, nv - k);
            data.push({ k, p: prob });
        }
        return data;
    };

    const normalData = generateNormalData();
    const binomialData = generateBinomialData();

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Probability Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Professional statistical engine for Normal and Binomial distribution analysis.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Controls */}
                    <div className="w-full lg:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className="bg-muted/20 p-2 rounded-2xl border border-primary/5 flex gap-2">
                            <Button
                                variant={mode === 'Normal' ? 'default' : 'ghost'}
                                onClick={() => setMode('Normal')}
                                className="flex-1 rounded-xl font-bold"
                            >
                                Normal
                            </Button>
                            <Button
                                variant={mode === 'Binomial' ? 'default' : 'ghost'}
                                onClick={() => setMode('Binomial')}
                                className="flex-1 rounded-xl font-bold"
                            >
                                Binomial
                            </Button>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-background border border-primary/5 shadow-xl space-y-6">
                            {mode === 'Normal' ? (
                                <>
                                    <ParamInput label="Mean (Î¼)" value={mean} onChange={setMean} />
                                    <ParamInput label="Std Dev (Ïƒ)" value={stdDev} onChange={setStdDev} />
                                </>
                            ) : (
                                <>
                                    <ParamInput label="Trials (n)" value={n} onChange={setN} />
                                    <ParamInput label="Prob (p)" value={p} onChange={setP} />
                                </>
                            )}
                        </div>

                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                            <h5 className="text-[10px] font-black uppercase text-primary mb-2 flex items-center gap-2">
                                <TrendingUp className="h-3 w-3" /> STAT NOTE
                            </h5>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                {mode === 'Normal'
                                    ? '68% of data falls within 1Ïƒ, 95% within 2Ïƒ, and 99.7% within 3Ïƒ.'
                                    : 'Binomial distribution models the number of successes in n independent Bernoulli trials.'}
                            </p>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 h-[500px] bg-muted/10 rounded-[3rem] border border-primary/10 p-8 relative">
                        <div className="absolute top-6 right-8 px-4 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-primary/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 z-10">
                            <Maximize2 className="h-3 w-3" /> Interactive PDF
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            {mode === 'Normal' ? (
                                <AreaChart data={normalData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.05)" />
                                    <XAxis dataKey="x" stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                    <YAxis stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/0.1)', fontWeight: 'bold' }}
                                        itemStyle={{ color: 'hsl(var(--primary))' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="y"
                                        stroke="hsl(var(--primary))"
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.1}
                                        strokeWidth={4}
                                        animationDuration={800}
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart data={binomialData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.05)" />
                                    <XAxis dataKey="k" stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                    <YAxis stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/0.1)', fontWeight: 'bold' }}
                                        itemStyle={{ color: 'hsl(var(--primary))' }}
                                    />
                                    <Bar
                                        dataKey="p"
                                        fill="hsl(var(--primary))"
                                        radius={[10, 10, 0, 0]}
                                        animationDuration={800}
                                    />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-10 rounded-[4rem] bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0 mt-1" />
                    <div className="text-xs text-muted-foreground leading-relaxed italic">
                        The Central Limit Theorem states that as the sample size increases, the distribution of the sample mean approaches a normal distribution, regardless of the population distribution shape.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ParamInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-primary/40 pl-2">{label}</label>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 rounded-2xl bg-muted/10 border-transparent focus:bg-background transition-colors text-center font-black text-xl"
            />
        </div>
    );
}
