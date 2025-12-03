import { DEFAULT_SEO } from '@/lib/seo';

export default function Sitemap() {
    // This component won't render - it's just for the API route
    return null;
}

export async function getServerSideProps({ res }) {
    const baseUrl = DEFAULT_SEO.siteUrl;
    const currentDate = new Date().toISOString();

    const staticPages = [
        { url: '', changefreq: 'daily', priority: '1.0' },
        { url: '/signup', changefreq: 'monthly', priority: '0.8' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
            .map(
                (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
            )
            .join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}
