'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, FileJson, MinusSquare, PlusSquare } from 'lucide-react';

export default function JSONFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const formatJSON = (beautify: boolean) => {
        try {
            if (!input.trim()) {
                setOutput('');
                setError(null);
                return;
            }
            const parsed = JSON.parse(input);
            const result = beautify
                ? JSON.stringify(parsed, null, 2)
                : JSON.stringify(parsed);
            setOutput(result);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Input JSON</Label>
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
                    className={`min-h-[500px] w-full resize-none rounded-md border bg-background p-4 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 ${error ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'
                        }`}
                    placeholder='Paster your JSON here... e.g. {"name": "ToolsHub"}'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {error && (
                    <p className="text-sm font-medium text-destructive">
                        Error: {error}
                    </p>
                )}
                <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => formatJSON(true)}>
                        <PlusSquare className="mr-2 h-4 w-4" />
                        Beautify
                    </Button>
                    <Button className="flex-1" variant="secondary" onClick={() => formatJSON(false)}>
                        <MinusSquare className="mr-2 h-4 w-4" />
                        Minify
                    </Button>
                </div>
            </div>

            <div className="space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Output</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        disabled={!output}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                </div>
                <div className="relative min-h-[500px] w-full rounded-md border bg-muted p-4 font-mono text-sm overflow-auto">
                    {output ? (
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                            <FileJson className="mb-2 h-12 w-12 opacity-20" />
                            <p>Result will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
