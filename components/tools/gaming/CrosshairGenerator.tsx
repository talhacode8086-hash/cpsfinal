'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Crosshair, Copy, RotateCcw, Share2, Check, Flame, Target, Monitor, Globe, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const PRESETS = [
    { name: 'TenZ', size: 4, thickness: 2, gap: -2, outline: 0, color: '#00ffff', dot: false },
    { name: 's1mple', size: 2, thickness: 1, gap: 1, outline: 0, color: '#ffff00', dot: false },
    { name: 'ZywOo', size: 3, thickness: 1.5, gap: 2, outline: 0, color: '#00ff00', dot: true },
    { name: 'Shroud', size: 3, thickness: 2, gap: 0, outline: 1, color: '#ffffff', dot: false },
    { name: 'Circle', size: 0, thickness: 2, gap: 2, outline: 0, color: '#ff0000', dot: false },
];

const SCENES = [
    { name: 'Dust II (CS2)', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070' },
    { name: 'Ascent (Valorant)', url: 'https://images.unsplash.com/photo-1614054285816-178a19c4002e?q=80&w=2070' },
    { name: 'King’s Row (OW)', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070' },
    { name: 'Uniform Green', url: '' },
];

export default function CrosshairGenerator() {
    const [config, setConfig] = useState({
        size: 10,
        thickness: 2,
        gap: 4,
        outline: 1,
        color: '#00ff00',
        dot: false,
        opacity: 1,
    });
    const [activeScene, setActiveScene] = useState(SCENES[0]);
    const [copied, setCopied] = useState(false);

    const copySettings = (game: string) => {
        let code = '';
        if (game === 'cs2') {
            code = `cl_crosshairsize ${config.size}; cl_crosshairthickness ${config.thickness}; cl_crosshairgap ${config.gap}; cl_crosshair_drawoutline ${config.outline > 0 ? 1 : 0}; cl_crosshairdot ${config.dot ? 1 : 0};`;
        } else {
            code = `Inner Lines: ${config.opacity}/ ${config.size}/ ${config.thickness}/ ${config.gap} | Outlines: ${config.outline > 0 ? 'On' : 'Off'} | Dot: ${config.dot ? 'On' : 'Off'}`;
        }
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Configuration Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-primary/10 shadow-xl rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Crosshair className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Configuration</CardTitle>
                                    <CardDescription className="text-xs">Precision tuning</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                {[
                                    { label: 'Length', key: 'size', max: 30, step: 1 },
                                    { label: 'Thickness', key: 'thickness', max: 10, step: 0.5 },
                                    { label: 'Gap', key: 'gap', min: -10, max: 20, step: 1 },
                                    { label: 'Outline', key: 'outline', max: 5, step: 1 },
                                ].map((s) => (
                                    <div key={s.key} className="space-y-3">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider opacity-60">
                                            <Label>{s.label}</Label>
                                            <span className="text-primary">{(config as any)[s.key]}</span>
                                        </div>
                                        <Slider
                                            value={[(config as any)[s.key]]}
                                            min={s.min || 0}
                                            max={s.max}
                                            step={s.step}
                                            onValueChange={([v]) => setConfig({ ...config, [s.key]: v })}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-wider opacity-60">Color Palette</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['#00ff00', '#ff0000', '#00ffff', '#ffff00', '#ffffff', '#ff00ff', '#000000'].map(c => (
                                        <button
                                            key={c}
                                            className={`w-8 h-8 rounded-lg border-2 transition-all ${config.color === c ? 'scale-110 border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setConfig({ ...config, color: c })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border">
                                <div className="space-y-0.5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Center Dot</Label>
                                    <p className="text-[9px] text-muted-foreground">Add a focus point</p>
                                </div>
                                <Button
                                    variant={config.dot ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-xl px-4 h-8 text-[10px] font-black"
                                    onClick={() => setConfig({ ...config, dot: !config.dot })}
                                >
                                    {config.dot ? 'ENABLED' : 'DISABLED'}
                                </Button>
                            </div>

                            <Button variant="ghost" className="w-full text-xs opacity-50 hover:opacity-100" onClick={() => setConfig({ size: 10, thickness: 2, gap: 4, outline: 1, color: '#00ff00', dot: false, opacity: 1 })}>
                                <RotateCcw className="h-3 w-3 mr-2" /> Reset Defaults
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-primary/5 bg-secondary/10 shadow-inner p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Pro Presets</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {PRESETS.map(p => (
                                <Button
                                    key={p.name}
                                    variant="outline"
                                    size="sm"
                                    className="h-9 rounded-xl text-[10px] font-bold border-primary/10 hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => setConfig({ ...config, ...p })}
                                >
                                    {p.name}
                                </Button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Preview and Export */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="border-2 border-primary/20 rounded-[3rem] overflow-hidden shadow-2xl relative h-[600px] group">
                        {/* Background Scene */}
                        <div className="absolute inset-0 z-0 bg-neutral-900 transition-all duration-500 overflow-hidden">
                            {activeScene.url ? (
                                <img src={activeScene.url} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Game Scene" />
                            ) : (
                                <div className="w-full h-full bg-green-500/20" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        </div>

                        {/* Presets and Controls Overlay */}
                        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
                            <div className="flex gap-2 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10">
                                {SCENES.map(s => (
                                    <Button
                                        key={s.name}
                                        variant="ghost"
                                        size="sm"
                                        className={`h-8 rounded-xl px-4 text-[10px] font-black tracking-tight ${activeScene.name === s.name ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                                        onClick={() => setActiveScene(s)}
                                    >
                                        <ImageIcon className="h-3 w-3 mr-2" />
                                        {s.name.split(' ')[0]}
                                    </Button>
                                ))}
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 bg-black/40 text-white rounded-full">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* THE CROSSHAIR */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                            <div className="relative" style={{ filter: config.outline > 0 ? `drop-shadow(0 0 ${config.outline}px black)` : 'none' }}>
                                {/* Vertical Lines */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-[calc(var(--gap)*2)]" style={{ '--gap': `${config.gap}px` } as any}>
                                    <div style={{ width: config.thickness, height: config.size, backgroundColor: config.color, transform: 'translateY(-50%)' }} />
                                    <div style={{ width: config.thickness, height: config.size, backgroundColor: config.color, transform: 'translateY(50%)' }} />
                                </div>
                                {/* Horizontal Lines */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[calc(var(--gap)*2)]" style={{ '--gap': `${config.gap}px` } as any}>
                                    <div style={{ height: config.thickness, width: config.size, backgroundColor: config.color, transform: 'translateX(-50%)' }} />
                                    <div style={{ height: config.thickness, width: config.size, backgroundColor: config.color, transform: 'translateX(50%)' }} />
                                </div>
                                {/* Dot */}
                                {config.dot && (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                        style={{ width: config.thickness, height: config.thickness, backgroundColor: config.color }} />
                                )}
                            </div>
                        </div>

                        {/* Export Panel */}
                        <div className="absolute bottom-10 left-10 right-10 z-20">
                            <Tabs defaultValue="cs2" className="w-full">
                                <TabsList className="bg-black/60 backdrop-blur-2xl p-1 rounded-2xl border border-white/20 mb-4 h-12 shadow-2xl">
                                    <TabsTrigger value="cs2" className="flex-1 rounded-xl font-black text-xs data-[state=active]:bg-white data-[state=active]:text-black">COUNTER-STRIKE 2</TabsTrigger>
                                    <TabsTrigger value="valorant" className="flex-1 rounded-xl font-black text-xs data-[state=active]:bg-white data-[state=active]:text-black">VALORANT / APEX</TabsTrigger>
                                </TabsList>
                                {['cs2', 'valorant'].map(game => (
                                    <TabsContent key={game} value={game} className="animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex gap-3">
                                            <div className="flex-1 bg-black/60 backdrop-blur-2xl px-6 h-14 rounded-2xl flex items-center border border-white/20 overflow-hidden">
                                                <code className="text-white font-mono text-[10px] truncate opacity-80 uppercase tracking-wider">
                                                    {game === 'cs2' ? `cl_crosshairsize ${config.size}; cl_crosshairthickness ${config.thickness}...` : `VAL-CROSS-${config.size}-${config.thickness}-${config.gap}-${config.outline}`}
                                                </code>
                                            </div>
                                            <Button size="lg" className="h-14 rounded-2xl px-8 font-black shadow-xl" onClick={() => copySettings(game)}>
                                                {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                                                {copied ? 'OK!' : 'COPY'}
                                            </Button>
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="rounded-[2rem] border-primary/10 bg-muted/20 p-6 flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><Target className="h-5 w-5" /></div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Precision</h4>
                                <p className="text-[9px] text-muted-foreground">Pixel-perfect scaling for high res monitors</p>
                            </div>
                        </Card>
                        <Card className="rounded-[2rem] border-primary/10 bg-muted/20 p-6 flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><Globe className="h-5 w-5" /></div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Universal</h4>
                                <p className="text-[9px] text-muted-foreground">Compatible with all major FPS titles</p>
                            </div>
                        </Card>
                        <Card className="rounded-[2rem] border-primary/10 bg-muted/20 p-6 flex items-center gap-4">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><Monitor className="h-5 w-5" /></div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Live Scenes</h4>
                                <p className="text-[9px] text-muted-foreground">Test against real in-game geometry</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
