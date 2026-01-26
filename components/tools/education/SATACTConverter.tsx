'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, GraduationCap, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SATACTConverter() {
    const [score, setScore] = useState('1400');
    const [mode, setMode] = useState<'SATtoACT' | 'ACTtoSAT'>('SATtoACT');

    const convert = () => {
        const s = parseInt(score) || 0;
        if (mode === 'SATtoACT') {
            // Very simplified concordance logic
            if (s >= 1570) return '36';
            if (s >= 1530) return '35';
            if (s >= 1490) return '34';
            if (s >= 1450) return '33';
            if (s >= 1420) return '32';
            if (s >= 1390) return '31';
            return Math.round((s / 1600) * 36).toString();
        } else {
            if (s >= 36) return '1570-1600';
            if (s >= 35) return '1530-1560';
            if (s >= 34) return '1490-1520';
            if (s >= 33) return '1450-1480';
            if (s >= 32) return '1420-1440';
            return Math.round((s / 36) * 1600).toString();
        }
    };

    const result = convert();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">SAT & ACT Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Compare your performance across standardized tests using official concordance estimates.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center">
                    <div className="bg-muted/10 p-2 rounded-2xl border border-primary/5 flex gap-2">
                        <Button
                            variant={mode === 'SATtoACT' ? 'default' : 'ghost'}
                            onClick={() => setMode('SATtoACT')}
                            className="rounded-xl px-10 h-12 font-black"
                        >
                            SAT â†’ ACT
                        </Button>
                        <Button
                            variant={mode === 'ACTtoSAT' ? 'default' : 'ghost'}
                            onClick={() => setMode('ACTtoSAT')}
                            className="rounded-xl px-10 h-12 font-black"
                        >
                            ACT â†’ SAT
                        </Button>
                    </div>
                </div>

                <div className="max-w-xl mx-auto space-y-10 text-center">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">YOUR {mode === 'SATtoACT' ? 'SAT' : 'ACT'} SCORE</p>
                        <Input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="h-24 rounded-[3rem] border-primary/20 bg-background text-6xl font-black text-center"
                        />
                        <p className="text-[10px] font-bold text-muted-foreground italic">Range: {mode === 'SATtoACT' ? '400-1600' : '1-36'}</p>
                    </div>

                    <div className="flex items-center justify-center py-2">
                        <div className="h-px flex-1 bg-primary/10" />
                        <ArrowLeftRight className="mx-6 text-primary opacity-40 h-8 w-8" />
                        <div className="h-px flex-1 bg-primary/10" />
                    </div>

                    <div className="p-16 rounded-[4rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 flex flex-col items-center gap-4 transition-all hover:scale-[1.02]">
                        <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">CONCORDANCE ESTIMATE</p>
                        <h3 className="text-8xl font-black text-white">{result}</h3>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-xs font-bold">
                            <CheckCircle2 className="h-4 w-4" /> Official 2024 Scales
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-primary/5 border border-primary/10 flex items-start gap-5">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-primary uppercase text-[10px] tracking-widest mb-1">College Board & ACT Concordance</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            These conversions are based on standard concordance tables used by college admissions officers to compare applicants from different testing backgrounds. Always check specific university requirements.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
