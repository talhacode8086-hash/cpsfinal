'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, DollarSign, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function MortgageCalculator() {
    const [price, setPrice] = useState(400000);
    const [down, setDown] = useState(20);
    const [rate, setRate] = useState(6.5);
    const [years, setYears] = useState(30);

    const loanAmount = price * (1 - down / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Mortgage Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Estimate your monthly housing costs with taxes and insurance.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <FinanceInput label="Home Price" value={price} unit="$" onChange={setPrice} min={50000} max={2000000} step={5000} />
                        <FinanceInput label="Down Payment (%)" value={down} unit="%" onChange={setDown} min={0} max={100} step={1} />
                        <FinanceInput label="Interest Rate" value={rate} unit="%" onChange={setRate} min={0.1} max={15} step={0.1} />
                        <FinanceInput label="Loan Term" value={years} unit="Years" onChange={setYears} min={1} max={50} step={1} />
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/40 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <DollarSign className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">Estimated Monthly Payment</p>
                            <h3 className="text-6xl font-black">${Math.round(monthlyPayment).toLocaleString()}</h3>
                            <p className="text-[10px] font-bold mt-2 opacity-50 uppercase">Principal & Interest Only</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-muted/20 border border-primary/5">
                                <p className="text-[10px] font-black text-primary uppercase mb-1">Total Loan</p>
                                <p className="text-xl font-bold">${Math.round(loanAmount).toLocaleString()}</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-muted/20 border border-primary/5">
                                <p className="text-[10px] font-black text-primary uppercase mb-1">Down Payment</p>
                                <p className="text-xl font-bold">${Math.round(price * (down / 100)).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-amber-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Pro Tip:</b> Aim for a 20% down payment to avoid Private Mortgage Insurance (PMI), which can add $100-$300 to your monthly bill.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function FinanceInput({ label, value, unit, onChange, min, max, step }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">{label}</label>
                <span className="font-bold text-sm bg-primary/10 px-3 py-1 rounded-full text-primary">
                    {unit === '$' ? `$${value.toLocaleString()}` : `${value}${unit}`}
                </span>
            </div>
            <Slider
                value={[value]}
                onValueChange={(v) => onChange(v[0])}
                min={min}
                max={max}
                step={step}
                className="py-2"
            />
        </div>
    );
}
