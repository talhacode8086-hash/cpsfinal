'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Snowflake, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function FreezingPointPro() {
    const [kf, setKf] = useState(1.86); // Water
    const [m, setM] = useState(1.0); // molality
    const [i, setI] = useState(1); // van't Hoff

    const deltaTf = i * kf * m;

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Snowflake className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
                    Freezing Depression
                </CardTitle>
                <p className="text-muted-foreground mt-2">Identify freezing point shifts for de-icing or molecular weight labs.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CollInput label="Kf Constant" value={kf} onChange={setKf} unit="°C/m" color="text-blue-400" />
                    <CollInput label="Molality (m)" value={m} onChange={setM} unit="mol/kg" color="text-blue-400" />
                    <CollInput label="van't Hoff (i)" value={i} onChange={setI} color="text-blue-400" />
                </div>

                <div className="p-16 rounded-[4rem] bg-blue-600 text-white shadow-3xl shadow-blue-500/40 text-center relative overflow-hidden">
                    <Snowflake className="absolute top-0 right-0 p-12 opacity-10 h-64 w-64" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Change in Freezing Point (ΔTf)</p>
                    <h3 className="text-8xl font-black">{deltaTf.toFixed(4)} <span className="text-2xl opacity-60">°C</span></h3>
                    <div className="mt-8 px-8 py-2 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest inline-block">
                        New F.P. (Water): {(0 - deltaTf).toFixed(4)} °C
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-blue-600 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab insight:</b> Freezing point depression is why we salt roads in winter. The added particles disrupt the formation of the regular crystal lattice of ice.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function CollInput({ label, value, onChange, unit, color }: any) {
    return (
        <div className="space-y-4">
            <label className={`text-[10px] font-black uppercase ${color} px-1`}>{label}</label>
            <div className="relative">
                <Input type="number" step="0.001" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-14 rounded-xl border-blue-500/10 font-bold" />
                {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black opacity-30">{unit}</span>}
            </div>
        </div>
    );
}
