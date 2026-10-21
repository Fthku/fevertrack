const CACHE = 'fevercycle-v3';
const ASSETS = [
  '/fevertrack/',
  '/fevertrack/index.html',
  '/fevertrack/manifest.json',
  '/fevertrack/icon-192.png',
  '/fevertrack/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('fevercycle-') && k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Network-first: always try network, fall back to cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
