/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ipheclan.com",
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  exclude: ["/404", "/500"],
  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/work": 0.9,
      "/clan": 0.8,
      "/about": 0.7,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
