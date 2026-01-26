'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, AlignLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function MarkdownToText() {
    const [md, setMd] = useState('');

    const stripMarkdown = () => {
        // Simple regex-based markdown stripper
        const plain = md
            .replace(/!\[.*\]\(.*\)/g, '')       // images
            .replace(/\[(.*)\]\(.*\)/g, '$1')   // links
            .replace(/#{1,6}\s+(.*)/g, '$1')     // headers
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
            .replace(/(\*|_)(.*?)\1/g, '$2')    // italics
            .replace(/`{3}[\s\S]*?`{3}/g, '')    // code blocks
            .replace(/`(.*?)`/g, '$1')          // inline code
            .replace(/>\s+(.*)/g, '$1')         // quotes
            .replace(/^[*-]\s+(.*)/gm, '$1')     // lists
            .trim();

        setMd(plain);
        toast.success('Markdown formatting removed');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(md);
        toast.success('Text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Markdown to Plain Text</CardTitle>
                <p className="text-muted-foreground mt-2">Strip symbols and formatting from MD documents.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your markdown content here..."
                    className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={md}
                    onChange={(e) => setMd(e.target.value)}
                />

                <div className="flex gap-4">
                    <Button onClick={stripMarkdown} className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                        <AlignLeft className="mr-2 h-5 w-5" /> Strip All Formatting
                    </Button>
                    <Button onClick={handleCopy} variant="outline" className="h-14 rounded-2xl px-8" disabled={!md}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
