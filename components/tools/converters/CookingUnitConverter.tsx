'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CookingUnitConverter() {
    const [val, setVal] = useState('1');
    const [unit, setUnit] = useState('cup');

    const rates: Record<string, number> = {
        cup: 1,
        tbsp: 16,
        tsp: 48,
        ml: 236.588,
        floz: 8,
        pint: 0.5,
        quart: 0.25
    };

    const convert = (v: number, from: string) => {
        const base = v / rates[from]; // cups
        return {
            cup: base,
            tbsp: base * 16,
            tsp: base * 48,
            ml: base * 236.588,
            pint: base * 0.5,
            floz: base * 8
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Utensils className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Cooking Unit Converter</CardTitle>
                <p className="text-muted-foreground mt-2">The ultimate kitchen companion for volume and weight scaling.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Quantity</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Measure</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cup">Cups</SelectItem>
                                <SelectItem value="tbsp">Tablespoons (tbsp)</SelectItem>
                                <SelectItem value="tsp">Teaspoons (tsp)</SelectItem>
                                <SelectItem value="ml">Milliliters (ml)</SelectItem>
                                <SelectItem value="floz">Fluid Ounces (oz)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <KitchenBox label="Cups" value={results.cup.toFixed(2)} icon="🥛" />
                    <KitchenBox label="Tablespoons" value={results.tbsp.toFixed(0)} icon="🥄" />
                    <KitchenBox label="Teaspoons" value={results.tsp.toFixed(0)} icon="🥄" />
                    <KitchenBox label="Milliliters" value={results.ml.toFixed(0)} icon="💧" />
                    <KitchenBox label="US Pints" value={results.pint.toFixed(2)} icon="🍺" />
                    <KitchenBox label="Fluid Ounces" value={results.floz.toFixed(0)} icon="🍷" />
                </div>
            </CardContent>
        </Card>
    );
}

function KitchenBox({ label, value, icon }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/5 flex flex-col items-center">
            <span className="text-2xl mb-2">{icon}</span>
            <span className="text-[10px] font-black uppercase text-primary opacity-50 mb-1">{label}</span>
            <h4 className="text-3xl font-black">{value}</h4>
        </div>
    );
}
