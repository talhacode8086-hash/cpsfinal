'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoveUpRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VectorCalcPro() {
    const [v1, setV1] = useState({ x: '3', y: '4', z: '0' });
    const [v2, setV2] = useState({ x: '1', y: '0', z: '2' });

    const calculate = () => {
        const a = { x: parseFloat(v1.x) || 0, y: parseFloat(v1.y) || 0, z: parseFloat(v1.z) || 0 };
        const b = { x: parseFloat(v2.x) || 0, y: parseFloat(v2.y) || 0, z: parseFloat(v2.z) || 0 };

        const dot = a.x * b.x + a.y * b.y + a.z * b.z;
        const cross = {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };

        const magA = Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2);
        const magB = Math.sqrt(b.x ** 2 + b.y ** 2 + b.z ** 2);

        const cosTheta = (magA * magB) !== 0 ? dot / (magA * magB) : 0;
        const angle = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI);

        return { dot, cross, magA: magA.toFixed(3), magB: magB.toFixed(3), angle: angle.toFixed(2) };
    };

    const res = calculate();

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <MoveUpRight className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-scholar">Vector Calc Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Professional 3D vector algebra for mechanics and spatial geometry.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <VectorInput label="Vector V1" val={v1} setVal={setV1} color="text-primary" />
                    <VectorInput label="Vector V2" val={v2} setVal={setV2} color="text-indigo-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[3rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 text-white flex flex-col items-center justify-center gap-2 group hover:scale-[1.03] transition-all">
                        <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">DOT PRODUCT</p>
                        <h3 className="text-6xl font-black">{res.dot}</h3>
                        <span className="text-[8px] font-black opacity-40 uppercase">Scalar Result</span>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-indigo-600 border-4 border-indigo-600 shadow-3xl shadow-indigo-600/30 text-white flex flex-col items-center justify-center gap-2 group hover:scale-[1.03] transition-all">
                        <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">CROSS PRODUCT</p>
                        <h3 className="text-4xl font-black font-mono">({res.cross.x}, {res.cross.y}, {res.cross.z})</h3>
                        <span className="text-[8px] font-black opacity-40 uppercase">Vector Result</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <ResultMini label="Angle Between" value={`${res.angle}Â°`} />
                        <ResultMini label="Magnitude |V1|" value={res.magA} />
                        <ResultMini label="Magnitude |V2|" value={res.magB} />
                    </div>
                </div>

                <div className="p-10 rounded-[4rem] bg-primary/5 border border-primary/10 flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary"><Target className="h-6 w-6" /></div>
                    <div className="text-xs text-muted-foreground leading-relaxed italic">
                        The <b>dot product</b> measures how much one vector points in the direction of another (scalar), while the <b>cross product</b> produces a vector orthogonal to both inputs (vector).
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function VectorInput({ label, val, setVal, color }: any) {
    return (
        <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center opacity-40">{label}</p>
            <div className="flex gap-4 p-8 rounded-[3rem] bg-muted/10 border border-primary/5 shadow-inner">
                {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[8px] font-black text-primary/40 uppercase">{axis}</span>
                        <Input
                            value={val[axis as 'x' | 'y' | 'z']}
                            onChange={(e) => setVal({ ...val, [axis]: e.target.value })}
                            className={`h-12 text-2xl font-black text-center border-none bg-transparent ${color}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResultMini({ label, value }: any) {
    return (
        <div className="flex justify-between items-center p-6 rounded-3xl bg-background border border-primary/5 shadow-md">
            <span className="text-[10px] font-black uppercase text-primary/40">{label}</span>
            <span className="text-xl font-black text-primary">{value}</span>
        </div>
    );
}
