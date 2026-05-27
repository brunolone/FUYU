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

// ── Salva a sessão no localStorage ────────────────────────────────────────────

export async function saveSession(report: SessionReport): Promise<void> {
  try {
    localStorage.setItem('fuyu-session-report', JSON.stringify(report));
  } catch (error) {
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

// ── Salva a resposta final no Supabase ────────────────────────────────────────

export interface FinalResponse {
  escolha_final: string;
  todas_escolhas: { dialogueId: number; choiceText: string }[];
}

export async function saveFinalResponse(data: FinalResponse): Promise<void> {
  try {
    const { supabase } = await import('./supabase');
    const { error } = await supabase.from('responses').insert({
      final_state: data.escolha_final,
      choices:     data.todas_escolhas,
    });

    if (error) {
      console.warn('[FUYU] Supabase insert error:', error.message);
      localStorage.setItem('fuyu-pending-response', JSON.stringify(data));
    }
  } catch (err) {
    console.warn('[FUYU] Falha ao conectar ao Supabase:', err);
    localStorage.setItem('fuyu-pending-response', JSON.stringify(data));
  }
}

