import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Zap, Shield, Cpu, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const AppShop = () => {
    const navigate = useNavigate();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppProducts = async () => {
            try {
                // Remove strict orderBy to ensure all items show up
                const snapshot = await getDocs(collection(db, 'appProducts'));
                const products = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        title: data.title || data.name || "Untitled App",
                        price: data.cost || data.price || "Contact for Price",
                        features: Array.isArray(data.features) ? data.features : [],
                        image: data.image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
                        createdAt: data.createdAt
                    };
                });

                // Sort manually in JS
                const sortedApps = products.sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0;
                    const timeB = b.createdAt?.seconds || 0;
                    return timeB - timeA;
                });

                setApps(sortedApps);
            } catch (error) {
                console.error("Error fetching app products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppProducts();
    }, []);

    // Fallback data if none exists in Firestore yet
    const fallbackApps = [
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
        }
    ];

    const displayApps = apps.length > 0 ? apps : loading ? [] : fallbackApps;

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
                <header style={{ marginBottom: '2rem', textAlign: 'left' }}>
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
                        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 900 }}
                    >
                        Build Your <br />
                        <span className="gradient-text">Digital Empire</span>
                    </m.h1>
                </header>

                {/* Category Switcher */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid hsla(var(--border), 0.5)', paddingBottom: '1rem' }}>
                    <button
                        onClick={() => navigate('/shop-web')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '100px',
                            background: 'none',
                            color: 'hsl(var(--muted-foreground))',
                            border: '1px solid hsla(var(--border), 0.5)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        Web Shop
                    </button>
                    <button
                        onClick={() => navigate('/shop-app')}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '100px',
                            background: 'hsl(var(--primary))',
                            color: 'black',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        App Shop
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 22vw, 280px), 1fr))',
                    gap: 'clamp(1rem, 2vw, 2rem)'
                }}>
                    {loading ? (
                        <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                            <Loader2 size={40} className="animate-spin" color="hsl(var(--primary))" />
                        </div>
                    ) : displayApps.map((pkg, idx) => (
                        <m.div
                            key={pkg.id || idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -5 }}
                            style={{ position: 'relative' }}
                        >
                            <div className="glass-card" style={{
                                padding: 0,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                border: pkg.highlight ? '1px solid hsl(var(--primary))' : '1px solid hsla(var(--border), 0.5)',
                                background: 'white',
                                borderRadius: '12px'
                            }}>
                                {/* Product Image Area */}
                                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative', background: '#f8f8f8' }}>
                                    <m.img
                                        src={pkg.image}
                                        alt={pkg.title || pkg.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {pkg.highlight && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            background: '#ff4d4d',
                                            color: 'white',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.65rem',
                                            fontWeight: 800
                                        }}>
                                            TOP SELLER
                                        </div>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#333',
                                        margin: 0,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        lineHeight: 1.3
                                    }}>
                                        {pkg.title || pkg.name}
                                    </h4>

                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000' }}>₹{pkg.price}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: 500 }}>onwards</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#e8f5e9',
                                        width: 'fit-content',
                                        padding: '2px 6px',
                                        borderRadius: '100px',
                                        marginTop: '4px'
                                    }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#2e7d32' }}>Secure Setup</span>
                                    </div>

                                    <button
                                        onClick={() => navigate('/book-meet')}
                                        className="btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            marginTop: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700
                                        }}
                                    >
                                        Order Now
                                    </button>
                                </div>
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
