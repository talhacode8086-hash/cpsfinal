'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Code } from 'lucide-react';
import { toast } from 'sonner';

export default function HTMLEntityConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encode = () => {
        const result = input.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`);
        setOutput(result);
        toast.success('Encoded to entities');
    };

    const decode = () => {
        const result = input.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
        setOutput(result);
        toast.success('Decoded from entities');
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success('Copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">HTML Entity Encoder</CardTitle>
                <p className="text-muted-foreground mt-2">Safely encode or decode characters for HTML usage.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Enter text or HTML code here..."
                    className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <div className="flex gap-4">
                    <Button onClick={encode} className="flex-1 h-12 rounded-xl font-bold">Encode Entities</Button>
                    <Button onClick={decode} variant="outline" className="flex-1 h-12 rounded-xl font-bold">Decode Entities</Button>
                </div>

                <div className="relative group">
                    <Textarea
                        readOnly
                        placeholder="Result will appear here..."
                        className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono"
                        value={output}
                    />
                    <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleCopy} disabled={!output}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
