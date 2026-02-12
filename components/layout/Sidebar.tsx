'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Home,
    MousePointer2,
    Target,
    Zap,
    Activity,
    Crosshair,
    Keyboard,
    Clock,
    BarChart3,
    ChevronRight,
    ChevronDown,
    Menu,
    X,
    Mouse,
    MonitorPlay,
    Gamepad2,
    Type as TypeIcon,
    KeyRound,
    Braces,
    Search,
    Globe,
    Scale,
    Ruler,
    Rss,
    FileCode,
    Share2,
    Palette,
    Layers,
    Code2,
    TrendingUp,
    CircleDollarSign,
    Box,
    Minimize2,
    Calculator,
    Monitor,
    Shuffle,
    LineChart,
    Flame,
    UnfoldHorizontal,
    Code,
    Bot,
    Tag,
    Percent,
    Timer,
    Calendar,
    Layout,
    QrCode,
    Link as LinkIcon,
    Eye,
    Image as ImageIcon,
    Maximize,
    Crop,
    RefreshCw,
    FileImage,
    Info,
    Lock,
    Mail,
    ShieldCheck,
    FlaskConical,
    FileText,
    AlertTriangle,
    GitMerge,
    Repeat,
    Wind,
    Droplets,
    TestTube2,
    Pipette,
    ArrowUpRight,
    Microscope,
    BatteryCharging,
    Radiation,
    Shapes,
    ArrowLeftRight,
    PieChart,
    Sun,
    ArrowUp,
    ArrowDown,
    Table,
    Snowflake,
    Boxes,
    ThermometerSun,
    Waves,
    BookOpen,
    Sigma,
    GraduationCap,
    Lightbulb,
    Grid,
    Smartphone,
    Sparkles
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { tools, Tool, slugifyCategory } from '@/lib/tools-config';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { Heart } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Click Speed Test', href: '/tools/click-speed-test', icon: MousePointer2, badge: 'Hot' },
    { name: 'Jitter Click Test', href: '/tools/jitter-click-test', icon: Zap },
    { name: 'Kohi Click Test', href: '/tools/kohi-click-test', icon: MousePointer2 },
    { name: 'Aim Trainer', href: '/tools/aim-trainer', icon: Target },
    { name: 'Reaction Time', href: '/tools/reaction-time-test', icon: Clock },
    { name: 'Spacebar Counter', href: '/tools/spacebar-counter', icon: Keyboard },
    { name: 'Polling Rate', href: '/tools/mouse-polling-rate-checker', icon: Activity },
    { name: 'Crosshair Gen', href: '/tools/crosshair-generator', icon: Crosshair },
    { name: 'Esports Warm-up', href: '/tools/esports-warmup', icon: BarChart3 },
    { name: 'Blog Guides', href: '/blog', icon: Rss },
];

// Mapping for Lucide icons
const IconMap: Record<string, any> = {
    Home, MousePointer2, Target, Zap, Activity, Crosshair, Keyboard, Clock,
    BarChart3, Mouse, MonitorPlay, Gamepad2, Type: TypeIcon, KeyRound, Braces, Search,
    Globe, Scale, Ruler, FileCode, Share2, Palette, Layers, Code2, TrendingUp,
    CircleDollarSign, Box, Minimize2, Calculator, Monitor, Shuffle, LineChart,
    Flame, UnfoldHorizontal, Code, Bot, Tag, Percent, Timer, Calendar, Layout,
    QrCode, Link: LinkIcon, Eye, Maximize, Crop, RefreshCw, FileImage,
    GitMerge, Repeat, Wind, FlaskConical, Droplets, TestTube2, Pipette,
    ArrowUpRight, Microscope, BatteryCharging, Radiation, Shapes,
    ArrowLeftRight, PieChart, Sun, ArrowUp, ArrowDown, Table,
    Snowflake, Boxes, ThermometerSun, Waves, ShieldCheck, Grid, Smartphone, Sparkles
};

// Category Icon Mapping
const CategoryIcons: Record<string, any> = {
    'Mouse Skills': Mouse,
    'Keyboard Skills': Keyboard,
    'Aim & Reflex': Target,
    'Gaming Utilities': Gamepad2,
    'Text Tools': TypeIcon,
    'Unit Converters': Ruler,
    'Development Tools': Braces,
    'SEO & Web': Globe,
    'Design & UI': Palette,
    'Finance': CircleDollarSign,
    'Daily Tools': Clock,
    'Image Tools': ImageIcon,
    'Chemistry': FlaskConical,
    'Education': GraduationCap,
    'Mathematics Tools': Sigma,
    'Advanced Scholar Tools': BookOpen,
    'AI Math Solver': Sparkles,
    'Productivity': Lightbulb,
};

interface DropdownMenuProps {
    title: string;
    icon: any;
    items: Tool[];
    pathname: string;
    isMobile?: boolean;
    onItemClick?: () => void;
}

