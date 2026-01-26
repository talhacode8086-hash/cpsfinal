'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, FileType, Copy, Code, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const mimeTypes: Record<string, string> = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'zip': 'application/zip',
    'mp3': 'audio/mpeg',
    'mp4': 'video/mp4',
    'txt': 'text/plain',
    'xml': 'application/xml',
    'ico': 'image/x-icon',
    'webp': 'image/webp',
    'csv': 'text/csv',
    'md': 'text/markdown',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'exe': 'application/octet-stream',
    'bin': 'application/octet-stream',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'wasm': 'application/wasm',
    'epub': 'application/epub+zip',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    '7z': 'application/x-7z-compressed',
    'mjs': 'application/javascript'
};

export default function MimeTypeLookup() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const filtered = Object.entries(mimeTypes).filter(([ext, mime]) =>
        ext.includes(search.toLowerCase()) || mime.includes(search.toLowerCase())
    ).slice(0, 15);

    const copyToClipboard = (val: string) => {
        navigator.clipboard.writeText(val);
        setCopied(val);
        toast.info(`Copied: ${val}`);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 p-4">
            <div className="flex flex-col items-center space-y-6">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-2xl relative">
                    <div className="absolute inset-0 rounded-[2rem] bg-primary animate-pulse opacity-10" />
                    <FileType className="h-10 w-10 relative z-10" />
                </div>

                <div className="w-full max-w-xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search extension (png, pdf) or mime type (text/html)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-16 pl-12 pr-6 rounded-3xl border-primary/20 bg-muted/30 text-lg font-medium shadow-inner outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary shadow-glow-sm"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.length > 0 ? (
                        filtered.map(([ext, mime]) => (
                            <motion.div
                                key={ext}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                            >
                                <Card className="group rounded-[1.5rem] border-primary/5 bg-background hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                                    <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center font-black text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                .{ext.toUpperCase()}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-lg font-black tracking-tight">{mime}</div>
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                    <FileText className="h-3 w-3" /> Standard Format
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(mime)}
                                                className="rounded-xl h-10 px-4 font-bold"
                                            >
                                                {copied === mime ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                                Copy MIME
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-20 text-center space-y-4">
                            <div className="text-4xl">🔎</div>
                            <p className="text-muted-foreground font-medium">No MIME types found for your search.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-10 rounded-[4rem] bg-primary/5 border border-primary/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="space-y-2 flex-1">
                    <h5 className="text-2xl font-black uppercase tracking-tighter italic">Developers Corner</h5>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
                        Use these MIME types in your HTTP headers or HTML "accept" attributes for perfect file handling.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="p-6 rounded-3xl bg-background shadow-xl border border-primary/5 transform rotate-3 hover:rotate-0 transition-transform">
                        <Code className="h-6 w-6 text-primary mb-2" />
                        <div className="text-[10px] font-black uppercase text-muted-foreground">Example Header</div>
                        <div className="text-xs font-mono font-bold">Content-Type: image/png</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
