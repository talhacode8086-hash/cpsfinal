'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Maximize, Calculator, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FOV_TYPES = [
    { label: 'Horizontal (16:9)', value: 'h169' },
    { label: 'Vertical (1:1)', value: 'v11' },
    { label: 'Horizontal (4:3)', value: 'h43' },
];

export default function FOVCalculator() {
    const [fov, setFov] = useState('103');
    const [fromType, setFromType] = useState('h169');

    const calculateFOVs = (val: number, type: string) => {
        let vFov = 0;
        const rad = (d: number) => (d * Math.PI) / 180;
        const deg = (r: number) => (r * 180) / Math.PI;

        // Convert input to Vertical FOV first
        if (type === 'v11') {
            vFov = val;
        } else if (type === 'h169') {
            vFov = deg(2 * Math.atan(Math.tan(rad(val) / 2) * (9 / 16)));
        } else if (type === 'h43') {
            vFov = deg(2 * Math.atan(Math.tan(rad(val) / 2) * (3 / 4)));
        }

        return {
            v: vFov.toFixed(2),
            h169: deg(2 * Math.atan(Math.tan(rad(vFov) / 2) * (16 / 9))).toFixed(2),
            h43: deg(2 * Math.atan(Math.tan(rad(vFov) / 2) * (4 / 3))).toFixed(2),
            h219: deg(2 * Math.atan(Math.tan(rad(vFov) / 2) * (21 / 9))).toFixed(2),
        };
    };

    const results = calculateFOVs(parseFloat(fov) || 0, fromType);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Maximize className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">FOV Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Convert Field of View settings between different aspect ratios.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Base FOV Value</Label>
                        <Input
                            type="number"
                            value={fov}
                            onChange={(e) => setFov(e.target.value)}
                            className="text-xl h-12 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Input Type</Label>
                        <Select value={fromType} onValueChange={setFromType}>
                            <SelectTrigger className="h-12 rounded-xl bg-background/50">
                                <SelectValue placeholder="Select ratio" />
                            </SelectTrigger>
                            <SelectContent>
                                {FOV_TYPES.map(t => (
                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ResultBox label="Vertical (1:1)" value={results.v} sub="Used in R6, Battlefield" />
                    <ResultBox label="Horizontal (16:9)" value={results.h169} sub="Overwatch, Valorant" />
                    <ResultBox label="Horizontal (4:3)" value={results.h43} sub="CS:GO, Quake" />
                    <ResultBox label="Ultrawide (21:9)" value={results.h219} sub="Racing Sims" />
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-primary">
                        <Monitor className="h-4 w-4" /> Quick Reference
                    </h3>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>â€¢ <b>Valorant:</b> Uses fixed 103 Horizontal (16:9).</li>
                        <li>â€¢ <b>CS2:</b> Default is 90 Horizontal (4:3).</li>
                        <li>â€¢ <b>Apex Legends:</b> Uses Horizontal (4:3) scaling.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultBox({ label, value, sub }: { label: string, value: string, sub: string }) {
    return (
        <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 text-center space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-primary">{label}</p>
            <p className="text-3xl font-black">{value}&deg;</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{sub}</p>
        </div>
    );
}
