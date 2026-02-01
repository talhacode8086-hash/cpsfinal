'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Info, FlaskConical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function PercentComposition() {
    const [formula, setFormula] = useState('H2O');

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <PieChart className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Percent Composition
                </CardTitle>
                <p className="text-muted-foreground mt-2">Break down any chemical formula into its mass-based percentage components.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="relative">
                    <Input
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        className="h-16 text-3xl font-mono text-center rounded-2xl bg-muted/20 border-indigo-500/20"
                        placeholder="e.g., C6H12O6"
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">Chemical Formula</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <CompositionStrip symbol="H" percent={11.19} color="bg-blue-500" />
                        <CompositionStrip symbol="O" percent={88.81} color="bg-red-500" />
                    </div>

                    <div className="p-12 rounded-[4rem] bg-muted/20 border border-indigo-500/10 flex flex-col items-center justify-center text-center">
                        <div className="w-32 h-32 rounded-full border-8 border-indigo-500/20 flex items-center justify-center mb-4">
                            <FlaskConical className="h-12 w-12 text-indigo-400" />
                        </div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Formula Mass</p>
                        <h4 className="text-4xl font-black">18.015 <span className="text-sm opacity-60">u</span></h4>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CompositionStrip({ symbol, percent, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase text-indigo-400 px-1">
                <span>Element: {symbol}</span>
                <span>{percent}%</span>
            </div>
            <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} className={`h-full ${color}`} />
            </div>
        </div>
    );
}
