'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function WordFrequency() {
    const [text, setText] = useState('');

    const getFrequency = () => {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 0);

        const freq: Record<string, number> = {};
        words.forEach(w => {
            freq[w] = (freq[w] || 0) + 1;
        });

        return Object.entries(freq).sort((a, b) => b[1] - a[1]);
    };

    const freqData = getFrequency();

    const handleCopy = () => {
        const content = freqData.map(([word, count]) => `${word}: ${count}`).join('\n');
        navigator.clipboard.writeText(content);
        toast.success('Frequency report copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Word Frequency Counter</CardTitle>
                <p className="text-muted-foreground mt-2">Analyze your text and identify most used words.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your text here..."
                    className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            Analysis Result <span className="text-sm font-normal text-muted-foreground">({freqData.length} unique words)</span>
                        </h3>
                        <Button variant="outline" size="sm" onClick={handleCopy} disabled={freqData.length === 0}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Report
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-4 rounded-2xl bg-muted/30 border border-primary/5">
                        {freqData.length > 0 ? freqData.map(([word, count]) => (
                            <div key={word} className="flex justify-between items-center p-3 rounded-xl bg-background border border-primary/5 shadow-sm">
                                <span className="font-medium truncate mr-2" title={word}>{word}</span>
                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-lg">{count}</span>
                            </div>
                        )) : (
                            <div className="col-span-full py-12 text-center text-muted-foreground italic">
                                No statistics yet. Type something!
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
