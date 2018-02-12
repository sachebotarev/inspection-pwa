(function(){
    'use strict';

const CACHE_NAME = 'inspection-pwa';
//const COMPONENT_PATH = "inspection";
const CDN_BASE = 'https://openui5.hana.ondemand.com/resources/';

var resourcesToCache = [
	'index.html',
	//'logo.svg',
	'register-worker.js',
	'manifest.json'
	//`${COMPONENT_PATH}/Component-Preload.js`
]

resourcesToCache = resourcesToCache.concat([
	`${CDN_BASE}sap-ui-core.js`,
	`${CDN_BASE}sap/ui/core/library-preload.js`,
	`${CDN_BASE}sap/ui/core/themes/sap_belize_plus/library.css`,
	`${CDN_BASE}sap/ui/core/themes/base/fonts/SAP-icons.woff2`,
	`${CDN_BASE}sap/m/library-preload.js`,
	`${CDN_BASE}sap/m/themes/sap_belize_plus/library.css`
]);

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(resourcesToCache);
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