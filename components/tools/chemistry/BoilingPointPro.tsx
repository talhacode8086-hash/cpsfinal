'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Info, Zap, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function BoilingPointPro() {
    const [kb, setKb] = useState(0.512); // Water
    const [m, setM] = useState(1.0); // molality
    const [i, setI] = useState(1); // van't Hoff

    const deltaTb = i * kb * m;

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Flame className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    Boiling Elevation
                </CardTitle>
                <p className="text-muted-foreground mt-2">Analyze how solutes impact boiling points through colligative logic.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CollInput label="Kb Constant" value={kb} onChange={setKb} unit="°C/m" />
                    <CollInput label="Molality (m)" value={m} onChange={setM} unit="mol/kg" />
                    <CollInput label="van't Hoff (i)" value={i} onChange={setI} />
                </div>

                <div className="p-16 rounded-[4rem] bg-red-600 text-white shadow-3xl shadow-red-500/40 text-center relative overflow-hidden">
                    <Thermometer className="absolute top-8 right-8 h-12 w-12 opacity-15" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Change in Boiling Point (ΔTb)</p>
                    <h3 className="text-8xl font-black">{deltaTb.toFixed(4)} <span className="text-2xl opacity-60">°C</span></h3>
                    <div className="mt-8 px-8 py-2 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest inline-block">
                        New B.P. (Water): {(100 + deltaTb).toFixed(4)} °C
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-red-600 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> Boiling point elevation depends only on the number of solute particles, not their identity. The van't Hoff factor (i) accounts for dissociation (e.g., i=2 for NaCl).
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function CollInput({ label, value, onChange, unit }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-red-400 px-1">{label}</label>
            <div className="relative">
                <Input type="number" step="0.001" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-14 rounded-xl border-red-500/10 font-bold" />
                {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black opacity-30">{unit}</span>}
            </div>
        </div>
    );
}
