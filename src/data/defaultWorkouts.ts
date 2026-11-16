import { WorkoutProgram, Exercise } from '../types/workout';

export const EXERCISE_GLUTE_BRIDGE: Exercise = {
  id: 'glute-bridge',
  name: 'Ponte de Glúteos',
  alias: 'Glute Bridge (Descompressão Lombar)',
  targetMuscles: ['glutes', 'core', 'legs'],
  videoUrl: 'http://www.youtube.com/watch?v=6jS6aH-78w4',
  youtubeId: '6jS6aH-78w4',
  defaultSets: 3,
  repsOrDuration: '12 a 15 repetições',
  type: 'reps',
  restSeconds: 45,
  instructions: [
    'Deite de barriga para cima, joelhos dobrados e pés apoiados no chão na largura do quadril.',
    'Contraia o abdômen e empurre o chão com os calcanhares, subindo o quadril até alinhar joelhos, quadril e ombros.',
    'Aperte bem os glúteos no topo por 2 segundos e desça devagar, encostando vértebra por vértebra.',
    'Evite jogar a barriga para cima arqueando a lombar: o movimento termina no alinhamento reto do tronco.'
  ],
  executionTips: [
    'Por que funciona: Acorda os glúteos "adormecidos" e descomprime a parte baixa das costas, devolvendo o suporte natural do quadril.',
    'Segure 2 segundos na contração máxima no topo.',
    'Regra de segurança: O trabalho deve ser sentido nos glúteos e abdômen, nunca como compressão na coluna.'
  ]
};

export const EXERCISE_BIRD_DOG: Exercise = {
  id: 'bird-dog',
  name: 'Perdigueiro',
  alias: 'Bird Dog (Estabilidade da Coluna)',
  targetMuscles: ['core', 'back', 'glutes', 'shoulders'],
  videoUrl: 'http://www.youtube.com/watch?v=AYRMIKnbc8A',
  youtubeId: 'AYRMIKnbc8A',
  defaultSets: 3,
  repsOrDuration: '12 a 16 reps (6-8 cada lado)',
  type: 'reps',
  restSeconds: 45,
  instructions: [
    'Fique em posição de quatro apoios (mãos alinhadas abaixo dos ombros e joelhos abaixo do quadril).',
    'Estenda simultaneamente o braço direito à frente e a perna esquerda para trás, sem deixar o tronco tombar ou a lombar afundar.',
    'Segure 2 segundos no topo em linha reta com controle e retorne à posição inicial.',
    'Alterne os lados (braço esquerdo e perna direita) mantendo a estabilidade firme.'
  ],
  executionTips: [
    'Por que funciona: Treina os músculos estabilizadores profundos da coluna e do core sem colocar peso ou compressão sobre os discos vertebrais.',
    'Imagine uma bandeja de copos cheios apoiada na sua lombar que não pode virar.',
    'Busque comprimento (alcançar longe com a mão e o pé) em vez de altura exagerada.'
  ]
};

