'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Calculator, Zap, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Unit = 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB';

const units: Unit[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
const multipliers: Record<Unit, number> = {
    'Bytes': 1,
    'KB': 1024,
    'MB': 1024 ** 2,
    'GB': 1024 ** 3,
    'TB': 1024 ** 4
};

export default function FileSizeConverter() {
    const [value, setValue] = useState<string>('1024');
    const [fromUnit, setFromUnit] = useState<Unit>('KB');

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const convertValue = (toUnit: Unit) => {
        const val = parseFloat(value) || 0;
        const bytes = val * multipliers[fromUnit];
        const result = bytes / multipliers[toUnit];

        // Format nicely
        if (result === 0) return '0';
        if (result < 0.0001) return result.toExponential(4);
        return parseFloat(result.toFixed(6)).toString();
    };

    const copyToClipboard = (val: string, unit: string) => {
        navigator.clipboard.writeText(val);
        toast.success(`Copied ${val} ${unit}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 p-4">
            {/* Input Section */}
            <div className="flex flex-col items-center space-y-6">
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-glow">
                    <Scale className="h-10 w-10" />
                </div>
                <div className="max-w-sm w-full space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            value={value}
                            onChange={handleValueChange}
                            placeholder="Enter size..."
                            className="h-14 rounded-2xl border-primary/20 text-xl font-bold px-6 bg-muted/30"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value as Unit)}
                            className="bg-primary text-primary-foreground h-14 rounded-2xl px-4 font-black text-sm outline-none shadow-lg shadow-primary/20"
                        >
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {units.map((unit) => {
                    const result = convertValue(unit);
                    const isActive = fromUnit === unit;
                    return (
                        <Card
                            key={unit}
                            className={cn(
                                "group relative rounded-[2rem] border-primary/5 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/5",
                                isActive ? "bg-primary/5 ring-2 ring-primary/20" : "bg-muted/10"
                            )}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    {unit}
                                </span>
                                <span className="text-xl font-black text-foreground truncate w-full text-center">
                                    {result}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(result, unit)}
                                    className="rounded-xl h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Copy className="h-3 w-3 mr-1" /> Copy
                                </Button>
                            </div>
                            {isActive && (
                                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                    <Zap className="h-3 w-3 fill-current" />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            <div className="p-8 rounded-[3rem] bg-background border shadow-2xl space-y-6">
                <h4 className="flex items-center gap-2 font-black text-lg uppercase tracking-tighter">
                    <Calculator className="h-5 w-5 text-primary" /> Visual Amortization
                </h4>
                <div className="space-y-4">
                    {units.slice().reverse().map((unit) => {
                        const val = parseFloat(convertValue(unit));
                        // Find max for percentage
                        const maxVal = parseFloat(convertValue('Bytes'));
                        const percentage = Math.max(1, Math.min(100, (Math.log10(val * multipliers[unit]) / Math.log10(multipliers['TB'])) * 100));

                        return (
                            <div key={unit} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                    <span>{unit}</span>
                                    <span>{val}</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full bg-primary shadow-glow"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
