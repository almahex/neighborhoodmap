'use strict';

//File to cache in order to render the pages when being offline
var filesToCache = [
  '.',
  'src/App.css',
  'src/App.js',
  'src/FlickImg.js', 
  'src/index.css',
  'src/index.js',
  'src/ListView.js', 
  'src/MapArea.js',
  'src/MonumentDetails.js',
  'src/MyMapComponent.js',
  'src/NoMatch.js', 
  'public/sw.js',
  'src/icons/glass.svg',
  'src/icons/header.jpg',
  'src/icons/mapMarker.png', 
  'public/index.html',
  'public/favicon.ico',
  'public/manifest.json'
];

var staticCacheName = 'neighborhoodmap-cache-v1';

//Create the cache and add all the files to it in the install event
self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

//Fetch all the requests and respond with the ones in the cache
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(function(response) {
        if(response.status === '404'){
          console.log("Page not found!");
        }

      return caches.open(staticCacheName).then(function(cache) {
        //Add to the cache the selected images with the correct size
        //depending on the device
        if (event.request.url.endsWith('.jpg') || event.request.url.endsWith('.woff2') || event.request.url.startsWith('https://maps.')
            || event.request.url.startsWith('https://fonts') || event.request.url.startsWith('https://farm') || event.request.url.startsWith('https://api.flickr')) {
          cache.put(event.request.url, response.clone());
        }
        return response;
        });
      });
    })
  );
});

//Remove unused caches in the activate event
self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});