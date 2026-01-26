'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Landmark } from 'lucide-react';

export default function EMICalculator() {
    const [loan, setLoan] = useState<number>(100000);
    const [interest, setInterest] = useState<number>(10.5);
    const [tenure, setTenure] = useState<number>(12); // months

    const calculateEMI = () => {
        const r = interest / 12 / 100;
        const n = tenure;
        const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const totalPayment = emi * n;
        const totalInterest = totalPayment - loan;

        return {
            emi: emi.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
            totalPayment: totalPayment.toFixed(0),
        };
    };

    const result = calculateEMI();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Landmark className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Loan EMI Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate your monthly loan payments easily.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Loan Amount ($)</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={loan}
                                onChange={(e) => setLoan(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Interest Rate (%)</label>
                            <Input
                                type="number"
                                step="0.1"
                                className="h-12 rounded-xl"
                                value={interest}
                                onChange={(e) => setInterest(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Tenure (Months)</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={tenure}
                                onChange={(e) => setTenure(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 rounded-3xl bg-primary shadow-2xl shadow-primary/20 text-primary-foreground text-center space-y-2">
                            <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Monthly EMI</p>
                            <h2 className="text-5xl font-black">${result.emi}</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5">
                                <p className="text-xs text-muted-foreground mb-1 uppercase">Total Interest</p>
                                <p className="text-lg font-bold">${result.totalInterest}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5">
                                <p className="text-xs text-muted-foreground mb-1 uppercase">Total Payment</p>
                                <p className="text-lg font-bold">${result.totalPayment}</p>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground text-center italic">
                            *Amortisation table and interest charts available in Pro version.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
