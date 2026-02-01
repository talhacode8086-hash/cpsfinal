'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftRight, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function BondPolarityPro() {
    const [en1, setEn1] = useState(3.44); // Oxygen
    const [en2, setEn2] = useState(2.20); // Hydrogen

    const diff = Math.abs(en1 - en2);

    const getBondType = (d: number) => {
        if (d < 0.5) return { type: 'Non-polar Covalent', color: 'bg-indigo-500' };
        if (d < 1.7) return { type: 'Polar Covalent', color: 'bg-purple-600' };
        return { type: 'Ionic', color: 'bg-emerald-600' };
    };

    const bond = getBondType(diff);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Bond Polarity Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict bond types and dipole moments based on Pauling electronegativity.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PolarInput label="Element 1 EN" value={en1} onChange={setEn1} />
                    <PolarInput label="Element 2 EN" value={en2} onChange={setEn2} />
                </div>

                <div className={`p-16 rounded-[4rem] transition-all duration-700 text-white shadow-3xl text-center relative overflow-hidden ${bond.color} shadow-indigo-500/30`}>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Electronegativity Difference (ΔEN)</p>
                    <h3 className="text-8xl font-black">{diff.toFixed(2)}</h3>
                    <div className="mt-8 px-10 py-3 rounded-full bg-white/10 text-sm font-black uppercase tracking-widest backdrop-blur-md">
                        {bond.type} Bond
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Rule:</b> Pauling scale values are used here. A ΔEN &gt; 1.7 typically indicates an ionic bond, while ΔEN &lt; 0.5 indicates a non-polar covalent bond.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function PolarInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <Input type="number" step="0.1" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-16 rounded-2xl bg-muted/20 border-indigo-500/10 text-center text-3xl font-black" />
        </div>
    );
}
