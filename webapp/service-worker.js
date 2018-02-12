(function(){
    'use strict';

const CACHE_NAME = 'pwa-ui5-todo-v1.0.07';
const RESOURCES_TO_PRELOAD = [
	'index.html',
	'logo.svg',
	'register-worker.js',
	'todo-app.js',
	'manifest.json'
]

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(RESOURCES_TO_PRELOAD);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response; // There is a cached version of the resource already
			}

			let requestCopy = event.request.clone();
			return fetch(requestCopy).then(function (response) {
				if (!response) {
					return response;
				}
				// If a resource is retrieved, save a copy to the cache.
				// Unfortunately, it is not possible to check if the response form CDN
				// was successful (responses with type === 'opaque' have zero status). 
				// For example, a 404 CDN error will be cached, too.
				if (response.status === 200 || response.type === 'opaque') {
					let responseCopy = response.clone();
					caches.open(CACHE_NAME).then(function (cache) {
						cache.put(event.request, responseCopy);
					});
				}
				return response;
			});
		})
	);
});
}());