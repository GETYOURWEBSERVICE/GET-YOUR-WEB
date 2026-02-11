import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Plus, Trash2, Globe, Smartphone, Briefcase, ExternalLink, Package, ShoppingBag, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const { currentUser, isAdmin, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');
    const [dataLoading, setDataLoading] = useState(false);

    // Data states
    const [projects, setProjects] = useState([]);
    const [appProducts, setAppProducts] = useState([]);
    const [webProducts, setWebProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [blogs, setBlogs] = useState([]);

    // Form states
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', cost: '', link: '', category: ''
    });

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const fetchData = async () => {
        try {
            const projSnap = await getDocs(collection(db, 'projects'));
            setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            const appSnap = await getDocs(collection(db, 'appProducts'));
            setAppProducts(appSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            const webSnap = await getDocs(collection(db, 'webProducts'));
            setWebProducts(webSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            const orderSnap = await getDocs(collection(db, 'orders'));
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));

            const blogSnap = await getDocs(collection(db, 'blogs'));
            setBlogs(blogSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
        } catch (error) {
            console.error("Fetch failed:", error);
        }
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Package size={40} color="hsl(var(--primary))" />
            </motion.div>
        </div>
    );

    if (!isAdmin) return <Navigate to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDataLoading(true);
        try {
            const collectionName = activeTab === 'projects' ? 'projects' :
                activeTab === 'apps' ? 'appProducts' :
                    activeTab === 'blogs' ? 'blogs' : 'webProducts';

            await addDoc(collection(db, collectionName), {
                ...formData,
                createdAt: serverTimestamp()
            });

            setFormData({ title: '', description: '', image: '', cost: '', link: '', category: '' });
            fetchData();
            alert('Added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding item');
        }
        setDataLoading(false);
    };

    const handleDelete = async (id, collectionName) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await deleteDoc(doc(db, collectionName, id));
                fetchData();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete item.");
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
            fetchData();
            alert(`Order marked as ${newStatus}`);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update order.");
        }
    };

    return (
        <div className="section" style={{ paddingTop: 'clamp(8rem, 15vh, 10rem)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }} className="mobile-stack">
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 700, margin: 0 }}>{currentUser.displayName}</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Administrator Access</p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {[
                        { id: 'projects', label: 'Work', icon: <Briefcase size={18} /> },
                        { id: 'apps', label: 'App Shop', icon: <Smartphone size={18} /> },
                        { id: 'web', label: 'Web Shop', icon: <Globe size={18} /> },
                        { id: 'blogs', label: 'Blogs', icon: <BookOpen size={18} /> },
                        { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="glass-panel"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius)',
                                background: activeTab === tab.id ? 'hsl(var(--primary))' : 'white',
                                color: activeTab === tab.id ? 'hsl(var(--foreground))' : 'inherit',
                                fontWeight: 700,
                                fontSize: '0.9rem'
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'orders' ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h3 style={{ marginBottom: '2rem' }}>Latest Client Orders</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {orders.map((order) => (
                                <div key={order.id} className="glass-card" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }} className="mobile-stack">
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5 }}>Order ID: {order.id}</p>
                                            <h4 style={{ margin: '5px 0', fontSize: '1.25rem' }}>{order.userName}</h4>
                                            <p style={{ margin: 0, fontWeight: 700, color: 'hsl(var(--primary))' }}>{order.userEmail}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                background: order.status === 'Paid' ? '#00c853' : 'hsl(var(--primary))',
                                                color: order.status === 'Paid' ? 'white' : 'hsl(var(--foreground))',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 800
                                            }}>
                                                {order.status}
                                            </span>
                                            <p style={{ margin: '8px 0 0', fontWeight: 900, fontSize: '1.5rem' }}>₹{order.total}</p>
                                        </div>
                                    </div>

                                    <div style={{ background: 'hsl(var(--accent))', padding: '1.5rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
                                        <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: '0.85rem' }}>Billing & Shipping:</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                                            {order.billingAddress?.firstName} {order.billingAddress?.lastName}<br />
                                            {order.billingAddress?.address}, {order.billingAddress?.city} - {order.billingAddress?.postalCode}<br />
                                            Phone: {order.billingAddress?.phone}
                                        </p>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: '0.85rem' }}>Items Ordered:</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                            {order.items?.map((item, i) => (
                                                <div key={i} style={{ background: 'white', padding: '8px 15px', borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: '0.85rem' }}>
                                                    {item.name} - <span style={{ fontWeight: 800 }}>₹{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                        {order.status !== 'Paid' && (
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order.id, 'Paid')}
                                                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00c853', fontWeight: 700, fontSize: '0.85rem' }}
                                            >
                                                <CheckCircle size={16} /> Mark as Paid
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(order.id, 'orders')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4444', fontWeight: 600, fontSize: '0.85rem' }}>
                                            <Trash2 size={16} /> Delete Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && (
                                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                                    <ShoppingBag size={48} style={{ marginBottom: '1rem' }} />
                                    <p>No orders found yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid-cols-2" style={{ alignItems: 'start' }}>
                        {/* Form Section */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card"
                            style={{ padding: '3rem' }}
                        >
                            <h3 style={{ marginBottom: '2rem' }}>
                                {activeTab === 'blogs' ? 'Write New Post' : `Add New ${activeTab === 'projects' ? 'Project' : 'Product'}`}
                            </h3>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder={activeTab === 'projects' ? "Project Title" : activeTab === 'blogs' ? "Post Title" : "Product Name"}
                                    style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                />
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder={activeTab === 'blogs' ? "Post Content (HTML allowed)" : "Description/Excerpt"}
                                    rows={activeTab === 'blogs' ? 10 : 3}
                                    style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent', resize: 'vertical' }}
                                />
                                {activeTab !== 'projects' && activeTab !== 'blogs' && (
                                    <input
                                        required
                                        value={formData.cost}
                                        onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                        placeholder="Cost (e.g. 1500)"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                )}
                                <input
                                    required
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="Image URL (Unsplash or direct link)"
                                    style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                />
                                {activeTab === 'web' && (
                                    <input
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="Live Demo Link (Optional)"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                )}
                                {activeTab === 'projects' && (
                                    <input
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Category (e.g. Web App, Mobile)"
                                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', background: 'transparent' }}
                                    />
                                )}
                                <button type="submit" disabled={dataLoading} className="btn-primary" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Plus size={18} /> {dataLoading ? 'Saving...' : `Publish to ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                                </button>
                            </form>
                        </motion.div>

                        {/* List Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Current {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                            {((activeTab === 'projects' ? projects : activeTab === 'apps' ? appProducts : activeTab === 'blogs' ? blogs : webProducts)).map((item) => (
                                <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <img src={item.image} alt={item.title || item.name} style={{ width: '80px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0 }}>{item.title || item.name}</h4>
                                        <p style={{ margin: '4px 0', fontSize: '0.8rem', opacity: 0.6 }}>
                                            {activeTab === 'projects' ? item.category : activeTab === 'blogs' ? new Date(item.createdAt?.seconds * 1000).toLocaleDateString() : `₹${item.cost || item.price}`}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id, activeTab === 'projects' ? 'projects' : activeTab === 'apps' ? 'appProducts' : activeTab === 'blogs' ? 'blogs' : 'webProducts')}
                                        style={{ color: '#ff4444', padding: '8px' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {(activeTab === 'projects' ? projects : activeTab === 'apps' ? appProducts : webProducts).length === 0 && (
                                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius)', opacity: 0.5 }}>
                                    <Package size={40} style={{ marginBottom: '1rem' }} />
                                    <p>No items found in this category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
