'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Plus, Trash2, Info, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GradeCategory {
    id: number;
    label: string;
    weight: string;
    score: string;
}

export default function WeightedGradeCalc() {
    const [categories, setCategories] = useState<GradeCategory[]>([
        { id: 1, label: 'Homework', weight: '20', score: '90' },
        { id: 2, label: 'Exams', weight: '50', score: '85' },
        { id: 3, label: 'Quizzes', weight: '30', score: '95' },
    ]);

    const addCategory = () => {
        setCategories([...categories, { id: Date.now(), label: '', weight: '0', score: '0' }]);
    };

    const removeCategory = (id: number) => {
        if (categories.length > 1) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const updateCategory = (id: number, field: keyof GradeCategory, value: string) => {
        setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const calculateGrade = () => {
        let totalWeightedScore = 0;
        let totalWeight = 0;

        categories.forEach(c => {
            const weight = parseFloat(c.weight) || 0;
            const score = parseFloat(c.score) || 0;
            totalWeightedScore += (score * (weight / 100));
            totalWeight += weight;
        });

        const finalGrade = totalWeight > 0 ? (totalWeightedScore / (totalWeight / 100)) : 0;
        return { grade: finalGrade.toFixed(2), totalWeight };
    };

    const results = calculateGrade();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Weighted Grade Calc</CardTitle>
                <p className="text-muted-foreground mt-2">Find your true average by weighting different assignment categories.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-primary/5 p-10 rounded-[3rem] border border-primary/10">
                    <div className="text-center md:text-left space-y-2">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Calculated Current Grade</p>
                        <h2 className="text-7xl font-black text-primary">{results.grade}%</h2>
                    </div>
                    <div className={`p-6 rounded-2xl border-2 ${parseFloat(results.totalWeight.toString()) === 100 ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
                        <p className="text-[10px] font-black uppercase text-center mb-1">Total Weight</p>
                        <p className="text-2xl font-black text-center">{results.totalWeight}%</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 px-6 text-[10px] font-black uppercase text-muted-foreground">
                        <div className="col-span-6">Category Label</div>
                        <div className="col-span-3">Weight (%)</div>
                        <div className="col-span-2">Score (%)</div>
                        <div className="col-span-1"></div>
                    </div>

                    {categories.map((c) => (
                        <div key={c.id} className="grid grid-cols-12 gap-4 items-center bg-background/40 p-3 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
                            <div className="col-span-6">
                                <Input
                                    placeholder="e.g. Midterm Exams"
                                    value={c.label}
                                    onChange={(e) => updateCategory(c.id, 'label', e.target.value)}
                                    className="h-14 rounded-xl border-transparent bg-transparent focus:bg-background transition-all font-bold"
                                />
                            </div>
                            <div className="col-span-3">
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={c.weight}
                                        onChange={(e) => updateCategory(c.id, 'weight', e.target.value)}
                                        className="h-14 rounded-xl border-transparent bg-transparent focus:bg-background text-center font-black text-primary"
                                    />
                                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-20" />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    value={c.score}
                                    onChange={(e) => updateCategory(c.id, 'score', e.target.value)}
                                    className="h-14 rounded-xl border-transparent bg-transparent focus:bg-background text-center font-black"
                                />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCategory(c.id)}
                                    className="text-destructive opacity-20 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={addCategory} className="w-full h-16 rounded-[2rem] bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-primary transition-all font-black text-lg border border-primary/5">
                    <Plus className="mr-2 h-6 w-6" /> ADD NEW CATEGORY
                </Button>

                {results.totalWeight !== 100 && (
                    <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-4 text-amber-600">
                        <Info className="h-6 w-6 shrink-0" />
                        <p className="text-sm font-bold">Standard grade weights usually sum to 100%. Current total is {results.totalWeight}%.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
