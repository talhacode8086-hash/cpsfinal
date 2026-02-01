'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Info, Droplet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function SolubilityProduct() {
    const [s, setS] = useState(1.0e-5); // Molar solubility
    const [cationCoeff, setCationCoeff] = useState(1);
    const [anionCoeff, setAnionCoeff] = useState(1);

    // Ksp = [C]^m * [A]^n = (m*s)^m * (n*s)^n
    const ksp = Math.pow(cationCoeff * s, cationCoeff) * Math.pow(anionCoeff * s, anionCoeff);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Microscope className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Ksp & Solubility
                </CardTitle>
                <p className="text-muted-foreground mt-2">Calculate the solubility product constant for salts and precipitates.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Molar Solubility (s)</label>
                        <Input type="number" value={s} onChange={(e) => setS(parseFloat(e.target.value) || 0)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Cation Coeff (m)</label>
                        <Input type="number" value={cationCoeff} onChange={(e) => setCationCoeff(parseFloat(e.target.value) || 1)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Anion Coeff (n)</label>
                        <Input type="number" value={anionCoeff} onChange={(e) => setAnionCoeff(parseFloat(e.target.value) || 1)} className="h-12 rounded-xl text-lg font-bold" />
                    </div>
                </div>

                <div className="p-16 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Droplet className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Solubility Product (Ksp)</p>
                    <h3 className="text-7xl font-black">{ksp.toExponential(4)}</h3>
                    <p className="text-[10px] font-bold mt-4 opacity-70 uppercase tracking-widest italic">Solution for C<sub>m</sub>A<sub>n</sub> &harr; mC<sup>n+</sup> + nA<sup>m-</sup></p>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Solubility Tip:</b> Ksp only describes saturated solutions at equilibrium. If the ion product (Q) exceeds Ksp, a precipitate will form.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
