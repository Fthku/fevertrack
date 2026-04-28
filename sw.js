const CACHE = 'fevercycle-v1';
const ASSETS = [
  '/fevercycle/',
  '/fevercycle/index.html',
  '/fevercycle/manifest.json',
  '/fevercycle/icon-192.png',
  '/fevercycle/icon-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
