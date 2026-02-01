'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Info, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function RateLawCalculator() {
    const [k, setK] = useState(0.015);
    const [a, setA] = useState(0.1);
    const [orderA, setOrderA] = useState(1);
    const [b, setB] = useState(0.2);
    const [orderB, setOrderB] = useState(2);

    const rate = k * Math.pow(a, orderA) * Math.pow(b, orderB);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Timer className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Kinetics Rate Law
                </CardTitle>
                <p className="text-muted-foreground mt-2">Calculate reaction rates and overall orders for any chemical process.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                            <label className="text-[10px] font-black uppercase text-indigo-400 mb-4 block">Rate Constant (k)</label>
                            <Input type="number" value={k} onChange={(e) => setK(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                                <label className="text-[10px] font-black uppercase text-indigo-400 mb-4 block">[A] (M)</label>
                                <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                                <div className="mt-4 flex gap-2">
                                    {[0, 1, 2].map(o => (
                                        <button key={o} onClick={() => setOrderA(o)} className={`flex-1 py-1 rounded-lg text-[10px] font-bold ${orderA === o ? 'bg-indigo-500 text-white' : 'bg-muted'}`}>Order {o}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                                <label className="text-[10px] font-black uppercase text-indigo-400 mb-4 block">[B] (M)</label>
                                <Input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                                <div className="mt-4 flex gap-2">
                                    {[0, 1, 2].map(o => (
                                        <button key={o} onClick={() => setOrderB(o)} className={`flex-1 py-1 rounded-lg text-[10px] font-bold ${orderB === o ? 'bg-indigo-500 text-white' : 'bg-muted'}`}>Order {o}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="p-12 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                            <Activity className="absolute top-8 right-8 h-10 w-10 opacity-10" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Reaction Rate (v)</p>
                            <h3 className="text-6xl font-black">{rate.toExponential(4)}</h3>
                            <p className="text-[10px] font-bold mt-4 opacity-70 uppercase tracking-widest">M/s · Overall Order: {orderA + orderB}</p>

                            <div className="mt-8 p-4 rounded-2xl bg-white/10 font-mono text-sm">
                                Rate = k[A]<sup>{orderA}</sup>[B]<sup>{orderB}</sup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Guide:</b> The rate law is determined experimentally. The orders (m, n) do not always match the stoichiometric coefficients in the balanced equation.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
