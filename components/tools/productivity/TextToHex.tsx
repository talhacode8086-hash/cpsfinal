'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Braces } from 'lucide-react';
import { toast } from 'sonner';

export default function TextToHex() {
    const [text, setText] = useState('');
    const [hex, setHex] = useState('');

    const convertToHex = () => {
        const result = text.split('')
            .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
            .join(' ')
            .toUpperCase();
        setHex(result);
        if (text) toast.success('Converted to Hex!');
    };

    const convertToString = () => {
        try {
            const result = text.split(/\s+/)
                .filter(h => h.trim())
                .map(h => String.fromCharCode(parseInt(h, 16)))
                .join('');
            setHex(result);
            toast.success('Converted to Text!');
        } catch (e) {
            toast.error('Invalid hex format');
        }
    };

    const handleCopy = () => {
        if (!hex) return;
        navigator.clipboard.writeText(hex);
        toast.success('Copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Braces className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text to Hex Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Translate strings into Hexadecimal values and back.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Enter plain text OR hex code (separated by spaces)..."
                    className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flex gap-4">
                    <Button onClick={convertToHex} className="flex-1 h-12 rounded-xl font-bold">Text ➔ Hex</Button>
                    <Button onClick={convertToString} variant="outline" className="flex-1 h-12 rounded-xl font-bold">Hex ➔ Text</Button>
                </div>

                <div className="relative group">
                    <Textarea
                        readOnly
                        placeholder="hex output will appear here..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono"
                        value={hex}
                    />
                    <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleCopy} disabled={!hex}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
