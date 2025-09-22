// src/lib/fetchWithFallback.js
export async function fetchWithFallback(url, fallback=null, opts={}) {
  try {
    const res = await fetch(url, opts)
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch (err) {
    return fallback
  }
}
