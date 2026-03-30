import { ReadingPage } from "../types";

// ─── Helpers ────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Reading Passages ────────────────────────────────────────────────────────

export const challengingReadings: ReadingPage[] = [
  // === YEAR 2 READINGS ===
  {
    id: 1,
    title: "The Brave Little Penguin",
    text: "On the icy shores of Antarctica, a young emperor penguin named Pip was about to make the most important journey of his life. Unlike the other penguin chicks who huddled together for warmth, Pip was always curious about what lay beyond the colony. His mother had taught him how to waddle, slide on his belly, and most importantly, how to swim. Today was the day Pip would dive into the freezing ocean for the very first time to catch his own food. The water temperature was minus two degrees Celsius, but penguins have special waterproof feathers and a thick layer of blubber to keep them warm. Pip took a deep breath, closed his eyes, and plunged into the dark blue water. At first, everything was blurry and confusing. But then his eyes adjusted, and he saw an amazing underwater world filled with silvery fish, glowing jellyfish, and curious seals watching him from a distance. Pip caught three small fish on his first dive and proudly brought them back to share with his younger sister. From that day on, Pip became the bravest diver in the whole colony, always willing to explore deeper and further than any other young penguin.",
    comprehensionQuestions: [
      "Why was Pip different from the other penguin chicks?",
      "How do penguins stay warm in freezing water?",
      "What did Pip do with the fish he caught on his first dive?"
    ],
    vocabulary: [
      { word: "colony", definition: "A group of the same kind of animals living together" },
      { word: "blubber", definition: "A thick layer of fat under the skin that keeps animals warm" },
      { word: "waterproof", definition: "Able to keep water out; not letting water pass through" },
    ],
    yearLevel: 2,
  },
  {
    id: 2,
    title: "The Magic Garden",
    text: "Lily loved spending time in her grandmother's garden. It was full of beautiful flowers, tall sunflowers, and buzzing bees. One sunny morning, Lily noticed something strange. A tiny door had appeared at the bottom of the old oak tree! She knelt down and peeked inside. Through the little door, she could see a miniature garden with tiny chairs, a small table, and cups no bigger than her thumbnail. 'Who lives here?' she wondered aloud. Just then, a ladybird landed on her hand. It had seven spots on its red wings. Lily carefully counted each one. She placed the ladybird near the tiny door and watched it crawl inside. Her grandmother came over and smiled. 'That's the fairy garden,' she whispered. 'If you plant a seed and water it every day, the fairies will help it grow.' Lily planted a sunflower seed right next to the little door. She watered it every morning before school. After two weeks, a tiny green shoot pushed through the soil. By summer, it had grown taller than Lily herself!",
    comprehensionQuestions: [
      "What did Lily find at the bottom of the oak tree?",
      "How many spots did the ladybird have?",
      "What did Lily plant next to the fairy door?"
    ],
    vocabulary: [
      { word: "miniature", definition: "Very small; a tiny version of something bigger" },
      { word: "thumbnail", definition: "The nail on your thumb; used to describe something very small" },
      { word: "shoot", definition: "A new stem or branch growing from a plant" },
    ],
    yearLevel: 2,
  },
  {
    id: 3,
    title: "The Lost Kite",
    text: "Sam and his dad went to the beach on a windy Saturday afternoon. They brought Sam's favourite red kite with a long blue tail. Dad helped Sam hold the string while the wind lifted the kite high into the sky. It soared above the waves like a bright red bird. Sam was so happy watching it dance and spin in the air. But then a very strong gust of wind pulled the string right out of Sam's hands! The kite flew higher and higher until it got stuck in a tall palm tree near the sand dunes. Sam felt like crying. His dad put an arm around him and said, 'Don't worry, we'll get it back.' They walked to the palm tree and tried jumping to reach it, but it was too high. Then Sam had an idea. He found a long stick on the beach and used it to gently push the kite's tail until it came free. The kite floated down softly into Sam's waiting arms. 'That was clever thinking!' said Dad proudly. Sam held on extra tight to the string for the rest of the afternoon.",
    comprehensionQuestions: [
      "Where did Sam and his dad go?",
      "What happened when the strong wind came?",
      "How did Sam get his kite back?"
    ],
    vocabulary: [
      { word: "soared", definition: "Flew high up in the air" },
      { word: "gust", definition: "A sudden strong blow of wind" },
      { word: "dunes", definition: "Hills of sand near the beach" },
    ],
    yearLevel: 2,
  },
  {
    id: 4,
    title: "The Helpful Robot",
    text: "In Mrs. Lee's Year 2 classroom, there was a small robot called Beep. Beep was round like a ball with two flashing blue eyes and tiny wheels. Every morning, Beep would roll around the classroom and say 'Good morning!' to each student. The children loved Beep because it could do many helpful things. It could read stories aloud in funny voices, count blocks, and even sing songs. One day, a new student named Mia joined the class. Mia felt shy and didn't talk to anyone. At lunchtime, she sat alone under a tree. Beep rolled up to her and said, 'Hello! Do you want to play a game?' Beep taught Mia a counting game where she had to clap her hands the right number of times. Soon, other children came over to join in. By the end of the day, Mia had made three new friends. She gave Beep a big hug and whispered, 'Thank you for being my friend first.' Beep's blue eyes flashed happily.",
    comprehensionQuestions: [
      "What could Beep the robot do?",
      "Why was Mia sitting alone at lunchtime?",
      "How many new friends did Mia make by the end of the day?"
    ],
    vocabulary: [
      { word: "shy", definition: "Feeling nervous or uncomfortable around people you don't know" },
      { word: "flashing", definition: "Turning on and off quickly, like a light" },
      { word: "whispered", definition: "Said something very quietly so only one person could hear" },
    ],
    yearLevel: 2,
  },
  {
    id: 9,
    title: "The Day It Rained Frogs",
    text: "One Thursday morning, Maya looked out her bedroom window and couldn't believe her eyes. Tiny green frogs were falling from the sky! They bounced off the roof, hopped along the footpath, and landed in the garden with soft little plops. Maya's mum explained that this actually happens sometimes in real life. A very strong tornado can suck up ponds, frogs and all, carry them for many kilometres, then drop them somewhere completely different. The frogs were confused but unhurt. Maya counted eleven of them in the garden alone. She filled a bucket with pond water from the garage and gently scooped each frog inside. Her little brother Jed wanted to keep them all as pets, but Maya knew better. 'They belong in a real pond,' she said wisely. After school, Maya and her mum drove to the nearby wetlands and released every single frog. As the last one plopped into the water, Maya felt a warm glow of pride in her chest.",
    comprehensionQuestions: [
      "How did frogs end up falling from the sky?",
      "What did Maya do to help the frogs?",
      "Why didn't Maya let her brother keep the frogs as pets?"
    ],
    vocabulary: [
      { word: "tornado", definition: "A powerful spinning column of wind that can pick up objects" },
      { word: "wetlands", definition: "An area of land that is mostly covered with water, like a swamp or marsh" },
      { word: "released", definition: "Let something free; allowed it to go" },
    ],
    yearLevel: 2,
  },
  {
    id: 10,
    title: "The Library at the Bottom of the Sea",
    text: "Theo had always been afraid of deep water, but his new diving mask changed everything. One summer afternoon, he slipped beneath the waves near his uncle's boat and gasped — not with fear, but with wonder. Stretching below him was a shipwreck half-buried in sand. Its wooden hull was dark with age, and hundreds of small fish darted in and out through the broken portholes. A thick carpet of sea grass rippled in the gentle current. Then Theo spotted something extraordinary: a wooden bookshelf still bolted to the cabin wall, with swollen, waterlogged books wedged tightly on every shelf. He floated there, staring, imagining the sailors who had once read those books. When he surfaced, he was breathless and smiling. 'There's a library down there!' he told his uncle. His uncle laughed and explained the ship had sunk over a hundred years ago, carrying a merchant's entire book collection. From that day on, Theo never feared the ocean again.",
    comprehensionQuestions: [
      "What did Theo find inside the shipwreck?",
      "How long ago had the ship sunk?",
      "How did the experience change how Theo felt about deep water?"
    ],
    vocabulary: [
      { word: "hull", definition: "The main body or frame of a ship" },
      { word: "porthole", definition: "A small round window on the side of a ship" },
      { word: "waterlogged", definition: "So full of water that it is heavy and swollen" },
    ],
    yearLevel: 2,
  },

  // === YEAR 3 READINGS ===
  {
    id: 5,
    title: "The Mystery of the Missing School Bell",
    text: "Every morning at Riverside Primary School, the old brass bell would ring to signal the start of classes. Mrs. Henderson, the principal, had been ringing that same bell for fifteen years. The bell had a deep, melodious sound that could be heard three blocks away. But on this particular Tuesday morning, something was terribly wrong. Mrs. Henderson pulled the rope, but no sound came out. She examined the bell carefully and discovered that the metal clapper inside was completely missing! Without the clapper, the bell was as silent as a sleeping mouse. The mystery deepened when the school janitor, Mr. Peterson, mentioned that he had heard strange scratching sounds coming from the bell tower the night before. 'It sounded like something was trying to build a nest up there,' he explained, scratching his grey beard thoughtfully. The students were fascinated by this puzzle and decided to become detectives to solve the case of the missing clapper.",
    comprehensionQuestions: [
      "How long had Mrs. Henderson been ringing the school bell?",
      "What was missing from inside the bell?",
      "What sounds did Mr. Peterson hear the night before?"
    ],
    vocabulary: [
      { word: "melodious", definition: "Having a pleasant, musical sound" },
      { word: "clapper", definition: "The piece inside a bell that strikes the sides to make it ring" },
      { word: "fascinated", definition: "Extremely interested and curious about something" },
    ],
    yearLevel: 3,
  },
  {
    id: 6,
    title: "The Great Coral Reef Adventure",
    text: "Marine biologist Dr. Sarah Chen descended slowly into the crystal-clear waters of the Great Barrier Reef, her underwater camera ready to document the incredible biodiversity below. At twenty metres deep, she encountered a magnificent sight: a coral garden teeming with life. Bright orange clownfish darted playfully between the protective tentacles of their sea anemone homes, while schools of electric-blue tang fish swirled like underwater tornadoes. Dr. Chen observed how the coral polyps extended their tiny arms to catch microscopic plankton floating in the current. She documented over forty different species in just one small section of reef, including a rare green sea turtle that gracefully glided past her observation station. The reef ecosystem demonstrated perfect symbiosis — each creature dependent on others for survival. However, Dr. Chen noticed concerning signs of coral bleaching in some areas, where rising ocean temperatures had caused the coral to expel the colourful algae that normally lived within their tissues, leaving behind pale, white skeletons.",
    comprehensionQuestions: [
      "What job does Dr. Sarah Chen have?",
      "How many different species did she document?",
      "What is coral bleaching and what causes it?"
    ],
    vocabulary: [
      { word: "biodiversity", definition: "The variety of different plants and animals living in an area" },
      { word: "symbiosis", definition: "A relationship where different living things help each other survive" },
      { word: "microscopic", definition: "So tiny that it can only be seen with a microscope" },
    ],
    yearLevel: 3,
  },
  {
    id: 7,
    title: "The Inventor's Workshop",
    text: "In a cluttered workshop filled with gears, springs, and peculiar contraptions, Professor Amelia Cogsworth worked tirelessly on her latest invention: a machine that could transform plastic waste into useful building materials. The workshop walls were lined with unsuccessful prototypes — a self-stirring soup spoon that stirred too vigorously, a solar-powered umbrella that only worked on sunny days, and a shoe-tying robot that tied knots so complicated that no human could untie them. But Professor Cogsworth never gave up. She believed that every failure taught her something valuable about engineering and problem-solving. Her current project required precise calculations and careful measurement of temperatures, pressure, and timing. She had discovered that by heating recycled plastic bottles to exactly 247 degrees Celsius and mixing them with a special binding agent made from seaweed, she could create bricks stronger than traditional clay bricks. The process also produced zero harmful emissions, making it environmentally friendly. Local construction companies were very interested in her innovation, especially since it could help solve two problems simultaneously: reducing plastic waste and creating affordable building materials.",
    comprehensionQuestions: [
      "What is Professor Cogsworth trying to invent?",
      "What temperature does the plastic need to be heated to?",
      "Name two problems her invention could solve."
    ],
    vocabulary: [
      { word: "contraptions", definition: "Unusual or cleverly-made machines or devices" },
      { word: "prototype", definition: "An early version of something made to test if the idea works" },
      { word: "simultaneously", definition: "Happening at the same time" },
    ],
    yearLevel: 3,
  },
  {
    id: 8,
    title: "The Underground City of Ants",
    text: "Beneath the playground of Greenfield School, an incredible civilisation was thriving without anyone knowing. A colony of leafcutter ants had built an enormous underground city with hundreds of tunnels, chambers, and even their own farms. Entomologist Professor James Wright spent two years studying this colony using tiny cameras and sensors placed carefully in the soil. What he discovered was astonishing. The ants had divided their city into different areas, just like a human town. There were nurseries for baby ants, storage rooms for food, waste disposal chambers far from the living areas, and special garden rooms where the ants grew a type of fungus for food. The ants cut pieces of leaves from nearby plants, carried them underground on their backs (sometimes pieces ten times their own body weight!), and used the leaves as compost to grow their fungus gardens. The colony had a strict social structure: the queen ant laid all the eggs, soldier ants protected the tunnels, worker ants gathered food, and tiny nurse ants cared for the larvae. Working together, these millions of ants had created a society as organised and efficient as any human city.",
    comprehensionQuestions: [
      "What did the ants use the cut leaves for?",
      "Name three different types of rooms in the ant city.",
      "What are the four roles that ants have in the colony?"
    ],
    vocabulary: [
      { word: "entomologist", definition: "A scientist who studies insects" },
      { word: "civilisation", definition: "An organised society with its own culture and way of life" },
      { word: "larvae", definition: "The young form of an insect before it becomes an adult" },
    ],
    yearLevel: 3,
  },
  {
    id: 11,
    title: "The Girl Who Mapped the Stars",
    text: "Twelve-year-old Priya had a habit that puzzled her neighbours: every clear night, she dragged a blanket onto the back lawn and lay there for hours, staring upwards. She wasn't just gazing idly — she was methodically charting the positions of stars in a hand-drawn notebook, comparing them to the historical records her grandmother had brought from India. One evening she noticed something peculiar: a point of light that wasn't in any of her charts. Night after night she tracked it, recording its position with careful measurements. Eventually her science teacher, Mr. Okafor, examined her findings and went very quiet. He picked up the phone and called the university observatory. Three weeks later, Priya stood in front of a panel of astronomers who confirmed that she had independently discovered a new periodic comet — a chunk of ice and rock completing a circuit around the sun every 340 years. The comet was officially named Comet Priya in her honour. 'I just looked carefully and wrote things down,' she said modestly, but everyone in the room knew that was exactly what science required.",
    comprehensionQuestions: [
      "What was unusual about how Priya spent her evenings?",
      "How did Priya know the light she saw wasn't a known star?",
      "What does it mean for a comet to be 'periodic'?"
    ],
    vocabulary: [
      { word: "methodically", definition: "Done in a careful, organised, step-by-step way" },
      { word: "observatory", definition: "A building with special equipment for watching and studying the sky" },
      { word: "independently", definition: "Done on your own, without help from others" },
    ],
    yearLevel: 3,
  },
  {
    id: 12,
    title: "The River That Remembered",
    text: "When the Calloway River flooded for the third time in five years, the town council called an emergency meeting. Engineers proposed building a massive concrete wall along the riverbank. But elder botanist Dr. Mara Osei asked everyone to listen to the river itself. She pointed out that the problem had begun after developers cleared the ancient paperbark forest upstream to build a shopping centre. Without tree roots to absorb rainfall and slow the water's flow, every heavy storm sent a surge of water racing into town. Dr. Osei's solution was not concrete but living: she proposed replanting five kilometres of native vegetation along the river's banks and creating a network of wetland retention ponds to absorb excess water naturally. The council was sceptical — it seemed too simple, too slow. But Dr. Osei had data from twelve similar rivers around the world that proved the approach worked. Three years after the replanting began, the river flooded just once — barely reaching the footpath — during the biggest storm on record. The concrete wall was never built.",
    comprehensionQuestions: [
      "What caused the flooding to get worse over the years?",
      "How did Dr. Osei's solution work differently from the concrete wall?",
      "What evidence did Dr. Osei use to convince the council?"
    ],
    vocabulary: [
      { word: "retention", definition: "Keeping or holding something in place" },
      { word: "sceptical", definition: "Doubtful; not easily convinced that something will work" },
      { word: "vegetation", definition: "Plants, trees, and other plant life growing in an area" },
    ],
    yearLevel: 3,
  },
];

