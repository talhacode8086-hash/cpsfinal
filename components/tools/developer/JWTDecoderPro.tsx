'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function JWTDecoderPro() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState<any>(null);
    const [error, setError] = useState('');

    const decode = (val: string) => {
        setToken(val);
        setError('');
        if (!val.trim()) {
            setDecoded(null);
            return;
        }

        try {
            const parts = val.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format (must have 3 parts)');

            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));

            setDecoded({ header, payload, signature: parts[2] });
        } catch (err: any) {
            setError(err.message);
            setDecoded(null);
        }
    };

    const copyToClipboard = (data: any) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        toast.success('Copied to clipboard');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">JWT Decoder Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Inspect and debug JSON Web Tokens safely in your browser.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-sm font-bold flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" /> Paste Your Token
                    </label>
                    <Textarea
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={token}
                        onChange={(e) => decode(e.target.value)}
                        className="h-32 rounded-2xl border-primary/20 bg-muted/20 font-mono text-xs leading-relaxed"
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-bold">{error}</span>
                    </div>
                )}

                {decoded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                                <span className="text-xs font-black text-blue-500 uppercase">Header</span>
                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(decoded.header)}><Copy className="h-3 w-3" /></Button>
                            </div>
                            <pre className="p-4 rounded-xl bg-muted/40 border border-primary/5 font-mono text-[10px] overflow-x-auto">
                                {JSON.stringify(decoded.header, null, 2)}
                            </pre>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                                <span className="text-xs font-black text-purple-500 uppercase">Payload</span>
                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(decoded.payload)}><Copy className="h-3 w-3" /></Button>
                            </div>
                            <pre className="p-4 rounded-xl bg-muted/40 border border-primary/5 font-mono text-[10px] overflow-x-auto">
                                {JSON.stringify(decoded.payload, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Privacy Note:</b> Tokens are decoded locally in your browser memory. We never transmit your sensitive auth data to any server.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
