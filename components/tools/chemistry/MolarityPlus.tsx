'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, Info, Zap, Beaker } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function MolarityPlus() {
    const [solute, setSolute] = useState(5.84); // g (NaCl default)
    const [molarMass, setMolarMass] = useState(58.44); // g/mol
    const [volume, setVolume] = useState(500); // mL

    const moles = solute / molarMass;
    const molarity = moles / (volume / 1000);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <FlaskConical className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Molarity Plus
                </CardTitle>
                <p className="text-muted-foreground mt-2">Precise concentration mapping for chemical solutions.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Mass of Solute (g)</label>
                        <Input type="number" value={solute} onChange={(e) => setSolute(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Molar Mass (g/mol)</label>
                        <Input type="number" value={molarMass} onChange={(e) => setMolarMass(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Solution Volume (mL)</label>
                        <Input type="number" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                </div>

                <div className="p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-indigo-500 text-white shadow-2xl shadow-indigo-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Beaker className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Molar Concentration (M)</p>
                    <h3 className="text-4xl md:text-7xl font-black">{molarity.toFixed(4)}</h3>
                    <div className="mt-8 flex justify-center gap-8">
                        <div className="px-6 py-2 rounded-full bg-white/10 text-xs font-bold">Moles: {moles.toFixed(4)} mol</div>
                        <div className="px-6 py-2 rounded-full bg-white/10 text-xs font-bold">Liters: {(volume / 1000).toFixed(3)} L</div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Setup Tip:</b> When preparing a molar solution, always add the solute to the flask first, then fill to the final volume mark with solvent to ensure accuracy.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
