'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Ruler, ArrowRightLeft } from 'lucide-react';

export default function LengthConverter() {
    const [meters, setMeters] = useState<number>(1);

    const units = [
        { name: 'Meters', factor: 1 },
        { name: 'Centimeters', factor: 100 },
        { name: 'Millimeters', factor: 1000 },
        { name: 'Kilometers', factor: 0.001 },
        { name: 'Inches', factor: 39.3701 },
        { name: 'Feet', factor: 3.28084 },
        { name: 'Yards', factor: 1.09361 },
        { name: 'Miles', factor: 0.000621371 },
    ];

    const handleValueChange = (val: number, factor: number) => {
        if (isNaN(val)) return;
        setMeters(val / factor);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Ruler className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Length & Distance Converter</h2>
                    <p className="text-sm text-muted-foreground">Convert between metric and imperial units instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {units.map((unit) => (
                    <Card key={unit.name} className="border-none bg-muted/30 hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">{unit.name}</label>
                            <div className="flex items-center gap-3">
                                <Input
                                    type="number"
                                    className="h-12 text-lg font-bold bg-background border-none shadow-sm"
                                    value={Number((meters * unit.factor).toFixed(6))}
                                    onChange={(e) => handleValueChange(parseFloat(e.target.value), unit.factor)}
                                />
                                <span className="text-sm font-bold text-primary/40">{unit.name.charAt(0).toLowerCase() === 'i' ? 'in' : unit.name.substring(0, 2).toLowerCase()}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center gap-4">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                <p className="text-sm leading-relaxed">
                    Values are calculated relative to <b>1 Meter</b>. Simply type in any box to update all other units in real-time.
                </p>
            </div>
        </div>
    );
}
