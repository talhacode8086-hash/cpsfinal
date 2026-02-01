'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, MousePointerClick, Sparkles, ArrowRight, Github } from 'lucide-react';
import { toast } from 'sonner';

const CSSButtonsPack = () => {
    const buttonStyles = [
        {
            name: 'Glow Premium',
            className: 'relative px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all hover:-translate-y-0.5 active:scale-95',
            html: '<button class="glow-btn">Glow Premium</button>',
            css: `.glow-btn {
  background: #4f46e5;
  color: white;
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: bold;
  border: none;
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
  transition: all 0.3s ease;
}
.glow-btn:hover {
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.6);
  transform: translateY(-2px);
}`
        },
        {
            name: 'Glass Border',
            className: 'px-8 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors flex items-center gap-2',
            icon: <ArrowRight className="w-4 h-4" />,
            html: '<button class="glass-btn">Get Started</button>',
            css: `.glass-btn {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 32px;
  border-radius: 9999px;
  transition: background 0.3s;
}`
        },
        {
            name: 'Neumorphic',
            className: 'px-8 py-3 bg-[#e0e0e0] text-zinc-600 font-black rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all',
            html: '<button class="neu-btn">Neumorphic</button>',
            css: `.neu-btn {
  background: #e0e0e0;
  color: #666;
  padding: 12px 32px;
  border-radius: 16px;
  font-weight: 900;
  border: none;
  box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
  transition: all 0.2s;
}
.neu-btn:hover {
  box-shadow: inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff;
}`
        },
        {
            name: 'Retro Sharp',
            className: 'px-8 py-3 bg-yellow-400 border-2 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all',
            html: '<button class="retro-btn">Buy Now</button>',
            css: `.retro-btn {
  background: #fbbf24;
  border: 2px solid black;
  color: black;
  padding: 12px 32px;
  font-weight: 900;
  text-transform: uppercase;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
  transition: all 0.1s;
}
.retro-btn:hover {
  box-shadow: none;
  transform: translate(4px, 4px);
}`
        },
        {
            name: 'Magnetic Ghost',
            className: 'px-8 py-3 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all font-medium',
            html: '<button class="ghost-btn">Join Us</button>',
            css: `.ghost-btn {
  border: 2px solid #3f3f46;
  background: transparent;
  color: inherit;
  padding: 12px 32px;
  border-radius: 8px;
  transition: all 0.3s;
}
.ghost-btn:hover {
  background: black;
  color: white;
}`
        }
    ];

    const copyCode = (style: any) => {
        navigator.clipboard.writeText(style.css);
        toast.success(`Copied CSS for ${style.name}!`);
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <MousePointerClick className="w-6 h-6 text-indigo-500" />
                    CSS Buttons Pack
                </CardTitle>
                <CardDescription>A collection of premium web button styles with copy-paste code</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {buttonStyles.map((style, idx) => (
                            <div
                                key={idx}
                                className={`p-12 rounded-[2.5rem] flex flex-col items-center justify-center space-y-8 min-h-[250px] relative group overflow-hidden ${style.name === 'Glass Border' ? 'bg-indigo-600' : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800'}`}
                            >
                                <button className={style.className}>
                                    {style.name}
                                    {style.icon}
                                </button>

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <Button variant="secondary" size="sm" onClick={() => copyCode(style)} className="gap-2">
                                        <Copy className="w-4 h-4" /> Copy CSS
                                    </Button>
                                    <pre className="hidden">{style.html}</pre>
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{style.name} Pattern</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4">
                        <Github className="w-8 h-8 opacity-20" />
                        <p className="text-sm font-medium opacity-60 text-center max-w-md">
                            All buttons are purely CSS-based and responsive. Click "Copy CSS" to get the full source for your project.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CSSButtonsPack;
