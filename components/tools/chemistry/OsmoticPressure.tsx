'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function OsmoticPressure() {
    const [m, setM] = useState(1.0); // Molarity
    const [i, setI] = useState(1); // van't Hoff
    const [t, setT] = useState(298.15); // K

    const R = 0.08206; // L*atm/(mol*K)
    const pi = i * m * R * t;

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Waves className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Osmotic Pressure (Π)
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict the pressure required to stop osmosis in semi-permeable systems.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <OsmoticInput label="Molarity (M)" value={m} onChange={setM} unit="mol/L" />
                    <OsmoticInput label="van't Hoff (i)" value={i} onChange={setI} />
                    <OsmoticInput label="Temp (K)" value={t} onChange={setT} unit="Kelvin" />
                </div>

                <div className="p-16 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Waves className="h-48 w-48" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Osmotic Pressure (Π)</p>
                    <h3 className="text-8xl font-black">{pi.toFixed(3)} <span className="text-2xl opacity-60">atm</span></h3>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Note:</b> Π = iMRT. This property is crucial in biology for understanding cell tonicity and in engineering for reverse osmosis desalination.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function OsmoticInput({ label, value, onChange, unit }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-indigo-400 px-1">{label}</label>
            <div className="relative">
                <Input type="number" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-14 rounded-xl border-indigo-500/10 font-bold" />
                {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black opacity-30">{unit}</span>}
            </div>
        </div>
    );
}