// ─── Writing Prompt Generator ────────────────────────────────────────────────

// Year 2 component pools

const y2Characters = [
  'a tiny dragon who is afraid of fire',
  'a puppy who suddenly learns to talk',
  'a brave little mouse',
  'a friendly robot with wobbly wheels',
  'a mischievous fairy',
  'a penguin who has never seen the sun',
  'a clumsy baby elephant',
  'a shy unicorn',
  'a curious monkey who loves gadgets',
  'a cloud that wants to be a rainbow',
  'a cat who can fly',
  'a giant who is scared of tiny things',
];

const y2Settings = [
  'in an enchanted forest',
  'deep under the sea',
  'in a magical candy kingdom',
  'on a flying island high in the clouds',
  'inside a toy shop after closing time',
  'in a giant treehouse',
  'underground in a glowing crystal cave',
  'on a farm where all the animals can talk',
  'in a jungle full of friendly monsters',
  'inside a snow globe',
];

const y2Events = [
  'discovers a mysterious glowing map',
  'loses something very important',
  'receives a magical gift from a stranger',
  'must help a friend who is in trouble',
  'wakes up to find everything has changed colour',
  'discovers a secret door that leads somewhere amazing',
  'hears a strange sound coming from a box',
  'accidentally shrinks to the size of a pea',
  'finds a tiny creature that needs looking after',
  'gets three wishes but must choose very carefully',
];

