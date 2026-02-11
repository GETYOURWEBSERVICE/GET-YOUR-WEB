import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, ShoppingBag, Trash2, CheckCircle2, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Navigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
    const { currentUser, loading } = useAuth();
    const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <ShoppingBag size={40} color="hsl(var(--primary))" />
            </motion.div>
        </div>
    );

    if (!currentUser) return <Navigate to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                userName: currentUser.displayName,
                items: cart,
                total: getCartTotal(),
                billingAddress: formData,
                status: 'Pending',
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'orders'), orderData);
            setOrderSuccess(true);
            clearCart();
        } catch (error) {
            console.error("DEBUG: Firebase Error:", error);
            alert(`ORDER FAILED: ${error.code || error.message || "Unknown error"}. Make sure you are logged in and have internet. Details: ${error.message}`);
        }
        setIsSubmitting(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (orderSuccess) {
        return (
            <div className="section flex-center" style={{ minHeight: '80vh' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card"
                    style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}
                >
                    <div style={{ color: 'hsl(var(--primary))', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <CheckCircle2 size={80} />
                    </div>
                    <h1 style={{ marginBottom: '1rem' }}>Order Placed!</h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '2rem' }}>
                        Thank you for choosing Get Your Web. Please complete the payment below. Your order will be processed after confirmation.
                    </p>

                    <div style={{ marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))' }}>
                        <iframe
                            src="https://upi2qr.in/pay?name=bhavya&upiId=bhumisaxena%40fampay"
                            width="100%"
                            height="550"
                            style={{ border: 'none', background: 'white' }}
                            title="UPI Payment - bhavya"
                            loading="lazy"
                        ></iframe>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2rem' }}>
                        Once paid, our team will verify the transaction and update your order status in 1-2 hours.
                    </p>
                    <Link to="/">
                        <button className="btn-primary">Return Home</button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: 'clamp(8rem, 15vh, 12rem)' }}>
            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(max(280px, 100%), 1fr))',
                        gap: 'clamp(1rem, 5vw, 2.5rem)'
                    }}
                >

                    {/* Left Side: Order Details */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem' }}>Secure <span className="gradient-text">Checkout</span></h1>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShoppingBag size={24} color="hsl(var(--primary))" /> Your Selection
                            </h3>

                            {cart.length === 0 ? (
                                <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>Your cart is empty.</p>
                                    <Link to="/shop-web" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>Browse Services →</Link>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.rem' }}>
                                    {cart.map((item, idx) => (
                                        <motion.div
                                            key={item.id || idx}
                                            layout
                                            className="glass-card"
                                            style={{ padding: 'clamp(0.75rem, 3vw, 1.25rem)', display: 'flex', gap: 'min(1.25rem, 3vw)', alignItems: 'center', marginBottom: '1rem' }}
                                        >
                                            <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: 'hsl(var(--accent))', flexShrink: 0 }}>
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShoppingBag size={20} opacity={0.3} /></div>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
                                                <p style={{ margin: 0, color: 'hsl(var(--primary))', fontWeight: 800 }}>₹{item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.name)}
                                                style={{ color: 'hsl(var(--muted-foreground))', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}

                                    <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1rem', background: 'hsl(var(--accent))', borderColor: 'transparent' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600 }}>Total Amount:</span>
                                            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'hsl(var(--foreground))' }}>₹{getCartTotal()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mobile-stack" style={{ gap: '1.5rem', flexDirection: 'row', flexWrap: 'wrap' }}>
                            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flex: '1 1 250px' }}>
                                <div style={{ color: 'hsl(var(--primary))', flexShrink: 0 }}><ShieldCheck size={32} /></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Secure Transaction</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>256-bit SSL Encryption</p>
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flex: '1 1 250px' }}>
                                <div style={{ color: 'hsl(var(--primary))', flexShrink: 0 }}><Truck size={32} /></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Fast Start</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>Onboarding in 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Billing Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ padding: 'clamp(1.25rem, 5vw, 3rem)', height: 'fit-content' }}
                    >
                        <h3 style={{ marginBottom: '1.5rem' }}>Billing Details</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'hsl(var(--accent))', borderRadius: '0.5rem' }}>
                            <img src={currentUser.photoURL} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid hsl(var(--primary))' }} />
                            <div>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{currentUser.displayName}</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>{currentUser.email}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="First Name" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                                <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Last Name" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                            </div>
                            <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Full Address" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="City" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                                <input required name="postalCode" value={formData.postalCode} onChange={handleInputChange} type="text" placeholder="Postal Code" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                            </div>
                            <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />

                            <div style={{ marginTop: '0.5rem', padding: '1.5rem', background: 'hsl(var(--accent))', borderRadius: '1rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>
                                    Instant Payment via UPI
                                </p>

                                <div style={{
                                    background: 'white',
                                    padding: '1rem',
                                    borderRadius: '1rem',
                                    display: 'inline-block',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    marginBottom: '1rem'
                                }}>
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=bhumisaxena@fampay&pn=Bhavya&am=${getCartTotal()}&cu=INR&tn=Order from GetYourWeb`)}`}
                                        alt="UPI Payment QR Code"
                                        style={{ width: '200px', height: '200px', display: 'block' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'white', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, border: '1px solid hsl(var(--border))' }}>
                                        UPI ID: <span style={{ color: 'hsl(var(--primary))' }}>bhumisaxena@fampay</span>
                                    </div>

                                    <a
                                        href={`upi://pay?pa=bhumisaxena@fampay&pn=Bhavya&am=${getCartTotal()}&cu=INR&tn=Order from GetYourWeb`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            background: '#000',
                                            color: '#fff',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            textDecoration: 'none',
                                            fontWeight: 700,
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        <Smartphone size={18} /> Pay with Device App
                                    </a>
                                </div>

                                <p style={{ fontSize: '0.7rem', marginTop: '1rem', opacity: 0.6, lineHeight: 1.4 }}>
                                    After payment, click "Place Order". <br /> We will verify and mark as "Paid" in 1-2 hours.
                                </p>
                            </div>

                            <button
                                disabled={isSubmitting || cart.length === 0}
                                type="submit"
                                className="btn-primary"
                                style={{ marginTop: '1rem', width: '100%', padding: '1.25rem', opacity: (isSubmitting || cart.length === 0) ? 0.6 : 1 }}
                            >
                                {isSubmitting ? "Processing..." : `Place Order (₹${getCartTotal()})`}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
