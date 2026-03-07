import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, Smartphone, Globe, Calendar, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, isAdmin, loginWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Work', href: '/#work' },
    {
      name: 'Shop',
      href: '#',
      dropdown: [
        { name: 'App Development', href: '/shop-app', icon: <Smartphone size={16} /> },
        { name: 'Website Development', href: '/shop-web', icon: <Globe size={16} /> },
      ],
    },
    { name: 'Policy', href: '/#policy' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={scrolled ? "glass-panel" : ""}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        padding: scrolled ? '0.75rem 0' : '1.5rem 0',
        paddingTop: window.innerWidth < 768 ? 'calc(2.5rem + env(safe-area-inset-top, 0px))' : (scrolled ? '0.75rem' : '1.5rem'),
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'hsla(30, 20%, 98%, 0.9)' : 'transparent',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(25, 30, 15, 0.1)' : 'none'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'Outfit', cursor: 'pointer' }}
        >
          <Link to="/" style={{ color: 'inherit' }}>
            <span style={{ color: 'hsl(var(--foreground))' }}>Get Your</span>
            <span style={{ color: 'hsl(var(--primary))' }}> Web</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
          {navLinks.map((link) => (
            <div
              key={link.name}
              onMouseEnter={() => link.dropdown && setIsShopOpen(true)}
              onMouseLeave={() => link.dropdown && setIsShopOpen(false)}
              style={{ position: 'relative' }}
            >
              {link.dropdown ? (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))',
                    cursor: 'pointer'
                  }}
                >
                  {link.name}
                  <motion.div animate={{ rotate: isShopOpen ? 180 : 0 }}>
                    <ChevronDown size={16} />
                  </motion.div>
                </span>
              ) : (
                <NavLink
                  to={link.href}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
                  })}
                >
                  {link.name}
                </NavLink>
              )}

              {link.dropdown && (
                <AnimatePresence>
                  {isShopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="glass-card"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-20px',
                        minWidth: '220px',
                        padding: '1.25rem',
                        marginTop: '1rem',
                        zIndex: 1001,
                        background: 'white',
                        boxShadow: '0 20px 40px -15px rgba(25, 30, 15, 0.15)'
                      }}
                    >
                      {link.dropdown.map((item) => (
                        <motion.div key={item.name} whileHover={{ x: 5 }}>
                          <Link
                            to={item.href}
                            onClick={() => setIsShopOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '0.75rem 0',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              color: 'hsl(var(--muted-foreground))',
                              borderBottom: '1px solid #f5f5f5'
                            }}
                          >
                            <span style={{ color: 'hsl(var(--primary))' }}>{item.icon}</span>
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isAdmin && (
                  <Link
                    to="/admin"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'hsl(var(--primary))',
                      marginRight: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Admin <span style={{ fontSize: '0.7rem' }}>●</span>
                  </Link>
                )}
                <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>{currentUser.displayName}</p>
                </div>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid hsl(var(--primary))' }} />
                ) : (
                  <UserIcon size={20} />
                )}
                <button onClick={logout} style={{ color: 'hsl(var(--foreground))' }} title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'hsl(var(--foreground))',
                  background: 'hsl(var(--accent))',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius)'
                }}
              >
                <LogIn size={18} /> Login
              </button>
            )}

            {/* Cart link removed */}

            <Link to="/book-meet">
              <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} /> Book Meet
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-only">
          {/* Mobile Cart link removed */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{
              color: 'hsl(var(--foreground))',
              background: 'hsl(var(--accent))',
              padding: '8px',
              borderRadius: '12px'
            }}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 1025px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 1024px) {
          .mobile-only { display: flex !important; }
        }
      `}</style>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '80%',
              height: '100vh',
              background: 'white',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
              padding: '6rem 2rem',
              zIndex: 999
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto' }}>
              {currentUser && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', padding: '1rem', background: 'hsl(var(--accent))', borderRadius: 'var(--radius)' }}>
                  {currentUser.photoURL && <img src={currentUser.photoURL} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid hsl(var(--primary))' }} />}
                  <p style={{ fontWeight: 700, fontSize: '1rem' }}>{currentUser.displayName}</p>
                </div>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  style={{
                    display: 'block',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'hsl(var(--primary))'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'hsl(var(--foreground))' }}>{link.name}</span>
                  ) : (
                    <Link
                      to={link.href}
                      style={{
                        display: 'block',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: 'hsl(var(--foreground))'
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.dropdown && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', borderLeft: '2px solid hsl(var(--primary))' }}>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            color: 'hsl(var(--muted-foreground))'
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {!currentUser ? (
                <button
                  onClick={() => { handleLogin(); setIsOpen(false); }}
                  style={{ width: '100%', padding: '1rem', background: 'hsl(var(--foreground))', color: 'white', borderRadius: 'var(--radius)', fontWeight: 700 }}
                >
                  Login with Google
                </button>
              ) : (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  style={{ width: '100%', padding: '1rem', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontWeight: 700 }}
                >
                  Logout
                </button>
              )}

              <Link to="/book-meet" onClick={() => setIsOpen(false)}>
                <button className="btn-primary" style={{ width: '100%' }}>Book a Meet</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