const y2DescriptivePlaces = [
  'a chocolate waterfall',
  'the inside of a rainbow',
  'a forest where the trees are made of lollipops',
  'an underwater city with bubble buildings',
  'a cloud made of soft marshmallows',
  'a bedroom that magically grows to the size of a football field',
  'a cave filled with friendly, glowing animals',
  'a bakery run entirely by robots',
];

const y2DescriptiveSenses = [
  'What would it look, sound, and smell like?',
  'Describe what you would see, hear, and feel.',
  'What would you taste, touch, and hear?',
];

const y2LetterRecipients = [
  'your favourite animal at the zoo',
  'a superhero you admire',
  'a character from your favourite book',
  'a friend who has moved to another country',
  'Santa Claus',
  'the tooth fairy',
  'a dragon you have just met',
  'an alien who wants to visit Earth',
];

const y2LetterTopics = [
  'telling them about your best day ever',
  'asking them one big question you have always wanted to know the answer to',
  'inviting them to come and visit you',
  'sharing something funny that happened recently',
  'telling them about something you are really proud of',
  'asking for their help with a problem',
];

const y2ImagineScenarios = [
  'You wake up and find you can understand what animals are saying.',
  'You open your wardrobe and discover it leads to a magical world.',
  'You find a remote control that can pause time.',
  'You discover you can shrink down to the size of an ant.',
  'You wake up and find you can fly.',
  'You are given one day to run your school however you like.',
  'You discover a treasure chest buried in your backyard.',
  'You can swap lives with your pet for one day.',
];

