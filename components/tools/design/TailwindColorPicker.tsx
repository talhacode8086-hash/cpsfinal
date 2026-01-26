'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TailwindColorPicker() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    const tailwindColors: Record<string, string[]> = {
        slate: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"],
        red: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"],
        orange: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"],
        amber: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"],
        yellow: ["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"],
        lime: ["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"],
        green: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"],
        emerald: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#064e3b", "#064e3b", "#022c22"],
        teal: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"],
        cyan: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"],
        sky: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"],
        blue: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
        indigo: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#1e1b4b"],
        violet: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"],
        purple: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"],
        fuchsia: ["#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"],
        pink: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"],
        rose: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"]
    };

    const copyColor = (hex: string) => {
        navigator.clipboard.writeText(hex.toUpperCase());
        setCopied(hex);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Palette className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Tailwind Color Picker</CardTitle>
                <p className="text-muted-foreground mt-2">Instant access to the complete Tailwind CSS official color palette.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="relative max-w-xl mx-auto mb-12">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary opacity-30" />
                    <Input
                        placeholder="Search colors (blue, red, slate...)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        className="h-16 pl-14 rounded-2xl bg-muted/20 border-primary/10 text-lg font-bold"
                    />
                </div>

                <div className="space-y-12">
                    {Object.entries(tailwindColors).filter(([name]) => name.includes(search)).map(([name, shades]) => (
                        <div key={name} className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">{name}</h4>
                            <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                                {shades.map((hex, i) => (
                                    <button
                                        key={i}
                                        onClick={() => copyColor(hex)}
                                        className="group relative flex flex-col items-center gap-2 aspect-square rounded-2xl transition-all hover:scale-110 shadow-lg active:scale-95"
                                        style={{ backgroundColor: hex }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            {copied === hex && <Check className="h-6 w-6 text-white drop-shadow-md" />}
                                        </div>
                                        <span className={`absolute -bottom-6 text-[8px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${i > 5 ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {i === 0 ? '50' : i === 10 ? '950' : i * 100}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
