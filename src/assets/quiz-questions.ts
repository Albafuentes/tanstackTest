import type { Question } from '../types/question.types';

const questions: Question[] = [
    {
        question: "In Bulgaria, how do people traditionally say 'yes' and 'no' with their heads?",
        options: [
            "Put the finger up if you want to say yes, and put the finger down if you want to say no",
            "Move the head horizontally for 'yes' and vertically for 'no'",
            "Put the finger down if you want to say yes, and put the finger up if you want to say no",
            "Move the head vertically for 'yes', and move the head horizontally for 'no'",
        ],
        answer: 1,
        explanation: "Bulgaria is famous for its traditional head gestures: a horizontal movement often means 'yes' and a vertical nod means 'no'. Today, younger generations may use the international gestures, especially in tourist areas."
    }, {
        question: "In Bangladesh, what was the punishment for students caught cheating in public exams?",
        options: [
            "You will be fined",
            "You will be expelled from the school",
            "You will be jailed",
            "You will be given extra homework",
        ],
        answer: 2,
        explanation:
            "Bangladesh introduced strict anti-cheating laws for public examinations. At one point, serious cheating cases could even lead to imprisonment."
    }, {
        question: "The Kindlifresserbrunnen fountain in Switzerland was built over 500 years ago. What does it depict?",
        options: [
            "It represents a mythical creature that eats children",
            "It is a memorial for children who died in a plague",
            "It symbolizes the importance of education for children",
            "It is a fountain dedicated to the local children",
        ],
        answer: 0,
        explanation:
            "The Kindlifresserbrunnen ('Child Eater Fountain') was built in Bern in the 16th century. Nobody knows its exact meaning, but it is widely believed to depict a mythical creature that frightens naughty children."
    }, {
        question: "Paris is famous for having approximately how many STOP signs?",
        options: [
            "Around 1,000",
            "Around 5,000",
            "Around 1",
            "Around 10,000",
        ],
        answer: 2,
        explanation:
            "For many years, Paris was famous for having only one official STOP sign. The city relies mainly on priority-to-the-right rules and traffic lights instead."
    }, {
        question: "In Iceland, where is the Elf School located?",
        options: [
            "In the mountains",
            "In the forests",
            "In rocks and lava fields",
            "In the rivers",
        ],
        answer: 2,
        explanation:
            "Many Icelanders grow up with stories about elves, known as the Huldufólk ('Hidden People'). According to folklore, they are believed to live in rocks and lava fields."
    }, {
        question: "What does the Samoan term 'fa'afafine' refer to?",
        options: [
            "A recognized third-gender identity in Samoan culture",
            "A woman who dresses as a man",
            "A person who is neither male nor female",
            "A traditional Samoan dance",
        ],
        answer: 0,
        explanation:
            "Fa'afafine are a recognized third-gender identity in Samoan culture and have played important social and family roles for centuries."
    }, {
        question: "In India, what is the reason for the tradition of eating with your hands?",
        options: [
            "It is a way to show respect to the food, because it is believed that the hands are a direct connection to the soul.",
            "According to Ayurveda, eating with your hands engages the senses and enhances the dining experience.",
            "It is considered more hygienic, as utensils can carry germs",
            "It is a modern trend",
        ],
        answer: 1,
        explanation:
            "According to Ayurveda, eating with your hands helps engage all five senses, making people more mindful of the food they eat."
    }, {
        question: "In Japan, what is the purpose of the 'Naki Sumo' festival?",
        options: [
            "To celebrate the harvest season",
            "To bring good luck and health to babies",
            "To honor the spirits of ancestors",
            "To showcase traditional sumo wrestling techniques",
        ],
        answer: 1,
        explanation:
            "During the Naki Sumo festival, sumo wrestlers try to make babies cry because crying is believed to bring good health and protect them from evil spirits."
    }, {
        question: "Which is the largest country in the world without a permanent river?",
        options: [
            "Saudi Arabia",
            "Libya",
            "Egypt",
            "Kazakhstan",
        ],
        answer: 0,
        explanation:
            "Saudi Arabia is the largest country in the world without any permanent rivers. Instead, it relies on underground water, wadis, and desalination."
    }, {
        question: "In Vienna, what are you learning in The King Institute?",
        options: [
            "To dance the waltz",
            "To play the violin",
            "To paint in the rococo style",
            "To educate about sexual matters",
        ],
        answer: 3,
        explanation:
            "The King Institute in Vienna is known for providing education related to sexuality and relationships."
    }, {
        question: "Which country has the largest concentration of dinosaur footprints?",
        options: [
            "United States",
            "China",
            "Lesotho",
            "Mongolia",
        ],
        answer: 2,
        explanation:
            "Lesotho's Subeng Dinosaur Tracksite contains one of the world's largest concentrations of dinosaur footprints, with hundreds of well-preserved tracks."
    }, {
        question: "Which is the official language of the country of Mauritius?",
        options: [
            "None",
            "French",
            "Creole",
            "German",
        ],
        answer: 0,
        explanation:
            "Although English is used in Parliament and French is widely spoken, Mauritius has no official language defined in its Constitution."
    }, {
        question: "Which is the smallest country in the world?",
        options: [
            "Vatican City",
            "Monaco",
            "Nauru",
            "Tuvalu",
        ],
        answer: 0,
        explanation:
            "Vatican City covers just 0.49 km² (0.19 sq mi), making it the world's smallest independent country."
    }, {
        question: "Which of these fast-food chains does not have restaurants in Belize?",
        options: [
            "KFC",
            "Burger King",
            "Subway",
            "McDonald's",
        ],
        answer: 3,
        explanation:
            "Unlike most countries in Central America, Belize has never had a McDonald's restaurant, although other international fast-food chains are present."
    }, {
        question: "Which country has the world's longest place name?",
        options: [
            "Wales",
            "Iceland",
            "New Zealand",
            "Thailand"
        ],
        answer: 2,
        explanation:
            "Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu is one of the longest place names in the world, with 85 letters."
    }, {
        question: "Which country has no mosquitoes?",
        options: [
            "Greenland",
            "Iceland",
            "Norway",
            "Finland"
        ],
        answer: 1,
        explanation:
            "Iceland's climate and unique ecological conditions prevent mosquitoes from completing their life cycle, making it one of the few countries without them."
    }, {
        question: "Which country uses more bicycles than cars?",
        options: [
            "Germany",
            "Denmark",
            "Netherlands",
            "Belgium"
        ],
        answer: 2,
        explanation:
            "The Netherlands has more bicycles than people. Cycling is deeply integrated into everyday life thanks to extensive bike infrastructure."
    }, {
        question: "Which country has the happiest population according to the World Happiness Report for several consecutive years?",
        options: [
            "Sweden",
            "Finland",
            "Norway",
            "Denmark"
        ],
        answer: 1,
        explanation:
            "Finland has ranked first in the World Happiness Report for several consecutive years thanks to factors such as trust, safety, and quality of life."
    }, {
        question: "Which country has over 17,000 islands?",
        options: [
            "Greece",
            "Philippines",
            "Indonesia",
            "Malaysia"
        ],
        answer: 2,
        explanation:
            "Indonesia is the world's largest archipelago, consisting of more than 17,000 islands stretching across Southeast Asia."
    }, {
        question: "In which country is it traditional to eat 12 grapes at midnight on New Year's Eve?",
        options: [
            "Portugal",
            "Spain",
            "Italy",
            "Mexico"
        ],
        answer: 1,
        explanation:
            "Eating 12 grapes at midnight on New Year's Eve is a Spanish tradition believed to bring good luck for each month of the coming year."
    }, {
        question: "Which country has the world's oldest continuously operating parliament?",
        options: [
            "United Kingdom",
            "Norway",
            "Sweden",
            "Iceland",
        ],
        answer: 3,
        explanation:
            "Iceland's Alþingi was founded in 930 AD and is considered the world's oldest continuously operating parliament."
    }, {
        question: "Which country has the most UNESCO World Heritage Sites?",
        options: [
            "China",
            "Italy",
            "Spain",
            "France"
        ],
        answer: 1,
        explanation:
            "Italy is home to more UNESCO World Heritage Sites than any other country, reflecting its extraordinary cultural and historical heritage."
    }, {
        question: "Which country is home to the world's highest navigable lake?",
        options: [
            "Peru",
            "Bolivia",
            "Chile",
            "Argentina"
        ],
        answer: 1,
        explanation:
            "Lake Titicaca, shared by Bolivia and Peru, is the world's highest navigable lake at about 3,812 metres (12,507 ft) above sea level."
    }, {
        question: "Which country celebrates the 'Day of the Dead' as one of its most important holidays?",
        options: [
            "Spain",
            "Brazil",
            "Peru",
            "Mexico",
        ],
        answer: 3,
        explanation:
            "The Day of the Dead celebrates and remembers loved ones who have passed away. Families build colourful altars, visit cemeteries, and celebrate their memory."
    }
];