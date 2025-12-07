import { useAuth } from '@/lib/core/hooks';
import { Link } from '@inertiajs/react';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/core/utils';

interface AdminHeaderProps {
    title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-8">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50" />

            <div className="relative flex items-center gap-4">
                {title && <h1 className="text-lg font-semibold hidden sm:block">{title}</h1>}
            </div>

            <div className="relative flex items-center gap-2">
                {/* Search */}
                <button className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </button>

                {/* Notifications */}
                <button className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                    </button>

                    {dropdownOpen && (
                        <div className={cn(
                            'absolute right-0 mt-2 w-56 rounded-xl overflow-hidden',
                            'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl',
                            'border border-white/20 dark:border-gray-700/50',
                            'shadow-[0_16px_64px_rgba(0,0,0,0.15)]'
                        )}>
                            <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                                <p className="font-medium text-sm">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                            <div className="p-1">
                                <Link
                                    href="/admin/settings"
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                                >
                                    <Settings className="h-4 w-4" />
                                    Paramètres
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
