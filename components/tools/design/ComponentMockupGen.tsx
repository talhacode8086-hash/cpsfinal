'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Laptop, Smartphone, Monitor, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

const ComponentMockupGen = () => {
    const [device, setDevice] = useState('laptop');
    const [theme, setTheme] = useState('dark');
    const [accentColor, setAccentColor] = useState('#6366f1');

    const devices = {
        laptop: { icon: <Laptop className="w-4 h-4" />, name: 'MacBook Air' },
        phone: { icon: <Smartphone className="w-4 h-4" />, name: 'iPhone 15 Pro' },
        desktop: { icon: <Monitor className="w-4 h-4" />, name: 'Studio Display' }
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Laptop className="w-6 h-6 text-indigo-500" />
                    Component Mockup Generator
                </CardTitle>
                <CardDescription>Present your web components in realistic CSS-based device frames</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Device Frame</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.entries(devices).map(([id, info]) => (
                                        <Button
                                            key={id}
                                            variant={device === id ? 'secondary' : 'outline'}
                                            onClick={() => setDevice(id)}
                                            className="gap-2 h-12"
                                        >
                                            {info.icon} <span className="text-xs">{info.name}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>UI Theme</Label>
                                    <Select value={theme} onValueChange={setTheme}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light Mode</SelectItem>
                                            <SelectItem value="dark">Dark Mode</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Accent Color</Label>
                                    <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-10 p-1 bg-transparent rounded" />
                                </div>
                            </div>
                        </section>

                        <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl text-[10px] space-y-2 border dark:border-zinc-700">
                            <p className="font-bold uppercase tracking-wider opacity-60">Export Options</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 text-[10px] h-8">
                                    <Copy className="w-3 h-3 mr-2" /> CSS Frame
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-[10px] h-8 text-rose-500 hover:text-rose-600">
                                    <Download className="w-3 h-3 mr-2" /> SVG Mockup
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-8 bg-zinc-100 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 min-h-[400px]">
                        {/* CSS Based Laptop Mockup */}
                        {device === 'laptop' && (
                            <div className="w-full max-w-sm aspect-[16/10] bg-zinc-800 rounded-xl p-2 relative shadow-2xl transition-all duration-500">
                                <div className={`w-full h-full rounded-lg overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
                                    <div className="h-6 border-b border-zinc-500/20 px-3 flex items-center gap-1.5 shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 p-4 space-y-3">
                                        <div className="h-4 w-2/3 rounded-full" style={{ backgroundColor: `${accentColor}33` }} />
                                        <div className="space-y-1.5">
                                            <div className="h-2 w-full bg-zinc-500/10 rounded" />
                                            <div className="h-2 w-full bg-zinc-500/10 rounded" />
                                            <div className="h-2 w-5/6 bg-zinc-500/10 rounded" />
                                        </div>
                                        <div className="pt-4 grid grid-cols-2 gap-3">
                                            <div className="h-20 rounded-xl border-2 border-dashed border-zinc-500/20" />
                                            <div className="h-20 rounded-xl border-2 border-dashed border-zinc-500/20" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] h-2 bg-zinc-700 rounded-full" />
                            </div>
                        )}

                        {device === 'phone' && (
                            <div className="w-48 aspect-[9/19] bg-zinc-900 rounded-[3rem] p-3 relative shadow-2xl border-4 border-zinc-800 transition-all duration-500">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-xl z-10" />
                                <div className={`w-full h-full rounded-[2.2rem] overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
                                    <div className="flex-1 p-6 space-y-4">
                                        <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: accentColor }} />
                                        <div className="h-3 w-3/4 bg-zinc-500/20 rounded-full mx-auto" />
                                        <div className="h-2 w-1/2 bg-zinc-500/10 rounded-full mx-auto" />
                                        <div className="pt-8 space-y-2">
                                            <div className="h-10 rounded-xl" style={{ backgroundColor: `${accentColor}22` }} />
                                            <div className="h-10 rounded-xl border border-zinc-500/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {device === 'desktop' && (
                            <div className="w-full aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1.5 relative shadow-2xl border border-zinc-300 dark:border-zinc-700 transition-all duration-500">
                                <div className={`w-full h-full rounded overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
                                    <div className="p-4 flex gap-4">
                                        <div className="w-1/4 space-y-2">
                                            <div className="h-8 rounded" style={{ backgroundColor: accentColor }} />
                                            <div className="h-2 bg-zinc-500/10 rounded w-full" />
                                            <div className="h-2 bg-zinc-500/10 rounded w-full" />
                                        </div>
                                        <div className="flex-1 grid grid-cols-3 gap-2">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="aspect-square bg-zinc-500/5 rounded border border-zinc-500/10" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-zinc-400 dark:bg-zinc-700" />
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-2 bg-zinc-400 dark:bg-zinc-700 rounded-full" />
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ComponentMockupGen;
