'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CreditCardPayoff() {
    const [balance, setBalance] = useState('5000');
    const [apr, setApr] = useState('22');
    const [monthly, setMonthly] = useState('200');

    const b = parseFloat(balance) || 0;
    const rate = (parseFloat(apr) || 0) / 100 / 12;
    const p = parseFloat(monthly) || 0;

    // n = -log(1 - (b * rate / p)) / log(1 + rate)
    let months = 0;
    let totalInterest = 0;
    if (p > b * rate) {
        months = -Math.log(1 - (b * rate) / p) / Math.log(1 + rate);
        totalInterest = (p * months) - b;
    }

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Credit Card Payoff Tool</CardTitle>
                <p className="text-muted-foreground mt-2">Visualize the impact of interest and find your path to financial freedom.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Current Balance ($)</label>
                        <Input value={balance} onChange={(e) => setBalance(e.target.value)} className="h-14 rounded-xl border-primary/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Annual Interest (APR %)</label>
                        <Input value={apr} onChange={(e) => setApr(e.target.value)} className="h-14 rounded-xl border-primary/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Monthly Payment ($)</label>
                        <Input value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-14 rounded-xl border-primary/10" />
                    </div>
                </div>

                {p <= b * rate ? (
                    <div className="p-12 rounded-[3.5rem] bg-destructive/10 border-2 border-destructive/20 text-center space-y-4">
                        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
                        <h3 className="text-2xl font-black text-destructive uppercase">Warning: Balance Increasing</h3>
                        <p className="text-sm text-muted-foreground">Your monthly payment doesn t even cover current interest. You will never pay off this debt at this rate.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-12 rounded-[3.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/40 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Time to Freedom</p>
                            <h3 className="text-5xl font-black">{Math.ceil(months)} Months</h3>
                            <p className="text-sm font-bold mt-2 opacity-70">{(months / 12).toFixed(1)} Years</p>
                        </div>
                        <div className="p-12 rounded-[3.5rem] bg-background border-4 border-dashed border-primary/10 flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] font-black uppercase text-primary opacity-50 mb-2">Total Interest Paid</p>
                            <h3 className="text-5xl font-black">${Math.round(totalInterest).toLocaleString()}</h3>
                            <p className="text-xs font-bold text-muted-foreground mt-2">Extra money lost to the bank</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
