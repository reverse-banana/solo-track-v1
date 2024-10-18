export interface DailyEntryStatic {
  date: string;
  restTime?: string;
  wakeUpTime?: string;
  sleepDuration?: number;
  sleepQuality?: number;
  feelingAfterWakeUp?: number;
  physicalEnergy?: number;
  mentalEnergy?: number;
  emotionalEnergy?: number;
  mood?: number;
  discipline?: number;
  courage?: number;
  temperance?: number;
  wisdom?: number;
  productivity?: number;
  water?: number;
  holotropicalBreathing?: number;
  coldShower?: number;
  meditation?: number;
  stretch?: number;
  workout?: number;
  reading?: number;
  web3?: number;
  musicPlaying?: number;
  timeTrack?: number;
}

// Function to create a new DailyEntryStatic with default values
export function createDailyEntryStatic(): DailyEntryStatic {
  return {
    date: new Date().toISOString(), // Default to current date
    restTime: "00:00",
    wakeUpTime: "00:00",
    sleepDuration: 0,
    sleepQuality: 0,
    feelingAfterWakeUp: 0,
    physicalEnergy: 0,
    mentalEnergy: 0,
    emotionalEnergy: 0,
    mood: 0,
    discipline: 0,
    courage: 0,
    temperance: 0,
    wisdom: 0,
    productivity: 0,
    water: 0,
    holotropicalBreathing: 0,
    coldShower: 0,
    meditation: 0,
    stretch: 0,
    workout: 0,
    reading: 0,
    web3: 0,
    musicPlaying: 0,
    timeTrack: 0,
  };
}
