import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Globe, Smartphone, ArrowLeft, ExternalLink, ShoppingBag, CheckCircle2, Loader2, Sparkles, Shield, Zap } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetail = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const collectionName = type === 'app' ? 'appProducts' : 'webProducts';
                const docRef = doc(db, collectionName, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id, type]);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={48} className="animate-spin" color="hsl(var(--primary))" />
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <h2>Product Not Found</h2>
                <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
            </div>
        );
    }

    const isApp = type === 'app';
    const title = product.title || product.name || "Untitled Product";
    const price = product.cost || product.price || "Contact Us";

    return (
        <div className="page-container" style={{ paddingTop: 'clamp(6rem, 12vh, 8rem)', paddingBottom: '5rem' }}>
            <div className="container">
                <m.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'hsl(var(--muted-foreground))',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: '2rem'
                    }}
                >
                    <ArrowLeft size={20} /> Back to Shop
                </m.button>

                <div className="grid-cols-2 mobile-stack" style={{ gap: '4rem', alignItems: 'start' }}>
                    {/* Left: Image Gallery */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ padding: '1rem', borderRadius: '2rem', overflow: 'hidden' }}
                    >
                        <img
                            src={product.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"}
                            alt={title}
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" }}
                            style={{ width: '100%', borderRadius: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </m.div>

                    {/* Right: Info */}
                    <m.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                            <span style={{
                                padding: '6px 12px',
                                background: isApp ? 'rgba(56, 189, 248, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                color: isApp ? '#0ea5e9' : 'hsl(var(--primary))',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase'
                            }}>
                                {isApp ? <Smartphone size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> : <Globe size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
                                {isApp ? 'Mobile App' : 'Premium Website'}
                            </span>
                            <span style={{
                                padding: '6px 12px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                color: '#16a34a',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase'
                            }}>
                                <Shield size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Instant Delivery
                            </span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', lineHeight: 1.1 }}>{title}</h1>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '2rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'hsl(var(--foreground))' }}>₹{price}</span>
                            <span style={{ fontSize: '1rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>One-time payment</span>
                        </div>

                        <div className="glass-card" style={{ marginBottom: '2.5rem', background: 'rgba(255,255,255,0.5)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Product Description</h3>
                            <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, fontSize: '1.1rem' }}>
                                {product.description || "Transform your digital presence with this professionally crafted solution. Designed for performance, scalability, and user experience, this product includes full source code, documentation, and 3 months of technical support."}
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                            {[
                                { icon: <Zap size={18} />, text: "Fast Setup" },
                                { icon: <Sparkles size={18} />, text: "Modern UI" },
                                { icon: <Shield size={18} />, text: "Secure" },
                                { icon: <CheckCircle2 size={18} />, text: "Tested" }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'hsl(var(--muted-foreground))' }}>
                                    <span style={{ color: 'hsl(var(--primary))' }}>{item.icon}</span>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <button
                                onClick={() => navigate('/book-meet')}
                                className="btn-primary"
                                style={{ padding: '1.25rem 2.5rem', flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                            >
                                <ShoppingBag size={20} /> Order This Product
                            </button>
                            {product.link && (
                                <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-panel"
                                    style={{
                                        padding: '1.25rem 2.5rem',
                                        flex: 1,
                                        minWidth: '200px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        fontWeight: 700,
                                        color: 'hsl(var(--foreground))',
                                        border: '1px solid hsl(var(--border))'
                                    }}
                                >
                                    <img
                                        src={product.image || "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800"}
                                        alt={product.title}
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800" }}
                                        style={{
                                            width: '20px', // Adjust size as needed
                                            height: '20px', // Adjust size as needed
                                            objectFit: 'cover',
                                            marginRight: '10px'
                                        }}
                                        className="card-image"
                                    />
                                    Visit Live Website
                                </a>
                            )}
                        </div>
                    </m.div>
                </div>

                {/* Additional Info Section */}
                <div style={{ marginTop: '6rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>What's Included</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: "Source Code", desc: "Clean, documented code using modern frameworks like React." },
                            { title: "Mobile Ready", desc: "Fully responsive designs that look great on any device." },
                            { title: "Dashboard", desc: "Built-in admin panels for easy content management." }
                        ].map((item, i) => (
                            <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>{item.title}</h4>
                                <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
