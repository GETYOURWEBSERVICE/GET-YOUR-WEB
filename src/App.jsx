import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SecurityGuard from './components/SecurityGuard';

// Lazy load page components
const Home = React.lazy(() => import('./pages/Home'));
const BookMeet = React.lazy(() => import('./pages/BookMeet'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

// Fallback component for Suspense
const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'hsl(var(--background))'
  }}>
    <div className="animate-float" style={{
      width: '40px',
      height: '40px',
      border: '3px solid hsl(var(--primary))',
      borderRadius: '50%',
      borderTopColor: 'transparent'
    }} />
  </div>
);


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <div className="app-container">
            <SecurityGuard />
            <ScrollToTop />

            <Navbar />
            <main>
              <React.Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/book-meet" element={<BookMeet />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LazyMotion>
    </AuthProvider>
  );
}

export default App;
