import React from 'react';
import { m } from 'framer-motion';

const Marquee = () => {
    const images = [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1531403001884-24adad9227ca?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", // duplicated for seamless loop
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    ];

    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            padding: '4rem 0',
            background: 'hsl(var(--background))',
            position: 'relative'
        }}>
            <m.div
                animate={{
                    x: [0, '-50%']
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    width: 'max-content'
                }}
            >
                {images.concat(images).map((img, i) => (
                    <div
                        key={i}
                        style={{
                            width: '350px',
                            height: '220px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            flexShrink: 0,
                            border: '1px solid hsla(var(--border), 0.3)'
                        }}
                    >
                        <img
                            src={img}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`Slide ${i}`}
                        />
                    </div>
                ))}
            </m.div>
        </div>
    );
};

export default Marquee;
