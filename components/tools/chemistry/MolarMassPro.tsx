'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Info, Zap, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Atomic weights (IUPAC 2021/2023)
const ATOMIC_WEIGHTS: Record<string, number> = {
    'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180,
    'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078,
    'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38,
    'Ga': 69.723, 'Ge': 72.63, 'As': 74.922, 'Se': 78.971, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
    'Nb': 92.906, 'Mo': 95.95, 'Tc': 98, 'Ru': 101.07, 'Rh': 102.91, 'Pd': 106.42, 'Ag': 107.87, 'Cd': 112.41, 'In': 114.82, 'Sn': 118.71,
    'Sb': 121.76, 'Te': 127.60, 'I': 126.90, 'Xe': 131.29, 'Cs': 132.91, 'Ba': 137.33, 'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24,
    'Pm': 145, 'Sm': 150.36, 'Eu': 151.96, 'Gd': 157.25, 'Tb': 158.93, 'Dy': 162.50, 'Ho': 164.93, 'Er': 167.26, 'Tm': 168.93, 'Yb': 173.05,
    'Lu': 174.97, 'Hf': 178.49, 'Ta': 180.95, 'W': 183.84, 'Re': 186.21, 'Os': 190.23, 'Ir': 192.22, 'Pt': 195.08, 'Au': 196.97, 'Hg': 200.59,
    'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209, 'At': 210, 'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.04, 'Pa': 231.04,
    'U': 238.03, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247, 'Cf': 251, 'Es': 252, 'Fm': 257, 'Md': 258, 'No': 259, 'Lr': 262,
    'Rf': 267, 'Db': 270, 'Sg': 271, 'Bh': 270, 'Hs': 277, 'Mt': 276, 'Ds': 281, 'Rg': 280, 'Cn': 285, 'Nh': 284, 'Fl': 289, 'Mc': 288,
    'Lv': 293, 'Ts': 294, 'Og': 294
};

export default function MolarMassPro() {
    const [formula, setFormula] = useState('H2SO4');
    const [result, setResult] = useState<{ mass: number, composition: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const parseFormula = (str: string) => {
        try {
            // Handle hydrates like CuSO4*5H2O
            const parts = str.split(/[·*]/);
            let totalCounts: Record<string, number> = {};

            parts.forEach((part, index) => {
                let multiplier = 1;
                let cleanPart = part.trim();

                if (index > 0) {
                    const match = cleanPart.match(/^(\d+)(.*)/);
                    if (match) {
                        multiplier = parseInt(match[1]);
                        cleanPart = match[2];
                    }
                }

                const counts = parseSubFormula(cleanPart);
                for (let symbol in counts) {
                    totalCounts[symbol] = (totalCounts[symbol] || 0) + counts[symbol] * multiplier;
                }
            });

            return totalCounts;
        } catch (e: any) {
            throw new Error(e.message);
        }
    };

    const parseSubFormula = (str: string): Record<string, number> => {
        const counts: Record<string, number> = {};
        const stack: Record<string, number>[] = [{}];

        let i = 0;
        while (i < str.length) {
            const char = str[i];

            if (char === '(' || char === '[' || char === '{') {
                stack.push({});
                i++;
            } else if (char === ')' || char === ']' || char === '}') {
                const top = stack.pop()!;
                i++;
                let numStr = '';
                while (i < str.length && /\d/.test(str[i])) {
                    numStr += str[i];
                    i++;
                }
                const multiplier = numStr === '' ? 1 : parseInt(numStr);
                const current = stack[stack.length - 1];
                for (let symbol in top) {
                    current[symbol] = (current[symbol] || 0) + top[symbol] * multiplier;
                }
            } else if (/[A-Z]/.test(char)) {
                let symbol = char;
                i++;
                if (i < str.length && /[a-z]/.test(str[i])) {
                    symbol += str[i];
                    i++;
                }
                let numStr = '';
                while (i < str.length && /\d/.test(str[i])) {
                    numStr += str[i];
                    i++;
                }
                const count = numStr === '' ? 1 : parseInt(numStr);
                const current = stack[stack.length - 1];
                current[symbol] = (current[symbol] || 0) + count;
            } else if (/\s/.test(char)) {
                i++;
            } else {
                throw new Error(`Invalid character: ${char}`);
            }
        }

        if (stack.length !== 1) throw new Error("Unbalanced parentheses");
        return stack[0];
    };

    const calculate = () => {
        if (!formula.trim()) return;
        try {
            const counts = parseFormula(formula);
            let totalMass = 0;
            const composition = [];

            for (let symbol in counts) {
                const weight = ATOMIC_WEIGHTS[symbol];
                if (!weight) throw new Error(`Unknown element: ${symbol}`);
                const elementTotal = weight * counts[symbol];
                totalMass += elementTotal;
                composition.push({
                    symbol,
                    count: counts[symbol],
                    weight,
                    total: elementTotal
                });
            }

            setResult({
                mass: totalMass,
                composition: composition.map(c => ({
                    ...c,
                    percent: (c.total / totalMass) * 100
                }))
            });
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setResult(null);
        }
    };

    useEffect(() => {
        calculate();
    }, [formula]);

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Molar Mass Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">Precision molecular weight calculator for laboratory use.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="space-y-6">
                    <div className="relative">
                        <Input
                            placeholder="Enter formula (e.g., C6H12O6, Mg(OH)2, CuSO4·5H2O)"
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            className="h-16 text-2xl font-mono text-center rounded-2xl bg-muted/20 border-indigo-500/20 focus:border-indigo-500 focus:ring-indigo-500/20"
                        />
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setFormula('')}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-destructive text-sm font-bold bg-destructive/10 py-2 rounded-xl"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="p-12 rounded-[3.5rem] bg-indigo-500 text-indigo-950 shadow-2xl shadow-indigo-500/20 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Zap className="h-48 w-48" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Molecular Mass</p>
                                <h3 className="text-7xl font-black text-white drop-shadow-sm">
                                    {result.mass.toFixed(4)}
                                    <span className="text-2xl font-bold ml-2 opacity-60">g/mol</span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {result.composition.map((el, i) => (
                                    <motion.div
                                        key={el.symbol}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-6 rounded-3xl bg-muted/20 border border-indigo-500/10 hover:border-indigo-500/30 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                                <span className="text-xl font-bold text-indigo-400">{el.symbol}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-indigo-500 uppercase">Count</p>
                                                <p className="text-xl font-bold">x{el.count}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${el.percent}%` }}
                                                    className="h-full bg-indigo-500"
                                                />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                                                <span>Mass Percent</span>
                                                <span className="text-indigo-400">{el.percent.toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Tip:</b> This tool uses 2023 IUPAC atomic weight standards. For extremely precise analytical work, ensure you account for isotopic variations if applicable.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
