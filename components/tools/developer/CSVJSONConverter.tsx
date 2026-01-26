'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileJson,
    FileSpreadsheet,
    Copy,
    Trash2,
    Check,
    AlertCircle,
    ArrowRightLeft,
    Download,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CSVJSONConverter({ mode }: { mode: 'csv-to-json' | 'json-to-csv' }) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const convertAction = () => {
        try {
            setError(null);
            if (!input.trim()) {
                setOutput('');
                return;
            }

            if (mode === 'csv-to-json') {
                const lines = input.trim().split('\n');
                if (lines.length < 1) throw new Error('Input is empty');

                const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                const result = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                    const obj: any = {};
                    headers.forEach((header, i) => {
                        obj[header] = values[i] || '';
                    });
                    return obj;
                });
                setOutput(JSON.stringify(result, null, 2));
            } else {
                try {
                    const json = JSON.parse(input);
                    const array = Array.isArray(json) ? json : [json];
                    if (array.length === 0) throw new Error('Empty array');

                    const headers = Object.keys(array[0]);
                    const csvLines = [
                        headers.join(','),
                        ...array.map(obj => headers.map(header => {
                            const val = String(obj[header] || '');
                            return val.includes(',') ? `"${val}"` : val;
                        }).join(','))
                    ];
                    setOutput(csvLines.join('\n'));
                } catch (e: any) {
                    throw new Error('Invalid JSON format. Please provide an array of objects.');
                }
            }
            toast.success('Converted successfully!');
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.info('Copied to clipboard');
    };

    const downloadOutput = () => {
        const blob = new Blob([output], { type: mode === 'csv-to-json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'csv-to-json' ? 'converted.json' : 'converted.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-4">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            {mode === 'csv-to-json' ? <FileSpreadsheet className="h-4 w-4" /> : <FileJson className="h-4 w-4" />}
                            Input {mode === 'csv-to-json' ? 'CSV' : 'JSON'}
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setInput(''); setOutput(''); setError(null); }}
                            className="text-xs font-bold text-destructive hover:bg-destructive/10 rounded-xl"
                        >
                            <Trash2 className="h-3 w-3 mr-1" /> Clear
                        </Button>
                    </div>
                    <Card className="rounded-[2rem] border-primary/10 bg-muted/30 overflow-hidden">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === 'csv-to-json' ? "name,age,city\nJohn,30,New York\nJane,25,London" : '[{"name":"John","age":30,"city":"New York"}]'}
                            className="min-h-[400px] border-none focus-visible:ring-0 bg-transparent p-6 font-mono text-sm resize-none"
                        />
                    </Card>
                </div>

                {/* Output Area */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                            {mode === 'csv-to-json' ? <FileJson className="h-4 w-4" /> : <FileSpreadsheet className="h-4 w-4" />}
                            Output {mode === 'csv-to-json' ? 'JSON' : 'CSV'}
                        </h3>
                        {output && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="text-xs font-bold rounded-xl h-8"
                                >
                                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={downloadOutput}
                                    className="text-xs font-bold rounded-xl h-8"
                                >
                                    <Download className="h-3 w-3 mr-1" /> Download
                                </Button>
                            </div>
                        )}
                    </div>
                    <Card className="rounded-[2rem] border-primary/20 bg-background shadow-inner overflow-hidden flex flex-col min-h-[400px]">
                        {error ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                                    <AlertCircle className="h-6 w-6 text-destructive" />
                                </div>
                                <p className="text-sm font-medium text-destructive">{error}</p>
                            </div>
                        ) : output ? (
                            <pre className="flex-1 p-6 font-mono text-sm overflow-auto text-primary">
                                {output}
                            </pre>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground opacity-40">
                                <RefreshCw className="h-12 w-12 mb-4 animate-pulse" />
                                <p className="text-sm">Click the button to convert your data</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <div className="flex justify-center">
                <Button
                    size="lg"
                    onClick={convertAction}
                    className="h-16 rounded-[1.5rem] px-12 text-xl font-bold shadow-2xl shadow-primary/20 group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-3">
                        Convert Now <ArrowRightLeft className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                    </span>
                </Button>
            </div>
        </div>
    );
}
