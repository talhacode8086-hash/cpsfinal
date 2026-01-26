'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, SortAsc, SortDesc } from 'lucide-react';
import { toast } from 'sonner';

export default function LineAlphabetizer() {
    const [text, setText] = useState('');

    const sortAZ = () => {
        const sorted = text.split('\n')
            .filter(line => line.trim())
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
            .join('\n');
        setText(sorted);
        toast.success('Sorted A to Z');
    };

    const sortZA = () => {
        const sorted = text.split('\n')
            .filter(line => line.trim())
            .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))
            .join('\n');
        setText(sorted);
        toast.success('Sorted Z to A');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Sorted list copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <SortAsc className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Line Alphabetizer</CardTitle>
                <p className="text-muted-foreground mt-2">Sort your lists alphabetically in seconds.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your list of lines here..."
                    className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button onClick={sortAZ} className="h-12 rounded-xl font-bold shadow-md shadow-primary/5">
                        <SortAsc className="mr-2 h-4 w-4" /> Sort A to Z
                    </Button>
                    <Button onClick={sortZA} variant="outline" className="h-12 rounded-xl font-bold">
                        <SortDesc className="mr-2 h-4 w-4" /> Sort Z to A
                    </Button>
                </div>

                <Button onClick={handleCopy} variant="secondary" className="w-full h-12 rounded-xl font-bold" disabled={!text}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Sorted List
                </Button>
            </CardContent>
        </Card>
    );
}
