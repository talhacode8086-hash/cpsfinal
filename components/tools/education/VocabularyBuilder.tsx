'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages, Search, BookOpen, Quote, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const vocabData = [
    { word: 'Epiphany', type: 'noun', def: 'A sudden, intuitive perception or insight into the reality or essential meaning of something.', ex: 'After weeks of research, he had an epiphany about the solution.' },
    { word: 'Pragmatic', type: 'adj', def: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.', ex: 'A pragmatic approach to politics is often more successful.' },
    { word: 'Eloquent', type: 'adj', def: 'Fluent or persuasive in speaking or writing.', ex: 'Her speech was both eloquent and deeply moving.' },
    { word: 'Resilient', type: 'adj', def: 'Able to withstand or recover quickly from difficult conditions.', ex: 'Global economies are more resilient than many experts predicted.' },
    { word: 'Ubiquitous', type: 'adj', def: 'Present, appearing, or found everywhere.', ex: 'Computers are now ubiquitous in daily life.' }
];

export default function VocabularyBuilder() {
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState('');

    const current = vocabData[index];

    const next = () => setIndex((index + 1) % vocabData.length);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Languages className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Academic Vocab Builder</CardTitle>
                <p className="text-muted-foreground mt-2">Master advanced vocabulary and linguistic nuances for higher-level academic writing.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Search for a word..."
                        className="h-16 rounded-[2rem] pl-16 bg-muted/10 border-transparent focus:bg-background font-bold text-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-left-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-7xl font-black text-primary tracking-tighter">{current.word}</h2>
                                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">{current.type}</span>
                            </div>
                            <div className="p-8 rounded-[3rem] bg-background border border-primary/5 shadow-2xl space-y-4">
                                <div className="flex items-center gap-2 text-primary/40 font-black text-[10px] tracking-widest uppercase">
                                    <BookOpen className="h-4 w-4" /> Definition
                                </div>
                                <p className="text-xl leading-relaxed text-muted-foreground">{current.def}</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 space-y-4">
                            <div className="flex items-center gap-2 text-primary/40 font-black text-[10px] tracking-widest uppercase">
                                <Quote className="h-4 w-4" /> Contextual Usage
                            </div>
                            <p className="text-lg italic font-medium">"{current.ex}"</p>
                        </div>

                        <Button onClick={next} className="w-full h-16 rounded-[2rem] bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-black text-lg">
                            EXPLORE NEXT WORD <ChevronRight className="ml-2" />
                        </Button>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-6">Flash-Quiz (Coming Soon)</h4>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 w-full bg-background border border-primary/5 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-2xl hover:bg-primary/5" onClick={() => setIndex(Math.floor(Math.random() * vocabData.length))}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Random Shuffle
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
