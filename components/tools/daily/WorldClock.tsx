'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Plus, Trash2, Clock, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CityTime {
    id: string;
    city: string;
    tz: string;
}

export default function WorldClock() {
    const [cities, setCities] = useState<CityTime[]>([
        { id: '1', city: 'London', tz: 'Europe/London' },
        { id: '2', city: 'New York', tz: 'America/New_York' },
        { id: '3', city: 'Tokyo', tz: 'Asia/Tokyo' },
        { id: '4', city: 'Dubai', tz: 'Asia/Dubai' }
    ]);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeInZone = (tz: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now);
    };

    const isDay = (tz: string) => {
        const hour = parseInt(new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            hour12: false
        }).format(now));
        return hour >= 6 && hour < 18;
    };

    return (
        <Card className="max-w-5xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">World Clock Dashboard</CardTitle>
                <p className="text-muted-foreground mt-2">Global time tracking for a connected world.</p>
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cities.map((city) => (
                        <div key={city.id} className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/5 hover:border-primary/20 transition-all group relative">
                            <div className="flex justify-between items-start mb-4">
                                {isDay(city.tz) ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-blue-500" />}
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-50">{city.city}</span>
                            </div>
                            <h4 className="text-4xl font-black mb-1">{getTimeInZone(city.tz)}</h4>
                            <p className="text-[10px] font-bold text-muted-foreground">{city.tz.split('/')[1].replace('_', ' ')}</p>

                            <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-destructive hover:bg-destructive/10 rounded-xl">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-[3rem] bg-primary text-primary-foreground flex flex-col md:flex-row gap-6 items-center">
                    <div className="space-y-1 flex-1">
                        <h5 className="text-xl font-bold">Add New City</h5>
                        <p className="text-primary-foreground/60 text-xs">Stay synchronized with your global team.</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Input placeholder="City Name" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-12 w-full md:w-64 rounded-xl" />
                        <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
