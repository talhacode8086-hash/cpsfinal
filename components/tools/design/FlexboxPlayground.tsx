'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FlexboxPlayground() {
    const [direction, setDirection] = useState('row');
    const [justify, setJustify] = useState('center');
    const [align, setAlign] = useState('center');
    const [gap, setGap] = useState('16');
    const [itemsCount, setItemsCount] = useState(3);

    const [copied, setCopied] = useState(false);

    const cssCode = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\ngap: ${gap}px;`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Flexbox Playground</CardTitle>
                <p className="text-muted-foreground mt-2">Master flexible layouts with our interactive visual generator.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row min-h-[500px]">
                {/* Controls */}
                <div className="w-full lg:w-80 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-6">
                    <PlayControl label="Flex Direction" value={direction} onChange={setDirection} options={['row', 'row-reverse', 'column', 'column-reverse']} />
                    <PlayControl label="Justify Content" value={justify} onChange={setJustify} options={['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']} />
                    <PlayControl label="Align Items" value={align} onChange={setAlign} options={['flex-start', 'center', 'flex-end', 'stretch', 'baseline']} />

                    <div className="space-y-4 pt-4 border-t border-primary/5">
                        <LabelInput label="Gap (px)" value={gap} onChange={setGap} />
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary">
                            <span>Items</span>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => setItemsCount(Math.max(1, itemsCount - 1))}>-</Button>
                                <span className="text-lg w-4 text-center">{itemsCount}</span>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => setItemsCount(Math.min(10, itemsCount + 1))}>+</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex-1 flex flex-col bg-background">
                    <div
                        className="flex-1 p-8 min-h-[400px]"
                        style={{
                            display: 'flex',
                            flexDirection: direction as any,
                            justifyContent: justify as any,
                            alignItems: align as any,
                            gap: `${gap}px`
                        }}
                    >
                        {Array.from({ length: itemsCount }).map((_, i) => (
                            <div key={i} className="min-w-[80px] min-h-[80px] p-6 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-center font-black animate-in zoom-in duration-300">
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    <div className="p-8 border-t border-primary/5 space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-primary opacity-50">
                            <span>CSS Output</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY CODE'}
                            </button>
                        </div>
                        <pre className="p-6 rounded-2xl bg-muted/20 font-mono text-sm text-primary">
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function PlayControl({ label, value, onChange, options }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-primary">{label}</label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-10 rounded-xl bg-background border-primary/10">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt: string) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    );
}

function LabelInput({ label, value, onChange }: any) {
    return (
        <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary">
            <span>{label}</span>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-16 h-8 bg-background border border-primary/10 rounded-lg text-center font-bold"
            />
        </div>
    );
}
