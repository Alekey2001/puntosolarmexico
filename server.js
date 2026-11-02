import express from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();
app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Express 5 requiere un comodín con nombre; incluye también la ruta raíz.
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((_req, res) => res.status(404).type('text').send('Página no encontrada.'));
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  if (status === 500) console.error(error);
  res.status(status).type('text').send(status === 500 ? 'Error interno del servidor.' : 'Recurso no disponible.');
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => { console.log(`Servidor en puerto ${PORT}`); });
}
