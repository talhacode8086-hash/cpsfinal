'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { analyzeText } from '@/lib/calculations/text-analysis';
import { Trash2 } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('');

    const stats = useMemo(() => analyzeText(text), [text]);

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Input Text</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setText('')}
                        disabled={!text}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
                <textarea
                    className="min-h-[400px] w-full resize-y rounded-md border border-input bg-background p-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-muted-foreground">Words</span>
                            <span className="font-bold text-xl">{stats.words}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-muted-foreground">Characters</span>
                            <span className="font-bold text-xl">{stats.characters}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-muted-foreground">Sentences</span>
                            <span className="font-bold text-xl">{stats.sentences}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-muted-foreground">Paragraphs</span>
                            <span className="font-bold text-xl">{stats.paragraphs}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-muted-foreground">Reading Time</span>
                            <span className="font-bold text-xl">~{stats.readingTime} min</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
