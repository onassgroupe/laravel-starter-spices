import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal, motion, AnimatePresence } from '@/components/ui/motion';
import {
    ArrowRight,
    Truck,
    CreditCard,
    Leaf,
    HelpCircle,
    MessageCircle,
    Package,
    ShieldCheck,
    Clock,
    Undo2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        id: 1,
        icon: Truck,
        category: 'Livraison',
        question: 'Quels sont les delais de livraison ?',
        answer: "Nous expedions vos commandes sous 24h ouvrables. La livraison prend 1 a 3 jours pour Ouagadougou et Bobo-Dioulasso, et 3 a 5 jours pour le reste du Burkina Faso. La livraison est gratuite des 15 000 F d'achat.",
    },
    {
        id: 2,
        icon: Package,
        category: 'Produits',
        question: 'Comment sont conditionnees vos epices ?',
        answer: "Toutes nos epices sont conditionnees dans des sachets hermetiques refermables pour preserver leur fraicheur et leurs aromes. Pour les commandes pro, nous proposons des contenants de 250g a 1kg selon vos besoins.",
    },
    {
        id: 3,
        icon: Leaf,
        category: 'Qualite',
        question: 'Vos epices sont-elles 100% naturelles ?',
        answer: "Absolument ! Nous garantissons des epices pures, sans additifs, colorants ni conservateurs. Nous selectionnons nos produits directement aupres de producteurs certifies en Afrique, Asie et Moyen-Orient.",
    },
    {
        id: 4,
        icon: ShieldCheck,
        category: 'Conservation',
        question: 'Comment conserver mes epices ?',
        answer: "Gardez vos epices dans un endroit frais et sec, a l'abri de la lumiere directe. Nos sachets refermables permettent une conservation optimale de 6 a 12 mois. Evitez l'humidite et les sources de chaleur.",
    },
    {
        id: 5,
        icon: Undo2,
        category: 'Retours',
        question: 'Puis-je retourner ma commande ?',
        answer: "Si vous n'etes pas satisfait, contactez-nous sous 7 jours. Nous echangeons ou remboursons tout produit non ouvert. Pour les produits defectueux, nous procedons a un remplacement immediat sans frais.",
    },
    {
        id: 6,
        icon: CreditCard,
        category: 'Paiement',
        question: 'Quels moyens de paiement acceptez-vous ?',
        answer: "Nous acceptons Orange Money, Moov Money, les virements bancaires et le paiement a la livraison (uniquement a Ouagadougou et Bobo-Dioulasso). Pour les professionnels, nous proposons le paiement a 30 jours.",
    },
];

