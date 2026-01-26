'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WaterTracker() {
    const [intake, setIntake] = useState(1200);
    const goal = 2500;

    const progress = Math.min(100, Math.round((intake / goal) * 100));

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Droplet className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Hydration Tracker</CardTitle>
                <p className="text-muted-foreground mt-2">Track your daily water intake for peak mental and physical clarity.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 w-64 mx-auto bg-muted/10 rounded-[4rem] border-4 border-primary/5 overflow-hidden group">
                        <div
                            className="absolute bottom-0 left-0 w-full bg-primary/40 transition-all duration-1000 ease-in-out"
                            style={{ height: `${progress}%` }}
                        >
                            <div className="absolute top-0 left-0 w-full h-8 -translate-y-4 animate-wave bg-primary/20 backdrop-blur-sm" />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                            <h3 className="text-6xl font-black text-primary">{progress}%</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Hydrated</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="text-center md:text-left space-y-2">
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">Current Intake</p>
                            <h3 className="text-5xl font-black">{intake} <span className="text-2xl opacity-30">ML</span></h3>
                            <p className="text-sm font-bold text-muted-foreground">Goal: {goal} ML</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button onClick={() => setIntake(v => v + 250)} className="h-20 rounded-[2.5rem] bg-background border-2 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-black text-lg">
                                +250ml
                            </Button>
                            <Button onClick={() => setIntake(v => v + 500)} className="h-20 rounded-[2.5rem] bg-background border-2 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-black text-lg">
                                +500ml
                            </Button>
                        </div>

                        <Button variant="ghost" onClick={() => setIntake(0)} className="w-full opacity-30 hover:opacity-100">Reset Today</Button>
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 flex items-center gap-6">
                    <Trophy className="h-10 w-10 text-primary shrink-0" />
                    <div>
                        <p className="text-sm font-black text-primary">Hydration Fact</p>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            Drinking water improves focus and reduces fatigue. Even mild dehydration (1-2%) can significantly impair cognitive function and physical performance.
                        </p>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                @keyframes wave {
                    0%, 100% { transform: translateY(-1rem) scaleX(1); }
                    50% { transform: translateY(-1.5rem) scaleX(1.1); }
                }
                .animate-wave {
                    animation: wave 3s infinite ease-in-out;
                }
            `}</style>
        </Card>
    );
}
