'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TemperatureConverter() {
    const [val, setVal] = useState('0');
    const [unit, setUnit] = useState('C');

    const convert = (v: number, u: string) => {
        if (u === 'C') return { C: v, F: (v * 9 / 5) + 32, K: v + 273.15 };
        if (u === 'F') return { C: (v - 32) * 5 / 9, F: v, K: (v - 32) * 5 / 9 + 273.15 };
        return { C: v - 273.15, F: (v - 273.15) * 9 / 5 + 32, K: v };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Thermometer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Temperature Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Professional grade conversion between Celsius, Fahrenheit, and Kelvin.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Input Degrees</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-48 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Unit</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="C">Celsius (°C)</SelectItem>
                                <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                                <SelectItem value="K">Kelvin (K)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ResultBox label="Celsius" value={results.C.toFixed(2)} unit="°C" active={unit === 'C'} />
                    <ResultBox label="Fahrenheit" value={results.F.toFixed(2)} unit="°F" active={unit === 'F'} />
                    <ResultBox label="Kelvin" value={results.K.toFixed(2)} unit="K" active={unit === 'K'} />
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0" />
                    <div className="text-xs space-y-2">
                        <p className="font-bold">Interesting Facts:</p>
                        <p className="text-muted-foreground leading-relaxed italic">
                            Absolute zero is 0K (-273.15°C). Water freezes at 0°C (32°F) and boils at 100°C (212°F) at sea level.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultBox({ label, value, unit, active }: any) {
    return (
        <div className={`p-8 rounded-3xl border transition-all text-center ${active ? 'bg-primary border-primary shadow-xl shadow-primary/20 text-white' : 'bg-muted/10 border-primary/5'
            }`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white/70' : 'text-primary'}`}>{label}</p>
            <h3 className="text-4xl font-black mt-2">{value}</h3>
            <p className="text-sm font-bold opacity-50">{unit}</p>
        </div>
    );
}
