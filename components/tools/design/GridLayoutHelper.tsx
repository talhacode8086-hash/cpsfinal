'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function GridLayoutHelper() {
    const [cols, setCols] = useState(3);
    const [rows, setRows] = useState(3);
    const [colGap, setColGap] = useState(16);
    const [rowGap, setRowGap] = useState(16);

    const [copied, setCopied] = useState(false);

    const cssCode = `display: grid;\ngrid-template-columns: repeat(${cols}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngrid-gap: ${rowGap}px ${colGap}px;`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Grid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">CSS Grid Helper</CardTitle>
                <p className="text-muted-foreground mt-2">Visually design complex grid systems for your next layout.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row">
                {/* Controls */}
                <div className="w-full lg:w-80 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-10">
                    <GridSlider label="Columns" value={cols} max={12} min={1} onChange={setCols} />
                    <GridSlider label="Rows" value={rows} max={12} min={1} onChange={setRows} />
                    <GridSlider label="Column Gap" value={colGap} max={100} min={0} onChange={setColGap} />
                    <GridSlider label="Row Gap" value={rowGap} max={100} min={0} onChange={setRowGap} />
                </div>

                {/* Preview */}
                <div className="flex-1 p-8 space-y-12">
                    <div
                        className="min-h-[400px] bg-muted/10 rounded-3xl border-4 border-dashed border-primary/10"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            gap: `${rowGap}px ${colGap}px`
                        }}
                    >
                        {Array.from({ length: cols * rows }).map((_, i) => (
                            <div key={i} className="bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center font-black text-primary opacity-50 text-xs">
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-primary tracking-widest">
                            <span>Generated Grid CSS</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:opacity-100 transition-all font-black"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY CODE'}
                            </button>
                        </div>
                        <pre className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/10 font-mono text-sm leading-relaxed">
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function GridSlider({ label, value, max, min, onChange }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary">
                <span>{label}</span>
                <span className="text-xl">{value}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={1} />
        </div>
    );
}