// Year 3 component pools

const y3NarrativeProtagonists = [
  'a young scientist who accidentally invents something dangerous',
  'a detective aged ten who solves a neighbourhood mystery',
  'an explorer who discovers a hidden civilisation',
  'a student who finds a journal belonging to someone from 100 years ago',
  'a kid who can communicate with plants',
  'an engineer who must repair a spaceship using only spare parts',
  'a time traveller who keeps arriving in the wrong century',
  'a young marine biologist who discovers a new species',
];

const y3NarrativeComplications = [
  'but soon realises not everyone is happy about this discovery',
  'only to find a hidden clue that changes everything',
  'but must keep it secret from the adults who would not understand',
  'and must make a difficult decision that will affect many people',
  'but runs out of time and must think of a clever solution',
  'and learns an unexpected lesson about trust',
  'only to discover the real mystery runs much deeper',
  'and must choose between personal gain and doing what is right',
];

const y3PersuasiveTopics = [
  'every school should have a weekly no-homework day',
  'zoos should be replaced with wildlife sanctuaries',
  'children should be allowed to design their own school timetable',
  'plastic packaging should be banned completely',
  'every child should learn a musical instrument',
  'screen time limits are unnecessary for responsible kids',
  'animals should have the same rights as humans',
  'sport should be optional at school',
];

