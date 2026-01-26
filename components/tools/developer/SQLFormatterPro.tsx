'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, RefreshCw, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function SQLFormatterPro() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const formatSQL = () => {
        if (!input.trim()) return;

        // Simulating SQL formatting logic (Indenting keywords)
        const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'LEFT JOIN', 'INNER JOIN', 'UPDATE', 'DELETE', 'INSERT INTO', 'VALUES'];
        let formatted = input.toUpperCase().trim();

        keywords.forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            formatted = formatted.replace(regex, `\n${key}`);
        });

        setOutput(formatted.trim());
        toast.success('SQL Prettified');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Database className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">SQL Formatter Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Prettify complex SQL queries for better readability.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">Raw Query</label>
                        <Textarea
                            placeholder="SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC..."
                            className="h-[400px] rounded-3xl border-primary/10 bg-muted/20 font-mono text-xs leading-relaxed"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-blue-500/10 p-2 rounded-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 px-2">Clean Output</span>
                            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied Output'); }}>
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                        <Textarea
                            readOnly
                            className="h-[400px] rounded-3xl border-primary/10 bg-primary/5 font-mono text-xs leading-relaxed"
                            value={output}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold gap-3" onClick={formatSQL}>
                        <RefreshCw className="h-6 w-6" /> Beautify Query
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
