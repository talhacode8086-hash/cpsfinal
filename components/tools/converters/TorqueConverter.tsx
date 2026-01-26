'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TorqueConverter() {
    const [val, setVal] = useState('100');
    const [unit, setUnit] = useState('nm');

    const convert = (v: number, from: string) => {
        let nm = 0;
        if (from === 'nm') nm = v;
        else if (from === 'lbft') nm = v * 1.35581795;
        else if (from === 'lbin') nm = v * 0.112984829;
        else if (from === 'kgm') nm = v * 9.80665;

        return {
            nm: nm,
            lbft: nm / 1.35581795,
            lbin: nm / 0.112984829,
            kgm: nm / 9.80665
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Torque Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Automotive and engineering torque conversion for Newtons and Pounds.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Torque Value</label>
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
                                <SelectItem value="nm">Newton-meters (Nm)</SelectItem>
                                <SelectItem value="lbft">Pound-feet (lb-ft)</SelectItem>
                                <SelectItem value="lbin">Pound-inches (lb-in)</SelectItem>
                                <SelectItem value="kgm">Kilogram-meters (kgm)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2.5rem] bg-background border border-primary/5 text-center space-y-2">
                        <span className="text-[10px] font-black text-primary uppercase opacity-50">Metric (Default)</span>
                        <h4 className="text-4xl font-black">{results.nm.toFixed(2)}</h4>
                        <span className="text-xs font-bold opacity-30">Nm</span>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-background border border-primary/5 text-center space-y-2">
                        <span className="text-[10px] font-black text-primary uppercase opacity-50">Imperial (American)</span>
                        <h4 className="text-4xl font-black">{results.lbft.toFixed(2)}</h4>
                        <span className="text-xs font-bold opacity-30">lb/ft</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
