'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Globe, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function GoogleSERPPreview() {
    const [title, setTitle] = useState('Antigravity Tools | The Ultimate Developer Expansion');
    const [desc, setDesc] = useState('Discover over 240+ specialized tools for gaming, SEO, dev skills, and more. Optimized for speed and premium user experience.');
    const [url, setUrl] = useState('https://tools.example.com/mega-expansion');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Google SERP Preview</CardTitle>
                <p className="text-muted-foreground mt-2">Optimize your search appearance to boost click-through rates.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">SEO Title ({title.length}/60)</label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Meta Description ({desc.length}/160)</label>
                            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="h-24 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Target URL</label>
                            <Input value={url} onChange={(e) => setUrl(e.target.value)} className="rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Desktop Preview</h4>
                        <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-2 font-arial min-h-[160px]">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                                    <Globe className="h-4 w-4 text-slate-400" />
                                </div>
                                <div className="text-xs">
                                    <p className="text-slate-800 flex items-center gap-1">Google <MoreVertical className="h-3 w-3" /></p>
                                    <p className="text-slate-500 font-normal leading-tight">{url}</p>
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] text-xl hover:underline cursor-pointer leading-tight truncate">
                                {title || 'Untitled Page'}
                            </h3>
                            <p className="text-[#4d5156] text-sm leading-relaxed line-clamp-2">
                                {desc || 'Start typing a description to see how it will appear in search results...'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-1">
                        <p className="font-bold text-xs text-primary">Title Advice:</p>
                        <p className={`text-[10px] ${title.length > 60 ? 'text-destructive font-black' : 'text-muted-foreground'}`}>
                            {title.length > 60 ? 'TOO LONG: Use < 60 chars to avoid truncation.' : 'LENGTH OK: Your title should be visible on most screens.'}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-xs text-primary">Description Advice:</p>
                        <p className={`text-[10px] ${desc.length > 160 ? 'text-destructive font-black' : 'text-muted-foreground'}`}>
                            {desc.length > 160 ? 'TOO LONG: Use < 160 chars for best mobile results.' : 'LENGTH OK: Perfect amount of detail for search snippets.'}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
