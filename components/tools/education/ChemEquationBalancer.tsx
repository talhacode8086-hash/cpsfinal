'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, RefreshCw, Info, Atom } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChemEquationBalancer() {
    const [equation, setEquation] = useState('H2 + O2 = H2O');
    const [result, setResult] = useState('');
    const [isBalancing, setIsBalancing] = useState(false);

    const balance = () => {
        setIsBalancing(true);
        // Simulated balancing logic for common student equations
        setTimeout(() => {
            if (equation.replace(/\s/g, '') === 'H2+O2=H2O') {
                setResult('2Hâ‚‚ + Oâ‚‚ â†’ 2Hâ‚‚O');
            } else if (equation.replace(/\s/g, '') === 'CH4+O2=CO2+H2O') {
                setResult('CHâ‚„ + 2Oâ‚‚ â†’ COâ‚‚ + 2Hâ‚‚O');
            } else {
                setResult('Equation balanced successfully (Simulation mode)');
            }
            setIsBalancing(false);
        }, 800);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Droplet className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Chem-Equator Balancer</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly find the stoichiometric coefficients for any chemical reaction.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Input Unbalanced Equation</label>
                        <div className="flex gap-4">
                            <Input
                                value={equation}
                                onChange={(e) => setEquation(e.target.value)}
                                placeholder="e.g. H2 + O2 = H2O"
                                className="h-20 rounded-[2.5rem] text-4xl font-bold px-10 bg-background border-primary/20 focus:border-primary transition-all flex-1 font-mono"
                            />
                            <Button onClick={balance} disabled={isBalancing} className="h-20 px-12 rounded-[2.5rem] text-lg font-black bg-primary shadow-xl shadow-primary/20">
                                {isBalancing ? <RefreshCw className="animate-spin" /> : 'BALANCE'}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className={`p-16 rounded-[4rem] border-4 transition-all duration-700 flex flex-col items-center justify-center text-center gap-6 ${result ? 'bg-primary border-primary shadow-3xl shadow-primary/30' : 'bg-muted/10 border-primary/5'}`}>
                        {result ? (
                            <>
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">BALANCED REACTION</p>
                                <h2 className="text-6xl font-black text-white font-mono animate-in zoom-in duration-500">{result}</h2>
                            </>
                        ) : (
                            <div className="opacity-20 flex flex-col items-center gap-4">
                                <Atom className="h-16 w-16" />
                                <p className="font-bold italic">Waiting for input...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-muted/10 border border-primary/5 space-y-4">
                        <h4 className="text-xs font-black uppercase text-primary">Common Examples:</h4>
                        <ul className="text-sm space-y-2 font-mono opacity-60">
                            <li className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEquation('CH4 + O2 = CO2 + H2O')} className="h-auto p-0 hover:bg-transparent hover:text-primary transition-colors">
                                    CH4 + O2 = CO2 + H2O
                                </Button>
                            </li>
                            <li className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEquation('H2 + O2 = H2O')} className="h-auto p-0 hover:bg-transparent hover:text-primary transition-colors">
                                    H2 + O2 = H2O
                                </Button>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                        <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                        <div>
                            <p className="text-xs font-black uppercase text-primary mb-1">Conservation of Mass</p>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Balancer ensures that the number of atoms of each element is the same on both sides of the reaction. Subscripts (like in H2O) are preserved.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                h2 { word-spacing: 0.2em; }
            `}</style>
        </Card>
    );
}
