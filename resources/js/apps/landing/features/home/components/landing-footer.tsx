import { Link } from '@inertiajs/react';
import { motion } from '@/components/ui/motion';
import { Facebook, Leaf, Instagram, Mail, MapPin, Phone, ArrowUp, ShoppingBag } from 'lucide-react';

const footerLinks = {
    Produits: [
        { name: 'Curcuma', href: '#products' },
        { name: 'Safran', href: '#products' },
        { name: 'Gingembre', href: '#products' },
        { name: 'Poivre noir', href: '#products' },
        { name: 'Cannelle', href: '#products' },
    ],
    Services: [
        { name: 'Particuliers', href: '#services' },
        { name: 'Professionnels', href: '#services' },
        { name: 'Restaurateurs', href: '#services' },
        { name: 'Grossistes', href: '#services' },
    ],
    Informations: [
        { name: 'A propos', href: '#about' },
        { name: 'Livraison', href: '#faq' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' },
    ],
    Legal: [
        { name: 'Conditions generales', href: '#terms' },
        { name: 'Politique de confidentialite', href: '#privacy' },
        { name: 'Retours et remboursements', href: '#returns' },
    ],
};

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
];

export function LandingFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-spice-700/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            </div>

            {/* Back to top button */}
            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-12 w-12 bg-spice-700 rounded-full flex items-center justify-center shadow-lg shadow-spice-700/30 hover:shadow-xl hover:shadow-spice-700/40 transition-shadow"
                    >
                        <ArrowUp className="h-5 w-5 text-white" />
                    </motion.button>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="py-16 pt-20">
                    <div className="grid gap-12 lg:grid-cols-6">
                        {/* Brand column */}
                        <div className="space-y-6 lg:col-span-2">
                            <Link href="/" className="inline-flex items-center gap-3 group">
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-spice-700 shadow-lg shadow-spice-700/30"
                                >
                                    <Leaf className="h-6 w-6 text-white" />
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white group-hover:text-spice-400 transition-colors">
                                        Epices Sahel
                                    </span>
                                    <span className="text-xs text-spice-400">Saveurs d'Afrique</span>
                                </div>
                            </Link>

                            <p className="text-slate-400 leading-relaxed">
                                Votre specialiste en epices de qualite.
                                Plus de 50 varietes venues du monde entier.
                            </p>

                            <div className="space-y-3">
                                <motion.a
                                    href="tel:+22625000000"
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-slate-400 hover:text-spice-400 transition-colors"
                                >
                                    <div className="rounded-lg bg-spice-700/20 p-2">
                                        <Phone className="h-4 w-4 text-spice-400" />
                                    </div>
                                    <span>+226 25 00 00 00</span>
                                </motion.a>
                                <motion.a
                                    href="mailto:contact@epicessahel.bf"
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-slate-400 hover:text-spice-400 transition-colors"
                                >
                                    <div className="rounded-lg bg-spice-700/20 p-2">
                                        <Mail className="h-4 w-4 text-spice-400" />
                                    </div>
                                    <span>contact@epicessahel.bf</span>
                                </motion.a>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <div className="rounded-lg bg-spice-700/20 p-2">
                                        <MapPin className="h-4 w-4 text-spice-400" />
                                    </div>
                                    <span>Quartier Zogona, Ouagadougou</span>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="flex items-center gap-3 pt-2">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`group rounded-xl bg-slate-800 p-3 text-slate-400 transition-all duration-300 hover:text-white ${social.color}`}
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Links columns */}
                        {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: categoryIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h4 className="text-lg font-bold text-white">{category}</h4>
                                <ul className="space-y-3">
                                    {links.map((link, linkIndex) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: linkIndex * 0.05 }}
                                            viewport={{ once: true }}
                                        >
                                            <motion.a
                                                href={link.href}
                                                whileHover={{ x: 5 }}
                                                className="inline-flex items-center text-slate-400 transition-colors hover:text-spice-400"
                                            >
                                                <span className="h-1 w-0 bg-spice-700 rounded-full mr-0 transition-all group-hover:w-2 group-hover:mr-2" />
                                                {link.name}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800 py-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <p className="text-center text-slate-400 md:text-left">
                            © {new Date().getFullYear()} Epices Sahel. Tous droits reserves.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                            <motion.a
                                href="#privacy"
                                whileHover={{ color: '#8f9f65' }}
                                className="transition-colors"
                            >
                                Confidentialite
                            </motion.a>
                            <span className="text-slate-700">•</span>
                            <motion.a
                                href="#terms"
                                whileHover={{ color: '#8f9f65' }}
                                className="transition-colors"
                            >
                                Conditions
                            </motion.a>
                            <span className="text-slate-700">•</span>
                            <motion.a
                                href="#cookies"
                                whileHover={{ color: '#8f9f65' }}
                                className="transition-colors"
                            >
                                Cookies
                            </motion.a>
                        </div>

                        <p className="text-center text-sm text-slate-400 md:text-right flex items-center gap-1">
                            Fait avec{' '}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ShoppingBag className="h-4 w-4 text-spice-500 inline" />
                            </motion.span>{' '}
                            par{' '}
                            <span className="font-semibold text-spice-400">onassgroupe</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
