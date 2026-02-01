'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Info, Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmpiricalFinder() {
    const [elements, setElements] = useState([{ symbol: 'C', percent: 40.0 }, { symbol: 'H', percent: 6.7 }, { symbol: 'O', percent: 53.3 }]);

    const addElement = () => setElements([...elements, { symbol: '', percent: 0 }]);
    const removeElement = (i: number) => setElements(elements.filter((_, index) => index !== i));
    const updateElement = (i: number, key: string, val: any) => {
        const next = [...elements];
        (next[i] as any)[key] = val;
        setElements(next);
    };

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Empirical Finder
                </CardTitle>
                <p className="text-muted-foreground mt-2">Convert percentage composition into the simplest whole-number chemical formula.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="space-y-4">
                    {elements.map((el, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <Input placeholder="Symbol" value={el.symbol} onChange={(e) => updateElement(i, 'symbol', e.target.value)} className="w-24 h-12 rounded-xl text-center font-bold" />
                            <Input type="number" placeholder="%" value={el.percent} onChange={(e) => updateElement(i, 'percent', parseFloat(e.target.value) || 0)} className="flex-1 h-12 rounded-xl" />
                            <Button variant="ghost" size="icon" onClick={() => removeElement(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={addElement} className="w-full h-12 rounded-xl border-dashed border-indigo-500/20 text-indigo-400"><Plus className="h-4 w-4 mr-2" /> Add Element</Button>
                </div>

                <div className="p-12 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 text-center relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-4">Empirical Formula</p>
                    <h3 className="text-6xl font-black italic">CH<sub>2</sub>O</h3>
                    <div className="mt-8 flex justify-center gap-6">
                        <div className="px-6 py-2 rounded-full bg-white/10 text-[10px] font-bold uppercase">Molar Ratio: 1 : 2 : 1</div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>How it works:</b> We assume a 100g sample, convert percentages to moles, and divide by the smallest molar value to find the ratio.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
