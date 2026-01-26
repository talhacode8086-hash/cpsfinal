'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Braces, Copy, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const encode = () => {
        try {
            setOutput(btoa(input));
            toast.success('Text encoded successfully!');
        } catch (e) {
            toast.error('Could not encode. Ensure text is valid UTF-8.');
        }
    };

    const decode = () => {
        try {
            setOutput(atob(input));
            toast.success('Text decoded successfully!');
        } catch (e) {
            toast.error('Invalid Base64 string.');
        }
    };

    const swap = () => {
        setInput(output);
        setOutput('');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Braces className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Base64 Encoder / Decoder</CardTitle>
                <p className="text-muted-foreground mt-2">Encode your text to Base64 or decode it back to plain text instantly.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold">Input Text</label>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive" onClick={() => setInput('')}>
                            <Trash2 className="h-3 w-3 mr-1" /> Clear
                        </Button>
                    </div>
                    <Textarea
                        placeholder="Enter text to encode or Base64 to decode..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/10" onClick={encode}>
                        Encode to Base64
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold" onClick={decode}>
                        Decode to Text
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12" onClick={swap} title="Swap Input/Output">
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-primary/5">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold">Result</label>
                        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleCopy}>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                        </Button>
                    </div>
                    <Textarea
                        readOnly
                        placeholder="Result will appear here..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/10 bg-muted/30 transition-all resize-none cursor-default"
                        value={output}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
