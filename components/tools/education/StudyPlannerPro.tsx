'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Plus, CheckCircle2, Timer, Play, Pause, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StudyTask {
    id: number;
    title: string;
    duration: number; // in minutes
    completed: boolean;
}

export default function StudyPlannerPro() {
    const [tasks, setTasks] = useState<StudyTask[]>([
        { id: 1, title: 'Math Homework (Chapter 4)', duration: 45, completed: false },
        { id: 2, title: 'History Reading', duration: 30, completed: false },
    ]);
    const [newTask, setNewTask] = useState('');
    const [newDuration, setNewDuration] = useState('30');

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

    const markCompleted = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
    };

    const startSession = (task: StudyTask) => {
        setActiveTaskId(task.id);
        setTimeLeft(task.duration * 60);
        setIsActive(true);
    };

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (activeTaskId) markCompleted(activeTaskId);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, activeTaskId]);

    const addTask = () => {
        if (!newTask) return;
        setTasks([...tasks, { id: Date.now(), title: newTask, duration: parseInt(newDuration), completed: false }]);
        setNewTask('');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const stats = {
        total: tasks.length,
        done: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <CalendarCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Student Session Planner</CardTitle>
                <p className="text-muted-foreground mt-2">Break down your subjects into manageable study blocks with integrated focus timers.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">

                {/* Timer Section */}
                <div className="bg-primary p-12 rounded-[4rem] text-primary-foreground flex flex-col items-center justify-center shadow-3xl shadow-primary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-50">FOCUS SESSION</p>
                    <h2 className="text-9xl font-black mb-8">{formatTime(timeLeft)}</h2>
                    <div className="flex gap-4">
                        <Button variant="secondary" size="lg" className="h-14 px-8 rounded-2xl" onClick={() => setIsActive(!isActive)}>
                            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />} {isActive ? 'PAUSE' : 'RESUME'}
                        </Button>
                        <Button variant="secondary" size="lg" className="h-14 w-14 rounded-2xl p-0" onClick={() => setTimeLeft(0)}>
                            <RotateCw className="h-5 w-5" />
                        </Button>
                    </div>
                    {activeTaskId && (
                        <p className="mt-8 font-bold opacity-60 italic">Now studying: {tasks.find(t => t.id === activeTaskId)?.title}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Task List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary/40">
                            <span>STUDY QUEUE</span>
                            <span>{stats.done} / {stats.total} COMPLETED</span>
                        </div>

                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div key={task.id} className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${task.completed ? 'bg-green-500/5 border-green-500/20 opacity-60' : 'bg-background border-primary/5 hover:border-primary/20 hover:scale-[1.02]'}`}>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => markCompleted(task.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-primary/20 group-hover:border-primary'}`}>
                                            {task.completed && <CheckCircle2 className="h-4 w-4" />}
                                        </button>
                                        <div>
                                            <p className={`font-bold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                                            <p className="text-[10px] font-black text-primary opacity-40">{task.duration} MINUTE SESSION</p>
                                        </div>
                                    </div>

                                    {!task.completed && (
                                        <Button variant="ghost" size="sm" onClick={() => startSession(task)} className="rounded-xl font-black text-[10px] hover:bg-primary/10 hover:text-primary">
                                            <Timer className="mr-2 h-4 w-4" /> START NOW
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Input
                                placeholder="What subject are we studying?"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                className="h-14 rounded-2xl flex-1 bg-muted/10 border-transparent focus:bg-background"
                            />
                            <Input
                                type="number"
                                value={newDuration}
                                onChange={(e) => setNewDuration(e.target.value)}
                                className="h-14 w-24 rounded-2xl text-center bg-muted/10 border-transparent focus:bg-background font-bold"
                            />
                            <Button onClick={addTask} size="lg" className="h-14 w-14 rounded-2xl p-0 shadow-xl shadow-primary/20">
                                <Plus />
                            </Button>
                        </div>
                    </div>

                    {/* Stats & Tips */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/5 space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-primary/40">Session Stats</h4>
                            <div className="space-y-4">
                                <StatItem label="Active Tasks" value={stats.pending} />
                                <StatItem label="Completion" value={`${Math.round((stats.done / stats.total) * 100 || 0)}%`} />
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 space-y-3">
                            <h4 className="text-xs font-black text-amber-600">Pro Tip</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Studies show that sessions between <b>25-50 minutes</b> followed by a 5-10 minute break lead to the highest retention rates.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl">
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
            <span className="text-lg font-black text-primary">{value}</span>
        </div>
    );
}
