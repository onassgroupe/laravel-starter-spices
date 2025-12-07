import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Reveal, motion } from '@/components/ui/motion';
import { ArrowRight, Flame, Heart, ShoppingBag, Star } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Curcuma Bio',
        origin: 'Madagascar',
        price: 2500,
        oldPrice: 3000,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
        rating: 4.9,
        reviews: 124,
        hot: true,
        badge: 'Populaire',
    },
    {
        id: 2,
        name: 'Safran Premium',
        origin: 'Maroc',
        price: 15000,
        weight: '1g',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
        rating: 5.0,
        reviews: 89,
        badge: 'Premium',
    },
    {
        id: 3,
        name: 'Piment Rouge',
        origin: 'Burkina Faso',
        price: 1800,
        weight: '50g',
        image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80',
        rating: 4.8,
        reviews: 156,
        hot: true,
    },
    {
        id: 4,
        name: 'Cannelle Ceylan',
        origin: 'Sri Lanka',
        price: 3500,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80',
        rating: 4.9,
        reviews: 98,
    },
    {
        id: 5,
        name: 'Poivre Noir',
        origin: 'Cambodge',
        price: 4500,
        weight: '100g',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
        rating: 5.0,
        reviews: 201,
        badge: 'Best-seller',
    },
    {
        id: 6,
        name: 'Gingembre Moulu',
        origin: 'Nigeria',
        price: 2000,
        weight: '250g',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
        rating: 4.7,
        reviews: 145,
    },
];

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price) + ' F';

export function ProductsSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <section id="products" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                Nos epices <span className="text-spice-700">vedettes</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Une selection de nos meilleures epices, disponibles en differents formats
                            </p>
                        </div>
                        <Link
                            href="#products"
                            className="inline-flex items-center text-spice-700 dark:text-spice-400 font-medium hover:text-spice-800 dark:hover:text-spice-300 transition-colors group"
                        >
                            Voir tout le catalogue
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Reveal>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group"
                        >
                            <div className={`relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-all duration-500 border border-spice-100 dark:border-spice-900/30 ${
                                hoveredId === product.id ? 'shadow-2xl shadow-spice-500/10 -translate-y-2' : 'shadow-lg'
                            }`}>
                                {/* Product Image */}
                                <div className="relative h-[240px] overflow-hidden">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredId === product.id ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.badge && (
                                            <span className="px-3 py-1.5 bg-spice-700 text-white text-xs font-bold rounded-full">
                                                {product.badge}
                                            </span>
                                        )}
                                        {product.hot && (
                                            <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                                <Flame className="h-3 w-3" />
                                                Hot
                                            </span>
                                        )}
                                    </div>

                                    {/* Favorite button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleFavorite(product.id)}
                                        className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                                            favorites.includes(product.id)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white/90 text-slate-600 hover:bg-white shadow-md'
                                        }`}
                                    >
                                        <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                                    </motion.button>

                                    {/* Weight badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 text-spice-700 text-sm font-bold rounded-full">
                                            {product.weight}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-bold text-foreground">{product.rating}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-spice-600 font-medium">{product.origin}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-foreground mb-4">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-spice-700">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-sm text-muted-foreground line-through">
                                                    {formatPrice(product.oldPrice)}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-spice-700 hover:bg-spice-800 text-white rounded-xl"
                                        >
                                            <ShoppingBag className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <Reveal variant="fadeUp" delay={0.3}>
                    <div className="mt-16 text-center">
                        <Link
                            href="#products"
                            className="inline-flex items-center gap-2 text-spice-700 dark:text-spice-400 font-medium hover:text-spice-800 dark:hover:text-spice-300 transition-colors group"
                        >
                            Decouvrir tous nos produits
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
