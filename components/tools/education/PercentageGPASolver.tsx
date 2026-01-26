'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, ArrowLeftRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PercentageGPASolver() {
    const [value, setValue] = useState('85');
    const [mode, setMode] = useState('PtoG'); // P to G or G to P

    const solve = () => {
        const val = parseFloat(value) || 0;
        if (mode === 'PtoG') {
            const gpa4 = (val / 100) * 4;
            const gpa5 = (val / 100) * 5;
            const gpa10 = (val / 100) * 10;
            return { gpa4: gpa4.toFixed(2), gpa5: gpa5.toFixed(2), gpa10: gpa10.toFixed(2) };
        } else {
            const percent = (val / 4) * 100;
            return { percent: percent.toFixed(1) };
        }
    };

    const result = solve();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Percent to GPA Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly convert between percentage marks and global GPA scales.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center">
                    <div className="bg-muted/20 p-2 rounded-3xl border border-primary/5 flex gap-2">
                        <Button
                            variant={mode === 'PtoG' ? 'default' : 'ghost'}
                            onClick={() => setMode('PtoG')}
                            className="rounded-2xl px-8 h-12 font-bold"
                        >
                            Percent → GPA
                        </Button>
                        <Button
                            variant={mode === 'GtoP' ? 'default' : 'ghost'}
                            onClick={() => setMode('GtoP')}
                            className="rounded-2xl px-8 h-12 font-bold"
                        >
                            GPA → Percent
                        </Button>
                    </div>
                </div>

                <div className="max-w-xl mx-auto space-y-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">INPUT VALUE</label>
                        <Input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="h-24 rounded-[3rem] text-6xl font-black text-center border-primary/20 bg-background"
                        />
                    </div>

                    <div className="flex items-center justify-center py-4">
                        <div className="h-px flex-1 bg-primary/10" />
                        <ArrowLeftRight className="mx-4 text-primary opacity-40" />
                        <div className="h-px flex-1 bg-primary/10" />
                    </div>

                    {mode === 'PtoG' ? (
                        <div className="grid grid-cols-3 gap-6">
                            <ResultCard label="4.0 Scale" value={result.gpa4 || '0'} />
                            <ResultCard label="5.0 Scale" value={result.gpa5 || '0'} />
                            <ResultCard label="10.0 Scale" value={result.gpa10 || '0'} />
                        </div>
                    ) : (
                        <div className="p-16 rounded-[4rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 flex flex-col items-center">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em] mb-4">PERCENTAGE EQUIVALENT</p>
                            <h3 className="text-8xl font-black text-white">{result.percent}%</h3>
                        </div>
                    )}
                </div>

                <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <GraduationCap className="h-5 w-5" />
                        <span>Academic Note</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Conversions are based on standard arithmetic ratios. Note that different institutions may use different curving logic or specific conversion tables (e.g. WES, ECE).
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultCard({ label, value }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/5 flex flex-col items-center shadow-lg hover:border-primary/20 transition-all">
            <p className="text-[8px] font-black uppercase text-primary/40 tracking-widest mb-2">{label}</p>
            <h4 className="text-3xl font-black text-primary">{value}</h4>
        </div>
    );
}
