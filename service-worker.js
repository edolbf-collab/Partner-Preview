const CACHE = "tamo-on-partners-preview-0.1.16";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config.preview.js",
  "./asaas-sandbox.js",
  "./manifest.webmanifest",
  "./assets/preview-icon.svg",
  "./assets/venues/arena-central.svg",
  "./assets/venues/arena-central-fachada.png",
  "./assets/venues/cancha-horizonte.svg",
  "./assets/venues/vale-verde.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
