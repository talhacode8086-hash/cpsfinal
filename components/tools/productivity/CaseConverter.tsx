'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Type } from 'lucide-react';
import { toast } from 'sonner';

export default function CaseConverter() {
    const [text, setText] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const convertCase = (type: string) => {
        switch (type) {
            case 'upper':
                setText(text.toUpperCase());
                break;
            case 'lower':
                setText(text.toLowerCase());
                break;
            case 'title':
                setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
                break;
            case 'sentence':
                setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase()));
                break;
            case 'camel':
                setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
                break;
            case 'snake':
                setText(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map(x => x.toLowerCase())
                    .join('_') || '');
                break;
            case 'kebab':
                setText(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                    ?.map(x => x.toLowerCase())
                    .join('-') || '');
                break;
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Type className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Case Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly convert your text between various letter cases.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="relative">
                    <Textarea
                        placeholder="Paste or type your text here..."
                        className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('upper')}>UPPERCASE</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('lower')}>lowercase</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('title')}>Title Case</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('sentence')}>Sentence case</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('camel')}>camelCase</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('snake')}>snake_case</Button>
                    <Button variant="outline" className="rounded-xl font-bold" onClick={() => convertCase('kebab')}>kebab-case</Button>
                </div>

                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-sm text-muted-foreground">
                    <span>Characters: {text.length}</span>
                    <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                </div>
            </CardContent>
        </Card>
    );
}
