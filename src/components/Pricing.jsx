import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
    const navigate = useNavigate();
    const packages = [
        {
            name: "Social Management",
            price: "500",
            period: "/month",
            description: "Perfect for brands looking for a consistent, high-quality digital voice.",
            features: ["10 Custom Posts", "15 Professional Reels", "Engagement Strategy", "Brand Consistency"],
            highlight: false
        },
        {
            name: "E-com Premium Bundle",
            price: "1,000",
            period: " Lifetime",
            description: "Everything you need to launch and scale your online empire.",
            features: [
                "Lifetime Odoo Hosting",
                ".com Domain (1yr incl.)",
                "Custom Store Design",
                "Inventory Management",
                "Payment Integration",
                "Priority Support"
            ],
            highlight: true
        }
    ];

    return (
        <section id="pricing" className="section" style={{ background: 'hsla(35, 40%, 92%, 0.3)' }}>
            <div className="container" style={{ position: 'relative' }}>
                {/* Background Accent */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(circle at 10% 20%, hsla(45, 100%, 50%, 0.03) 0%, transparent 50%)',
                    zIndex: 0
                }} />

                <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'hsl(var(--foreground))' }}
                    >
                        Invest in Your <span className="gradient-text">Growth</span>
                    </motion.h2>
                    <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '550px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Transparent pricing without the hidden surprises. Choose the plan that fuels your vision.
                    </p>
                </div>

                <div className="grid-cols-2" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, type: 'spring', damping: 20 }}
                            className="glass-card"
                            style={{
                                padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 2.5rem)',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                background: pkg.highlight ? 'hsl(var(--foreground))' : 'white',
                                color: pkg.highlight ? 'white' : 'inherit',
                                borderColor: pkg.highlight ? 'hsl(var(--foreground))' : 'hsl(var(--border))'
                            }}
                        >
                            {pkg.highlight && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'hsl(var(--primary))',
                                    color: 'hsl(var(--foreground))',
                                    padding: '6px 16px',
                                    borderRadius: '1.5rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 900,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: '0 10px 20px rgba(45, 100, 50, 0.2)',
                                    whiteSpace: 'nowrap'
                                }}>
                                    <Star size={12} fill="currentColor" /> POPULAR CHOICE
                                </div>
                            )}

                            <h3 style={{
                                fontSize: 'clamp(1.25rem, 5vw, 1.5rem)',
                                marginBottom: '1.5rem',
                                color: pkg.highlight ? 'white' : 'hsl(var(--foreground))'
                            }}>
                                {pkg.name}
                            </h3>

                            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', fontWeight: 800 }}>₹{pkg.price}</span>
                                <span style={{
                                    color: pkg.highlight ? 'hsla(0,0%,100%,0.6)' : 'hsl(var(--muted-foreground))',
                                    marginLeft: '8px',
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}>
                                    {pkg.period}
                                </span>
                            </div>

                            <p style={{
                                fontSize: '0.9rem',
                                color: pkg.highlight ? 'hsla(0,0%,100%,0.7)' : 'hsl(var(--muted-foreground))',
                                marginBottom: '2rem',
                                lineHeight: 1.5
                            }}>
                                {pkg.description}
                            </p>

                            <div style={{ flex: 1, marginBottom: '2.5rem' }}>
                                {pkg.features.map((feature, fIdx) => (
                                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '0.9rem' }}>
                                        <div style={{
                                            borderRadius: '50%',
                                            background: pkg.highlight ? 'hsla(0,0%,100%,0.1)' : 'hsl(var(--accent))',
                                            padding: '4px',
                                            flexShrink: 0
                                        }}>
                                            <Check size={12} color={pkg.highlight ? 'white' : 'hsl(var(--primary))'} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/book-meet')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius)',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    background: pkg.highlight ? 'hsl(var(--primary))' : 'white',
                                    color: 'hsl(var(--foreground))',
                                    border: pkg.highlight ? 'none' : '2px solid hsl(var(--border))',
                                    boxShadow: pkg.highlight ? '0 15px 30px rgba(45, 100, 50, 0.3)' : 'none'
                                }}
                            >
                                Contact Us
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
