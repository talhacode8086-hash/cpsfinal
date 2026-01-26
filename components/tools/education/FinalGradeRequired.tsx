'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Info, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FinalGradeRequired() {
    const [currentGrade, setCurrentGrade] = useState('85');
    const [targetGrade, setTargetGrade] = useState('90');
    const [examWeight, setExamWeight] = useState('20');

    const calculateNeeded = () => {
        const c = parseFloat(currentGrade) || 0;
        const t = parseFloat(targetGrade) || 0;
        const w = (parseFloat(examWeight) || 0) / 100;

        if (w === 0) return '0';

        // Target = Current * (1 - w) + Needed * w
        // Needed = (Target - Current * (1 - w)) / w
        const needed = (t - (c * (1 - w))) / w;
        return needed.toFixed(2);
    };

    const needed = calculateNeeded();
    const isImpossible = parseFloat(needed) > 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Final Grade Required</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate exactly what score you need on your remaining exams to reach your goal.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <InputField label="Current Grade (%)" value={currentGrade} onChange={setCurrentGrade} />
                    <InputField label="Target Overall (%)" value={targetGrade} onChange={setTargetGrade} />
                    <InputField label="Final Exam Weight (%)" value={examWeight} onChange={setExamWeight} />
                </div>

                <div className="relative group">
                    <div className={`p-16 rounded-[4rem] border-4 transition-all duration-500 flex flex-col items-center justify-center text-center gap-6 ${isImpossible ? 'bg-red-500/10 border-red-500/20' : 'bg-primary border-primary shadow-3xl shadow-primary/30'}`}>
                        <p className={`text-xs font-black uppercase tracking-[0.4em] ${isImpossible ? 'text-red-500' : 'text-white/60'}`}>REQUIRED EXAM SCORE</p>
                        <h2 className={`text-9xl font-black ${isImpossible ? 'text-red-600' : 'text-white'}`}>{needed}%</h2>

                        <div className={`px-8 py-3 rounded-2xl font-black text-sm ${isImpossible ? 'bg-red-500 text-white' : 'bg-white/20 text-white'}`}>
                            {isImpossible ? 'SCORE EXCEEDS 100%' : 'STAY FOCUSED'}
                        </div>
                    </div>

                    {isImpossible && (
                        <div className="mt-8 p-8 rounded-3xl bg-red-100 border border-red-200 text-red-700 flex items-start gap-4 animate-bounce">
                            <Info className="h-6 w-6 mt-1" />
                            <p className="font-bold leading-relaxed">It is mathematically impossible to reach your target grade with this final exam weight. You may need extra credit or a lower target.</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-muted/20 border border-primary/5 space-y-2">
                        <p className="text-[10px] font-black uppercase text-primary/40">The Math Behind It</p>
                        <p className="text-sm font-bold opacity-60 italic">Goal = (Current Avg Ã— Content Weight) + (Exam Score Ã— Exam Weight)</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-muted/20 border border-primary/5 space-y-2">
                        <p className="text-[10px] font-black uppercase text-primary/40">Pro Tip</p>
                        <p className="text-sm font-bold opacity-60">Try lowering your target by 1-2% to see how much the required score drops.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function InputField({ label, value, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-primary/60 tracking-widest pl-2">{label}</label>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-16 rounded-[2rem] bg-background border-primary/10 text-2xl font-black text-center pr-12"
                />
                <Percent className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 opacity-20" />
            </div>
        </div>
    );
}
