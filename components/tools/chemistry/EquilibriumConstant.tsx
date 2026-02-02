'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Info, Scale } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function EquilibriumConstant() {
    const [products, setProducts] = useState('0.5, 0.5'); // Conc values
    const [pCoeffs, setPCoeffs] = useState('1, 1');
    const [reactants, setReactants] = useState('1.0, 1.0');
    const [rCoeffs, setRCoeffs] = useState('1, 1');

    const calculateK = () => {
        try {
            const pVals = products.split(',').map(v => parseFloat(v.trim()));
            const pCs = pCoeffs.split(',').map(v => parseFloat(v.trim()));
            const rVals = reactants.split(',').map(v => parseFloat(v.trim()));
            const rCs = rCoeffs.split(',').map(v => parseFloat(v.trim()));

            let pTerm = 1;
            pVals.forEach((v, i) => pTerm *= Math.pow(v, pCs[i] || 1));

            let rTerm = 1;
            rVals.forEach((v, i) => rTerm *= Math.pow(v, rCs[i] || 1));

            return pTerm / rTerm;
        } catch (e) { return 0; }
    };

    const k = calculateK();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Equilibrium (Kc/Kp)
                </CardTitle>
                <p className="text-muted-foreground mt-2">Solve for Kc or Kp using equilibrium concentrations and stoichiometries.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                            <label className="text-[10px] font-black uppercase text-indigo-400 mb-2 block">Products Conc. (separate with commas)</label>
                            <Input value={products} onChange={(e) => setProducts(e.target.value)} className="h-12 rounded-xl font-mono" />
                            <label className="text-[10px] font-black uppercase text-indigo-400 mt-4 mb-2 block">Product Coefficients</label>
                            <Input value={pCoeffs} onChange={(e) => setPCoeffs(e.target.value)} className="h-12 rounded-xl font-mono" />
                        </div>
                        <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                            <label className="text-[10px] font-black uppercase text-indigo-400 mb-2 block">Reactants Conc.</label>
                            <Input value={reactants} onChange={(e) => setReactants(e.target.value)} className="h-12 rounded-xl font-mono" />
                            <label className="text-[10px] font-black uppercase text-indigo-400 mt-4 mb-2 block">Reactant Coefficients</label>
                            <Input value={rCoeffs} onChange={(e) => setRCoeffs(e.target.value)} className="h-12 rounded-xl font-mono" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden">
                            <Scale className="absolute top-8 left-8 h-10 w-10 opacity-10" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-4">Equilibrium Constant (K)</p>
                            <h3 className="text-4xl md:text-7xl font-black">{k.toFixed(4)}</h3>
                            <div className="mt-8 px-6 py-2 rounded-full bg-white/10 inline-block text-[10px] font-black uppercase">
                                Favors: {k > 1 ? 'Products' : k < 1 ? 'Reactants' : 'Equilibrium'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Le Chatelier's Principle:</b> K depends only on temperature. Changes in concentration or pressure will shift the system back toward this K value.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
