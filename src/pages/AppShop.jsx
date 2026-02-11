import React from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Zap, Shield, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

const AppShop = () => {
    const navigate = useNavigate();

    const packages = [
        {
            title: "Mobile MVP",
            price: "1,50,000",
            icon: <Zap size={28} />,
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
            description: "Go from idea to App Store in record time. Perfect for startups.",
            features: [
                "Single Platform (iOS or Android)",
                "Firebase Backend Integration",
                "UI/UX Design Included",
                "Up to 5 Core Screens",
                "Push Notifications"
            ],
            gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)"
        },
        {
            title: "Advanced E-Com",
            price: "3,50,000",
            icon: <Smartphone size={28} />,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            description: "A full-scale mobile shopping experience for your growing brand.",
            features: [
                "Cross-Platform (iOS & Android)",
                "Full Catalog Management",
                "Secure Payment Gateway",
                "User Accounts & Profiles",
                "Admin Dashboard Access"
            ],
            gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
            highlight: true
        },
        {
            title: "Enterprise Custom",
            price: "Custom",
            icon: <Cpu size={28} />,
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            description: "Bespoke solutions with deep integration and high scalability.",
            features: [
                "Native Performance",
                "Custom Auth Systems",
                "Third-party API Integration",
                "Cloud Architecture Management",
                "Dedicated Launch Support"
            ],
            gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
        }
    ];

    return (
        <div className="page-container" style={{ paddingTop: 'clamp(6rem, 12vh, 8rem)', paddingBottom: '5rem' }}>
            {/* Background Accents */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 0% 0%, hsla(45, 100%, 50%, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, hsla(25, 30%, 15%, 0.05) 0%, transparent 50%)',
                zIndex: -1
            }} />

            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'left' }}>
                    <m.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '0.75rem' }}
                    >
                        Application Development
                    </m.p>
                    <m.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}
                    >
                        Build Your <br />
                        <span className="gradient-text">Digital Empire</span>
                    </m.h1>
                    <m.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '600px', fontSize: '1.15rem', lineHeight: 1.6 }}
                    >
                        We engineer mobile experiences that set industries on fire. High performance,
                        unmatched aesthetics, and pixel-perfect execution.
                    </m.p>
                </header>

                <div className="grid-cols-3" style={{ gap: '2rem' }}>
                    {packages.map((pkg, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="glass-card"
                            style={{
                                padding: 0,
                                overflow: 'hidden',
                                border: pkg.highlight ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                                boxShadow: pkg.highlight ? '0 20px 50px rgba(45, 100, 50, 0.15)' : 'none',
                                position: 'relative'
                            }}
                        >
                            {pkg.highlight && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '-2rem',
                                    background: 'hsl(var(--primary))',
                                    color: 'hsl(var(--foreground))',
                                    padding: '0.5rem 3rem',
                                    transform: 'rotate(45deg)',
                                    fontSize: '0.75rem',
                                    fontWeight: 900,
                                    zIndex: 10
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '60%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
                                }} />
                                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ padding: '0.5rem', background: 'hsla(0,0%,100%,0.2)', backdropFilter: 'blur(10px)', borderRadius: '12px' }}>
                                            {pkg.icon}
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pkg.title}</h3>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', marginRight: '4px' }}>Starting at</span>
                                    <span style={{ fontSize: pkg.price === 'Custom' ? '1.5rem' : '2.25rem', fontWeight: 900, color: 'hsl(var(--foreground))' }}>
                                        {pkg.price !== 'Custom' ? `₹${pkg.price}` : pkg.price}
                                    </span>
                                </div>

                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem', minHeight: '3rem' }}>
                                    {pkg.description}
                                </p>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    {pkg.features.map((feature, fIdx) => (
                                        <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '1rem' }}>
                                            <CheckCircle2 size={18} color="hsl(var(--primary))" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <m.button
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/book-meet')}
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        fontSize: '1rem',
                                        fontWeight: 800
                                    }}
                                >
                                    Enquire Now <ArrowRight size={20} />
                                </m.button>
                            </div>
                        </m.div>
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{
                        marginTop: '6rem',
                        padding: '4rem',
                        background: 'hsl(var(--foreground))',
                        borderRadius: '2rem',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'hsl(var(--primary))', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }} />
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>Need something <span className="gradient-text">unique?</span></h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
                        Our enterprise team handles complex integrations, custom AI models, and high-scale architectures.
                        Let's build your vision from scratch.
                    </p>
                    <button
                        onClick={() => navigate('/book-meet')}
                        className="btn-primary"
                        style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                    >
                        Schedule Strategy Session
                    </button>
                </m.div>
            </div>
        </div>
    );
};

export default AppShop;