const y3ProceduralSubjects = [
  'your favourite meal',
  'a paper aeroplane that can fly further than anyone else\'s',
  'a working periscope from cardboard and mirrors',
  'a mini garden in a shoebox',
  'your morning routine for the perfect school day',
  'a secret code only your friends can read',
  'a simple musical instrument from household items',
  'a nature journal for recording observations',
];

const y3DescriptiveSubjects = [
  'the moment just before a thunderstorm breaks',
  'an abandoned house that turns out not to be empty',
  'a market in a city you have never visited',
  'the view from the top of the tallest building you can imagine',
  'the ocean at night, lit only by bioluminescent creatures',
  'the inside of a scientist\'s laboratory',
  'a forest after heavy snowfall',
  'a stadium the moment before a major sporting event begins',
];

const y3LetterContexts = [
  { sender: 'a future version of yourself', recipient: 'your present-day self', about: 'advice about what truly matters' },
  { sender: 'yourself', recipient: 'the Prime Minister', about: 'one important change you believe the country needs' },
  { sender: 'a character from history', recipient: 'a scientist of today', about: 'a question they never got to answer' },
  { sender: 'yourself', recipient: 'a younger student starting Year 1', about: 'the most useful things you have learned so far' },
  { sender: 'an endangered animal', recipient: 'the humans of the world', about: 'how human behaviour is affecting their habitat' },
  { sender: 'yourself', recipient: 'an alien pen pal', about: 'explaining what makes Earth worth visiting' },
];

