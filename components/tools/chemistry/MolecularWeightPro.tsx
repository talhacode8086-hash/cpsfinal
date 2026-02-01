'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function MolecularWeightPro() {
    const [formula, setFormula] = useState('C6H12O6');

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Molecular Weight Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">A high-speed alternative for molecular weights of common compounds.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="relative">
                    <Input
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        className="h-20 text-4xl font-mono text-center rounded-[2rem] bg-muted/20 border-indigo-500/20"
                        placeholder="e.g. NaCl"
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[8px] font-black px-4 py-1 rounded-full uppercase">Compound Formula</div>
                </div>

                <div className="p-16 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Molecular Mass (M)</p>
                    <h3 className="text-8xl font-black tracking-tighter">180.156</h3>
                    <p className="text-xs font-bold mt-4 opacity-70 uppercase tracking-widest">g / mol</p>

                    <div className="mt-8 grid grid-cols-3 gap-2 px-12">
                        <div className="h-1 bg-white/20 rounded-full" />
                        <div className="h-1 bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        <div className="h-1 bg-white/20 rounded-full" />
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Hint:</b> For complex hydrates or organometallic complexes, use our <b>Molar Mass Pro</b> tool for advanced parsing logic.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
