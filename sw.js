//installing the service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(/*<add files for cache>*/);
        })
    );
});