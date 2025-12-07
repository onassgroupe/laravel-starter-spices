import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal, Stagger, StaggerItem, motion } from '@/components/ui/motion';
import { TextField, TextareaField, SelectField } from '@/lib/core/ui';
import { ArrowRight, Clock, Leaf, Mail, MapPin, MessageCircle, Phone, Send, ShoppingBag } from 'lucide-react';

const inquiryOptions = [
    { value: 'commande', label: 'Passer une commande' },
    { value: 'renseignement', label: 'Renseignements produits' },
    { value: 'professionnel', label: 'Compte professionnel' },
    { value: 'partenariat', label: 'Partenariat / Distribution' },
    { value: 'autre', label: 'Autre demande' },
];

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiry: '',
        message: '',
    });

    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-spice-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-spice-200/30 dark:bg-spice-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-3xl" />
                {/* Floating leaves */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.25, 0.1],
                            y: [0, -25, 0],
                            rotate: [0, 15, -15, 0]
                        }}
                        transition={{
                            duration: 7 + i,
                            repeat: Infinity,
                            delay: i * 0.9
                        }}
                        className="absolute"
                        style={{
                            left: `${12 + i * 18}%`,
                            top: `${18 + (i % 3) * 28}%`
                        }}
                    >
                        <Leaf className="h-8 w-8 text-spice-300/30 dark:text-spice-700/20" />
                    </motion.div>
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Reveal variant="fadeUp">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                            Contactez{' '}
                            <span className="text-spice-700">Epices Sahel</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Une question sur nos produits ? Besoin d'un conseil ?
                            Notre equipe est la pour vous accompagner.
                        </p>
                    </div>
                </Reveal>

                <div className="grid lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-spice-700/10">
                    {/* Contact Info */}
                    <Reveal variant="slideLeft">
                        <div className="bg-spice-700 p-8 lg:p-10 text-white h-full relative overflow-hidden">
                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 border border-white rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 border border-white rounded-full translate-y-1/2 -translate-x-1/2" />
                            </div>

                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-8"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <Leaf className="h-8 w-8" />
                                    </motion.div>
                                    <div>
                                        <p className="font-bold text-xl">Epices Sahel</p>
                                        <p className="text-spice-200 text-sm">Saveurs d'Afrique</p>
                                    </div>
                                </motion.div>

                                <Stagger className="space-y-6 mb-10">
                                    <StaggerItem>
                                        <motion.a
                                            href="tel:+22625000000"
                                            whileHover={{ x: 5 }}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="h-12 w-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-spice-200 text-sm">Telephone</p>
                                                <p className="font-medium">+226 25 00 00 00</p>
                                                <p className="text-spice-200 text-sm">WhatsApp disponible</p>
                                            </div>
                                        </motion.a>
                                    </StaggerItem>

                                    <StaggerItem>
                                        <motion.a
                                            href="mailto:contact@epicessahel.bf"
                                            whileHover={{ x: 5 }}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="h-12 w-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-spice-200 text-sm">Email</p>
                                                <p className="font-medium">contact@epicessahel.bf</p>
                                            </div>
                                        </motion.a>
                                    </StaggerItem>

                                    <StaggerItem>
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-spice-200 text-sm">Boutique</p>
                                                <p className="font-medium">Quartier Zogona, Ouagadougou</p>
                                                <p className="text-spice-200 text-sm">Burkina Faso</p>
                                            </div>
                                        </div>
                                    </StaggerItem>

                                    <StaggerItem>
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-spice-200 text-sm">Horaires</p>
                                                <p className="font-medium">Lun - Sam : 8h - 19h</p>
                                                <p className="text-spice-200 text-sm">Dimanche : 9h - 14h</p>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                </Stagger>

                                {/* WhatsApp CTA */}
                                <motion.a
                                    href="https://wa.me/22625000000"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="block p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="h-8 w-8" />
                                        <div className="flex-1">
                                            <p className="font-medium">Commander via WhatsApp</p>
                                            <p className="text-sm text-spice-200">Reponse rapide garantie</p>
                                        </div>
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.div>
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </Reveal>

                    {/* Contact Form */}
                    <Reveal variant="slideRight" className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-900 p-8 lg:p-10 h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="h-12 w-12 bg-spice-100 dark:bg-spice-900/30 rounded-xl flex items-center justify-center">
                                    <ShoppingBag className="h-6 w-6 text-spice-700" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Envoyez-nous un message</h3>
                                    <p className="text-muted-foreground text-sm">Nous vous repondons sous 24h</p>
                                </div>
                            </motion.div>

                            <form className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="grid md:grid-cols-2 gap-6"
                                >
                                    <TextField
                                        label="Votre nom"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Aminata Ouedraogo"
                                    />
                                    <TextField
                                        label="Telephone"
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+226 XX XX XX XX"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="grid md:grid-cols-2 gap-6"
                                >
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="votre@email.com"
                                    />
                                    <SelectField
                                        label="Objet de votre demande"
                                        required
                                        options={inquiryOptions}
                                        value={formData.inquiry}
                                        onChange={(value) => setFormData({ ...formData, inquiry: value })}
                                        placeholder="Selectionnez..."
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <TextareaField
                                        label="Votre message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        placeholder="Decrivez votre demande : epices recherchees, quantites souhaitees, questions..."
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        * Champs obligatoires
                                    </p>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="submit"
                                            className="h-14 px-8 bg-spice-700 hover:bg-spice-800 text-white font-semibold rounded-2xl group"
                                        >
                                            <Send className="mr-2 h-5 w-5" />
                                            Envoyer le message
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
