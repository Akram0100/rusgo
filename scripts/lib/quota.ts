// Reading quota errors from the voice services (used by scripts/generate-audio.ts).

/** The service says "too many requests" (HTTP 429 / RESOURCE_EXHAUSTED). */
export const isQuotaError = (error: unknown): boolean =>
  /429|RESOURCE_EXHAUSTED|Quota exceeded|rate-limit/i.test(String(error));

/**
 * A daily quota (the free Gemini tier has one) will not come back within this run, unlike a per-minute one,
 * so waiting and retrying is pointless.
 */
export const isDailyQuota = (error: unknown): boolean =>
  isQuotaError(error) && /PerDay|per day|per_day|daily/i.test(String(error));

/** Seconds the service asked us to wait ("Please retry in 35.2s", or retryDelay: "35s"), when it said. */
export const retryAfterSeconds = (error: unknown): number | null => {
  const match = /retry in ([\d.]+)\s*s|"?retryDelay"?\s*:\s*"([\d.]+)s"/i.exec(String(error));
  const seconds = Number(match?.[1] ?? match?.[2]);
  return match && Number.isFinite(seconds) ? seconds : null;
};
