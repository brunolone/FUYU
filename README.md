# FUYU

FUYU é uma experiência narrativa web inspirada na atmosfera de jogos como Boku no Natsuyasumi, visual novels retrô japonesas e memórias de verão.

## Visão geral do MVP

- Front-end: React + Vite + Tailwind CSS
- Animação: GSAP para parallax suave, breathing effects e transições cinematográficas
- Arquitetura: cenas, diálogos, escolhas e histórico de sessão
- Meta do MVP: cena única com background animado, dois personagens, diálogo, escolhas e relatório final salvo

## Estrutura do projeto

- `src/assets/` — imagens, sprites e recursos visuais
- `src/backgrounds/` — layouts de background
- `src/characters/` — personagens e sprites
- `src/audio/` — arquivos de ambiência e música
- `src/animations/` — animações reutilizáveis e timelines
- `src/components/` — componentes de interface e renderização de cena
- `src/dialogue/` — dados e scripts de diálogo
- `src/scenes/` — definição de cenas e transições
- `src/state/` — modelo de estado do jogo
- `src/hooks/` — lógica de estado compartilhada
- `src/utils/` — helpers, relatórios de sessão e integração Backend
- `src/ui/` — componentes visuais de camada de UI

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:4173` no navegador.

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a versão de produção
- `npm run preview` — pré-visualiza o build gerado

## Backend recomendado

A camada de backend será usada apenas para salvar sessões e relatórios de escolhas. A primeira proposta é um backend Django simples com API REST ou Supabase.

## Próximos passos imediatos

1. adicionar assets visuais de cena e personagens
2. criar a camada de áudio ambiente (vento, cigarras, pássaros)
3. desenvolver a cena principal como uma experiência interativa única
4. implementar o endpoint de sessão no backend para persistência real
5. ajustar a UI para reforçar a estética retrô e contemplativa

## Arquivo de dependências do backend

O `requirements.txt` já lista:

- Django
- djangorestframework
- django-cors-headers
- python-dotenv
- psycopg2-binary
- gunicorn
