'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FrequencyConverter() {
    const [val, setVal] = useState('2.4');
    const [unit, setUnit] = useState('ghz');

    const rates: Record<string, number> = {
        hz: 1,
        khz: 1e3,
        mhz: 1e6,
        ghz: 1e9,
        thz: 1e12
    };

    const convert = (v: number, from: string) => {
        const base = v * rates[from]; // Hz
        return {
            hz: base,
            khz: base / 1e3,
            mhz: base / 1e6,
            ghz: base / 1e9,
            rpm: (base * 60)
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Radio className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Frequency Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Convert between acoustic, radio, and CPU frequencies.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Frequency</label>
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
                                <SelectItem value="hz">Hertz (Hz)</SelectItem>
                                <SelectItem value="khz">Kilohertz (kHz)</SelectItem>
                                <SelectItem value="mhz">Megahertz (MHz)</SelectItem>
                                <SelectItem value="ghz">Gigahertz (GHz)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <FreqBox label="Standard" value={results.hz.toLocaleString()} unit="Hz" />
                    <FreqBox label="Radio" value={results.mhz.toFixed(2)} unit="MHz" />
                    <FreqBox label="Processor" value={results.ghz.toFixed(3)} unit="GHz" />
                    <FreqBox label="Rotational" value={results.rpm.toLocaleString()} unit="RPM" />
                </div>
            </CardContent>
        </Card>
    );
}

function FreqBox({ label, value, unit }: any) {
    return (
        <div className="p-6 rounded-3xl bg-background border border-primary/5 text-center group hover:border-primary/20 transition-all">
            <p className="text-[9px] font-black text-primary uppercase mb-2 opacity-50">{label}</p>
            <h4 className="text-xl font-black truncate">{value}</h4>
            <span className="text-[10px] font-bold opacity-30">{unit}</span>
        </div>
    );
}
