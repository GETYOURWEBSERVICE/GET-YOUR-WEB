import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Marquee = () => {
    const [images, setImages] = useState([
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1531403001884-24adad9227ca?auto=format&fit=crop&q=80&w=800"
    ]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Fetch from both collections to get all work
                const webSnap = await getDocs(collection(db, 'webProducts'));
                const projectSnap = await getDocs(collection(db, 'projects'));

                const webImages = webSnap.docs.map(doc => doc.data().image).filter(Boolean);
                const projectImages = projectSnap.docs.map(doc => doc.data().image).filter(Boolean);

                const allImages = [...webImages, ...projectImages];

                if (allImages.length > 0) {
                    // If we have very few images, double them to make the loop look better
                    const fullList = allImages.length < 5 ? [...allImages, ...allImages] : allImages;
                    setImages(fullList);
                }
            } catch (error) {
                console.error("Error fetching marquee images:", error);
            }
        };

        fetchImages();
    }, []);

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
                    duration: images.length * 4, // Dynamic duration based on image count
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    display: 'flex',
                    gap: '2rem',
                    width: 'max-content'
                }}
            >
                {/* Duplicate the array for seamless infinite sliding */}
                {[...images, ...images].map((img, i) => (
                    <div
                        key={i}
                        style={{
                            width: 'clamp(280px, 40vw, 450px)',
                            height: 'clamp(180px, 25vw, 280px)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                            flexShrink: 0,
                            border: '1px solid hsla(var(--border), 0.5)',
                            background: '#fff'
                        }}
                    >
                        <img
                            src={img}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`Work ${i}`}
                        />
                    </div>
                ))}
            </m.div>
        </div>
    );
};

export default Marquee;
