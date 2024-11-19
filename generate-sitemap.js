const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/es/mmorpg/actualidad/noticias/brecha-martegeliana', changefreq: 'monthly', priority: 0.8 },
  { url: '/dofus/en', changefreq: 'monthly', priority: 0.8 },
  { url: '/dofus/es', changefreq: 'monthly', priority: 0.8 },
  { url: '/dofus/prg', changefreq: 'monthly', priority: 0.8 },

];

const sitemap = new SitemapStream({ hostname: 'https://dofusmmorpgs.com/' });

const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap)
  .then(() => console.log('Sitemap created successfully.'))
  .catch(err => console.error('Error creating sitemap:', err));