// ─── Generator Functions ─────────────────────────────────────────────────────

function year2NarrativePrompt(): string {
  const char = pick(y2Characters);
  const setting = pick(y2Settings);
  const event = pick(y2Events);
  return `Write a story about ${char} who lives ${setting}. One day, the character ${event}. Use describing words to bring your story to life, and make sure it has a beginning, a middle, and an end.`;
}

function year2DescriptivePrompt(): string {
  const place = pick(y2DescriptivePlaces);
  const sense = pick(y2DescriptiveSenses);
  return `Imagine you are visiting ${place}. ${sense} Write at least three sentences and try to use words that help the reader really picture the place.`;
}

function year2LetterPrompt(): string {
  const recipient = pick(y2LetterRecipients);
  const topic = pick(y2LetterTopics);
  return `Write a friendly letter to ${recipient}, ${topic}. Remember to include a greeting (Dear ...), a main paragraph, and a sign-off (From ...).`;
}

function year2ImaginativePrompt(): string {
  const scenario = pick(y2ImagineScenarios);
  return `${scenario} Write about what happens next. What would you do? How would it feel? What problems might you face, and how would you solve them?`;
}

function year3NarrativePrompt(): string {
  const protagonist = pick(y3NarrativeProtagonists);
  const complication = pick(y3NarrativeComplications);
  return `Write a narrative about ${protagonist}, ${complication}. Your story should include a clear setting, a problem, rising tension, and a satisfying resolution. Try to show your character's feelings through their actions and dialogue.`;
}

