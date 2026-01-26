'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RefreshCw, Type } from 'lucide-react';
import { toast } from 'sonner';

export default function LoremIpsumGenerator() {
    const [paragraphs, setParagraphs] = useState(3);
    const [generatedText, setGeneratedText] = useState('');

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const generate = () => {
        let text = [];
        for (let i = 0; i < paragraphs; i++) {
            text.push(lorem);
        }
        setGeneratedText(text.join('\n\n'));
        toast.success('Lorem Ipsum generated!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        toast.success('Copied to clipboard!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Type className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Lorem Ipsum Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Generate placeholder text for your designs and mockups.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-6 justify-center">
                    <div className="space-y-2 flex-1 max-w-xs">
                        <label className="text-sm font-bold">Number of Paragraphs</label>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            className="w-full h-12 px-4 rounded-xl border border-primary/20 bg-background/50 outline-none focus:border-primary transition-all"
                            value={paragraphs}
                            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                        />
                    </div>
                    <Button className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/10 mt-6" onClick={generate}>
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Generate
                    </Button>
                </div>

                <div className="relative">
                    <div className="min-h-[300px] p-8 rounded-2xl border border-primary/10 bg-muted/30 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                        {generatedText || 'Generated text will appear here...'}
                    </div>
                    {generatedText && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-4 right-4 rounded-xl shadow-md"
                            onClick={handleCopy}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
