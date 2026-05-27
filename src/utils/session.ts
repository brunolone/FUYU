// ── Tipos ──────────────────────────────────────────────────────────────────────

export interface SessionReport {
  choices: string[];
  ending: string;
  easterEggsFound: string[];
  totalTime: number;
  friendship: number;
  savedAt: string;
}

// ── Cria o relatório da sessão ─────────────────────────────────────────────────

export function createSessionReport(
  gameState: {
    choices: string[];
    ending: string;
    easterEggsFound: string[];
    friendship: number;
  },
  totalTime: number,
): SessionReport {
  return {
    choices: gameState.choices,
    ending: gameState.ending,
    easterEggsFound: gameState.easterEggsFound,
    friendship: gameState.friendship,
    totalTime: Math.round(totalTime / 1000),
    savedAt: new Date().toISOString(),
  };
}

// ── Salva a sessão ─────────────────────────────────────────────────────────────
//
// Atualmente salva apenas em localStorage (frontend puro).
// Para integrar com Supabase futuramente, substitua o corpo desta função:
//
//   const { error } = await supabase.from('sessions').insert(report);
//   if (error) throw error;
//

export async function saveSession(report: SessionReport): Promise<void> {
  try {
    localStorage.setItem('fuyu-session-report', JSON.stringify(report));
  } catch (error) {
    // localStorage indisponível (modo privado ou storage cheio) — ignora silenciosamente
    console.warn('[FUYU] Não foi possível salvar sessão no localStorage:', error);
  }
}

// ── Recupera a última sessão salva ─────────────────────────────────────────────

export function loadSession(): SessionReport | null {
  try {
    const raw = localStorage.getItem('fuyu-session-report');
    return raw ? (JSON.parse(raw) as SessionReport) : null;
  } catch {
    return null;
  }
}
