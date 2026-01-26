'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Upload, Trash2, Database, MapPin, Camera, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EXIFViewer() {
    const [image, setImage] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<any>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            // In a real app, we would use an EXIF parser library here like exif-js
            // Mocking the result for demonstration
            setMetadata({
                'Camera Model': 'Sony Alpha A7 IV',
                'Lens': 'FE 24-70mm F2.8 GM II',
                'ISO': '400',
                'Shutter Speed': '1/500s',
                'Aperture': 'f/2.8',
                'Focal Length': '35mm',
                'Created': '2024-03-15 14:30:22',
                'Size': `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                'Dimensions': '6000 x 4000',
                'GPS': '40.7128° N, 74.0060° W'
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Info className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">EXIF Metadata Viewer</CardTitle>
                <p className="text-muted-foreground mt-2">Extract hidden camera settings, location, and technical info from your photos.</p>
            </CardHeader>
            <CardContent className="p-12">
                {!image ? (
                    <div
                        className="h-96 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('exif-upload')?.click()}
                    >
                        <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="h-10 w-10 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold">Drop your image here</p>
                            <p className="text-sm text-muted-foreground">Supports JPG/JPEG for metadata extraction</p>
                        </div>
                        <input id="exif-upload" type="file" accept="image/jpeg" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1 flex flex-col gap-6">
                            <img src={image} className="w-full h-auto rounded-[3rem] shadow-4xl border-4 border-primary/5" alt="Preview" />
                            <Button variant="destructive" onClick={() => { setImage(null); setMetadata(null); }} className="h-16 rounded-2xl font-black">
                                <Trash2 className="mr-2" /> DISCARD PHOTO
                            </Button>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/5 p-4 rounded-xl border border-primary/10 mb-6">
                                <Database className="h-4 w-4" />
                                <span>Technical Specifications</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {Object.entries(metadata).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between p-6 rounded-2xl bg-muted/20 border border-primary/5 group hover:border-primary/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            {getItemIcon(key)}
                                            <span className="text-xs font-bold text-muted-foreground uppercase">{key}</span>
                                        </div>
                                        <span className="text-lg font-black text-primary">{val as string}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function getItemIcon(key: string) {
    switch (key) {
        case 'Camera Model': return <Camera className="h-5 w-5 opacity-30" />;
        case 'Created': return <Clock className="h-5 w-5 opacity-30" />;
        case 'GPS': return <MapPin className="h-5 w-5 opacity-30" />;
        default: return <Database className="h-5 w-5 opacity-30" />;
    }
}
