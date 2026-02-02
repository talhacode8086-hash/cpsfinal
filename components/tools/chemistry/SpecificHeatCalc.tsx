'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function SpecificHeatCalc() {
    const [q, setQ] = useState(100); // Joules
    const [m, setM] = useState(10); // grams
    const [c, setC] = useState(4.184); // J/gK (Water)
    const [dt, setDt] = useState(2.39); // K/C
    const [solvingFor, setSolvingFor] = useState<'q' | 'm' | 'c' | 'dt'>('q');

    const calculate = () => {
        if (solvingFor === 'q') return m * c * dt;
        if (solvingFor === 'm') return q / (c * dt);
        if (solvingFor === 'c') return q / (m * dt);
        if (solvingFor === 'dt') return q / (m * c);
        return 0;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Thermometer className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Specific Heat Solver
                </CardTitle>
                <p className="text-muted-foreground mt-2">Solve q = mcΔT problems for calorimetry and thermodynamics.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {['q', 'm', 'c', 'dt'].map((target) => (
                        <button
                            key={target}
                            onClick={() => setSolvingFor(target as any)}
                            className={`w-20 h-20 rounded-3xl border-2 font-black text-xl transition-all ${solvingFor === target
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                                : 'bg-muted/10 border-blue-500/5 text-muted-foreground hover:border-blue-500/20'
                                }`}
                        >
                            {target === 'dt' ? 'ΔT' : target}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {solvingFor !== 'q' && <HeatInput label="Heat Energy (q)" value={q} onChange={setQ} unit="J" />}
                        {solvingFor !== 'm' && <HeatInput label="Mass (m)" value={m} onChange={setM} unit="g" />}
                        {solvingFor !== 'c' && <HeatInput label="Specific Heat (c)" value={c} onChange={setC} unit="J/g·°C" />}
                        {solvingFor !== 'dt' && <HeatInput label="Temp Change (ΔT)" value={dt} onChange={setDt} unit="°C" />}
                    </div>

                    <div className="flex flex-col justify-center">
                        <motion.div
                            key={solvingFor}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-blue-600 text-white shadow-3xl shadow-blue-600/40 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Zap className="h-32 w-32" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Calculated {solvingFor === 'dt' ? 'ΔT' : solvingFor}</p>
                            <h3 className="text-4xl md:text-7xl font-black">{result.toFixed(3)}</h3>
                            <p className="text-xs font-bold mt-4 opacity-50 uppercase tracking-widest">
                                {solvingFor === 'q' ? 'Joules' : solvingFor === 'm' ? 'grams' : solvingFor === 'c' ? 'J/g·°C' : 'Celsius'}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-blue-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> The specific heat of liquid water is 4.184 J/g·°C. Use this for most aqueous calorimetry problems unless specified otherwise.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function HeatInput({ label, value, onChange, unit }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 px-1">{label}</label>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="h-12 md:h-16 rounded-2xl bg-muted/20 border-blue-500/10 text-xl font-bold pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-blue-400 opacity-60">{unit}</span>
            </div>
        </div>
    );
}
