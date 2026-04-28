// Central place to swap AI models. Change the value here and it propagates
// to every route that uses it — no hunting across files.

// Primary model used for chord generation and variations.
export const CHORD_MODEL = "anthropic/claude-3.5-haiku"

// Fallback model if the primary is unavailable or rate-limited.
// Cheaper and faster, used as a safety net only.
export const FALLBACK_MODEL = "anthropic/claude-3-haiku"

// OpenRouter base URL. All requests go through this endpoint.
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
