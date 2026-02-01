'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palmtree, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function RetirementPlanner() {
    const [age, setAge] = useState(25);
    const [retireAge, setRetireAge] = useState(65);
    const [savings, setSavings] = useState(10000);
    const [monthly, setMonthly] = useState(500);
    const [rate, setRate] = useState(7);

    const years = Math.max(0, retireAge - age);
    const months = years * 12;
    const r = rate / 100 / 12;

    const futureValue = months > 0
        ? savings * Math.pow(1 + r, months) + monthly * (Math.pow(1 + r, months) - 1) / r
        : savings;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Palmtree className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Retirement Goal Planner</CardTitle>
                <p className="text-muted-foreground mt-2">Estimate your nest egg based on long-term market growth and fixed savings.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Current Age</span>
                                <span className="text-sm font-bold text-primary">{age} Yrs</span>
                            </div>
                            <Slider value={[age]} onValueChange={(v) => setAge(v[0])} min={18} max={80} step={1} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Retirement Age</span>
                                <span className="text-sm font-bold text-primary">{retireAge} Yrs</span>
                            </div>
                            <Slider value={[retireAge]} onValueChange={(v) => setRetireAge(v[0])} min={age + 1} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Current Nest Egg ($)</label>
                            <Input type="number" value={savings} onChange={(e) => setSavings(parseInt(e.target.value) || 0)} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Monthly Contribution ($)</label>
                            <Input type="number" value={monthly} onChange={(e) => setMonthly(parseInt(e.target.value) || 0)} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Expected Return</span>
                                <span className="text-sm font-bold text-primary">{rate}%</span>
                            </div>
                            <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={1} max={15} step={0.5} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-12 rounded-[3.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/40 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Projected Pot at {retireAge}</p>
                            <h3 className="text-5xl font-black">${Math.round(futureValue).toLocaleString()}</h3>
                            <div className="mt-8 flex justify-center gap-8">
                                <div className="text-center">
                                    <p className="text-[8px] font-black uppercase opacity-60">Years to Go</p>
                                    <p className="text-lg font-bold">{years}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black uppercase opacity-60">Total Invested</p>
                                    <p className="text-lg font-bold">${(savings + (monthly * months)).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-muted/20 border border-primary/5 italic text-xs text-muted-foreground">
                            <Info className="h-4 w-4 text-primary mb-2" />
                            <p>Historically, the S&P 500 returns ~10% annually before inflation. Using 7% is a common "conservative" estimate.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
