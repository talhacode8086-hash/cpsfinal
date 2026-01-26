'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cake } from 'lucide-react';

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState<string>('2000-01-01');

    const calculateAge = () => {
        const today = new Date();
        const birth = new Date(birthDate);

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
            years--;
            months += 12;
        }

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        return { years, months, days };
    };

    const result = calculateAge();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Cake className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Age Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Find out exactly how old you are in years, months, and days.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="max-w-xs mx-auto space-y-4">
                    <label className="text-sm font-bold block text-center">Select Date of Birth</label>
                    <Input
                        type="date"
                        className="h-14 rounded-2xl text-lg text-center font-bold"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="p-8 rounded-3xl bg-muted/50 border border-primary/10 text-center space-y-2 transition-transform hover:scale-105">
                        <p className="text-5xl font-black text-primary">{result.years}</p>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Years</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-muted/50 border border-primary/10 text-center space-y-2 transition-transform hover:scale-105">
                        <p className="text-5xl font-black text-primary">{result.months}</p>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Months</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-muted/50 border border-primary/10 text-center space-y-2 transition-transform hover:scale-105">
                        <p className="text-5xl font-black text-primary">{result.days}</p>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Days</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-dashed border-primary/20 text-center">
                    <p className="text-sm text-muted-foreground">
                        Next Birthday: <span className="font-bold text-primary">Soon!</span> Stay tuned for advanced birthday countdowns.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
