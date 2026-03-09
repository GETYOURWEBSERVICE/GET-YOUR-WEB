import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Work from '../components/Work';
import Pricing from '../components/Pricing';

const Home = () => {
    return (
        <div className="page-home">
            <Hero />
            <Marquee />
            <Work />
            <Pricing />
        </div>
    );
};

export default Home;
