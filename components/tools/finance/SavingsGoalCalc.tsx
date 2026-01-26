'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function SavingsGoalCalc() {
    const [goal, setGoal] = useState(50000);
    const [initial, setInitial] = useState(5000);
    const [months, setMonths] = useState(24);
    const [rate, setRate] = useState(4.5);

    const r = rate / 100 / 12;
    const term = Math.pow(1 + r, months);
    const monthlyNeeded = (goal - initial * term) * r / (term - 1);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Savings Goal Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Determine your monthly contribution needed to reach any financial milestone.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">I want to save ($)</label>
                            <Input type="number" value={goal} onChange={(e) => setGoal(parseInt(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold mt-2" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Initial Stash ($)</label>
                            <Input type="number" value={initial} onChange={(e) => setInitial(parseInt(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold mt-2" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Timeline (Months)</span>
                                <span className="text-sm font-bold text-primary">{months} Mo</span>
                            </div>
                            <Slider value={[months]} onValueChange={(v) => setMonths(v[0])} min={1} max={120} step={1} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/40 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Required Monthly Contribution</p>
                            <h3 className="text-6xl font-black">${Math.max(0, Math.round(monthlyNeeded)).toLocaleString()}</h3>
                            <p className="text-[8px] font-black mt-2 opacity-50 uppercase tracking-tighter">Assuming {rate}% High Yield Interest</p>
                        </div>

                        <div className="p-6 rounded-3xl bg-muted/20 border border-primary/5 flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-primary">Interest Gained</p>
                                <p className="text-lg font-bold">${Math.max(0, Math.round(goal - (initial + monthlyNeeded * months))).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
