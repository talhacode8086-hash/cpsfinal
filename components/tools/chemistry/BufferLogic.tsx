'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pipette, Info, Zap, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function BufferLogic() {
    const [pka, setPka] = useState(4.76); // Acetic acid
    const [acid, setAcid] = useState(0.1);
    const [base, setBase] = useState(0.1);

    const ph = pka + Math.log10(base / acid);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Pipette className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Henderson-Hasselbalch Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict buffer pH and capacity for complex acid-base equilibria.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BufferInput label="pKa of Weak Acid" value={pka} onChange={setPka} />
                    <BufferInput label="[Weak Acid] M" value={acid} onChange={setAcid} />
                    <BufferInput label="[Conjugate Base] M" value={base} onChange={setBase} />
                </div>

                <div className="p-16 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-8 opacity-10">
                        <Layers className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Calculated pH of Buffer</p>
                    <h3 className="text-8xl font-black">{ph.toFixed(3)}</h3>
                    <div className="mt-8 flex justify-center gap-6">
                        <span className="px-6 py-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest">
                            Ratio: {(base / acid).toFixed(2)}:1
                        </span>
                        <span className="px-6 py-2 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest">
                            Stable Range
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                        <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            A buffer is most effective when pH = pKa. This happens when the concentrations of the acid and base are equal.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
                        <Zap className="h-6 w-6 text-amber-500 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Buffer capacity is limited. Ensure total concentration (Acid + Base) is high enough to resist pH changes.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function BufferInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <Input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                className="h-14 rounded-2xl bg-muted/20 border-indigo-500/10 text-center text-xl font-bold"
            />
        </div>
    );
}
