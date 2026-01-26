'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Plus, Trash2, FileCode, Check, Globe, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface SitemapURL {
    url: string;
    priority: string;
    freq: string;
}

export default function SitemapGenerator() {
    const [urls, setUrls] = useState<SitemapURL[]>([
        { url: 'https://example.com/', priority: '1.0', freq: 'daily' }
    ]);
    const [batchText, setBatchText] = useState('');
    const [xmlOutput, setXmlOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const addBatchUrls = () => {
        const newUrls = batchText
            .split('\n')
            .map(u => u.trim())
            .filter(u => u && u.startsWith('http'))
            .map(u => ({ url: u, priority: '0.8', freq: 'weekly' }));

        setUrls([...urls, ...newUrls]);
        setBatchText('');
    };

    const removeUrl = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const updateUrl = (index: number, field: keyof SitemapURL, value: string) => {
        const next = [...urls];
        next[index] = { ...next[index], [field]: value };
        setUrls(next);
    };

    const generateSitemap = () => {
        const date = new Date().toISOString().split('T')[0];
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        urls.forEach(u => {
            xml += `  <url>\n`;
            xml += `    <loc>${u.url}</loc>\n`;
            xml += `    <lastmod>${date}</lastmod>\n`;
            xml += `    <changefreq>${u.freq}</changefreq>\n`;
            xml += `    <priority>${u.priority}</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;
        setXmlOutput(xml);
    };

    const downloadSitemap = () => {
        const blob = new Blob([xmlOutput], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-12">
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-primary/5 border border-primary/10 mb-8">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-primary">SEO Pro Tip</h4>
                            <p className="text-sm text-muted-foreground">Internal sitemaps help Google discover your architecture faster. Keep your URL count under 50,000 per file.</p>
                        </div>
                    </div>
                </div>

                {/* Configuration Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="border-primary/10 shadow-xl rounded-3xl overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5 text-primary" />
                                Batch Import
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <Textarea
                                placeholder="Paste one URL per line..."
                                value={batchText}
                                onChange={(e) => setBatchText(e.target.value)}
                                className="min-h-[150px] rounded-2xl font-mono text-xs"
                            />
                            <Button onClick={addBatchUrls} className="w-full h-11 rounded-xl">
                                Add to List
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="relative group">
                        <Button
                            className="w-full h-16 rounded-[2rem] text-lg font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                            onClick={generateSitemap}
                        >
                            <FileCode className="mr-3 h-6 w-6" />
                            Build XML Sitemap
                        </Button>
                    </div>
                </div>

                {/* URL List and Output */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-muted/20 rounded-3xl border border-primary/5 p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <Label className="text-sm font-black uppercase tracking-widest opacity-70">URL Configuration ({urls.length})</Label>
                            <button onClick={() => setUrls([])} className="text-xs text-destructive font-bold hover:underline">Clear All</button>
                        </div>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {urls.map((u, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-2xl bg-background border shadow-sm space-y-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-primary shrink-0" />
                                            <Input
                                                value={u.url}
                                                onChange={(e) => updateUrl(i, 'url', e.target.value)}
                                                className="border-none shadow-none focus-visible:ring-0 font-medium px-0 truncate"
                                            />
                                            <Button variant="ghost" size="icon" onClick={() => removeUrl(i)} className="shrink-0 text-destructive hover:bg-destructive/10">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 pt-2 border-t mt-2">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase opacity-50">Priority</label>
                                                <Select value={u.priority} onValueChange={(v) => updateUrl(i, 'priority', v)}>
                                                    <SelectTrigger className="h-8 text-xs rounded-lg">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1.0">1.0 (Critical)</SelectItem>
                                                        <SelectItem value="0.8">0.8 (Important)</SelectItem>
                                                        <SelectItem value="0.5">0.5 (Normal)</SelectItem>
                                                        <SelectItem value="0.1">0.1 (Low)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase opacity-50">Frequency</label>
                                                <Select value={u.freq} onValueChange={(v) => updateUrl(i, 'freq', v)}>
                                                    <SelectTrigger className="h-8 text-xs rounded-lg">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="always">Always</SelectItem>
                                                        <SelectItem value="hourly">Hourly</SelectItem>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {xmlOutput && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-bold opacity-70 flex items-center gap-2">
                                    <FileCode className="h-4 w-4" />
                                    XML Structure
                                </Label>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={downloadSitemap} className="rounded-xl h-9">
                                        <Download className="h-3.5 w-3.5 mr-2" /> Download
                                    </Button>
                                    <Button size="sm" onClick={() => {
                                        navigator.clipboard.writeText(xmlOutput);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }} className="rounded-xl h-9">
                                        {copied ? <Check className="h-3.5 w-3.5 mr-2" /> : <Copy className="h-3.5 w-3.5 mr-2" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                            <pre className="p-6 bg-zinc-950 text-zinc-400 rounded-3xl font-mono text-xs overflow-auto max-h-[400px] border border-white/5 shadow-2xl">
                                {xmlOutput}
                            </pre>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
