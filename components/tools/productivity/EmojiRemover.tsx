'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Smile, Eraser } from 'lucide-react';
import { toast } from 'sonner';

export default function EmojiRemover() {
    const [text, setText] = useState('');

    const removeEmojis = () => {
        // Regex for most emojis
        const result = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        setText(result);
        if (text) toast.success('All emojis removed!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Clean text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Smile className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Emoji Remover</CardTitle>
                <p className="text-muted-foreground mt-2">Clean up your text by stripping all Unicode emojis instantly.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your emoji-heavy text here..."
                    className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flex gap-4">
                    <Button onClick={removeEmojis} className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:bg-primary/90">
                        <Eraser className="mr-2 h-5 w-5" /> Strip All Emojis
                    </Button>
                    <Button onClick={handleCopy} variant="outline" className="h-14 rounded-2xl px-8" disabled={!text}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
