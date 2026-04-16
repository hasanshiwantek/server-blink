export async function GET() {
  try {
    const backendRes = await fetch(
      'https://backend.sparemicro.com/api/sitemap/xmlsitemap',
      {
        next: { revalidate: 3600 }, // Cache 1 hour
      }
    );

    if (!backendRes.ok) {
      throw new Error(`Backend returned status ${backendRes.status}`);
    }

    let xml = await backendRes.text();

    // Fix 1: If backend returns plain list of URLs instead of proper <sitemapindex>, we wrap it
    if (!xml.trim().startsWith('<?xml') && !xml.includes('<sitemapindex')) {
      // Split URLs (handles newlines or spaces)
      const urls = xml
        .trim()
        .split(/\s+/)
        .filter(url => url.startsWith('http'));

      let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      urls.forEach(url => {
        // Properly escape & to &amp; in XML
        const safeUrl = url.replace(/&/g, '&amp;');
        sitemapIndex += `
  <sitemap>
    <loc>${safeUrl}</loc>
  </sitemap>`;
      });

      sitemapIndex += `
</sitemapindex>`;

      xml = sitemapIndex;
    } else {
      // If it's already XML, still escape any unescaped & just in case
      xml = xml.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
    }

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap index error:', error);
    return new Response('Error loading sitemap', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}