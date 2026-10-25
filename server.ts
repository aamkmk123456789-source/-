import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Data persistence folder
  const DATA_DIR = path.join(__dirname, 'data');
  const DATA_FILE = path.join(DATA_DIR, 'firm_data.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initial firm data with exact address and phone
  const defaultData = {
    firmName: 'مؤسسة الجميل للخدمات والاستشارات القانونية',
    tagline: 'خبرة قانونية عريقة، وحماية متكاملة لحقوقك بكل نزاهة واحترافية.',
    founderName: 'المستشار هاني جميل',
    founderTitle: 'محامي بالنقض والإدارية العليا - خبرة 35 سنة',
    primaryPhone: '01007665023',
    secondaryPhone: '01014382292',
    address: 'برج العيدروس - الدور السابع - المنتزة - الزقازيق',
    city: 'الزقازيق',
    province: 'الشرقية',
    country: 'جمهورية مصر العربية',
    workingHours: 'يومياً من الساعة ٥:٠٠ مساءً حتى ١٠:٠٠ مساءً (بميعاد مسبق)، مع تلقي الطوارئ الجنائية على مدار الساعة.',
    emergencyNote: 'تلقي الطوارئ الجنائية والنيابات على مدار 24 ساعة',
    announcement: 'المقر الرئيسي متاح لاستقبال الموكلين: برج العيدروس - الدور السابع - المنتزة - الزقازيق',
    announcementActive: true,
    googleSiteVerification: '',
    bingSiteVerification: '',
    updatedAt: new Date().toISOString()
  };

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }

  const getStoredData = () => {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return defaultData;
    }
  };

  // API endpoints
  app.get('/api/firm-data', (_req, res) => {
    res.json(getStoredData());
  });

  app.post('/api/firm-data', (req, res) => {
    try {
      const current = getStoredData();
      const updated = {
        ...current,
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Robots.txt
  app.get('/robots.txt', (_req, res) => {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${process.env.APP_URL || 'https://scintillating-twilight-84e410.netlify.app'}/sitemap.xml
`;
    res.type('text/plain').send(robotsContent);
  });

  // Sitemap.xml
  app.get('/sitemap.xml', (_req, res) => {
    const baseUrl = process.env.APP_URL || 'https://scintillating-twilight-84e410.netlify.app';
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/index_standalone.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    res.type('application/xml').send(sitemapContent);
  });

  // Vite Integration
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const portNumber = Number(process.env.PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${portNumber}`);
  });
}

startServer();
