'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, HardDrive } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DigitalStoragePro() {
    const [val, setVal] = useState('1');
    const [unit, setUnit] = useState('GB');

    const convert = (v: number, from: string) => {
        // Base in Bytes (decimal base 1000)
        let bytes = 0;
        const dec: Record<string, number> = { 'B': 1, 'KB': 1e3, 'MB': 1e6, 'GB': 1e9, 'TB': 1e12 };
        const bin: Record<string, number> = { 'B': 1, 'KiB': 1024, 'MiB': Math.pow(1024, 2), 'GiB': Math.pow(1024, 3), 'TiB': Math.pow(1024, 4) };

        if (dec[from]) bytes = v * dec[from];
        else if (bin[from]) bytes = v * bin[from];

        return {
            b: bytes,
            kb: bytes / 1e3,
            kib: bytes / 1024,
            mb: bytes / 1e6,
            mib: bytes / Math.pow(1024, 2),
            gb: bytes / 1e9,
            gib: bytes / Math.pow(1024, 3)
        };
    };

    const results = convert(parseFloat(val) || 0, unit);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Database className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Digital Storage Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Differentiate between Marketing (Decimal) and OS (Binary) storage sizes.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Data Amount</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-2xl font-bold"
                        />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Magnitude</label>
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full h-16 rounded-2xl bg-muted/20 border-primary/10 font-bold text-lg outline-none px-4">
                            <option value="MB">Megabytes (MB)</option>
                            <option value="MiB">Mebibytes (MiB)</option>
                            <option value="GB">Gigabytes (GB)</option>
                            <option value="GiB">Gibibytes (GiB)</option>
                            <option value="TB">Terabytes (TB)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Marketing (Base 1000)</h4>
                        <StorageRow label="Kilobytes" value={results.kb.toFixed(2)} unit="KB" />
                        <StorageRow label="Megabytes" value={results.mb.toFixed(2)} unit="MB" />
                        <StorageRow label="Gigabytes" value={results.gb.toFixed(2)} unit="GB" />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Operating System (Base 1024)</h4>
                        <StorageRow label="Kibibytes" value={results.kib.toFixed(2)} unit="KiB" />
                        <StorageRow label="Mebibytes" value={results.mib.toFixed(2)} unit="MiB" />
                        <StorageRow label="Gibibytes" value={results.gib.toFixed(2)} unit="GiB" />
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/10 border-2 border-primary/20 flex gap-6 items-center">
                    <HardDrive className="h-12 w-12 text-primary shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-black text-primary">Why is my 1TB drive showing 931GB?</p>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                            Manufacturers sell drives in **Decimal** (1TB = 1,000,000,000,000 Bytes). But Windows measures in **Binary** (TiB/GiB), so it calculates 1,000,000,000,000 / 1024³ = 931.3 GiB.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StorageRow({ label, value, unit }: any) {
    return (
        <div className="flex justify-between items-center p-4 rounded-xl bg-background border border-primary/5 hover:bg-primary/5 transition-all">
            <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
            <span className="font-mono font-black text-sm">{value} {unit}</span>
        </div>
    );
}
