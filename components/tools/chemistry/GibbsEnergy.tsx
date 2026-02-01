'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Info, ThermometerSnowflake, Waves } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function GibbsEnergy() {
    const [h, setH] = useState(-50); // kJ
    const [s, setS] = useState(120); // J/K
    const [t, setT] = useState(298.15); // K

    // ΔG = ΔH - TΔS
    // Note: S is usually in J/K, H in kJ.
    const deltaG = h - (t * (s / 1000));

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-amber-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">
                    Gibbs & Spontaneity
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict reaction spontaneity using the Second Law of Thermodynamics.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GibbsInput label="ΔH (Enthalpy)" value={h} onChange={setH} unit="kJ" icon={<ThermometerSnowflake className="h-4 w-4" />} />
                    <GibbsInput label="ΔS (Entropy)" value={s} onChange={setS} unit="J/K" icon={<Waves className="h-4 w-4" />} />
                    <GibbsInput label="Temp (Kelvin)" value={t} onChange={setT} unit="K" />
                </div>

                <div className={`p-16 rounded-[4rem] transition-all duration-700 text-white shadow-3xl text-center relative overflow-hidden ${deltaG < 0 ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-rose-600 shadow-rose-500/30'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Gibbs Free Energy (ΔG)</p>
                    <h3 className="text-8xl font-black tracking-tighter">{deltaG.toFixed(2)} <span className="text-2xl opacity-60">kJ</span></h3>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="px-10 py-3 rounded-full bg-white/20 text-sm font-black uppercase tracking-widest backdrop-blur-md">
                            {deltaG < 0 ? 'Process is Spontaneous' : 'Process is Non-Spontaneous'}
                        </div>
                        <p className="text-[10px] uppercase font-bold opacity-70">
                            {deltaG < 0 ? 'Favors Product Formation' : 'Requires Energy Input'}
                        </p>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Thermodynamic Note:</b> ΔG &lt; 0 indicates a spontaneous process. When ΔG = 0, the system is at chemical equilibrium.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function GibbsInput({ label, value, onChange, unit, icon }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                {icon}
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{label}</label>
            </div>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="h-16 rounded-2xl bg-muted/20 border-indigo-500/10 text-center text-2xl font-black pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black opacity-30">{unit}</span>
            </div>
        </div>
    );
}
