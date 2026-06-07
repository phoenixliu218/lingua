const CACHE = 'lingua-v40';
const CORE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

async function precacheAssets(cache) {
  try {
    const resp = await fetch('./assets-manifest.json', { cache: 'no-store' });
    if (!resp.ok) return;
    const paths = await resp.json();
    // chunk 20 parallel at a time; tolerate individual failures (flaky network)
    const chunkSize = 20;
    for (let i = 0; i < paths.length; i += chunkSize) {
      const chunk = paths.slice(i, i + chunkSize);
      await Promise.allSettled(chunk.map(async (path) => {
        try {
          const r = await fetch(path);
          if (r.ok) await cache.put(path, r.clone());
        } catch {}
      }));
    }
  } catch (err) {
    // install must not fail on asset precache errors
    console.warn('SW precache assets:', err);
  }
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await precacheAssets(cache);  // ~12 MB; runs in background after CORE
  })());
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const p = url.pathname;
  const isAppCode = p.endsWith('.html') || p.endsWith('.js') || p.endsWith('.css')
                    || p.endsWith('.json') || p.endsWith('/');

  if (isAppCode) {
    // Network-first for app code: latest on every reload
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
  } else {
    // Cache-first / stale-while-revalidate for static assets (img, mp3)
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(resp => {
          if (resp && resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return resp;
        }).catch(() => cached);
        return cached || fresh;
      })
    );
  }
});
