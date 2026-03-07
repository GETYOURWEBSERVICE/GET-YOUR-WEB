import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, User } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="section" id="policy" style={{
            background: 'hsl(var(--foreground))',
            color: 'white',
            paddingBottom: '4rem'
        }}>
            <div className="container">
                <div className="grid-cols-2" style={{ gap: '6rem' }}>
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit', marginBottom: '1.5rem' }}
                        >
                            <span style={{ color: 'white' }}>Get Your</span>
                            <span style={{ color: 'hsl(var(--primary))' }}> Web</span>
                        </motion.div>
                        <p style={{ color: 'hsla(0,0%,100%,0.6)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '400px' }}>
                            We build high-performance digital systems that elevate your brand's presence
                            in an increasingly crowded market. Precision-driven, beauty-focused.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'hsla(0,0%,100%,0.8)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <User size={18} color="hsl(var(--primary))" />
                                <span>Bhavya Saxena</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={18} color="hsl(var(--primary))" />
                                <span>team.getyourweb@support.email</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} color="hsl(var(--primary))" />
                                <span>Jhansi, Uttar Pradesh 284003</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <h4 style={{ color: 'hsl(var(--primary))', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Navigation</h4>
                            <ul style={{ listStyle: 'none', fontSize: '1rem' }}>
                                <li style={{ marginBottom: '1rem' }}><a href="/" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Home</a></li>
                                <li style={{ marginBottom: '1rem' }}><a href="/#work" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Our Work</a></li>
                                <li style={{ marginBottom: '1rem' }}><a href="/#pricing" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'hsl(var(--primary))', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>Legal</h4>
                            <ul style={{ listStyle: 'none', fontSize: '1rem' }}>
                                <li style={{ marginBottom: '1rem' }}><a href="#" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Privacy Policy</a></li>
                                <li style={{ marginBottom: '1rem' }}><a href="#" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Terms of Service</a></li>
                                <li style={{ marginBottom: '1rem' }}><a href="#" style={{ color: 'hsla(0,0%,100%,0.8)' }}>Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '6rem',
                    paddingTop: '2.5rem',
                    borderTop: '1px solid hsla(0,0%,100%,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    color: 'hsla(0,0%,100%,0.4)'
                }}>
                    <p>© 2026 Get Your Web. Digital Excellence by Bhavya Saxena.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>Jhansi 284003</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
