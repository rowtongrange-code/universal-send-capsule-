// Very small service worker for basic offline caching (optional)
const CACHE_NAME = 'usc-v1-cache-1'
const ASSETS = ['/','/index.html']
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)))
})
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))
})
