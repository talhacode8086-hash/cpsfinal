'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryCharging, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function NernstPro() {
    const [e0, setE0] = useState(1.10); // Standard potential
    const [n, setN] = useState(2); // Electrons
    const [q, setQ] = useState(0.1); // Reaction quotient
    const [t, setT] = useState(298.15); // K

    const R = 8.314;
    const F = 96485;

    // E = E0 - (RT/nF) * ln(Q)
    const eCell = e0 - ((R * t) / (n * F)) * Math.log(q);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <BatteryCharging className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Nernst Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Calculate real-world cell potentials with varied concentrations and temperatures.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ElectroInput label="Standard E⁰ (V)" value={e0} onChange={setE0} />
                    <ElectroInput label="Electrons (n)" value={n} onChange={setN} />
                    <ElectroInput label="Quotient (Q)" value={q} onChange={setQ} />
                    <ElectroInput label="Temp (K)" value={t} onChange={setT} />
                </div>

                <div className="p-16 rounded-[4rem] bg-blue-600 text-white shadow-3xl shadow-blue-500/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Zap className="h-48 w-48 text-white" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Cell Potential (E)</p>
                    <h3 className="text-8xl font-black">{eCell.toFixed(3)} <span className="text-2xl opacity-60">V</span></h3>
                    <div className="mt-8 px-8 py-2 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest inline-block">
                        Non-Standard Condition Potential
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Electro Tip:</b> The Nernst equation explains why batteries die. As reactants are consumed, Q increases, causing the cell potential E to drop until it reaches zero.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ElectroInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-indigo-400 px-1">{label}</label>
            <Input type="number" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-center font-bold" />
        </div>
    );
}
