import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Send } from 'lucide-react';

const BookMeet = () => {
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
                        <h3 style={{ marginBottom: '2rem' }}>Contact Details</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input type="text" placeholder="Your Name" style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                            <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }} />
                            <textarea placeholder="Tell us about your project" rows="4" style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent', resize: 'none' }}></textarea>
                            <button disabled className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.7 }}>
                                <Send size={18} /> Send Request
                            </button>
                            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', textAlign: 'center' }}>
                                Form is for demonstration. Please contact support for real bookings.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BookMeet;
