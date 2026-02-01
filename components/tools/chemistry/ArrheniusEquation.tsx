'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Info, Zap, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function ArrheniusEquation() {
    const [a, setA] = useState(1.2e11); // Pre-exponential
    const [ea, setEa] = useState(75000); // J/mol
    const [t, setT] = useState(298.15); // K

    const R = 8.314; // J/mol*K
    const k = a * Math.exp(-ea / (R * t));

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowUpRight className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Arrhenius Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Explore the impact of temperature and activation energy on reaction rates.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-orange-500 px-1">Pre-exponential (A)</label>
                        <Input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-orange-500 px-1">Activation Energy (Ea) J</label>
                        <Input type="number" value={ea} onChange={(e) => setEa(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-orange-500 px-1">Temperature (K)</label>
                        <Input type="number" value={t} onChange={(e) => setT(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                </div>

                <div className="p-16 rounded-[4.5rem] bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-3xl shadow-orange-600/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Flame className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Rate Constant (k)</p>
                    <h3 className="text-7xl font-black">{k.toExponential(4)}</h3>
                    <p className="text-[10px] font-bold mt-4 opacity-70 uppercase tracking-widest italic">Solution for k = Ae^(-Ea/RT)</p>

                    <div className="mt-12 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            animate={{ width: `${Math.min(100, Math.max(0, (k / 1e12) * 100))}%` }}
                        />
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/10 flex gap-4">
                    <Zap className="h-6 w-6 text-orange-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Insight:</b> A higher activation energy means a slower reaction. Increasing temperature significantly boosts the number of molecules with energy &gt; Ea, exponentially increasing 'k'.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
