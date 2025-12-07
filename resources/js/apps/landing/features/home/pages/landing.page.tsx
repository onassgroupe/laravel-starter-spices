import { LandingLayout } from '@/apps/landing/features/home/layouts/landing.layout';
import { HeroSection } from '@/apps/landing/features/home/components/hero-section';
import { ProductsSection } from '@/apps/landing/features/home/components/products-section';
import { ServicesSection } from '@/apps/landing/features/home/components/services-section';
import { TestimonialsSection } from '@/apps/landing/features/home/components/testimonials-section';
import { FAQSection } from '@/apps/landing/features/home/components/faq-section';
import { ContactSection } from '@/apps/landing/features/home/components/contact-section';

export default function LandingPage() {
    return (
        <LandingLayout>
            <HeroSection />
            <ProductsSection />
            <ServicesSection />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
        </LandingLayout>
    );
}
