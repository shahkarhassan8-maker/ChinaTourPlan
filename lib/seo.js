// SEO Configuration and Utilities

export const DEFAULT_SEO = {
    siteName: 'ChinaTourPlan',
    siteUrl: 'https://chinatourplan.com',
    defaultTitle: 'ChinaTourPlan - AI-Powered China Travel Itinerary Planner',
    defaultDescription: 'Plan your perfect China trip with AI-powered itineraries. Get detailed day-by-day plans, costs, and travel tips for Beijing, Shanghai, Xi\'an and more.',
    defaultKeywords: 'China travel planner, China itinerary, China trip planner, AI travel itinerary, China vacation planner, Beijing tour, Shanghai travel, Xi\'an attractions',
    twitterHandle: '@chinatourplan',
    socialImage: '/og_image.png', // You should create this image (1200x630px)
    locale: 'en_US',
};

/**
 * Generate meta tags for a page
 */
export function generateMetaTags({
    title = DEFAULT_SEO.defaultTitle,
    description = DEFAULT_SEO.defaultDescription,
    keywords = DEFAULT_SEO.defaultKeywords,
    image = DEFAULT_SEO.socialImage,
    url = DEFAULT_SEO.siteUrl,
    type = 'website',
    noIndex = false,
}) {
    const fullTitle = title.includes('ChinaTourPlan') ? title : `${title} | ${DEFAULT_SEO.siteName}`;
    const fullUrl = url.startsWith('http') ? url : `${DEFAULT_SEO.siteUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${DEFAULT_SEO.siteUrl}${image}`;

    return {
        title: fullTitle,
        description,
        keywords,
        canonical: fullUrl,
        noIndex,
        openGraph: {
            type,
            url: fullUrl,
            title: fullTitle,
            description,
            image: fullImage,
            siteName: DEFAULT_SEO.siteName,
            locale: DEFAULT_SEO.locale,
        },
        twitter: {
            card: 'summary_large_image',
            site: DEFAULT_SEO.twitterHandle,
            title: fullTitle,
            description,
            image: fullImage,
        },
    };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: DEFAULT_SEO.siteName,
        url: DEFAULT_SEO.siteUrl,
        logo: `${DEFAULT_SEO.siteUrl}/logo.jpg`,
        description: DEFAULT_SEO.defaultDescription,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: ['English', 'Chinese'],
        },
        sameAs: [
            // Add your social media profiles here
            // 'https://twitter.com/chinatourplan',
            // 'https://facebook.com/chinatourplan',
        ],
    };
}

/**
 * Generate JSON-LD structured data for TouristTrip (Itinerary)
 */
export function generateTripSchema({ title, description, cities, duration, startDate }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: title,
        description: description,
        itinerary: {
            '@type': 'ItemList',
            numberOfItems: duration,
            itemListElement: cities.map((city, index) => ({
                '@type': 'City',
                position: index + 1,
                name: city,
            })),
        },
        touristType: 'International Tourists',
        ...(startDate && { startDate }),
    };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${DEFAULT_SEO.siteUrl}${item.url}`,
        })),
    };
}
