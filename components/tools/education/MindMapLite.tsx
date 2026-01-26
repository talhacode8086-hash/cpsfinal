'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Plus, Trash2, Share2, Info, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Node {
    id: number;
    text: string;
    parentId: number | null;
}

export default function MindMapLite() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: 1, text: 'Main Topic', parentId: null },
        { id: 2, text: 'Subtopic 1', parentId: 1 },
        { id: 3, text: 'Subtopic 2', parentId: 1 },
    ]);
    const [newItem, setNewItem] = useState('');
    const [selectedParent, setSelectedParent] = useState<number>(1);

    const addNode = () => {
        if (!newItem) return;
        setNodes([...nodes, { id: Date.now(), text: newItem, parentId: selectedParent }]);
        setNewItem('');
    };

    const deleteNode = (id: number) => {
        if (id === 1) return; // Prevent deleting root
        setNodes(nodes.filter(n => n.id !== id && n.parentId !== id));
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Network className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Mind Map Visualizer</CardTitle>
                <p className="text-muted-foreground mt-2">Brainstorm and map out your academic projects with visual node hierarchies and branch logic.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">

                <div className="flex gap-4 max-w-2xl mx-auto">
                    <Input
                        placeholder="Child node text..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="h-14 rounded-2xl bg-background border-primary/10 font-bold"
                    />
                    <select
                        value={selectedParent}
                        onChange={(e) => setSelectedParent(parseInt(e.target.value))}
                        className="h-14 rounded-2xl bg-background border border-primary/10 px-4 font-bold outline-none focus:ring-2 ring-primary/20"
                    >
                        {nodes.map(n => <option key={n.id} value={n.id}>Parent: {n.text}</option>)}
                    </select>
                    <Button onClick={addNode} className="h-14 px-8 rounded-2xl shadow-xl shadow-primary/20">
                        <Plus className="mr-2" /> ADD NODE
                    </Button>
                </div>

                <div className="relative min-h-[500px] w-full bg-muted/5 rounded-[4rem] border-2 border-dashed border-primary/10 p-12 flex flex-col items-center">
                    {/* Root Node */}
                    <div className="p-8 rounded-[3rem] bg-primary text-white font-black text-2xl shadow-2xl shadow-primary/30 z-20 transition-all hover:scale-110">
                        {nodes[0].text}
                    </div>

                    {/* Branches (Simplified hierarchical view) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 w-full">
                        {nodes.filter(n => n.parentId === 1).map((child) => (
                            <div key={child.id} className="flex flex-col items-center gap-6 group">
                                <div className="h-12 w-1 bg-primary/20 -mt-10" />
                                <div className="p-6 rounded-[2.5rem] bg-background border-2 border-primary/10 flex items-center justify-between w-full shadow-lg group-hover:border-primary/40 transition-all">
                                    <span className="font-black text-primary">{child.text}</span>
                                    <button onClick={() => deleteNode(child.id)} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Sub-children */}
                                <div className="flex flex-col gap-3 w-full pl-8 border-l-2 border-primary/5">
                                    {nodes.filter(n => n.parentId === child.id).map(sub => (
                                        <div key={sub.id} className="p-3 rounded-xl bg-primary/5 text-xs font-bold text-primary flex justify-between items-center">
                                            {sub.text}
                                            <button onClick={() => deleteNode(sub.id)} className="text-destructive hover:scale-110">Ã—</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button variant="outline" className="h-12 rounded-xl">
                        <Share2 className="mr-2 h-4 w-4" /> Export as PNG
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl">
                        <Layers className="mr-2 h-4 w-4" /> Center Map
                    </Button>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 flex items-start gap-4">
                    <Info className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        Node hierarchies allow you to visualize complex project dependencies. Use the <b>Parent</b> dropdown to attach new ideas to existing branches.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
