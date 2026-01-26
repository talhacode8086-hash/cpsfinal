'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function UnitPriceCalc() {
    const [p1, setP1] = useState('10');
    const [q1, setQ1] = useState('500');
    const [p2, setP2] = useState('18');
    const [q2, setQ2] = useState('1000');

    const unit1 = (parseFloat(p1) || 0) / (parseFloat(q1) || 1);
    const unit2 = (parseFloat(p2) || 0) / (parseFloat(q2) || 1);

    const is1Better = unit1 < unit2;
    const diff = Math.abs(unit1 - unit2) / Math.max(unit1, unit2) * 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Unit Price Comparison</CardTitle>
                <p className="text-muted-foreground mt-2">Find the true "best deal" by comparing cost per gram, liter, or unit.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ItemInput label="Item A" price={p1} setPrice={setP1} qty={q1} setQty={setQ1} active={is1Better} unitPrice={unit1} />
                    <ItemInput label="Item B" price={p2} setPrice={setP2} qty={q2} setQty={setQ2} active={!is1Better} unitPrice={unit2} />
                </div>

                <div className={`p-10 rounded-[3rem] text-center transition-all ${is1Better ? 'bg-green-500/10 border-2 border-green-500/20' : 'bg-blue-500/10 border-2 border-blue-500/20'
                    }`}>
                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-2">The Verdict</p>
                    <h3 className="text-3xl font-black">
                        {is1Better ? 'Item A' : 'Item B'} is {diff.toFixed(1)}% cheaper!
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
}

function ItemInput({ label, price, setPrice, qty, setQty, active, unitPrice }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all space-y-6 ${active ? 'border-primary bg-primary/5 shadow-lg' : 'border-primary/5 bg-background'
            }`}>
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-black uppercase tracking-tighter">{label}</h4>
                {active && <span className="text-[10px] font-black bg-primary text-white px-3 py-1 rounded-full">BEST VALUE</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50">Price ($)</label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-12 rounded-xl font-bold" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50">Qty (g/ml/pcs)</label>
                    <Input value={qty} onChange={(e) => setQty(e.target.value)} className="h-12 rounded-xl font-bold" />
                </div>
            </div>
            <div className="pt-4 border-t border-primary/5 text-center">
                <p className="text-[10px] font-black text-primary opacity-50">Cost per Unit</p>
                <p className="text-2xl font-black">${unitPrice.toFixed(4)}</p>
            </div>
        </div>
    );
}