function DropdownMenu({ title, icon: Icon, items, pathname, isMobile, onItemClick }: DropdownMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const categorySlug = slugifyCategory(title);
    const categoryHref = `/category/${categorySlug}`;

    // Automatically expand if any item is active OR we are on the category page
    useEffect(() => {
        const hasActiveItem = items.some(item => pathname === `/tools/${item.slug}`);
        const isCategoryActive = pathname === categoryHref;
        if (hasActiveItem || isCategoryActive) setIsExpanded(true);
    }, [pathname, items, categoryHref]);

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-1">
                <Link
                    href={categoryHref}
                    onClick={() => isMobile && onItemClick?.()}
                    className={cn(
                        "flex-1 group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        pathname === categoryHref || items.some(item => pathname === `/tools/${item.slug}`)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{title}</span>
                </Link>
                <button
                    suppressHydrationWarning
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-all duration-200"
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.div>
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-1 pl-4 pt-1">
                            {items.map((item) => {
                                const ItemIcon = IconMap[item.iconName] || Box;
                                const itemHref = `/tools/${item.slug}`;
                                const isActive = pathname === itemHref;
                                return (
                                    <Link
                                        key={item.slug}
                                        href={itemHref}
                                        onClick={() => isMobile && onItemClick?.()}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1"
                                        )}
                                    >
                                        <ItemIcon className="h-3.5 w-3.5 shrink-0" />
                                        <span className="text-xs truncate">{item.title}</span>
                                        {isActive && <ChevronRight className="h-3 w-3 ml-auto opacity-50" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const groupedTools = useMemo(() => {
        const groups: Record<string, Tool[]> = {};
        tools.forEach(tool => {
            if (!groups[tool.category]) groups[tool.category] = [];
            groups[tool.category].push(tool);
        });
        return groups;
    }, []);

    const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);

    const { favorites } = useFavorites();
    const favoriteTools = useMemo(() => {
        return tools.filter(tool => favorites.includes(tool.slug));
    }, [favorites]);

    const SidebarContent = (
        <div className="flex flex-col h-full py-4 px-3 overflow-y-auto custom-scrollbar">
            <div className="px-3 mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 p-1 flex items-center gap-2">
                    <Zap className="h-3 w-3" /> Quick Access
                </h2>
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => isMobile && setIsMobileOpen(false)}
                                className={cn(
                                    "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "" : "group-hover:text-primary transition-colors")} />
                                    <span>{item.name}</span>
                                </div>
                                {item.badge && (
                                    <span className={cn(
                                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter",
                                        isActive ? "bg-white/20" : "bg-primary/10 text-primary"
                                    )}>
                                        {item.badge}
                                    </span>
                                )}
                                {!item.badge && isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {favoriteTools.length > 0 && (
                <div className="px-3 mb-6 border-t pt-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 p-1 flex items-center gap-2">
                        <Heart className="h-3 w-3 fill-current" /> Your Favorites
                    </h2>
                    <div className="space-y-1">
                        {favoriteTools.map((tool) => {
                            const Icon = IconMap[tool.iconName] || Box;
                            const isActive = pathname === `/tools/${tool.slug}`;
                            return (
                                <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    onClick={() => isMobile && setIsMobileOpen(false)}
                                    className={cn(
                                        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                                            : "text-muted-foreground hover:bg-red-500/10 hover:text-red-600"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={cn("h-4 w-4 shrink-0", isActive ? "" : "group-hover:text-red-500 transition-colors")} />
                                        <span className="truncate max-w-[140px]">{tool.title}</span>
                                    </div>
                                    {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="px-3 space-y-4 border-t pt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 p-1 flex items-center gap-2">
                    <Layout className="h-3 w-3" /> Tool Explorer
                </h2>

                {Object.entries(groupedTools).sort().map(([category, items]) => (
                    <DropdownMenu
                        key={category}
                        title={category}
                        icon={CategoryIcons[category] || Box}
                        items={items}
                        pathname={pathname}
                        isMobile={isMobile}
                        onItemClick={() => setIsMobileOpen(false)}
                    />
                ))}
            </div>

            <div className="px-3 space-y-4 border-t pt-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 p-1 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Company & Legal
                </h2>
                <div className="space-y-1">
                    {[
                        { name: 'About Us', href: '/about', icon: Info },
                        { name: 'Contact Us', href: '/contact', icon: Mail },
                        { name: 'Privacy Policy', href: '/privacy-policy', icon: Lock },
                        { name: 'Terms of Service', href: '/terms-of-service', icon: FileText },
                        { name: 'Disclaimer', href: '/disclaimer', icon: AlertTriangle }
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => isMobile && setIsMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-auto px-3 pt-6 pb-4">
                <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-bold text-primary uppercase mb-1 relative z-10">Premium Hub</p>
                    <p className="text-xs text-muted-foreground leading-tight relative z-10">{tools.length} Tools Available</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-30 border-r bg-background/60 backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden",
                isCollapsed ? "w-0 border-r-0" : "w-64"
            )}>
                <div className="w-64 h-full">
                    {SidebarContent}
                </div>
            </aside>

            {/* Mobile Trigger */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 ring-4 ring-background"
                    onClick={toggleSidebar}
                >
                    {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && isMobile && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleSidebar}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-background border-r shadow-2xl lg:hidden"
                        >
                            <div className="p-6 border-b flex items-center justify-between">
                                <span className="font-black text-xl tracking-tighter italic">Assets Tools Hub</span>
                                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            {SidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
