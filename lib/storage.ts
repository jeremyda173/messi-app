import type { Match, FamilyMember } from "./types"

const MATCHES_KEY = "messi-matches-v2"
const FAMILY_KEY = "messi-family"

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined"

function safeGet<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function safeSet<T>(key: string, value: T) {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
  }
}

export const storage = {
  getMatches(): Match[] {
    return safeGet<Match[]>(MATCHES_KEY, [])
  },
  saveMatches(matches: Match[]) {
    safeSet(MATCHES_KEY, matches)
  },

  getFamily(): FamilyMember[] {
    return safeGet<FamilyMember[]>(FAMILY_KEY, [])
  },
  saveFamily(family: FamilyMember[]) {
    safeSet(FAMILY_KEY, family)
  },

  // Export/Import
  exportData() {
    const matches = storage.getMatches()
    const family = storage.getFamily()
    return {
      matches,
      family,
      exportDate: new Date().toISOString(),
    }
  },
  importData(data: { matches?: Match[]; family?: FamilyMember[] }) {
    if (data.matches) storage.saveMatches(data.matches)
    if (data.family) storage.saveFamily(data.family)
  },
}
