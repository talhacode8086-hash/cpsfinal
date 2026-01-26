'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EnergyConverter() {
    const [val, setVal] = useState('1');
    const [unit, setUnit] = useState('kwh');

    const rates: Record<string, number> = {
        joule: 1,
        kj: 0.001,
        calorie: 0.239006,
        kcal: 0.000239006,
        kwh: 2.77778e-7,
        btu: 0.000947817,
        ev: 6.242e+18
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // Joules
        return {
            joule: base,
            calorie: base * rates.calorie,
            kcal: base * rates.kcal,
            kwh: base * rates.kwh,
            btu: base * rates.btu
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Energy Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Conversion between electrical, thermal, and scientific energy units.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Energy Content</label>
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
                                <SelectItem value="kwh">Kilowatt-hour (kWh)</SelectItem>
                                <SelectItem value="joule">Joule (J)</SelectItem>
                                <SelectItem value="kcal">Kilocalorie (Food Cal)</SelectItem>
                                <SelectItem value="btu">BTU</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EnergyCard label="Electrical" value={results.kwh.toFixed(6)} unit="kWh" />
                    <EnergyCard label="Thermal (BTU)" value={results.btu.toFixed(2)} unit="BTU" />
                    <EnergyCard label="Nutritional" value={results.kcal.toFixed(2)} unit="kcal" />
                    <EnergyCard label="Scientific (J)" value={results.joule.toLocaleString()} unit="Joules" />
                </div>
            </CardContent>
        </Card>
    );
}

function EnergyCard({ label, value, unit }: any) {
    return (
        <div className="p-6 rounded-3xl bg-background border border-primary/5 flex justify-between items-center group hover:border-primary/20 transition-all">
            <div className="space-y-1">
                <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black">{value}</p>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">{unit}</span>
        </div>
    );
}
