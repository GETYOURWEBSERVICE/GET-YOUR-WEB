import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { Briefcase, Loader2 } from 'lucide-react';

const Work = () => {
    const [projects, setProjects] = useState([]);
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
                setProjects(fetchedProjects);
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
                                <div style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
                                    <m.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
