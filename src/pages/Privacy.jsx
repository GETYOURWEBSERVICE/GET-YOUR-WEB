import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Privacy <span className="gradient-text">Policy</span></h1>
                    <p style={{ opacity: 0.5, marginBottom: '3rem' }}>Last Updated: March 2026</p>

                    <div className="glass-card" style={{ padding: '3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '2rem' }}>
                            At <strong>Get Your Web</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>1. Information We Collect</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We may collect the following information from clients or visitors:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Project details or requirements</li>
                                <li>Any information you voluntarily provide through contact forms or communication</li>
                            </ul>
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>2. How We Use Your Information</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We use the collected information for the following purposes:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>To communicate with clients</li>
                                <li>To understand project requirements</li>
                                <li>To deliver our web development services</li>
                                <li>To improve our services and website</li>
                                <li>To provide support and respond to inquiries</li>
                            </ul>
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>3. Data Security</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We take reasonable steps to protect your personal information. However, no method of internet transmission or electronic storage is 100% secure.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>4. Third-Party Services</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Our services may use third-party platforms such as:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Vercel (hosting)</li>
                                <li>Domain providers</li>
                                <li>Analytics or development tools</li>
                            </ul>
                            These third-party services have their own privacy policies and we are not responsible for their policies or practices.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>5. Client Accounts and Ownership</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            In many cases hosting or services may be set up using the <strong>client’s own accounts (such as Google accounts)</strong> to ensure full ownership and transparency.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>6. Sharing of Information</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Get Your Web <strong>does not sell, rent, or trade</strong> your personal information to third parties. Information may only be shared when necessary to deliver the requested service.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>7. Changes to This Policy</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We may update this Privacy Policy from time to time. Updated versions will be posted on our website.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>8. Contact Us</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            If you have any questions about this Privacy Policy, you can contact us through our official website.
                        </p>

                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid hsl(var(--border))', fontStyle: 'italic', opacity: 0.7 }}>
                            <strong>Get Your Web Team</strong>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
