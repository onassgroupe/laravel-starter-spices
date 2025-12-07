import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal, motion } from '@/components/ui/motion';
import { ArrowRight, Flame, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Curcuma Bio',
        origin: 'Madagascar',
        price: 2500,
        oldPrice: 3000,
        unit: '100g',
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
        unit: '1g',
        image: 'https://images.unsplash.com/photo-1599909533169-74a3f76ef2a4?w=400&q=80',
        rating: 5.0,
        reviews: 89,
        badge: 'Premium',
    },
    {
        id: 3,
        name: 'Piment Rouge',
        origin: 'Burkina Faso',
        price: 1800,
        unit: '50g',
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
        unit: '100g',
        image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80',
        rating: 4.9,
        reviews: 98,
    },
    {
        id: 5,
        name: 'Poivre Noir',
        origin: 'Cambodge',
        price: 4500,
        unit: '100g',
        image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80',
        rating: 5.0,
        reviews: 201,
        badge: 'Best-seller',
    },
    {
        id: 6,
        name: 'Gingembre Frais',
        origin: 'Nigeria',
        price: 2000,
        unit: '250g',
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
            {/* Subtle pattern background */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23344125' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                Nos epices <span className="text-spice-700">vedettes</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Une selection de nos meilleures epices, choisies pour leur qualite exceptionnelle
                            </p>
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                variant="outline"
                                className="border-2 border-spice-200 dark:border-spice-800 text-spice-700 dark:text-spice-400 hover:bg-spice-50 dark:hover:bg-spice-900/20 rounded-full group px-6"
                            >
                                Voir tout le catalogue
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                </Reveal>

                {/* Products Grid - Masonry style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`group ${index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}
                        >
                            <div className={`relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-all duration-500 border border-spice-100 dark:border-spice-900/30 ${
                                hoveredId === product.id ? 'shadow-2xl shadow-spice-500/10 -translate-y-2' : 'shadow-lg'
                            }`}>
                                {/* Image container */}
                                <div className={`relative overflow-hidden ${index === 0 ? 'h-[280px] lg:h-[320px]' : 'h-[220px]'}`}>
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredId === product.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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
                                                : 'bg-white/90 text-slate-600 hover:bg-white'
                                        }`}
                                    >
                                        <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                                    </motion.button>

                                    {/* Quick add button - shows on hover */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: hoveredId === product.id ? 1 : 0,
                                            y: hoveredId === product.id ? 0 : 20
                                        }}
                                        className="absolute bottom-4 left-4 right-4"
                                    >
                                        <Button className="w-full h-11 bg-spice-700 hover:bg-spice-800 text-white rounded-xl font-semibold">
                                            <ShoppingBag className="h-4 w-4 mr-2" />
                                            Ajouter au panier
                                        </Button>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-bold text-foreground">{product.rating}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-spice-600 font-medium">{product.origin}</span>
                                    </div>

                                    <h3 className={`font-bold text-foreground mb-2 ${index === 0 ? 'text-xl' : 'text-lg'}`}>
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`font-bold text-spice-700 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-sm text-muted-foreground line-through">
                                                    {formatPrice(product.oldPrice)}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                                            / {product.unit}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA banner */}
                <Reveal variant="fadeUp" delay={0.3}>
                    <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-spice-700 via-spice-700 to-spice-800">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                        <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="hidden sm:flex h-20 w-20 bg-white/10 rounded-2xl items-center justify-center"
                                >
                                    <Sparkles className="h-10 w-10 text-white" />
                                </motion.div>
                                <div className="text-center lg:text-left">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                        Plus de 50 varietes disponibles
                                    </h3>
                                    <p className="text-spice-200 text-lg">
                                        Explorez notre catalogue complet d'epices du monde
                                    </p>
                                </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="h-14 px-8 bg-white hover:bg-spice-50 text-spice-700 font-bold rounded-2xl group"
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Explorer la boutique
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
