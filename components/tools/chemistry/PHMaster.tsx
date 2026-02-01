'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube2, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export default function PHMaster() {
    const [val, setVal] = useState('7');
    const [mode, setMode] = useState<'pH' | 'pOH' | '[H+]' | '[OH-]'>('pH');

    const calculateAll = () => {
        let ph = 7;
        let v = parseFloat(val) || 0;

        if (mode === 'pH') ph = v;
        else if (mode === 'pOH') ph = 14 - v;
        else if (mode === '[H+]') ph = -Math.log10(v);
        else if (mode === '[OH-]') ph = 14 + Math.log10(v);

        const poh = 14 - ph;
        const hConc = Math.pow(10, -ph);
        const ohConc = Math.pow(10, -poh);

        return { ph, poh, hConc, ohConc };
    };

    const results = calculateAll();
    const getScaleColor = (ph: number) => {
        if (ph < 3) return 'bg-red-500';
        if (ph < 6) return 'bg-orange-400';
        if (ph < 8) return 'bg-green-500';
        if (ph < 11) return 'bg-blue-400';
        return 'bg-violet-600';
    };

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <TestTube2 className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    pH/pOH Master
                </CardTitle>
                <p className="text-muted-foreground mt-2">Explore the logarithmic world of acidity and basicity.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {['pH', 'pOH', '[H+]', '[OH-]'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m as any)}
                            className={`px-8 py-3 rounded-2xl font-black text-sm transition-all border ${mode === m
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                    : 'bg-muted/10 border-indigo-500/10 text-muted-foreground hover:border-indigo-500/30'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <Input
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            placeholder={`Enter ${mode} value...`}
                            className="h-20 text-4xl font-mono text-center rounded-[2rem] bg-muted/20 border-indigo-500/20 focus:border-indigo-500"
                        />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[8px] font-black px-3 py-1 rounded-full px-4">
                            INPUT VALUE
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ResultBox label="pH" value={results.ph.toFixed(2)} sub={results.ph < 7 ? 'Acidic' : results.ph > 7 ? 'Basic' : 'Neutral'} color={getScaleColor(results.ph)} />
                    <ResultBox label="pOH" value={results.poh.toFixed(2)} sub="Relative Scale" />
                    <ResultBox label="[H+]" value={results.hConc.toExponential(2)} sub="mol/L" />
                    <ResultBox label="[OH-]" value={results.ohConc.toExponential(2)} sub="mol/L" />
                </div>

                {/* pH Scale Visualizer */}
                <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground px-2">
                        <span>Strong Acid (0)</span>
                        <span>Neutral (7)</span>
                        <span>Strong Base (14)</span>
                    </div>
                    <div className="h-6 w-full rounded-full bg-gradient-to-r from-red-500 via-green-500 to-violet-600 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 bottom-0 w-2 bg-white shadow-xl z-10"
                            animate={{ left: `${(results.ph / 14) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultBox({ label, value, sub, color }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] ${color || 'bg-muted/20'} transition-colors duration-500 flex flex-col items-center justify-center text-center border border-indigo-500/5`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{label}</p>
            <h4 className="text-3xl font-black mb-1">{value}</h4>
            <p className="text-[8px] font-bold uppercase opacity-50 tracking-tighter">{sub}</p>
        </div>
    );
}
