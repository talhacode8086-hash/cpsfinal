'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, ArrowRightCircle, Binary } from 'lucide-react';
import { toast } from 'sonner';

export default function TextBinaryConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const textToBinary = () => {
        if (!input) return;
        const result = input.split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
        setOutput(result);
        toast.success('Converted to Binary');
    };

    const binaryToText = () => {
        if (!input) return;
        try {
            const result = input.split(/\s+/)
                .filter(b => b.trim() !== '')
                .map(bin => String.fromCharCode(parseInt(bin, 2)))
                .join('');
            setOutput(result);
            toast.success('Converted to Text');
        } catch (e) {
            toast.error('Invalid binary format');
        }
    };

    const swapContent = () => {
        if (!output) return;
        setInput(output);
        setOutput('');
        toast.success('Swapped Input/Output');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Binary className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text to Binary</CardTitle>
                <p className="text-muted-foreground mt-2">Translate text to binary code and vice versa.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Textarea
                            placeholder="Type or paste content to convert..."
                            className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="absolute top-4 right-4">
                            <Button variant="outline" size="icon" className="rounded-xl text-destructive hover:bg-destructive/10" onClick={() => setInput('')} title="Clear">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button onClick={textToBinary} className="rounded-xl px-8 h-12 shadow-lg shadow-primary/10">
                            Text <ArrowRightCircle className="mx-2 h-4 w-4" /> Binary
                        </Button>
                        <Button onClick={binaryToText} variant="outline" className="rounded-xl px-8 h-12">
                            Binary <ArrowRightCircle className="mx-2 h-4 w-4" /> Text
                        </Button>
                        <Button onClick={swapContent} variant="ghost" className="rounded-xl px-4 h-12 text-primary">
                            Swap Result to Input
                        </Button>
                    </div>

                    <div className="relative">
                        <Textarea
                            placeholder="Result will appear here..."
                            readOnly
                            className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono"
                            value={output}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl" onClick={handleCopy} disabled={!output} title="Copy Result">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
