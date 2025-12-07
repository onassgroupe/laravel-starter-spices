import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Reveal, motion } from '@/components/ui/motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Aminata Ouedraogo',
        role: 'Chef cuisiniere',
        location: 'Ouagadougou',
        rating: 5,
        text: "La qualite des epices est exceptionnelle ! Le curcuma et le gingembre sont d'une fraicheur incomparable. Mon restaurant a gagne en reputation grace a ces saveurs authentiques.",
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    {
        id: 2,
        name: 'Ibrahim Traore',
        role: 'Restaurateur',
        location: 'Bobo-Dioulasso',
        rating: 5,
        text: "Fournisseur fiable depuis 3 ans. La livraison est toujours ponctuelle et les prix sont competitifs. Je recommande vivement Epices Sahel a tous les professionnels.",
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
        id: 3,
        name: 'Fatou Diallo',
        role: 'Passionnee de cuisine',
        location: 'Ouagadougou',
        rating: 5,
        text: "J'ai decouvert des epices que je ne connaissais pas. Les conseils de l'equipe sont precieux et m'ont permis d'ameliorer mes recettes familiales. Merci !",
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const next = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-spice-100/50 dark:bg-spice-900/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-lime-100/50 dark:bg-lime-900/20 rounded-full blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Header & Navigation */}
                    <Reveal variant="slideRight">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                                Ce que nos clients{' '}
                                <span className="text-spice-700">disent</span>
                            </h2>
                            <p className="text-muted-foreground text-lg mb-10">
                                Plus de 10 000 clients nous font confiance pour la qualite
                                de nos epices et notre service.
                            </p>

                            {/* Navigation */}
                            <div className="flex items-center gap-4">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={prev}
                                        className="h-12 w-12 rounded-full border-2 border-spice-200 dark:border-spice-800 hover:bg-spice-50 dark:hover:bg-spice-900/20"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={next}
                                        className="h-12 w-12 rounded-full border-2 border-spice-200 dark:border-spice-800 hover:bg-spice-50 dark:hover:bg-spice-900/20"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                                <div className="flex items-center gap-2 ml-4">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setIsAutoPlaying(false);
                                                setCurrentIndex(index);
                                            }}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                index === currentIndex
                                                    ? 'w-8 bg-spice-700'
                                                    : 'w-2 bg-spice-200 dark:bg-spice-800'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right - Testimonial Card */}
                    <Reveal variant="slideLeft">
                        <div className="relative">
                            {/* Quote icon */}
                            <div className="absolute -top-6 -left-6 z-10">
                                <div className="h-14 w-14 bg-spice-700 rounded-2xl flex items-center justify-center shadow-lg shadow-spice-700/30">
                                    <Quote className="h-7 w-7 text-white" />
                                </div>
                            </div>

                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5 }}
                                className="bg-spice-50 dark:bg-slate-800 rounded-3xl p-8 lg:p-10"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-lg lg:text-xl text-foreground italic leading-relaxed mb-8">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonials[currentIndex].avatar}
                                        alt={testimonials[currentIndex].name}
                                        className="h-14 w-14 rounded-full object-cover border-2 border-spice-200 dark:border-spice-800"
                                    />
                                    <div>
                                        <p className="font-bold text-foreground">
                                            {testimonials[currentIndex].name}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative cards behind */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full bg-spice-100 dark:bg-spice-900/20 rounded-3xl -z-10" />
                            <div className="absolute -bottom-8 -right-8 w-full h-full bg-spice-50 dark:bg-spice-950/20 rounded-3xl -z-20" />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
