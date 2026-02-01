'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function InvestmentROICalc() {
    const [initial, setInitial] = useState('10000');
    const [final, setFinal] = useState('15000');
    const [years, setYears] = useState('1');

    const i = parseFloat(initial) || 0;
    const f = parseFloat(final) || 0;
    const y = parseFloat(years) || 1;

    const netProfit = f - i;
    const totalROI = (netProfit / i) * 100;
    const annualizedROI = (Math.pow(f / i, 1 / y) - 1) * 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <PieChart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Investment ROI Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Measure your portfolio performance with total and annualized growth.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Initial Investment</label>
                        <Input value={initial} onChange={(e) => setInitial(e.target.value)} className="h-14 rounded-xl" placeholder="$ Amount" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Final Value</label>
                        <Input value={final} onChange={(e) => setFinal(e.target.value)} className="h-14 rounded-xl" placeholder="$ Amount" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Holding Period (Yrs)</label>
                        <Input value={years} onChange={(e) => setYears(e.target.value)} className="h-14 rounded-xl" placeholder="Years" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex flex-col items-center justify-center">
                        <TrendingUp className="h-12 w-12 mb-4 opacity-70" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total ROI</p>
                        <h3 className="text-6xl font-black">{totalROI.toFixed(1)}%</h3>
                        <p className="text-sm font-bold mt-2 opacity-80">${netProfit.toLocaleString()} Net Gain</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/10 flex justify-between items-center group">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-primary uppercase">Annualized ROI</p>
                                <p className="text-3xl font-black">{annualizedROI.toFixed(2)}%</p>
                            </div>
                            <ArrowUpRight className="h-8 w-8 text-primary opacity-20 group-hover:opacity-100 transition-all" />
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase mb-2">Growth Multiple</p>
                            <p className="text-3xl font-black">{(f / i).toFixed(2)}<span className="text-lg opacity-40">x</span></p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
