var CACHE_NAME = 'ainotebook';
var urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).catch(err => {
                        return caches.match('offline.html')
                    });
                }
            )
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['ainotebook'];
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});