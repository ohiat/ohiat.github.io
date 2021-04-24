/* eslint-disable strict */
const filesToCache = [
  "./",
  "index.html",
  "https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js",
  "https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css",
  "./index.js"
];

const staticCacheName = "tiles-cache-v1";

// expiration approach from https://gomakethings.com/how-to-set-an-expiration-date-for-items-in-a-service-worker-cache/
const isValid = function (response) {
  if (!response) return false;
  const fetched = response.headers.get("sw-fetched-on");
  // expiration time set to one day for demo
  if (fetched && (parseFloat(fetched) + (1000 * 60 * 60 * 24 * 45)) > new Date().getTime()) return true;
  return false;
};

self.addEventListener("install", event => {
  console.log("Attempting to install service worker and cache static assets");
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      }).then( () => {
        return self.skipWaiting(); // technique from https://davidwalsh.name/service-worker-claim
      })
  );
});

self.addEventListener("fetch", event => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(response => {
        if (isValid(response)) {
          // console.log("Found valid ", event.request.url, " in cache");
          return response;
        }
        // console.log("Network request for ", event.request.url);
        return fetch(event.request)
          .then(response => {
            if (response) {
              const copy = response.clone();
              event.waitUntil(caches.open(staticCacheName)
                .then(cache => {
                  const headers = new Headers(copy.headers);
                  headers.append("sw-fetched-on", new Date().getTime());
                  return copy.blob().then(body => {
                    cache.put(event.request.url, new Response(body, {
                      status: copy.status,
                      statusText: copy.statusText,
                      headers: headers
                    }));
                  });
                }));
              return response;
            }
          });
      }).catch(error => {
        console.log("Error, ", error);
      })
  );
});

self.addEventListener("activate", () => {
  console.log("Activating new service worker...");
  return self.clients.claim();
});
