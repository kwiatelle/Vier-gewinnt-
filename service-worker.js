// Service Worker für Vier gewinnt PWA
// Version: 1.0.0

const CACHE_NAME = 'vier-gewinnt-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './images/icon-72.png',
    './images/icon-96.png',
    './images/icon-128.png',
    './images/icon-144.png',
    './images/icon-152.png',
    './images/icon-192.png',
    './images/icon-384.png',
    './images/icon-512.png'
];

// Service Worker installieren
self.addEventListener('install', (event) => {
    console.log('[SW] Installiere Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cache wird gefüllt...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[SW] Alle Ressourcen gecached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Fehler beim Cachen:', error);
            })
    );
});

// Service Worker aktivieren
self.addEventListener('activate', (event) => {
    console.log('[SW] Aktiviere Service Worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Lösche alten Cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service Worker aktiv');
            return self.clients.claim();
        })
    );
});

// Fetch Events - Cache-First Strategie
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache Hit - Ressource aus Cache laden
                if (response) {
                    return response;
                }

                // Cache Miss - vom Netz laden
                return fetch(event.request).then((response) => {
                    // Nur gültige Responses cachen
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Response klonen (kann nur einmal gelesen werden)
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Fallback für offline (z.B. Offline-Seite)
                console.log('[SW] Fetch fehlgeschlagen, keine Netzverbindung');
            })
    );
});

// Hintergrund-Sync für zukünftige Features
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-scores') {
        console.log('[SW] Synchronisiere Spielstände...');
        // Hier könnten Spielstände synchronisiert werden
    }
});

// Push-Benachrichtigungen (optional)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Neue Herausforderung beim Vier gewinnt!',
        icon: './images/icon-192.png',
        badge: './images/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'play', title: 'Spielen!' },
            { action: 'close', title: 'Später' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Vier gewinnt', options)
    );
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'play') {
        event.waitUntil(
            clients.openWindow('./index.html')
        );
    }
});

console.log('[SW] Service Worker geladen');
