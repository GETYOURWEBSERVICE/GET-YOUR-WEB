import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <BookOpen size={40} color="hsl(var(--primary))" />
            </motion.div>
        </div>
    );

    return (
        <div className="section" style={{ minHeight: '80vh', paddingTop: 'clamp(8rem, 15vh, 10rem)' }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>Our <span className="gradient-text">Insights</span></h1>
                    <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '600px', marginBottom: '4rem', fontSize: '1.1rem' }}>
                        Exploring the intersection of industrial expertise and modern digital design.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {posts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card"
                            style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden' }}>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {post.author || "Admin"}</span>
                                </div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.3 }}>{post.title}</h3>
                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                                    {post.excerpt || post.content?.substring(0, 120) + '...'}
                                </p>
                                <Link to={`/blog/${post.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'hsl(var(--primary))', fontWeight: 700, fontSize: '0.9rem' }}>
                                    Read Full Post <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                        <BookOpen size={48} style={{ marginBottom: '1rem' }} />
                        <p>No blog posts found yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
