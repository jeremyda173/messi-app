
interface PlayerStats {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
  seasons: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number | null;
      position: string;
      rating: string;
      captain: boolean;
    };
    substitutes: {
      in: number;
      out: number;
      bench: number;
    };
    shots: {
      total: number;
      on: number;
    };
    goals: {
      total: number;
      conceded: number | null;
      assists: number;
      saves: number | null;
    };
    passes: {
      total: number;
      key: number;
      accuracy: number;
    };
    tackles: {
      total: number;
      blocks: number;
      interceptions: number;
    };
    duels: {
      total: number;
      won: number;
    };
    dribbles: {
      attempts: number;
      success: number;
      past: number | null;
    };
    fouls: {
      drawn: number;
      committed: number;
    };
    cards: {
      yellow: number;
      yellowred: number;
      red: number;
    };
    penalty: {
      won: number;
      commited: number | null;
      scored: number;
      missed: number;
      saved: number | null;
    };
  }[];
}

const API_KEY = "60637de7b0msha761796c36322d9p179d47jsndef1a24da439"; // Provided API Key
const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";
const HOST = "api-football-v1.p.rapidapi.com";

// Messi's Player ID in API-Football is 154
const MESSI_ID = 154;

/**
 * Fetches Lionel Messi's player statistics for a given season.
 * @param season The season year (e.g., 2023, 2024)
 * @returns Player statistics data
 */
export async function getMessiStats(season: number = 2023) {
  try {
    const response = await fetch(`${BASE_URL}/players?id=${MESSI_ID}&season=${season}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response[0] as PlayerStats;
  } catch (error) {
    console.error("Failed to fetch Messi stats:", error);
    return null;
  }
}

/**
 * Fetches Lionel Messi's recent matches.
 * Note: This endpoint might require a different subscription level or parameters depending on the specific API plan.
 * We'll try to fetch the fixtures where player ID 154 is involved if the API supports it, 
 * or default to fetching fixtures for Inter Miami (ID 9568) where he currently plays.
 */
export async function getMessiMatches(season: number = 2024, teamId: number = 9568) { 
    // Inter Miami ID: 9568
    // Argentina ID: 26
    
    // Fetch last 5 matches for Inter Miami
    try {
        const response = await fetch(`${BASE_URL}/fixtures?season=${season}&team=${teamId}&last=5`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": HOST,
            },
        });

        if (!response.ok) {
             throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Failed to fetch matches:", error);
        return [];
    }
}
