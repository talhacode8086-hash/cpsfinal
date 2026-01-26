'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SpeedConverter() {
    const [val, setVal] = useState('100');
    const [unit, setUnit] = useState('kmh');

    const rates: Record<string, number> = {
        kmh: 1,
        mph: 0.621371,
        knots: 0.539957,
        ms: 0.277778,
        fps: 0.911344
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // value in kmh
        return {
            kmh: base,
            mph: base * rates.mph,
            knots: base * rates.knots,
            ms: base * rates.ms,
            fps: base * rates.fps
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Navigation className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Speed Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Inter-system conversion for km/h, mph, knots, and scientific m/s.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Velocity Input</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-48 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">From</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kmh">Km/h</SelectItem>
                                <SelectItem value="mph">Mph</SelectItem>
                                <SelectItem value="knots">Knots</SelectItem>
                                <SelectItem value="ms">m/s</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <SpeedBox label="Kilometers/hr" value={results.kmh.toFixed(1)} unit="km/h" />
                    <SpeedBox label="Miles/hour" value={results.mph.toFixed(1)} unit="mph" />
                    <SpeedBox label="Knots (Nautical)" value={results.knots.toFixed(1)} unit="kn" />
                    <SpeedBox label="Meters/second" value={results.ms.toFixed(2)} unit="m/s" />
                </div>

                <div className="p-6 rounded-2xl bg-muted/20 border border-primary/5 flex gap-4 italic text-xs text-muted-foreground">
                    <Info className="h-5 w-5 text-primary shrink-0" />
                    <p>Speed of sound is approx 1,235 km/h (767 mph). Light travels at 299,792,458 m/s.</p>
                </div>
            </CardContent>
        </Card>
    );
}

function SpeedBox({ label, value, unit }: any) {
    return (
        <div className="p-6 rounded-3xl bg-background border border-primary/5 hover:border-primary/20 transition-all group">
            <p className="text-[9px] font-black uppercase tracking-tight text-primary/60 group-hover:text-primary mb-2">{label}</p>
            <h4 className="text-2xl font-black">{value}</h4>
            <p className="text-[10px] font-bold opacity-30">{unit}</p>
        </div>
    );
}
