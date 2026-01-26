'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, AlertCircle, CheckCircle2, History, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function BashScriptValidator() {
    const [input, setInput] = useState('');
    const [issues, setIssues] = useState<any[]>([]);

    const validate = () => {
        const found = [];
        if (!input.includes('#!/bin/bash') && !input.includes('#!/bin/sh')) {
            found.push({ type: 'warn', msg: 'Shebang line (#!/bin/bash) is missing.' });
        }
        if (input.includes('rm -rf /')) {
            found.push({ type: 'error', msg: 'Dangerous command detected (rm -rf /)!' });
        }
        if (input.match(/ \$[a-zA-Z0-9_]+/)) {
            found.push({ type: 'warn', msg: 'Unquoted variable usage detected. Use "$var" instead of $var.' });
        }

        setIssues(found);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Terminal className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Bash Script Validator</CardTitle>
                <p className="text-muted-foreground mt-2">Check your shell scripts for syntax errors and dangerous commands.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-primary">Script Input</label>
                    <Textarea
                        placeholder="#!/bin/bash\necho 'hello'..."
                        className="h-64 rounded-3xl border-primary/10 bg-muted/20 font-mono text-xs leading-relaxed"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); validate(); }}
                    />
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                        <History className="h-4 w-4 text-primary" /> Validation Results
                    </h4>
                    <div className="space-y-2">
                        {issues.map((issue, i) => (
                            <div key={i} className={`p-4 rounded-xl border flex items-center gap-4 animate-in slide-in-from-left-2 ${issue.type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                }`}>
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <span className="text-xs font-bold">{issue.msg}</span>
                            </div>
                        ))}
                        {issues.length === 0 && input.length > 0 && (
                            <div className="p-8 rounded-2xl bg-green-500/5 border border-green-500/10 text-center">
                                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm font-bold text-green-600">No syntax issues detected</p>
                            </div>
                        )}
                        {input.length === 0 && (
                            <p className="text-center text-muted-foreground italic text-xs py-10 border-2 border-dashed border-primary/5 rounded-3xl">Enter code to start real-time validation...</p>
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
                    <ChevronRight className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Pro Tip:</b> Always use `shellcheck` in production environments for comprehensive static analysis of heavy infrastructure scripts.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