function year3PersuasivePrompt(): string {
  const topic = pick(y3PersuasiveTopics);
  return `Write a persuasive text arguing that ${topic}. State your opinion clearly in the first sentence, then give at least two reasons with evidence or examples. End with a strong concluding statement. Try to use persuasive language such as "clearly", "it is essential that", and "studies show".`;
}

function year3ProceduralPrompt(): string {
  const subject = pick(y3ProceduralSubjects);
  return `Write a set of instructions explaining how to make or do ${subject}. Include a list of materials or ingredients needed, numbered steps in the correct order, and at least one helpful tip. Use command verbs (e.g. "mix", "fold", "place") to start each step.`;
}

function year3DescriptivePrompt(): string {
  const subject = pick(y3DescriptiveSubjects);
  return `Write a descriptive piece about ${subject}. Use all five senses — sight, sound, smell, taste, and touch — to paint a vivid picture for the reader. Try to use at least one simile (comparing using "like" or "as") and one metaphor.`;
}

function year3LetterPrompt(): string {
  const ctx = pick(y3LetterContexts);
  return `Write a formal or semi-formal letter from ${ctx.sender} to ${ctx.recipient} about ${ctx.about}. Use appropriate letter conventions (date, greeting, paragraphs, sign-off). Your letter should be thoughtful and well-reasoned.`;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export interface WritingPrompt {
  prompt: string;
  genre: string;
}

const year2Generators: Array<{ fn: () => string; genre: string }> = [
  { fn: year2NarrativePrompt, genre: '📖 Narrative' },
  { fn: year2NarrativePrompt, genre: '📖 Narrative' }, // weighted double for narratives
  { fn: year2DescriptivePrompt, genre: '🎨 Descriptive' },
  { fn: year2LetterPrompt, genre: '✉️ Letter' },
  { fn: year2ImaginativePrompt, genre: '🌟 Imaginative' },
];

const year3Generators: Array<{ fn: () => string; genre: string }> = [
  { fn: year3NarrativePrompt, genre: '📖 Narrative' },
  { fn: year3PersuasivePrompt, genre: '💬 Persuasive' },
  { fn: year3ProceduralPrompt, genre: '🔧 Procedural' },
  { fn: year3DescriptivePrompt, genre: '🎨 Descriptive' },
  { fn: year3LetterPrompt, genre: '✉️ Letter' },
];

export function generateWritingPrompts(yearLevel: 2 | 3, count = 4): WritingPrompt[] {
  const generators = yearLevel === 2 ? year2Generators : year3Generators;
  // Shuffle and cycle so we get variety across genres
  const shuffled = [...generators].sort(() => Math.random() - 0.5);
  const results: WritingPrompt[] = [];
  for (let i = 0; i < count; i++) {
    const gen = shuffled[i % shuffled.length];
    results.push({ prompt: gen.fn(), genre: gen.genre });
  }
  return results;
}

export function getReadingsByYear(yearLevel: 2 | 3): ReadingPage[] {
  return challengingReadings.filter(r => r.yearLevel === yearLevel);
}

// Keep for backwards compat — returns static prompts in WritingPrompt shape
export function getWritingTasksByYear(yearLevel: 2 | 3): WritingPrompt[] {
  return generateWritingPrompts(yearLevel, 4);
}
