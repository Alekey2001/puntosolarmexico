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

test('la página y los estilos se entregan con su tipo de contenido', async () => {
  for (const route of ['/', '/index.html?preview=1']) {
    const response = await fetch(`${baseURL}${route}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /Punto Solar México/);
  }
  const response = await fetch(`${baseURL}/assets/css/styles.css`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/css/);
  assert.match(await response.text(), /:root/);
});

test('HEAD responde sin cuerpo y health confirma disponibilidad', async () => {
  const response = await fetch(baseURL, { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '');
  const health = await fetch(`${baseURL}/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: 'ok' });
});

test('no se publican archivos internos ni rutas inexistentes', async () => {
  for (const route of ['/package.json', '/server.js', '/README.md', '/.env', '/.git/config', '/no-existe', '/assets/css/no-existe.css', '/assets/%2e%2e%2fpackage.json']) {
    const response = await fetch(`${baseURL}${route}`);
    assert.ok([403, 404].includes(response.status), `${route}: ${response.status}`);
    assert.doesNotMatch(await response.text(), /"scripts"|ref: refs\/heads/);
  }
});
