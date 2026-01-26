'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Monitor, Shuffle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MonitorDistanceMatcher() {
    const [oldFov, setOldFov] = useState('103');
    const [newFov, setNewFov] = useState('103');
    const [sensitivity, setSensitivity] = useState('1.0');
    const [coefficient, setCoefficient] = useState('1.33'); // Default 133% for match

    const calculateMatchedSens = () => {
        const s = parseFloat(sensitivity) || 0;
        const of = parseFloat(oldFov) || 1;
        const nf = parseFloat(newFov) || 1;
        const c = parseFloat(coefficient) || 0;

        // MDH (Monitor Distance Horizontal) Matching formula
        // sens_new = sens_old * (tan(fov_new/2) / tan(fov_old/2))
        const rad = (d: number) => (d * Math.PI) / 180;
        const matched = s * (Math.tan(rad(nf) / 2) / Math.tan(rad(of) / 2));

        return matched.toFixed(4);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Monitor Distance Matcher</CardTitle>
                <p className="text-muted-foreground mt-2">Maintain "Aim Feel" across different FOVs and Aspect Ratios.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Old Game / FOV (&deg;)</Label>
                            <Input value={oldFov} onChange={(e) => setOldFov(e.target.value)} type="number" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label>New Game / FOV (&deg;)</Label>
                            <Input value={newFov} onChange={(e) => setNewFov(e.target.value)} type="number" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Sensitivity</Label>
                            <Input value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} type="number" step="0.001" className="rounded-xl h-12 border-primary/30" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-6 p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                        <div className="text-center">
                            <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">New Matched Sensitivity</p>
                            <p className="text-6xl font-black text-foreground">{calculateMatchedSens()}</p>
                        </div>
                        <div className="w-full h-[2px] bg-primary/10" />
                        <p className="text-sm text-center text-muted-foreground px-4 italic">
                            Formula: 0% Monitor Distance Matching (Focal Length Scaling).
                            Best for matching the feel of fast flicks near the center of the screen.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-primary/5 flex items-center gap-4">
                        <Shuffle className="h-5 w-5 text-primary" />
                        <div className="text-xs">
                            <p className="font-bold">Consistent Flicks</p>
                            <p className="text-muted-foreground">Keep your "muscle memory" for small adjustments identical.</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-primary/5 flex items-center gap-4">
                        <Monitor className="h-5 w-5 text-primary" />
                        <div className="text-xs">
                            <p className="font-bold">FOV Independent</p>
                            <p className="text-muted-foreground">Automatically compensates for distortion at high FOVs.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
