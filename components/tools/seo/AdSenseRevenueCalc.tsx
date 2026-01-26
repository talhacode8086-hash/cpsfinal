'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Info, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdSenseRevenueCalc() {
    const [pageviews, setPageviews] = useState('10000');
    const [niche, setNiche] = useState('tech');

    const NICHE_CONFIG: Record<string, { rpm: number }> = {
        'tech': { rpm: 12 },
        'finance': { rpm: 35 },
        'health': { rpm: 18 },
        'lifestyle': { rpm: 8 },
        'gaming': { rpm: 4 }
    };

    const monthlyPotential = (parseInt(pageviews) / 1000) * (NICHE_CONFIG[niche]?.rpm || 0);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">AdSense Revenue Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Estimate your website&apos;s passive income potential based on traffic and niche.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Monthly Pageviews</label>
                            <Input
                                type="number"
                                value={pageviews}
                                onChange={(e) => setPageviews(e.target.value)}
                                className="h-14 rounded-2xl bg-muted/20 border-primary/10 text-xl font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary">Content Niche</label>
                            <Select value={niche} onValueChange={setNiche}>
                                <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-primary/10 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="finance">BFSI / Finance ($35 RPM)</SelectItem>
                                    <SelectItem value="health">Medical / Health ($18 RPM)</SelectItem>
                                    <SelectItem value="tech">Tech / Software ($12 RPM)</SelectItem>
                                    <SelectItem value="lifestyle">Hobbies / Lifestyle ($8 RPM)</SelectItem>
                                    <SelectItem value="gaming">Gaming / Entertainment ($4 RPM)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/40 flex flex-col items-center justify-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">Estimated Monthly Revenue</p>
                            <h3 className="text-6xl font-black">${Math.round(monthlyPotential)}</h3>
                            <p className="text-[10px] font-bold mt-2 opacity-50 uppercase tracking-tighter">Projected Earnings Potential</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-muted/30 border border-primary/5 flex justify-between items-center">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Yearly Passive Estimate</p>
                                <p className="text-2xl font-black text-primary">${Math.round(monthlyPotential * 12).toLocaleString()}</p>
                            </div>
                            <TrendingUp className="h-10 w-10 text-primary opacity-20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
                        <PieChart className="h-6 w-6 text-primary shrink-0" />
                        <div className="text-xs space-y-1">
                            <p className="font-bold text-primary">What is RPM?</p>
                            <p className="text-muted-foreground leading-relaxed italic">Revenue Per Mille. It measures how much you earn for every 1,000 pageviews. Finance niches have higher RPMs due to high-value advertisers.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/20 flex gap-4">
                        <Info className="h-6 w-6 text-muted-foreground shrink-0" />
                        <div className="text-xs space-y-1">
                            <p className="font-bold">Disclaimer</p>
                            <p className="text-muted-foreground leading-relaxed italic">These are estimates. Actual earnings depend on CTR (Click-through Rate), traffic source (Tier 1 vs Tier 3), and ad density.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
