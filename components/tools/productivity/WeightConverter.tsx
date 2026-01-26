'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Scale, Activity } from 'lucide-react';

export default function WeightConverter() {
    const [kg, setKg] = useState<number>(1);

    const units = [
        { name: 'Kilograms', factor: 1 },
        { name: 'Grams', factor: 1000 },
        { name: 'Milligrams', factor: 1000000 },
        { name: 'Pounds (lb)', factor: 2.20462 },
        { name: 'Ounces (oz)', factor: 35.274 },
        { name: 'Metric Tons', factor: 0.001 },
    ];

    const handleValueChange = (val: number, factor: number) => {
        if (isNaN(val)) return;
        setKg(val / factor);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Scale className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Weight & Mass Converter</h2>
                    <p className="text-sm text-muted-foreground">Professional tool for converting between global mass units.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {units.map((unit) => (
                    <Card key={unit.name} className="border-none bg-muted/40 hover:ring-2 hover:ring-orange-500/20 transition-all">
                        <CardContent className="p-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">{unit.name}</label>
                            <Input
                                type="number"
                                className="h-14 text-xl font-black bg-background border-none"
                                value={Number((kg * unit.factor).toFixed(6))}
                                onChange={(e) => handleValueChange(parseFloat(e.target.value), unit.factor)}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl">
                <Activity className="h-5 w-5 text-muted-foreground mt-1" />
                <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase tracking-wider">
                    All conversions are calculated using the International System of Units (SI). Precision is maintained up to 6 decimal places for scientific and engineering applications.
                </p>
            </div>
        </div>
    );
}
