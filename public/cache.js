'use strict'

// Workbox RuntimeCaching config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
module.exports = [
    {
        urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
        handler: 'StaleWhileRevalidate',
        options: {
        cacheName: 'next-data',
        expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
        }
    },
    {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-image-assets',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
    },
    {
        urlPattern: /\/_next\/image\?url=.+$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'next-image',
            expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
        }
    },
    {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
];