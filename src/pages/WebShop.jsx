import React from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Layout, Search, ShoppingBag, ArrowRight, Zap, Target, Layers } from 'lucide-react';

const WebShop = () => {
    const navigate = useNavigate();

    const solutions = [
        {
            title: "Performance Landing Page",
            price: "80,000",
            icon: <Zap size={28} />,
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800",
            description: "High-conversion designs tailored for marketing campaigns and single products.",
            features: [
                "Lightning Fast Load Speed",
                "Mobile-First Architecture",
                "Built-in Analytics Ready",
                "SEO Optimized Structure",
                "Lead Capture Systems"
            ],
            color: "hsl(var(--primary))"
        },
        {
            title: "Premium Business Hub",
            price: "1,80,000",
            icon: <Globe size={28} />,
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
            description: "A comprehensive digital home for established brands and corporate identity.",
            features: [
                "Up to 10 Custom Pages",
                "CMS (Content Management)",
                "Blog & Media Resources",
                "Interactive Components",
                "Advanced SEO Strategy"
            ],
            color: "hsl(var(--foreground))",
            highlight: true
        },
        {
            title: "E-Commerce Powerhouse",
            price: "3,00,000",
            icon: <ShoppingBag size={28} />,
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
            description: "Scale your sales with a robust, custom-built online store experience.",
            features: [
                "Unlimited Product Listings",
                "Inventory Management Hub",
                "Multi-gateway Payments",
                "Customer Account Suite",
                "Order Tracking System"
            ],
            color: "#302b63"
        }
    ];

    return (
        <div className="page-container" style={{ paddingTop: 'clamp(6rem, 12vh, 8rem)', paddingBottom: '5rem' }}>
            <div className="container">
                <header style={{ marginBottom: '5rem' }}>
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p style={{ color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Web Solutions
                        </p>
                        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1, fontWeight: 900 }}>
                            Websites That <br />
                            <span className="gradient-text">Dominate.</span>
                        </h1>
                        <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '650px', fontSize: '1.25rem', lineHeight: 1.6 }}>
                            We don't just build sites; we craft high-performance digital machines that drive growth,
                            engage users, and convert visitors into loyal customers.
                        </p>
                    </m.div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
                    {solutions.map((sol, i) => (
                        <m.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                            style={{ position: 'relative' }}
                        >
                            <div className="glass-card" style={{
                                padding: 0,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                border: sol.highlight ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                                boxShadow: sol.highlight ? '0 15px 40px rgba(45, 100, 50, 0.1)' : 'none'
                            }}>
                                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                    <m.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.7 }}
                                        src={sol.image}
                                        alt={sol.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '16px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'hsl(var(--primary))',
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                        }}>
                                            {sol.icon}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', fontWeight: 800 }}>{sol.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 900 }}>₹{sol.price}</span>
                                        <span style={{ color: 'hsl(var(--muted-foreground))', marginLeft: '6px', fontWeight: 600 }}>Starting</span>
                                    </div>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '2rem', lineHeight: 1.6 }}>{sol.description}</p>

                                    <div style={{ flex: 1, marginBottom: '2.5rem' }}>
                                        {sol.features.map((feat, fi) => (
                                            <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                                <Target size={16} color="hsl(var(--primary))" />
                                                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate('/book-meet')}
                                        className="btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontWeight: 800
                                        }}
                                    >
                                        Configure Package <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>

                <div style={{ marginTop: '8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="mobile-stack">
                    <m.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1.1 }}>Our Technology <br /><span className="gradient-text">Stack</span></h2>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                            We use only the most modern and reliable technologies to ensure your website is fast, secure, and ready for the future.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {['React.js', 'Next.js', 'Node.js', 'Firebase', 'PostgreSQL', 'Three.js', 'Tailwind', 'Motion'].map(tech => (
                                <span key={tech} style={{
                                    padding: '0.6rem 1.2rem',
                                    background: 'hsla(45, 100%, 50%, 0.1)',
                                    border: '1px solid hsla(45, 100%, 50%, 0.2)',
                                    borderRadius: '100px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: 'hsl(var(--foreground))'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </m.div>
                    <m.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card"
                        style={{ padding: '3rem', background: 'hsl(var(--foreground))', color: 'white' }}
                    >
                        <Layers size={40} color="hsl(var(--primary))" style={{ marginBottom: '2rem' }} />
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'white' }}>Custom Development</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Beyond templates and standard packages, we build unique digital tools, SAAS platforms, and internal business dashboards.
                        </p>
                        <button onClick={() => navigate('/book-meet')} style={{ color: 'hsl(var(--primary))', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Expert Consultation <ArrowRight size={18} />
                        </button>
                    </m.div>
                </div>
            </div>
        </div>
    );
};

export default WebShop;
