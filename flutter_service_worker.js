// Retire the previous Flutter site's offline cache during the portfolio migration.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all(['flutter-app-manifest', 'flutter-temp-cache', 'flutter-app-cache'].map(name => caches.delete(name)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    await Promise.all(windows.map(client => client.navigate(client.url)));
  })());
});
