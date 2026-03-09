import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Send, Loader2, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BookMeet = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '' });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'meetings'), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'Pending'
            });
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', project: '' });
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to book meeting. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: '10rem' }}>
            <div className="container">
                <div className="grid-cols-2" style={{ alignItems: 'start' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Book a <span className="gradient-text">Discovery Meet</span></h1>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.8 }}>
                            Let's discuss your project and how we can help you achieve your digital goals. Choose a time that works for you.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: <Clock />, text: "30-Minute Consultation" },
                                { icon: <Video />, text: "Google Meet or Zoom" },
                                { icon: <Calendar />, text: "Flexible Scheduling" }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'hsl(var(--foreground))', fontWeight: 600 }}>
                                    <div style={{ color: 'hsl(var(--primary))' }}>{item.icon}</div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ padding: '3rem' }}
                    >
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                                    <CheckCircle size={60} color="#00c853" style={{ marginBottom: '1.5rem' }} />
                                </motion.div>
                                <h3 style={{ marginBottom: '1rem' }}>Request Received!</h3>
                                <p style={{ opacity: 0.7 }}>We'll get back to you shortly via email to confirm the schedule.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn-primary"
                                    style={{ marginTop: '2rem', width: '100%' }}
                                >
                                    Book Another Meet
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 style={{ marginBottom: '2rem' }}>Contact Details</h3>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="Phone Number (WhatsApp preferred)"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                    <textarea
                                        required
                                        placeholder="Tell us about your project"
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                        rows="4"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent', resize: 'none' }}
                                    ></textarea>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        {loading ? 'Sending...' : 'Send Request'}
                                    </button>
                                    <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', textAlign: 'center' }}>
                                        Our team usually replies within 2-4 hours.
                                    </p>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BookMeet;
