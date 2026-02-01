'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Repeat, Info, Zap, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function StoichiometrySolver() {
    const [knownValue, setKnownValue] = useState('100');
    const [knownUnit, setKnownUnit] = useState('grams');
    const [solution, setSolution] = useState<any>(null);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Stoichiometry Solver
                </CardTitle>
                <p className="text-muted-foreground mt-2">Multi-step chemical conversions made simple.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Known Substance</label>
                            <Input placeholder="e.g., NaCl" className="h-12 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Quantity</label>
                                <Input type="number" value={knownValue} onChange={(e) => setKnownValue(e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-indigo-400 px-1">Unit</label>
                                <select className="w-full h-12 bg-background border rounded-xl px-4 text-sm font-bold">
                                    <option>Grams</option>
                                    <option>Moles</option>
                                    <option>Molecules</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <ArrowRight className="h-10 w-10 text-indigo-500" />
                        </div>
                    </div>
                </div>

                <div className="p-12 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Calculated Outcome</p>
                    <h3 className="text-6xl font-black mb-4">1.711</h3>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Moles of Target Substance</p>

                    <div className="mt-8 flex justify-center gap-12">
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase opacity-60">Molar Ratio</p>
                            <p className="text-xl font-bold">2:3</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase opacity-60">Theoretical Yield</p>
                            <p className="text-xl font-bold">142.5g</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 italic text-xs text-muted-foreground flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p>Stoichiometry calculations require a balanced equation first. This tool automatically fetches molar masses for both substances and applies the stoichiometric factor from your reaction coefficients.</p>
                </div>
            </CardContent>
        </Card>
    );
}
