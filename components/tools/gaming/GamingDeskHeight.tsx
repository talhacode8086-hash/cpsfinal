'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Maximize2, Ruler, User, Monitor } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GamingDeskHeight() {
    const [userHeight, setUserHeight] = useState('175');
    const [unit, setUnit] = useState('cm');

    const calculateErgonomics = (height: number, u: string) => {
        const h = u === 'in' ? height * 2.54 : height;

        // General ergonomic formulas (approximations)
        return {
            chair: (h * 0.25).toFixed(1),
            desk: (h * 0.41).toFixed(1),
            monitor: (h * 0.70).toFixed(1),
        };
    };

    const val = parseFloat(userHeight) || 0;
    const results = calculateErgonomics(val, unit);

    const convert = (cm: string) => {
        return unit === 'in' ? (parseFloat(cm) / 2.54).toFixed(1) : cm;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Maximize2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Gaming Desk Height</CardTitle>
                <p className="text-muted-foreground mt-2">Optimize your posture for better aim and long-term health.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex flex-col md:flex-row gap-6 items-end justify-center">
                    <div className="space-y-2 flex-1 max-w-[200px]">
                        <Label>Your Height</Label>
                        <Input value={userHeight} onChange={(e) => setUserHeight(e.target.value)} type="number" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2 w-[120px]">
                        <Label>Unit</Label>
                        <Select value={unit} onValueChange={setUnit}>
                            <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cm">cm</SelectItem>
                                <SelectItem value="in">inches</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ErgoCard
                        icon={<User className="h-5 w-5" />}
                        label="Seat Height"
                        value={convert(results.chair)}
                        unit={unit}
                        desc="From floor to top of seat"
                    />
                    <ErgoCard
                        icon={<Ruler className="h-5 w-5" />}
                        label="Desk Height"
                        value={convert(results.desk)}
                        unit={unit}
                        desc="From floor to desk surface"
                        primary
                    />
                    <ErgoCard
                        icon={<Monitor className="h-5 w-5" />}
                        label="Monitor Top"
                        value={convert(results.monitor)}
                        unit={unit}
                        desc="Eye level should be here"
                    />
                </div>

                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                    <h3 className="font-bold text-lg text-primary">Pro Posture Tips:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <li className="flex gap-2">â€¢ <span>Your elbows should be at a <b>90-100&deg;</b> angle when resting on the desk.</span></li>
                        <li className="flex gap-2">â€¢ <span>Keep your feet flat on the floor; use a footrest if necessary.</span></li>
                        <li className="flex gap-2">â€¢ <span>The monitor should be about an <b>arm&apos;s length</b> away.</span></li>
                        <li className="flex gap-2">â€¢ <span>Lowering your desk slightly can help with <b>arm aiming</b> and range of motion.</span></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

function ErgoCard({ icon, label, value, unit, desc, primary = false }: any) {
    return (
        <div className={`p-8 rounded-2xl border flex flex-col items-center text-center space-y-3 transition-all ${primary ? 'bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105' : 'bg-muted/30 border-primary/5'
            }`}>
            <div className={`p-3 rounded-xl ${primary ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                {icon}
            </div>
            <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${primary ? 'text-white/70' : 'text-primary'}`}>{label}</p>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black">{value}</span>
                    <span className="text-sm font-bold opacity-70">{unit}</span>
                </div>
            </div>
            <p className={`text-[10px] leading-tight ${primary ? 'text-white/60' : 'text-muted-foreground'}`}>{desc}</p>
        </div>
    );
}
