/* eslint-env node */
module.exports = {
  siteUrl: 'https://stanleychueh.com',
  // Both must match next.config.js exactly. `output` — without this, next-sitemap skips
  // scanning the static `out/` HTML files entirely and silently drops routes like the homepage.
  // `trailingSlash` — otherwise sitemap URLs disagree with the site's own canonical tags.
  output: 'export',
  trailingSlash: true,
  exclude: ['/404*', '/500*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/404', '/500'],
      },
    ],
  },
};
