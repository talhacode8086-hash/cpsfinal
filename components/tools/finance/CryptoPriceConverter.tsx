'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CryptoPriceConverter() {
    const [amount, setAmount] = useState('1');
    const [coin, setCoin] = useState('BTC');

    // Simulated prices (in a real app, these would come from an API)
    const prices: Record<string, number> = {
        BTC: 65432.10,
        ETH: 3456.78,
        SOL: 145.20,
        ADA: 0.45,
        XRP: 0.62
    };

    const val = parseFloat(amount) || 0;
    const usd = val * prices[coin];

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Coins className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Crypto Price Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Check current values of major cryptocurrencies in USD.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Coin Amount</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Select Asset</label>
                        <select value={coin} onChange={(e) => setCoin(e.target.value)} className="w-full h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg outline-none px-4">
                            {Object.keys(prices).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="p-12 rounded-[3.5rem] bg-primary text-white shadow-2xl shadow-primary/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-6 opacity-10">
                        <TrendingUp className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Equivalent Value</p>
                    <h3 className="text-6xl font-black">${usd.toLocaleString()} <span className="text-2xl opacity-50">USD</span></h3>
                    <p className="text-[10px] font-bold mt-4 opacity-50 uppercase">Market average simulated data</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(prices).filter(([k]) => k !== coin).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="p-4 rounded-2xl bg-muted/10 border border-primary/5 text-center">
                            <p className="text-[10px] font-bold text-primary mb-1">{k}</p>
                            <p className="text-sm font-black">${v.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
