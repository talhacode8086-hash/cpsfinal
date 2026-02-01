"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit, ChevronRight, Info, Globe, Rocket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function OrbitSimulator() {
    const [mass_log, setMassLog] = useState<number>(24); // log10 of mass
    const [radius_log, setRadiusLog] = useState<number>(6.37); // log10 of radius in m
    const [altitude, setAltitude] = useState<number>(400); // km

    // G constant
    const G = 6.67430e-11;

    const planetData = useMemo(() => {
        const M = Math.pow(10, mass_log);
        const R = Math.pow(10, radius_log);
        const alt_m = altitude * 1000;
        const total_R = R + alt_m;

        // v = sqrt(GM / r)
        const v_orbital = Math.sqrt((G * M) / total_R);
        // v_esc = sqrt(2GM / R)
        const v_escape = Math.sqrt((2 * G * M) / R);
        // T = 2pi * sqrt(r^3 / GM)
        const period = 2 * Math.PI * Math.sqrt(Math.pow(total_R, 3) / (G * M));

        return {
            v_orbital,
            v_escape,
            period: period / 60, // in minutes
            M,
            R,
            g: (G * M) / (R * R)
        };
    }, [mass_log, radius_log, altitude]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Orbit className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Astrophysics Orbit Simulator</CardTitle>
                <p className="text-muted-foreground mt-2">Orbital Mechanics & Escape Velocity.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Planet Mass (10^x kg)</label>
                                <span className="font-mono text-primary font-bold">10^{mass_log.toFixed(2)}</span>
                            </div>
                            <Slider value={[mass_log]} min={20} max={30} step={0.01} onValueChange={([val]) => setMassLog(val)} />
                            <div className="flex gap-2 text-[10px]">
                                <Button size="sm" variant="outline" className="h-6" onClick={() => { setMassLog(24.77); setRadiusLog(6.37); }}>Earth</Button>
                                <Button size="sm" variant="outline" className="h-6" onClick={() => { setMassLog(23.8); setRadiusLog(6.02); }}>Mars</Button>
                                <Button size="sm" variant="outline" className="h-6" onClick={() => { setMassLog(27.27); setRadiusLog(7.84); }}>Jupiter</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Planet Radius (log10 m)</label>
                                <span className="font-mono text-primary font-bold">{planetData.R.toExponential(2)} m</span>
                            </div>
                            <Slider value={[radius_log]} min={5} max={8} step={0.01} onValueChange={([val]) => setRadiusLog(val)} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Orbit Altitude (km)</label>
                                <span className="font-mono text-primary font-bold">{altitude} km</span>
                            </div>
                            <Slider value={[altitude]} min={100} max={5000} step={10} onValueChange={([val]) => setAltitude(val)} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-secondary/20 rounded-2xl border border-primary/10 text-center">
                                <div className="text-[10px] font-black text-muted-foreground uppercase mb-1">Orbital Speed</div>
                                <div className="text-xl font-bold font-mono">{(planetData.v_orbital / 1000).toFixed(2)} <span className="text-xs">km/s</span></div>
                            </div>
                            <div className="p-4 bg-secondary/20 rounded-2xl border border-primary/10 text-center">
                                <div className="text-[10px] font-black text-muted-foreground uppercase mb-1">Escape Speed</div>
                                <div className="text-xl font-bold font-mono">{(planetData.v_escape / 1000).toFixed(2)} <span className="text-xs">km/s</span></div>
                            </div>
                            <div className="p-4 bg-secondary/20 rounded-2xl border border-primary/10 text-center col-span-2">
                                <div className="text-[10px] font-black text-muted-foreground uppercase mb-1">Orbital Period</div>
                                <div className="text-xl font-bold font-mono">{planetData.period.toFixed(1)} <span className="text-xs">Minutes</span></div>
                            </div>
                        </div>

                        <div className="p-6 bg-card border border-primary/5 rounded-3xl space-y-4">
                            <h4 className="text-xs font-black uppercase text-muted-foreground">Surface Gravity</h4>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-2xl font-black font-mono">{planetData.g.toFixed(2)} m/s²</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-48 bg-card rounded-3xl border border-primary/5 overflow-hidden flex items-center justify-center">
                    <div className="absolute w-24 h-24 bg-primary/20 rounded-full shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] animate-pulse" />
                    <div className="absolute w-40 h-40 border border-primary/20 rounded-full border-dashed animate-spin-slow" />
                    <Rocket className="absolute w-6 h-6 text-primary" style={{ transform: 'translate(80px, 0) rotate(90deg)' }} />
                    <div className="absolute bottom-4 left-0 w-full text-center text-[10px] uppercase font-black text-muted-foreground opacity-50">Visual Scale: Not to Proportion</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h4 className="flex items-center gap-2 font-bold mb-3 text-primary">
                            <Info className="w-4 h-4" /> Physics Insight
                        </h4>
                        <p className="text-muted-foreground italic text-xs">
                            Keeplers Third Law: The square of the orbital period is proportional to the cube of the orbits semi-major axis.
                        </p>
                    </div>
                    <div className="space-y-3 font-mono text-[10px] flex flex-col justify-center">
                        <div className="flex justify-between"><span>Orbital Vel:</span> <span>v = √(GM/r)</span></div>
                        <div className="flex justify-between border-t border-border pt-2"><span>Escape Vel:</span> <span>v_e = √(2GM/R)</span></div>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 5s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Card>
    );
}
