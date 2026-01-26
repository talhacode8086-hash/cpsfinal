'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function DailyPlanner() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', text: 'Drink 2 liters of water', completed: false },
        { id: '2', text: 'Meditate for 10 minutes', completed: true },
        { id: '3', text: 'Review Batch 5 expansion', completed: false }
    ]);
    const [input, setInput] = useState('');

    const addTask = () => {
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now().toString(), text: input, completed: false }]);
        setInput('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const progress = Math.round((tasks.filter(t => t.completed).length / (tasks.length || 1)) * 100);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ListChecks className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Visual Daily Planner</CardTitle>
                <p className="text-muted-foreground mt-2">Organize your thoughts and crush your daily goals.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="flex gap-4">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                placeholder="What&apos;s on the agenda today?"
                                className="h-16 rounded-2xl bg-muted/20 border-primary/10 text-lg px-6"
                            />
                            <Button onClick={addTask} className="h-16 w-16 rounded-2xl shadow-xl shadow-primary/20">
                                <Plus className="h-8 w-8" />
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div key={task.id} className="group flex items-center gap-4 p-5 rounded-2xl bg-background border border-primary/5 hover:border-primary/20 transition-all shadow-sm">
                                    <button onClick={() => toggleTask(task.id)}>
                                        {task.completed ?
                                            <CheckCircle2 className="h-6 w-6 text-green-500" /> :
                                            <Circle className="h-6 w-6 text-muted-foreground opacity-30 group-hover:opacity-100" />
                                        }
                                    </button>
                                    <span className={`flex-1 font-bold text-lg ${task.completed ? 'line-through opacity-30' : ''}`}>
                                        {task.text}
                                    </span>
                                    <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-all">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-80 space-y-6">
                        <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/30 text-center flex flex-col items-center">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">Today's Progress</p>
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * progress / 100)} className="text-white transition-all duration-1000" />
                                </svg>
                                <span className="absolute text-3xl font-black">{progress}%</span>
                            </div>
                            <p className="mt-6 text-xs font-bold opacity-50">{tasks.filter(t => t.completed).length} of {tasks.length} Completed</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
