'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function TextToSlug() {
    const [text, setText] = useState('');
    const [slug, setSlug] = useState('');

    const generateSlug = () => {
        const result = text
            .toString()
            .normalize('NFD')                   // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, '')     // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim()                             // trim leading or trailing whitespace
            .toLowerCase()                      // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '')        // remove non-alphanumeric characters
            .replace(/\s+/g, '-')               // replace spaces with hyphens
            .replace(/-+/g, '-');               // remove consecutive hyphens

        setSlug(result);
        if (text) toast.success('Slug generated!');
    };

    const handleCopy = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        toast.success('Slug copied to clipboard!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <LinkIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text to Slug Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Convert any text into a URL-friendly SEO slug.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                    <Textarea
                        placeholder="Enter your title or text here..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Button onClick={generateSlug} className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/10">
                        <RefreshCw className="mr-2 h-5 w-5" /> Generate Slug
                    </Button>

                    <div className="relative">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 min-h-[80px] flex items-center justify-between text-xl font-mono break-all group">
                            <span className={slug ? 'text-foreground' : 'text-muted-foreground'}>
                                {slug || 'your-slug-will-appear-here'}
                            </span>
                            {slug && (
                                <Button variant="ghost" size="icon" className="rounded-xl shrink-0 ml-4 hover:bg-primary/10 hover:text-primary" onClick={handleCopy}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-primary/5 flex justify-between items-center text-sm text-muted-foreground">
                    <p>Example: &quot;Hello World!&quot; &rarr; &quot;hello-world&quot;</p>
                </div>
            </CardContent>
        </Card>
    );
}
