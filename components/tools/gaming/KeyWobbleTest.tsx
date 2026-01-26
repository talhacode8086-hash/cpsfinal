'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MoveDiagonal } from 'lucide-react';

export default function KeyWobbleTest() {
    const [wobble, setWobble] = useState(2);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black">Stem Stability</h2>
                        <p className="text-muted-foreground">Check for excess looseness (wobble) in your switch stems.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span>Simulated Wobble Intensity</span>
                                <span className="text-primary">{wobble}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.5"
                                value={wobble}
                                onChange={(e) => setWobble(parseFloat(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${wobble <= 1 ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setWobble(1)}>
                                <span className="text-xs font-bold uppercase">Rock Solid</span>
                                <span className="text-[10px] text-muted-foreground">High-end housing</span>
                            </div>
                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${wobble > 5 ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setWobble(8)}>
                                <span className="text-xs font-bold uppercase">Very Loose</span>
                                <span className="text-[10px] text-muted-foreground">Budget/Worn stems</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center">
                    <div
                        className="relative h-64 w-64 bg-muted/20 rounded-[4rem] border-8 border-muted/50 flex items-center justify-center p-8 transition-transform"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <motion.div
                            className="w-full h-full bg-card rounded-3xl border-4 border-muted-foreground/20 shadow-xl flex items-center justify-center relative ring-4 ring-black/5"
                            animate={isHovered ? {
                                x: [0, -wobble, wobble, -wobble, 0],
                                y: [0, wobble, -wobble, wobble, 0]
                            } : { x: 0, y: 0 }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.1,
                                ease: "linear"
                            }}
                        >
                            <div className="h-6 w-6 rounded-sm border-2 border-muted-foreground/30 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                            </div>
                            <MoveDiagonal className="absolute top-2 right-2 h-4 w-4 text-muted-foreground/20" />
                        </motion.div>

                        {isHovered && (
                            <div className="absolute inset-0 border-2 border-primary/40 rounded-[4rem] animate-pulse pointer-events-none" />
                        )}
                    </div>
                    <p className="mt-6 text-sm text-center font-medium italic text-muted-foreground">
                        {isHovered ? "Hover your mouse over the key to see simulated wobble" : "Hover to test stability"}
                    </p>
                </div>
            </div>

            <Card className="border-none bg-zinc-950 text-white rounded-3xl">
                <CardContent className="p-8 flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                        <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold">Why stem stability matters?</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Stem wobble occurs when there is a loose fit between the switch stem and its housing. While a tiny amount is normal, excessive wobble leads to a "cheap" feeling and inconsistent typing experience. Premium switches like Boba U4T or Durock POM focus on tight tolerances to eliminate this.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}
