import type { QuizModel } from '../../../types/quiz.types';

export const questions: QuizModel.Question[] = [
  // ============================================================
  // LEVEL 1
  // ============================================================

  {
    question: 'Which animal is native to Australia?',
    options: ['Tiger', 'Kangaroo', 'Penguin', 'Gorilla'],
    answer: 1,
    explanation:
      "Kangaroos are native to Australia and are one of the country's most iconic animals.",
    level: 1,
  },
  {
    question: 'Which animal is native to the Arctic?',
    options: ['Lion', 'Koala', 'Gorilla', 'Polar bear'],
    answer: 3,
    explanation:
      'Polar bears are native to the Arctic region and are highly adapted to life on sea ice.',
    level: 1,
  },
  {
    question:
      'Which animal is capable of changing its skin colour to help it camouflage itself?',
    options: ['Elephant', 'Giraffe', 'Horse', 'Chameleon'],
    answer: 3,
    explanation:
      'Chameleons are famous for their ability to change colour, which can help with communication and camouflage.',
    level: 1,
  },
  {
    question: 'Which animal is the largest land animal alive today?',
    options: [
      'Giraffe',
      'Hippopotamus',
      'African elephant',
      'White rhinoceros',
    ],
    answer: 2,
    explanation: 'The African elephant is the largest living land animal.',
    level: 1,
  },
  {
    question: 'Which animal is famous for having black and white stripes?',
    options: ['Leopard', 'Cheetah', 'Zebra', 'Hyena'],
    answer: 2,
    explanation:
      'Zebras are famous for their distinctive black and white striped coats.',
    level: 1,
  },
  {
    question: 'Which animal is capable of flying backwards?',
    options: ['Eagle', 'Hummingbird', 'Owl', 'Falcon'],
    answer: 1,
    explanation:
      'Hummingbirds are the only birds known to be capable of sustained backward flight.',
    level: 1,
  },
  {
    question: 'Which animal is native to the islands of Madagascar?',
    options: ['Lemur', 'Panda', 'Kangaroo', 'Sloth'],
    answer: 0,
    explanation:
      'Lemurs are native to Madagascar and are found nowhere else naturally in the wild.',
    level: 1,
  },
  {
    question: 'Which animal is known for building dams?',
    options: ['Otter', 'Badger', 'Fox', 'Beaver'],
    answer: 3,
    explanation:
      'Beavers build dams using branches, mud and other materials to create and control their aquatic habitats.',
    level: 1,
  },
  {
    question:
      'Which animal has a very long neck that helps it reach leaves high in trees?',
    options: ['Zebra', 'Giraffe', 'Rhinoceros', 'Camel'],
    answer: 1,
    explanation:
      'Giraffes have exceptionally long necks that allow them to feed on leaves high above the ground.',
    level: 1,
  },
  {
    question:
      'Which animal is famous for its ability to sleep while hanging upside down?',
    options: ['Eagle', 'Bat', 'Monkey', 'Sloth'],
    answer: 1,
    explanation:
      'Many bat species rest and sleep while hanging upside down from their feet.',
    level: 1,
  },
  {
    question: 'Which animal is the fastest land animal?',
    options: ['Lion', 'Horse', 'Leopard', 'Cheetah'],
    answer: 3,
    explanation:
      'The cheetah is the fastest land animal and can reach speeds of around 100 km/h over short distances.',
    level: 1,
  },
  {
    question: 'Which animal is famous for carrying its baby in a pouch?',
    options: ['Kangaroo', 'Tiger', 'Wolf', 'Panda'],
    answer: 0,
    explanation:
      'Female kangaroos carry their young in a pouch during an important part of their development.',
    level: 1,
  },

  // ============================================================
  // LEVEL 2
  // ============================================================

  {
    question: 'Which animal is native to the bamboo forests of central China?',
    options: ['Red panda', 'Koala', 'Giant panda', 'Sloth'],
    answer: 2,
    explanation:
      'Giant pandas are native to mountain forests in central China, where bamboo makes up most of their diet.',
    level: 2,
  },
  {
    question:
      'Which animal can survive for long periods without drinking water because it is highly adapted to desert conditions?',
    options: ['Camel', 'Hippo', 'Otter', 'Penguin'],
    answer: 0,
    explanation:
      'Camels have several adaptations that allow them to survive in extremely dry environments.',
    level: 2,
  },
  {
    question: 'What is the main difference between a cheetah and a leopard?',
    options: [
      'Leopards cannot run',
      'Cheetahs live only in forests',
      'They are the same species',
      'Cheetahs are built for speed, while leopards are stronger climbers',
    ],
    answer: 3,
    explanation:
      'Cheetahs have a body adapted primarily for speed, while leopards are more muscular and excellent climbers.',
    level: 2,
  },
  {
    question:
      'Which animal can regenerate lost limbs and is famous for its remarkable ability to regrow body parts?',
    options: ['Cobra', 'Axolotl', 'Tortoise', 'Eagle'],
    answer: 1,
    explanation:
      'Axolotls can regenerate limbs and several other body structures, making them important subjects of scientific research.',
    level: 2,
  },
  {
    question: 'Which animal uses echolocation to navigate and find prey?',
    options: ['Bat', 'Giraffe', 'Eagle', 'Kangaroo'],
    answer: 0,
    explanation:
      'Many bats use echolocation by producing sounds and interpreting the returning echoes.',
    level: 2,
  },
  {
    question:
      'Which animal is native to the Galápagos Islands and became famous through studies related to evolution?',
    options: ['Polar bear', 'Komodo dragon', 'Giant tortoise', 'Red panda'],
    answer: 2,
    explanation:
      "The giant tortoises of the Galápagos played an important role in observations that contributed to Darwin's ideas about evolution.",
    level: 2,
  },
  {
    question: 'Which animal can inflate its body when threatened?',
    options: ['Swordfish', 'Tuna', 'Manta ray', 'Pufferfish'],
    answer: 3,
    explanation:
      'Pufferfish can rapidly inflate their bodies by taking in water, making themselves harder for predators to swallow.',
    level: 2,
  },
  {
    question:
      'Which animal has fingerprints that can be surprisingly similar to human fingerprints?',
    options: ['Koala', 'Kangaroo', 'Panda', 'Sloth'],
    answer: 0,
    explanation:
      'Koalas have fingerprints with patterns that can resemble human fingerprints closely enough to be difficult to distinguish visually.',
    level: 2,
  },
  {
    question: 'Which animal is capable of changing sex during its lifetime?',
    options: ['Penguin', 'Wolf', 'Clownfish', 'Giraffe'],
    answer: 2,
    explanation:
      'Clownfish are sequential hermaphrodites and can change from male to female when social conditions require it.',
    level: 2,
  },
  {
    question:
      'Which animal is famous for using tools such as stones to open hard-shelled food?',
    options: ['Cheetah', 'Sea otter', 'Giraffe', 'Zebra'],
    answer: 1,
    explanation:
      'Sea otters are known to use rocks as tools to break open shells and access food.',
    level: 2,
  },
  {
    question: 'Which animal has three hearts?',
    options: ['Shark', 'Dolphin', 'Octopus', 'Sea turtle'],
    answer: 2,
    explanation:
      'An octopus has three hearts: two pump blood to the gills and one pumps blood to the rest of the body.',
    level: 2,
  },
  {
    question:
      'Which animal can sleep while swimming by allowing one half of its brain to rest at a time?',
    options: ['Dolphin', 'Shark', 'Seal', 'Penguin'],
    answer: 0,
    explanation:
      'Dolphins use unihemispheric sleep, allowing one half of their brain to remain active while the other rests.',
    level: 2,
  },

  // ============================================================
  // LEVEL 3
  // ============================================================

  {
    question:
      'Which animal has been recorded as having the strongest bite force among living land animals?',
    options: ['Hippopotamus', 'Lion', 'Gorilla', 'Polar bear'],
    answer: 0,
    explanation:
      'Hippopotamuses have an exceptionally powerful bite and enormous jaws, making them one of the most dangerous large mammals.',
    level: 3,
  },
  {
    question:
      'What is one major difference between an alligator and a crocodile?',
    options: [
      'Crocodiles cannot swim',
      'Alligators live only in Africa',
      'Alligators generally have a broader, U-shaped snout',
      'Crocodiles have no teeth',
    ],
    answer: 1,
    explanation:
      'Alligators generally have broader, U-shaped snouts, while crocodiles tend to have longer, narrower, V-shaped snouts.',
    level: 3,
  },
  {
    question:
      'Which animal is capable of surviving the loss of most of its body because it can regenerate from a small fragment?',
    options: ['Planarian', 'Komodo dragon', 'Tarantula', 'Penguin'],
    answer: 0,
    explanation:
      'Planarian flatworms have extraordinary regenerative abilities and can regenerate a complete body from very small pieces.',
    level: 3,
  },
  {
    question: 'Which animal has the longest pregnancy among land mammals?',
    options: ['Giraffe', 'Rhinoceros', 'Hippopotamus', 'African elephant'],
    answer: 3,
    explanation:
      'African elephants have a gestation period of around 22 months, the longest of any living land mammal.',
    level: 3,
  },
  {
    question:
      'Which animal can produce one of the loudest sounds made by a living animal?',
    options: ['Elephant', 'Howler monkey', 'Sperm whale', 'Blue whale'],
    answer: 2,
    explanation:
      'Sperm whales produce extremely powerful clicking sounds that are among the loudest sounds produced by animals.',
    level: 3,
  },
  {
    question: 'Which animal is capable of seeing ultraviolet light?',
    options: ['Elephant', 'Reindeer', 'Gorilla', 'Hippopotamus'],
    answer: 1,
    explanation:
      'Reindeer can see ultraviolet light, an adaptation that may help them detect food and objects against snowy backgrounds.',
    level: 3,
  },
  {
    question:
      'Which animal can survive being frozen for months and later become active again?',
    options: ['Polar bear', 'Wood frog', 'Penguin', 'Arctic fox'],
    answer: 1,
    explanation:
      'The wood frog can survive partial freezing during winter by allowing much of its body water to freeze and then recovering when temperatures rise.',
    level: 3,
  },
  {
    question: 'Which animal has a tongue that can be longer than its body?',
    options: ['Giraffe', 'Anteater', 'Woodpecker', 'Chameleon'],
    answer: 3,
    explanation:
      "A chameleon's tongue can extend to roughly twice the length of its body, allowing it to catch prey from a distance.",
    level: 3,
  },
  {
    question:
      'Which historical figure famously kept a private menagerie containing giraffes and other exotic animals?',
    options: [
      "Lorenzo de' Medici",
      'Leonardo da Vinci',
      'William Shakespeare',
      'Galileo Galilei',
    ],
    answer: 0,
    explanation:
      "Lorenzo de' Medici maintained an impressive collection of exotic animals and used them as symbols of wealth and prestige.",
    level: 3,
  },
  {
    question:
      'Which animal is capable of producing venom but is not a snake, spider or scorpion?',
    options: ['Penguin', 'Gorilla', 'Platypus', 'Elephant'],
    answer: 2,
    explanation:
      'Male platypuses have venomous spurs on their hind legs that can deliver a painful venom.',
    level: 3,
  },
  {
    question:
      'Which animal can survive for years without eating by entering an extremely slow metabolic state?',
    options: ['Cheetah', 'Hummingbird', 'Crocodile', 'Gazelle'],
    answer: 2,
    explanation:
      'Crocodiles can survive exceptionally long periods without food by drastically reducing their metabolism.',
    level: 3,
  },
  {
    question: 'What is the main difference between a llama and an alpaca?',
    options: [
      'Alpacas are carnivores',
      'Llamas are generally larger and were traditionally used more as pack animals',
      'Llamas are native to Africa',
      'There is no biological difference',
    ],
    answer: 1,
    explanation:
      'Llamas are generally larger and have historically been used as pack animals, while alpacas are smaller and primarily valued for their fibre.',
    level: 3,
  },
];
