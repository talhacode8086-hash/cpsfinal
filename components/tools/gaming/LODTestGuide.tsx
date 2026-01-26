'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, Ruler, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LODTestGuide() {
    const [step, setStep] = useState(0);
    const [trackingBlocks, setTrackingBlocks] = useState([false, false, false, false, false]);

    const handleTrackingCheck = (index: number) => {
        setTrackingBlocks(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    const reset = () => {
        setTrackingBlocks([false, false, false, false, false]);
        setStep(0);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">LOD (Lift-Off Distance) Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure how high you can lift your mouse before the sensor stops tracking.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {step === 0 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <h3 className="text-2xl font-black">Step 1: Preparation</h3>
                                <p className="text-muted-foreground">LOD is the distance between the mouse sensor and the surface at which it stops tracking. Standard gaming mice should stop at <b>1-2mm</b>.</p>
                                <p className="text-sm font-bold flex items-center gap-2 text-primary">
                                    <Ruler className="h-4 w-4" /> Requirement: 2-3 Plastic Cards (Credit cards)
                                </p>
                                <Button size="lg" className="rounded-xl w-full" onClick={() => setStep(1)}>I have my cards ready</Button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <h3 className="text-2xl font-black">Step 2: Single Card Test</h3>
                                <p className="text-muted-foreground">Place your mouse on your mousepad. Now, place <b>ONE</b> plastic card under the front and back of the mouse so the sensor is elevated by approx 0.8mm.</p>
                                <p className="font-bold">Does your cursor still move when you swipe?</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => { handleTrackingCheck(0); setStep(2); }}>Yes, it tracks</Button>
                                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep(2)}>No, it stopped</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <h3 className="text-2xl font-black">Step 3: Two Card Test</h3>
                                <p className="text-muted-foreground">Add a <b>SECOND</b> card to each stack. This should bring the elevation to approx 1.6mm - 2.0mm. This is the "ideal" LOD stop point.</p>
                                <p className="font-bold">Does your cursor still move now?</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => { handleTrackingCheck(1); setStep(3); }}>Yes, still tracking</Button>
                                    <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep(3)}>No, it stopped</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <h3 className="text-2xl font-black">Final Results</h3>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                    {trackingBlocks[1] ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-amber-500 font-bold">
                                                <AlertTriangle className="h-5 w-5" /> High LOD Detected
                                            </div>
                                            <p className="text-sm text-muted-foreground">Your mouse is still tracking at {'>'}2mm. This may cause cursor jitter when resetting your mouse during intense gaming.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-green-500 font-bold">
                                                <CheckCircle2 className="h-5 w-5" /> Professional LOD
                                            </div>
                                            <p className="text-sm text-muted-foreground">Your sensor stops tracking at the perfect height (~1.5mm). Your resets will be clean and accurate.</p>
                                        </div>
                                    )}
                                </div>
                                <Button className="w-full rounded-xl" onClick={reset}>Restart Test</Button>
                            </div>
                        )}
                    </div>

                    <div className="relative p-12 bg-muted/20 rounded-[3rem] border border-primary/5 flex flex-col items-center">
                        <div className="relative w-48 h-24 bg-card border-2 border-primary/20 rounded-t-3xl shadow-xl">
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-500/50 blur-[2px]" />
                        </div>
                        <div className="w-64 h-2 bg-muted-foreground/20 rounded-full mt-4" />

                        {/* Interactive Card Visualization */}
                        <div className="absolute bottom-16 space-y-1">
                            {step >= 2 && <div className="w-56 h-1 bg-primary/40 rounded-sm animate-in fade-in slide-in-from-bottom-2" />}
                            {step >= 1 && <div className="w-56 h-1 bg-primary/40 rounded-sm animate-in fade-in slide-in-from-bottom-2" />}
                        </div>

                        <div className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Visual Setup Guide
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
