'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Braces, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MathStepSolver() {
    const [equation, setEquation] = useState('2x + 5 = 15');
    const [steps, setSteps] = useState<{ step: string, desc: string }[]>([]);
    const [isSolving, setIsSolving] = useState(false);

    const solve = () => {
        setIsSolving(true);
        // Simulated step-by-step logic for 2x + 5 = 15
        const mockSteps = [
            { step: '2x + 5 = 15', desc: 'Original Equation' },
            { step: '2x = 15 - 5', desc: 'Subtract 5 from both sides' },
            { step: '2x = 10', desc: 'Simplify the right side' },
            { step: 'x = 10 / 2', desc: 'Divide both sides by 2' },
            { step: 'x = 5', desc: 'Final Answer' }
        ];

        setTimeout(() => {
            setSteps(mockSteps);
            setIsSolving(false);
        }, 800);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Braces className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Visual Math Step-Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Break down complex algebra into logical, easy-to-follow steps.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                    <Input
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        placeholder="Enter equation (e.g. 2x + 5 = 15)"
                        className="h-16 rounded-2xl text-2xl font-bold px-8 bg-background border-primary/20 focus:border-primary transition-all flex-1"
                    />
                    <Button onClick={solve} disabled={isSolving} className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl shadow-primary/20">
                        {isSolving ? 'SOLVING...' : 'SOLVE STEPS'}
                    </Button>
                </div>

                <div className="space-y-6">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-6 group animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${i === steps.length - 1 ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'}`}>
                                    {i === steps.length - 1 ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                                </div>
                                {i < steps.length - 1 && <div className="w-1 h-12 bg-primary/5 my-2" />}
                            </div>

                            <div className="flex-1 bg-background/60 p-6 rounded-[2rem] border border-primary/5 hover:border-primary/20 transition-all flex justify-between items-center pr-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest">{s.desc}</p>
                                    <h4 className="text-3xl font-black font-mono mt-1">{s.step}</h4>
                                </div>
                                <ArrowRight className="h-8 w-8 text-primary/10 group-hover:text-primary/40 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {steps.length === 0 && !isSolving && (
                    <div className="text-center py-20 opacity-20">
                        <Braces className="h-24 w-24 mx-auto mb-4" />
                        <p className="font-bold italic">Enter an equation to see the logical breakdown</p>
                    </div>
                )}

                <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                    <div>
                        <p className="text-xs font-black uppercase text-amber-500 mb-2">Math Tutor AI Notes</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Currently supporting linear equations. Always remember to perform the same operation on <b>both sides</b> of the equals sign to maintain balance.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
