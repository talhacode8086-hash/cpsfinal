'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, CheckCircle2, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ContactClient() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="space-y-16 pb-20">
            {/* Header */}
            <section className="text-center space-y-4 pt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight"
                >
                    Get in <span className="text-primary">Touch</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    Have a question, feedback, or a feature suggestion? We'd love to hear from you.
                    Our team typically responds within 24 hours.
                </motion.p>
            </section>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <Card className="border-primary/5 bg-primary/[0.02]">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>Reach out to us through any of these channels.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Email</p>
                                    <p className="text-sm text-muted-foreground">support@toolshub.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Live Chat</p>
                                    <p className="text-sm text-muted-foreground">Available 9am - 5pm EST</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Office</p>
                                    <p className="text-sm text-muted-foreground">Techtower, Silicon Valley, CA</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/5">
                        <CardHeader>
                            <CardTitle>Social Media</CardTitle>
                            <CardDescription>Follow us for the latest updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <Button key={i} variant="outline" size="icon" className="rounded-xl hover:text-primary hover:border-primary transition-colors">
                                    <Icon className="h-5 w-5" />
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <Card className="h-full border-primary/5 relative overflow-hidden">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Full Name</label>
                                                <Input placeholder="John Doe" required className="rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Email Address</label>
                                                <Input type="email" placeholder="john@example.com" required className="rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Subject</label>
                                            <Input placeholder="How can we help?" required className="rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Message</label>
                                            <Textarea placeholder="Write your message here..." className="min-h-[150px] rounded-xl" required />
                                        </div>
                                        <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Message
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                                    >
                                        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">Message Sent!</h3>
                                            <p className="text-muted-foreground max-w-xs mx-auto">
                                                Thank you for reaching out. We've received your message and will get back to you shortly.
                                            </p>
                                        </div>
                                        <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl">
                                            Send another message
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                        <div className="absolute top-0 right-0 p-20 bg-primary/5 blur-[80px] -z-10" />
                    </Card>
                </div>
            </div>
        </div>
    );
}
