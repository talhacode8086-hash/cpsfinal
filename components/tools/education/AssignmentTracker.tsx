'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Plus, Trash2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
    id: number;
    title: string;
    status: 'todo' | 'progress' | 'done';
    deadline: string;
}

export default function AssignmentTracker() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Physics Lab Report', status: 'progress', deadline: '2026-02-01' },
        { id: 2, title: 'History Final Essay', status: 'todo', deadline: '2026-02-05' },
        { id: 3, title: 'Math Quiz Prep', status: 'done', deadline: '2026-01-20' },
    ]);
    const [newItem, setNewItem] = useState('');

    const addTask = () => {
        if (!newItem) return;
        setTasks([...tasks, { id: Date.now(), title: newItem, status: 'todo', deadline: new Date().toISOString().split('T')[0] }]);
        setNewItem('');
    };

    const moveTask = (id: number, status: 'todo' | 'progress' | 'done') => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
    };

    const renderColumn = (status: 'todo' | 'progress' | 'done', label: string, color: string) => {
        const filtered = tasks.filter(t => t.status === status);
        return (
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h4 className={`font-black text-[10px] uppercase tracking-widest ${color}`}>{label}</h4>
                    <span className="text-[10px] font-bold opacity-20">{filtered.length} tasks</span>
                </div>
                <div className="space-y-4">
                    {filtered.map(t => (
                        <div key={t.id} className="p-6 rounded-3xl bg-background border border-primary/5 shadow-lg group hover:border-primary/20 transition-all flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <p className="font-bold leading-tight">{t.title}</p>
                                <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
                                    <Clock className="h-3 w-3" /> {t.deadline}
                                </div>
                                <div className="flex gap-1">
                                    {status !== 'todo' && <button onClick={() => moveTask(t.id, status === 'progress' ? 'todo' : 'progress')} className="p-1.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"><div className="h-2 w-2 rounded-full bg-muted-foreground" /></button>}
                                    {status !== 'done' && <button onClick={() => moveTask(t.id, status === 'todo' ? 'progress' : 'done')} className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"><div className="h-2 w-2 rounded-full bg-primary" /></button>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="h-32 rounded-3xl border-2 border-dashed border-primary/5 flex items-center justify-center opacity-10">
                            <Circle className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layout className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Student Task Board</CardTitle>
                <p className="text-muted-foreground mt-2">Manage your academic project pipeline with a visual Kanban workflow tracker.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex gap-4 max-w-xl mx-auto mb-12">
                    <Input
                        placeholder="New assignment name..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="h-14 rounded-2xl bg-background border-primary/10 font-bold"
                    />
                    <Button onClick={addTask} className="h-14 px-8 rounded-2xl shadow-xl shadow-primary/20">
                        <Plus className="mr-2" /> ADD TASK
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {renderColumn('todo', 'To Do', 'text-muted-foreground')}
                    {renderColumn('progress', 'In Progress', 'text-primary')}
                    {renderColumn('done', 'Completed', 'text-green-500')}
                </div>

                <div className="p-10 rounded-[4rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-amber-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="text-sm font-black text-amber-600 uppercase mb-2">Deadline Awareness</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Organizing tasks visually reduces cognitive load and helps prevent "last-minute" panic. Try breaking large papers into smaller tasks like "Research", "Draft", and "Proofread".
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
