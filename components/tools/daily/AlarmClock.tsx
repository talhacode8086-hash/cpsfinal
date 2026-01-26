'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlarmClock, Bell, Volume2, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OnlineAlarmClock() {
    const [time, setTime] = useState(new Date());
    const [alarmTime, setAlarmTime] = useState('08:00');
    const [isAlarmSet, setIsAlarmSet] = useState(false);
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now);

            if (isAlarmSet) {
                const [h, m] = alarmTime.split(':');
                if (now.getHours() === parseInt(h) && now.getMinutes() === parseInt(m) && now.getSeconds() === 0) {
                    setIsRinging(true);
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isAlarmSet, alarmTime]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <AlarmClock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Online Alarm Clock</CardTitle>
                <p className="text-muted-foreground mt-2">A reliable, aesthetic alarm for your desk.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="text-center space-y-2">
                    <h2 className="text-8xl font-black tracking-tighter text-primary">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </h2>
                    <p className="text-muted-foreground font-mono uppercase tracking-[0.5em] text-sm">
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <div className="relative group">
                        <Input
                            type="time"
                            value={alarmTime}
                            onChange={(e) => setAlarmTime(e.target.value)}
                            className="h-20 w-48 text-4xl font-black rounded-3xl bg-muted/20 border-primary/10 text-center"
                        />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            SET TIME
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={() => setIsAlarmSet(!isAlarmSet)}
                        variant={isAlarmSet ? "destructive" : "default"}
                        className="h-20 px-12 rounded-[2.5rem] text-xl font-bold shadow-2xl shadow-primary/20"
                    >
                        {isAlarmSet ? <BellOff className="mr-2 h-6 w-6" /> : <Bell className="mr-2 h-6 w-6" />}
                        {isAlarmSet ? "Cancel Alarm" : "Set Alarm"}
                    </Button>
                </div>

                {isRinging && (
                    <div className="fixed inset-0 bg-primary/95 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-500">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center animate-bounce mb-8">
                            <Volume2 className="h-16 w-16 text-primary" />
                        </div>
                        <h2 className="text-6xl font-black text-white mb-8">ALARM RINGING!</h2>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="h-20 px-16 rounded-full text-2xl font-black"
                            onClick={() => {
                                setIsRinging(false);
                                setIsAlarmSet(false);
                            }}
                        >
                            STOP ALARM
                        </Button>
                    </div>
                )}

                <div className="p-8 rounded-[3rem] bg-muted/10 border border-primary/5 flex justify-around">
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Status</p>
                        <p className="font-bold">{isAlarmSet ? 'Armed 🔔' : 'Ready'}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-primary mb-1">Next Alarm</p>
                        <p className="font-bold">{isAlarmSet ? alarmTime : '--:--'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
