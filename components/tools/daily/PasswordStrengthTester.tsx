'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function PasswordStrengthTester() {
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);

    const checkStrength = (p: string) => {
        let score = 0;
        if (!p) return 0;
        if (p.length >= 8) score += 20;
        if (p.length >= 12) score += 10;
        if (/[A-Z]/.test(p)) score += 20;
        if (/[a-z]/.test(p)) score += 10;
        if (/[0-9]/.test(p)) score += 20;
        if (/[^A-Za-z0-9]/.test(p)) score += 20;
        return score;
    };

    const strength = checkStrength(pass);
    const getStatus = (s: number) => {
        if (s < 40) return { label: 'Weak', color: 'bg-red-500' };
        if (s < 70) return { label: 'Medium', color: 'bg-amber-500' };
        if (s < 90) return { label: 'Strong', color: 'bg-green-500' };
        return { label: 'Very Strong', color: 'bg-primary' };
    };

    const status = getStatus(strength);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Password Strength Tester</CardTitle>
                <p className="text-muted-foreground mt-2">Instant security analysis of your credentials.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="relative max-w-xl mx-auto">
                    <Input
                        type={showPass ? "text" : "password"}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Type your password..."
                        className="h-20 text-3xl font-bold bg-muted/20 border-primary/10 rounded-3xl px-8 pr-16"
                    />
                    <button
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-primary opacity-50 hover:opacity-100 transition-opacity"
                    >
                        {showPass ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <div className="space-y-4 max-w-xl mx-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase text-primary">Strength Meter</span>
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full text-white ${status.color}`}>
                            {status.label}
                        </span>
                    </div>
                    <Progress value={strength} className="h-4 rounded-full bg-muted/20" color={status.color} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <div className="p-8 rounded-[2.5rem] bg-background border-2 border-primary/5 space-y-4">
                        <h4 className="text-xs font-black uppercase text-primary">Security Checklist</h4>
                        <CheckItem label="At least 8 characters" passed={pass.length >= 8} />
                        <CheckItem label="Includes uppercase letters" passed={/[A-Z]/.test(pass)} />
                        <CheckItem label="Includes numbers" passed={/[0-9]/.test(pass)} />
                        <CheckItem label="Special characters (@#$!)" passed={/[^A-Za-z0-9]/.test(pass)} />
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex flex-col justify-center text-center space-y-2">
                        <p className="text-[10px] font-black text-primary uppercase">Estimated Crack Time</p>
                        <h3 className="text-4xl font-black text-primary">
                            {strength < 40 ? 'Seconds' : strength < 70 ? 'Days' : strength < 90 ? 'Years' : 'Centuries'}
                        </h3>
                        <p className="text-xs text-muted-foreground italic">Based on standard brute-force estimates.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CheckItem({ label, passed }: { label: string, passed: boolean }) {
    return (
        <div className={`flex items-center gap-3 text-sm font-bold ${passed ? 'text-green-600' : 'text-muted-foreground opacity-50'}`}>
            {passed ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {label}
        </div>
    );
}
