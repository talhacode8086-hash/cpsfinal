'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function InflationCalculator() {
    const [base, setBase] = useState('100');
    const [rate, setRate] = useState('3.5');
    const [years, setYears] = useState('10');

    const b = parseFloat(base) || 0;
    const r = parseFloat(rate) || 0;
    const y = parseFloat(years) || 0;

    const futureValue = b * Math.pow(1 + r / 100, y);
    const lostPower = b - (b / Math.pow(1 + r / 100, y));

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingDown className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Inflation Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">See how much your money has lost or gained value over time.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Initial Amount ($)</label>
                        <Input value={base} onChange={(e) => setBase(e.target.value)} className="h-14 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Avg. Inflation Rate (%)</label>
                        <Input value={rate} onChange={(e) => setRate(e.target.value)} className="h-14 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Time Period (Years)</label>
                        <Input value={years} onChange={(e) => setYears(e.target.value)} className="h-14 rounded-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-background border-2 border-primary/10 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black text-primary uppercase mb-2">Cost in {years} Years</span>
                        <h3 className="text-5xl font-black">${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-2">To match today s purchasing power</p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-destructive text-white shadow-2xl shadow-destructive/20 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black uppercase mb-2 opacity-70">Purchasing Power Lost</span>
                        <h3 className="text-5xl font-black">-${lostPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                        <p className="text-xs font-bold mt-2 opacity-50">Value decrease of your static cash</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/10 border border-primary/5 flex gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        Inflation averages around 3% annually in stable economies. Over 20 years, a dollar typically loses half its value.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
