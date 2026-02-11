import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Search, ShoppingBag, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const WebShop = () => {
    const { currentUser, loginWithGoogle } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'webProducts'));
                const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(fetched);
            } catch (error) {
                console.error("Error fetching web products:", error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const fallbackProducts = [
        { name: "Business Landing Page", price: "800", icon: <Layout size={24} />, image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80" },
        { name: "E-Commerce Store", price: "1800", icon: <ShoppingBag size={24} />, image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80" },
        { name: "Full SEO Optimization", price: "500", icon: <Search size={24} />, image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20e?auto=format&fit=crop&q=80" },
        { name: "Corporate Website", price: "3000+", icon: <Globe size={24} />, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80" },
    ];

    const displayProducts = products.length > 0 ? products : fallbackProducts;

    const handleSelectPackage = async (product) => {
        if (!currentUser) {
            const confirmLogin = window.confirm("You need to login with Google to select a package. Login now?");
            if (confirmLogin) {
                try {
                    await loginWithGoogle();
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }
        } else {
            addToCart({
                id: product.id || Math.random().toString(36).substr(2, 9),
                name: product.name || product.title,
                price: product.price || product.cost,
                image: product.image,
                type: 'web'
            });
            navigate('/checkout');
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: 'clamp(8rem, 15vh, 10rem)' }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: 'clamp(2.25rem, 8vw, 3.5rem)', marginBottom: '1rem' }}>Website <span className="gradient-text">Solutions</span></h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '600px', marginBottom: '3rem', fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                        Elevate your online presence with stunning, SEO-optimized websites. Choose your package below.
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
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img src={p.image} alt={p.title || p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {p.link && (
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }} className="glass-panel">
                                        <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'white', color: 'hsl(var(--primary))' }}>
                                            <ExternalLink size={20} />
                                        </div>
                                    </a>
                                )}
                            </div>
                            <div style={{ padding: '2.5rem' }}>
                                <div style={{ color: 'hsl(var(--primary))', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    {p.icon || <Globe size={24} />}
                                </div>
                                <h3 style={{ marginBottom: '1rem' }}>{p.title || p.name}</h3>
                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{p.description}</p>
                                <p style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>₹{p.cost || p.price}</p>
                                <button
                                    onClick={() => handleSelectPackage(p)}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '0.75rem' }}
                                >
                                    Select Package
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebShop;
