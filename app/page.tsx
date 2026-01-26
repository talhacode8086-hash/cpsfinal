'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '@/lib/tools-config';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MousePointer2, Type, KeyRound, Braces, Target,
  Zap, Activity, Crosshair, Keyboard, Clock,
  BarChart3, Ruler, Monitor, Calculator,
  TrendingUp, Shuffle, LineChart, Mouse, Timer,
  Eye, Flame, Gamepad2, MonitorPlay, Sparkles, Search as SearchIcon,
  Filter, SortAsc, Maximize, Crop, RefreshCw, FileImage, Scale,
  AlarmClock, Globe, ListChecks, Droplet, Wind, Music, Dice5, Hash,
  Circle, Languages, Quote, Disc, ShieldCheck, Layers, Layout, Grid,
  Scaling, Compass, Palette, Box, Square, Minimize, Sliders, Info,
  Code, Pipette, Film, Scan, Barcode, Maximize2, ArrowLeftRight, RotateCw,
  GraduationCap, CalendarCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ToolCard } from '@/components/ui/ToolCard';

const iconMap: Record<string, any> = {
  MousePointer2, Type, KeyRound, Braces, Target,
  Zap, Activity, Crosshair, Keyboard, Clock,
  BarChart3, Ruler, Monitor, Calculator,
  TrendingUp, Shuffle, LineChart, Mouse, Timer,
  Eye, Flame, Gamepad2, MonitorPlay, Maximize,
  Crop, RefreshCw, FileImage, Scale, Search: SearchIcon,
  AlarmClock, Globe, ListChecks, Droplet, Wind, Music, Dice5, Hash,
  Circle, Languages, Quote, Disc, ShieldCheck, Layers, Layout, Grid,
  Scaling, Compass, Palette, Box, Square, Minimize, Sliders, Info,
  Code, Pipette, Film, Scan, Barcode, Maximize2, ArrowLeftRight, RotateCw,
  GraduationCap, CalendarCheck
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const allCategories = useMemo(() => Array.from(new Set(tools.map(t => t.category))), []);

  const filteredAndSortedTools = useMemo(() => {
    let result = tools.filter(t =>
      (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === 'All' || t.category === selectedCategory)
    );

    if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const displayedCategories = useMemo(() => {
    if (selectedCategory !== 'All') return [selectedCategory];
    return Array.from(new Set(filteredAndSortedTools.map(t => t.category)));
  }, [filteredAndSortedTools, selectedCategory]);

  const titleText = "Explore Our Powerful Toolkit";
  const titleWords = titleText.split(" ");

  return (
    <div className="space-y-12 pb-20">
      <section className="relative text-center space-y-8 pt-20 pb-10 overflow-hidden">
        {/* Background Decorative Element */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"
        />

        <div className="space-y-4 relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] flex flex-wrap justify-center gap-x-4">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className={cn(
                  "inline-block",
                  word === "Powerful" || word === "Toolkit" ? "text-primary italic" : ""
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Discover over 100+ professional tools designed to enhance your gaming performance,
            boost productivity, and streamline development.
          </motion.p>
        </div>
      </section>

      <div className="py-6 bg-transparent space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative max-w-2xl mx-auto"
        >
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for tools (e.g., CPS, JSON, Meta Tags...)"
            className="pl-14 h-14 rounded-full border-primary/20 focus:border-primary transition-all shadow-xl bg-background/50 focus:scale-[1.02] active:scale-[0.98]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full px-6 transition-all active:scale-90"
            onClick={() => setSelectedCategory('All')}
          >
            All Tools
          </Button>
          {allCategories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              className="rounded-full px-6 transition-all active:scale-90"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </motion.div>
      </div>

      <div className="space-y-16">
        {displayedCategories.sort().map((category) => {
          const categoryTools = filteredAndSortedTools.filter(t => t.category === category);
          if (categoryTools.length === 0) return null;

          return (
            <ScrollReveal
              key={category}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black tracking-tight">{category}</h2>
                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <span className="text-sm font-bold text-primary px-3 py-1 rounded-full bg-primary/10">{categoryTools.length} Tools</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2">
                <AnimatePresence mode="popLayout">
                  {categoryTools.map((tool, idx) => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      iconMap={iconMap}
                      idx={idx}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {filteredAndSortedTools.length === 0 && (
        <div className="text-center py-24 space-y-6">
          <div className="h-24 w-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto ring-8 ring-muted/20">
            <SearchIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">No results for "{searchQuery}"</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Try using different keywords or checking for typos.</p>
          </div>
          <Button variant="default" size="lg" className="rounded-full px-8" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
