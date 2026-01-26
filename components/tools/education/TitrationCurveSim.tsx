'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TitrationCurveSim() {
    const [volAdded, setVolAdded] = useState([0]); // mL of titrant
    const initialAcidVol = 50; // mL
    const acidConc = 0.1; // M
    const baseConc = 0.1; // M

    const generateCurve = () => {
        const data = [];
        for (let v = 0; v <= 100; v += 1) {
            let ph = 0;
            const molesAcid = (initialAcidVol / 1000) * acidConc;
            const molesBase = (v / 1000) * baseConc;
            const totalVol = (initialAcidVol + v) / 1000;

            if (molesAcid > molesBase) {
                const hPlus = (molesAcid - molesBase) / totalVol;
                ph = -Math.log10(hPlus);
            } else if (molesBase > molesAcid) {
                const ohMinus = (molesBase - molesAcid) / totalVol;
                const poh = -Math.log10(ohMinus);
                ph = 14 - poh;
            } else {
                ph = 7;
            }
            data.push({ v, ph: ph.toFixed(2) });
        }
        return data;
    };

    const data = generateCurve();
    const currentPH = parseFloat(data.find(d => d.v === volAdded[0])?.ph || '0');

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FlaskConical className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Titration Curve Sim</CardTitle>
                <p className="text-muted-foreground mt-2">Visually analyze acid-base neutralization with interactive pH curve plotting.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Lab Equipment Simulation */}
                    <div className="w-full lg:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className="h-96 w-full bg-slate-900 rounded-[3rem] border-4 border-primary/20 relative flex flex-col items-center justify-end p-8 gap-4 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                            {/* Burette */}
                            <div className="absolute top-0 w-4 h-64 bg-slate-800 rounded-b-full border border-white/10 flex flex-col justify-end p-0.5">
                                <div className="w-full bg-blue-400 rounded-b-full transition-all duration-300" style={{ height: `${100 - volAdded[0]}%` }} />
                            </div>

                            {/* Flask */}
                            <div className="relative w-32 h-32 bg-slate-800 border-2 border-white/20 rounded-b-[4rem] flex flex-col justify-end p-1 overflow-hidden">
                                <div
                                    className="w-full bg-pink-500/80 transition-all duration-300"
                                    style={{ height: `${50 + volAdded[0] / 2}%`, filter: `hue-rotate(${currentPH * 20}deg)` }}
                                />
                            </div>
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Reaction Flask</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary/40 tracking-widest px-2">
                                <span>Titrant Added (mL)</span>
                                <span className="text-lg text-primary">{volAdded[0]}mL</span>
                            </div>
                            <Slider value={volAdded} onValueChange={setVolAdded} max={100} step={1} className="py-2" />
                        </div>
                    </div>

                    {/* Plot Panel */}
                    <div className="flex-1 space-y-8 w-full">
                        <div className="h-[400px] w-full bg-muted/10 rounded-[4rem] border border-primary/10 p-10 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.05)" />
                                    <XAxis dataKey="v" stroke="hsl(var(--primary)/20%)" fontSize={10} fontStyle="bold" label={{ value: 'Vol NaOH Added (mL)', position: 'insideBottom', offset: -5, fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                                    <YAxis domain={[0, 14]} stroke="hsl(var(--primary)/20%)" fontSize={10} fontStyle="bold" label={{ value: 'pH Value', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'currentColor', opacity: 0.5 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/0.1)', fontWeight: 'bold' }}
                                        itemStyle={{ color: 'hsl(var(--primary))' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ph"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={4}
                                        dot={false}
                                        animationDuration={500}
                                    />
                                    <ReferenceLine x={volAdded[0]} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                                    <ReferenceLine y={7} stroke="white" strokeDasharray="3 3" strokeOpacity={0.2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-10 rounded-[3rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 text-white flex flex-col items-center justify-center gap-2 group hover:scale-[1.03] transition-all">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">CURRENT PH</p>
                                <h3 className="text-6xl font-black">{currentPH.toFixed(2)}</h3>
                                <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase ${currentPH < 6.5 ? 'bg-red-500/20' : currentPH > 7.5 ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                                    {currentPH < 6.5 ? 'Acidic' : currentPH > 7.5 ? 'Basic' : 'Neutral'}
                                </div>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-background border-4 border-primary/5 flex flex-col items-center justify-center gap-2">
                                <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">EQUIVALENCE POINT</p>
                                <h3 className="text-5xl font-black text-primary">50.0<span className="text-sm ml-1 opacity-40">mL</span></h3>
                                <span className="text-[8px] font-black opacity-40 uppercase">At pH 7.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-primary/5 border border-primary/10 flex items-start gap-6">
                    <Zap className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                        <h4 className="font-black text-primary uppercase text-[10px] tracking-widest mb-1">Qualitative Analysis</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                            This simulation models the titration of a <b>Strong Acid</b> (0.1M HCl) with a <b>Strong Base</b> (0.1M NaOH). Notice the sharp rise in pH as the system approaches the stoichiometric equivalence point at 50mL.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
