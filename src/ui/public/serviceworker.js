const CACHE_NAME = 'cash-v2';
const DYNAMIC_CACHE = 'dynamic-v1'

const urlsToCache = [
    'index.html',
    'offline.html'
];


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


// Update a service worker
self.addEventListener('activate', async event => {
   const cacheName = await caches.keys()
   await Promise.all(
       cacheName
           .filter(name => name !== CACHE_NAME)
           .filter(name => name !== DYNAMIC_CACHE)
           .map(name => caches.delete(name))
   )
});

// Cache and return requests
self.addEventListener('fetch', async event => {
    const {request} = event

    if(request.method === "GET"){
        const url = new URL(request.url)

        if(url.origin === location.origin){
            event.respondWith(cacheFirst(event.request))
        }else {
            event.respondWith(networkFirst(event.request))
        }
    }else {
        const res = await request
        event.respondWith(fetch(res))
    }

});

async function cacheFirst(request) {
    const cached = await caches.match(request)

    return cached ?? await fetch(request)
}

async function networkFirst(request){
    const cache = await caches.open(DYNAMIC_CACHE)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    }catch (e){
        const cached = await cache.match(request)
        return cached ?? await fetch(request)
    }
}