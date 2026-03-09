import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
    const siteTitle = "Get Your Web";
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Professional Web Development & Design`;
    const defaultDescription = "Get Your Web provides premium web development, design, and SEO services. Build your online presence with high-performance, stunning websites.";
    const defaultKeywords = "web development, web design, SEO services, Get Your Web, responsive design, custom websites, professional web developers";
    const siteUrl = "https://getyourweb.qzz.io/";
    const defaultImage = "https://getyourweb.qzz.io/og-image.jpg";

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content="Get Your Web Team" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || siteUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || defaultImage} />

            {/* Canonical Link */}
            <link rel="canonical" href={url || siteUrl} />
        </Helmet>
    );
};

export default SEO;
