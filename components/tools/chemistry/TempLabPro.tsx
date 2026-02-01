'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThermometerSun, Info, ArrowLeftRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function TempLabPro() {
    const [val, setVal] = useState('25');
    const [mode, setMode] = useState<'CtoK' | 'KtoC' | 'CtoF' | 'FtoC'>('CtoK');

    const convert = () => {
        const v = parseFloat(val) || 0;
        if (mode === 'CtoK') return v + 273.15;
        if (mode === 'KtoC') return v - 273.15;
        if (mode === 'CtoF') return (v * 9 / 5) + 32;
        if (mode === 'FtoC') return (v - 32) * 5 / 9;
        return 0;
    };

    const result = convert();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <ThermometerSun className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent">
                    Temp Lab Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Switch between Celsius, Kelvin, and Fahrenheit with precision.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="flex flex-wrap justify-center gap-2">
                    {['CtoK', 'KtoC', 'CtoF', 'FtoC'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m as any)}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] transition-all border ${mode === m
                                    ? 'bg-orange-600 border-orange-500 text-white shadow-lg'
                                    : 'bg-muted/10 border-orange-500/10 text-muted-foreground hover:border-orange-500/30'
                                }`}
                        >
                            {m.replace('to', ' → ')}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <Input
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-24 text-5xl font-black text-center rounded-[2.5rem] bg-muted/20 border-orange-500/20"
                        />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[8px] font-black px-4 py-1 rounded-full uppercase">Input Value</div>
                    </div>

                    <div className="p-12 rounded-[3.5rem] bg-orange-600 text-white shadow-3xl shadow-orange-600/30 text-center relative overflow-hidden">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Converted Result</p>
                        <h4 className="text-7xl font-black italic">{result.toFixed(2)}</h4>
                        <p className="text-xs font-bold mt-4 opacity-70 uppercase tracking-widest">
                            {mode.split('to')[1]} Units
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
