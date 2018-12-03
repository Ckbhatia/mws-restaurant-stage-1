let CACHE_VERSION = 'restaurant-app-static-v1';
let CACHE_FILES = [
    './css/styles.css',
    './',
    './index.html',
    './restaurant.html',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    './js/sw_register.js',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
];
//installing the service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(CACHE_FILES);
        })
    );
});
//activating the service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != CACHE_VERSION;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetch event is fired
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                return caches.open('restaurant-app-static-v1').then(function(cache) {
                    if (event.request.url.indexOf('restaurant.html') != -1 || event.request.url.indexOf('leaflet') != -1) {
                        cache.put(event.request, response.clone());
                        return response;
                    }
                });
            });
        })
    );
});