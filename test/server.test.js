import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { once } from 'node:events';
import { app } from '../server.js';

let server;
let baseURL;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseURL = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve, reject) => {
  server.close((error) => error ? reject(error) : resolve());
}));

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
