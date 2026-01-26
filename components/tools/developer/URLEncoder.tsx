'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Link, Unlock } from 'lucide-react';

export default function URLEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input));
        } catch (e) {
            setOutput('Error: Invalid input');
        }
    };

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
        } catch (e) {
            setOutput('Error: Invalid encoding');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Input URL/String</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setInput('')}
                        disabled={!input}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
                <textarea
                    className="min-h-[400px] w-full resize-none rounded-2xl border border-input bg-background p-6 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    placeholder="Enter URL component or string here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex gap-4">
                    <Button className="flex-1 rounded-xl h-12" onClick={handleEncode} disabled={!input}>
                        <Link className="mr-2 h-4 w-4" />
                        Encode
                    </Button>
                    <Button className="flex-1 rounded-xl h-12" variant="secondary" onClick={handleDecode} disabled={!input}>
                        <Unlock className="mr-2 h-4 w-4" />
                        Decode
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Output</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={copyToClipboard}
                        disabled={!output}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                </div>
                <div className="min-h-[400px] w-full rounded-2xl border bg-muted/30 p-6 font-mono text-sm overflow-auto break-all">
                    {output || <span className="text-muted-foreground italic">Result will appear here...</span>}
                </div>
            </div>
        </div>
    );
}
