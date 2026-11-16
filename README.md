# ⚡ Calisthenics & Postura Pro

Aplicativo mobile-first para acompanhamento de treinos de calistenia, adaptação neuromuscular e alívio da dor lombar para pessoas que trabalham muitas horas sentadas.

---

## 🎯 Funcionalidades

- **Protocolo de Calistenia Iniciante (4 semanas / 28 dias):**
  - Flexão Inclinada (*Push-up Inclinado*)
  - Toque nos Ombros (*Shoulder Tap*)
  - Canoinha Adaptada (*Hollow Hold*)
  - Agachamento Livre (*Air Squat*)
- **Módulo de Proteção Lombar & Alívio Postural:**
  - Ponte de Glúteos (*Glute Bridge*) — Reativa glúteos e descomprime a lombar
  - Perdigueiro (*Bird Dog*) — Estabiliza o abdômen profundo e a coluna sem compressão discal
- **Player de Treino ao Vivo (Estilo Studio/Poster):**
  - Cronômetro em tela cheia com números gigantes
  - Controle de séries, repetições e descanso
  - Bipes sonoros sintetizados (Web Audio API)
  - Vídeos do YouTube incorporados no player
  - Efeito comemorativo de confetes ao finalizar
- **Frequência & Calendário de 28 Dias:**
  - Roadmap visual do ciclo de adaptação anatômica
  - Contador de dias seguidos (*Streak*)
  - Registro de sessões no histórico
- **Mapa Muscular Anatômico Interativo (SVG):**
  - Silhueta do corpo humano com visão Frente e Costas destacando os músculos recrutados
- **Criador de Treinos Customizados:**
  - Crie e adicione novos treinos (Musculação, HIIT, Funcional, Corrida) com links do YouTube
- **Ícones Oficiais Lucide:**
  - Interface moderna com o pacote `@lucide/react` e tema Dark com acentos Verde Neon (`#d2fd39`)

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/icons/)
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- LocalStorage para persistência de dados offline

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```
