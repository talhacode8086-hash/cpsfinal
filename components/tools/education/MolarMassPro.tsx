'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Calculator, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ATOMIC_WEIGHTS: Record<string, number> = {
    'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180,
    'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078,
    'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38,
    'Ga': 69.723, 'Ge': 72.63, 'As': 74.922, 'Se': 78.971, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
    'Ag': 107.87, 'Sn': 118.71, 'I': 126.90, 'Ba': 137.33, 'Au': 196.97, 'Hg': 200.59, 'Pb': 207.2, 'U': 238.03
};

export default function MolarMassPro() {
    const [formula, setFormula] = useState('CuSO4*5H2O');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const parseFormula = (f: string): number => {
        // Handle hydrates (e.g., CuSO4*5H2O)
        if (f.includes('*')) {
            const parts = f.split('*');
            let total = parseFormula(parts[0]);
            const hydrateMatch = parts[1].match(/^(\d*)(.*)$/);
            if (hydrateMatch) {
                const count = parseInt(hydrateMatch[1]) || 1;
                total += count * parseFormula(hydrateMatch[2]);
            }
            return total;
        }

        let i = 0;
        const parseSubformula = (): number => {
            let mass = 0;
            while (i < f.length && f[i] !== ')') {
                if (f[i] === '(') {
                    i++;
                    const submass = parseSubformula();
                    i++; // skip ')'
                    let countStr = '';
                    while (i < f.length && /\d/.test(f[i])) {
                        countStr += f[i];
                        i++;
                    }
                    mass += submass * (parseInt(countStr) || 1);
                } else if (/[A-Z]/.test(f[i])) {
                    let symbol = f[i];
                    i++;
                    while (i < f.length && /[a-z]/.test(f[i])) {
                        symbol += f[i];
                        i++;
                    }
                    let countStr = '';
                    while (i < f.length && /\d/.test(f[i])) {
                        countStr += f[i];
                        i++;
                    }
                    const weight = ATOMIC_WEIGHTS[symbol];
                    if (weight === undefined) throw new Error(`Unknown element: ${symbol}`);
                    mass += weight * (parseInt(countStr) || 1);
                } else {
                    i++;
                }
            }
            return mass;
        };

        return parseSubformula();
    };

    const calculate = () => {
        setError('');
        try {
            const mass = parseFormula(formula);
            setResult({ mass: mass.toFixed(4) });
        } catch (e: any) {
            setError(e.message);
            setResult(null);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Beaker className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold text-scholar">Molar Mass Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Professional stoichiometry tool for parsing complex molecular structures.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Input
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            placeholder="e.g. (NH4)2SO4"
                            className="h-20 rounded-[2rem] text-4xl font-black px-10 bg-background border-primary/20 focus:border-primary transition-all font-mono"
                        />
                        {error && <p className="absolute -bottom-6 left-6 text-destructive text-xs font-bold">{error}</p>}
                    </div>
                    <Button onClick={calculate} className="h-20 px-12 rounded-[2rem] text-lg font-black shadow-xl shadow-primary/20">
                        ANALYZE
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className={`p-16 rounded-[4rem] border-4 transition-all duration-500 flex flex-col items-center justify-center text-center gap-4 ${result ? 'bg-primary border-primary shadow-3xl shadow-primary/30' : 'bg-muted/10 border-primary/5'}`}>
                            {result ? (
                                <>
                                    <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">MOLAR MASS</p>
                                    <h2 className="text-7xl font-black text-white">{result.mass}<span className="text-2xl ml-2 opacity-50">g/mol</span></h2>
                                </>
                            ) : (
                                <div className="opacity-20 flex flex-col items-center gap-4">
                                    <Calculator className="h-16 w-16" />
                                    <p className="font-bold italic">Enter Formula</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 p-8 rounded-[3rem] bg-muted/10 border border-primary/5">
                        <h4 className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">Parsing Engine Specs</h4>
                        <div className="space-y-4">
                            <FeatureItem label="Complex Nesting" value="(NH4)2" />
                            <FeatureItem label="Hydrates Supported" value="CuSO4*5H2O" />
                            <FeatureItem label="Atomic Accuracy" value="4 Decimals" />
                        </div>
                        <div className="pt-6 border-t border-primary/5">
                            <p className="text-[10px] font-black uppercase text-primary/40 mb-3 pl-2">Tutorial Examples</p>
                            <div className="flex flex-wrap gap-2">
                                {['H2O', 'NaCl', 'C6H12O6', '(NH4)2SO4', 'Fe2(SO4)3'].map(ex => (
                                    <button
                                        key={ex}
                                        onClick={() => { setFormula(ex); setTimeout(calculate, 0); }}
                                        className="px-3 py-1 rounded-full bg-background border border-primary/10 text-[10px] font-bold hover:border-primary transition-colors"
                                    >
                                        {ex}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-black text-primary mb-1 uppercase">A NOTE ON ATOMIC WEIGHTS:</p>
                        Mass values are based on the latest IUPAC standard atomic weights. For isotopic mass calculations, please refer to our physical chemistry module.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function FeatureItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center p-4 rounded-2xl bg-background border border-primary/5">
            <span className="text-[10px] font-black uppercase text-primary/40">{label}</span>
            <code className="text-sm font-black text-primary">{value}</code>
        </div>
    );
}
