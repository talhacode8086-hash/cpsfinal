'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fuel } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FuelEconomyConverter() {
    const [val, setVal] = useState('30');
    const [unit, setUnit] = useState('mpg_us');

    const convert = (v: number, from: string) => {
        let l100 = 0;
        if (v <= 0) return { l100: 0, mpg_us: 0, mpg_uk: 0, kml: 0 };

        if (from === 'l100') l100 = v;
        else if (from === 'mpg_us') l100 = 235.215 / v;
        else if (from === 'mpg_uk') l100 = 282.481 / v;
        else if (from === 'kml') l100 = 100 / v;

        return {
            l100: l100,
            mpg_us: 235.215 / l100,
            mpg_uk: 282.481 / l100,
            kml: 100 / l100
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Fuel className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Fuel Economy Converter</CardTitle>
                <p className="text-muted-foreground mt-2">International efficiency conversion for car enthusiasts and travelers.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Consumption Rate</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Standard</label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mpg_us">MPG (US)</SelectItem>
                                <SelectItem value="mpg_uk">MPG (UK/Imperial)</SelectItem>
                                <SelectItem value="l100">Liters/100km</SelectItem>
                                <SelectItem value="kml">km/Liter</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FuelCard label="Metric (Europe/Asia)" value={results.l100.toFixed(1)} unit="L/100km" primary={unit === 'l100'} />
                    <FuelCard label="United States" value={results.mpg_us.toFixed(1)} unit="MPG" primary={unit === 'mpg_us'} />
                    <FuelCard label="United Kingdom" value={results.mpg_uk.toFixed(1)} unit="MPG (Imp)" primary={unit === 'mpg_uk'} />
                    <FuelCard label="Efficiency Factor" value={results.kml.toFixed(1)} unit="km/l" />
                </div>
            </CardContent>
        </Card>
    );
}

function FuelCard({ label, value, unit, primary }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex justify-between items-center ${primary ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-muted/10 border-primary/5'
            }`}>
            <div className="space-y-1">
                <p className={`text-[10px] font-black uppercase tracking-widest ${primary ? 'text-white/70' : 'text-primary'}`}>{label}</p>
                <h4 className="text-3xl font-black">{isNaN(parseFloat(value)) ? '0' : value}</h4>
            </div>
            <span className="text-xs font-bold opacity-30">{unit}</span>
        </div>
    );
}
