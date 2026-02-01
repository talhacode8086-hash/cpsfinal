'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BreakEvenCalc() {
    const [fixed, setFixed] = useState('5000');
    const [price, setPrice] = useState('50');
    const [variable, setVariable] = useState('20');

    const f = parseFloat(fixed) || 0;
    const p = parseFloat(price) || 0;
    const v = parseFloat(variable) || 0;

    const breakEvenUnits = p > v ? f / (p - v) : 0;
    const breakEvenSales = breakEvenUnits * p;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Break-Even Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Identify the exact number of sales needed to cover your startup and operational costs.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-muted/10 border border-primary/5 space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Fixed Costs</label>
                        <Input value={fixed} onChange={(e) => setFixed(e.target.value)} className="h-12 rounded-xl" placeholder="Rent, salaries..." />
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/10 border border-primary/5 space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Unit Price</label>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-12 rounded-xl" placeholder="Selling price" />
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/10 border border-primary/5 space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Variable Cost</label>
                        <Input value={variable} onChange={(e) => setVariable(e.target.value)} className="h-12 rounded-xl" placeholder="Material, shipping..." />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-12 rounded-[3.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/40 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Break-Even Units</p>
                        <h3 className="text-6xl font-black">{Math.ceil(breakEvenUnits).toLocaleString()}</h3>
                        <p className="text-xs font-bold mt-2 opacity-70 uppercase">Item sales to reach $0 profit</p>
                    </div>

                    <div className="p-12 rounded-[3.5rem] bg-background border-4 border-dashed border-primary/10 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-black uppercase text-primary opacity-50 mb-2">Break-Even Sales</p>
                        <h3 className="text-5xl font-black">${Math.round(breakEvenSales).toLocaleString()}</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
