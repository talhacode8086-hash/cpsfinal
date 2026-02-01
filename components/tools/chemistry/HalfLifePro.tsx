'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radiation, Info, Timer, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function HalfLifePro() {
    const [initialMass, setInitialMass] = useState(100);
    const [halfLife, setHalfLife] = useState(5730); // Carbon-14
    const [time, setTime] = useState(10000);

    const lambda = Math.log(2) / halfLife;
    const remainingMass = initialMass * Math.exp(-lambda * time);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Radiation className="h-8 w-8 text-red-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-indigo-400 bg-clip-text text-transparent">
                    Nuclear Half-Life
                </CardTitle>
                <p className="text-muted-foreground mt-2">Simulate radioactive decay and carbon dating timelines.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <DecayInput label="Initial Mass (g)" value={initialMass} onChange={setInitialMass} />
                    <DecayInput label="Half-Life (Years)" value={halfLife} onChange={setHalfLife} />
                    <DecayInput label="Elapsed Time (Years)" value={time} onChange={setTime} />
                </div>

                <div className="p-16 rounded-[4rem] bg-red-600 text-white shadow-3xl shadow-red-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Activity className="h-48 w-48" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Remaining Mass (g)</p>
                    <h3 className="text-8xl font-black">{remainingMass.toFixed(3)}</h3>
                    <div className="mt-8 flex justify-center gap-6">
                        <div className="px-6 py-2 rounded-full bg-white/10 text-xs font-bold uppercase">Decays: {((initialMass - remainingMass) / initialMass * 100).toFixed(1)}%</div>
                        <div className="px-6 py-2 rounded-full bg-white/20 text-xs font-bold uppercase">λ: {lambda.toExponential(4)} yr⁻¹</div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> Radioactive decay follows first-order kinetics. This means the time required for half the atoms to decay is independent of the starting amount.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function DecayInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-red-400 px-1">{label}</label>
            <Input type="number" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-red-500/10 text-center text-xl font-bold" />
        </div>
    );
}
