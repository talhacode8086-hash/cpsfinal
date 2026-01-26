'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, Plus, Trash2, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SpriteSheetGen() {
    const [images, setImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImages(prev => [...prev, ev.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImg = (idx: number) => {
        setImages(images.filter((_, i) => i !== idx));
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Grid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Sprite Sheet Maker</CardTitle>
                <p className="text-muted-foreground mt-2">Pack multiple assets into a single texture atlas for gaming and web optimization.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {images.map((img, i) => (
                        <div key={i} className="relative group aspect-square bg-muted/20 rounded-3xl border-2 border-primary/5 flex items-center justify-center p-4">
                            <img src={img} className="max-w-full max-h-full rounded-lg" />
                            <button
                                onClick={() => removeImg(i)}
                                className="absolute -top-2 -right-2 bg-destructive text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => document.getElementById('sprite-upload')?.click()}
                        className="aspect-square border-4 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-all text-primary/40 hover:text-primary"
                    >
                        <Plus className="h-10 w-10" />
                        <span className="text-[10px] font-black uppercase">Add Asset</span>
                    </button>
                    <input id="sprite-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
                </div>

                {images.length > 0 && (
                    <div className="p-12 rounded-[3.5rem] bg-primary text-white shadow-3xl shadow-primary/30 space-y-8">
                        <Box className="h-16 w-16 mx-auto opacity-20" />
                        <div>
                            <h3 className="text-4xl font-black">{images.length} Assets Loaded</h3>
                            <p className="text-sm font-bold opacity-60 mt-2 text-white/50">Ready to pack into optimized sprite sheet</p>
                        </div>
                        <Button className="h-20 px-16 rounded-[2rem] bg-white text-primary text-xl font-black hover:bg-white/90">
                            PACK & DOWNLOAD SHEET
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
