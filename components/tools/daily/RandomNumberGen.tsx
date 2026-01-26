'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, Play, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RandomNumberGen() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [results, setResults] = useState<number[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const nums: number[] = [];
        for (let i = 0; i < count; i++) {
            nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setResults(nums);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(results.join(', '));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Hash className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Random Number Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Fair, unbiased random results for any requirement.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Min Value</label>
                        <Input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold text-center" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">Max Value</label>
                        <Input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value) || 0)} className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold text-center" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary">How Many?</label>
                        <Input type="number" value={count} onChange={(e) => setCount(Math.min(100, parseInt(e.target.value) || 1))} className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold text-center" />
                    </div>
                </div>

                <div className="min-h-[200px] flex flex-wrap justify-center gap-4 bg-primary/5 p-12 rounded-[3.5rem] border-2 border-dashed border-primary/20">
                    {results.length > 0 ? (
                        results.map((n, i) => (
                            <div key={i} className="h-20 w-20 bg-background border-2 border-primary rounded-3xl flex items-center justify-center text-3xl font-black animate-in fade-in zoom-in duration-300">
                                {n}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center opacity-30 italic text-sm">
                            <Hash className="h-12 w-12 mb-2" />
                            Click Generate to see numbers
                        </div>
                    )}
                </div>

                <div className="flex gap-4 justify-center">
                    <Button
                        size="lg"
                        onClick={generate}
                        className="h-20 px-16 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20"
                    >
                        <Play className="mr-4 h-8 w-8 fill-current" />
                        GENERATE
                    </Button>
                    {results.length > 0 && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={copyToClipboard}
                            className="h-20 w-20 rounded-[2.5rem] border-2 border-primary/10"
                        >
                            {copied ? <Check className="h-8 w-8 text-green-500" /> : <Copy className="h-8 w-8" />}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
