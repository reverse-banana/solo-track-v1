// src/models/WellnessEntry.ts

export interface DailyEntryStatic {
  restTime: string;                // Time of rest
  wakeUpTime: string;              // Time of waking up
  sleepDuration: number;           // Duration of sleep in hours
  sleepQuality: number;            // Sleep quality rating (e.g., 0-100)
  feelingAfterWakeUp: number;      // Description of how you feel after waking up
  physicalEnergy: number;          // Physical energy level (e.g., 0-100)
  mentalEnergy: number;            // Mental energy level (e.g., 0-100)
  emotionalEnergy: number;         // Emotional energy level (e.g., 0-100)
  mood: number;                    // Mood rating (e.g., 1-10)
  discipline: number;              // Discipline rating (e.g., "0" to "100")
  courage: number;                 // Courage rating (e.g., 0-100)
  temperance: number;              // Temperance rating (e.g., "0" to "100")
  wisdom: number;                  // Wisdom rating (e.g., "0" to "100")
  productivity: number;            // Productivity rating (e.g., 0-100)
  water: number;                   // Water intake (e.g., litres in decimals)
  holotropicalBreathing: number;   // Holotropic breathing sessions
  coldShower: number;              // Cold shower sessions
  meditation: number;              // Meditation sessions
  stretch: number;                 // Stretching sessions
  workout: number;                 // Workout sessions
  reading: number;                 // Reading sessions
  web3: number;                   // Web3 learning sessions
  musicPlaying: number;            // Glucophone practice sessions
  timeTrack: number;               // Time tracking (e.g., 1 for tracked, 0 for not tracked)
}

// Function to create a new WellnessEntry with default values
export function createDailyEntryStatic(): DailyEntryStatic {
  return {
      restTime: "00:00",                // Default time
      wakeUpTime: "00:00",              // Default time
      sleepDuration: 0,                  // Default value
      sleepQuality: 0,                   // Default value
      feelingAfterWakeUp: 0,            // Default empty string
      physicalEnergy: 0,                 // Default value
      mentalEnergy: 0,                   // Default value
      emotionalEnergy: 0,                // Default value
      mood: 0,                           // Default value
      discipline: 0,                   // Default string
      courage: 0,                      // Default string
      temperance: 0,                   // Default string
      wisdom: 0,                       // Default string
      productivity: 0,                   // Default value
      water: 0,                          // Default value
      holotropicalBreathing: 0,          // Default value
      coldShower: 0,                     // Default value
      meditation: 0,                     // Default value
      stretch: 0,                        // Default value
      workout: 0,                        // Default value
      reading: 0,                        // Default value
      web3: 0,                           // Default value
      musicPlaying: 0,                   // Default value
      timeTrack: 0                        // Default value
  };
}