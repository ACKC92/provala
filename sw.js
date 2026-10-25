/* Provarium has moved (see index.html here): this takes the place of the service worker the app left on phones at this
   address, empties what it kept (the app's caches for this folder only: other pages at this address keep theirs) and
   leaves. (It doesn't reload anything: the forwarding page may be sending a sign-in along just then; the page opens
   from the site next time anyway.) */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  var here = new URL(self.registration.scope).pathname;
  var ours = function (k) {
    var at = k.indexOf(':');
    // (The app's caches under its names: Provarium's, the previous name's, the first working title's.)
    return (k.indexOf('provarium-') === 0 || k.indexOf('prov' + 'ala-') === 0 || k.indexOf('tu' + 'tti-') === 0) && (at === -1 || k.slice(at + 1) === here);
  };
  e.waitUntil(caches.keys()
    .then(function (ks) { return Promise.all(ks.filter(ours).map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.registration.unregister(); }));
});
