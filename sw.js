const CACHE_VERSION = "coachos-v8";
const CRITICAL_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./planner-data.js",
  "./app.js",
  "./manifest.json",
  "./offline.html"
];
const OPTIONAL_SHELL = [
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png"
];
const NETWORK_FIRST_FILES = new Set([
  "app.js",
  "data.js",
  "planner-data.js",
  "styles.css",
  "index.html"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CRITICAL_SHELL)
        .then(() => Promise.allSettled(
          OPTIONAL_SHELL.map((file) => cache.add(file))
        )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("coachos-") && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  const fileName = url.pathname.split("/").pop() || "index.html";
  const useNetworkFirst = request.mode === "navigate"
    || NETWORK_FIRST_FILES.has(fileName);

  event.respondWith(useNetworkFirst
    ? networkFirst(request)
    : cacheFirst(request));
});

async function cacheResponse(request, response) {
  if (!response || !response.ok) return;

  try {
    const cache = await caches.open(CACHE_VERSION);
    await cache.put(request, response.clone());
  } catch (error) {
    console.warn("Bestand kon niet worden bijgewerkt in de cache.", error);
  }
}

async function getCachedFallback(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  if (request.mode === "navigate") {
    return caches.match("./offline.html");
  }

  if (request.destination === "image") {
    return caches.match("./icons/icon-192.png");
  }

  return new Response(
    "Dit onderdeel is offline niet beschikbaar.",
    {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    }
  );
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    await cacheResponse(request, response);
    return response;
  } catch (error) {
    return getCachedFallback(request);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    await cacheResponse(request, response);
    return response;
  } catch (error) {
    return getCachedFallback(request);
  }
}
