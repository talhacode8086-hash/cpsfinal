'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, ArrowRight, BookOpen, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EssayOutlineGen() {
    const [thesis, setThesis] = useState('');
    const [points, setPoints] = useState(['', '']);
    const [outline, setOutline] = useState<any>(null);

    const generate = () => {
        if (!thesis) return;
        setOutline({
            intro: `Start with a hook, provide context for "${thesis.slice(0, 20)}...", and present your thesis.`,
            body: points.map((p, i) => ({
                title: `Point ${i + 1}: ${p || 'Supporting Argument'}`,
                desc: `Discuss evidence, analyze its relationship to the thesis, and provide a transition.`
            })),
            conclusion: `Restate the thesis in a new way, summarize the main points, and leave a final thought.`
        });
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <PenTool className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Essay Outline Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Transform your thesis and arguments into a professional academic structure.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Main Thesis / Topic</label>
                        <Input
                            placeholder="e.g. The impact of remote work on employee productivity"
                            value={thesis}
                            onChange={(e) => setThesis(e.target.value)}
                            className="h-16 rounded-2xl text-xl font-bold border-primary/10 bg-background"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Key Arguments</label>
                        {points.map((p, i) => (
                            <div key={i} className="flex gap-4">
                                <Input
                                    placeholder={`Argument ${i + 1}`}
                                    value={p}
                                    onChange={(e) => {
                                        const newPoints = [...points];
                                        newPoints[i] = e.target.value;
                                        setPoints(newPoints);
                                    }}
                                    className="h-12 rounded-xl"
                                />
                                <Button variant="ghost" size="icon" onClick={() => setPoints(points.filter((_, idx) => idx !== i))} className="text-destructive opacity-30 hover:opacity-100">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={() => setPoints([...points, ''])} className="w-full h-12 rounded-xl border-dashed border-primary/20 text-muted-foreground">
                            <Plus className="mr-2 h-4 w-4" /> Add Another Point
                        </Button>
                    </div>

                    <Button onClick={generate} className="w-full h-16 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-black text-lg">
                        GENERATE ACADEMIC OUTLINE <ArrowRight className="ml-2" />
                    </Button>
                </div>

                {outline && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="p-10 rounded-[3rem] bg-muted/20 border border-primary/5 space-y-8">
                            <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" /> Introduction
                                </h4>
                                <p className="text-muted-foreground pl-4 border-l-2 border-primary/10 italic">{outline.intro}</p>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" /> Body Paragraphs
                                </h4>
                                <div className="space-y-4 pl-4 border-l-2 border-primary/10">
                                    {outline.body.map((b: any, i: number) => (
                                        <div key={i} className="p-6 rounded-2xl bg-background border border-primary/5 space-y-1">
                                            <p className="font-black text-primary">{b.title}</p>
                                            <p className="text-xs text-muted-foreground">{b.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" /> Conclusion
                                </h4>
                                <p className="text-muted-foreground pl-4 border-l-2 border-primary/10 italic">{outline.conclusion}</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button variant="outline" className="h-12 rounded-xl">
                                <BookOpen className="mr-2 h-4 w-4" /> Export as PDF (Simulated)
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
