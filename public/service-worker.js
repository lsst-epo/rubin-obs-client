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
    console.log("inside of fetch catcher 1");
    event.respondWith(
      new Promise((resolve, reject) => {
        resolve();
      }).then(res => {
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
                console.log('Opened cache');
                cache.add(event.request.url);
                cache.put(`rubin_obs_cache_${event.request.url}`, new Response(Date.now()));
                // fetch(event.request.url).then(response => {
                //   if(response.ok) {
                //     cache.put(event.request.url, {
                //       timeCached: Date.now(),
                //       data: response
                //     });
                //   }
                // });
                
            });
            
            console.log("returning fetch");
            return fetch(event.request);
            }).catch(reason => {
              console.log("inside of catch")
              console.log(reason);
              // return fetch(event.request);
              return
            });
        } else {
          console.log("url: ", event.request.url);
        }
        console.log("at the end of the method");
        return fetch(event.request);
      })
  );  
  
});