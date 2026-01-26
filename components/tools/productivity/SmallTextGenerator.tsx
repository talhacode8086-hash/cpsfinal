'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Type } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const CAPS_MAP: Record<string, string> = {
    'a': 'á´€', 'b': 'Ê™', 'c': 'á´„', 'd': 'á´…', 'e': 'á´‡', 'f': 'Ò“', 'g': 'É¢', 'h': 'Êœ', 'i': 'Éª', 'j': 'á´Š', 'k': 'á´‹', 'l': 'ÊŸ', 'm': 'á´ ', 'n': 'É´', 'o': 'á´ ', 'p': 'á´˜', 'q': 'êœ±', 'r': 'Ê€', 's': 'êœ±', 't': 'á´›', 'u': 'á´ ', 'v': 'á´ ', 'w': 'á´¡', 'x': 'x', 'y': 'Ê', 'z': 'á´¢'
};

const SUPER_MAP: Record<string, string> = {
    'a': 'áµ ', 'b': 'áµ‡', 'c': 'áµ ', 'd': 'áµˆ', 'e': 'áµ‰', 'f': 'áµ‹', 'g': 'áµ ', 'h': 'Ê°', 'i': 'áµ ', 'j': 'áµ ', 'k': 'áµ ', 'l': 'Ê¡', 'm': 'áµ ', 'n': 'â ¿', 'o': 'áµ’', 'p': 'áµ–', 'r': 'Ê³', 's': 'Ë¢', 't': 'áµ—', 'u': 'áµ˜', 'v': 'áµ ', 'w': 'Ê·', 'x': 'Ê', 'y': 'Ê¸', 'z': 'á¶»'
};

const SUB_MAP: Record<string, string> = {
    'a': 'â‚ ', 'e': 'â‚‘', 'h': 'â‚•', 'i': 'áµ¢', 'j': 'â‚ⱼ', 'k': 'â‚–', 'l': 'â‚—', 'm': 'â‚˜', 'n': 'â‚™', 'o': 'â‚’', 'p': 'â‚š', 'r': 'â‚›', 's': 'â‚œ', 't': 'â‚ ', 'u': 'â‚ ', 'v': 'â‚ž', 'x': 'â‚ ', '1': 'â‚ ', '2': 'â‚‚', '3': 'â‚ƒ', '4': 'â‚„', '5': 'â‚…', '6': 'â‚†', '7': 'â‚‡', '8': 'â‚ˆ', '9': 'â‚‰', '0': 'â‚€'
};

export default function SmallTextGenerator() {
    const [text, setText] = useState('');

    const convert = (map: Record<string, string>) => {
        return text.split('').map(char => map[char.toLowerCase()] || char).join('');
    };

    const tinyCaps = useMemo(() => convert(CAPS_MAP), [text]);
    const superScript = useMemo(() => convert(SUPER_MAP), [text]);
    const subScript = useMemo(() => convert(SUB_MAP), [text]);

    const copy = (val: string) => {
        if (!val) return;
        navigator.clipboard.writeText(val);
        toast.success('Copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Type className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Small Text Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Make your text tiny or scientific with Unicode.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <Textarea
                    placeholder="Enter normal text here..."
                    className="min-h-[120px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="grid gap-6">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-4">
                        <div className="flex justify-between items-center pr-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-primary">Tiny Caps</Label>
                            <Button variant="ghost" size="sm" onClick={() => copy(tinyCaps)}>Copy</Button>
                        </div>
                        <p className="text-2xl font-bold break-all">{tinyCaps || 'á´›ÉªÉ´Ê á´„á´€á´˜á´ '}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-4">
                        <div className="flex justify-between items-center pr-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-primary">Superscript</Label>
                            <Button variant="ghost" size="sm" onClick={() => copy(superScript)}>Copy</Button>
                        </div>
                        <p className="text-2xl font-bold break-all">{superScript || 'Ë¢áµ˜áµ–áµ‰Ê³Ë¢áµ–Ë³áµ¦áµ‰Ê¸áµ—'}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-4">
                        <div className="flex justify-between items-center pr-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-primary">Subscript</Label>
                            <Button variant="ghost" size="sm" onClick={() => copy(subScript)}>Copy</Button>
                        </div>
                        <p className="text-2xl font-bold break-all">{subScript || 'â‚›â‚¦â‚•â‚›â‚‘â‚™â‚²â‚—'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
