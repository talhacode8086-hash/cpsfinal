'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Info, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function UnitCircleInteractive() {
    const [angle, setAngle] = useState([45]); // degrees

    const rad = (angle[0] * Math.PI) / 180;
    const sin = Math.sin(rad).toFixed(3);
    const cos = Math.cos(rad).toFixed(3);
    const tan = Math.tan(rad).toFixed(3);

    const x = Math.cos(rad) * 120;
    const y = -Math.sin(rad) * 120; // SVG y is down

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Unit Circle Interactive</CardTitle>
                <p className="text-muted-foreground mt-2">Explore the foundations of trigonometry by visualizing sine and cosine values in real-time.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Circle Visualization */}
                    <div className="relative w-80 h-80 bg-background rounded-full border-2 border-primary/10 shadow-inner flex items-center justify-center">
                        <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
                            {/* Axes */}
                            <line x1="0" y1="160" x2="320" y2="160" stroke="hsl(var(--primary)/0.1)" strokeWidth="1" />
                            <line x1="160" y1="0" x2="160" y2="320" stroke="hsl(var(--primary)/0.1)" strokeWidth="1" />

                            {/* Circle */}
                            <circle cx="160" cy="160" r="120" fill="none" stroke="hsl(var(--primary)/20%)" strokeWidth="2" strokeDasharray="4 4" />

                            {/* Cosine Line (x) */}
                            <line x1="160" y1="160" x2={160 + x} y2="160" stroke="hsl(var(--primary))" strokeWidth="3" />

                            {/* Sine Line (y) */}
                            <line x1={160 + x} y1="160" x2={160 + x} y2={160 + y} stroke="hsl(var(--primary)/40%)" strokeWidth="3" strokeDasharray="2 2" />

                            {/* Radius Vector */}
                            <line x1="160" y1="160" x2={160 + x} y2={160 + y} stroke="hsl(var(--primary))" strokeWidth="4" />

                            {/* Point */}
                            <circle cx={160 + x} cy={160 + y} r="6" fill="hsl(var(--primary))" />

                            {/* Angle Arc (placeholder) */}
                            <path d={`M 190 160 A 30 30 0 0 0 ${160 + 30 * Math.cos(rad)} ${160 - 30 * Math.sin(rad)}`} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                        </svg>

                        <div className="absolute -bottom-8 bg-primary px-6 py-2 rounded-2xl shadow-xl">
                            <span className="text-white font-black text-2xl">{angle[0]}Â°</span>
                        </div>
                    </div>

                    {/* Data Panel */}
                    <div className="flex-1 space-y-6 w-full">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary/40">
                                <span>ROTATE ANGLE</span>
                                <span>{(angle[0] * Math.PI / 180).toFixed(3)} RAD</span>
                            </div>
                            <Slider value={angle} onValueChange={setAngle} max={360} step={1} className="py-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TrigStat label="Sin (y)" value={sin} color="text-primary" />
                            <TrigStat label="Cos (x)" value={cos} color="text-primary" />
                            <TrigStat label="Tan (y/x)" value={Math.abs(parseFloat(tan)) > 50 ? 'âˆž' : tan} color="text-primary/60" />
                        </div>

                        <div className="p-8 rounded-[3rem] bg-muted/20 border border-primary/5 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary/40">
                                <Target className="h-4 w-4" /> Coordinate Data
                            </div>
                            <div className="text-xl font-bold font-mono">
                                P = ({cos}, {sin})
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="text-xs font-black uppercase text-primary mb-1">Trigonometric Foundations</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            On a unit circle (radius = 1), the <b>x-coordinate</b> is the cosine of the angle and the <b>y-coordinate</b> is the sine. The tangent is the slope of the radius vector.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function TrigStat({ label, value, color }: any) {
    return (
        <div className="bg-background p-6 rounded-3xl border border-primary/5 flex flex-col items-center gap-1 shadow-sm">
            <span className="text-[8px] font-black uppercase text-primary/40">{label}</span>
            <span className={`text-4xl font-black ${color}`}>{value}</span>
        </div>
    );
}
