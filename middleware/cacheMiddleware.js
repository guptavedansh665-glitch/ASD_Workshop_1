const CACHE_TTL_MS = 60 * 1000; // 1 minute TTL
const cache = new Map();

function cacheMiddleware(req, res, next) {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedEntry = cache.get(key);
    const now = Date.now();

    if (cachedEntry && (now - cachedEntry.timestamp < CACHE_TTL_MS)) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cachedEntry.data);
    }

    // Cache MISS or Expired entry
    res.setHeader('X-Cache', 'MISS');

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, {
                data: body,
                timestamp: Date.now()
            });
        }
        return originalJson(body);
    };

    next();
}

function invalidateCache() {
    cache.clear();
}

module.exports = {
    cacheMiddleware,
    invalidateCache
};
