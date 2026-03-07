import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 45]);

    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

    return (
        <section
            ref={containerRef}
            className="section flex-center"
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 50%, hsla(45, 100%, 50%, 0.05) 0%, transparent 70%)'
            }}
        >
            {/* Dynamic Animated Blobs */}
            <m.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-5%',
                    width: 'clamp(300px, 60vw, 600px)',
                    height: 'clamp(300px, 60vw, 600px)',
                    background: 'hsla(45, 100%, 50%, 0.18)',
                    filter: 'blur(120px)',
                    borderRadius: '50%',
                    zIndex: -1
                }}
            />

            <m.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '-5%',
                    width: 'clamp(350px, 70vw, 700px)',
                    height: 'clamp(350px, 70vw, 700px)',
                    background: 'hsla(25, 30%, 15%, 0.1)',
                    filter: 'blur(150px)',
                    borderRadius: '50%',
                    zIndex: -1
                }}
            />

            {/* Decorative Floating Elements */}
            <m.div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '15%',
                    y: springY1,
                    rotate: rotate,
                    width: '60px',
                    height: '60px',
                    border: '2px solid hsl(var(--primary))',
                    opacity: 0.15,
                    borderRadius: '12px'
                }}
            />

            <m.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [45, 60, 45]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '20%',
                    width: '40px',
                    height: '40px',
                    border: '1px solid hsl(var(--foreground))',
                    opacity: 0.1,
                    borderRadius: '50%'
                }}
            />

            <m.div
                animate={{
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '30%',
                    right: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
                    opacity: 0.05,
                    borderRadius: '50%'
                }}
            />

            <div className="container" style={{
                textAlign: 'left',
                position: 'relative',
                zIndex: 1,
                paddingTop: 'clamp(5rem, 15vh, 8rem)' // Increased from 3rem
            }}>
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Tagline removed as per request */}

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em',
                        color: 'hsl(var(--foreground))',
                        lineHeight: 1.1
                    }}>
                        Elevate Your <br />
                        <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 400, paddingRight: '0.15em' }}>Experience</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                        color: 'hsl(var(--muted-foreground))',
                        maxWidth: '650px',
                        margin: '0 0 2.5rem',
                        fontWeight: 400,
                        lineHeight: 1.6
                    }}>
                        We blend deep industrial expertise with modern design aesthetics to create
                        digital solutions that don't just work—they inspire.
                    </p>

                    <div className="mobile-stack" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <m.button
                            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px hsla(45, 100%, 50%, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary"
                            onClick={() => {
                                const el = document.getElementById('work');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    navigate('/#work');
                                }
                            }}
                        >
                            Shop Projects
                        </m.button>
                        <m.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/book-meet')}
                            style={{
                                padding: '1rem 2rem',
                                fontWeight: 700,
                                borderRadius: 'var(--radius)',
                                border: '2px solid hsl(var(--border))',
                                color: 'hsl(var(--foreground))',
                                background: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Contact Us <span style={{ fontSize: '1.2rem' }}>→</span>
                        </m.button>
                    </div>
                </m.div>
            </div>

        </section>
    );
};

export default Hero;
