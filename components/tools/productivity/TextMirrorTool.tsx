'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';

const MIRROR_MAP: Record<string, string> = {
    'a': 'É ', 'b': 'd', 'c': 'É”', 'd': 'b', 'e': 'É˜', 'f': 'Ò“', 'g': 'É¢', 'h': 'É¥', 'i': 'i', 'j': 'ê—©', 'k': 'Êž', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'É¹', 's': 's', 't': 'á´›', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'Ê ', 'z': 'z',
    'A': 'A', 'B': 'á¡ ', 'C': 'Æ†', 'D': 'á—–', 'E': 'ÆŽ', 'F': 'â„²', 'G': 'â—€', 'H': 'H', 'I': 'I', 'J': 'á— ', 'K': 'á¡ ', 'L': 'â— ', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'á…—', 'Q': 'â’¶', 'R': 'á¡™', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
    '1': 'â‡™', '2': 'â„²', '3': 'Æ ', '4': 'â–Ÿ', '5': 'â—¥', '6': '9', '7': 'á„‹', '8': '8', '9': '6', '0': '0'
};

export default function TextMirrorTool() {
    const [text, setText] = useState('');

    const mirroredText = useMemo(() => {
        return text.split('').map(char => MIRROR_MAP[char] || char).join('');
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(mirroredText);
        toast.success('Mirrored text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text Mirror Tool</CardTitle>
                <p className="text-muted-foreground mt-2">Create reflected text using unique Unicode mirrors.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Type normal text here..."
                    className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="relative min-h-[150px] p-8 rounded-2xl bg-muted/30 border border-primary/5 flex items-center justify-center text-center">
                    <div className="text-2xl font-bold transform -scale-x-100 italic transition-all duration-300">
                        {text || 'Reflection will appear here...'}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button onClick={handleCopy} className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/10">
                        <Copy className="mr-2 h-4 w-4" /> Copy Mirrored
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setText('')}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
