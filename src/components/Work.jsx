import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Briefcase, Loader2, ArrowUpRight } from 'lucide-react';

const Work = () => {
    const [projects, setProjects] = useState([
        {
            id: 'sample-1',
            title: 'Modern E-commerce Platform',
            category: 'Web Development',
            description: 'A high-performance online store with seamless checkout and inventory management.',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600'
        },
        {
            id: 'sample-2',
            title: 'Fintech Dashboard',
            category: 'UI/UX Design',
            description: 'Complex data visualization and real-time analytics for financial institutions.',
            image: 'https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&q=80&w=1600'
        },
        {
            id: 'sample-3',
            title: 'Real Estate Portal',
            category: 'Web Solution',
            description: 'Advanced property search and virtual tours for the luxury housing market.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600'
        }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, 'projects'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const fetchedProjects = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (fetchedProjects.length > 0) {
                    setProjects(fetchedProjects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const displayProjects = projects;

    return (
        <section className="section" id="work">
            <div className="container">
                <div style={{ marginBottom: '5rem' }}>
                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        style={{
                            color: 'hsl(var(--primary))',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.9rem',
                            marginBottom: '1rem'
                        }}
                    >
                        Success Stories
                    </m.p>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '800px' }}>
                        Selected <span className="gradient-text">Recent Work</span>
                    </h2>
                </div>

                <div className={displayProjects.length > 0 ? "grid-cols-2" : ""} style={{ gap: '3.5rem' }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                            <Loader2 size={40} className="animate-spin" color="hsl(var(--primary))" />
                        </div>
                    ) : displayProjects.length > 0 ? (
                        displayProjects.map((project, index) => (
                            <m.div
                                key={project.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card"
                                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                            >
                                <div style={{
                                    overflow: 'hidden',
                                    aspectRatio: '16/10',
                                    borderBottom: '1px solid hsla(var(--border), 0.1)'
                                }}>
                                    <m.img
                                        initial={{ y: 0 }}
                                        whileHover={{ y: '-70%' }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </div>
                                <div style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>{project.category}</span>
                                    </div>
                                    <h3 style={{ fontSize: 'clamp(1.25rem, 5vw, 1.75rem)', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{project.title}</h3>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6, fontSize: '0.95rem' }}>{project.description}</p>
                                </div>
                            </m.div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '5rem', opacity: 0.5, width: '100%' }}>
                            <Briefcase size={48} style={{ marginBottom: '1rem', margin: '0 auto' }} />
                            <p>No projects showcased yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Work;
