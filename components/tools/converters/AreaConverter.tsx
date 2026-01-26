'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AreaConverter() {
    const [val, setVal] = useState('100');
    const [unit, setUnit] = useState('sqm');

    const rates: Record<string, number> = {
        sqm: 1,
        sqft: 10.7639,
        sqin: 1550,
        acre: 0.000247105,
        hectare: 0.0001,
        sqkm: 0.000001,
        sqmi: 3.861e-7
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // sqm
        return {
            sqm: base,
            sqft: base * rates.sqft,
            acre: base * rates.acre,
            hectare: base * rates.hectare,
            sqkm: base * rates.sqkm,
            sqmi: base * rates.sqmi
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Map className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Area Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Convert land and floor area across international standards.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Area Magnitude</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Scale Unit</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sqm">Square Meters (m²)</SelectItem>
                                <SelectItem value="sqft">Square Feet (ft²)</SelectItem>
                                <SelectItem value="acre">Acres</SelectItem>
                                <SelectItem value="hectare">Hectares</SelectItem>
                                <SelectItem value="sqkm">Sq Kilometers (km²)</SelectItem>
                                <SelectItem value="sqmi">Sq Miles (mi²)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AreaStat label="Sq Meters" value={results.sqm.toLocaleString()} s="m²" />
                    <AreaStat label="Sq Feet" value={results.sqft.toLocaleString()} s="ft²" />
                    <AreaStat label="Acres" value={results.acre.toFixed(4)} s="ac" />
                    <AreaStat label="Hectares" value={results.hectare.toFixed(4)} s="ha" />
                    <AreaStat label="Sq Miles" value={results.sqmi.toFixed(6)} s="mi²" />
                    <AreaStat label="Sq Kilometers" value={results.sqkm.toFixed(6)} s="km²" />
                </div>
            </CardContent>
        </Card>
    );
}

function AreaStat({ label, value, s }: any) {
    return (
        <div className="p-8 rounded-3xl bg-muted/10 border border-primary/5 hover:border-primary/20 transition-all text-center">
            <p className="text-[10px] font-black text-primary uppercase transparency-50 mb-2">{label}</p>
            <div className="flex flex-col">
                <span className="text-2xl font-black">{value}</span>
                <span className="text-[10px] font-bold opacity-30">{s}</span>
            </div>
        </div>
    );
}
