'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, Atom, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const elements = [
    { num: 1, sym: 'H', name: 'Hydrogen', mass: '1.008', cat: 'nonmetal', col: 1, row: 1 },
    { num: 2, sym: 'He', name: 'Helium', mass: '4.002', cat: 'noble', col: 18, row: 1 },
    { num: 3, sym: 'Li', name: 'Lithium', mass: '6.941', cat: 'alkali', col: 1, row: 2 },
    { num: 4, sym: 'Be', name: 'Beryllium', mass: '9.012', cat: 'alkaline', col: 2, row: 2 },
    { num: 5, sym: 'B', name: 'Boron', mass: '10.81', cat: 'metalloid', col: 13, row: 2 },
    { num: 6, sym: 'C', name: 'Carbon', mass: '12.01', cat: 'nonmetal', col: 14, row: 2 },
    { num: 7, sym: 'N', name: 'Nitrogen', mass: '14.01', cat: 'nonmetal', col: 15, row: 2 },
    { num: 8, sym: 'O', name: 'Oxygen', mass: '16.00', cat: 'nonmetal', col: 16, row: 2 },
    { num: 9, sym: 'F', name: 'Fluorine', mass: '19.00', cat: 'halogen', col: 17, row: 2 },
    { num: 10, sym: 'Ne', name: 'Neon', mass: '20.18', cat: 'noble', col: 18, row: 2 },
    // Simplified for demo, in production we would have all 118
];

export default function PeriodicTablePro() {
    const [selected, setSelected] = useState<any>(elements[0]);
    const [search, setSearch] = useState('');

    const getCatColor = (cat: string) => {
        switch (cat) {
            case 'nonmetal': return 'bg-blue-500/10 border-blue-500/20 text-blue-600';
            case 'noble': return 'bg-purple-500/10 border-purple-500/20 text-purple-600';
            case 'alkali': return 'bg-red-500/10 border-red-500/20 text-red-600';
            case 'alkaline': return 'bg-orange-500/10 border-orange-500/20 text-orange-600';
            case 'metalloid': return 'bg-green-500/10 border-green-500/20 text-green-600';
            case 'halogen': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600';
            default: return 'bg-muted border-primary/10';
        }
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Atom className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Periodic Table Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Deep dive into chemical elements with real-time property analysis.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Element Details */}
                    <div className="w-full lg:w-80 space-y-8 animate-in slide-in-from-left-4">
                        <div className={`p-10 rounded-[3rem] border-4 aspect-square flex flex-col items-center justify-center gap-4 transition-all duration-500 ${getCatColor(selected.cat)}`}>
                            <span className="text-xl font-bold opacity-60 self-start -mt-8 -ml-4">{selected.num}</span>
                            <span className="text-8xl font-black">{selected.sym}</span>
                            <span className="text-xl font-bold">{selected.name}</span>
                        </div>

                        <div className="space-y-4">
                            <DetailRow label="Atomic Mass" value={selected.mass} />
                            <DetailRow label="Category" value={selected.cat.toUpperCase()} />
                            <DetailRow label="Group" value={selected.col} />
                            <DetailRow label="Period" value={selected.row} />
                        </div>
                    </div>

                    {/* Table Grid (Simplified visualization) */}
                    <div className="flex-1 space-y-8">
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                placeholder="Search elements by name or symbol..."
                                className="h-14 rounded-2xl pl-16 border-primary/10 bg-muted/10 font-bold"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-18 gap-2 p-1">
                            {elements.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.sym.toLowerCase().includes(search.toLowerCase())).map((el) => (
                                <button
                                    key={el.num}
                                    onClick={() => setSelected(el)}
                                    style={{ gridColumn: el.col, gridRow: el.row }}
                                    className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 group relative ${selected.num === el.num ? 'ring-4 ring-primary ring-offset-2' : ''} ${getCatColor(el.cat)}`}
                                >
                                    <span className="text-[8px] font-bold opacity-40 absolute top-1 left-1">{el.num}</span>
                                    <span className="text-lg font-black">{el.sym}</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-12 border-t border-primary/5">
                            <LegendChip cat="nonmetal" label="Nonmetals" />
                            <LegendChip cat="noble" label="Noble Gases" />
                            <LegendChip cat="alkali" label="Alkali Metals" />
                            <LegendChip cat="alkaline" label="Alkaline Earth" />
                            <LegendChip cat="metalloid" label="Metalloids" />
                            <LegendChip cat="halogen" label="Halogens" />
                        </div>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                .grid-cols-18 { grid-template-columns: repeat(18, minmax(0, 1fr)); }
            `}</style>
        </Card>
    );
}

function DetailRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/10 border border-primary/5">
            <span className="text-[10px] font-black uppercase text-primary/40">{label}</span>
            <span className="text-lg font-black text-primary">{value}</span>
        </div>
    );
}

function LegendChip({ cat, label }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${cat === 'nonmetal' ? 'bg-blue-500' : cat === 'noble' ? 'bg-purple-500' : cat === 'alkali' ? 'bg-red-500' : cat === 'alkaline' ? 'bg-orange-500' : cat === 'metalloid' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-[10px] font-black uppercase opacity-40">{label}</span>
        </div>
    );
}
