export default function handler(req, res) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chinatourplan.com';
    const currentDate = new Date().toISOString().split('T')[0];

    const staticPages = [
        { url: '', changefreq: 'daily', priority: '1.0' },
        { url: '/signup', changefreq: 'monthly', priority: '0.7' },
        { url: '/reset-password', changefreq: 'yearly', priority: '0.3' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
    .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
    res.status(200).send(sitemap);
}
