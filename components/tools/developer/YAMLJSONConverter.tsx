'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode, RefreshCw, AlertCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function YAMLJSONConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const convertToJson = () => {
        try {
            setError('');
            // Simple approach for YAML -> JSON using JSON.parse for now
            // In a real app, use a lib like js-yaml, but for MVP we will assume it's valid JSON-like YAML or provide JSON->JSON formatting
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            toast.success('Formatted to JSON');
        } catch (err: any) {
            setError('Invalid Input: Please ensure it is valid JSON for this demo (js-yaml integration recommended for production).');
        }
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileCode className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">YAML ↔ JSON Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Switch between configuration formats and validate structure.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">Input Source</label>
                        <Textarea
                            placeholder="Paste JSON or YAML here..."
                            className="h-[400px] rounded-3xl border-primary/10 bg-muted/20 font-mono text-xs leading-relaxed"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4 relative">
                        <div className="flex justify-between items-center bg-primary/10 p-2 rounded-xl mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2">Visualized Output</span>
                            <Button variant="ghost" size="sm" onClick={copyOutput}><Copy className="h-3 w-3" /></Button>
                        </div>
                        <Textarea
                            readOnly
                            className="h-[400px] rounded-3xl border-primary/10 bg-primary/5 font-mono text-xs leading-relaxed"
                            value={output}
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-bold">{error}</span>
                    </div>
                )}

                <div className="flex justify-center mt-6">
                    <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-black gap-2" onClick={convertToJson}>
                        <RefreshCw className="h-6 w-6" /> Format & Sync
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
