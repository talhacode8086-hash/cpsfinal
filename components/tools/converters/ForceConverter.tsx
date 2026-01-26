'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hammer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ForceConverter() {
    const [val, setVal] = useState('10');
    const [unit, setUnit] = useState('n');

    const rates: Record<string, number> = {
        n: 1,
        kn: 0.001,
        lbf: 0.224809,
        dyne: 100000,
        kgf: 0.101972
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // Newtons
        return {
            n: base,
            kn: base * rates.kn,
            lbf: base * rates.lbf,
            kgf: base * rates.kgf
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Hammer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Force Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Standard and scientific force conversion for physics and engineering.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Force Magnitude</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Unit</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="n">Newtons (N)</SelectItem>
                                <SelectItem value="kn">Kilonewtons (kN)</SelectItem>
                                <SelectItem value="lbf">Pound-force (lbf)</SelectItem>
                                <SelectItem value="kgf">Kilogram-force (kgf)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center">
                        <p className="text-[9px] font-black text-primary opacity-50 uppercase">Newtons</p>
                        <h4 className="text-2xl font-black">{results.n.toFixed(2)}</h4>
                    </div>
                    <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center">
                        <p className="text-[9px] font-black text-primary opacity-50 uppercase">Pound-Force</p>
                        <h4 className="text-2xl font-black">{results.lbf.toFixed(2)}</h4>
                    </div>
                    <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center">
                        <p className="text-[9px] font-black text-primary opacity-50 uppercase">Kilonewtons</p>
                        <h4 className="text-2xl font-black">{results.kn.toFixed(3)}</h4>
                    </div>
                    <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center">
                        <p className="text-[9px] font-black text-primary opacity-50 uppercase">kg-force</p>
                        <h4 className="text-2xl font-black">{results.kgf.toFixed(2)}</h4>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
