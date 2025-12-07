import { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Reveal } from '@/components/ui/motion';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/core';

const products = [
    {
        id: 1,
        name: 'Curcuma Bio Moulu',
        origin: 'Madagascar',
        price: '2 500',
        oldPrice: '3 000',
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
        rating: 4.9,
        reviews: 124,
        badge: '-17%',
        category: 'Racines',
    },
    {
        id: 2,
        name: 'Safran Premium',
        origin: 'Maroc',
        price: '15 000',
        weight: '1g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
        rating: 5.0,
        reviews: 89,
        badge: 'Premium',
        category: 'Pistils',
    },
    {
        id: 3,
        name: 'Piment Rouge Poudre',
        origin: 'Burkina Faso',
        price: '1 800',
        weight: '50g',
        image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80',
        rating: 4.8,
        reviews: 156,
        badge: 'Populaire',
        category: 'Piments',
    },
    {
        id: 4,
        name: 'Cannelle de Ceylan',
        origin: 'Sri Lanka',
        price: '3 500',
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80',
        rating: 4.9,
        reviews: 98,
        badge: 'Bio',
        category: 'Ecorces',
    },
    {
        id: 5,
        name: 'Poivre Noir de Kampot',
        origin: 'Cambodge',
        price: '4 500',
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
        rating: 5.0,
        reviews: 201,
        badge: 'Best-seller',
        category: 'Grains',
    },
    {
        id: 6,
        name: 'Gingembre Moulu',
        origin: 'Nigeria',
        price: '2 000',
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
        rating: 4.7,
        reviews: 145,
        badge: 'Nouveau',
        category: 'Racines',
    },
    {
        id: 7,
        name: 'Cardamome Verte',
        origin: 'Guatemala',
        price: '6 500',
        weight: '50g',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?w=400&q=80',
        rating: 4.8,
        reviews: 67,
        badge: 'Premium',
        category: 'Graines',
    },
    {
        id: 8,
        name: 'Paprika Fume',
        origin: 'Espagne',
        price: '2 800',
        weight: '75g',
        image: 'https://images.unsplash.com/photo-1599909631715-1ac36e658dc2?w=400&q=80',
        rating: 4.6,
        reviews: 112,
        category: 'Piments',
    },
];

export function ProductsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const toggleFavorite = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <section id="products" className="bg-gradient-to-b from-spice-50/50 to-white dark:from-slate-900 dark:to-slate-950 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                                Nos epices <span className="text-spice-700">vedettes</span>
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                Une selection de nos meilleures epices, disponibles en differents formats
                            </p>
                        </div>
                        <Link
                            href="#products"
                            className="hidden sm:flex items-center gap-2 text-sm font-medium text-spice-700 hover:text-spice-800 dark:text-spice-400 dark:hover:text-spice-300"
                        >
                            Voir tout le catalogue
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Reveal>

                {/* Products carousel */}
                <Reveal variant="fadeUp" delay={0.1}>
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group flex-shrink-0 w-[300px] rounded-2xl bg-white dark:bg-slate-800 overflow-hidden border border-spice-100 dark:border-slate-700 hover:shadow-xl hover:border-spice-200 dark:hover:border-spice-800 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-spice-50 dark:bg-slate-700">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Badge */}
                                    {product.badge && (
                                        <div className={cn(
                                            "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white",
                                            product.badge.startsWith('-') ? "bg-rose-500" :
                                            product.badge === 'Nouveau' ? "bg-spice-600" :
                                            product.badge === 'Best-seller' ? "bg-amber-500" :
                                            product.badge === 'Populaire' ? "bg-orange-500" :
                                            product.badge === 'Bio' ? "bg-green-600" :
                                            "bg-spice-700"
                                        )}>
                                            {product.badge}
                                        </div>
                                    )}

                                    {/* Weight badge */}
                                    <div className="absolute bottom-3 left-3 rounded-full px-3 py-1.5 bg-white/95 dark:bg-slate-900/95 text-spice-700 text-sm font-bold shadow-sm">
                                        {product.weight}
                                    </div>

                                    {/* Favorite button */}
                                    <button
                                        onClick={(e) => toggleFavorite(e, product.id)}
                                        className={cn(
                                            "absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-200",
                                            favorites.includes(product.id)
                                                ? "bg-rose-500 text-white"
                                                : "bg-white/95 text-slate-600 hover:bg-rose-50 hover:text-rose-500"
                                        )}
                                    >
                                        <Heart className={cn("h-5 w-5", favorites.includes(product.id) && "fill-current")} />
                                    </button>

                                    {/* Add to cart overlay */}
                                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-spice-700 hover:bg-spice-800 text-white shadow-lg transition-colors"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-muted-foreground">{product.category}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-spice-600 font-medium">{product.origin}</span>
                                    </div>

                                    <h3 className="font-bold text-foreground mb-3 group-hover:text-spice-700 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            <span className="text-sm font-medium text-foreground">{product.rating}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-spice-700 dark:text-spice-400">
                                            {product.price} F
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                {product.oldPrice} F
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Reveal>

                {/* Navigation arrows */}
                <div className="mt-8 flex items-center justify-between">
                    <Link
                        href="#products"
                        className="sm:hidden flex items-center gap-2 text-sm font-medium text-spice-700 hover:text-spice-800"
                    >
                        Voir tout le catalogue
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={() => scroll('left')}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-spice-100 dark:bg-slate-800 hover:bg-spice-200 dark:hover:bg-spice-900/30 transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 text-spice-700 dark:text-spice-400" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-spice-700 hover:bg-spice-800 text-white transition-colors"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
