'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Search, Replace, CaseSensitive } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function FindReplace() {
    const [text, setText] = useState('');
    const [find, setFind] = useState('');
    const [replace, setReplace] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const handleReplace = () => {
        if (!find) {
            toast.error('Please enter text to find');
            return;
        }

        try {
            const flags = caseSensitive ? 'g' : 'gi';
            const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedFind, flags);
            const newText = text.replace(regex, replace);

            if (newText === text) {
                toast.info('No matches found');
            } else {
                const matchCount = (text.match(regex) || []).length;
                setText(newText);
                toast.success(`Successfully replaced ${matchCount} occurrence(s)`);
            }
        } catch (e) {
            toast.error('Invalid search pattern');
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Find and Replace</CardTitle>
                <p className="text-muted-foreground mt-2">Search for patterns and replace them instantly.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Find Text</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Text to search for..."
                                className="pl-10 rounded-xl"
                                value={find}
                                onChange={(e) => setFind(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Replace With</Label>
                        <div className="relative">
                            <Replace className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="New text content..."
                                className="pl-10 rounded-xl"
                                value={replace}
                                onChange={(e) => setReplace(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        id="case-sensitive"
                        checked={caseSensitive}
                        onCheckedChange={setCaseSensitive}
                    />
                    <Label htmlFor="case-sensitive" className="flex items-center gap-2 cursor-pointer">
                        <CaseSensitive className="h-4 w-4" /> Case Sensitive
                    </Label>
                    <Button onClick={handleReplace} className="ml-auto rounded-xl px-8 shadow-lg shadow-primary/20">
                        Replace All
                    </Button>
                </div>

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

                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-sm text-muted-foreground">
                    <span>Characters: {text.length}</span>
                    <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                </div>
            </CardContent>
        </Card>
    );
}
