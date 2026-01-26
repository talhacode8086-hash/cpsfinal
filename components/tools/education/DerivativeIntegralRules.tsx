'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const rules = {
    derivatives: [
        { name: 'Power Rule', rule: 'd/dx [xâ ¿] = nxâ ¿â »Â¹', ex: 'd/dx [xÂ³] = 3xÂ²' },
        { name: 'Product Rule', rule: 'd/dx [f(x)g(x)] = f\'g + fg\'', ex: 'd/dx [x sin(x)] = sin(x) + x cos(x)' },
        { name: 'Chain Rule', rule: 'd/dx [f(g(x))] = f\'(g(x))g\'(x)', ex: 'd/dx [sin(xÂ²)] = 2x cos(xÂ²)' }
    ],
    integrals: [
        { name: 'Power Rule', rule: 'âˆ« xâ ¿ dx = (xâ ¿â ºÂ¹)/(n+1) + C', ex: 'âˆ« xÂ² dx = xÂ³/3 + C' },
        { name: 'Exponential', rule: 'âˆ« eË£ dx = eË£ + C', ex: 'âˆ« eË£ dx = eË£ + C' },
        { name: 'Sine', rule: 'âˆ« sin(x) dx = -cos(x) + C', ex: 'âˆ« sin(x) dx = -cos(x) + C' }
    ]
};

export default function DerivativeIntegralRules() {
    const [mode, setMode] = useState<'derivatives' | 'integrals'>('derivatives');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Differentiator & Integrator</CardTitle>
                <p className="text-muted-foreground mt-2">A comprehensive reference and rule solver for fundamental calculus operations.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center">
                    <div className="bg-muted/10 p-2 rounded-2xl border border-primary/5 flex gap-2">
                        <Button
                            variant={mode === 'derivatives' ? 'default' : 'ghost'}
                            onClick={() => setMode('derivatives')}
                            className="rounded-xl px-10 h-12 font-black"
                        >
                            Derivatives
                        </Button>
                        <Button
                            variant={mode === 'integrals' ? 'default' : 'ghost'}
                            onClick={() => setMode('integrals')}
                            className="rounded-xl px-10 h-12 font-black"
                        >
                            Integrals
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rules[mode].map((r, i) => (
                        <div key={i} className="group p-8 rounded-[3rem] bg-background border border-primary/5 hover:border-primary/20 hover:scale-[1.05] transition-all shadow-xl flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h4 className="font-black text-primary uppercase text-[10px] tracking-widest">{r.name}</h4>
                            <p className="text-2xl font-black font-mono leading-tight">{r.rule}</p>
                            <div className="mt-4 pt-4 border-t border-primary/5 w-full">
                                <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase">Instant Example</p>
                                <p className="text-sm font-black italic text-primary/60">{r.ex}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-10 rounded-[3.5rem] bg-primary/5 border border-primary/10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary text-white">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <h4 className="text-lg font-black text-primary">Fundamental Theorem of Calculus</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        The theorem states that differentiation and integration are inverse operations. If you integrate a function and then differentiate it, you return to the original function.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
