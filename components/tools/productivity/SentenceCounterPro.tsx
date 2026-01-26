'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlignLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function SentenceCounterPro() {
    const [text, setText] = useState('');

    const stats = {
        characters: text.length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.split(/[.!?]+/).filter(Boolean).length,
        paragraphs: text.split(/\n\s*\n/).filter(Boolean).length,
        averageWordLength: text.trim() ? (text.replace(/\s/g, '').length / (text.trim().split(/\s+/).length)).toFixed(1) : 0,
        readTime: Math.ceil(text.trim().split(/\s+/).length / 200) || 0 // Average 200 words per minute
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Sentence Counter Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Deep analysis of your text structure and readability.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatCard label="Sentences" value={stats.sentences} icon={<AlignLeft className="h-4 w-4" />} />
                    <StatCard label="Words" value={stats.words} icon={<FileText className="h-4 w-4" />} />
                    <StatCard label="Paragraphs" value={stats.paragraphs} icon={<Activity className="h-4 w-4" />} />
                    <StatCard label="Characters" value={stats.characters} icon={<Type className="h-4 w-4" />} />
                    <StatCard label="Avg Word Length" value={stats.averageWordLength} icon={<Activity className="h-4 w-4" />} />
                    <StatCard label="Read Time" value={`${stats.readTime} min`} icon={<Clock className="h-4 w-4" />} />
                </div>

                <Textarea
                    placeholder="Paste or type your content for analysis..."
                    className="min-h-[300px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </CardContent>
        </Card>
    );
}

import { Type, Clock } from 'lucide-react';

function StatCard({ label, value, icon }: { label: string, value: any, icon: any }) {
    return (
        <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 flex flex-col items-center justify-center text-center space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                {icon} {label}
            </div>
            <div className="text-2xl font-black text-foreground">{value}</div>
        </div>
    );
}
