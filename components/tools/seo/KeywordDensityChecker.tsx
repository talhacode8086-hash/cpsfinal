'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Activity, BarChart3, Trash2, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const STOP_WORDS = new Set(['the', 'and', 'for', 'was', 'with', 'that', 'this', 'from', 'but', 'are', 'not', 'you', 'your', 'will', 'have', 'has', 'can', 'all', 'into', 'each']);

export default function KeywordDensityChecker() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState<any>({
        unigrams: [],
        bigrams: [],
        trigrams: []
    });
    const [analyzed, setAnalyzed] = useState(false);

    const getNgrams = (words: string[], n: number) => {
        const ngrams: Record<string, number> = {};
        for (let i = 0; i <= words.length - n; i++) {
            const gram = words.slice(i, i + n).join(' ');
            if (n === 1 && STOP_WORDS.has(gram)) continue;
            ngrams[gram] = (ngrams[gram] || 0) + 1;
        }
        return Object.entries(ngrams)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({
                word,
                count,
                percentage: ((count / (words.length - n + 1)) * 100).toFixed(1)
            }));
    };

    const analyze = () => {
        if (!text.trim()) return;

        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 1);

        setStats({
            unigrams: getNgrams(words, 1),
            bigrams: getNgrams(words, 2),
            trigrams: getNgrams(words, 3)
        });
        setAnalyzed(true);
    };

    const StatusBadge = ({ percentage }: { percentage: string }) => {
        const p = parseFloat(percentage);
        if (p > 3) return <Badge variant="destructive" className="bg-destructive/10 text-destructive text-[10px] rounded-full">Too High</Badge>;
        if (p > 1.5) return <Badge className="bg-amber-500/10 text-amber-500 text-[10px] border-amber-500/20 rounded-full">Optimal</Badge>;
        return <Badge className="bg-green-500/10 text-green-500 text-[10px] border-green-500/20 rounded-full">Good</Badge>;
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-primary/10 shadow-2xl rounded-3xl overflow-hidden bg-card/80 backdrop-blur-md">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                            <Search className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle>Content Core Audit</CardTitle>
                            <CardDescription>Advanced density and phrase frequency analyzer</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-xs font-black uppercase tracking-widest text-primary/70">Article Text</label>
                            <span className="text-[10px] font-bold opacity-50">{text.split(/\s+/).filter(Boolean).length} words</span>
                        </div>
                        <Textarea
                            placeholder="Paste your content (at least 100 words recommended for accurate analysis)..."
                            className="h-64 rounded-3xl border-primary/10 bg-muted/20 font-serif leading-relaxed text-lg focus-visible:ring-primary/20 transition-all"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <Button size="lg" className="flex-1 rounded-2xl h-14 font-black text-lg shadow-xl shadow-primary/20" onClick={analyze}>
                                <Activity className="mr-2 h-5 w-5" /> Analyze Keywords
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-2xl h-14 w-14" onClick={() => { setText(''); setAnalyzed(false); }}>
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {analyzed && (
                <Tabs defaultValue="unigrams" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-14 rounded-3xl bg-muted/30 p-1.5 border border-primary/5 mb-8">
                        <TabsTrigger value="unigrams" className="rounded-2xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold">1-Word Phrases</TabsTrigger>
                        <TabsTrigger value="bigrams" className="rounded-2xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold">2-Word Phrases</TabsTrigger>
                        <TabsTrigger value="trigrams" className="rounded-2xl data-[state=active]:bg-background data-[state=active]:shadow-lg font-bold">3-Word Phrases</TabsTrigger>
                    </TabsList>

                    {['unigrams', 'bigrams', 'trigrams'].map((type) => (
                        <TabsContent key={type} value={type} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-primary/5 rounded-3xl bg-background shadow-lg p-6">
                                    <h4 className="font-bold text-sm mb-6 flex items-center gap-2 text-primary uppercase tracking-wider">
                                        <BarChart3 className="h-4 w-4" /> Frequency Chart
                                    </h4>
                                    <div className="h-[350px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stats[type]} layout="vertical">
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="word" type="category" width={110} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                />
                                                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                                                    {stats[type].map((entry: any, index: number) => (
                                                        <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - index * 0.08})`} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-sm mb-4 px-2 flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                                        <PieChart className="h-4 w-4" /> Density Report
                                    </h4>
                                    {stats[type].map((s: any, i: number) => (
                                        <Card key={i} className="flex justify-between items-center p-4 rounded-2xl border-primary/5 hover:border-primary/20 transition-all group overflow-hidden relative">
                                            <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="font-black text-sm uppercase truncate max-w-[200px]">{s.word}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold text-muted-foreground">{s.count} hits</div>
                                                    <div className="text-sm font-black">{s.percentage}%</div>
                                                </div>
                                                <StatusBadge percentage={s.percentage} />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
}
