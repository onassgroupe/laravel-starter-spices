import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Menu, ShoppingCart, X, Phone, Search, Heart, Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AppearanceToggleDropdown } from '@/lib/core/ui';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';

const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Produits', href: '#products' },
    { label: 'Qualite', href: '#services' },
    { label: 'Avis', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
];

// Exemple de produits dans le panier
const cartItems = [
    {
        id: 1,
        name: 'Curcuma Bio Moulu',
        price: 2500,
        quantity: 2,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&q=80',
    },
    {
        id: 2,
        name: 'Poivre Noir de Kampot',
        price: 4500,
        quantity: 1,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=100&q=80',
    },
    {
        id: 3,
        name: 'Safran Premium',
        price: 15000,
        quantity: 1,
        weight: '1g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&q=80',
    },
];

// Exemple de produits favoris
const favoriteItems = [
    {
        id: 1,
        name: 'Cannelle de Ceylan',
        price: 3500,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=100&q=80',
    },
    {
        id: 2,
        name: 'Gingembre Moulu',
        price: 2000,
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=100&q=80',
    },
];

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price) + ' F';

export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            {/* Fixed header container */}
            <div className="fixed top-0 left-0 right-0 z-50">
                {/* Top bar - promo */}
                <div className={cn(
                    "bg-spice-700 text-white text-center text-sm overflow-hidden transition-all duration-300",
                    isScrolled ? "h-0 py-0" : "h-auto py-2"
                )}>
                    <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-4">
                        <span className="font-medium">Livraison GRATUITE a partir de 25 000 F</span>
                        <span className="hidden sm:inline">|</span>
                        <span className="hidden sm:flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            +226 25 00 00 00
                        </span>
                    </div>
                </div>

                {/* Main header */}
                <header
                    className={cn(
                        'transition-all duration-300',
                        isScrolled
                            ? 'bg-white/98 dark:bg-slate-900/98 backdrop-blur-md shadow-lg shadow-spice-900/5'
                            : 'bg-white dark:bg-slate-900 border-b border-spice-100 dark:border-slate-800'
                    )}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className={cn(
                            "flex items-center justify-between transition-all duration-300",
                            isScrolled ? "h-16" : "h-18 lg:h-20"
                        )}>
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div
                                    className={cn(
                                        "rounded-xl flex items-center justify-center bg-spice-700 transition-all duration-300",
                                        isScrolled ? "h-9 w-9" : "h-11 w-11"
                                    )}
                                >
                                    <Leaf className={cn(
                                        "text-white transition-all",
                                        isScrolled ? "h-5 w-5" : "h-6 w-6"
                                    )} />
                                </div>
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "font-bold tracking-tight leading-none text-foreground transition-all",
                                        isScrolled ? "text-lg" : "text-xl"
                                    )}>
                                        Epices <span className="text-spice-700">Sahel</span>
                                    </span>
                                    <span className={cn(
                                        "text-xs text-spice-600 font-medium tracking-wide transition-all overflow-hidden",
                                        isScrolled ? "opacity-0 max-h-0" : "opacity-100 max-h-5"
                                    )}>
                                        Saveurs d'Afrique
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-spice-700 dark:hover:text-spice-400 transition-colors rounded-lg hover:bg-spice-50 dark:hover:bg-spice-900/20 group"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-spice-700 rounded-full transition-all group-hover:w-6" />
                                    </button>
                                ))}
                            </nav>

                            {/* Right Side */}
                            <div className="flex items-center gap-2 lg:gap-3">
                                {/* Search button */}
                                <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-spice-50 dark:hover:bg-slate-800 transition-colors">
                                    <Search className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </button>

                                {/* Theme toggle */}
                                <div className="hidden md:block">
                                    <AppearanceToggleDropdown
                                        buttonClassName="rounded-full hover:bg-spice-50 dark:hover:bg-slate-800"
                                    />
                                </div>

                                {/* Wishlist */}
                                <button
                                    onClick={() => setFavoritesOpen(true)}
                                    className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-spice-50 dark:hover:bg-slate-800 transition-colors relative"
                                >
                                    <Heart className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                        {favoriteItems.length}
                                    </span>
                                </button>

                                {/* Cart button */}
                                <button
                                    onClick={() => setCartOpen(true)}
                                    className="relative flex items-center gap-2 h-10 px-3 rounded-full bg-spice-50 dark:bg-spice-900/30 hover:bg-spice-100 dark:hover:bg-spice-900/50 transition-colors"
                                >
                                    <ShoppingCart className="h-5 w-5 text-spice-700 dark:text-spice-400" />
                                    <span className="hidden sm:block text-sm font-semibold text-spice-700 dark:text-spice-400">
                                        {formatPrice(cartTotal)}
                                    </span>
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-spice-700 text-xs font-bold text-white">
                                        {cartItems.length}
                                    </span>
                                </button>

                                {/* CTA Desktop */}
                                <div className="hidden lg:block">
                                    <Button
                                        asChild
                                        className={cn(
                                            "font-semibold rounded-full bg-spice-700 hover:bg-spice-800 text-white group transition-all",
                                            isScrolled ? "h-10 px-5" : "h-11 px-6"
                                        )}
                                    >
                                        <Link href="#contact">
                                            <span>Commander</span>
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden h-10 w-10 rounded-full flex items-center justify-center bg-spice-50 dark:bg-slate-800 text-spice-700 dark:text-spice-400 transition-colors"
                                >
                                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Green accent line when scrolled */}
                    <div className={cn(
                        "h-0.5 bg-gradient-to-r from-transparent via-spice-600 to-transparent transition-all duration-300",
                        isScrolled ? "opacity-100" : "opacity-0"
                    )} />
                </header>
            </div>

            {/* Cart Sheet */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetContent side="right" className="w-full sm:max-w-md">
                    <SheetHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
                        <SheetTitle className="flex items-center gap-2 text-xl">
                            <ShoppingCart className="h-5 w-5 text-spice-700" />
                            Mon Panier ({cartItems.length})
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <ShoppingCart className="h-16 w-16 text-slate-300 mb-4" />
                                <p className="text-lg font-medium text-foreground">Votre panier est vide</p>
                                <p className="text-muted-foreground mt-1">Ajoutez des epices pour commencer</p>
                            </div>
                        ) : (
                            <div className="space-y-4 px-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                        <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">{item.weight}</p>
                                            <p className="text-spice-700 font-bold mt-1">{formatPrice(item.price)}</p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded-lg p-1">
                                                <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <SheetFooter className="border-t border-slate-200 dark:border-slate-800 pt-4">
                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between text-lg">
                                <span className="font-medium text-foreground">Total</span>
                                <span className="font-bold text-spice-700">{formatPrice(cartTotal)}</span>
                            </div>
                            <Button className="w-full h-12 bg-spice-700 hover:bg-spice-800 text-white font-semibold rounded-xl">
                                Passer la commande
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Continuer mes achats
                            </button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Favorites Sheet */}
            <Sheet open={favoritesOpen} onOpenChange={setFavoritesOpen}>
                <SheetContent side="right" className="w-full sm:max-w-md">
                    <SheetHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
                        <SheetTitle className="flex items-center gap-2 text-xl">
                            <Heart className="h-5 w-5 text-rose-500" />
                            Mes Favoris ({favoriteItems.length})
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-4">
                        {favoriteItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <Heart className="h-16 w-16 text-slate-300 mb-4" />
                                <p className="text-lg font-medium text-foreground">Aucun favori</p>
                                <p className="text-muted-foreground mt-1">Ajoutez des produits a vos favoris</p>
                            </div>
                        ) : (
                            <div className="space-y-4 px-4">
                                {favoriteItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                        <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">{item.weight}</p>
                                            <p className="text-spice-700 font-bold mt-1">{formatPrice(item.price)}</p>
                                        </div>
                                        <div className="flex flex-col items-end justify-between">
                                            <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                                <Heart className="h-4 w-4 fill-current" />
                                            </button>
                                            <button className="p-2 bg-spice-700 hover:bg-spice-800 text-white rounded-lg transition-colors">
                                                <ShoppingCart className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <SheetFooter className="border-t border-slate-200 dark:border-slate-800 pt-4">
                        <div className="w-full space-y-3">
                            <Button className="w-full h-12 bg-spice-700 hover:bg-spice-800 text-white font-semibold rounded-xl">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Tout ajouter au panier
                            </Button>
                            <button
                                onClick={() => setFavoritesOpen(false)}
                                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Continuer mes achats
                            </button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Mobile menu */}
            <div
                className={cn(
                    'fixed inset-0 z-[60] lg:hidden transition-all duration-300',
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={cn(
                        'absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300',
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 bg-spice-700 rounded-xl flex items-center justify-center">
                                    <Leaf className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold text-lg text-foreground">Epices Sahel</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="space-y-1 mb-8">
                            {navLinks.map((link, index) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="w-full text-left px-4 py-3 rounded-xl font-medium text-foreground hover:bg-spice-50 dark:hover:bg-spice-900/20 hover:text-spice-700 transition-colors"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>

                        {/* Mobile cart & favorites */}
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={() => { setMobileMenuOpen(false); setFavoritesOpen(true); }}
                                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 text-foreground hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Heart className="h-5 w-5 text-rose-500" />
                                <span className="font-medium">Favoris ({favoriteItems.length})</span>
                            </button>
                            <button
                                onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }}
                                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-spice-50 dark:bg-spice-900/30 text-spice-700 hover:bg-spice-100 transition-colors"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="font-medium">Panier ({cartItems.length})</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <Button asChild className="w-full h-12 rounded-xl bg-spice-700 hover:bg-spice-800 text-white font-semibold">
                                <Link href="#contact">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Commander maintenant
                                </Link>
                            </Button>
                        </div>

                        {/* Contact info */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Contact</p>
                            <div className="flex items-center gap-2 text-sm text-foreground">
                                <Phone className="h-4 w-4 text-spice-600" />
                                +226 25 00 00 00
                            </div>
                        </div>

                        {/* Theme toggle mobile */}
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Theme</span>
                            <AppearanceToggleDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
