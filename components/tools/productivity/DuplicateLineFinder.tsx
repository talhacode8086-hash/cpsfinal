'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function DuplicateLineFinder() {
    const [text, setText] = useState('');
    const [duplicates, setDuplicates] = useState<string[]>([]);
    const [isFound, setIsFound] = useState(false);

    const findDuplicates = () => {
        const lines = text.split('\n');
        const seen = new Set<string>();
        const dups = new Set<string>();

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && seen.has(trimmed)) {
                dups.add(trimmed);
            }
            seen.add(trimmed);
        });

        const foundDups = Array.from(dups);
        setDuplicates(foundDups);
        setIsFound(true);

        if (foundDups.length > 0) {
            toast.warning(`Found ${foundDups.length} duplicate lines!`);
        } else {
            toast.success('No duplicate lines found!');
        }
    };

    const removeDuplicates = () => {
        const lines = text.split('\n');
        const unique = Array.from(new Set(lines.map(l => l.trim()))).filter(l => l !== "");
        setText(unique.join('\n'));
        setDuplicates([]);
        setIsFound(false);
        toast.success('Cleaned! All duplicates removed.');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Duplicate Line Finder</CardTitle>
                <p className="text-muted-foreground mt-2">Detect and remove repeated lines from your lists and data.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Paste your rows here..."
                    className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setIsFound(false);
                    }}
                />

                <div className="flex gap-4">
                    <Button onClick={findDuplicates} className="flex-1 h-12 rounded-xl font-bold">Find Duplicates</Button>
                    <Button onClick={removeDuplicates} variant="outline" className="flex-1 h-12 rounded-xl font-bold text-destructive">Remove Them All</Button>
                </div>

                {isFound && (
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 space-y-4">
                        <div className="flex items-center gap-2 font-bold mb-4">
                            {duplicates.length > 0 ? (
                                <><AlertCircle className="text-warning h-5 w-5" /> Results Found ({duplicates.length})</>
                            ) : (
                                <><CheckCircle2 className="text-success h-5 w-5" /> All Clean!</>
                            )}
                        </div>

                        {duplicates.length > 0 && (
                            <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-2">
                                {duplicates.map((line, i) => (
                                    <div key={i} className="p-3 text-sm rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-700 font-mono truncate">
                                        &quot;{line}&quot;
                                    </div>
                                ))}
                            </div>
                        )}
                        {!duplicates.length && (
                            <p className="text-muted-foreground text-sm italic">Every line is unique in the provided input.</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
