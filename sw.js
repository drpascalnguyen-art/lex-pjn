// Lex PJN Morning Priming — kill-switch service worker.
// Replaces the old Workbox SW left over from when GlutenWise was deployed
// at this same /lex-pjn/ path. Clears all caches and unregisters itself,
// so the page reverts to a normal static site on the next reload.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
