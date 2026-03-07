import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Calendar, User, ChevronLeft, Clock } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docSnap = await getDoc(doc(db, 'blogs', id));
                if (docSnap.exists()) {
                    setPost(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    if (loading) return <div style={{ minHeight: '80vh' }} />;
    if (!post) return (
        <div className="section flex-center" style={{ minHeight: '80vh' }}>
            <div className="container text-center">
                <h2>Post not found</h2>
                <Link to="/blog" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Back to Blog</Link>
            </div>
        </div>
    );

    return (
        <div className="section" style={{ paddingTop: 'clamp(8rem, 15vh, 10rem)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'hsl(var(--primary))', fontWeight: 600, marginBottom: '2rem' }}>
                    <ChevronLeft size={20} /> Back to Insights
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {post.author || "Admin"}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> 5 min read</span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '2.5rem' }}>{post.title}</h1>

                    <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '3rem' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div
                        className="blog-content"
                        style={{
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            color: 'hsl(var(--foreground))',
                            opacity: 0.9
                        }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </motion.div>
            </div>

            <style>{`
                .blog-content p { margin-bottom: 1.5rem; }
                .blog-content h2 { font-size: 2rem; margin: 3rem 0 1.5rem; }
                .blog-content h3 { font-size: 1.5rem; margin: 2rem 0 1rem; }
                .blog-content img { max-width: 100%; border-radius: 12px; margin: 2rem 0; }
                .blog-content ul, .blog-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 0.5rem; }
            `}</style>
        </div>
    );
};

export default BlogPost;
