'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VolumeConverter() {
    const [val, setVal] = useState('1');
    const [unit, setUnit] = useState('liter');

    const rates: Record<string, number> = {
        liter: 1,
        ml: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675,
        floz: 33.814,
        cubicmeter: 0.001
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // value in liters
        return {
            liter: base,
            ml: base * rates.ml,
            gallon: base * rates.gallon,
            quart: base * rates.quart,
            floz: base * rates.floz,
            m3: base * rates.cubicmeter
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Beaker className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Volume Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Fluid and solid volume conversion across metric and imperial standards.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Volume Input</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Source Unit</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="liter">Liters (l)</SelectItem>
                                <SelectItem value="ml">Milliliters (ml)</SelectItem>
                                <SelectItem value="gallon">Gallons (US)</SelectItem>
                                <SelectItem value="quart">Quarts</SelectItem>
                                <SelectItem value="floz">Fluid Ounces (oz)</SelectItem>
                                <SelectItem value="cubicmeter">Cubic Meters (m³)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MetricCard label="Liters" value={results.liter.toLocaleString()} s="l" />
                    <MetricCard label="US Gallons" value={results.gallon.toFixed(3)} s="gal" />
                    <MetricCard label="Fluid Ounces" value={results.floz.toFixed(1)} s="fl oz" />
                    <MetricCard label="Cubic Meters" value={results.m3.toFixed(4)} s="m³" />
                    <MetricCard label="Milliliters" value={results.ml.toLocaleString()} s="ml" />
                    <MetricCard label="US Quarts" value={results.quart.toFixed(2)} s="qt" />
                </div>
            </CardContent>
        </Card>
    );
}

function MetricCard({ label, value, s }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/5 hover:border-primary/20 transition-all group flex flex-col justify-center items-center">
            <span className="text-[10px] font-black uppercase text-primary/40 group-hover:text-primary mb-2">{label}</span>
            <div className="flex items-baseline gap-2">
                <h4 className="text-3xl font-black">{value}</h4>
                <span className="text-sm font-bold opacity-30">{s}</span>
            </div>
        </div>
    );
}
