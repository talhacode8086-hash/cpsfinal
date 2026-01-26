'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DataRateConverter() {
    const [val, setVal] = useState('100');
    const [unit, setUnit] = useState('Mbps');

    const rates: Record<string, number> = {
        'bps': 1,
        'kbps': 1000,
        'Mbps': 1000000,
        'Gbps': 1000000000,
        'KB/s': 8000,
        'MB/s': 8000000,
        'GB/s': 8000000000
    };

    const convert = (v: number, from: string) => {
        const base = v * rates[from]; // bps
        return {
            mbps: base / 1000000,
            mbs: base / 8000000,
            gbps: base / 1000000000,
            kbs: base / 8000
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Data Rate Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Differentiate between bits and bytes for internet and file transfer speeds.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Transfer Speed</label>
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
                                <SelectItem value="Mbps">Megabits (Mbps)</SelectItem>
                                <SelectItem value="MB/s">Megabytes (MB/s)</SelectItem>
                                <SelectItem value="Gbps">Gigabits (Gbps)</SelectItem>
                                <SelectItem value="KB/s">Kilobytes (KB/s)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[3rem] bg-background border-2 border-primary/10 flex flex-col items-center">
                        <span className="text-[10px] font-black text-primary uppercase mb-2">Internet Speed</span>
                        <h4 className="text-5xl font-black">{results.mbps.toFixed(1)}</h4>
                        <span className="text-lg font-bold opacity-30">Mbps</span>
                    </div>
                    <div className="p-8 rounded-[3rem] bg-primary text-white shadow-xl shadow-primary/20 flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase mb-2 opacity-70">Actual Download</span>
                        <h4 className="text-5xl font-black">{results.mbs.toFixed(1)}</h4>
                        <span className="text-lg font-bold opacity-50">MB/s</span>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 flex gap-4">
                    <Download className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        <b>The 8:1 Rule:</b> Most ISPs advertise in Bits (Mbps), but browsers show downloads in Bytes (MB/s). 1 Byte = 8 Bits. A 100Mbps plan will download at max 12.5 MB/s.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
