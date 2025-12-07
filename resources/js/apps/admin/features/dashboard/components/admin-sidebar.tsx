import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/core/utils';
import {
    Home,
    Users,
    Settings,
    Building2,
    BarChart3,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { title: 'Utilisateurs', href: '/admin/users', icon: Users },
    { title: 'Organisations', href: '/admin/organizations', icon: Building2 },
    { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { title: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => url.startsWith(href);

    const NavContent = () => (
        <>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                {!collapsed && (
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-lg">Admin</span>
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden lg:flex"
                >
                    <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                            isActive(item.href)
                                ? 'bg-white/15 text-white shadow-lg'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                    </Link>
                ))}
            </nav>
        </>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/80 backdrop-blur-xl shadow-lg"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 bottom-0 z-50 flex flex-col',
                    'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950',
                    'border-r border-white/10',
                    'transition-all duration-300',
                    // Desktop
                    'lg:translate-x-0',
                    collapsed ? 'lg:w-20' : 'lg:w-72',
                    // Mobile
                    mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full'
                )}
            >
                {/* Mobile close */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10"
                >
                    <X className="h-5 w-5 text-white" />
                </button>

                <NavContent />
            </aside>
        </>
    );
}
