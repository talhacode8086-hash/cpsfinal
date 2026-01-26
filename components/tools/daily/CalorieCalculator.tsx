'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CalorieCalculator() {
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('70');
    const [height, setHeight] = useState('175');
    const [activity, setActivity] = useState('1.375');

    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;

    // Harris-Benedict Equation
    const bmr = gender === 'male'
        ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
        : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);

    const tdee = bmr * parseFloat(activity);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Flame className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Daily Calorie Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Find your Total Daily Energy Expenditure (TDEE).</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Biometric Detail</label>
                        <div className="space-y-2">
                            <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-12 rounded-xl" />
                            <Select value={gender} onValueChange={setGender}>
                                <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Body Metrics</label>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl pr-10" />
                                <span className="absolute right-3 top-3 text-[10px] font-bold opacity-30">KG</span>
                            </div>
                            <div className="relative">
                                <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 rounded-xl pr-10" />
                                <span className="absolute right-3 top-3 text-[10px] font-bold opacity-30">CM</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Activity Level</label>
                        <Select value={activity} onValueChange={setActivity}>
                            <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1.2">Sedentary (Little/No Exercise)</SelectItem>
                                <SelectItem value="1.375">Light (1-3 days/week)</SelectItem>
                                <SelectItem value="1.55">Moderate (3-5 days/week)</SelectItem>
                                <SelectItem value="1.725">Active (6-7 days/week)</SelectItem>
                                <SelectItem value="1.9">Extra Active (Hard Work/2x Training)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-background border-2 border-primary/10 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black text-primary uppercase mb-2">Resting Metabolic Rate (BMR)</span>
                        <h3 className="text-4xl font-black">{Math.round(bmr).toLocaleString()}</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-2">Calories burned at complete rest</p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/40 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black uppercase mb-2 opacity-70">Daily Requirement (TDEE)</span>
                        <h3 className="text-6xl font-black">{Math.round(tdee).toLocaleString()}</h3>
                        <p className="text-xs font-bold mt-2 opacity-50 uppercase tracking-tighter">Maintain weight with active metabolism</p>
                    </div>
                </div>

                <div className="flex justify-center gap-12 pt-4">
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Weight Loss</p>
                        <p className="text-xl font-bold">{Math.round(tdee - 500).toLocaleString()}</p>
                    </div>
                    <div className="text-center px-8 border-x border-primary/5">
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Maintenance</p>
                        <p className="text-xl font-bold">{Math.round(tdee).toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Weight Gain</p>
                        <p className="text-xl font-bold">{Math.round(tdee + 500).toLocaleString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
