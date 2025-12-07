import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Menu, ShoppingCart, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AppearanceToggleDropdown } from '@/lib/core/ui';
import { motion } from '@/components/ui/motion';

const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Produits', href: '#products' },
    { label: 'Qualite', href: '#services' },
    { label: 'Avis', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
];

export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-spice-600/5'
                        : 'bg-transparent'
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={cn(
                        "flex items-center justify-between transition-all duration-300",
                        isScrolled ? "h-16" : "h-20"
                    )}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className={cn(
                                    "rounded-xl flex items-center justify-center transition-all duration-300",
                                    isScrolled ? "h-10 w-10 bg-spice-700" : "h-12 w-12 bg-spice-700"
                                )}
                            >
                                <Leaf className={cn(
                                    "text-white transition-all",
                                    isScrolled ? "h-5 w-5" : "h-6 w-6"
                                )} />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "font-bold tracking-tight leading-none transition-all",
                                    isScrolled ? "text-lg text-foreground" : "text-xl text-slate-900 dark:text-white"
                                )}>
                                    Epices <span className="text-spice-700">Sahel</span>
                                </span>
                                {!isScrolled && (
                                    <span className="text-xs text-spice-700 font-medium tracking-wide">
                                        Saveurs d'Afrique
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group",
                                        isScrolled
                                            ? "text-slate-600 dark:text-slate-300 hover:text-spice-700 hover:bg-spice-50 dark:hover:bg-spice-900/20"
                                            : "text-slate-700 dark:text-white/90 hover:text-spice-700"
                                    )}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-spice-700 rounded-full transition-all group-hover:w-1/2" />
                                </button>
                            ))}
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <AppearanceToggleDropdown
                                iconClassName={isScrolled ? "" : "text-slate-700 dark:text-white"}
                                buttonClassName="rounded-lg hover:bg-spice-50 dark:hover:bg-spice-900/20"
                            />

                            {/* Cart button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                                    isScrolled
                                        ? "bg-spice-50 dark:bg-spice-900/20 text-spice-700"
                                        : "bg-white/10 text-slate-700 dark:text-white hover:bg-spice-50 dark:hover:bg-white/20"
                                )}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-spice-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </motion.button>

                            {/* CTA Desktop */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden lg:block">
                                <Button
                                    asChild
                                    className={cn(
                                        "font-semibold group transition-all",
                                        isScrolled
                                            ? "h-10 px-5 rounded-lg bg-spice-700 hover:bg-spice-700 text-white"
                                            : "h-11 px-6 rounded-xl bg-spice-700 hover:bg-spice-700 text-white"
                                    )}
                                >
                                    <Link href="#contact">
                                        <span>Commander</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={cn(
                                    "lg:hidden h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                                    isScrolled
                                        ? "bg-spice-50 dark:bg-spice-900/20 text-spice-700"
                                        : "bg-white/10 text-slate-700 dark:text-white"
                                )}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Green accent line when scrolled */}
                {isScrolled && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-0.5 bg-gradient-to-r from-transparent via-spice-600 to-transparent"
                    />
                )}
            </motion.header>

            {/* Mobile menu */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? { opacity: 1, pointerEvents: 'auto' as const } : { opacity: 0, pointerEvents: 'none' as const }}
                className="fixed inset-0 z-40 lg:hidden"
            >
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: mobileMenuOpen ? 0 : '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 bg-spice-700 rounded-lg flex items-center justify-center">
                                    <Leaf className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold text-lg text-foreground">Epices Sahel</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="space-y-1 mb-8">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : 20 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNavClick(link.href)}
                                    className="w-full text-left px-4 py-3 rounded-xl font-medium text-foreground hover:bg-spice-50 dark:hover:bg-spice-900/20 hover:text-spice-700 transition-colors"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </nav>

                        <div className="space-y-3">
                            <Button asChild className="w-full h-12 rounded-xl bg-spice-700 hover:bg-spice-700 text-white font-semibold">
                                <Link href="#contact">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Commander maintenant
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
