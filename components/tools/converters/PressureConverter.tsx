'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PressureConverter() {
    const [val, setVal] = useState('32');
    const [unit, setUnit] = useState('psi');

    const rates: Record<string, number> = {
        psi: 1,
        bar: 0.0689476,
        pascal: 6894.76,
        atm: 0.068046,
        torr: 51.7149
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // psi
        return {
            psi: base,
            bar: base * rates.bar,
            pascal: base * rates.pascal,
            atm: base * rates.atm,
            torr: base * rates.torr
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Gauge className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Pressure Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Precision conversion for automotive, diving, and engineering metrics.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Pressure Magnitude</label>
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
                                <SelectItem value="psi">PSI (Pounds/sq in)</SelectItem>
                                <SelectItem value="bar">Bar</SelectItem>
                                <SelectItem value="pascal">Pascal (Pa)</SelectItem>
                                <SelectItem value="atm">Atmosphere (atm)</SelectItem>
                                <SelectItem value="torr">Torr (mmHg)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PressureGrid label="PSI" value={results.psi.toFixed(2)} />
                    <PressureGrid label="Bar" value={results.bar.toFixed(3)} />
                    <PressureGrid label="Atmospheres" value={results.atm.toFixed(3)} />
                    <PressureGrid label="Kilopascal" value={(results.pascal / 1000).toFixed(2)} />
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 italic text-[11px] text-muted-foreground flex items-center gap-3">
                    <Info className="h-4 w-4 text-primary" />
                    <p>Standard tire pressure for cars is typically 30-35 PSI. Atmospheric pressure at sea level is 1 atm (14.7 PSI).</p>
                </div>
            </CardContent>
        </Card>
    );
}

function PressureGrid({ label, value }: any) {
    return (
        <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center">
            <p className="text-[9px] font-black text-primary uppercase mb-2 opacity-50">{label}</p>
            <h4 className="text-xl font-black">{value}</h4>
        </div>
    );
}
