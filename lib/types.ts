export interface Match {
  location: string
  id: string
  date: string
  competition: string
  team: string
  opponent: string
  minutes: number
  goals: number
  assists: number
  shots: number
  passes: number
  passAccuracy: number
  result: "win" | "draw" | "loss"
  teamScore?: number
  opponentScore?: number
  venue: "home" | "away"
  createdAt: string
  updatedAt: string
}

export interface FamilyMember {
  id: string
  name: string
  relationship: string
  birthDate: string
  photo?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Statistics {
  totalMatches: number
  totalGoals: number
  totalAssists: number
  totalMinutes: number
  averageGoalsPerMatch: number
  averageAssistsPerMatch: number
  winRate: number
  competitions: Record<string, number>
  clubs: Record<string, number>
}
