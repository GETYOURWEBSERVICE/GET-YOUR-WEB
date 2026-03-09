import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Work from '../components/Work';
import Pricing from '../components/Pricing';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div className="page-home">
            <SEO
                title="Home"
                description="Get Your Web helps you build premium, high-performance websites and applications. Explore our services in web design, web development, and digital solutions."
            />
            <Hero />
            <Marquee />
            <Work />
            <Pricing />
        </div>
    );
};

export default Home;
