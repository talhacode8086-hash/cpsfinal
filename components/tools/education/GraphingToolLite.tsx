'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings2, Maximize2, LineChart as ChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphingToolLite() {
    const [a, setA] = useState('1');
    const [b, setB] = useState('0');
    const [c, setC] = useState('0');
    const [type, setType] = useState<'linear' | 'quadratic'>('linear');

    const generateData = () => {
        const data = [];
        const av = parseFloat(a) || 0;
        const bv = parseFloat(b) || 0;
        const cv = parseFloat(c) || 0;

        for (let x = -10; x <= 10; x += 0.5) {
            let y = 0;
            if (type === 'linear') {
                y = av * x + bv;
            } else {
                y = av * Math.pow(x, 2) + bv * x + cv;
            }
            data.push({ x, y });
        }
        return data;
    };

    const data = generateData();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ChartIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Visual Graph Plotter</CardTitle>
                <p className="text-muted-foreground mt-2">Visualize linear and quadratic functions on an interactive coordinate plane.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Controls */}
                    <div className="w-full lg:w-80 space-y-8">
                        <div className="bg-muted/20 p-2 rounded-2xl border border-primary/5 flex gap-2">
                            <Button
                                variant={type === 'linear' ? 'default' : 'ghost'}
                                onClick={() => setType('linear')}
                                className="flex-1 rounded-xl font-bold"
                            >
                                Linear
                            </Button>
                            <Button
                                variant={type === 'quadratic' ? 'default' : 'ghost'}
                                onClick={() => setType('quadratic')}
                                className="flex-1 rounded-xl font-bold"
                            >
                                Quadratic
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 rounded-[3rem] bg-background border border-primary/5 shadow-xl space-y-4">
                                <p className="text-[10px] font-black uppercase text-primary tracking-widest text-center mb-6">FUNCTION PARAMETERS</p>
                                {type === 'linear' ? (
                                    <>
                                        <ParamInput label="Slope (m)" value={a} onChange={setA} />
                                        <ParamInput label="Y-Intercept (b)" value={b} onChange={setB} />
                                    </>
                                ) : (
                                    <>
                                        <ParamInput label="a (xÂ²)" value={a} onChange={setA} />
                                        <ParamInput label="b (x)" value={b} onChange={setB} />
                                        <ParamInput label="c (constant)" value={c} onChange={setC} />
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <Settings2 className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold text-primary italic">
                                    {type === 'linear' ? `y = ${a}x + ${b}` : `y = ${a}xÂ² + ${b}x + ${c}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Plot */}
                    <div className="flex-1 h-[500px] bg-muted/10 rounded-[3rem] border border-primary/10 p-8 shadow-inner relative">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-primary/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Maximize2 className="h-3 w-3" /> Coordinate Plane (-10 to 10)
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.05)" />
                                <XAxis dataKey="x" stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                <YAxis stroke="hsl(var(--primary)/0.2)" fontSize={10} fontStyle="bold" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/0.1)', fontWeight: 'bold' }}
                                    itemStyle={{ color: 'hsl(var(--primary))' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="y"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={4}
                                    dot={false}
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ParamInput({ label, value, onChange }: any) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-primary/40 pl-2">{label}</label>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 rounded-xl bg-muted/10 border-transparent focus:bg-background transition-colors text-center font-bold"
            />
        </div>
    );
}
