'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ROT13Cipher() {
    const [text, setText] = useState('');

    const applyRot13 = () => {
        const result = text.replace(/[a-zA-Z]/g, (char) => {
            const charCode = char.charCodeAt(0);
            const offset = charCode >= 97 ? 97 : 65;
            return String.fromCharCode(((charCode - offset + 13) % 26) + offset);
        });
        setText(result);
        if (text) toast.success('ROT13 conversion complete!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">ROT13 Cipher</CardTitle>
                <p className="text-muted-foreground mt-2">Encrypt or decrypt text using the classic 13-letter rotation.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="relative">
                    <Textarea
                        placeholder="Paste your text or ROT13 message here..."
                        className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-xl" onClick={handleCopy} title="Copy">
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl text-destructive hover:bg-destructive/10" onClick={() => setText('')} title="Clear">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Button onClick={applyRot13} className="w-full h-14 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                    <RefreshCw className="mr-3 h-6 w-6" /> Encode / Decode ROT13
                </Button>

                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-xs text-muted-foreground italic">
                    <p>Fun fact: ROT13 is often used in online forums to hide spoilers!</p>
                </div>
            </CardContent>
        </Card>
    );
}
