'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OpenGraphInspector() {
    const [title, setTitle] = useState('Epic Expansion');
    const [type, setType] = useState('website');
    const [url, setUrl] = useState('https://tools.example.com');
    const [img, setImg] = useState('https://images.unsplash.com/photo-1614850523296-d8c1af93d400');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Share2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Open Graph Inspector</CardTitle>
                <p className="text-muted-foreground mt-2">Master your social appearance on Facebook, Discord, and LinkedIn.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <InputGroup label="og:title" value={title} onChange={setTitle} />
                        <InputGroup label="og:type" value={type} onChange={setType} />
                        <InputGroup label="og:url" value={url} onChange={setUrl} />
                        <InputGroup label="og:image" value={img} onChange={setImg} />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Social Share Preview</h4>
                        <div className="rounded-[2rem] bg-background border border-primary/10 overflow-hidden shadow-2xl">
                            <img src={img} className="w-full aspect-video object-cover" alt="OG Preview" />
                            <div className="p-6 space-y-2">
                                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{type}</p>
                                <h3 className="text-xl font-bold">{title}</h3>
                                <p className="text-xs text-muted-foreground font-medium truncate">{url}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-primary/10 border-2 border-primary/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">SEO Metadata Source</span>
                        <Button size="sm" className="rounded-xl font-bold" onClick={() => {
                            const snippet = `<meta property="og:title" content="${title}">\n<meta property="og:type" content="${type}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${img}">`;
                            navigator.clipboard.writeText(snippet);
                        }}>Copy Snippet</Button>
                    </div>
                    <pre className="text-xs font-mono text-primary/80 whitespace-pre-wrap break-all opacity-80">
                        {`<meta property="og:title" content="${title}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">`}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
}

function InputGroup({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary/60">{label}</label>
            <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border-primary/10 bg-muted/20" />
        </div>
    );
}
