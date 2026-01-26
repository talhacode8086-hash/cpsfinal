'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Globe, Share2, Twitter, Layout } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MetaTagGenerator() {
    const [meta, setMeta] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        url: '',
        image: '',
        ogTitle: '',
        ogDescription: '',
        twitterCreator: '@username',
    });
    const [copied, setCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMeta({ ...meta, [e.target.name]: e.target.value });
    };

    const generateCode = () => {
        return `<!-- Primary Meta Tags -->
<title>${meta.title || 'Page Title'}</title>
<meta name="title" content="${meta.title || 'Page Title'}">
<meta name="description" content="${meta.description || 'Page description goes here.'}">
<meta name="keywords" content="${meta.keywords}">
<meta name="author" content="${meta.author}">
${meta.url ? `<link rel="canonical" href="${meta.url}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${meta.url || 'https://example.com/'}">
<meta property="og:title" content="${meta.ogTitle || meta.title || 'Page Title'}">
<meta property="og:description" content="${meta.ogDescription || meta.description || 'Page description goes here.'}">
<meta property="og:image" content="${meta.image || 'https://example.com/image.jpg'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${meta.url || 'https://example.com/'}">
<meta property="twitter:title" content="${meta.ogTitle || meta.title || 'Page Title'}">
<meta property="twitter:description" content="${meta.ogDescription || meta.description || 'Page description goes here.'}">
<meta property="twitter:image" content="${meta.image || 'https://example.com/image.jpg'}">
<meta property="twitter:creator" content="${meta.twitterCreator}">`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="border-primary/10 shadow-xl overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Layout className="h-5 w-5 text-primary" />
                                Base Tags
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest opacity-70">Page Title</label>
                                <Input name="title" value={meta.title} onChange={handleChange} placeholder="e.g. My Website Home" className="h-11 rounded-xl" />
                                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground px-1">
                                    <span>Recommended: 50-60 chars</span>
                                    <span className={meta.title.length > 60 ? "text-destructive" : ""}>{meta.title.length} characters</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest opacity-70">Meta Description</label>
                                <Textarea name="description" value={meta.description} onChange={handleChange} placeholder="Short summary for search engines..." className="rounded-xl min-h-[100px]" />
                                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground px-1">
                                    <span>Recommended: 150-160 chars</span>
                                    <span className={meta.description.length > 160 ? "text-destructive" : ""}>{meta.description.length} characters</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest opacity-70">Keywords</label>
                                    <Input name="keywords" value={meta.keywords} onChange={handleChange} placeholder="seo, web, tools" className="h-11 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest opacity-70">Author</label>
                                    <Input name="author" value={meta.author} onChange={handleChange} placeholder="Your Name" className="h-11 rounded-xl" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/10 shadow-xl overflow-hidden">
                        <CardHeader className="bg-primary/5 pb-4">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Share2 className="h-5 w-5" />
                                Social Media
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest opacity-70">Canonical URL</label>
                                <Input name="url" value={meta.url} onChange={handleChange} placeholder="https://example.com" className="h-11 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest opacity-70">Social Image URL</label>
                                <Input name="image" value={meta.image} onChange={handleChange} placeholder="https://example.com/og-image.jpg" className="h-11 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest opacity-70">Twitter Handle</label>
                                <Input name="twitterCreator" value={meta.twitterCreator} onChange={handleChange} placeholder="@username" className="h-11 rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Previews and Code */}
                <div className="lg:col-span-7 space-y-6">
                    <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 h-12 rounded-2xl bg-muted/30 p-1 border border-primary/5">
                            <TabsTrigger value="preview" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">Live Preview</TabsTrigger>
                            <TabsTrigger value="code" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">Generated Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="preview" className="mt-6 space-y-6 animate-in fade-in zoom-in duration-300">
                            {/* Google Preview */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <Globe className="h-3 w-3" /> Google Search Result
                                </div>
                                <div className="p-6 rounded-2xl bg-background border shadow-sm space-y-1.5 max-w-[600px]">
                                    <div className="text-[12px] text-[#202124] dark:text-[#bdc1c6] truncate">{meta.url || 'https://www.example.com/'}</div>
                                    <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium truncate leading-tight">
                                        {meta.title || 'Example Page Title - Home'}
                                    </div>
                                    <div className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-relaxed">
                                        <span className="text-muted-foreground">Jan 25, 2026 — </span>
                                        {meta.description || 'This is how your description will appear in search results. Make it catchy and relevant to improve click-through rates.'}
                                    </div>
                                </div>
                            </div>

                            {/* Social Preview */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <Share2 className="h-3 w-3" /> Social Media Card
                                </div>
                                <div className="overflow-hidden rounded-2xl border bg-background shadow-md max-w-[500px]">
                                    <div className="h-56 bg-muted flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10">
                                        {meta.image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={meta.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                                                <Layout className="h-10 w-10" />
                                                <span className="text-sm font-bold">Image Preview</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10 uppercase tracking-widest">
                                            <Twitter className="h-3 w-3" /> Preview
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-1 border-t">
                                        <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">{new URL(meta.url || 'https://example.com').hostname}</div>
                                        <div className="font-bold text-lg truncate">{meta.ogTitle || meta.title || 'Page Title'}</div>
                                        <div className="text-sm text-muted-foreground line-clamp-1">{meta.ogDescription || meta.description || 'Page description for social platforms...'}</div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="code" className="mt-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="relative group">
                                <Button
                                    className="absolute top-4 right-4 z-20 h-10 px-4 rounded-xl shadow-lg"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                    {copied ? 'Copied!' : 'Copy Metadata'}
                                </Button>
                                <pre className="p-8 bg-zinc-950 text-purple-300 rounded-3xl font-mono text-xs sm:text-sm min-h-[500px] shadow-2xl relative overflow-auto border border-white/5 whitespace-pre">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
                                    {generateCode()}
                                </pre>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
