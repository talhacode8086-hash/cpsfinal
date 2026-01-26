'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Shuffle, ArrowLeftRight, AlignLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ReverseText() {
    const [text, setText] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const reverseChars = () => {
        setText(text.split('').reverse().join(''));
        toast.success('Reversed all characters');
    };

    const reverseWords = () => {
        setText(text.split(/\s+/).reverse().join(' '));
        toast.success('Reversed word order');
    };

    const reverseLines = () => {
        setText(text.split('\n').reverse().join('\n'));
        toast.success('Reversed line order');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shuffle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Reverse Text</CardTitle>
                <p className="text-muted-foreground mt-2">Flip your text, words, or lines instantly.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button variant="outline" className="rounded-xl font-bold h-12" onClick={reverseChars}>
                        <ArrowLeftRight className="mr-2 h-4 w-4" /> Reverse Chars
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold h-12" onClick={reverseWords}>
                        <Shuffle className="mr-2 h-4 w-4" /> Reverse Words
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold h-12" onClick={reverseLines}>
                        <AlignLeft className="mr-2 h-4 w-4" /> Reverse Lines
                    </Button>
                </div>

                <div className="relative">
                    <Textarea
                        placeholder="Paste or type your text here..."
                        className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-xl" onClick={handleCopy} title="Copy">
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl text-destructive hover:bg-destructive/10" onClick={() => setText('')} title="Clear">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-sm text-muted-foreground">
                    <span>Characters: {text.length}</span>
                    <span>Lines: {text ? text.split('\n').length : 0}</span>
                </div>
            </CardContent>
        </Card>
    );
}
