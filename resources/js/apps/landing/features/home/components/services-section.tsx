import { Reveal, motion } from '@/components/ui/motion';
import {
    Truck,
    Package,
    Leaf,
    ShieldCheck,
    Globe,
    Recycle,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
    {
        icon: Globe,
        title: 'Import Direct',
        description: 'Selection rigoureuse aupres des meilleurs producteurs d\'Afrique, d\'Asie et du Moyen-Orient.',
        accent: 'spice',
    },
    {
        icon: Leaf,
        title: '100% Naturel',
        description: 'Aucun additif, colorant ou conservateur. Que des epices pures et authentiques.',
        accent: 'lime',
    },
    {
        icon: Package,
        title: 'Fraicheur Garantie',
        description: 'Conditionnement hermetique pour preserver tous les aromes et saveurs.',
        accent: 'amber',
    },
    {
        icon: Truck,
        title: 'Livraison Rapide',
        description: 'Expedition sous 24h. Livraison gratuite des 15 000 F dans tout le Burkina.',
        accent: 'spice',
    },
    {
        icon: ShieldCheck,
        title: 'Qualite Certifiee',
        description: 'Controles qualite stricts et tracabilite complete de chaque produit.',
        accent: 'lime',
    },
    {
        icon: Recycle,
        title: 'Eco-Responsable',
        description: 'Emballages recyclables et partenariats equitables avec nos producteurs.',
        accent: 'amber',
    },
];

const stats = [
    { value: '50+', label: 'Varietes d\'epices' },
    { value: '10K+', label: 'Clients satisfaits' },
    { value: '15', label: 'Pays sources' },
    { value: '24h', label: 'Livraison express' },
];

export function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-gradient-to-b from-spice-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-spice-200/30 dark:bg-spice-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            Pourquoi choisir{' '}
                            <span className="text-spice-700">Epices Sahel</span> ?
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            La qualite et l'authenticite au coeur de notre demarche depuis plus de 10 ans.
                        </p>
                    </div>
                </Reveal>

                {/* Features Grid - Card style with hover effects */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="relative h-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-spice-100 dark:border-spice-900/30 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-spice-500/10">
                                {/* Icon with animated background */}
                                <div className="relative mb-6">
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
                                            feature.accent === 'spice'
                                                ? 'bg-spice-100 dark:bg-spice-900/30'
                                                : feature.accent === 'lime'
                                                ? 'bg-lime-100 dark:bg-lime-900/30'
                                                : 'bg-amber-100 dark:bg-amber-900/30'
                                        }`}
                                    >
                                        <feature.icon className={`h-8 w-8 ${
                                            feature.accent === 'spice'
                                                ? 'text-spice-700'
                                                : feature.accent === 'lime'
                                                ? 'text-lime-700'
                                                : 'text-amber-600'
                                        }`} />
                                    </motion.div>
                                    {/* Glow effect on hover */}
                                    <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity ${
                                        feature.accent === 'spice'
                                            ? 'bg-spice-300'
                                            : feature.accent === 'lime'
                                            ? 'bg-lime-300'
                                            : 'bg-amber-300'
                                    }`} />
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Corner accent on hover */}
                                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                                    feature.accent === 'spice'
                                        ? 'bg-spice-100 dark:bg-spice-900/30'
                                        : feature.accent === 'lime'
                                        ? 'bg-lime-100 dark:bg-lime-900/30'
                                        : 'bg-amber-100 dark:bg-amber-900/30'
                                }`} />

                                {/* Arrow indicator */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <ArrowRight className={`h-5 w-5 ${
                                        feature.accent === 'spice'
                                            ? 'text-spice-700'
                                            : feature.accent === 'lime'
                                            ? 'text-lime-700'
                                            : 'text-amber-600'
                                    }`} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section - Horizontal bar design */}
                <Reveal variant="fadeUp" delay={0.3}>
                    <div className="relative overflow-hidden rounded-3xl bg-spice-700">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <circle cx="1" cy="1" r="1" fill="white" />
                                </pattern>
                                <rect width="100" height="100" fill="url(#grid)" />
                            </svg>
                        </div>

                        <div className="relative p-8 lg:p-12">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-center relative"
                                    >
                                        {/* Divider - only between items on desktop */}
                                        {index > 0 && (
                                            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
                                        )}

                                        <motion.p
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
                                            viewport={{ once: true }}
                                            className="text-5xl lg:text-6xl font-bold text-white mb-2"
                                        >
                                            {stat.value}
                                        </motion.p>
                                        <p className="text-spice-200 font-medium text-lg">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* CTA Section */}
                <Reveal variant="fadeUp" delay={0.4}>
                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-6 text-lg">
                            Pret a decouvrir nos epices d'exception ?
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                size="lg"
                                className="h-14 px-8 bg-spice-700 hover:bg-spice-800 text-white font-semibold rounded-2xl group"
                            >
                                Decouvrir nos produits
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
