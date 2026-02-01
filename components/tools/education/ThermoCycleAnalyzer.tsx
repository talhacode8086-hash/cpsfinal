"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, ChevronRight, Info, RefreshCw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function ThermoCycleAnalyzer() {
    const [tHigh, setTHigh] = useState<number>(600); // Kelvin
    const [tLow, setTLow] = useState<number>(300); // Kelvin
    const [cycleType, setCycleType] = useState<'carnot' | 'rankine'>('carnot');

    const efficiency = useMemo(() => {
        if (cycleType === 'carnot') {
            return 1 - (tLow / tHigh);
        } else {
            // Rankine is complex, using an idealized approximation for scholar level
            // Simplified Rankine depends on pressures, but we'll show a "Real-world vs Carnot" offset
            return (1 - (tLow / tHigh)) * 0.75;
        }
    }, [tHigh, tLow, cycleType]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Thermometer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Thermodynamic Cycle Analyzer</CardTitle>
                <p className="text-muted-foreground mt-2">Efficiency Analysis of Heat Engines.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center gap-4">
                    <Button
                        variant={cycleType === 'carnot' ? 'default' : 'outline'}
                        onClick={() => setCycleType('carnot')}
                        className="rounded-full px-8"
                    >
                        Carnot Cycle
                    </Button>
                    <Button
                        variant={cycleType === 'rankine' ? 'default' : 'outline'}
                        onClick={() => setCycleType('rankine')}
                        className="rounded-full px-8"
                    >
                        Ideal Rankine (Est.)
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Hot Reservoir (T_H)</label>
                                <span className="font-mono text-primary font-bold">{tHigh} K</span>
                            </div>
                            <Slider
                                value={[tHigh]}
                                min={tLow + 50}
                                max={2000}
                                step={10}
                                onValueChange={([val]) => setTHigh(val)}
                            />
                            <p className="text-[10px] text-muted-foreground">{(tHigh - 273.15).toFixed(1)}°C</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Cold Reservoir (T_C)</label>
                                <span className="font-mono text-primary font-bold">{tLow} K</span>
                            </div>
                            <Slider
                                value={[tLow]}
                                min={100}
                                max={tHigh - 50}
                                step={10}
                                onValueChange={([val]) => setTLow(val)}
                            />
                            <p className="text-[10px] text-muted-foreground">{(tLow - 273.15).toFixed(1)}°C</p>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center py-12">
                        <div className="w-48 h-48 rounded-full border-8 border-primary/10 flex flex-col items-center justify-center relative overflow-hidden">
                            <div
                                className="absolute bottom-0 left-0 w-full bg-primary/20 transition-all duration-500"
                                style={{ height: `${efficiency * 100}%` }}
                            />
                            <span className="text-sm font-black text-muted-foreground uppercase tracking-tight z-10">Efficiency</span>
                            <span className="text-5xl font-black text-primary z-10 font-mono">{(efficiency * 100).toFixed(1)}%</span>
                        </div>

                        <div className="absolute -top-4 right-0 bg-card border border-primary/10 p-4 rounded-2xl shadow-lg animate-bounce">
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Max Work Output</div>
                            <div className="font-mono font-bold">W = Q_H × {efficiency.toFixed(3)}</div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-secondary/20 border border-primary/5 space-y-6">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-4 h-4" /> Cycle Parameters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-card rounded-2xl border border-border text-center">
                            <div className="text-xs text-muted-foreground uppercase mb-1">Carnot Limit</div>
                            <div className="font-mono font-bold text-xl">{(1 - (tLow / tHigh)).toFixed(3)}</div>
                        </div>
                        <div className="p-4 bg-card rounded-2xl border border-border text-center">
                            <div className="text-xs text-muted-foreground uppercase mb-1">Temperature Ratio</div>
                            <div className="font-mono font-bold text-xl">{(tLow / tHigh).toFixed(3)}</div>
                        </div>
                        <div className="p-4 bg-card rounded-2xl border border-border text-center">
                            <div className="text-xs text-muted-foreground uppercase mb-1">Delta T</div>
                            <div className="font-mono font-bold text-xl">{tHigh - tLow} K</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Understanding the Cycle</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {cycleType === 'carnot'
                                ? "The Carnot cycle is a theoretical ideal heat engine that operates at the maximum possible efficiency. It consists of two isothermal and two adiabatic processes."
                                : "The Rankine cycle is the fundamental cycle for steam power plants. It is less efficient than Carnot because heat addition occurs at varying temperatures."}
                        </p>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                            <RefreshCw className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Second Law of Thermodynamics</div>
                            <p className="text-xs text-muted-foreground italic">No engine can be 100% efficient as long as T_C &gt; 0.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