export function FAQSection() {
    const [selectedId, setSelectedId] = useState<number>(1);

    const selectedFaq = faqs.find((faq) => faq.id === selectedId);

    return (
        <section id="faq" className="py-24 bg-gradient-to-br from-amber-50 via-white to-spice-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-spice-200/40 dark:bg-spice-900/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/40 dark:bg-amber-900/20 rounded-full blur-3xl" />
                {/* Floating spice leaves pattern */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 6 + i,
                            repeat: Infinity,
                            delay: i * 1.5,
                        }}
                        className="absolute"
                        style={{
                            left: `${8 + i * 20}%`,
                            top: `${20 + (i % 2) * 50}%`,
                        }}
                    >
                        <Leaf className="h-10 w-10 text-spice-300/30 dark:text-spice-700/20" />
                    </motion.div>
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center justify-center h-16 w-16 bg-spice-700 rounded-2xl mb-6 shadow-lg shadow-spice-700/30"
                        >
                            <HelpCircle className="h-8 w-8 text-white" />
                        </motion.div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                            Questions{' '}
                            <span className="text-spice-700">frequentes</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Tout ce que vous devez savoir sur nos epices, la livraison et vos commandes.
                        </p>
                    </div>
                </Reveal>

                {/* Interactive FAQ Grid */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Questions List - Left Side */}
                    <Reveal variant="slideRight" className="lg:col-span-2">
                        <div className="space-y-3">
                            {faqs.map((faq, index) => {
                                const Icon = faq.icon;
                                const isSelected = selectedId === faq.id;

                                return (
                                    <motion.button
                                        key={faq.id}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        onClick={() => setSelectedId(faq.id)}
                                        className={cn(
                                            'w-full text-left p-4 rounded-2xl border transition-all duration-300 group',
                                            isSelected
                                                ? 'bg-spice-700 border-spice-700 shadow-lg shadow-spice-700/30'
                                                : 'bg-white dark:bg-slate-900 border-spice-100 dark:border-slate-800 hover:border-spice-300 dark:hover:border-spice-700 hover:shadow-md'
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                whileHover={{ rotate: isSelected ? 0 : 10 }}
                                                className={cn(
                                                    'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                                                    isSelected
                                                        ? 'bg-white/20'
                                                        : 'bg-spice-100 dark:bg-spice-900/30'
                                                )}
                                            >
                                                <Icon
                                                    className={cn(
                                                        'h-6 w-6 transition-colors',
                                                        isSelected ? 'text-white' : 'text-spice-700'
                                                    )}
                                                />
                                            </motion.div>
                                            <div className="flex-1 min-w-0">
                                                <span
                                                    className={cn(
                                                        'text-xs font-medium uppercase tracking-wider',
                                                        isSelected
                                                            ? 'text-spice-200'
                                                            : 'text-spice-500'
                                                    )}
                                                >
                                                    {faq.category}
                                                </span>
                                                <p
                                                    className={cn(
                                                        'font-semibold truncate transition-colors',
                                                        isSelected
                                                            ? 'text-white'
                                                            : 'text-foreground group-hover:text-spice-700'
                                                    )}
                                                >
                                                    {faq.question}
                                                </p>
                                            </div>
                                            <motion.div
                                                animate={{ x: isSelected ? 0 : -5, opacity: isSelected ? 1 : 0 }}
                                                className="flex-shrink-0"
                                            >
                                                <ArrowRight className="h-5 w-5 text-white" />
                                            </motion.div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* Answer Display - Right Side */}
                    <Reveal variant="slideLeft" className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-spice-100 dark:border-slate-800 p-8 lg:p-10 h-full shadow-xl shadow-spice-700/5">
                            <AnimatePresence mode="wait">
                                {selectedFaq && (
                                    <motion.div
                                        key={selectedFaq.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Answer Header */}
                                        <div className="flex items-start gap-4 mb-8">
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                className="h-14 w-14 bg-spice-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-spice-700/30"
                                            >
                                                <selectedFaq.icon className="h-7 w-7 text-white" />
                                            </motion.div>
                                            <div>
                                                <span className="text-sm font-medium text-spice-600 uppercase tracking-wider">
                                                    {selectedFaq.category}
                                                </span>
                                                <h3 className="text-xl lg:text-2xl font-bold text-foreground mt-1">
                                                    {selectedFaq.question}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-spice-100 dark:bg-slate-800 mb-8" />

                                        {/* Answer Content */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-muted-foreground text-lg leading-relaxed mb-8"
                                        >
                                            {selectedFaq.answer}
                                        </motion.p>

                                        {/* CTA */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-spice-50 dark:bg-slate-800 rounded-2xl p-6 border border-spice-100 dark:border-slate-700"
                                        >
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <motion.div
                                                        animate={{ rotate: [0, 10, -10, 0] }}
                                                        transition={{ duration: 4, repeat: Infinity }}
                                                    >
                                                        <MessageCircle className="h-6 w-6 text-spice-700" />
                                                    </motion.div>
                                                    <p className="text-foreground font-medium">
                                                        Besoin de plus de details ?
                                                    </p>
                                                </div>
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                        asChild
                                                        className="bg-spice-700 hover:bg-spice-800 text-white rounded-full px-6 group"
                                                    >
                                                        <a href="#contact">
                                                            Contactez-nous
                                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </a>
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>

                {/* Bottom Stats */}
                <Reveal variant="fadeUp">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { icon: Clock, value: '24h', label: 'Expedition rapide' },
                            { icon: ShieldCheck, value: '100%', label: 'Qualite garantie' },
                            { icon: Package, value: '50+', label: 'Varietes d\'epices' },
                            { icon: Truck, value: '15 000 F', label: 'Livraison offerte' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-spice-100 dark:border-slate-800 text-center"
                            >
                                <stat.icon className="h-6 w-6 text-spice-700 mx-auto mb-3" />
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </Reveal>
            </div>
        </section>
    );
}
