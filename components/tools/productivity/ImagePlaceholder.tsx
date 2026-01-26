'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ImagePlaceholder() {
    const [width, setWidth] = useState<number>(1200);
    const [height, setHeight] = useState<number>(630);
    const [text, setText] = useState('');
    const [bg, setBg] = useState('6366f1');
    const [color, setColor] = useState('ffffff');

    const url = `https://placehold.co/${width}x${height}/${bg}/${color}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast.success('Image Link copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Image Placeholder Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Generate custom placeholder images for your web projects.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="relative group rounded-2xl overflow-hidden border border-primary/10 bg-muted shadow-inner flex items-center justify-center min-h-[300px]">
                    <img
                        src={url}
                        alt="Placeholder Preview"
                        className="max-w-full h-auto transition-all group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                        <Button variant="outline" className="rounded-xl border-white text-white hover:bg-white/10" onClick={() => window.open(url, '_blank')}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open in New Tab
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Width</label>
                        <Input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value) || 0)} className="rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Height</label>
                        <Input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value) || 0)} className="rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Background</label>
                        <Input value={bg} onChange={e => setBg(e.target.value.replace('#', ''))} className="rounded-xl font-mono" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Text Color</label>
                        <Input value={color} onChange={e => setColor(e.target.value.replace('#', ''))} className="rounded-xl font-mono" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom Text (Optional)</label>
                    <Input placeholder="Leave empty for dimensions..." value={text} onChange={e => setText(e.target.value)} className="rounded-xl" />
                </div>

                <div className="flex gap-4">
                    <Button className="flex-1 h-12 rounded-xl font-black shadow-lg shadow-primary/20" onClick={handleCopy}>
                        <Copy className="mr-2 h-5 w-5" />
                        Copy Image URL
                    </Button>
                    <Button variant="outline" className="h-12 w-12 rounded-xl" onClick={() => { setBg('6366f1'); setColor('ffffff'); }}>
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-primary/5 font-mono text-xs break-all text-center">
                    {url}
                </div>
            </CardContent>
        </Card>
    );
}
