/* Provala's service worker (from version 2026-10-r4.5), for the app on the home screen.
   It keeps the page and its pictures and fonts on the phone, so Provala opens at once and also without a
   connection. It never keeps the answers from Apps Script: those come from another site and go straight through,
   so nobody's names, answers or times are ever stored here.
   The page itself is asked for afresh whenever there's a connection, waiting up to a second and a half for it (four
   seconds before version 2026-10-r5.3); only without one, or when it's slower than that, does it open the copy kept here (and the page then takes up the new version
   once it's in: see checkVersion in index.html). If the site says the page is gone (404), the copy goes too, and the
   page is asked for again at the next opening as always (so a short 404 is over as soon as the site is back).
   Changing this file: give VERSION_NAME a new number, so phones start afresh. To switch it off, see the README. */
const VERSION_NAME = 'provala-1';
// Provala's own folder (the address with nothing after the last /), and its cache: named with the folder, so another
// copy of Provala elsewhere on the same github.io address keeps its own.
const HOME = new URL('./', self.location.href);
const CACHE = VERSION_NAME + ':' + HOME.pathname;
// Kept at once on the first visit, so the next one works offline. (A file that's missing is simply skipped.)
const SHELL = ['./', 'banner.webp', 'vollkorn.woff2', 'vollkorn-italic.woff2', 'icon.png', 'tex-clouds-light.webp', 'tex-stains.webp',
  'tex-grain-light-1x.webp', 'tex-grain-light-2x.webp', 'tex-grain-light-3x.webp', 'tex-grain-dark-1x.webp', 'tex-grain-dark-2x.webp', 'tex-grain-dark-3x.webp'];
// How long to wait for a fresh page before opening the kept one, and at most for its copy to be kept.
const WAIT_MS = 1500, KEEP_MS = 30000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'no-cache' })).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => ours(k) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Kept in this version's cache (made again if something else cleared it), unless a newer sw.js for this folder has
// its own by now: a copy arriving late mustn't bring the old one back.
const ours = k => k.indexOf('provala-') === 0 && k.slice(k.indexOf(':') + 1) === HOME.pathname;
const keep = (key, res) => caches.keys()
  .then(keys => (keys.indexOf(CACHE) === -1 && keys.some(ours) ? null : caches.open(CACHE).then(c => c.put(key, res))))
  .catch(() => null);
// The site says the page is gone (the repository renamed, say): nothing kept any more, so no old copy ever opens.
const forget = () => caches.delete(CACHE).catch(() => null);

// The page's pictures, fonts and icons (and the manifests): kept here, and refreshed behind the scenes.
const ASSET = /\.(webp|woff2|png|jpg|webmanifest)$/;
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const url = new URL(r.url);
  if (url.origin !== self.location.origin) return;   // Apps Script, and anything else elsewhere: untouched
  // Provala's own address (with index.html or without): any other page in the same folder is left alone.
  if (r.mode === 'navigate' && (url.pathname === HOME.pathname || url.pathname === HOME.pathname + 'index.html')) {
    // Asked afresh (the server says if it's unchanged), and kept for next time once it comes, however late (up to
    // KEEP_MS). The address may carry a poll or a sign-in link: the page is asked for and kept at the plain address.
    let saved;
    e.waitUntil(new Promise(resolve => { saved = resolve; setTimeout(resolve, KEEP_MS); }));
    const net = fetch(HOME.href, { cache: 'no-cache', credentials: 'same-origin' }).then(res => {
      if (res.status === 404 || res.status === 410) saved(forget());
      else saved(res.ok && res.type === 'basic' && !res.redirected ? keep('./', res.clone()) : null);
      return res.redirected ? Response.redirect(res.url, 302) : res;
    }, err => { saved(null); throw err; });
    e.respondWith(page(net));
    return;
  }
  if (ASSET.test(url.pathname)) {
    const fresh = fetch(r).then(res => (res.ok && res.type === 'basic' ? keep(r, res.clone()).then(() => res) : res)).catch(() => null);
    e.waitUntil(fresh);
    e.respondWith(asset(r, fresh));
  }
});

// (A copy the cache got through a redirect can't answer a page's address itself: given as a plain answer.)
const plain = async res => (res && res.redirected ? new Response(await res.blob(), { status: 200, headers: res.headers }) : res);

async function page(net) {
  const late = new Promise(resolve => setTimeout(() => resolve(null), WAIT_MS));
  const res = await Promise.race([net.catch(() => null), late]);
  // Fresh, or gone from the site (then said as it is).
  if (res && (res.ok || res.status === 302 || res.status === 404 || res.status === 410)) return res;
  // No connection, too slow, or the site answering with another error: the copy kept here, if there is one.
  const kept = await caches.match('./', { cacheName: CACHE }).catch(() => null);
  if (kept) return plain(kept);
  return res || net;   // nothing kept yet: the network, however long it takes
}

async function asset(r, fresh) {
  const kept = await caches.match(r, { cacheName: CACHE }).catch(() => null);
  return kept || (await fresh) || Response.error();
}
