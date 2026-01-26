'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eraser, Code } from 'lucide-react';
import { toast } from 'sonner';

export default function StripHTML() {
    const [html, setHtml] = useState('');

    const stripTags = () => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        setHtml(doc.body.textContent || "");
        toast.success('All HTML tags removed!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(html);
        toast.success('Plain text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Eraser className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Strip HTML Tags</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly remove all tags and attributes from your code.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your HTML code here..."
                    className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                />

                <div className="flex gap-4">
                    <Button onClick={stripTags} className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                        <Code className="mr-2 h-5 w-5" /> Clean Plain Text
                    </Button>
                    <Button onClick={handleCopy} variant="outline" className="h-14 rounded-2xl px-8" disabled={!html}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
