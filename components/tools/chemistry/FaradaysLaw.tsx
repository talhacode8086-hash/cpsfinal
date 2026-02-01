'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Info, Clock, Weight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function FaradaysLaw() {
    const [current, setCurrent] = useState(2.0); // Amps
    const [time, setTime] = useState(3600); // Seconds
    const [molarMass, setMolarMass] = useState(63.55); // g/mol (Cu)
    const [n, setN] = useState(2); // Electrons

    const F = 96485;
    // mass = (I * t * MW) / (n * F)
    const mass = (current * time * molarMass) / (n * F);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-amber-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    Faraday’s Electrolysis
                </CardTitle>
                <p className="text-muted-foreground mt-2">Precision electroplating calculations and charge-mass mapping.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FaradayInput label="Current (Amps)" value={current} onChange={setCurrent} icon={<Zap className="h-3 w-3" />} />
                    <FaradayInput label="Time (Seconds)" value={time} onChange={setTime} icon={<Clock className="h-3 w-3" />} />
                    <FaradayInput label="Molar Mass (g/mol)" value={molarMass} onChange={setMolarMass} icon={<Weight className="h-3 w-3" />} />
                    <FaradayInput label="Electrons (n)" value={n} onChange={setN} />
                </div>

                <div className="p-16 rounded-[4rem] bg-amber-500 text-amber-950 shadow-3xl shadow-amber-500/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Weight className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-900/60 mb-2">Deposited Mass (g)</p>
                    <h3 className="text-8xl font-black">{mass.toFixed(4)}</h3>
                    <div className="mt-8 flex justify-center gap-6">
                        <div className="px-6 py-2 rounded-full bg-black/10 text-xs font-bold">Charge: {(current * time).toFixed(0)} C</div>
                        <div className="px-6 py-2 rounded-full bg-black/10 text-xs font-bold">Moles e⁻: {((current * time) / F).toFixed(4)} mol</div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-amber-600 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Tip:</b> 1 Faraday is the magnitude of electric charge per mole of electrons. In a laboratory setting, ensure the current remains constant for accurate mass predictions.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function FaradayInput({ label, value, onChange, icon }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                {icon}
                <label className="text-[10px] font-black uppercase text-amber-600">{label}</label>
            </div>
            <Input type="number" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl border-amber-500/10 font-bold" />
        </div>
    );
}
