'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

const Tabs = ({ value, defaultValue, onValueChange, children, className }: any) => {
    const [activeTab, setActiveTab] = React.useState(value || defaultValue);

    React.useEffect(() => {
        if (value) setActiveTab(value);
    }, [value]);

    const handleValueChange = (v: string) => {
        setActiveTab(v);
        onValueChange?.(v);
    };

    return (
        <TabsContext.Provider value={{ value: activeTab, onValueChange: handleValueChange }}>
            <div className={cn('w-full', className)}>{children}</div>
        </TabsContext.Provider>
    );
};

const TabsList = ({ className, ...props }: any) => (
    <div
        className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
            className
        )}
        {...props}
    />
);

const TabsTrigger = ({ className, value, ...props }: any) => {
    const context = React.useContext(TabsContext);
    const isActive = context?.value === value;

    return (
        <button
            onClick={() => context?.onValueChange(value)}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
                className
            )}
            {...props}
        />
    );
};

const TabsContent = ({ className, value, children }: any) => {
    const context = React.useContext(TabsContext);
    if (context?.value !== value) return null;

    return (
        <div className={cn('mt-2 animate-in fade-in duration-200', className)}>
            {children}
        </div>
    );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
