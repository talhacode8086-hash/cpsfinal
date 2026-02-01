'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function BeerLambertSolver() {
    const [a, setA] = useState(0.45); // Absorbance
    const [e, setE] = useState(12500); // Molar absorptivity
    const [b, setB] = useState(1.0); // Path length cm
    const [c, setC] = useState(3.6e-5); // Concentration M
    const [solvingFor, setSolvingFor] = useState<'A' | 'E' | 'C'>('C');

    const calculate = () => {
        if (solvingFor === 'A') return e * b * c;
        if (solvingFor === 'E') return a / (b * c);
        if (solvingFor === 'C') return a / (e * b);
        return 0;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Sun className="h-8 w-8 text-yellow-500" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-indigo-400 bg-clip-text text-transparent">
                    Beer-Lambert Solver
                </CardTitle>
                <p className="text-muted-foreground mt-2">The standard tool for spectrophotometry and optical density analysis.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="flex justify-center gap-2">
                    {['A', 'E', 'C'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setSolvingFor(m as any)}
                            className={`w-16 h-16 rounded-2xl font-black text-xl border transition-all ${solvingFor === m
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                    : 'bg-muted/10 border-indigo-500/10 text-muted-foreground hover:border-indigo-500/30'
                                }`}
                        >
                            {m === 'E' ? 'ε' : m}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {solvingFor !== 'A' && <SpectroInput label="Absorbance (A)" value={a} onChange={setA} />}
                        {solvingFor !== 'E' && <SpectroInput label="Molar Absorptivity (ε)" value={e} onChange={setE} unit="M⁻¹cm⁻¹" />}
                        {solvingFor !== 'C' && <SpectroInput label="Concentration (C)" value={c} onChange={setC} unit="M" />}
                        <SpectroInput label="Path Length (b)" value={b} onChange={setB} unit="cm" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <motion.div
                            key={solvingFor}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Calculated {solvingFor === 'E' ? 'ε' : solvingFor}</p>
                            <h3 className="text-6xl font-black">
                                {solvingFor === 'C' ? result.toExponential(4) : result.toFixed(solvingFor === 'A' ? 3 : 0)}
                            </h3>
                            <p className="text-[10px] font-bold mt-4 opacity-70 uppercase tracking-widest">
                                {solvingFor === 'C' ? 'moles / liter' : solvingFor === 'E' ? 'M⁻¹cm⁻¹' : 'OD units'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SpectroInput({ label, value, onChange, unit }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="h-14 rounded-2xl bg-muted/20 border-indigo-500/10 font-bold"
                />
                {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black opacity-40">{unit}</span>}
            </div>
        </div>
    );
}
