'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const FlatUIColors = () => {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const palettes = [
        {
            name: 'Spanish Palette',
            colors: [
                { name: 'Jacksons Purple', hex: '#40407a' }, { name: 'C64 Purple', hex: '#706fd3' }, { name: 'Swan White', hex: '#f7f1e3' }, { name: 'Summer Sky', hex: '#34ace0' }, { name: 'Celestial Blue', hex: '#33d9b2' },
                { name: 'Lucky Point', hex: '#2c2c54' }, { name: 'Liberty', hex: '#474787' }, { name: 'Hot Stone', hex: '#aaa69d' }, { name: 'Devil Blue', hex: '#227093' }, { name: 'Palm Springs', hex: '#218c74' },
                { name: 'Fluorescent Red', hex: '#ff5252' }, { name: 'Synthetic Pumpkin', hex: '#ff793f' }, { name: 'Crocodile Tooth', hex: '#d1ccc0' }, { name: 'Mandarin Sorbet', hex: '#ffb142' }, { name: 'Spiced Butter', hex: '#ffda79' },
                { name: 'Eye Of Newt', hex: '#b33939' }, { name: 'Chilean Fire', hex: '#cd6133' }, { name: 'Grey Porcelain', hex: '#84817a' }, { name: 'Tiger Orange', hex: '#cc8e35' }, { name: 'Desert', hex: '#ccae62' }
            ]
        },
        {
            name: 'American Palette',
            colors: [
                { name: 'Light Greenish Blue', hex: '#55efc4' }, { name: 'Faded Poster', hex: '#81ecec' }, { name: 'Green Darner Tail', hex: '#74b9ff' }, { name: 'Shy Moment', hex: '#a29bfe' }, { name: 'City Lights', hex: '#dfe6e9' },
                { name: 'Mint Leaf', hex: '#00b894' }, { name: 'Robins Egg Blue', hex: '#00cec9' }, { name: 'Electron Blue', hex: '#0984e3' }, { name: 'Exodus Fruit', hex: '#6c5ce7' }, { name: 'Soothing Breeze', hex: '#b2bec3' },
                { name: 'Sour Lemon', hex: '#ffeaa7' }, { name: 'First Date', hex: '#fab1a0' }, { name: 'Pink Glamour', hex: '#ff7675' }, { name: 'Pico Pink', hex: '#fd79a8' }, { name: 'American River', hex: '#636e72' },
                { name: 'Bright Yarrow', hex: '#fdcb6e' }, { name: 'Orange Ville', hex: '#e17055' }, { name: 'Chi-Gong', hex: '#d63031' }, { name: 'Prunus Avium', hex: '#e84393' }, { name: 'Dracula Orchid', hex: '#2d3436' }
            ]
        },
        {
            name: 'German Palette',
            colors: [
                { name: 'Fusion Red', hex: '#fc5c65' }, { name: 'Orange Hibiscus', hex: '#fd9644' }, { name: 'Flirtatious', hex: '#fed330' }, { name: 'Reptile Green', hex: '#26de81' }, { name: 'Maximum Blue Green', hex: '#2bcbba' },
                { name: 'Desire', hex: '#eb3b5a' }, { name: 'Beniukon Orange', hex: '#fa8231' }, { name: 'NYC Taxi', hex: '#f7b731' }, { name: 'Algae Green', hex: '#20bf6b' }, { name: 'Blue Horizon', hex: '#0fb9b1' },
                { name: 'Gloomy Purple', hex: '#8854d0' }, { name: 'Boyzone', hex: '#45aaf2' }, { name: 'Royal Blue', hex: '#4b7bec' }, { name: 'Dapple Grey', hex: '#a5b1c2' }, { name: 'Innuendo', hex: '#778ca3' },
                { name: 'Highlighter Lavender', hex: '#a55eea' }, { name: 'Twinkle Blue', hex: '#2d98da' }, { name: 'C64 Blue', hex: '#3867d6' }, { name: 'Blue Grey', hex: '#4b6584' }, { name: 'Livid', hex: '#4b6584' }
            ]
        }
    ];

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex.toUpperCase());
        setCopiedColor(hex);
        toast.success(`Copied ${hex.toUpperCase()}`);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <Card className="w-full max-w-6xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Palette className="w-6 h-6 text-pink-500" />
                    Flat UI Colors
                </CardTitle>
                <CardDescription>Handpicked color palettes for flat design interfaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
                {palettes.map((palette) => (
                    <section key={palette.name} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                            <h3 className="text-xl font-bold">{palette.name}</h3>
                            <span className="text-xs text-muted-foreground">{palette.colors.length} Colors</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                            {palette.colors.map((color) => (
                                <button
                                    key={color.hex}
                                    onClick={() => copyToClipboard(color.hex)}
                                    className="group flex flex-col items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 text-left"
                                >
                                    <div
                                        className="w-full h-24 rounded-2xl shadow-sm border border-black/5 relative overflow-hidden"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            {copiedColor === color.hex ? (
                                                <Check className="w-8 h-8 text-white drop-shadow-md" />
                                            ) : (
                                                <Copy className="w-8 h-8 text-white drop-shadow-md" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full px-1">
                                        <div className="text-[10px] font-black uppercase tracking-tighter opacity-70 truncate">{color.name}</div>
                                        <div className="text-xs font-mono font-bold">{color.hex.toUpperCase()}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </CardContent>
        </Card>
    );
};

export default FlatUIColors;
