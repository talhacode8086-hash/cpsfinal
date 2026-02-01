'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function GasViscosity() {
    const [t, setT] = useState(298.15); // K
    const [mu0, setMu0] = useState(1.85e-5); // Reference viscosity (Air at 273K)
    const [t0, setT0] = useState(273.11); // Reference Temp
    const [s, setS] = useState(110); // Sutherland constant

    // Sutherland's Law: mu = mu0 * (T/T0)^(3/2) * (T0 + S)/(T + S)
    const viscosity = mu0 * Math.pow(t / t0, 1.5) * ((t0 + s) / (t + s));

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-emerald-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                    Gas Viscosity (Sutherland)
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict gas viscosity at various temperatures using the Sutherland model.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ViscInput label="Temp (K)" value={t} onChange={setT} />
                    <ViscInput label="Ref Visc (μ₀)" value={mu0} onChange={setMu0} />
                    <ViscInput label="Ref Temp (T₀)" value={t0} onChange={setT0} />
                    <ViscInput label="Suther (S)" value={s} onChange={setS} />
                </div>

                <div className="p-16 rounded-[4rem] bg-emerald-600 text-white shadow-3xl shadow-emerald-500/40 text-center relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Calculated Viscosity (μ)</p>
                    <h3 className="text-7xl font-black">{viscosity.toExponential(4)}</h3>
                    <p className="text-xs font-bold mt-4 opacity-70 uppercase tracking-widest">Pa · s</p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-emerald-600 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Standard:</b> Sutherland's Law is highly accurate for non-polar gases at moderate pressures. For high pressures, consider more complex Chapman-Enskog models.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ViscInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-emerald-600 px-1">{label}</label>
            <Input type="number" step="0.000001" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl border-emerald-500/10 font-bold" />
        </div>
    );
}