export const DEFAULT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'calistenia-fase-1',
    title: 'Calistenia Completa + Proteção Lombar',
    category: 'Calistenia',
    level: 'Iniciante',
    durationDays: 28, // 4 Semanas
    recommendedFrequency: '3x a 4x por semana (dias alternados)',
    frequencyPerWeek: 3,
    estimatedTimeMinutes: 20,
    badge: 'Rotina Completa Oficial',
    description: 'Protocolo de adaptação neuromuscular de 4 semanas. Desenvolve força de empurrar, ativação profunda do abdômen, potência de pernas e blindagem lombar (acordando glúteos e estabilizando a coluna).',
    scientificContext: 'Para quem passa muitas horas sentado, a dor na lombar vem de glúteos adormecidos e abdômen profundo frouxo. Esta rotina combina força básica do corpo com descompressão lombar imediata.',
    exercises: [
      {
        id: 'pushup-inclinado',
        name: 'Flexão Inclinada',
        alias: 'Push-up Inclinado',
        targetMuscles: ['chest', 'triceps', 'shoulders', 'core'],
        videoUrl: 'http://www.youtube.com/watch?v=so5nuzZWwmI',
        youtubeId: 'so5nuzZWwmI',
        defaultSets: 3,
        repsOrDuration: '8 a 12 repetições',
        type: 'reps',
        restSeconds: 45,
        instructions: [
          'Apoie as mãos na borda de uma superfície firme (mesa, bancada ou cadeira apoiada contra a parede).',
          'Mantenha o corpo em linha reta (calcanhares, quadril e ombros alinhados), sem deixar a bacia cair.',
          'Desça o peito em direção ao apoio controlando a descida e empurre de volta estendendo os braços.',
          'Dica biomecânica: Quanto mais alto o apoio, menor o esforço. Conforme for ficando fácil, reduza a altura do apoio!'
        ],
        executionTips: [
          'Cotovelos apontando a cerca de 45° do tronco (não abra em cruz a 90° para proteger os ombros).',
          'Contraia glúteos e abdômen para impedir que a lombar curve.',
          'Empurre o chão/apoio com toda a palma da mão.'
        ]
      },
      {
        id: 'shoulder-tap',
        name: 'Toque nos Ombros',
        alias: 'Shoulder Tap em Prancha',
        targetMuscles: ['shoulders', 'core', 'chest'],
        videoUrl: 'http://www.youtube.com/watch?v=3ZSopTK46bs',
        youtubeId: '3ZSopTK46bs',
        defaultSets: 3,
        repsOrDuration: '16 a 20 toques (8-10 cada lado)',
        type: 'reps',
        restSeconds: 45,
        instructions: [
          'Fique em posição de prancha alta (mãos no chão alinhadas aos ombros e pernas estendidas). Se ficar pesado no solo, faça com as mãos apoiadas na bancada/mesa.',
          'Afaste um pouco os pés para dar maior base e estabilidade.',
          'Tire uma das mãos do apoio, toque no ombro oposto e retorne devagar.',
          'O segredo é não girar o quadril nem balançar o corpo: mantenha glúteos e abdômen contraídos.'
        ],
        executionTips: [
          'Anti-rotação: imagine um copo de água equilibrado na sua lombar que não pode cair.',
          'Transfira o peso suavemente antes de tirar a mão do chão.',
          'Ritmo constante: não corra com o movimento.'
        ]
      },
      {
        id: 'hollow-hold',
        name: 'Canoinha Adaptada',
        alias: 'Hollow Hold (Variação Iniciante)',
        targetMuscles: ['core'],
        videoUrl: 'http://www.youtube.com/watch?v=9ryjFfS1WDA',
        youtubeId: '9ryjFfS1WDA',
        defaultSets: 3,
        repsOrDuration: '20 a 30 segundos',
        type: 'isometric',
        durationSeconds: 25,
        restSeconds: 45,
        instructions: [
          'Deite de costas no chão. O ponto crucial é colar toda a lombar no solo, sem deixar espaço para passar nem uma folha de papel por baixo.',
          'Variação para iniciantes (bolinha/joelhos dobrados): traga os joelhos em direção ao peito, tire levemente a cabeça e as escápulas do chão.',
          'Mantenha os braços ao lado do corpo ou cotovelos próximos aos joelhos.',
          'Segure a posição respirando de forma controlada. Só estique as pernas se a sua lombar continuar 100% encostada no chão sem dor.'
        ],
        executionTips: [
          'Retroversão pélvica: "esconda o umbigo" em direção ao chão.',
          'Respire curto sem soltar a tensão do abdômen.',
          'Se sentir desconforto no pescoço, mantenha o olhar na direção do umbigo.'
        ]
      },
      {
        id: 'air-squat',
        name: 'Agachamento Livre',
        alias: 'Air Squat (Agachamento com Peso do Corpo)',
        targetMuscles: ['legs', 'glutes', 'core'],
        videoUrl: 'http://www.youtube.com/watch?v=CaTbpJH49i4',
        youtubeId: 'CaTbpJH49i4',
        defaultSets: 3,
        repsOrDuration: '12 a 15 repetições',
        type: 'reps',
        restSeconds: 60,
        instructions: [
          'Pés afastados na largura dos ombros, pontas dos pés viradas levemente para fora.',
          'O movimento começa no quadril: projete o bumbum para trás como se fosse sentar em uma cadeira.',
          'Uma ótima dica para o primeiro dia é colocar uma cadeira real atrás de você e apenas encostar os glúteos nela antes de subir.',
          'Faça a força para subir pressionando os calcanhares contra o chão, mantendo o peito aberto e a coluna alinhada.'
        ],
        executionTips: [
          'Joelhos devem acompanhar a linha da ponta dos pés, sem entrar para dentro (valgo).',
          'Mantenha o calcanhar 100% no chão durante todo o movimento.',
          'Braços à frente do peito ajudam no equilíbrio.'
        ]
      },
      EXERCISE_GLUTE_BRIDGE,
      EXERCISE_BIRD_DOG
    ]
  },
  {
    id: 'protecao-lombar',
    title: 'Proteção Lombar & Alívio da Coluna',
    category: 'Lombar & Postura',
    level: 'Iniciante',
    durationDays: 28,
    recommendedFrequency: '3x por semana ou Pausa Ativa Diária (5 min)',
    frequencyPerWeek: 3,
    estimatedTimeMinutes: 8,
    badge: 'Alívio Postural',
    description: 'Criado especificamente para quem passa muitas horas sentado. Reativa os glúteos e estabiliza o abdômen profundo para descompactar a lombar e eliminar a rigidez ao levantar da cadeira.',
    scientificContext: 'A dor na lombar geralmente vem de glúteos "adormecidos" e falta de estabilidade no abdômen profundo, fazendo a lombar trabalhar dobrado. Esses 2 exercícios não causam compressão sobre os discos vertebrais e devolvem o suporte natural do quadril.',
    exercises: [
      EXERCISE_GLUTE_BRIDGE,
      EXERCISE_BIRD_DOG
    ]
  },
  {
    id: 'mobilidade-recuperacao',
    title: 'Mobilidade & Recuperação Articular',
    category: 'Recuperação',
    level: 'Iniciante',
    durationDays: 28,
    recommendedFrequency: 'Nos dias de descanso ou pós-treino',
    frequencyPerWeek: 3,
    estimatedTimeMinutes: 10,
    badge: 'Complementar',
    description: 'Sequência regenerativa para soltar ombros, lombar, quadris e tornozelos. Ideal para fazer nos dias entre os treinos de força.',
    exercises: [
      {
        id: 'cat-cow',
        name: 'Gato e Vaca (Cat-Cow)',
        alias: 'Mobilidade da Coluna',
        targetMuscles: ['core', 'back'],
        videoUrl: 'http://www.youtube.com/watch?v=so5nuzZWwmI',
        youtubeId: 'so5nuzZWwmI',
        defaultSets: 2,
        repsOrDuration: '10 respirações lentas',
        type: 'reps',
        restSeconds: 30,
        instructions: [
          'Em 4 apoios no chão (mãos sob os ombros e joelhos sob o quadril).',
          'Inspire arqueando a coluna e olhando para cima (posição da vaca).',
          'Expire arredondando a coluna em direção ao teto, empurrando o chão (posição do gato).'
        ],
        executionTips: ['Sincronize movimento com a respiração.']
      },
      {
        id: 'deep-squat-hold',
        name: 'Cócoras com Apoio (Deep Squat Hold)',
        alias: 'Mobilidade de Quadril e Tornozelo',
        targetMuscles: ['legs', 'glutes'],
        videoUrl: 'http://www.youtube.com/watch?v=CaTbpJH49i4',
        youtubeId: 'CaTbpJH49i4',
        defaultSets: 2,
        repsOrDuration: '30 a 45 segundos',
        type: 'isometric',
        durationSeconds: 35,
        restSeconds: 30,
        instructions: [
          'Agache profundamente segurando em uma maçaneta ou batente de porta.',
          'Mantenha os calcanhares no chão e o peito ereto.',
          'Respire e relaxe a bacia para baixo.'
        ],
        executionTips: ['Não force se houver dor no joelho, use apoio firme.']
      }
    ]
  },
  {
    id: 'calistenia-fase-2',
    title: 'Calistenia Fase 2: Progressão de Força',
    category: 'Calistenia',
    level: 'Intermediário',
    durationDays: 28,
    recommendedFrequency: '3x a 4x por semana (após concluir Fase 1)',
    frequencyPerWeek: 4,
    estimatedTimeMinutes: 22,
    badge: 'Próxima Fase',
    description: 'Evolução natural do programa Fase 1 para quando os 28 dias iniciais forem completados com facilidade.',
    exercises: [
      {
        id: 'pushup-solo',
        name: 'Flexão de Braços no Chão',
        alias: 'Standard Push-up',
        targetMuscles: ['chest', 'triceps', 'shoulders', 'core'],
        videoUrl: 'http://www.youtube.com/watch?v=so5nuzZWwmI',
        youtubeId: 'so5nuzZWwmI',
        defaultSets: 4,
        repsOrDuration: '8 a 12 reps',
        type: 'reps',
        restSeconds: 60,
        instructions: [
          'Agora direto no chão, corpo como uma prancha rígida.',
          'Peito quase toca o solo e sobe em bloco único.'
        ],
        executionTips: ['Glúteos e abdômen travados.']
      },
      {
        id: 'hollow-rock',
        name: 'Canoinha Dinâmica (Hollow Rock)',
        alias: 'Hollow Avançado',
        targetMuscles: ['core'],
        videoUrl: 'http://www.youtube.com/watch?v=9ryjFfS1WDA',
        youtubeId: '9ryjFfS1WDA',
        defaultSets: 3,
        repsOrDuration: '30 segundos',
        type: 'isometric',
        durationSeconds: 30,
        restSeconds: 45,
        instructions: [
          'Posição de canoinha estendendo pernas e braços e balançando suavemente sem quebrar o arco da lombar.'
        ],
        executionTips: ['Se a lombar sair do chão, recue para os joelhos dobrados.']
      }
    ]
  }
];
