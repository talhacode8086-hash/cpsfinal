'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ArrowRight, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LAPLACE_TABLE = [
    { t: '1', s: '1 / s', note: 'Unit Step' },
    { t: 't', s: '1 / sÂ²', note: 'Ramp' },
    { t: 'tâ ¿', s: 'n! / sâ ¿â ºÂ¹', note: 'Power' },
    { t: 'eË³áµ—', s: '1 / (s - a)', note: 'Exponential' },
    { t: 'sin(at)', s: 'a / (sÂ² + aÂ²)', note: 'Sine Wave' },
    { t: 'cos(at)', s: 's / (sÂ² + aÂ²)', note: 'Cosine Wave' },
    { t: 'sinh(at)', s: 'a / (sÂ² - aÂ²)', note: 'Hyperbolic Sine' },
    { t: 'cosh(at)', s: 's / (sÂ² - aÂ²)', note: 'Hyperbolic Cosine' }
];

export default function LaplaceSolverPro() {
    const [search, setSearch] = useState('');

    const filtered = LAPLACE_TABLE.filter(item =>
        item.t.toLowerCase().includes(search.toLowerCase()) ||
        item.note.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Laplace Solver Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Comprehensive s-domain transformation engine for linear differential systems.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search for a function (e.g. exponential, sine...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-16 rounded-[2rem] pl-16 bg-muted/10 border-transparent focus:bg-background font-bold text-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((item, i) => (
                        <div key={i} className="group p-8 rounded-[3rem] bg-background border border-primary/5 hover:border-primary/20 transition-all shadow-xl flex flex-col gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest mb-1">Time Domain f(t)</p>
                                    <h4 className="text-3xl font-black font-mono">{item.t}</h4>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-muted/20 text-[8px] font-black uppercase">{item.note}</div>
                            </div>

                            <div className="flex items-center gap-4 py-4">
                                <div className="h-px flex-1 bg-primary/10" />
                                <ArrowRight className="text-primary h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <div className="h-px flex-1 bg-primary/10" />
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest mb-1">s-Domain F(s)</p>
                                <h4 className="text-3xl font-black font-mono text-primary">{item.s}</h4>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center opacity-20">
                            <Calculator className="h-20 w-20 mx-auto mb-4" />
                            <p className="text-xl font-black italic italic">Function not in standard table</p>
                        </div>
                    )}
                </div>

                <div className="p-10 rounded-[4rem] bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500 rounded-lg text-white"><BookOpen className="h-5 w-5" /></div>
                        <h4 className="text-lg font-black text-indigo-600">Definition: Laplace Transform</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        The Laplace transform converts an ordinary differential equation (ODE) into an algebraic equation in terms of the complex frequency variable $s$, making it easier to solve initial value problems in engineering and physics.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
