// src/models/WellnessEntry.ts

export interface WellnessEntry {
    restTime: string;                // Time of rest
    wakeUpTime: string;              // Time of waking up
    sleepDuration: number;           // Duration of sleep in hours
    sleepQuality: number;            // Sleep quality rating (e.g., 0-100)
    feelingAfterWakeUp: string;      // Description of how you feel after waking up
    physicalEnergy: number;          // Physical energy level (e.g., 0-100)
    mentalEnergy: number;            // Mental energy level (e.g., 0-100)
    emotionalEnergy: number;         // Emotional energy level (e.g., 0-100)
    mood: number;                    // Mood rating (e.g., 1-10)
    discipline: string;              // Discipline rating (e.g., "0" to "100")
    courage: string;                 // Courage rating (e.g., 0-100)
    temperance: string;              // Temperance rating (e.g., "0" to "100")
    wisdom: string;                  // Wisdom rating (e.g., "0" to "100")
    productivity: number;            // Productivity rating (e.g., 0-100)
    water: number;                   // Water intake (e.g.,litres in decimals)
    holotropicalBreathing: number;   // Holotropic breathing sessions
    coldShower: number;              // Cold shower sessions
    meditation: number;              // Meditation sessions
    stretch: number;                 // Stretching sessions
    workout: number;                 // Workout sessions
    reading: number;                 // Reading sessions
    web3: number;                   // Web3 learning sessions
    musicPlaying: number;              // Glucophone practice sessions
    timeTrack: number;               // Time tracking (e.g., 1 for tracked, 0 for not tracked)
  }