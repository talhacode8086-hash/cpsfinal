'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function TwitterCardGenerator() {
    const [title, setTitle] = useState('Epic Site Expansion');
    const [desc, setDesc] = useState('Check out our amazing new feature update!');
    const [img, setImg] = useState('https://images.unsplash.com/photo-1614850523296-d8c1af93d400');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Twitter className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Twitter Card Preview</CardTitle>
                <p className="text-muted-foreground mt-2">Optimize your social meta tags for the X timeline.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Card Title</label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Card Description</label>
                            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="h-24 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Image URL</label>
                            <Input value={img} onChange={(e) => setImg(e.target.value)} className="rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timeline Preview</h4>
                        <div className="bg-black text-white rounded-3xl overflow-hidden border border-white/10 max-w-[400px]">
                            <img src={img} className="w-full aspect-video object-cover" alt="Twitter Preview" />
                            <div className="p-4 space-y-1">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">TOOLS.EXAMPLE.COM</p>
                                <h3 className="text-sm font-bold truncate">{title}</h3>
                                <p className="text-sm text-zinc-400 line-clamp-2 leading-tight">{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-black/95 text-primary border-4 border-primary/10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Generated Meta Tags</span>
                        <Button variant="ghost" className="h-8 text-xs hover:bg-primary/20" onClick={() => {
                            const tag = `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${desc}">\n<meta name="twitter:image" content="${img}">`;
                            navigator.clipboard.writeText(tag);
                        }}>Copy Tags</Button>
                    </div>
                    <pre className="text-[10px] font-mono leading-relaxed opacity-80 break-all whitespace-pre-wrap">
                        {`<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">`}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
}
