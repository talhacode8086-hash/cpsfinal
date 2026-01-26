'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Beaker, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReactionKineticsPro() {
    const [order, setOrder] = useState<'0' | '1' | '2'>('1');
    const [initialConc, setInitialConc] = useState('1.0');
    const [rateConstant, setRateConstant] = useState('0.05');

    const generateDecayData = () => {
        const data = [];
        const A0 = parseFloat(initialConc) || 1;
        const k = parseFloat(rateConstant) || 0.05;
        const ord = parseInt(order);

        for (let t = 0; t <= 100; t += 5) {
            let A = 0;
            if (ord === 0) {
                A = Math.max(0, A0 - k * t);
            } else if (ord === 1) {
                // A = A0 * e^(-kt)
                A = A0 * Math.exp(-k * t);
            } else if (ord === 2) {
                // 1/A = 1/A0 + kt => A = 1 / (1/A0 + kt)
                A = 1 / (1 / A0 + k * t);
            }
            data.push({ t, conc: A.toFixed(4) });
        }
        return data;
    };

    const calculateHalfLife = () => {
        const A0 = parseFloat(initialConc) || 1;
        const k = parseFloat(rateConstant) || 0.05;
        if (k === 0) return 'âˆž';

        if (order === '0') return (A0 / (2 * k)).toFixed(2);
        if (order === '1') return (Math.log(2) / k).toFixed(2);
        if (order === '2') return (1 / (k * A0)).toFixed(2);
        return '0';
    };

    const data = generateDecayData();
    const halfLife = calculateHalfLife();

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Reaction Kinetics Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Analyze chemical decay patterns and calculate reaction rates with integrated order modeling.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Controls */}
                    <div className="w-full lg:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className="space-y-6 bg-muted/20 p-8 rounded-[3rem] border border-primary/5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">Reaction Order</label>
                                <Select value={order} onValueChange={(v: any) => setOrder(v)}>
                                    <SelectTrigger className="h-12 rounded-xl bg-background border-primary/10 font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Zero Order</SelectItem>
                                        <SelectItem value="1">First Order</SelectItem>
                                        <SelectItem value="2">Second Order</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <KinInput label="Init. Concentration [M]" value={initialConc} onChange={setInitialConc} />
                            <KinInput label="Rate Constant (k)" value={rateConstant} onChange={setRateConstant} />
                        </div>

                        <div className="p-10 rounded-[3rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 text-white flex flex-col items-center justify-center gap-2">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">CALCULATED Tâ‚/â‚‚</p>
                            <h3 className="text-5xl font-black">{halfLife}<span className="text-sm ml-1 opacity-50">Units</span></h3>
                            <Clock className="h-5 w-5 opacity-40 mt-2" />
                        </div>
                    </div>

                    {/* Plot Area */}
                    <div className="flex-1 h-[500px] bg-muted/10 rounded-[4rem] border border-primary/10 p-10 relative">
                        <div className="absolute top-8 left-12 flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Concentration vs Time Decay</span>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.05)" />
                                <XAxis dataKey="t" stroke="hsl(var(--primary)/20%)" fontSize={10} fontStyle="bold" label={{ value: 'Time (s)', position: 'insideBottom', offset: -10, fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                                <YAxis stroke="hsl(var(--primary)/20%)" fontSize={10} fontStyle="bold" label={{ value: 'Conc [M]', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/0.1)', fontWeight: 'bold' }}
                                    itemStyle={{ color: 'hsl(var(--primary))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="conc"
                                    stroke="hsl(var(--primary))"
                                    fill="hsl(var(--primary))"
                                    fillOpacity={0.1}
                                    strokeWidth={4}
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-background border border-primary/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Beaker className="h-5 w-5" /></div>
                        <div>
                            <p className="text-xs font-black uppercase text-primary/40 mb-1">Integrated Rate Law</p>
                            <p className="text-sm font-bold opacity-70 italic text-primary">
                                {order === '0' ? '[A] = -kt + [A]â‚€' : order === '1' ? 'ln[A] = -kt + ln[A]â‚€' : '1/[A] = kt + 1/[A]â‚€'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 border-l border-primary/5 pl-8">
                        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Info className="h-5 w-5" /></div>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            Half-life depends on initial concentration for zero and second-order reactions, but is constant for first-order reactions.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function KinInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-primary/40 pl-2">{label}</label>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 rounded-xl bg-background border-primary/10 font-bold"
            />
        </div>
    );
}
