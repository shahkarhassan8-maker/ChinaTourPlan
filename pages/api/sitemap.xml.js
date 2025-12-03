import { DEFAULT_SEO } from '@/lib/seo';

export default function handler(req, res) {
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
    res.status(200).send(sitemap);
}
