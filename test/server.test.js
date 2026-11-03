import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';

let server;
let baseURL;
before(async () => {
  const reservation = createServer().listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise((resolve, reject) => {
    reservation.close((error) => error ? reject(error) : resolve());
  });
  baseURL = `http://127.0.0.1:${port}`;

  // Verifica el arranque por importación ESM, como el gestor del hosting.
  server = spawn(process.execPath, ['--input-type=module', '--eval', "await import('./server.js');"], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let errors = '';
  server.stderr.on('data', (chunk) => { errors += chunk; });
  const output = await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(([code]) => {
      throw new Error(`El servidor terminó antes de arrancar (${code}): ${errors}`);
    }),
  ]);
  assert.match(output[0].toString(), new RegExp(`Servidor en puerto ${port}`));
}, { timeout: 10000 });

after(async () => {
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit');
    server.kill();
    await exited;
  }
});

test('la página y los recursos compilados se entregan con su tipo de contenido', async () => {
  for (const route of ['/', '/index.html?preview=1']) {
    const response = await fetch(`${baseURL}${route}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    assert.match(html, /Punto Solar México/);
    assert.doesNotMatch(html, /\/src\/main\.jsx/);
    const script = html.match(/src="(\/assets\/[^\"]+\.js)"/);
    const stylesheet = html.match(/href="(\/assets\/[^\"]+\.css)"/);
    assert.ok(script, 'El HTML debe cargar el bundle de React');
    assert.ok(stylesheet, 'El HTML debe cargar los estilos compilados');
    for (const [asset, contentType] of [[script[1], /javascript/], [stylesheet[1], /text\/css/]]) {
      const resource = await fetch(`${baseURL}${asset}`);
      assert.equal(resource.status, 200, asset);
      assert.match(resource.headers.get('content-type'), contentType);
      assert.ok((await resource.text()).length > 0, asset);
    }
  }
});

test('HEAD responde sin cuerpo y health confirma disponibilidad', async () => {
  const response = await fetch(baseURL, { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '');
  const health = await fetch(`${baseURL}/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });
});

test('las rutas del frontend reciben el HTML para React Router', async () => {
  const index = await (await fetch(baseURL)).text();
  for (const route of ['/cotizacion', '/proyectos/residencial?preview=1']) {
    const response = await fetch(`${baseURL}${route}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.equal(await response.text(), index);
  }
});

test('el fallback no publica archivos internos', async () => {
  const index = await (await fetch(baseURL)).text();
  for (const route of ['/package.json', '/pnpm-lock.yaml', '/server.js', '/README.md', '/.env', '/.cursor', '/.git/config', '/src/main.jsx', '/vite.config.js', '/tailwind.config.js', '/no-existe', '/assets/css/no-existe.css', '/assets/%2e%2e%2fpackage.json']) {
    const response = await fetch(`${baseURL}${route}`);
    assert.ok([200, 403, 404].includes(response.status), `${route}: ${response.status}`);
    const body = await response.text();
    if (response.status === 200) assert.equal(body, index, route);
    assert.doesNotMatch(body, /"scripts"|ref: refs\/heads/);
  }
});
