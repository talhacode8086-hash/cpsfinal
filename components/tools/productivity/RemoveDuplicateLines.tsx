'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, ListChecks } from 'lucide-react';
import { toast } from 'sonner';

export default function RemoveDuplicateLines() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const process = () => {
        const lines = input.split(/\r?\n/);
        const uniqueLines = Array.from(new Set(lines));
        setOutput(uniqueLines.join('\n'));
        const removedCount = lines.length - uniqueLines.length;
        toast.success(`Removed ${removedCount} duplicate lines!`);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Trash2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Remove Duplicate Lines</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly clean up your lists by removing duplicates.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold flex justify-between">
                            Input List
                            <span className="text-xs font-normal">Line count: {input ? input.split(/\r?\n/).length : 0}</span>
                        </label>
                        <Textarea
                            placeholder="Enter your list here..."
                            className="min-h-[300px] p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold flex justify-between">
                            Cleaned List
                            <span className="text-xs font-normal">Line count: {output ? output.split(/\r?\n/).length : 0}</span>
                        </label>
                        <div className="relative">
                            <Textarea
                                readOnly
                                placeholder="Cleaned list will appear here..."
                                className="min-h-[300px] p-6 rounded-2xl border-primary/10 bg-muted/30 transition-all resize-none cursor-default"
                                value={output}
                            />
                            {output && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-4 right-4 rounded-xl"
                                    onClick={handleCopy}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <Button className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/10" onClick={process}>
                    <ListChecks className="mr-2 h-5 w-5" />
                    Remove Duplicates
                </Button>
            </CardContent>
        </Card>
    );
}
