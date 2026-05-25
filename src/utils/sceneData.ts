// ── Tipos ──────────────────────────────────────────────────────────────────────

export interface Choice {
  text: string;
  next: number | null;
  reaction: 'aborrecida' | 'ainda' | 'brava' | 'hehe' | 'que';
}

export interface Dialogue {
  id: number;
  speaker: 'player' | 'fernanda' | 'narrador';
  text: string;
  next?: number | null;
  choices?: Choice[];
}

// ── Diálogos — baseados no texto_dialogo.txt ───────────────────────────────────
//
// Convenção:
//   speaker: 'player'   → Bruno fala, botão "Próximo" aparece
//   speaker: 'fernanda' → choices aparecem, dialbox mostra "..."
//

export const dialogues: Dialogue[] = [
  // ── 1 ─ Bruno abre
  {
    id: 1,
    speaker: 'player',
    text: 'Fala fernanda, eu de novo!',
    next: 2,
  },

  // ── 2 ─ Fernanda: Oi... / Oii
  {
    id: 2,
    speaker: 'fernanda',
    text: '',
    choices: [
      { text: 'Oi...', next: 3, reaction: 'aborrecida' },
      { text: 'Oii', next: 3, reaction: 'hehe' },
    ],
  },

  // ── 3 ─ Bruno explica o silêncio
  {
    id: 3,
    speaker: 'player',
    text: 'Estou aqui porque não entendi se o silêncio era desafio ou um nunca mais fale comigo e desapareça, então segui a opção mais dahora.',
    next: 4,
  },

  // ── 4 ─ Fernanda: entendeu / talvez
  {
    id: 4,
    speaker: 'fernanda',
    text: '',
    choices: [
      { text: 'entendeu errado...', next: 5, reaction: 'brava' },
      { text: 'talvez esteja certo...', next: 5, reaction: 'ainda' },
    ],
  },

  // ── 5 ─ Bruno: La La Land
  {
    id: 5,
    speaker: 'player',
    text: '"Eu podia só ter desistido, mas isso seria tipo abandonar um filme no começo porque ele parecia meio chato.\nEu prefiro terminar de ver, mesmo que o final seja um La La Land da vida"',
    next: 6,
  },

  // ── 6 ─ Fernanda: La La Land choices
  {
    id: 6,
    speaker: 'fernanda',
    text: '',
    choices: [
      { text: 'Nunca assisti', next: 7, reaction: 'que' },
      { text: 'Terminei de assistir também', next: 7, reaction: 'hehe' },
    ],
  },

  // ── 7 ─ Bruno: velas de aniversário
  {
    id: 7,
    speaker: 'player',
    text: 'Eu já assoprei umas 3 velas de aniversários que não eram meu nesse mês só pra aumentar minhas chances.',
    next: 8,
  },

  // ── 8 ─ Bruno: lista de 31 ideias
  {
    id: 8,
    speaker: 'player',
    text: '"E toda ideia nova que eu tenho eu adiciono em uma lista.\nContei 31 até agora."',
    next: 9,
  },

  // ── 9 ─ Bruno: mas nenhuma importa
  {
    id: 9,
    speaker: 'player',
    text: '"Mas nenhuma delas importa se isso te deixa desconfortável."',
    next: 10,
  },

  // ── 10 ─ Bruno: flores foram demais
  {
    id: 10,
    speaker: 'player',
    text: 'Parando pra pensar nisso as flores acho que foram demais (mesmo sendo meio que uma forma de devolver seu dinheiro?). Errei fui mlk.',
    next: 11,
  },

  // ── 11 ─ Bruno: site e roda gigante
  {
    id: 11,
    speaker: 'player',
    text: 'Flores você já ganhou e vai ganhar muitas ainda, mas acho que um "site" e se pendurar em uma roda gigante não fizeram ainda.',
    next: 12,
  },

  // ── 12 ─ Fernanda: roda gigante choices
  {
    id: 12,
    speaker: 'fernanda',
    text: '',
    choices: [
      { text: 'já fizeram tudo isso', next: 13, reaction: 'aborrecida' },
      { text: 'roda gigante?', next: 13, reaction: 'que' },
    ],
  },

  // ── 13 ─ Bruno: azul / verde (fala final)
  {
    id: 13,
    speaker: 'player',
    text: 'Mas como disse, se voce gosta de verde, posso ser o azul mais legal que não vai adiantar nada.\nE aí?\nContinuo tentando acertar o tom de azul ou sua cor preferida é verde?',
    next: 14,
  },

  // ── 14 ─ Fernanda: escolha final
  {
    id: 14,
    speaker: 'fernanda',
    text: '',
    choices: [
      { text: 'Minha cor preferida é verde.', next: null, reaction: 'que' },
      { text: 'Ainda nao chegou no meu tom de azul.', next: null, reaction: 'hehe' },
    ],
  },
];

// ── Legados (mantidos para não quebrar imports antigos) ──────────────────────
/** @deprecated — use `dialogues` */
export type ChoiceOption = Choice;
/** @deprecated — use `dialogues` */
export type DialogueLine = { speaker: string; text: string };
/** @deprecated — use `dialogues` */
export type SceneDefinition = { location: string; lines: DialogueLine[]; choices?: Choice[] };
/** @deprecated */
export const scenes: SceneDefinition[] = [];
