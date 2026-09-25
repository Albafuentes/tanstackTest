import type { QuizModel } from '../../../types/quiz.types';

export const questions: QuizModel.Question[] = [
  // ============================================================
  // LEVEL 1
  // ============================================================

  {
    question: 'Which is the largest ocean on Earth?',
    options: [
      'Pacific Ocean',
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
    ],
    answer: 0,
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
    level: 1,
  },
  {
    question: 'Which animal is famous for having three hearts?',
    options: ['Shark', 'Octopus', 'Dolphin', 'Sea turtle'],
    answer: 1,
    explanation:
      'An octopus has three hearts: two pump blood to the gills and one pumps blood to the rest of the body.',
    level: 1,
  },
  {
    question: 'Which ocean animal is known for producing pearls?',
    options: ['Jellyfish', 'Starfish', 'Seahorse', 'Oyster'],
    answer: 3,
    explanation:
      'Oysters and other mollusks can produce pearls when an irritant becomes enclosed within their tissues.',
    level: 1,
  },
  {
    question:
      'Which ocean animal is the largest animal known to have ever lived?',
    options: ['Blue whale', 'Whale shark', 'Giant squid', 'Orca'],
    answer: 0,
    explanation:
      'The blue whale is the largest known animal to have ever lived, reaching lengths of around 30 metres or more.',
    level: 1,
  },
  {
    question: "What causes the ocean's tides?",
    options: [
      'Underwater volcanoes',
      'Ocean currents',
      'Mainly the gravitational pull of the Moon and the Sun',
      'Earthquakes',
    ],
    answer: 2,
    explanation:
      "The tides are caused mainly by the gravitational forces of the Moon and the Sun acting on Earth's oceans.",
    level: 1,
  },
  {
    question:
      'Which animal is known for using bioluminescence in the deep ocean?',
    options: ['Dolphin', 'Sea turtle', 'Anglerfish', 'Walrus'],
    answer: 2,
    explanation:
      'Anglerfish are famous for their bioluminescent lure, which they use to attract prey in the darkness of the deep sea.',
    level: 1,
  },
  {
    question: 'Which ocean is located between Africa, Asia and Australia?',
    options: [
      'Indian Ocean',
      'Atlantic Ocean',
      'Pacific Ocean',
      'Arctic Ocean',
    ],
    answer: 0,
    explanation:
      'The Indian Ocean lies between Africa, Asia, Australia and Antarctica.',
    level: 1,
  },
  {
    question:
      "What percentage of the Earth's surface is covered by oceans and other bodies of water?",
    options: ['About 40%', 'About 55%', 'About 90%', 'About 71%'],
    answer: 3,
    explanation:
      "Approximately 71% of Earth's surface is covered by water, with oceans making up most of it.",
    level: 1,
  },

  // ============================================================
  // LEVEL 2
  // ============================================================

  {
    question: "What is the deepest known point in Earth's oceans?",
    options: [
      'Tonga Trench',
      'Challenger Deep',
      'Puerto Rico Trench',
      'Java Trench',
    ],
    answer: 0,
    explanation:
      "Challenger Deep, located in the Mariana Trench, is the deepest known point in Earth's oceans.",
    level: 2,
  },
  {
    question: 'Why do many deep-sea animals have very large eyes?',
    options: [
      'To capture as much available light as possible',
      'To protect themselves from pressure',
      'To communicate with other animals',
      'To see underwater colours better',
    ],
    answer: 0,
    explanation:
      'Very little sunlight reaches the deep ocean, so large eyes can help animals detect the limited light available.',
    level: 2,
  },
  {
    question: 'What is bioluminescence?',
    options: [
      'The production of light by a living organism',
      'The reflection of sunlight from the ocean',
      'A type of underwater current',
      'A process that creates oxygen',
    ],
    answer: 0,
    explanation:
      'Bioluminescence is the production and emission of light by a living organism through a chemical reaction.',
    level: 2,
  },
  {
    question:
      'Which phenomenon occurs when hot, mineral-rich water emerges from cracks in the deep ocean floor?',
    options: ['Tsunami', 'Upwelling', 'Hydrothermal vent', 'Ocean whirlpool'],
    answer: 2,
    explanation:
      'Hydrothermal vents form where seawater is heated by geological activity beneath the ocean floor and emerges rich in dissolved minerals.',
    level: 2,
  },
  {
    question:
      'Which animal is capable of changing its colour and texture to imitate its surroundings?',
    options: ['Blue whale', 'Manta ray', 'Sea turtle', 'Mimic octopus'],
    answer: 3,
    explanation:
      'The mimic octopus can change its colour, shape and behaviour to resemble other marine animals and its surroundings.',
    level: 2,
  },
  {
    question: 'Why is the deep ocean generally very cold?',
    options: [
      'The seafloor produces cold water',
      'Salt automatically lowers the temperature',
      'Sunlight cannot penetrate very far into the water',
      'Deep-sea animals consume the heat',
    ],
    answer: 2,
    explanation:
      'Sunlight penetrates only a limited distance into the ocean, leaving the deeper waters extremely cold.',
    level: 2,
  },
  {
    question:
      'What is the name given to the region of the ocean where sunlight no longer reaches?',
    options: ['Littoral zone', 'Aphotic zone', 'Intertidal zone', 'Coral zone'],
    answer: 1,
    explanation:
      'The aphotic zone is the part of the ocean where there is insufficient sunlight for photosynthesis.',
    level: 2,
  },
  {
    question:
      'Which marine animal is famous for having one of the largest eyes in the animal kingdom?',
    options: ['Colossal squid', 'Sea lion', 'Manta ray', 'Hammerhead shark'],
    answer: 0,
    explanation:
      'The colossal squid has enormous eyes that may help it detect predators and prey in the deep ocean.',
    level: 2,
  },

  // ============================================================
  // LEVEL 3
  // ============================================================

  {
    question: "What is the 'whale fall' ecosystem?",
    options: [
      'A migration route used by whales',
      'A sudden drop in ocean temperature',
      'A deep-sea ecosystem created around the remains of a dead whale',
      'A type of underwater volcanic eruption',
    ],
    answer: 2,
    explanation:
      'When a whale dies and sinks to the seafloor, its body can support an entire ecosystem for years, providing food for many organisms.',
    level: 3,
  },
  {
    question:
      'Which phenomenon occurs when cold, nutrient-rich deep water rises toward the ocean surface?',
    options: ['Downwelling', 'Thermocline', 'Upwelling', 'Tidal locking'],
    answer: 2,
    explanation:
      'Upwelling brings cold, nutrient-rich water from deeper parts of the ocean toward the surface and can support highly productive ecosystems.',
    level: 3,
  },
  {
    question: 'What is the thermocline?',
    options: [
      'A region where ocean water becomes completely fresh',
      'A layer where water temperature changes rapidly with depth',
      'A deep-sea volcanic ridge',
      'A zone where tides stop occurring',
    ],
    answer: 1,
    explanation:
      'The thermocline is a layer of the ocean where temperature decreases rapidly with increasing depth.',
    level: 3,
  },
  {
    question:
      'Which deep-sea phenomenon allows ecosystems to exist without sunlight as their primary energy source?',
    options: [
      'Photosynthesis',
      'Evaporation',
      'Fermentation',
      'Chemosynthesis',
    ],
    answer: 3,
    explanation:
      'Some deep-sea organisms obtain energy through chemosynthesis, using chemicals released by hydrothermal vents and other geological processes.',
    level: 3,
  },
  {
    question:
      'Which animal is known for producing one of the deepest diving records among marine mammals?',
    options: ["Cuvier's beaked whale", 'Blue whale', 'Orca', 'Manatee'],
    answer: 0,
    explanation:
      "Cuvier's beaked whales are exceptional divers and have been recorded descending to depths of nearly 3,000 metres.",
    level: 3,
  },
  {
    question:
      'Why do some deep-sea animals have red coloration that appears almost black in deep water?',
    options: [
      'Red reflects more sunlight',
      'Red light is absorbed quickly by seawater',
      'Red animals produce less heat',
      'Red colour increases buoyancy',
    ],
    answer: 1,
    explanation:
      'Red wavelengths disappear quickly as sunlight penetrates seawater, so red animals can appear dark and become harder to detect in deep water.',
    level: 3,
  },
  {
    question: 'What is marine snow?',
    options: [
      'Frozen seawater falling from the atmosphere',
      'A type of underwater volcanic ash',
      'A continuous shower of organic particles sinking through the ocean',
      'Foam produced by waves',
    ],
    answer: 2,
    explanation:
      'Marine snow consists of organic particles such as dead organisms, waste and other material that slowly sink from surface waters toward the deep ocean.',
    level: 3,
  },
  {
    question:
      'Which creature is famous for having a transparent body that allows some of its internal organs to be seen?',
    options: ['Great white shark', 'Blue whale', 'Glass squid', 'Manta ray'],
    answer: 2,
    explanation:
      'Glass squid have highly transparent bodies, an adaptation that can make them harder for predators to detect in the open ocean.',
    level: 3,
  },
];
