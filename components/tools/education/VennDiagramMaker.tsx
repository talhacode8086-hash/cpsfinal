'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Plus, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VennDiagramMaker() {
    const [setA, setSetA] = useState({ name: 'Mammals', items: ['Whales', 'Humans', 'Dogs'] });
    const [setB, setSetB] = useState({ name: 'Sea Creatures', items: ['Whales', 'Sharks', 'Fish'] });

    const overlap = setA.items.filter(i => setB.items.includes(i));
    const onlyA = setA.items.filter(i => !setB.items.includes(i));
    const onlyB = setB.items.filter(i => !setA.items.includes(i));

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Interactive Venn Diagram</CardTitle>
                <p className="text-muted-foreground mt-2">Visualize logical relationships and overlaps between different sets of data.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SetInput label="Set A Name" value={setA.name} onChange={(v: string) => setSetA({ ...setA, name: v })} items={setA.items} onItemsChange={(v: string[]) => setSetA({ ...setA, items: v })} color="text-blue-500" />
                    <SetInput label="Set B Name" value={setB.name} onChange={(v: string) => setSetB({ ...setB, name: v })} items={setB.items} onItemsChange={(v: string[]) => setSetB({ ...setB, items: v })} color="text-red-500" />
                </div>

                {/* Venn Visualization */}
                <div className="relative h-[400px] w-full flex items-center justify-center bg-muted/5 rounded-[3rem] border border-primary/5 overflow-hidden">
                    {/* Circle A */}
                    <div className="absolute left-1/4 w-72 h-72 rounded-full bg-blue-500/10 border-4 border-blue-500/30 flex flex-col items-center justify-center gap-2 -translate-x-12">
                        <p className="text-[10px] font-black uppercase text-blue-500/60 mb-2">{setA.name}</p>
                        {onlyA.map((it, i) => <span key={i} className="text-xs font-bold text-blue-600">{it}</span>)}
                    </div>

                    {/* Circle B */}
                    <div className="absolute right-1/4 w-72 h-72 rounded-full bg-red-500/10 border-4 border-red-500/30 flex flex-col items-center justify-center gap-2 translate-x-12">
                        <p className="text-[10px] font-black uppercase text-red-500/60 mb-2">{setB.name}</p>
                        {onlyB.map((it, i) => <span key={i} className="text-xs font-bold text-red-600">{it}</span>)}
                    </div>

                    {/* Overlap Info */}
                    <div className="z-10 bg-background/80 backdrop-blur-md p-6 rounded-3xl border border-primary/10 shadow-xl flex flex-col items-center gap-2">
                        <p className="text-[8px] font-black uppercase text-primary/40 tracking-widest">INTERSECTION</p>
                        {overlap.map((it, i) => <span key={i} className="text-sm font-black text-primary animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>{it}</span>)}
                        {overlap.length === 0 && <span className="text-xs font-bold opacity-20">Null Set</span>}
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-3">
                    <h4 className="text-xs font-black uppercase text-primary">Logical Set Theory</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        The intersection (A âˆ© B) represents elements common to both sets. Use this tool to analyze categorical differences in research papers or logic assignments.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function SetInput({ label, value, onChange, items, onItemsChange, color }: any) {
    const [newItem, setNewItem] = useState('');
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">{label}</label>
                <Input value={value} onChange={(e) => onChange(e.target.value)} className={`h-12 rounded-xl font-bold ${color}`} />
            </div>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Input
                        placeholder="Add item..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (onItemsChange([...items, newItem]), setNewItem(''))}
                        className="h-10 rounded-xl bg-muted/10 border-transparent"
                    />
                    <Button onClick={() => { onItemsChange([...items, newItem]); setNewItem(''); }} className="h-10 rounded-xl px-4">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {items.map((it: string, i: number) => (
                        <div key={i} className="px-3 py-1 bg-background border border-primary/5 rounded-full text-[10px] font-bold flex items-center gap-2">
                            {it}
                            <button onClick={() => onItemsChange(items.filter((_: any, idx: any) => idx !== i))} className="text-destructive">Ã—</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
