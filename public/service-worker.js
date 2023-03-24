var CACHE_NAME = 'fancy-new-service-worker';
var urlsToCache = [
  '/'
];

// Install a service worker
self.addEventListener('install', event => {
    console.log("tada - installed!");
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
self.addEventListener('activate', event => {
    console.log('Claiming control');
    return self.clients.claim();
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
      new Promise((resolve, reject) => {
        resolve();
      }).then(res => {
        // Is the request for Next.js build data?
        if(event.request.url.includes("_next") &&
           event.request.url.includes("data") &&
           event.request.url.includes(".json")) {
            console.log("found next.js build data!");
            caches.match(event.request).then(cacheResponse => {
              if(cacheResponse) {
                console.log("found match in cache! checking if timeout is cached");
                caches.match(`rubin_obs_cache_${event.request.url}`).then(cacheTimeoutResponse => {
                  console.log("cached timeout found! checking if it's been a minute!");
                  // console.log(cacheTimeoutResponse.body);
                  cacheTimeoutResponse.json().then(cacheTimeoutResponseObj => {
                    console.log("cacheTimeoutResponseObj", cacheTimeoutResponseObj);
                    let ONE_MINUTE = 60 * 1000; 
                    if((Date.now() - cacheTimeoutResponseObj) < ONE_MINUTE) {
                      console.log("it has been less than one minute! serving cache")
                      console.log(cacheResponse);
                      return cacheResponse
                    } else {
                      console.log("it has been longer than a minute!!! serving new data");
                      return fetch(event.request);
                    }
                  })
                });
              }
              console.log("no cache data found! caching now!!");

              caches.open(CACHE_NAME).then(cache => {
                  cache.add(event.request.url);
                  cache.put(`rubin_obs_cache_${event.request.url}`, new Response(Date.now()));
              });
              
              return fetch(event.request);
            }).catch(reason => {
              console.log(reason);
              // return fetch(event.request);
              return
            });
        } else { // For everything else
          caches.match(event.request).then(cacheResponse => {
            if(cacheResponse) {
              caches.match(`rubin_obs_cache_${event.request.url}`).then(cacheTimeoutResponse => {
                cacheTimeoutResponse.json().then(cacheTimeoutResponseObj => {
                  console.log("cacheTimeoutResponseObj", cacheTimeoutResponseObj);
                  let ONE_MINUTE = 60 * 1000; 
                  if((Date.now() - cacheTimeoutResponseObj) < ONE_MINUTE) {
                    return cacheResponse
                  } else {
                    return fetch(event.request);
                  }
                })
              });
            }
            caches.open(CACHE_NAME).then(cache => {
                cache.add(event.request.url);
                cache.put(`rubin_obs_cache_${event.request.url}`, new Response(Date.now()));
            });
            
            return fetch(event.request);
          }).catch(reason => {
            console.log(reason);
            return
          });
        } 
        // else {
        //   console.log("url: ", event.request.url);
        // }
        console.log("at the end of the method");
        // return fetch(event.request);
        return
      })
  );  
  
});