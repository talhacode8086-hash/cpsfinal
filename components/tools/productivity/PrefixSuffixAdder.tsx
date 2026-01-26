'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, PlusSquare, ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function PrefixSuffixAdder() {
    const [text, setText] = useState('');
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');

    const processText = () => {
        const result = text.split('\n')
            .map(line => `${prefix}${line}${suffix}`)
            .join('\n');
        setText(result);
        toast.success('Applied to all lines!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <PlusSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Prefix and Suffix Adder</CardTitle>
                <p className="text-muted-foreground mt-2">Add text to the beginning or end of every line.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Prefix (Beginning)</Label>
                        <Input
                            placeholder="e.g. # "
                            className="rounded-xl"
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Suffix (End)</Label>
                        <Input
                            placeholder="e.g. ;"
                            className="rounded-xl"
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={processText} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10">
                    <ArrowRightLeft className="mr-2 h-5 w-5" /> Apply to Every Line
                </Button>

                <div className="relative">
                    <Textarea
                        placeholder="Paste your lines here..."
                        className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
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
            </CardContent>
        </Card>
    );
}
