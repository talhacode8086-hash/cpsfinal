'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function NumberBaseConverter() {
    const [val, setVal] = useState('100');
    const [base, setBase] = useState('10');

    const convert = (v: string, b: string) => {
        try {
            const decimal = parseInt(v, parseInt(b));
            if (isNaN(decimal)) throw new Error();
            return {
                dec: decimal.toString(10),
                bin: decimal.toString(2),
                hex: decimal.toString(16).toUpperCase(),
                oct: decimal.toString(8)
            };
        } catch {
            return { dec: '?', bin: '?', hex: '?', oct: '?' };
        }
    };

    const results = convert(val, base);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Binary className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Number Base Converter</CardTitle>
                <p className="text-muted-foreground mt-2">A vital utility for computer science, networking, and low-level development.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="p-10 rounded-[3rem] bg-primary text-white shadow-xl shadow-primary/20 space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Active Input</label>
                            <div className="flex gap-4">
                                <Input
                                    value={val}
                                    onChange={(e) => setVal(e.target.value)}
                                    className="h-16 rounded-2xl bg-white/10 border-white/20 text-3xl font-black text-white placeholder:text-white/30"
                                />
                                <div className="w-24">
                                    <label className="text-[8px] font-black opacity-50">BASE</label>
                                    <select value={base} onChange={(e) => setBase(e.target.value)} className="w-full h-12 bg-white/10 rounded-xl font-bold outline-none border-0 px-2 mt-1">
                                        <option value="10" className="text-black">10</option>
                                        <option value="2" className="text-black">2</option>
                                        <option value="16" className="text-black">16</option>
                                        <option value="8" className="text-black">8</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-5 rounded-2xl bg-muted/10 border border-primary/5 hover:border-primary/20 transition-all">
                            <span className="text-[10px] font-black uppercase text-primary opacity-50">Decimal (Base 10)</span>
                            <span className="font-mono font-bold text-lg">{results.dec}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 rounded-2xl bg-muted/10 border border-primary/5 hover:border-primary/20 transition-all">
                            <span className="text-[10px] font-black uppercase text-primary opacity-50">Binary (Base 2)</span>
                            <span className="font-mono font-bold text-lg">{results.bin}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 rounded-2xl bg-muted/10 border border-primary/5 hover:border-primary/20 transition-all">
                            <span className="text-[10px] font-black uppercase text-primary opacity-50">Hexadecimal (Base 16)</span>
                            <span className="font-mono font-bold text-lg">{results.hex}</span>
                        </div>
                        <div className="flex justify-between items-center p-5 rounded-2xl bg-muted/10 border border-primary/5 hover:border-primary/20 transition-all">
                            <span className="text-[10px] font-black uppercase text-primary opacity-50">Octal (Base 8)</span>
                            <span className="font-mono font-bold text-lg">{results.oct}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
