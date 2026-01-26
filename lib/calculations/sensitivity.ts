export interface GameProfile {
    id: string;
    name: string;
    yaw: number; // The 'yaw' value per degree or a factor relative to a base
}

// Using Source Engine (CS:GO, Apex, etc.) as the base (Yaw 0.022)
// Factor = GameYaw / BaseYaw
// But simpler: To convert A -> B: SensB = SensA * (YawA / YawB)

export const games: GameProfile[] = [
    { id: 'cs2', name: 'Counter-Strike 2', yaw: 0.022 },
    { id: 'apex', name: 'Apex Legends', yaw: 0.022 },
    { id: 'valorant', name: 'Valorant', yaw: 0.07 }, // 0.022 * 3.18... approx 0.07
    { id: 'overwatch2', name: 'Overwatch 2', yaw: 0.0066 },
    { id: 'fortnite', name: 'Fortnite (Slider)', yaw: 0.5555 }, // Very rough approximation as fortnite controls vary
    { id: 'cod', name: 'Call of Duty: MW/Warzone', yaw: 0.0066 }, // Legacy/Standard
];

export function convertSensitivity(
    amount: number,
    sourceGameId: string,
    targetGameId: string,
    sourceDpi: number = 800,
    targetDpi: number = 800
): string {
    if (isNaN(amount)) return '';

    const sourceGame = games.find(g => g.id === sourceGameId);
    const targetGame = games.find(g => g.id === targetGameId);

    if (!sourceGame || !targetGame) return '';

    // Calculate True Sensitivity (e.g. degrees per count, roughly)
    // or just equate the physical turn distance.
    // Physical Turn = (360 / (Sens * Yaw * DPI or something))
    // Equating eDPI-like metric if DPI is involves:
    // (SensA * YawA) is proportional to degrees moved per mouse count? 
    // Actually: Degrees = Counts * Sens * Yaw.
    // To match 360 distance:
    // CountsA * SensA * YawA = 360
    // CountsB * SensB * YawB = 360
    // If we move mouse same physical distance (same counts if DPI same):
    // SensA * YawA = SensB * YawB
    // SensB = SensA * (YawA / YawB)

    // If DPI changes:
    // Physical Distance = Counts / DPI
    // Degrees = (Distance * DPI) * Sens * Yaw
    // To keep Degrees/Distance constant (cm/360 constant):
    // DPI_A * SensA * YawA = DPI_B * SensB * YawB
    // SensB = (DPI_A * SensA * YawA) / (DPI_B * YawB)

    const result = (sourceDpi * amount * sourceGame.yaw) / (targetDpi * targetGame.yaw);

    return result.toFixed(3);
}
