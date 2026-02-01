'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const MaterialDesignPalette = () => {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const materialColors = [
        { name: 'Red', hex: '#F44336', shades: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'] },
        { name: 'Pink', hex: '#E91E63', shades: ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F'] },
        { name: 'Purple', hex: '#9C27B0', shades: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'] },
        { name: 'Deep Purple', hex: '#673AB7', shades: ['#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92'] },
        { name: 'Indigo', hex: '#3F51B5', shades: ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'] },
        { name: 'Blue', hex: '#2196F3', shades: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'] },
        { name: 'Light Blue', hex: '#03A9F4', shades: ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'] },
        { name: 'Cyan', hex: '#00BCD4', shades: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064'] },
        { name: 'Teal', hex: '#009688', shades: ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'] },
        { name: 'Green', hex: '#4CAF50', shades: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'] },
        { name: 'Light Green', hex: '#8BC34A', shades: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'] },
        { name: 'Lime', hex: '#CDDC39', shades: ['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717'] },
        { name: 'Yellow', hex: '#FFEB3B', shades: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'] },
        { name: 'Amber', hex: '#FFC107', shades: ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00'] },
        { name: 'Orange', hex: '#FF9800', shades: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'] },
        { name: 'Deep Orange', hex: '#FF5722', shades: ['#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C'] },
        { name: 'Brown', hex: '#795548', shades: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723'] },
        { name: 'Grey', hex: '#9E9E9E', shades: ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121'] },
        { name: 'Blue Grey', hex: '#607D8B', shades: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238'] },
    ];

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex.toUpperCase());
        setCopiedColor(hex);
        toast.success(`Copied ${hex.toUpperCase()}`);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <Card className="w-full max-w-6xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Palette className="w-6 h-6 text-blue-500" />
                    Material Design Palette
                </CardTitle>
                <CardDescription>Official Google Material Design color system reference</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {materialColors.map((group) => (
                        <div key={group.name} className="flex flex-col">
                            <div
                                className="p-4 flex items-center justify-between text-white font-bold"
                                style={{ backgroundColor: group.hex }}
                            >
                                <span>{group.name}</span>
                                <span className="text-xs opacity-80 font-mono">{group.hex}</span>
                            </div>
                            <div className="flex flex-col">
                                {group.shades.map((shade, idx) => {
                                    const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
                                    const isLight = idx < 5;
                                    return (
                                        <button
                                            key={shade}
                                            onClick={() => copyToClipboard(shade)}
                                            className="group flex items-center justify-between px-4 py-2 transition-colors hover:brightness-95 active:brightness-90"
                                            style={{
                                                backgroundColor: shade,
                                                color: isLight ? '#000' : '#fff'
                                            }}
                                        >
                                            <span className="text-xs font-bold">{weights[idx]}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono opacity-0 group-hover:opacity-60 transition-opacity">
                                                    {shade.toUpperCase()}
                                                </span>
                                                {copiedColor === shade ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default MaterialDesignPalette;
