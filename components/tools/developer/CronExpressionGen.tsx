'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, HelpCircle, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CronExpressionGen() {
    const [min, setMin] = useState('*');
    const [hour, setHour] = useState('*');
    const [dom, setDom] = useState('*');
    const [month, setMonth] = useState('*');
    const [dow, setDow] = useState('*');

    const cron = `${min} ${hour} ${dom} ${month} ${dow}`;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Cron Expression Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Build crontab schedules using a simple visual interface.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <CronUnit label="Minute" value={min} onChange={setMin} max={59} />
                    <CronUnit label="Hour" value={hour} onChange={setHour} max={23} />
                    <CronUnit label="Day" value={dom} onChange={setDom} max={31} />
                    <CronUnit label="Month" value={month} onChange={setMonth} max={12} />
                    <CronUnit label="Weekday" value={dow} onChange={setDow} max={6} />
                </div>

                <div className="p-10 rounded-[3rem] bg-black/90 border-4 border-primary/20 text-center space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Generated Expression</p>
                    <h3 className="text-6xl font-black text-white selection:bg-primary selection:text-white">{cron}</h3>
                    <div className="flex justify-center gap-4">
                        <Button className="rounded-xl px-10 h-12 font-bold" onClick={() => navigator.clipboard.writeText(cron)}>Copy to Crontab</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 flex items-start gap-4">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                        <div className="text-xs space-y-2">
                            <p className="font-bold">Next Schedule Entry:</p>
                            <p className="text-muted-foreground leading-relaxed italic">At minute 0, every hour, every day of the month, and every month.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                        <Code className="h-5 w-5 text-primary shrink-0" />
                        <div className="text-xs space-y-2">
                            <p className="font-bold">Common Presets:</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-6 text-[10px]" onClick={() => { setMin('0'); setHour('0'); setDom('*'); setMonth('*'); setDow('*'); }}>Daily at Midnight</Button>
                                <Button variant="outline" size="sm" className="h-6 text-[10px]" onClick={() => { setMin('0'); setHour('*'); setDom('*'); setMonth('*'); setDow('*'); }}>Every Hour</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CronUnit({ label, value, onChange, max }: any) {
    return (
        <div className="space-y-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">{label}</p>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-10 rounded-xl bg-background border-primary/10 font-black">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="*">Every</SelectItem>
                    {[...Array(max + 1)].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
