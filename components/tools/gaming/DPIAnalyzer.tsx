'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DPIAnalyzer() {
    const [step, setStep] = useState(1);
    const [targetInches, setTargetInches] = useState(1);
    const [pixelsMoved, setPixelsMoved] = useState(0);
    const [estimatedDPI, setEstimatedDPI] = useState<number | null>(null);
    const [startX, setStartX] = useState<number | null>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (step === 2 && startX !== null) {
            const distance = Math.abs(e.screenX - startX);
            setPixelsMoved(distance);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [step]);

    const startMeasuring = () => {
        setStep(2);
        setStartX(null); // Will set on first move or click
    };

    const captureStart = (e: React.MouseEvent) => {
        if (step === 2) {
            setStartX(e.screenX);
        }
    };

    const finishMeasuring = () => {
        if (pixelsMoved > 0) {
            const dpi = Math.round(pixelsMoved / targetInches);
            setEstimatedDPI(dpi);
            setStep(3);
        }
    };

    return (
        <div className="space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-8">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {step}
                    </div>
                    <div>
                        <div className="text-xs uppercase font-bold text-primary tracking-widest">Step {step} of 3</div>
                        <h3 className="font-bold">
                            {step === 1 && "Configure measurement distance"}
                            {step === 2 && "Move your mouse precisely"}
                            {step === 3 && "Analyze your results"}
                        </h3>
                    </div>
                </div>

                {step === 1 && (
                    <Card className="border-2">
                        <CardContent className="pt-8 space-y-6">
                            <div className="space-y-2 text-center">
                                <p className="text-muted-foreground">Select how many inches you will move your mouse physically on your mousepad.</p>
                            </div>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 5, 10].map(i => (
                                    <Button
                                        key={i}
                                        variant={targetInches === i ? 'default' : 'outline'}
                                        onClick={() => setTargetInches(i)}
                                        className="h-16 w-16 rounded-2xl text-lg font-bold"
                                    >
                                        {i}"
                                    </Button>
                                ))}
                            </div>
                            <div className="pt-4">
                                <Button className="w-full h-14 rounded-xl text-lg font-bold" onClick={startMeasuring}>
                                    I'm ready, start analyzer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div
                            className="h-40 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border-4 border-dashed flex items-center justify-center cursor-ew-resize select-none"
                            onMouseDownCapture={captureStart}
                        >
                            {!startX ? (
                                <p className="font-bold text-zinc-500">CLICK AND HOLD TO START MOVING</p>
                            ) : (
                                <div className="text-center">
                                    <div className="text-4xl font-black text-primary mb-1">{pixelsMoved}</div>
                                    <div className="text-xs uppercase font-bold text-zinc-500">Pixels Travelled</div>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-center text-muted-foreground px-8">
                            Move your mouse exactly <b>{targetInches} inch(es)</b> horizontally. Use a ruler for maximum accuracy.
                        </p>
                        <Button className="w-full h-14 rounded-xl text-lg font-bold" onClick={finishMeasuring} disabled={pixelsMoved < 10}>
                            Calculate DPI
                        </Button>
                    </div>
                )}

                {step === 3 && estimatedDPI !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <Card className="bg-primary text-primary-foreground border-none shadow-2xl overflow-hidden relative">
                            <Activity className="absolute -right-4 -bottom-4 h-48 w-48 opacity-10" />
                            <CardContent className="pt-12 pb-10 text-center relative z-10">
                                <div className="text-xs uppercase font-bold tracking-[0.2em] opacity-80 mb-2">Estimated Real DPI</div>
                                <div className="text-8xl font-black mb-4">{estimatedDPI}</div>
                                <p className="text-sm opacity-90 max-w-[300px] mx-auto">
                                    Based on {pixelsMoved} pixels moved over {targetInches} inch(es).
                                </p>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted p-4 rounded-2xl text-center">
                                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Raw Distance</div>
                                <div className="font-bold">{pixelsMoved} px</div>
                            </div>
                            <div className="bg-muted p-4 rounded-2xl text-center">
                                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Target</div>
                                <div className="font-bold">{targetInches}"</div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => { setStep(1); setPixelsMoved(0); setEstimatedDPI(null); setStartX(null); }}>
                            Restart Analysis
                        </Button>
                    </motion.div>
                )}
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-3xl flex gap-4">
                <Info className="h-6 w-6 text-amber-600 shrink-0" />
                <div className="space-y-1">
                    <h4 className="font-bold text-amber-900 dark:text-amber-400">Important Calibration Tip</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-500/80 leading-relaxed">
                        Ensure "Enhance Pointer Precision" (Mouse Acceleration) is <b>disabled</b> in Windows/macOS settings before testing, as it can skew results by over 50%. Always use a physical ruler against the side of your mouse for the most precise 1:1 measurement.
                    </p>
                </div>
            </div>
        </div>
    );
}
