import express from 'express';
import { fileURLToPath, pathToFileURL } from 'node:url';

const indexPath = fileURLToPath(new URL('./dist/index.html', import.meta.url));
const assetsPath = fileURLToPath(new URL('./dist/assets/', import.meta.url));

export const app = express();
app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Servir únicamente los recursos públicos; nunca la raíz del repositorio.
app.use('/assets', express.static(assetsPath, { dotfiles: 'deny' }));
app.get(['/', '/index.html'], (_req, res) => res.sendFile(indexPath));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use((_req, res) => res.status(404).type('text').send('Página no encontrada.'));
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  if (status === 500) console.error(error);
  res.status(status).type('text').send(status === 500 ? 'Error interno del servidor.' : 'Recurso no disponible.');
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT debe ser un número entero entre 1 y 65535.');
  }
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Punto Solar México: servidor disponible en el puerto ${port}`);
  });
  server.on('error', (error) => {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exitCode = 1;
  });
  const shutdown = () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}
