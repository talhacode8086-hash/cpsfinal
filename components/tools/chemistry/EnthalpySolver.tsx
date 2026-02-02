'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Info, Zap, Thermometer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function EnthalpySolver() {
    const [productsH, setProductsH] = useState(-393.5); // CO2
    const [reactantsH, setReactantsH] = useState(0); // O2/C

    const deltaH = productsH - reactantsH;

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Flame className="h-8 w-8 text-red-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-indigo-400 bg-clip-text text-transparent">
                    Enthalpy Solver
                </CardTitle>
                <p className="text-muted-foreground mt-2">Analyze heat changes and reaction thermochemistry via Hess's Law.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ThermInput label="Σ ΔHf (Products)" value={productsH} onChange={setProductsH} sub="kJ/mol" />
                    <ThermInput label="Σ ΔHf (Reactants)" value={reactantsH} onChange={setReactantsH} sub="kJ/mol" />
                </div>

                <div className={`p-6 md:p-16 rounded-[2rem] md:rounded-[4rem] transition-colors duration-500 text-white shadow-3xl text-center relative overflow-hidden ${deltaH < 0 ? 'bg-red-600 shadow-red-600/30' : 'bg-blue-600 shadow-blue-600/30'}`}>
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Thermometer className="h-48 w-48" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Change in Enthalpy (ΔH)</p>
                    <h3 className="text-4xl md:text-7xl font-black">{deltaH.toFixed(2)} <span className="text-2xl opacity-60">kJ</span></h3>
                    <div className="mt-8 inline-block px-8 py-2 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest">
                        Reaction is {deltaH < 0 ? 'Exothermic (Releases Heat)' : 'Endothermic (Absorbs Heat)'}
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> ΔHf is defined for standard conditions (298.15K, 1 atm). For non-standard work, use Kirchhoff's law to adjust enthalpy for temperature.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ThermInput({ label, value, onChange, sub }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="h-12 md:h-16 rounded-2xl bg-muted/20 border-indigo-500/10 text-center text-xl md:text-2xl font-black pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black opacity-40">{sub}</span>
            </div>
        </div>
    );
}
