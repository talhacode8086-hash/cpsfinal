'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Star, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StructuredDataBench() {
    const [type, setType] = useState('review');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Structured Data Benchmark</CardTitle>
                <p className="text-muted-foreground mt-2">Preview and optimize Rich Snippets for better search visibility.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Schema Pattern</span>
                    </div>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-[180px] h-10 rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="review">Review/Rating</SelectItem>
                            <SelectItem value="faq">FAQ Snippet</SelectItem>
                            <SelectItem value="recipe">Recipe Card</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Simulated Google Result Expansion</h4>
                    <div className="p-10 rounded-[3rem] bg-white border border-slate-200 shadow-xl space-y-4 max-w-2xl mx-auto font-arial">
                        <div className="space-y-1">
                            <p className="text-[#4d5156] text-xs flex items-center gap-1">https://example.com/item <MoreVertical className="h-3 w-3" /></p>
                            <h3 className="text-[#1a0dab] text-xl hover:underline cursor-pointer">The Best Quality Product Review 2024</h3>
                            <p className="text-[#4d5156] text-sm leading-relaxed">Check out our deep dive into the latest features and pros/cons...</p>
                        </div>

                        <div className="py-2 border-t border-slate-100 flex flex-col gap-3">
                            {type === 'review' && (
                                <div className="flex items-center gap-2 text-[#4d5156] text-sm group animate-in slide-in-from-top-2">
                                    <span className="font-bold">Rating:</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <span className="text-slate-500">4.9 · 1,220 reviews · $45.00 · In stock</span>
                                </div>
                            )}

                            {type === 'faq' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 text-xs font-bold text-[#1a0dab] hover:bg-slate-100 cursor-pointer">
                                            <span>Frequently Asked Question #{i}?</span>
                                            <ChevronDown className="h-3 w-3 text-slate-400" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {type === 'recipe' && (
                                <div className="flex gap-4 items-center animate-in slide-in-from-top-2">
                                    <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" className="w-full h-full object-cover" alt="Recipe" />
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        <p className="font-bold flex items-center gap-1"><Timer className="h-3 w-3" /> 25 mins · 440 cal · 5 servings</p>
                                        <p>Best for quick dinners and healthy diets...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-black/95 text-primary border-4 border-primary/10 flex flex-col items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">JSON-LD Preview</p>
                    <pre className="text-[10px] font-mono leading-relaxed opacity-70 w-full text-left overflow-x-auto whitespace-pre-wrap">
                        {`{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Quality Product",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1220"
  }
}`}
                    </pre>
                    <Button size="lg" className="rounded-xl w-full h-12 font-bold shadow-lg shadow-primary/20">Inject to Buffer</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ChevronDown({ className }: any) {
    return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
}

function Timer({ className }: any) {
    return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
}
