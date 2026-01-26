'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FaviconGeneratorPro() {
    const [img, setImg] = useState('https://images.unsplash.com/photo-1614850523296-d8c1af93d400');

    const sizes = [
        { name: 'Standard', size: '16x16' },
        { name: 'Retina', size: '32x32' },
        { name: 'Apple Touch', size: '180x180' },
        { name: 'Android', size: '192x192' },
    ];

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Favicon Generator Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Convert any logo into a full set of icons for browsers and mobile OS.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="p-12 rounded-[3.5rem] bg-muted/10 border-4 border-dashed border-primary/10 flex flex-col items-center justify-center text-center">
                            <img src={img} className="w-24 h-24 rounded-2xl object-cover mb-6 border-4 border-white shadow-xl" alt="Source" />
                            <Button className="rounded-xl h-12 font-bold shadow-lg">Upload New Logo</Button>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Required HTML Tags</h4>
                            <div className="p-4 rounded-xl bg-black/90 text-primary border border-primary/10 font-mono text-[9px] truncate">
                                {`<link rel="icon" href="/favicon.ico">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Generated Variation Preview</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {sizes.map(s => (
                                <div key={s.name} className="p-6 rounded-3xl bg-background border border-primary/5 flex flex-col items-center gap-3">
                                    <div className="relative border-4 border-primary/10 rounded-lg p-1 bg-white">
                                        <img src={img} className="object-cover" style={{ width: s.name === 'Standard' ? '16px' : s.name === 'Retina' ? '32px' : '64px', height: s.name === 'Standard' ? '16px' : s.name === 'Retina' ? '32px' : '64px' }} alt={s.name} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-black uppercase tracking-tighter">{s.name}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold">{s.size}px</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button size="lg" className="w-full rounded-2xl h-16 font-black gap-3 text-xl">
                    <Download className="h-6 w-6" /> Package Icons (.zip)
                </Button>
            </CardContent>
        </Card>
    );
}
