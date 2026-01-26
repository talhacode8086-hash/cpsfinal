'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PowerConverter() {
    const [val, setVal] = useState('1');
    const [unit, setUnit] = useState('hp');

    const rates: Record<string, number> = {
        watt: 1,
        kw: 0.001,
        mw: 1e-6,
        hp: 0.00134102,
        btu: 3.41214,
        kcal: 0.859845
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // Watts
        return {
            watt: base,
            kw: base * rates.kw,
            hp: base * rates.hp,
            btu: base * rates.btu
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Power Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Conversion between electrical Watts, mechanical Horsepower, and thermal BTU/hr.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Power Rating</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Input Source</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hp">Horsepower (hp)</SelectItem>
                                <SelectItem value="kw">Kilowatts (kW)</SelectItem>
                                <SelectItem value="watt">Watts (W)</SelectItem>
                                <SelectItem value="btu">BTU/hour</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PowerBar label="Mechanical (HP)" value={results.hp.toFixed(2)} unit="hp" percent={Math.min(100, results.hp * 10)} />
                    <PowerBar label="Electrical (kW)" value={results.kw.toFixed(2)} unit="kW" percent={Math.min(100, results.kw * 7)} />
                    <PowerBar label="Thermal (BTU)" value={results.btu.toFixed(1)} unit="BTU/hr" percent={Math.min(100, results.btu / 10)} />
                    <PowerBar label="Standard (W)" value={results.watt.toLocaleString()} unit="W" percent={Math.min(100, results.watt / 20)} />
                </div>
            </CardContent>
        </Card>
    );
}

function PowerBar({ label, value, unit, percent }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-muted/5 border-2 border-primary/5 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{label}</span>
                <span className="text-xl font-black">{value} <span className="text-[10px] opacity-30">{unit}</span></span>
            </div>
            <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
