'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Info, Zap, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function LimitingReagent() {
    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-red-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-indigo-400 bg-clip-text text-transparent">
                    Yield & Limiting Reagent
                </CardTitle>
                <p className="text-muted-foreground mt-2">Maximize lab efficiency by identifying bottlenecks and calculating percent yield.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                            <label className="text-[10px] font-black uppercase text-indigo-400 mb-2 block">Reactant A (e.g., 2.5 mol H2)</label>
                            <Input placeholder="Amount in Moles" className="h-12 rounded-xl" />
                        </div>
                        <div className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/5">
                            <label className="text-[10px] font-black uppercase text-indigo-400 mb-2 block">Reactant B (e.g., 1.0 mol O2)</label>
                            <Input placeholder="Amount in Moles" className="h-12 rounded-xl" />
                        </div>
                    </div>

                    <div className="p-12 rounded-[3.5rem] bg-red-600 text-white shadow-3xl shadow-red-500/30 text-center relative overflow-hidden flex flex-col justify-center">
                        <AlertCircle className="absolute top-8 right-8 h-8 w-8 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">Limiting Reagent</p>
                        <h3 className="text-5xl font-black mb-4 uppercase">Oxygen (O₂)</h3>
                        <div className="px-6 py-2 rounded-full bg-white/10 text-[10px] font-bold uppercase inline-block mx-auto">Reactant B will run out first</div>
                    </div>
                </div>

                <div className="p-12 rounded-[4rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 text-center flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase opacity-60">Theoretical Yield</p>
                            <p className="text-2xl font-black">2.0 mol</p>
                        </div>
                        <div className="w-px h-12 bg-white/20" />
                        <div className="text-center">
                            <p className="text-[8px] font-black uppercase opacity-60">Actual Yield</p>
                            <Input type="number" placeholder="1.8" className="w-20 h-10 bg-white/10 border-none text-center font-bold" />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-1">Percent Yield</p>
                        <h4 className="text-6xl font-black">90.0%</h4>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
