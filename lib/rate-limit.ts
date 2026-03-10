/**
 * In-memory rate limiter for API routes.
 * Uses a sliding window per IP address.
 *
 * For production at scale, replace with Upstash Redis (@upstash/ratelimit).
 * This is sufficient for Vercel serverless with low-to-moderate traffic.
 */

interface RateLimitConfig {
  interval: number; // Window in milliseconds
  limit: number;    // Max requests per window
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

export function rateLimit(config: RateLimitConfig) {
  const storeKey = `${config.interval}-${config.limit}`;
  if (!stores.has(storeKey)) {
    stores.set(storeKey, new Map());
  }
  const store = stores.get(storeKey)!;

  // Periodically clean expired entries
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }, config.interval).unref?.();

  return {
    check(identifier: string): { success: boolean; remaining: number } {
      const now = Date.now();
      const entry = store.get(identifier);

      if (!entry || now > entry.resetAt) {
        store.set(identifier, { count: 1, resetAt: now + config.interval });
        return { success: true, remaining: config.limit - 1 };
      }

      if (entry.count >= config.limit) {
        return { success: false, remaining: 0 };
      }

      entry.count++;
      return { success: true, remaining: config.limit - entry.count };
    },
  };
}
