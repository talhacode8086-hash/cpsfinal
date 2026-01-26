'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export default function GSTCalculator() {
    const [amount, setAmount] = useState<number>(0);
    const [gstRate, setGstRate] = useState<number>(18);
    const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

    const calculate = () => {
        let gstAmount = 0;
        let totalAmount = 0;
        let baseAmount = amount;

        if (type === 'exclusive') {
            gstAmount = (amount * gstRate) / 100;
            totalAmount = amount + gstAmount;
        } else {
            totalAmount = amount;
            baseAmount = (amount * 100) / (100 + gstRate);
            gstAmount = amount - baseAmount;
        }

        return {
            baseAmount: baseAmount.toFixed(2),
            gstAmount: gstAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            cgst: (gstAmount / 2).toFixed(2),
            sgst: (gstAmount / 2).toFixed(2)
        };
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">GST / Tax Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate GST inclusive or exclusive amounts instantly.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Total Amount</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">GST Rate (%)</label>
                            <div className="flex flex-wrap gap-2">
                                {[5, 12, 18, 28].map((rate) => (
                                    <Button
                                        key={rate}
                                        variant={gstRate === rate ? 'default' : 'outline'}
                                        size="sm"
                                        className="rounded-lg px-4"
                                        onClick={() => setGstRate(rate)}
                                    >
                                        {rate}%
                                    </Button>
                                ))}
                                <Input
                                    type="number"
                                    placeholder="Custom"
                                    className="w-20 h-9 rounded-lg text-center"
                                    value={gstRate}
                                    onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                className="flex-1 rounded-xl h-12"
                                variant={type === 'exclusive' ? 'default' : 'outline'}
                                onClick={() => setType('exclusive')}
                            >
                                GST Exclusive
                            </Button>
                            <Button
                                className="flex-1 rounded-xl h-12"
                                variant={type === 'inclusive' ? 'default' : 'outline'}
                                onClick={() => setType('inclusive')}
                            >
                                GST Inclusive
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Base Amount</span>
                                <span className="font-bold">₹{result.baseAmount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Total GST ({gstRate}%)</span>
                                <span className="font-bold text-primary">₹{result.gstAmount}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/5">
                                <div className="text-xs">
                                    <p className="text-muted-foreground mb-1">CGST ({(gstRate / 2).toFixed(1)}%)</p>
                                    <p className="font-bold">₹{result.cgst}</p>
                                </div>
                                <div className="text-xs">
                                    <p className="text-muted-foreground mb-1">SGST ({(gstRate / 2).toFixed(1)}%)</p>
                                    <p className="font-bold">₹{result.sgst}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-primary/10 flex justify-between items-center">
                                <span className="font-bold text-lg">Total Amount</span>
                                <span className="font-extrabold text-2xl text-primary">₹{result.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
