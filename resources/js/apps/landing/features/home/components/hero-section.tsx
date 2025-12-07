import { Button } from '@/components/ui/button';
import { motion } from '@/components/ui/motion';
import { ArrowRight, Check, Leaf, ShoppingCart, Star, Truck } from 'lucide-react';

const features = [
    '100% Naturel & Bio',
    'Livraison 24-48h',
    'Satisfait ou Rembourse',
];

export function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-spice-50 via-white to-lime-50 dark:from-slate-950 dark:via-slate-900 dark:to-spice-950">
            {/* Organic blob shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-spice-200/40 dark:bg-spice-900/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-lime-200/40 dark:bg-lime-900/20 rounded-full blur-3xl"
                />
            </div>

            {/* Floating leaves */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, rotate: 0 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            y: [-20, -80, -20],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.8,
                        }}
                        className="absolute text-spice-500/30"
                        style={{
                            left: `${5 + i * 12}%`,
                            top: `${50 + (i % 3) * 15}%`,
                        }}
                    >
                        <Leaf className="h-8 w-8" style={{ transform: `rotate(${i * 45}deg)` }} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]"
                        >
                            L'art des{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-spice-700">epices</span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="absolute bottom-2 left-0 h-4 bg-spice-200 dark:bg-spice-800/50 -z-0"
                                />
                            </span>
                            <br />
                            d'Afrique
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                        >
                            Decouvrez des saveurs authentiques selectionnees avec soin
                            aupres des meilleurs producteurs du continent africain.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-foreground"
                                >
                                    <div className="h-5 w-5 rounded-full bg-spice-100 dark:bg-spice-900/30 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-spice-700" />
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="h-14 px-8 bg-spice-700 hover:bg-spice-700 text-white font-semibold rounded-xl group shadow-lg shadow-spice-700/25"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    <span>Voir la boutique</span>
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 border-2 border-spice-200 dark:border-spice-800 text-spice-700 dark:text-spice-500 hover:bg-spice-50 dark:hover:bg-spice-900/20 font-semibold rounded-xl"
                                >
                                    <Leaf className="mr-2 h-5 w-5" />
                                    <span>Notre histoire</span>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex items-center gap-6 pt-8 border-t border-spice-100 dark:border-spice-900/30"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <span className="text-foreground font-semibold">4.9</span>
                                <span className="text-muted-foreground text-sm">(2k+ avis)</span>
                            </div>
                            <div className="h-6 w-px bg-spice-200 dark:bg-spice-800" />
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Truck className="h-5 w-5 text-spice-700" />
                                <span className="text-sm">Livraison offerte des 15 000 F</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className="relative lg:h-[600px]">
                        {/* Main product card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative z-10"
                        >
                            <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-2xl shadow-spice-600/10 border border-spice-100 dark:border-spice-900/30">
                                <div className="relative rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80"
                                        alt="Collection d'epices"
                                        className="w-full h-[280px] object-cover"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-spice-700 text-white text-sm font-medium rounded-full">
                                        Bestseller
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">Coffret Decouverte</h3>
                                            <p className="text-muted-foreground">6 epices premium</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-spice-50 dark:bg-spice-900/20 px-2 py-1 rounded-lg">
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <span className="text-sm font-semibold">4.9</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div>
                                            <span className="text-2xl font-bold text-spice-700">12 500 F</span>
                                            <span className="text-muted-foreground text-sm ml-2 line-through">15 000 F</span>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button className="bg-spice-700 hover:bg-spice-700 text-white rounded-xl">
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Ajouter
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating product cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="absolute -left-8 top-20 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-spice-100 dark:border-spice-900/30 z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&q=80"
                                        alt="Curcuma"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Curcuma Bio</p>
                                    <p className="text-spice-700 font-bold">2 500 F</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="absolute -right-4 bottom-32 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-spice-100 dark:border-spice-900/30 z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1599909533169-74a3f76ef2a4?w=100&q=80"
                                        alt="Safran"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Safran Premium</p>
                                    <p className="text-spice-700 font-bold">15 000 F</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.9 }}
                            className="absolute right-10 top-0 bg-spice-700 text-white rounded-2xl p-4 shadow-lg"
                        >
                            <p className="text-3xl font-bold">50+</p>
                            <p className="text-spice-200 text-sm">varietes</p>
                        </motion.div>

                        {/* Decorative circle */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 border-4 border-dashed border-spice-200 dark:border-spice-800/30 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Organic wave bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0 180V60C240 120 480 0 720 60C960 120 1200 0 1440 60V180H0Z"
                        className="fill-white dark:fill-slate-900"
                    />
                    <path
                        d="M0 180V80C240 140 480 20 720 80C960 140 1200 20 1440 80V180H0Z"
                        className="fill-spice-50/50 dark:fill-spice-950/30"
                    />
                </svg>
            </div>
        </section>
    );
}
