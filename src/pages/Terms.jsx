import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '10rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Terms of <span className="gradient-text">Service</span></h1>
                    <p style={{ opacity: 0.5, marginBottom: '3rem' }}>Last Updated: March 2026</p>

                    <div className="glass-card" style={{ padding: '3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '2rem' }}>
                            Welcome to <strong>Get Your Web</strong>. By purchasing our services or working with us, you agree to the following terms and conditions.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>1. Services</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Get Your Web provides services including website development, web applications, UI design, and related digital services. The scope of each project will be discussed and finalized before the project begins.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>2. Hosting</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            We may provide <strong>Vercel hosting</strong> for the project. In most cases, the hosting will be set up using the <strong>client's own Google account or credentials</strong> for transparency and ownership.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>3. Domain</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            If a domain name is required, the <strong>client must purchase the domain themselves</strong>.
                            Get Your Web can assist with <strong>domain setup, configuration, and connection to the website</strong>, but the ownership and payment of the domain remains the responsibility of the client.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>4. Payments</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Project pricing will be discussed and agreed upon before the project starts. Payments may be required partially or fully depending on the project agreement.
                        </p>

                        <h3 id="refund-policy" style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>5. Refund Policy</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            If a client wishes to cancel the project:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>The client must inform us <strong>within 5 days of payment</strong>.</li>
                                <li>A <strong>maximum refund of 70%</strong> of the paid amount may be provided.</li>
                                <li>The remaining <strong>30% is non-refundable</strong> due to time, planning, and development efforts already invested.</li>
                            </ul>
                            After <strong>5 days</strong>, refunds will <strong>not be applicable</strong>.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>6. Client Responsibilities</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Clients must provide required content such as:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Text</li>
                                <li>Images</li>
                                <li>Branding materials</li>
                                <li>Project requirements</li>
                            </ul>
                            Delays in providing these materials may delay the project timeline.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>7. Project Changes</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Major changes to the project scope after development has started may require <strong>additional charges or timeline adjustments</strong>.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>8. Ownership</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Once the project is completed and full payment is made, the client will have ownership of the final website or application files.
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>9. Limitation of Liability</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Get Your Web is not responsible for issues caused by:
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Third-party services</li>
                                <li>Hosting platform outages</li>
                                <li>Domain provider problems</li>
                                <li>Client-side modifications after project delivery</li>
                            </ul>
                        </p>

                        <h3 style={{ marginBottom: '1rem', color: 'hsl(var(--primary))' }}>10. Updates to Terms</h3>
                        <p style={{ marginBottom: '2rem' }}>
                            Get Your Web reserves the right to update these terms at any time. Updated terms will be posted on our website.
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

export default Terms;
