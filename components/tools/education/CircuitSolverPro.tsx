'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Plus, Trash2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Resistor {
    id: number;
    ohms: string;
}

export default function CircuitSolverPro() {
    const [seriesResistors, setSeriesResistors] = useState<Resistor[]>([{ id: 1, ohms: '10' }, { id: 2, ohms: '20' }]);
    const [parallelResistors, setParallelResistors] = useState<Resistor[]>([{ id: 1, ohms: '10' }, { id: 2, ohms: '20' }]);
    const [voltage, setVoltage] = useState('12');

    const calculateSeries = () => {
        const total = seriesResistors.reduce((sum, r) => sum + (parseFloat(r.ohms) || 0), 0);
        const current = total > 0 ? parseFloat(voltage) / total : 0;
        return { total, current };
    };

    const calculateParallel = () => {
        const invTotal = parallelResistors.reduce((sum, r) => {
            const val = parseFloat(r.ohms) || 0;
            return sum + (val > 0 ? 1 / val : 0);
        }, 0);
        const total = invTotal > 0 ? 1 / invTotal : 0;
        const current = total > 0 ? parseFloat(voltage) / total : 0;
        return { total, current };
    };

    const resSeries = calculateSeries();
    const resParallel = calculateParallel();

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Circuit Solver Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Analyze DC electronics with precision resistance and Ohm's law derivations.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-16">
                <div className="max-w-xl mx-auto space-y-4">
                    <label className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em] block text-center">INPUT SOURCE VOLTAGE (V)</label>
                    <Input
                        type="number"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                        className="h-24 rounded-[3rem] text-6xl font-black text-center border-primary/20 bg-background"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Series Circuit Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                            <h3 className="text-xl font-black text-primary italic uppercase tracking-tighter">Series Network</h3>
                            <Button onClick={() => setSeriesResistors([...seriesResistors, { id: Date.now(), ohms: '10' }])} size="sm" className="h-10 rounded-xl">
                                <Plus className="mr-2 h-4 w-4" /> ADD R
                            </Button>
                        </div>

                        <div className="space-y-4 min-h-[300px]">
                            {seriesResistors.map((r, i) => (
                                <div key={r.id} className="group relative flex items-center gap-6 p-6 bg-background rounded-[2rem] border border-primary/5 shadow-lg">
                                    <div className="h-12 w-12 rounded-2xl bg-muted/20 flex items-center justify-center font-black opacity-30">R{i + 1}</div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-primary/40 mb-1 uppercase">Resistance (Î©)</p>
                                        <Input
                                            type="number"
                                            value={r.ohms}
                                            onChange={(e) => setSeriesResistors(seriesResistors.map(x => x.id === r.id ? { ...x, ohms: e.target.value } : x))}
                                            className="h-10 border-transparent bg-transparent text-2xl font-black p-0 focus:ring-0"
                                        />
                                    </div>
                                    <button onClick={() => setSeriesResistors(seriesResistors.filter(x => x.id !== r.id))} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <ResultPanel total={resSeries.total} current={resSeries.current} color="bg-primary shadow-primary/20" />
                    </div>

                    {/* Parallel Circuit Section */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                            <h3 className="text-xl font-black text-primary italic uppercase tracking-tighter">Parallel Network</h3>
                            <Button onClick={() => setParallelResistors([...parallelResistors, { id: Date.now(), ohms: '20' }])} size="sm" className="h-10 rounded-xl">
                                <Plus className="mr-2 h-4 w-4" /> ADD R
                            </Button>
                        </div>

                        <div className="space-y-4 min-h-[300px]">
                            {parallelResistors.map((r, i) => (
                                <div key={r.id} className="group relative flex items-center gap-6 p-6 bg-background rounded-[2rem] border border-primary/5 shadow-lg">
                                    <div className="h-12 w-12 rounded-2xl bg-muted/20 flex items-center justify-center font-black opacity-30">R{i + 1}</div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-primary/40 mb-1 uppercase">Resistance (Î©)</p>
                                        <Input
                                            type="number"
                                            value={r.ohms}
                                            onChange={(e) => setParallelResistors(parallelResistors.map(x => x.id === r.id ? { ...x, ohms: e.target.value } : x))}
                                            className="h-10 border-transparent bg-transparent text-2xl font-black p-0 focus:ring-0"
                                        />
                                    </div>
                                    <button onClick={() => setParallelResistors(parallelResistors.filter(x => x.id !== r.id))} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <ResultPanel total={resParallel.total} current={resParallel.current} color="bg-indigo-600 shadow-indigo-500/20" />
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-muted/10 border border-primary/5 flex items-start gap-6">
                    <Activity className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-black text-primary mb-1 uppercase tracking-widest">Physics Law: Ohm's Law (V = IR):</p>
                        In series circuits, resistance adds up ($R_{"{tot}"} = R_1 + R_2 + ...$). In parallel, the reciprocal of total resistance is the sum of reciprocals ($1/R_{"{tot}"} = 1/R_1 + 1/R_2 + ...$).
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultPanel({ total, current, color }: any) {
    return (
        <div className={`p-10 rounded-[3rem] text-white space-y-6 shadow-2xl transition-all ${color}`}>
            <div className="flex justify-between items-center bg-white/20 p-6 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Eq. Resistance</p>
                <div className="text-3xl font-black">{total.toFixed(2)}<span className="text-sm ml-1 opacity-50">Î©</span></div>
            </div>
            <div className="flex justify-between items-center bg-white/20 p-6 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Current</p>
                <div className="text-3xl font-black">{current.toFixed(4)}<span className="text-sm ml-1 opacity-50">A</span></div>
            </div>
        </div>
    );
}
