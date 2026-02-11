import React from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Pricing from '../components/Pricing';

const Home = () => {
    return (
        <div className="page-home">
            <Hero />
            <Work />
            <Pricing />
        </div>
    );
};

export default Home;
