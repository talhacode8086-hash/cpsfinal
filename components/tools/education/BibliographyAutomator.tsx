'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Plus, Trash2, Copy, Check, Info, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Source {
    id: number;
    author: string;
    title: string;
    year: string;
    publisher: string;
}

export default function BibliographyAutomator() {
    const [sources, setSources] = useState<Source[]>([
        { id: 1, author: 'Sagan, C.', title: 'Cosmos', year: '1980', publisher: 'Random House' },
        { id: 2, author: 'Hawking, S.', title: 'A Brief History of Time', year: '1988', publisher: 'Bantam Books' },
    ]);
    const [newItem, setNewItem] = useState<Omit<Source, 'id'>>({ author: '', title: '', year: '', publisher: '' });
    const [copied, setCopied] = useState(false);

    const addSource = () => {
        if (!newItem.author || !newItem.title) return;
        setSources([...sources, { ...newItem, id: Date.now() }]);
        setNewItem({ author: '', title: '', year: '', publisher: '' });
    };

    const formatBib = () => {
        return sources
            .sort((a, b) => a.author.localeCompare(b.author))
            .map(s => `${s.author} (${s.year}). ${s.title}. ${s.publisher}.`)
            .join('\n');
    };

    const copy = () => {
        navigator.clipboard.writeText(formatBib());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ListChecks className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Bibliography Automator</CardTitle>
                <p className="text-muted-foreground mt-2">Compile multiple academic sources into an alphabetized, perfectly formatted reference list.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Add Source Form */}
                    <div className="space-y-6">
                        <div className="bg-muted/10 p-8 rounded-[3rem] border border-primary/5 space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">Add New Source</h4>
                            <Input placeholder="Author (e.g. Darwin, C.)" value={newItem.author} onChange={(e) => setNewItem({ ...newItem, author: e.target.value })} className="h-12 rounded-xl" />
                            <Input placeholder="Work Title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className="h-12 rounded-xl" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Year" value={newItem.year} onChange={(e) => setNewItem({ ...newItem, year: e.target.value })} className="h-12 rounded-xl" />
                                <Input placeholder="Publisher" value={newItem.publisher} onChange={(e) => setNewItem({ ...newItem, publisher: e.target.value })} className="h-12 rounded-xl" />
                            </div>
                            <Button onClick={addSource} className="w-full h-14 rounded-2xl font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add to Bibliography
                            </Button>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-4">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Our automator automatically <b>alphabetizes</b> your entries based on author surnames, as per standard academic requirements.
                            </p>
                        </div>
                    </div>

                    {/* Bibliography View */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">
                            <span>WORKS CITED LIST</span>
                            <button onClick={copy} className="flex items-center gap-2 hover:text-primary transition-colors">
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY LIST'}
                            </button>
                        </div>

                        <div className="p-10 rounded-[3.5rem] bg-background border border-primary/10 min-h-[400px] shadow-inner space-y-8 overflow-y-auto max-h-[500px]">
                            {sources.sort((a, b) => a.author.localeCompare(b.author)).map((s) => (
                                <div key={s.id} className="group relative border-b border-primary/5 pb-6 last:border-0 hover:border-primary/20 transition-all">
                                    <p className="text-sm leading-relaxed pr-8">
                                        <span className="font-bold">{s.author}</span> ({s.year}). <span className="italic">{s.title}</span>. {s.publisher}.
                                    </p>
                                    <button
                                        onClick={() => setSources(sources.filter(x => x.id !== s.id))}
                                        className="absolute right-0 top-0 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {sources.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full opacity-20 py-20">
                                    <FileText className="h-16 w-16 mb-4" />
                                    <p className="font-bold italic">No sources added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
