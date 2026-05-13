export interface SessionReport {
  choices: string[];
  ending: string;
  easterEggsFound: string[];
  totalTime: number;
  friendship: number;
  savedAt: string;
}

export function createSessionReport(gameState: { choices: string[]; ending: string; easterEggsFound: string[]; friendship: number }, totalTime: number): SessionReport {
  return {
    choices: gameState.choices,
    ending: gameState.ending,
    easterEggsFound: gameState.easterEggsFound,
    friendship: gameState.friendship,
    totalTime: Math.round(totalTime / 1000),
    savedAt: new Date().toISOString()
  };
}

export async function saveSession(report: SessionReport) {
  try {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (!response.ok) {
      throw new Error(`Falha ao salvar sessão: ${response.status}`);
    }
  } catch (error) {
    localStorage.setItem('fuyu-session-report', JSON.stringify(report));
  }
}
