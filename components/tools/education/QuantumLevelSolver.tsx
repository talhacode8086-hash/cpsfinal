"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, ChevronRight, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QuantumLevelSolver() {
    const [length, setLength] = useState<number>(1); // In nanometers
    const [massType, setMassType] = useState<'electron' | 'proton' | 'custom'>('electron');
    const [customMass, setCustomMass] = useState<string>('9.109e-31');
    const [n, setN] = useState<number>(1);

    // Constants
    const h = 6.62607015e-34; // Planck's constant (J·s)
    const hbar = h / (2 * Math.PI);
    const m_e = 9.10938356e-31; // Electron mass (kg)
    const m_p = 1.6726219e-27; // Proton mass (kg)
    const eV = 1.602176634e-19; // 1 eV in Joules

    const mass = useMemo(() => {
        if (massType === 'electron') return m_e;
        if (massType === 'proton') return m_p;
        const val = parseFloat(customMass);
        return isNaN(val) ? m_e : val;
    }, [massType, customMass]);

    // Energy calculation E_n = (n^2 * h^2) / (8 * m * L^2)
    const calculateEnergy = (level: number) => {
        const L = length * 1e-9; // Convert nm to m
        const energyJ = (Math.pow(level, 2) * Math.pow(h, 2)) / (8 * mass * Math.pow(L, 2));
        return energyJ / eV; // Return in eV
    };

    const currentEnergy = calculateEnergy(n);
    const levels = [1, 2, 3, 4, 5].map(lvl => ({ n: lvl, E: calculateEnergy(lvl) }));

    const generateWaveFunction = () => {
        const points = 100;
        const data = [];
        for (let i = 0; i <= points; i++) {
            const x = (i / points) * length;
            // psi_n(x) = sqrt(2/L) * sin(n*pi*x/L)
            const psi = Math.sqrt(2 / length) * Math.sin((n * Math.PI * x) / length);
            data.push({ x, psi, prob: psi * psi });
        }
        return data;
    };

    const plotData = useMemo(() => generateWaveFunction(), [n, length]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Atom className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Quantum Level Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Particle in a 1D Infinite Square Well.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Well Width (L) in nm</label>
                            <div className="flex gap-4 items-center">
                                <Slider
                                    value={[length]}
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    onValueChange={([val]) => setLength(val)}
                                    className="flex-1"
                                />
                                <span className="font-mono text-xl w-16 text-right">{length}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Quantum Number (n)</label>
                            <div className="flex gap-4 items-center">
                                <Slider
                                    value={[n]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={([val]) => setN(val)}
                                    className="flex-1"
                                />
                                <span className="font-mono text-xl w-16 text-right">{n}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Particle Mass</label>
                            <div className="flex gap-2">
                                <Button
                                    variant={massType === 'electron' ? 'default' : 'outline'}
                                    onClick={() => setMassType('electron')}
                                    className="flex-1"
                                >
                                    Electron
                                </Button>
                                <Button
                                    variant={massType === 'proton' ? 'default' : 'outline'}
                                    onClick={() => setMassType('proton')}
                                    className="flex-1"
                                >
                                    Proton
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/10 rounded-3xl p-6 border border-primary/5 flex flex-col justify-center text-center">
                        <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-2">Energy (E_{n})</h3>
                        <div className="text-4xl font-bold font-mono text-foreground mb-2">
                            {currentEnergy.toExponential(4)} <span className="text-xl">eV</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {(currentEnergy * eV).toExponential(4)} Joules
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Wave Function & Probability</h3>
                    <div className="h-64 relative bg-card rounded-2xl border border-primary/5 overflow-hidden p-4">
                        <svg className="w-full h-full" viewBox={`0 -1.5 ${length} 3`}>
                            {/* Axis */}
                            <line x1="0" y1="0" x2={length} y2="0" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.05" />

                            {/* Wavefunction Psi */}
                            <polyline
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="0.08"
                                points={plotData.map(d => `${d.x},${-d.psi}`).join(' ')}
                                className="opacity-80"
                            />

                            {/* Probability |Psi|^2 */}
                            <polyline
                                fill="hsl(var(--primary) / 0.1)"
                                stroke="hsl(var(--primary))"
                                strokeWidth="0.04"
                                strokeDasharray="0.1 0.1"
                                points={plotData.map(d => `${d.x},${-d.prob}`).join(' ')}
                            />
                        </svg>
                        <div className="absolute bottom-2 left-4 flex gap-4 text-[10px] font-bold uppercase tracking-tight">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-1 bg-primary"></span> Wave Function (ψ)
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-1 border-t border-dashed border-primary"></span> Probability Density (|ψ|²)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Energy Levels</h3>
                        <div className="space-y-2">
                            {levels.map(lvl => (
                                <div key={lvl.n} className={`flex justify-between p-3 rounded-xl border ${lvl.n === n ? 'bg-primary/10 border-primary/30' : 'bg-card border-border/50'}`}>
                                    <span className="font-bold">n = {lvl.n}</span>
                                    <span className="font-mono text-xs">{lvl.E.toExponential(3)} eV</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                        <h4 className="flex items-center gap-2 font-bold mb-4 text-primary">
                            <Info className="w-4 h-4" /> Formulas Used
                        </h4>
                        <div className="space-y-4 font-mono text-xs">
                            <div className="p-3 bg-card rounded-lg border border-border">
                                E_n = (n²h²) / (8mL²)
                            </div>
                            <div className="p-3 bg-card rounded-lg border border-border">
                                ψ_n(x) = √(2/L) sin(nπx/L)
                            </div>
                            <div className="text-[10px] text-muted-foreground leading-relaxed">
                                Where L is well width, m is particle mass, n is quantum number, and h is Planck's constant.
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
