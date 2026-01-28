'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, FileCode, Copy, Trash2, Check, AlertCircle, ArrowRightLeft, Terminal, Code2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function XMLJSONConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const convertAction = () => {
        try {
            setError(null);
            if (!input.trim()) {
                setOutput('');
                return;
            }

            // Simple XML to JSON logic (for demonstration, a library like xml-js would be better for complex XML)
            const parseXML = (xmlString: string) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlString, "text/xml");

                const errorNode = xmlDoc.querySelector('parsererror');
                if (errorNode) {
                    throw new Error("Invalid XML structure detected.");
                }

                const nodeToJson = (node: Node): any => {
                    const obj: any = {};

                    if (node.nodeType === 1) { // Element
                        const element = node as Element;
                        if (element.attributes.length > 0) {
                            obj["_attributes"] = {};
                            for (let j = 0; j < element.attributes.length; j++) {
                                const attribute = element.attributes.item(j);
                                if (attribute) obj["_attributes"][attribute.nodeName] = attribute.nodeValue;
                            }
                        }
                    } else if (node.nodeType === 3) { // Text
                        return node.nodeValue;
                    }

                    if (node.hasChildNodes()) {
                        for (let i = 0; i < node.childNodes.length; i++) {
                            const child = node.childNodes.item(i);
                            const nodeName = child.nodeName;
                            if (nodeName === "#text") {
                                const val = child.nodeValue?.trim();
                                if (val) return val;
                                continue;
                            }
                            const childVal = nodeToJson(child);
                            if (obj[nodeName] === undefined) {
                                obj[nodeName] = childVal;
                            } else {
                                if (!Array.isArray(obj[nodeName])) {
                                    obj[nodeName] = [obj[nodeName]];
                                }
                                obj[nodeName].push(childVal);
                            }
                        }
                    }
                    return Object.keys(obj).length === 0 ? "" : obj;
                };

                return nodeToJson(xmlDoc.documentElement);
            };

            const result = parseXML(input.trim());
            setOutput(JSON.stringify(result, null, 2));
            toast.success('XML converted to JSON!');
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.info('Copied to clipboard');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10 p-2 sm:p-4 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                {/* XML Input */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2 sm:gap-3">
                            <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </span>
                            XML SOURCE
                        </label>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setInput(''); setOutput(''); setError(null); }}
                            className="rounded-xl h-7 sm:h-8 text-[9px] sm:text-[10px] font-bold hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="h-3 w-3 mr-1" /> RESET
                        </Button>
                    </div>
                    <Card className="rounded-[2rem] sm:rounded-[2.5rem] border-primary/5 bg-muted/20 overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-inner">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='<user id="1">\n  <name>John Doe</name>\n  <email>john@example.com</email>\n</user>'
                            className="min-h-[300px] sm:min-h-[450px] border-none focus-visible:ring-0 bg-transparent p-4 sm:p-6 md:p-10 font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed resize-none"
                        />
                    </Card>
                </div>

                {/* JSON Output */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 sm:gap-3">
                            <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Braces className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </span>
                            JSON RESULT
                        </label>
                        {output && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyToClipboard}
                                className="rounded-xl h-7 sm:h-8 text-[9px] sm:text-[10px] font-bold border-primary/20 hover:bg-primary/5"
                            >
                                {copied ? <Check className="h-3 w-3 mr-1 sm:mr-2" /> : <Copy className="h-3 w-3 mr-1 sm:mr-2" />}
                                {copied ? 'COPIED' : 'COPY'}
                            </Button>
                        )}
                    </div>
                    <Card className="rounded-[2rem] sm:rounded-[2.5rem] border-primary/10 bg-background shadow-2xl min-h-[300px] sm:min-h-[450px] flex flex-col overflow-hidden relative group">
                        <div className="absolute top-4 right-4 z-10 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Terminal className="h-5 w-5 text-muted-foreground" />
                        </div>
                        {error ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center">
                                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-destructive/5 flex items-center justify-center mb-4 sm:mb-6">
                                    <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
                                </div>
                                <h4 className="font-black text-destructive uppercase tracking-widest text-[10px] sm:text-xs mb-2">Parsing Error</h4>
                                <p className="text-xs sm:text-sm text-balance leading-relaxed text-muted-foreground max-w-xs">{error}</p>
                            </div>
                        ) : output ? (
                            <pre className="flex-1 p-4 sm:p-6 md:p-10 font-mono text-[10px] sm:text-xs md:text-sm overflow-auto text-primary custom-scrollbar selection:bg-primary/20">
                                {output}
                            </pre>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center opacity-30 grayscale group-hover:grayscale-0 transition-all">
                                <RefreshCw className="h-8 w-8 sm:h-12 sm:w-12 mb-4 sm:mb-6 animate-spin-slow text-primary" />
                                <p className="text-[10px] font-black uppercase tracking-widest leading-loose">Waiting for XML conversion...</p>
                                <p className="text-[8px] sm:text-[10px] font-medium text-muted-foreground mt-2">Paste your code on the left</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <div className="flex justify-center pt-4 sm:pt-6">
                <Button
                    size="lg"
                    onClick={convertAction}
                    className="h-14 sm:h-20 rounded-2xl sm:rounded-[2rem] px-8 sm:px-16 text-lg sm:text-2xl font-black shadow-2xl shadow-primary/30 group btn-glow transition-all active:scale-95 w-full sm:w-auto"
                >
                    <span className="relative flex items-center justify-center gap-3 sm:gap-4">
                        PROCESS XML <ArrowRightLeft className="h-5 w-5 sm:h-7 sm:w-7 group-hover:rotate-180 transition-transform duration-700" />
                    </span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                {[
                    { title: 'Local Processing', desc: 'Runs entirely in your browser.', icon: Check },
                    { title: 'Attributes Support', desc: 'Extracts node attributes as JSON keys.', icon: FileCode },
                    { title: 'Complex Nodes', desc: 'Handles nested structure automatically.', icon: Braces },
                ].map((feature, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-3xl bg-muted/10 border border-primary/5">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="font-black text-[10px] uppercase tracking-widest">{feature.title}</h6>
                            <p className="text-xs text-muted-foreground font-medium">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
