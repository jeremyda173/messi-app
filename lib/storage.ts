import type { Match, FamilyMember } from "./types"

const MATCHES_KEY = "messi-matches"
const FAMILY_KEY = "messi-family"

export const storage = {
  // Matches
  getMatches: (): Match[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(MATCHES_KEY)
    return data ? JSON.parse(data) : []
  },

  saveMatches: (matches: Match[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(MATCHES_KEY, JSON.stringify(matches))
  },

  // Family
  getFamily: (): FamilyMember[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(FAMILY_KEY)
    return data ? JSON.parse(data) : []
  },

  saveFamily: (family: FamilyMember[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(FAMILY_KEY, JSON.stringify(family))
  },

  // Export/Import
  exportData: () => {
    const matches = storage.getMatches()
    const family = storage.getFamily()
    return {
      matches,
      family,
      exportDate: new Date().toISOString(),
    }
  },

  importData: (data: { matches?: Match[]; family?: FamilyMember[] }) => {
    if (data.matches) storage.saveMatches(data.matches)
    if (data.family) storage.saveFamily(data.family)
  },
}
