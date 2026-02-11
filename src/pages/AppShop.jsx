import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Shield, Cpu, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
const AppShop = () => {
    const { currentUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'appProducts'));
                const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(fetched);
            } catch (error) {
                console.error("Error fetching app products:", error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const fallbackProducts = [
        { name: "SaaS Mobile MVP", price: "1500", icon: <Zap size={24} />, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80" },
        { name: "E-Commerce App", price: "2500", icon: <Smartphone size={24} />, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
        { name: "Fintech Solution", price: "4000", icon: <Shield size={24} />, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80" },
        { name: "Custom AI Integration", price: "5000+", icon: <Cpu size={24} />, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" },
    ];

    const displayProducts = products.length > 0 ? products : fallbackProducts;

    const handleEnquire = (product) => {
        navigate('/book-meet');
    };

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: 'clamp(8rem, 15vh, 10rem)' }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: 'clamp(2.25rem, 8vw, 3.5rem)', marginBottom: '1rem' }}>App <span className="gradient-text">Development</span> Shop</h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '600px', marginBottom: '3rem', fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                        High-performance mobile applications built with precision. Pick a base package or contact us for a custom quote.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {displayProducts.map((p, i) => (
                        <motion.div
                            key={p.id || i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card"
                            style={{ padding: '0', textAlign: 'center', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'relative', height: '180px', background: 'hsl(var(--accent))' }}>
                                {p.image ? (
                                    <img src={p.image} alt={p.title || p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--primary))' }}>
                                        <Smartphone size={48} />
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }} className="glass-panel">
                                    <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'white', color: 'hsl(var(--primary))' }}>
                                        {p.icon || <Smartphone size={20} />}
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>{p.title || p.name}</h3>
                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{p.description}</p>
                                <p style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>₹{p.cost || p.price}</p>
                                <button
                                    onClick={() => handleEnquire(p)}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '0.75rem' }}
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppShop;
