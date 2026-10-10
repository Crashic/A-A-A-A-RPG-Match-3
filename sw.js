// Service worker: офлайн-кэш и обновления.
// Версия берётся из js/version.js — при её смене старый кэш удаляется.
importScripts('js/version.js');

const CACHE = 'aaaa-' + APP_VERSION;
const FILES = [
  './',
  './index.html',
  './css/style.css',
  './js/version.js',
  './js/showVersion.js',
  './js/showToast.js',
  './js/registerServiceWorker.js',
  './js/enterFullscreen.js',
  './js/main.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Сначала сеть (свежая версия), без сети — кэш.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' })
      .then(r => {
        if (r.ok) {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});
