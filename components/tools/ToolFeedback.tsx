'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function ToolFeedback({ toolTitle }: { toolTitle: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send to an API
        console.log(`Feedback for ${toolTitle}:`, feedback);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setFeedback('');
        }, 3000);
    };

    return (
        <div className="mt-12 border-t pt-12">
            {!isOpen ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <h3 className="text-xl font-bold italic">Something not working right?</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm font-medium">
                        Found a bug or have a suggestion to improve the {toolTitle}?
                        Let us know and we'll fix it!
                    </p>
                    <Button
                        onClick={() => setIsOpen(true)}
                        variant="outline"
                        className="rounded-full px-8 h-12 font-bold group border-primary/20 hover:border-primary/40"
                    >
                        <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                        Send Feedback
                    </Button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="max-w-xl mx-auto border-primary/10 bg-muted/20 rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-black uppercase tracking-widest text-xs text-primary">Report an issue</h3>
                                            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 rounded-full text-xs font-bold">Cancel</Button>
                                        </div>
                                        <Textarea
                                            placeholder={`Describe the issue or suggest an improvement for ${toolTitle}...`}
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            required
                                            className="min-h-[120px] rounded-3xl bg-background/50 border-primary/5 focus:border-primary/20"
                                        />
                                        <Button type="submit" className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/10">
                                            <Send className="mr-2 h-4 w-4" />
                                            Submit Report
                                        </Button>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-8 text-center space-y-4"
                                    >
                                        <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Thank You!</h4>
                                            <p className="text-sm text-muted-foreground font-medium">Your feedback helps us make Assets Tools Hub better for everyone.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
