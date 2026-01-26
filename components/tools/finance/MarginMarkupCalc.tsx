'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MarginMarkupCalc() {
    const [cost, setCost] = useState('100');
    const [revenue, setRevenue] = useState('150');

    const c = parseFloat(cost) || 0;
    const r = parseFloat(revenue) || 0;

    const profit = r - c;
    const margin = r > 0 ? (profit / r) * 100 : 0;
    const markup = c > 0 ? (profit / c) * 100 : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Margin vs Markup Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly calculate profit percentages for your products and services.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Unit Cost ($)</label>
                            <Input value={cost} onChange={(e) => setCost(e.target.value)} className="h-16 rounded-2xl bg-background border-primary/10 text-2xl font-bold" />
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Selling Price ($)</label>
                            <Input value={revenue} onChange={(e) => setRevenue(e.target.value)} className="h-16 rounded-2xl bg-background border-primary/10 text-2xl font-bold" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-8 rounded-[2.5rem] bg-primary text-white shadow-xl shadow-primary/20 flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Gross Margin</p>
                            <h3 className="text-5xl font-black">{margin.toFixed(1)}%</h3>
                            <p className="text-xs font-bold opacity-50 mt-1">Profit divided by revenue</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/10 flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-50 mb-1">Markup</p>
                            <h3 className="text-5xl font-black">{markup.toFixed(1)}%</h3>
                            <p className="text-xs font-bold text-muted-foreground mt-1">Amount added to cost</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-muted/5 border border-primary/5 flex justify-center gap-12 text-center">
                    <div>
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Net Profit</p>
                        <p className="text-3xl font-black">${profit.toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
