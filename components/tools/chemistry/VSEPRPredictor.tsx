'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shapes, Info, Zap, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VSEPR_DATA: Record<string, { shape: string, angle: string, hybrid: string }> = {
    '2-0': { shape: 'Linear', angle: '180°', hybrid: 'sp' },
    '3-0': { shape: 'Trigonal Planar', angle: '120°', hybrid: 'sp²' },
    '2-1': { shape: 'Bent', angle: '< 120°', hybrid: 'sp²' },
    '4-0': { shape: 'Tetrahedral', angle: '109.5°', hybrid: 'sp³' },
    '3-1': { shape: 'Trigonal Pyramidal', angle: '< 109.5°', hybrid: 'sp³' },
    '2-2': { shape: 'Bent', angle: '< 109.5°', hybrid: 'sp³' },
    '5-0': { shape: 'Trigonal Bipyramidal', angle: '90°, 120°', hybrid: 'sp³d' },
    '4-1': { shape: 'Seesaw', angle: '< 90°, < 120°', hybrid: 'sp³d' },
    '3-2': { shape: 'T-shaped', angle: '< 90°', hybrid: 'sp³d' },
    '2-3': { shape: 'Linear', angle: '180°', hybrid: 'sp³d' },
    '6-0': { shape: 'Octahedral', angle: '90°', hybrid: 'sp³d²' },
    '5-1': { shape: 'Square Pyramidal', angle: '< 90°', hybrid: 'sp³d²' },
    '4-2': { shape: 'Square Planar', angle: '90°', hybrid: 'sp³d²' },
};

export default function VSEPRPredictor() {
    const [bonding, setBonding] = useState(4);
    const [lone, setLone] = useState(0);

    const key = `${bonding}-${lone}`;
    const result = VSEPR_DATA[key];

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shapes className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    VSEPR Shape Master
                </CardTitle>
                <p className="text-muted-foreground mt-2">Predict 3D molecular geometries based on electron pair repulsion.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase text-indigo-400">Bonding Pairs</label>
                                <span className="text-2xl font-black">{bonding}</span>
                            </div>
                            <input type="range" min="1" max="6" value={bonding} onChange={(e) => setBonding(parseInt(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase text-indigo-400">Lone Pairs (on central atom)</label>
                                <span className="text-2xl font-black">{lone}</span>
                            </div>
                            <input type="range" min="0" max="3" value={lone} onChange={(e) => setLone(parseInt(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-[3.5rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden"
                        >
                            {result ? (
                                <>
                                    <Box className="absolute top-0 right-0 p-8 opacity-10 h-32 w-32" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Molecular Geometry</p>
                                    <h3 className="text-4xl font-black mb-6">{result.shape}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/10">
                                            <p className="text-[8px] font-black uppercase opacity-60">Ideal Angle</p>
                                            <p className="text-xl font-bold">{result.angle}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/10">
                                            <p className="text-[8px] font-black uppercase opacity-60">Hybridization</p>
                                            <p className="text-xl font-bold">{result.hybrid}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm font-bold opacity-60">Invalid configuration for simple VSEPR model.</p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>VSEPR Rule:</b> Electrons repel each other. Lone pairs exert more repulsive force than bonding pairs, often squeezing bond angles smaller than the ideal geometry.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
