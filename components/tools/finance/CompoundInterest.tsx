'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Wallet, Calendar, PieChart } from 'lucide-react';

export default function CompoundInterest() {
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('10');
    const [frequency, setFrequency] = useState('12');

    const result = useMemo(() => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseFloat(frequency);

        if (isNaN(P) || isNaN(r) || isNaN(t)) return { total: 0, interest: 0 };

        const A = P * Math.pow((1 + r / n), n * t);
        return {
            total: A,
            interest: A - P
        };
    }, [principal, rate, years, frequency]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="space-y-12">
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="font-bold flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-primary" /> Initial Investment
                            </Label>
                            <Input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" /> Annual Interest Rate (%)
                            </Label>
                            <Input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" /> Time Period (Years)
                            </Label>
                            <Input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold flex items-center gap-2">
                                <PieChart className="h-4 w-4 text-primary" /> Compounding Frequency
                            </Label>
                            <select
                                className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            >
                                <option value="1">Annually</option>
                                <option value="2">Semi-Annually</option>
                                <option value="4">Quarterly</option>
                                <option value="12">Monthly</option>
                                <option value="365">Daily</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-primary/5 border border-primary/10">
                        <div className="grid grid-cols-2 gap-8 text-center">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Balance</p>
                                <p className="text-4xl font-black text-primary break-all">{formatter.format(result.total)}</p>
                            </div>
                            <div className="space-y-1 border-l border-primary/10">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Interest Earned</p>
                                <p className="text-4xl font-black text-primary break-all">{formatter.format(result.interest)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Investment Growth</h3>
                    <div className="relative h-64 w-full bg-muted/20 rounded-3xl border border-dashed flex flex-col items-center justify-center p-6 mt-4">
                        <div className="flex items-end gap-2 h-32 w-full justify-center">
                            <div className="w-12 bg-primary/20 rounded-t-lg h-1/4 animate-pulse" />
                            <div className="w-12 bg-primary/40 rounded-t-lg h-2/4 animate-pulse delay-75" />
                            <div className="w-12 bg-primary/60 rounded-t-lg h-3/4 animate-pulse delay-150" />
                            <div className="w-12 bg-primary rounded-t-lg h-full animate-pulse delay-300" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 text-center">Visualize your wealth building exponentially over time.</p>
                    </div>

                    <div className="p-6 rounded-2xl border bg-card space-y-2">
                        <p className="font-bold text-sm">Pro Tip:</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            The &quot;Rule of 72&quot; is a fast formula to estimate when your money will double. Just divide 72 by your interest rate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
