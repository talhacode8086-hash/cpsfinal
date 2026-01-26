'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AngleConverter() {
    const [val, setVal] = useState('0');
    const [unit, setUnit] = useState('deg');

    const convert = (v: number, from: string) => {
        let deg = 0;
        if (from === 'deg') deg = v;
        else if (from === 'rad') deg = v * (180 / Math.PI);
        else if (from === 'grad') deg = v * 0.9;

        return {
            deg: deg,
            rad: deg * (Math.PI / 180),
            grad: deg / 0.9,
            circle: deg / 360
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Angle Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Geometry utility for Degrees, Radians, and Gradians.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Input Rotation</label>
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
                                <SelectItem value="deg">Degrees (°)</SelectItem>
                                <SelectItem value="rad">Radians (rad)</SelectItem>
                                <SelectItem value="grad">Gradians (gon)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center">
                    <div className="space-y-4">
                        <AngleResult label="Degrees" value={results.deg.toFixed(2)} unit="°" />
                        <AngleResult label="Radians" value={results.rad.toFixed(4)} unit="rad" />
                        <AngleResult label="Gradians" value={results.grad.toFixed(2)} unit="grad" />
                    </div>
                    <div className="relative w-64 h-64 mx-auto bg-muted/10 rounded-full border-4 border-dashed border-primary/10 flex items-center justify-center">
                        <div
                            className="absolute w-1 h-32 bg-primary/40 bottom-1/2 origin-bottom transition-all duration-500"
                            style={{ transform: `rotate(${results.deg}deg)` }}
                        />
                        <div className="w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
                        <span className="absolute bottom-4 text-[10px] font-black text-primary uppercase">Visual Preview</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function AngleResult({ label, value, unit }: any) {
    return (
        <div className="flex justify-between items-center p-6 rounded-2xl bg-muted/5 border border-primary/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{label}</span>
            <span className="text-xl font-black">{value} <span className="text-xs opacity-50">{unit}</span></span>
        </div>
    );
}
