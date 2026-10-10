// Service worker: офлайн-кэш и обновления.
// Версия берётся из js/version.js — при её смене старый кэш удаляется.
importScripts('js/version.js');

const CACHE = 'aaaa-' + APP_VERSION;
const FILES = [
  './',
  './index.html',
  './css/fonts.css',
  './css/tokens.css',
  './css/style.css',
  './js/version.js',
  './js/changelog.js',
  './js/state.js',
  './js/classes.js',
  './js/races.js',
  './js/genders.js',
  './js/factions.js',
  './js/createSteps.js',
  './js/loadSettings.js',
  './js/saveSettings.js',
  './js/slotKey.js',
  './js/loadSlot.js',
  './js/saveSlot.js',
  './js/createSlot.js',
  './js/deleteSlot.js',
  './js/getActiveSlot.js',
  './js/setActiveSlot.js',
  './js/resetAllSaves.js',
  './js/formatDate.js',
  './js/vibrate.js',
  './js/findById.js',
  './js/describeCharacter.js',
  './js/showVersion.js',
  './js/showToast.js',
  './js/showConfirm.js',
  './js/showScreen.js',
  './js/goBack.js',
  './js/renderScreen.js',
  './js/renderMenu.js',
  './js/renderCharacters.js',
  './js/renderSettings.js',
  './js/renderGame.js',
  './js/isStepComplete.js',
  './js/renderNameStep.js',
  './js/renderChoiceStep.js',
  './js/renderCreateStep.js',
  './js/openCharacterCreation.js',
  './js/createStepNext.js',
  './js/createStepBack.js',
  './js/finishCharacterCreation.js',
  './js/startGame.js',
  './js/setFullscreen.js',
  './js/enterFullscreen.js',
  './js/registerServiceWorker.js',
  './js/openChangelog.js',
  './js/closeChangelog.js',
  './js/exitApp.js',
  './js/setupChangelog.js',
  './js/setupMenu.js',
  './js/main.js',
  './fonts/nunito-cyrillic-600-normal.woff2',
  './fonts/nunito-cyrillic-800-normal.woff2',
  './fonts/nunito-latin-600-normal.woff2',
  './fonts/nunito-latin-800-normal.woff2',
  './fonts/russo-one-cyrillic-400-normal.woff2',
  './fonts/russo-one-latin-400-normal.woff2',
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
