'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function SchemaMarkupMaker() {
    const [data, setData] = useState({
        name: '',
        description: '',
        url: '',
        image: '',
        author: ''
    });
    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.name,
            "description": data.description,
            "image": data.image,
            "author": {
                "@type": "Person",
                "name": data.author
            },
            "url": data.url
        };
        return JSON.stringify(schema, null, 2);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`<script type="application/ld+json">\n${generateSchema()}\n</script>`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium text-primary">Easily generate &quot;Article&quot; JSON-LD schema for SEO.</p>
                </div>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label>Article Headline</Label>
                        <Input
                            className="rounded-xl h-11"
                            placeholder="e.g. 10 Best Gaming Mice 2024"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Short Description</Label>
                        <Textarea
                            className="rounded-xl min-h-[100px]"
                            placeholder="Briefly describe the content..."
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Author Name</Label>
                            <Input
                                className="rounded-xl h-11"
                                placeholder="Writer's Name"
                                value={data.author}
                                onChange={(e) => setData({ ...data, author: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Page URL</Label>
                            <Input
                                className="rounded-xl h-11"
                                placeholder="https://site.com/page"
                                value={data.url}
                                onChange={(e) => setData({ ...data, url: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Feature Image URL</Label>
                        <Input
                            className="rounded-xl h-11"
                            placeholder="https://site.com/image.jpg"
                            value={data.image}
                            onChange={(e) => setData({ ...data, image: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">JSON-LD Script</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        onClick={copyToClipboard}
                    >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="min-h-[450px] w-full rounded-2xl border bg-zinc-950 text-blue-400 p-6 font-mono text-xs overflow-auto">
                    <pre className="whitespace-pre-wrap">
                        {`<script type="application/ld+json">\n${generateSchema()}\n</script>`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
