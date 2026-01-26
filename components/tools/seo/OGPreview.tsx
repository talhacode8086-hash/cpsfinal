'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Share2, Eye } from 'lucide-react';

export default function OGPreview() {
    const [data, setData] = useState({
        title: 'Your Premium Website Title',
        description: 'This is an example of how your link will look when shared on social media platforms like Facebook, Twitter, and LinkedIn.',
        url: 'example.com',
        image: 'https://images.unsplash.com/photo-1614332284683-51ebe9023c5a?w=800&auto=format&fit=crop'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-primary" />
                        Card Data
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input name="title" value={data.title} onChange={handleChange} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label>Meta Description</Label>
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                className="w-full min-h-[100px] rounded-xl border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input name="image" value={data.image} onChange={handleChange} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label>Site URL</Label>
                            <Input name="url" value={data.url} onChange={handleChange} className="rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Live Previews
                </h3>

                {/* Facebook Preview */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Facebook Card</p>
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden max-w-md mx-auto">
                        <div className="h-48 overflow-hidden bg-muted">
                            <img src={data.image} alt="OG Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 bg-[#f2f3f5]">
                            <p className="text-[11px] text-[#606770] uppercase uppercase truncate">{data.url}</p>
                            <p className="text-[17px] font-bold text-[#1d2129] leading-tight line-clamp-2 mt-1">{data.title}</p>
                            <p className="text-[14px] text-[#606770] leading-snug line-clamp-2 mt-1">{data.description}</p>
                        </div>
                    </div>
                </div>

                {/* Twitter/X Preview */}
                <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Twitter (Large Summary)</p>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden max-w-md mx-auto relative group">
                        <div className="h-52 bg-muted relative">
                            <img src={data.image} alt="OG Preview" className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[11px] text-white">
                                {data.url}
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-[15px] font-bold text-black border-none p-0 bg-transparent">{data.title}</p>
                            <p className="text-[14px] text-[#536471] leading-tight mt-1 line-clamp-2">{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
