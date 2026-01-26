'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DividendReinvestmentCalc() {
    const [initial, setInitial] = useState('10000');
    const [yieldRate, setYieldRate] = useState('4');
    const [growth, setGrowth] = useState('5');
    const [years, setYears] = useState('20');

    const p = parseFloat(initial) || 0;
    const dy = (parseFloat(yieldRate) || 0) / 100;
    const g = (parseFloat(growth) || 0) / 100;
    const y = parseFloat(years) || 1;

    // Total = P * (1 + g + dy)^y 
    const finalValue = p * Math.pow(1 + g + dy, y);
    const totalDividends = finalValue - p * Math.pow(1 + g, y);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowRightCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Dividend Reinvestment (DRIP)</CardTitle>
                <p className="text-muted-foreground mt-2">See how reinvesting stock dividends accelerates your wealth creation.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-primary">Principal ($)</label>
                        <Input value={initial} onChange={(e) => setInitial(e.target.value)} className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-primary">Div Yield (%)</label>
                        <Input value={yieldRate} onChange={(e) => setYieldRate(e.target.value)} className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-primary">Stock Growth (%)</label>
                        <Input value={growth} onChange={(e) => setGrowth(e.target.value)} className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-primary">Years</label>
                        <Input value={years} onChange={(e) => setYears(e.target.value)} className="h-12 rounded-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/40 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Future Portfolio Value</p>
                        <h3 className="text-5xl font-black">${Math.round(finalValue).toLocaleString()}</h3>
                        <p className="text-xs font-bold mt-2 opacity-50">Total growth over {years} years</p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-muted/10 border-2 border-primary/10 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-black uppercase text-primary opacity-50 mb-2">Generated Dividends</p>
                        <h3 className="text-5xl font-black">${Math.round(totalDividends).toLocaleString()}</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-2 text-primary">Reinvested for compound growth</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
