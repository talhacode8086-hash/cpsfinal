'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Users } from 'lucide-react';

export default function TipCalculator() {
    const [bill, setBill] = useState<number>(50);
    const [tipPercent, setTipPercent] = useState<number>(15);
    const [people, setPeople] = useState<number>(1);

    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = bill + tipAmount;
    const perPerson = totalBill / people;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Receipt className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Tip Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate tips and split bills effortlessly.</p>
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Bill Amount ($)</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={bill}
                                onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Tip Percentage ({tipPercent}%)</label>
                            <div className="flex flex-wrap gap-2">
                                {[10, 15, 20, 25].map(p => (
                                    <Button
                                        key={p}
                                        variant={tipPercent === p ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setTipPercent(p)}
                                        className="rounded-lg"
                                    >
                                        {p}%
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Number of People
                            </label>
                            <Input
                                type="number"
                                min="1"
                                className="h-12 rounded-xl"
                                value={people}
                                onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                            />
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-3xl p-8 space-y-6 flex flex-col justify-center">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold">Tip Amount</p>
                                <p className="text-xs text-muted-foreground">/ total</p>
                            </div>
                            <h3 className="text-3xl font-black text-primary">${tipAmount.toFixed(2)}</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold">Total Bill</p>
                                <p className="text-xs text-muted-foreground">/ incl. tip</p>
                            </div>
                            <h3 className="text-3xl font-black text-primary">${totalBill.toFixed(2)}</h3>
                        </div>
                        <div className="h-px bg-primary/10 w-full" />
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-black text-primary">Each Person</p>
                                <p className="text-xs text-muted-foreground">/ simple split</p>
                            </div>
                            <h3 className="text-4xl font-black text-primary">${perPerson.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
