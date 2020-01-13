const CACHENAME = "pwa-task-manager";

const urlToCaches = ["/", "/sign", "/planning", "/login"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHENAME).then(cache => {
      console.log("Opened cache !");
      return cache.addAll(urlToCaches);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;
      return fetch(e.request);
    })
  );
});

self.addEventListener("activate", e => {
  const cacheWhiteList = ["pwa-task-manager"];

  e.waitUntil(
    caches.keys().then(cacheName => {
      if (cacheWhiteList.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    })
  );
});
