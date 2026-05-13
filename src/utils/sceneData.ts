export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  hint: string;
  friendshipDelta: number;
  easterEgg?: string;
  ending?: string;
}

export interface SceneDefinition {
  location: string;
  lines: DialogueLine[];
  choices?: ChoiceOption[];
}

export const scenes: SceneDefinition[] = [
  {
    location: 'Rua silenciosa ao entardecer',
    lines: [
      { speaker: 'Narrador', text: 'O calor dourado abraça o asfalto molhado. O tempo parece suspenso.' },
      { speaker: 'Akari', text: 'A brisa carrega o cheiro distante de folhas secas e memórias esquecidas.' },
      { speaker: 'Haru', text: 'É curioso como o fim da tarde faz tudo parecer uma história que ainda não terminei.' }
    ],
    choices: [
      {
        id: 'sorriso',
        text: 'Sorrir enquanto observa o sol baixo',
        hint: 'Deixa a cena mais leve e calorosa.',
        friendshipDelta: 1,
        ending: 'suave'
      },
      {
        id: 'silencio',
        text: 'Ficar em silêncio e absorver o momento',
        hint: 'A escolha mais contemplativa.',
        friendshipDelta: 0,
        ending: 'tranquilo'
      }
    ]
  },
  {
    location: 'Ponto de encontro de verão',
    lines: [
      { speaker: 'Haru', text: 'Lembra quando a cidade era menor e o tempo parecia infinito?' },
      { speaker: 'Akari', text: 'Ainda sinto o peso suave desses finais de tarde no peito.' }
    ],
    choices: [
      {
        id: 'confissao',
        text: 'Contar uma lembrança secreta',
        hint: 'Aumenta a conexão com o outro personagem.',
        friendshipDelta: 2,
        ending: ' íntimo'
      },
      {
        id: 'olhar',
        text: 'Olhar para o céu e deixar as palavras ficarem no vento',
        hint: 'Preserva a nostalgia silenciosa.',
        friendshipDelta: 0,
        easterEgg: 'vento'
      }
    ]
  },
  {
    location: 'Memória registrada',
    lines: [
      { speaker: 'Narrador', text: 'O relatório agora guarda o ritmo daquela tarde.' },
      { speaker: 'Narrador', text: 'Cada escolha é uma memória viva que permanece em silêncio.' }
    ]
  }
];
