'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Plus, Trash2, GraduationCap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
    id: number;
    name: string;
    grade: string;
    credits: string;
}

export default function GPACalculatorPro() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, name: '', grade: 'A', credits: '3' }
    ]);
    const [scale, setScale] = useState('4.0');

    const gradePoints: Record<string, number> = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', grade: 'A', credits: '3' }]);
    };

    const removeCourse = (id: number) => {
        if (courses.length > 1) {
            setCourses(courses.filter(c => c.id !== id));
        }
    };

    const updateCourse = (id: number, field: keyof Course, value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;
        courses.forEach(c => {
            const credits = parseFloat(c.credits) || 0;
            const points = gradePoints[c.grade] || 0;
            totalPoints += points * credits;
            totalCredits += credits;
        });
        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        const multiplier = parseFloat(scale) / 4.0;
        return (gpa * multiplier).toFixed(2);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">GPA Calculator Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Track your academic performance with precise term and cumulative calculations.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-between items-center bg-muted/20 p-6 rounded-3xl border border-primary/5">
                    <div className="space-y-1">
                        <p className="text-xs font-black uppercase text-primary/60">Rating Scale</p>
                        <Select value={scale} onValueChange={setScale}>
                            <SelectTrigger className="w-32 h-10 rounded-xl bg-background border-primary/10 font-bold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4.0">4.0 Scale</SelectItem>
                                <SelectItem value="5.0">5.0 Scale</SelectItem>
                                <SelectItem value="10.0">10.0 Scale</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black uppercase text-primary/60">Current GPA</p>
                        <h2 className="text-5xl font-black text-primary">{calculateGPA()}</h2>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 px-4 text-[10px] font-black uppercase text-muted-foreground">
                        <div className="col-span-6">Course Name</div>
                        <div className="col-span-3">Grade</div>
                        <div className="col-span-2">Credits</div>
                        <div className="col-span-1"></div>
                    </div>

                    {courses.map((course) => (
                        <div key={course.id} className="grid grid-cols-12 gap-4 items-center bg-background/40 p-2 rounded-2xl border border-primary/5 group animate-in slide-in-from-left-2 duration-300">
                            <div className="col-span-6">
                                <Input
                                    placeholder="e.g. Mathematics"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    className="h-12 rounded-xl border-transparent bg-transparent focus:bg-background transition-all"
                                />
                            </div>
                            <div className="col-span-3">
                                <Select value={course.grade} onValueChange={(v) => updateCourse(course.id, 'grade', v)}>
                                    <SelectTrigger className="h-12 rounded-xl border-transparent bg-transparent hover:bg-background transition-all font-bold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(gradePoints).map(g => (
                                            <SelectItem key={g} value={g}>{g}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                                    className="h-12 rounded-xl border-transparent bg-transparent focus:bg-background text-center font-bold"
                                />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCourse(course.id)}
                                    className="text-destructive opacity-20 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Button
                    onClick={addCourse}
                    className="w-full h-16 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/10 font-bold text-lg"
                >
                    <Plus className="mr-2" /> Add Course
                </Button>

                <div className="p-6 rounded-3xl bg-muted/10 border border-primary/5 flex items-start gap-4">
                    <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-bold text-primary mb-1">How it works:</p>
                        GPA is calculated by multiplying the grade value by credit hours, summing them up, and dividing by total credits. Our tool handles weighted averages automatically.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
