'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function FormalChargeSolver() {
    const [valence, setValence] = useState(6); // Oxygen
    const [lone, setLone] = useState(4);
    const [bonding, setBonding] = useState(4); // 2 bonds = 4 electrons

    const fc = valence - lone - (bonding / 2);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Formal Charge Solver
                </CardTitle>
                <p className="text-muted-foreground mt-2">Identify the most stable Lewis structures with precise charge mapping.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ChargeInput label="Valence Electrons" value={valence} onChange={setValence} />
                    <ChargeInput label="Lone Pair Electrons" value={lone} onChange={setLone} />
                    <ChargeInput label="Bonding Electrons" value={bonding} onChange={setBonding} />
                </div>

                <div className={`p-16 rounded-[4rem] transition-all duration-500 text-white shadow-3xl text-center relative overflow-hidden ${fc === 0 ? 'bg-indigo-600 shadow-indigo-500/30' : 'bg-purple-600 shadow-purple-500/30'}`}>
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Activity className="h-48 w-48" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Formal Charge (FC)</p>
                    <h3 className="text-9xl font-black">{fc > 0 ? `+${fc}` : fc}</h3>
                    <div className="mt-8 px-8 py-2 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest inline-block">
                        Stability: {fc === 0 ? 'Maximum' : 'Resonant / Polar'}
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> Formal Charge = Valence - (Lone Electrons + 1/2 Bonding Electrons). Stable molecules usually have atoms with formal charges as close to zero as possible.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ChargeInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <Input type="number" value={value} onChange={(e) => onChange(parseInt(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-indigo-500/10 text-center text-xl font-bold" />
        </div>
    );
}
