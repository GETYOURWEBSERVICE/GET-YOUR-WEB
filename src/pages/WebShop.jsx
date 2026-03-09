import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Layout, Search, ShoppingBag, ArrowRight, Zap, Target, Layers, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const WebShop = () => {
    const navigate = useNavigate();
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWebProducts = async () => {
            try {
                // Remove strict orderBy to ensure items without createdAt still show up
                const snapshot = await getDocs(collection(db, 'webProducts'));
                const products = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        title: data.title || data.name || "Untitled Product",
                        price: data.cost || data.price || "Contact for Price",
                        features: Array.isArray(data.features) ? data.features : [],
                        image: data.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                        createdAt: data.createdAt
                    };
                });

                // Sort manually in JS to avoid Firestore query issues with missing fields
                const sortedProducts = products.sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0;
                    const timeB = b.createdAt?.seconds || 0;
                    return timeB - timeA;
                });

                setSolutions(sortedProducts);
            } catch (error) {
                console.error("Error fetching web products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWebProducts();
    }, []);

    const displayProducts = solutions;

    return (
        <div className="page-container" style={{ paddingTop: 'clamp(6rem, 12vh, 8rem)', paddingBottom: '5rem' }}>
            <div className="container">
                <header style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <m.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '0.75rem' }}
                    >
                        Web Solutions
                    </m.p>
                    <m.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 900 }}
                    >
                        Websites That <br />
                        <span className="gradient-text">Dominate.</span>
                    </m.h1>
                </header>

                {/* Category Switcher */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid hsla(var(--border), 0.5)', paddingBottom: '1rem' }}>
                    <button
                        onClick={() => navigate('/shop-web')}
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
                        Web Shop
                    </button>
                    <button
                        onClick={() => navigate('/shop-app')}
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
                    ) : displayProducts.length > 0 ? (
                        displayProducts.map((sol, i) => (
                            <m.div
                                key={sol.id || i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -5 }}
                                style={{ position: 'relative' }}
                            >
                                <div className="glass-card" style={{
                                    padding: 0,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    border: sol.highlight ? '1px solid hsl(var(--primary))' : '1px solid hsla(var(--border), 0.5)',
                                    background: 'white',
                                    borderRadius: '12px'
                                }}>
                                    {/* Product Image Area */}
                                    <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative', background: '#f8f8f8' }}>
                                        <m.img
                                            src={sol.image}
                                            alt={sol.title || sol.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {sol.highlight && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '8px',
                                                left: '8px',
                                                background: 'hsl(var(--primary))',
                                                color: 'black',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.65rem',
                                                fontWeight: 800
                                            }}>
                                                BESTSELLER
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
                                            {sol.title || sol.name}
                                        </h4>

                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000' }}>₹{sol.price}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: 500 }}>onwards</span>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#f0f0f0',
                                            width: 'fit-content',
                                            padding: '2px 6px',
                                            borderRadius: '100px',
                                            marginTop: '4px'
                                        }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#333' }}>Free Delivery</span>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/product/web/${sol.id}`)}
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
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </m.div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', opacity: 0.5 }}>
                            <ShoppingBag size={48} style={{ marginBottom: '1rem', margin: '0 auto' }} />
                            <p>No products found in the Web Shop yet.</p>
                        </div>
                    )}
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
