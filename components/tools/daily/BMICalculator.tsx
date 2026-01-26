'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Scale } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function BMICalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);

    const bmi = weight / Math.pow(height / 100, 2);

    const getCategory = (b: number) => {
        if (b < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-500/10' };
        if (b < 25) return { label: 'Healthy Weight', color: 'text-green-500', bg: 'bg-green-500/10' };
        if (b < 30) return { label: 'Overweight', color: 'text-amber-500', bg: 'bg-amber-500/10' };
        return { label: 'Obese', color: 'text-destructive', bg: 'bg-destructive/10' };
    };

    const category = getCategory(bmi);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">BMI Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Check your Body Mass Index and understand your weight health.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Weight (kg)</span>
                                <span className="text-xl font-black">{weight}</span>
                            </div>
                            <Slider value={[weight]} onValueChange={(v) => setWeight(v[0])} min={30} max={200} step={1} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Height (cm)</span>
                                <span className="text-xl font-black">{height}</span>
                            </div>
                            <Slider value={[height]} onValueChange={(v) => setHeight(v[0])} min={100} max={250} step={1} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-12 rounded-[3.5rem] bg-primary text-white shadow-2xl shadow-primary/30 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Scale className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Your BMI Score</p>
                            <h3 className="text-7xl font-black">{bmi.toFixed(1)}</h3>
                            <div className={`mt-6 inline-flex items-center px-6 py-2 rounded-full bg-white/20 font-black text-sm`}>
                                {category.label}
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl border ${category.color} ${category.bg} font-bold text-center`}>
                            Ideal range: 18.5 - 24.9
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {['Under', 'Normal', 'Over', 'Obese'].map((l, i) => (
                        <div key={l} className={`h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-green-500' : i === 2 ? 'bg-amber-500' : 'bg-destructive'
                            } opacity-30`} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
