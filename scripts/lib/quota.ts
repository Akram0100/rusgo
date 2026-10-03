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

/**
 * A short, readable account of a quota error: which limit was hit and, when the service says, when it resets.
 * Gemini's own message is a screenful of JSON and links.
 */
export const describeQuota = (error: unknown): string => {
  const text = String(error);
  const metric = /Quota exceeded for metric: [^,\s]*?\/([a-z_]+),\s*limit:\s*(\d+)(?:,\s*model:\s*([\w.-]+))?/i.exec(text);
  const retry = /Please retry in ([0-9hms.]+?)\.?(?:"|\s|$)/i.exec(text);

  const parts: string[] = [];
  if (metric) parts.push(`limit ${metric[2]} (${metric[1].replace(/_/g, ' ')})${metric[3] ? ` for ${metric[3]}` : ''}`);
  if (retry) parts.push(`the service says to retry in ${retry[1].replace(/\.\d+s$/, 's')}`);
  return parts.length > 0 ? parts.join('; ') : text.replace(/\s+/g, ' ').slice(0, 200);
};

/** Seconds the service asked us to wait ("Please retry in 35.2s", or retryDelay: "35s"), when it said. */
export const retryAfterSeconds = (error: unknown): number | null => {
  const match = /retry in ([\d.]+)\s*s|"?retryDelay"?\s*:\s*"([\d.]+)s"/i.exec(String(error));
  const seconds = Number(match?.[1] ?? match?.[2]);
  return match && Number.isFinite(seconds) ? seconds : null;
};
