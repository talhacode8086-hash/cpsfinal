'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, RotateCw } from 'lucide-react';
import { toast } from 'sonner';

const UPSIDE_DOWN_MAP: Record<string, string> = {
    'a': 'É', 'b': 'q', 'c': 'É”', 'd': 'p', 'e': 'Ç', 'f': 'ÉŸ', 'g': 'ÆŽ', 'h': 'É¥', 'i': 'Ä±', 'j': 'É¾', 'k': 'Êž', 'l': 'l', 'm': 'É¯', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'É¹', 's': 's', 't': 'Ê‡', 'u': 'n', 'v': 'ÊŒ', 'w': 'Ê', 'x': 'x', 'y': 'ÊŽ', 'z': 'z',
    'A': 'âˆ€', 'B': 'á¡ ', 'C': 'Æ†', 'D': 'á—–', 'E': 'ÆŽ', 'F': 'â„²', 'G': 'â—€', 'H': 'H', 'I': 'I', 'J': 'Æ¾', 'K': 'Êž', 'L': 'â—', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'á…—', 'Q': 'â’¶', 'R': 'á¡™', 'S': 'S', 'T': 'âŠ¥', 'U': 'âˆ©', 'V': 'â‹€', 'W': 'M', 'X': 'X', 'Y': 'â„†', 'Z': 'Z',
    '1': 'â‡™', '2': 'â„²', '3': 'Æ', '4': 'â–Ÿ', '5': 'â—¥', '6': '9', '7': 'á„‹', '8': '8', '9': '6', '0': '0',
    '.': 'Ë™', ',': "'", "'": ',', '"': 'â€ž', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '?': 'Â¿', '!': 'Â¡', '&': 'â…‹', '_': 'â€¾', '<': '>', '>': '<', ';': 'â€˜', ' ': ' '
};

export default function UpsideDownText() {
    const [text, setText] = useState('');

    const flippedText = useMemo(() => {
        return text.split('').reverse()
            .map(char => UPSIDE_DOWN_MAP[char] || char)
            .join('');
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(flippedText);
        toast.success('Upside down text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <RotateCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Upside Down Text</CardTitle>
                <p className="text-muted-foreground mt-2">Flip your text 180° for unique social media posts.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Type your normal text here..."
                    className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="relative min-h-[150px] p-8 rounded-2xl bg-muted/30 border border-primary/5 flex items-center justify-center text-center">
                    <div className="text-2xl font-bold transform transition-all duration-500">
                        {text ? flippedText : 'É¥É d-á•™o-á¡ á——á——-á’¶ Ç Ê¹oÊŽ Ê¹Ä±ÆŽ-á—–á——-Ç '}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button onClick={handleCopy} className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/10">
                        <Copy className="mr-2 h-4 w-4" /> Copy Upside Down
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setText('')}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
