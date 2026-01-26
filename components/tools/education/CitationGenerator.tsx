'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, Copy, Check, BookOpen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CitationGenerator() {
    const [style, setStyle] = useState('APA');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [publisher, setPublisher] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCitation = () => {
        if (!author || !title) return 'Please fill in required fields...';

        switch (style) {
            case 'APA':
                return `${author}. (${year}). ${title}. ${publisher}.`;
            case 'MLA':
                return `${author}. ${title}. ${publisher}, ${year}.`;
            case 'Chicago':
                return `${author}. ${title}. (${publisher}, ${year}).`;
            default:
                return '';
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(generateCitation());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-5xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Quote className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Quick Citation Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Generate perfectly formatted academic references in seconds.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Citation Style</label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger className="h-14 rounded-2xl bg-background border-primary/10 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="APA">APA (7th Edition)</SelectItem>
                                    <SelectItem value="MLA">MLA (9th Edition)</SelectItem>
                                    <SelectItem value="Chicago">Chicago Style</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Input placeholder="Authors Name (e.g. Smith, J.)" value={author} onChange={(e) => setAuthor(e.target.value)} className="h-14 rounded-2xl" />
                            <Input placeholder="Book or Article Title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-14 rounded-2xl" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="h-14 rounded-2xl" />
                                <Input placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="h-14 rounded-2xl" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">
                            <span>Formated Reference</span>
                            <button onClick={copy} className="flex items-center gap-2 hover:text-primary transition-colors">
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                        <div className="p-10 rounded-[3rem] bg-muted/20 border-2 border-dashed border-primary/10 min-h-64 flex items-center justify-center text-center italic text-xl px-12 leading-relaxed">
                            {generateCitation()}
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => { setAuthor(''); setTitle(''); setYear(''); setPublisher(''); }} className="flex-1 h-14 rounded-2xl">
                                <Trash2 className="mr-2" /> Clear All
                            </Button>
                            <Button className="flex-1 h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20">
                                <BookOpen className="mr-2" /> Add to List
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
