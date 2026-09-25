import type { QuizModel } from '../../../types/quiz.types';

export const questions: QuizModel.Question[] = [
  // ============================================================
  // LEVEL 1
  // ============================================================

  {
    question: 'Who was the first president of the United States?',
    options: [
      'Thomas Jefferson',
      'George Washington',
      'Abraham Lincoln',
      'John Adams',
    ],
    answer: 1,
    explanation:
      'George Washington became the first president of the United States in 1789.',
    level: 1,
  },
  {
    question: 'Which ancient civilization built the pyramids of Giza?',
    options: ['The Egyptians', 'The Romans', 'The Greeks', 'The Persians'],
    answer: 0,
    explanation:
      'The pyramids of Giza were built in ancient Egypt, primarily during the Fourth Dynasty.',
    level: 1,
  },
  {
    question: 'Who discovered the Americas for Spain in 1492?',
    options: [
      'Ferdinand Magellan',
      'Vasco da Gama',
      'Marco Polo',
      'Christopher Columbus',
    ],
    answer: 3,
    explanation:
      'Christopher Columbus reached the Caribbean in 1492 while sailing under the Spanish crown.',
    level: 1,
  },
  {
    question: 'Which empire was ruled by Julius Caesar?',
    options: [
      'The Ottoman Empire',
      'The Roman Republic',
      'The Byzantine Empire',
      'The Persian Empire',
    ],
    answer: 1,
    explanation:
      'Julius Caesar was a Roman military leader and statesman who played a major role in the transformation of the Roman Republic.',
    level: 1,
  },
  {
    question: 'In which year did World War II end?',
    options: ['1939', '1942', '1945', '1950'],
    answer: 2,
    explanation:
      'World War II ended in 1945 after the surrender of Germany and Japan.',
    level: 1,
  },
  {
    question: 'Which famous wall divided Berlin during the Cold War?',
    options: [
      'The Iron Wall',
      'The Warsaw Wall',
      'The Berlin Wall',
      'The European Wall',
    ],
    answer: 2,
    explanation:
      'The Berlin Wall divided East and West Berlin from 1961 until its fall in 1989.',
    level: 1,
  },
  {
    question: 'Who was known as the first emperor of the Roman Empire?',
    options: ['Augustus', 'Nero', 'Julius Caesar', 'Constantine'],
    answer: 0,
    explanation:
      'Augustus became the first Roman emperor and ruled from 27 BC until AD 14.',
    level: 1,
  },
  {
    question: 'Which famous ship sank on its maiden voyage in 1912?',
    options: ['Titanic', 'Mayflower', 'Santa Maria', 'Endeavour'],
    answer: 0,
    explanation:
      'The RMS Titanic sank in the North Atlantic Ocean in April 1912 during its maiden voyage.',
    level: 1,
  },
  {
    question: 'Who was the leader of Nazi Germany during World War II?',
    options: [
      'Joseph Stalin',
      'Adolf Hitler',
      'Benito Mussolini',
      'Winston Churchill',
    ],
    answer: 1,
    explanation:
      'Adolf Hitler was the dictator of Nazi Germany from 1933 until his death in 1945.',
    level: 1,
  },
  {
    question:
      'Which civilization is famous for developing democracy in ancient Athens?',
    options: ['The Romans', 'The Egyptians', 'The Vikings', 'The Greeks'],
    answer: 3,
    explanation:
      'Ancient Athens developed an early form of democracy in which eligible citizens participated directly in government.',
    level: 1,
  },
  {
    question:
      'Who was the British monarch during most of the Second World War?',
    options: ['Edward VIII', 'George V', 'Charles III', 'George VI'],
    answer: 3,
    explanation:
      'George VI was King of the United Kingdom throughout World War II.',
    level: 1,
  },
  {
    question: 'Which country was the center of the Renaissance?',
    options: ['Italy', 'England', 'France', 'Germany'],
    answer: 0,
    explanation:
      'The Renaissance began in Italian city-states such as Florence before spreading throughout Europe.',
    level: 1,
  },

  // ============================================================
  // LEVEL 2
  // ============================================================

  {
    question:
      'Which event is traditionally considered the beginning of the French Revolution?',
    options: [
      'The Battle of Waterloo',
      'The signing of the Treaty of Versailles',
      'The Storming of the Bastille',
      'The execution of Napoleon',
    ],
    answer: 2,
    explanation:
      'The Storming of the Bastille on July 14, 1789 became a major symbol of the beginning of the French Revolution.',
    level: 2,
  },
  {
    question:
      'Which civilization developed the famous road network known as the Qhapaq Ñan?',
    options: ['The Maya', 'The Aztecs', 'The Inca', 'The Romans'],
    answer: 2,
    explanation:
      'The Inca developed the Qhapaq Ñan, an extensive road system connecting large parts of their empire in the Andes.',
    level: 2,
  },
  {
    question:
      'Which treaty officially ended World War I between Germany and the Allied Powers?',
    options: [
      'Treaty of Versailles',
      'Treaty of Paris',
      'Treaty of Vienna',
      'Treaty of Rome',
    ],
    answer: 0,
    explanation:
      'The Treaty of Versailles, signed in 1919, formally ended the state of war between Germany and the Allied Powers.',
    level: 2,
  },
  {
    question: 'Who led the Norman conquest of England in 1066?',
    options: [
      'Richard the Lionheart',
      'William the Conqueror',
      'Henry VIII',
      'Charlemagne',
    ],
    answer: 0,
    explanation:
      'William, Duke of Normandy, defeated Harold Godwinson at the Battle of Hastings and became King of England.',
    level: 2,
  },
  {
    question:
      'Which ancient city was destroyed by the eruption of Mount Vesuvius in AD 79?',
    options: ['Pompeii', 'Athens', 'Sparta', 'Carthage'],
    answer: 0,
    explanation:
      'Pompeii was buried by volcanic material from Mount Vesuvius in AD 79.',
    level: 2,
  },
  {
    question:
      'Which explorer led the expedition that completed the first circumnavigation of the Earth?',
    options: [
      'Christopher Columbus',
      'James Cook',
      'Vasco da Gama',
      'Ferdinand Magellan',
    ],
    answer: 3,
    explanation:
      'Ferdinand Magellan led the expedition that began the first circumnavigation, although he died before it was completed.',
    level: 2,
  },
  {
    question: 'Which civilization created the city of Tenochtitlan?',
    options: ['The Maya', 'The Aztecs', 'The Inca', 'The Olmecs'],
    answer: 1,
    explanation:
      'Tenochtitlan was the capital of the Aztec Empire and was built on an island in Lake Texcoco.',
    level: 2,
  },
  {
    question: 'Which English king is famous for having six wives?',
    options: ['Richard III', 'Henry VII', 'Henry VIII', 'Edward VI'],
    answer: 2,
    explanation:
      'Henry VIII was married six times and played a major role in the English Reformation.',
    level: 2,
  },
  {
    question:
      'Which ancient civilization used a writing system known as cuneiform?',
    options: ['The Vikings', 'The Sumerians', 'The Aztecs', 'The Celts'],
    answer: 1,
    explanation:
      "The Sumerians of ancient Mesopotamia developed one of the world's earliest known writing systems, cuneiform.",
    level: 2,
  },
  {
    question: "Which battle marked Napoleon's final defeat in 1815?",
    options: [
      'The Battle of Trafalgar',
      'The Battle of Leipzig',
      'The Battle of Austerlitz',
      'The Battle of Waterloo',
    ],
    answer: 3,
    explanation:
      'Napoleon was decisively defeated at the Battle of Waterloo in 1815, ending his rule.',
    level: 2,
  },
  {
    question:
      'Which Roman city was buried alongside Pompeii after the eruption of Mount Vesuvius?',
    options: ['Herculaneum', 'Florence', 'Ravenna', 'Syracuse'],
    answer: 0,
    explanation:
      'Herculaneum was another Roman town destroyed and buried during the eruption of Mount Vesuvius in AD 79.',
    level: 2,
  },
  {
    question: 'Which empire was ruled by Genghis Khan?',
    options: [
      'The Ottoman Empire',
      'The Byzantine Empire',
      'The Mongol Empire',
      'The Persian Empire',
    ],
    answer: 2,
    explanation:
      'Genghis Khan founded and unified the Mongol Empire, which became the largest contiguous land empire in history.',
    level: 2,
  },

  // ============================================================
  // LEVEL 3
  // ============================================================

  {
    question:
      'Which ancient civilization is credited with developing the first known alphabetic writing system?',
    options: ['The Phoenicians', 'The Romans', 'The Persians', 'The Egyptians'],
    answer: 0,
    explanation:
      'The Phoenician script is widely regarded as one of the most important ancestors of later alphabetic writing systems.',
    level: 3,
  },
  {
    question:
      'Which Byzantine emperor ordered the construction of Hagia Sophia in its famous sixth-century form?',
    options: ['Constantine XI', 'Theodosius I', 'Justinian I', 'Basil II'],
    answer: 2,
    explanation:
      'Emperor Justinian I ordered the construction of the great Hagia Sophia in Constantinople, completed in 537.',
    level: 3,
  },
  {
    question:
      'Which agreement divided newly discovered overseas territories between Spain and Portugal in 1494?',
    options: [
      'Treaty of Utrecht',
      'Treaty of Tordesillas',
      'Treaty of Westphalia',
      'Treaty of Zaragoza',
    ],
    answer: 1,
    explanation:
      'The Treaty of Tordesillas divided spheres of influence between Spain and Portugal in territories outside Europe.',
    level: 3,
  },
  {
    question:
      "Which ancient Greek historian is often called the 'Father of History'?",
    options: ['Thucydides', 'Herodotus', 'Plato', 'Aristotle'],
    answer: 1,
    explanation:
      "Herodotus is traditionally known as the 'Father of History' because of his influential work investigating past events and cultures.",
    level: 3,
  },
  {
    question:
      'Which battle in 732 is traditionally associated with Charles Martel stopping the Umayyad advance into Frankish territory?',
    options: [
      'Battle of Hastings',
      'Battle of Agincourt',
      'Battle of Poitiers',
      'Battle of Tours',
    ],
    answer: 3,
    explanation:
      "The Battle of Tours, also called the Battle of Poitiers, took place in 732 and is traditionally associated with Charles Martel's victory over an Umayyad army.",
    level: 3,
  },
  {
    question: 'Which civilization built the ancient city of Teotihuacan?',
    options: [
      'Unknown; its builders were not the Aztecs',
      'The Inca',
      'The Romans',
      'The Phoenicians',
    ],
    answer: 0,
    explanation:
      'The builders of Teotihuacan are not definitively known. The city was already largely abandoned centuries before the Aztecs encountered it.',
    level: 3,
  },
  {
    question:
      'Which Roman emperor made Christianity legal throughout the Roman Empire through the Edict of Milan?',
    options: ['Nero', 'Augustus', 'Constantine I', 'Trajan'],
    answer: 1,
    explanation:
      'Constantine I and Licinius issued the Edict of Milan in 313, granting religious toleration to Christians and others.',
    level: 3,
  },
  {
    question:
      'Which dynasty ruled China during the construction of much of the Forbidden City?',
    options: ['Han dynasty', 'Tang dynasty', 'Qin dynasty', 'Ming dynasty'],
    answer: 3,
    explanation:
      'The Forbidden City was constructed during the Ming dynasty beginning in the early 15th century.',
    level: 3,
  },
  {
    question:
      'Which medieval document limited the power of the English king John in 1215?',
    options: [
      'Domesday Book',
      'Bill of Rights',
      'Act of Settlement',
      'Magna Carta',
    ],
    answer: 3,
    explanation:
      'Magna Carta was agreed in 1215 and placed important limits on the authority of King John.',
    level: 3,
  },
  {
    question: 'Which empire used the Janissaries as an elite military force?',
    options: [
      'Ottoman Empire',
      'Roman Empire',
      'Mongol Empire',
      'Holy Roman Empire',
    ],
    answer: 0,
    explanation:
      'The Janissaries were an elite infantry corps of the Ottoman Empire and became an important part of its military system.',
    level: 3,
  },
  {
    question: "Which peace settlement ended the Thirty Years' War in 1648?",
    options: [
      'Treaty of Versailles',
      'Treaty of Tordesillas',
      'Peace of Westphalia',
      'Peace of Augsburg',
    ],
    answer: 2,
    explanation:
      "The Peace of Westphalia refers to the treaties of 1648 that ended the Thirty Years' War and reshaped the political order of Europe.",
    level: 3,
  },
  {
    question:
      'Which ancient city was the capital of the Achaemenid Persian Empire and home to the famous Apadana?',
    options: ['Babylon', 'Sparta', 'Persepolis', 'Alexandria'],
    answer: 2,
    explanation:
      'Persepolis was a major ceremonial capital of the Achaemenid Persian Empire and contained the monumental Apadana hall.',
    level: 3,
  },
];
