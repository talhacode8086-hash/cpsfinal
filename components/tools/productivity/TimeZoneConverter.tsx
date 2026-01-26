'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Clock } from 'lucide-react';

const cities = [
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Sylhet', zone: 'Asia/Dhaka' },
    { name: 'Karachi', zone: 'Asia/Karachi' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
];

export default function TimeZoneConverter() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatInZone = (date: Date, zone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">World Time Zone Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Compare real-time across major cities around the world.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cities.map((city) => (
                        <div key={city.name} className="p-6 rounded-2xl bg-muted/50 border border-primary/5 hover:border-primary/20 transition-all text-center space-y-2 group">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{city.name}</p>
                            <h3 className="text-2xl font-black group-hover:text-primary transition-colors tabular-nums">
                                {formatInZone(time, city.zone)}
                            </h3>
                            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground font-medium">
                                <Clock className="h-3 w-3" />
                                {city.zone.split('/')[1].replace('_', ' ')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
                    <p className="text-sm font-medium">
                        Your Local Time: <span className="font-bold text-primary">{time.toLocaleTimeString()}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
