'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, ArrowRight } from 'lucide-react';
import { diffLines, Change } from 'diff';

export default function TextDiffChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffResult, setDiffResult] = useState<Change[]>([]);

    const compare = () => {
        const diff = diffLines(text1, text2);
        setDiffResult(diff);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shuffle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text Diff Checker</CardTitle>
                <p className="text-muted-foreground mt-2">Compare two texts and see clinical differences side-by-side.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Original Text</label>
                        <Textarea
                            placeholder="Enter the original text..."
                            className="min-h-[200px] p-6 rounded-2xl border-primary/20 bg-background/50"
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Modified Text</label>
                        <Textarea
                            placeholder="Enter the modified text..."
                            className="min-h-[200px] p-6 rounded-2xl border-primary/20 bg-background/50"
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                        />
                    </div>
                </div>

                <Button className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/10" onClick={compare}>
                    Compare Texts
                </Button>

                {diffResult.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-primary/5">
                        <h4 className="font-bold flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Differences Detected
                        </h4>
                        <div className="p-8 rounded-2xl border border-primary/10 bg-muted/20 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                            {diffResult.map((part, index) => (
                                <span
                                    key={index}
                                    className={`${part.added
                                            ? 'bg-green-500/20 text-green-700 dark:text-green-300 px-1 rounded'
                                            : part.removed
                                                ? 'bg-red-500/20 text-red-700 dark:text-red-300 px-1 rounded line-through'
                                                : ''
                                        }`}
                                >
                                    {part.value}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
