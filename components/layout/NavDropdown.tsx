'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavDropdownProps {
    title: string;
}

const converters = {
    pdf: [
        { name: 'PDF to Word', href: '/tools/pdf-to-word' },
        { name: 'Word to PDF', href: '/tools/word-to-pdf' },
        { name: 'Merge PDF', href: '/tools/merge-pdf' },
        { name: 'Split PDF', href: '/tools/split-pdf' },
    ],
    image: [
        { name: 'JPG to PNG', href: '/tools/jpg-to-png' },
        { name: 'PNG to JPG', href: '/tools/png-to-jpg' },
        { name: 'Image Resizer', href: '/tools/image-resizer' },
        { name: 'Image Compressor', href: '/tools/image-compressor' },
    ],
    video: [
        { name: 'Video Converter', href: '/tools/video-converter' },
        { name: 'MP4 to MP3', href: '/tools/mp4-to-mp3' },
        { name: 'Video Compressor', href: '/tools/video-compressor' },
    ]
};

export function NavDropdown({ title }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    isOpen
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                )}
            >
                {title}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-[600px] -left-1/2 p-4 bg-background/95 backdrop-blur-xl border rounded-2xl shadow-2xl z-50 grid grid-cols-3 gap-4"
                        style={{ marginLeft: "-200px" }} // Center alignment adjustment
                    >
                        {/* PDF Section */}
                        <div className="space-y-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 text-red-500 mb-2">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">PDF Tools</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {converters.pdf.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground hover:pl-1 transition-all"
                                    >
                                        {item.name}
                                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="space-y-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 text-blue-500 mb-2">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <ImageIcon className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">Image Tools</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {converters.image.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground hover:pl-1 transition-all"
                                    >
                                        {item.name}
                                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Video Section */}
                        <div className="space-y-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-2 text-purple-500 mb-2">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Video className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-sm">Video Tools</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {converters.video.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground hover:pl-1 transition-all"
                                    >
                                        {item.name}
                                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
