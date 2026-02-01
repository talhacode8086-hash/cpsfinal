'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Plus, Minus, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function NetWorthCalc() {
    const [assets, setAssets] = useState(100000);
    const [debts, setDebts] = useState(45000);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Net Worth Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Get a high-level snapshot of your total financial health.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="p-8 rounded-[3rem] bg-green-500/5 border border-green-500/10 space-y-4">
                            <div className="flex items-center gap-2 text-green-600">
                                <Plus className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Total Assets</span>
                            </div>
                            <Input
                                type="number"
                                value={assets}
                                onChange={(e) => setAssets(parseInt(e.target.value) || 0)}
                                className="h-14 rounded-xl bg-background border-green-500/20 text-2xl font-bold"
                            />
                            <p className="text-[10px] text-muted-foreground italic">Cash, Stocks, Home, Savings, Jewellery...</p>
                        </div>
                        <div className="p-8 rounded-[3rem] bg-destructive/5 border border-destructive/10 space-y-4">
                            <div className="flex items-center gap-2 text-destructive">
                                <Minus className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Total Liabilities</span>
                            </div>
                            <Input
                                type="number"
                                value={debts}
                                onChange={(e) => setDebts(parseInt(e.target.value) || 0)}
                                className="h-14 rounded-xl bg-background border-destructive/20 text-2xl font-bold"
                            />
                            <p className="text-[10px] text-muted-foreground italic">Loans, Credit Cards, Mortgages, Bills...</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="p-12 rounded-[4rem] bg-primary text-primary-foreground shadow-3xl shadow-primary/30 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Wallet className="h-32 w-32" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-2">My True Net Worth</p>
                            <h3 className="text-6xl font-black">${(assets - debts).toLocaleString()}</h3>
                            <div className="mt-8 flex justify-center gap-4">
                                <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-xs font-bold">
                                    Ratio: {debts === 0 ? 'Infinite' : (assets / debts).toFixed(2)}:1
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
