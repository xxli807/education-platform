// Template-based science question generator.
// Each FactSet holds one concept with multiple question variants.
// 120+ fact sets × ~3 variants each = 360+ unique questions per call to generate.

export interface ScienceQuestion {
  id: number;
  text: string;
  answer: string;
  topic: string;
  yearLevel: 2 | 3;
}

export type YearLevel = 2 | 3;

interface FactSet {
  topic: string;
  yearLevel: YearLevel;
  variants: { question: string; answer: string }[];
}

// ─── YEAR 2 FACTS ────────────────────────────────────────────────────────────

const year2Facts: FactSet[] = [
  // Living Things – Plants
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'What do plants need to grow?', answer: 'Water' },
    { question: 'Name one thing that all plants need.', answer: 'Water' },
    { question: 'What do you give a plant to help it grow?', answer: 'Water' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'What do plants grow from?', answer: 'Seeds' },
    { question: 'What do you plant in soil to grow a new flower?', answer: 'Seeds' },
    { question: 'A tiny object that grows into a plant is called a what?', answer: 'Seed' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'Which part of a plant holds it in the ground?', answer: 'Roots' },
    { question: 'What part of a plant drinks water from the soil?', answer: 'Roots' },
    { question: 'What anchors a plant in the earth?', answer: 'Roots' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'Which part of a plant carries water up to the leaves?', answer: 'Stem' },
    { question: 'What is the long thin stalk of a plant called?', answer: 'Stem' },
    { question: 'Water travels up through which part of a plant?', answer: 'Stem' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'Which flat green part of a plant soaks up sunlight?', answer: 'Leaf' },
    { question: 'What is the flat green part of a plant?', answer: 'Leaf' },
    { question: 'Plants make food in their what?', answer: 'Leaves' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'Which colourful part of a plant attracts bees?', answer: 'Flower' },
    { question: 'What part of a plant makes seeds?', answer: 'Flower' },
    { question: 'Bees collect nectar from which part of a plant?', answer: 'Flower' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'What do plants need from the sky to make food?', answer: 'Sunlight' },
    { question: 'Which type of light helps plants make their own food?', answer: 'Sunlight' },
    { question: 'Plants use what to make their own food?', answer: 'Sunlight' },
  ]},
  { topic: 'Plants', yearLevel: 2, variants: [
    { question: 'What grows from a seed inside a fruit?', answer: 'Plant' },
    { question: 'What part of a plant holds seeds inside it?', answer: 'Fruit' },
    { question: 'An apple is the __ of an apple tree.', answer: 'Fruit' },
  ]},

  // Living Things – Animals
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby kangaroo called?', answer: 'Joey' },
    { question: 'What do we call a very young kangaroo?', answer: 'Joey' },
    { question: 'A joey is a baby which animal?', answer: 'Kangaroo' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby dog called?', answer: 'Puppy' },
    { question: 'What do we call a young dog?', answer: 'Puppy' },
    { question: 'A young dog is called a what?', answer: 'Puppy' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby cat called?', answer: 'Kitten' },
    { question: 'What do we call a very young cat?', answer: 'Kitten' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby frog called?', answer: 'Tadpole' },
    { question: 'A tadpole grows up to become what animal?', answer: 'Frog' },
    { question: 'Before it has legs, a young frog is called a what?', answer: 'Tadpole' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby bear called?', answer: 'Cub' },
    { question: 'What do we call a young bear?', answer: 'Cub' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby duck called?', answer: 'Duckling' },
    { question: 'What do we call a young duck?', answer: 'Duckling' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby sheep called?', answer: 'Lamb' },
    { question: 'What do we call a young sheep?', answer: 'Lamb' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What do caterpillars turn into?', answer: 'Butterfly' },
    { question: 'A caterpillar wraps in a cocoon and becomes what?', answer: 'Butterfly' },
    { question: 'Which beautiful insect starts life as a caterpillar?', answer: 'Butterfly' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'Which animal has eight legs?', answer: 'Spider' },
    { question: 'What creature spins a web to catch insects?', answer: 'Spider' },
    { question: 'An insect has six legs. How many legs does a spider have?', answer: '8' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'Which animal has a long neck?', answer: 'Giraffe' },
    { question: 'What is the tallest land animal in the world?', answer: 'Giraffe' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'Which animal has black and white stripes?', answer: 'Zebra' },
    { question: 'What African animal looks like a striped horse?', answer: 'Zebra' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'Which animal has a trunk?', answer: 'Elephant' },
    { question: 'What is the largest land animal?', answer: 'Elephant' },
    { question: 'Which animal uses its long nose like a hand?', answer: 'Elephant' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'Where do bees live?', answer: 'Hive' },
    { question: 'What do we call a bee\'s home?', answer: 'Hive' },
    { question: 'Bees make honey inside a what?', answer: 'Hive' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What do bees make?', answer: 'Honey' },
    { question: 'Which sweet food is made by bees?', answer: 'Honey' },
  ]},
  { topic: 'Animals', yearLevel: 2, variants: [
    { question: 'What is a baby rabbit called?', answer: 'Kitten' },
    { question: 'What do we call a young rabbit?', answer: 'Kit' },
  ]},

  // Australian Animals
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which large Australian bird cannot fly?', answer: 'Emu' },
    { question: 'Name Australia\'s tallest native bird.', answer: 'Emu' },
    { question: 'Australia\'s coat of arms features a kangaroo and which bird?', answer: 'Emu' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian animal lays eggs but is not a bird?', answer: 'Platypus' },
    { question: 'Which Australian animal has a bill like a duck and lays eggs?', answer: 'Platypus' },
    { question: 'The duck-billed platypus lives in which country?', answer: 'Australia' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian bird is known for its laughing call?', answer: 'Kookaburra' },
    { question: 'Which bird sounds like it is laughing?', answer: 'Kookaburra' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian animal has spines like a pincushion?', answer: 'Echidna' },
    { question: 'Name the spiny Australian animal that lays eggs.', answer: 'Echidna' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian animal sleeps in eucalyptus trees all day?', answer: 'Koala' },
    { question: 'Which fluffy Australian animal eats only gum leaves?', answer: 'Koala' },
    { question: 'Koalas carry their babies in a what?', answer: 'Pouch' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian animal digs tunnels and has a flat nose?', answer: 'Wombat' },
    { question: 'What chunky Australian animal lives underground?', answer: 'Wombat' },
  ]},
  { topic: 'Australian Animals', yearLevel: 2, variants: [
    { question: 'Which Australian animal hops on two legs and has a pouch?', answer: 'Kangaroo' },
    { question: 'Name Australia\'s most famous hopping animal.', answer: 'Kangaroo' },
  ]},

  // Earth & Space (Year 2)
  { topic: 'Earth & Space', yearLevel: 2, variants: [
    { question: 'What is the colour of the sky on a clear sunny day?', answer: 'Blue' },
    { question: 'Why does the sky look blue?', answer: 'Sunlight' },
  ]},
  { topic: 'Earth & Space', yearLevel: 2, variants: [
    { question: 'What is the Sun?', answer: 'Star' },
    { question: 'The Sun is actually a giant what?', answer: 'Star' },
    { question: 'Which star is closest to Earth?', answer: 'Sun' },
  ]},
  { topic: 'Earth & Space', yearLevel: 2, variants: [
    { question: 'What gives us light at night?', answer: 'Moon' },
    { question: 'What do we see in the sky at night that reflects the Sun\'s light?', answer: 'Moon' },
    { question: 'The Moon travels around which planet?', answer: 'Earth' },
  ]},
  { topic: 'Earth & Space', yearLevel: 2, variants: [
    { question: 'What shape is the Earth?', answer: 'Round' },
    { question: 'Is the Earth flat or round?', answer: 'Round' },
    { question: 'What shape is our planet?', answer: 'Sphere' },
  ]},
  { topic: 'Earth & Space', yearLevel: 2, variants: [
    { question: 'What do we see twinkling in the sky at night?', answer: 'Stars' },
    { question: 'The Sun is one of billions of what in the universe?', answer: 'Stars' },
  ]},

  // Weather & Seasons
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'Which is the hottest season of the year?', answer: 'Summer' },
    { question: 'In which season is it usually hottest?', answer: 'Summer' },
    { question: 'When is the best time to go to the beach?', answer: 'Summer' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'Which season has falling leaves?', answer: 'Autumn' },
    { question: 'In which season do leaves change colour and fall?', answer: 'Autumn' },
    { question: 'The season after summer is called what?', answer: 'Autumn' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'In which season do flowers bloom and birds sing?', answer: 'Spring' },
    { question: 'Which season comes after winter?', answer: 'Spring' },
    { question: 'When is the best time to plant seeds?', answer: 'Spring' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'What is water falling from the sky called?', answer: 'Rain' },
    { question: 'When clouds get too heavy with water, what falls?', answer: 'Rain' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'What do we see in the sky after rain on a sunny day?', answer: 'Rainbow' },
    { question: 'Which colourful arc appears in the sky after rain?', answer: 'Rainbow' },
    { question: 'Sunlight shining through raindrops makes a what?', answer: 'Rainbow' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'What is it called when the air moves fast?', answer: 'Wind' },
    { question: 'What makes a kite fly in the sky?', answer: 'Wind' },
    { question: 'What moving air do we feel on a breezy day?', answer: 'Wind' },
  ]},
  { topic: 'Weather & Seasons', yearLevel: 2, variants: [
    { question: 'What is the frozen form of water called?', answer: 'Ice' },
    { question: 'What does water turn into when it gets very cold?', answer: 'Ice' },
    { question: 'Ice is water in which state?', answer: 'Solid' },
  ]},

  // Materials & Forces (Year 2)
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'What force keeps us on the ground?', answer: 'Gravity' },
    { question: 'What pulls objects down to the ground?', answer: 'Gravity' },
    { question: 'Why do things fall when you drop them?', answer: 'Gravity' },
  ]},
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'What do we need to breathe to stay alive?', answer: 'Air' },
    { question: 'What gas do humans breathe in?', answer: 'Oxygen' },
    { question: 'What invisible substance fills up a balloon?', answer: 'Air' },
  ]},
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'Which material is a window made of?', answer: 'Glass' },
    { question: 'What see-through material is used to make windows?', answer: 'Glass' },
    { question: 'A mirror is made of what material?', answer: 'Glass' },
  ]},
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'What makes a shadow?', answer: 'Light' },
    { question: 'A shadow forms when an object blocks what?', answer: 'Light' },
    { question: 'Why do we see shadows outdoors?', answer: 'Sunlight' },
  ]},
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'What material is most furniture made from?', answer: 'Wood' },
    { question: 'Which natural material comes from trees?', answer: 'Wood' },
    { question: 'Paper is made from what material?', answer: 'Wood' },
  ]},
  { topic: 'Materials & Forces', yearLevel: 2, variants: [
    { question: 'What do we measure temperature with?', answer: 'Thermometer' },
    { question: 'Which tool tells us how hot or cold something is?', answer: 'Thermometer' },
  ]},
];

// ─── YEAR 3 FACTS ────────────────────────────────────────────────────────────

const year3Facts: FactSet[] = [
  // Living Things & Ecosystems
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What gas do plants breathe in?', answer: 'Carbon dioxide' },
    { question: 'Plants take in which gas to make food?', answer: 'Carbon dioxide' },
    { question: 'What gas do humans breathe out that plants need?', answer: 'Carbon dioxide' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What gas do plants release into the air?', answer: 'Oxygen' },
    { question: 'Which gas do plants produce during photosynthesis?', answer: 'Oxygen' },
    { question: 'Plants produce which gas that humans need to breathe?', answer: 'Oxygen' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What do we call animals that eat only plants?', answer: 'Herbivores' },
    { question: 'A cow eats only grass. What type of animal is it?', answer: 'Herbivore' },
    { question: 'Plant-eating animals are called what?', answer: 'Herbivores' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What do we call animals that eat only other animals?', answer: 'Carnivores' },
    { question: 'A lion eats only meat. What type of animal is it?', answer: 'Carnivore' },
    { question: 'Meat-eating animals are called what?', answer: 'Carnivores' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What do we call animals that eat both plants and animals?', answer: 'Omnivores' },
    { question: 'Humans eat both plants and animals. What does that make us?', answer: 'Omnivores' },
    { question: 'What is a bear, which eats both berries and fish?', answer: 'Omnivore' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What is the place where an animal naturally lives called?', answer: 'Habitat' },
    { question: 'A polar bear\'s natural home is called its what?', answer: 'Habitat' },
    { question: 'The environment where a plant or animal lives is its what?', answer: 'Habitat' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What do we call the young form of an insect before it becomes an adult?', answer: 'Larva' },
    { question: 'A caterpillar is the __ stage of a butterfly.', answer: 'Larva' },
    { question: 'Before a beetle becomes an adult it passes through which stage?', answer: 'Larva' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What is the process called where a caterpillar becomes a butterfly?', answer: 'Metamorphosis' },
    { question: 'What word describes the dramatic change from caterpillar to butterfly?', answer: 'Metamorphosis' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What is a food chain?', answer: 'The order in which animals eat each other' },
    { question: 'Grass → grasshopper → frog → snake is an example of a what?', answer: 'Food chain' },
    { question: 'What do we call the feeding relationships between animals and plants?', answer: 'Food chain' },
  ]},
  { topic: 'Living Things', yearLevel: 3, variants: [
    { question: 'What is the process by which plants make their own food using sunlight?', answer: 'Photosynthesis' },
    { question: 'Plants use sunlight, water and carbon dioxide to do what?', answer: 'Photosynthesis' },
    { question: 'What is the name of the process where plants make food from sunlight?', answer: 'Photosynthesis' },
  ]},

  // Human Body
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'Which organ pumps blood around your body?', answer: 'Heart' },
    { question: 'What organ beats in your chest to move blood?', answer: 'Heart' },
    { question: 'Blood is pumped by which organ?', answer: 'Heart' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'Which organs do you use to breathe?', answer: 'Lungs' },
    { question: 'Air goes into which organs when you breathe in?', answer: 'Lungs' },
    { question: 'What do we call the two organs in your chest that help you breathe?', answer: 'Lungs' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'What is the largest organ of the human body?', answer: 'Skin' },
    { question: 'Which organ covers the outside of your body?', answer: 'Skin' },
    { question: 'Skin is our body\'s largest what?', answer: 'Organ' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'What do we call the tubes that carry blood around the body?', answer: 'Blood vessels' },
    { question: 'Arteries and veins are types of what?', answer: 'Blood vessels' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'How many bones does the adult human body have?', answer: '206' },
    { question: 'Approximately how many bones are in the human body?', answer: '206' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'Which organ in your body controls everything you do?', answer: 'Brain' },
    { question: 'What organ sends messages to all parts of the body?', answer: 'Brain' },
    { question: 'Thinking, feeling and moving are all controlled by the what?', answer: 'Brain' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'What do we call the framework of bones in the body?', answer: 'Skeleton' },
    { question: 'All the bones in the body together form the what?', answer: 'Skeleton' },
    { question: 'The skeleton protects your organs and helps you do what?', answer: 'Move' },
  ]},
  { topic: 'Human Body', yearLevel: 3, variants: [
    { question: 'What pulls on bones to make them move?', answer: 'Muscles' },
    { question: 'When you exercise, which tissues in your body get stronger?', answer: 'Muscles' },
    { question: 'Muscles are attached to bones by what?', answer: 'Tendons' },
  ]},

  // Earth & Space (Year 3)
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'Which is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'What planet is famous for its Great Red Spot storm?', answer: 'Jupiter' },
    { question: 'Jupiter is bigger than all other planets combined. True or false?', answer: 'True' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
    { question: 'Which planet is fourth from the Sun?', answer: 'Mars' },
    { question: 'Scientists have sent rovers to explore which planet?', answer: 'Mars' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'How many planets are in our solar system?', answer: '8' },
    { question: 'Can you name how many planets orbit the Sun?', answer: '8' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'What is the path the Earth takes around the Sun called?', answer: 'Orbit' },
    { question: 'How long does Earth take to orbit the Sun once?', answer: '365 days' },
    { question: 'The Moon\'s path around the Earth is called its what?', answer: 'Orbit' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'What is the spinning of the Earth on its axis called?', answer: 'Rotation' },
    { question: 'What causes day and night?', answer: 'Earth\'s rotation' },
    { question: 'Earth makes one full rotation every how many hours?', answer: '24' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'What is a group of stars forming a pattern in the sky called?', answer: 'Constellation' },
    { question: 'The Southern Cross is a famous what?', answer: 'Constellation' },
    { question: 'Orion and Scorpius are examples of what?', answer: 'Constellations' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'What is a very dry place with very little rain called?', answer: 'Desert' },
    { question: 'Most deserts are very hot during the day. True or false?', answer: 'True' },
    { question: 'The Sahara is the world\'s largest what?', answer: 'Desert' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'What do we call a dense forest with heavy rainfall?', answer: 'Rainforest' },
    { question: 'The Amazon is the world\'s largest what?', answer: 'Rainforest' },
    { question: 'Which type of forest is home to the most animal species?', answer: 'Rainforest' },
  ]},
  { topic: 'Earth & Space', yearLevel: 3, variants: [
    { question: 'Which layer of gas surrounds the Earth?', answer: 'Atmosphere' },
    { question: 'What protects Earth from harmful rays from the Sun?', answer: 'Atmosphere' },
    { question: 'Clouds, wind and rain all happen in Earth\'s what?', answer: 'Atmosphere' },
  ]},

  // Forces & Energy
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What slows down a moving object by rubbing against it?', answer: 'Friction' },
    { question: 'Why does a ball rolling on carpet stop faster than on tile?', answer: 'Friction' },
    { question: 'Friction between tyres and road helps cars do what?', answer: 'Stop' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What force makes objects float in water?', answer: 'Buoyancy' },
    { question: 'What upward force stops a boat from sinking?', answer: 'Buoyancy' },
    { question: 'Why does a rubber duck float in water?', answer: 'Buoyancy' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What do we see as bright flashes during a thunderstorm?', answer: 'Lightning' },
    { question: 'Lightning is a giant spark of what?', answer: 'Electricity' },
    { question: 'Thunder is the sound made by what?', answer: 'Lightning' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What form of energy does the Sun give us?', answer: 'Heat and light' },
    { question: 'Solar panels collect which type of energy from the Sun?', answer: 'Solar energy' },
    { question: 'What do solar panels convert sunlight into?', answer: 'Electricity' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What tool splits white light into rainbow colours?', answer: 'Prism' },
    { question: 'When light passes through a prism it splits into how many colours?', answer: '7' },
    { question: 'A rainbow shows that white light is made of how many colours?', answer: '7' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What force makes a rocket lift off the ground?', answer: 'Thrust' },
    { question: 'Rockets push hot gases down to create which force?', answer: 'Thrust' },
  ]},
  { topic: 'Forces & Energy', yearLevel: 3, variants: [
    { question: 'What is the energy stored in food called?', answer: 'Chemical energy' },
    { question: 'Our bodies turn food into which type of energy?', answer: 'Chemical energy' },
    { question: 'Batteries store which kind of energy?', answer: 'Chemical energy' },
  ]},

  // Materials & States of Matter
  { topic: 'Materials', yearLevel: 3, variants: [
    { question: 'What are the three states of matter?', answer: 'Solid, liquid, gas' },
    { question: 'Ice, water and steam are the same substance in how many states?', answer: '3' },
    { question: 'Name the three forms that matter can exist in.', answer: 'Solid liquid gas' },
  ]},
  { topic: 'Materials', yearLevel: 3, variants: [
    { question: 'What happens to water when it is heated to 100°C?', answer: 'It boils' },
    { question: 'At what temperature does water boil?', answer: '100 degrees' },
    { question: 'Water turns to steam at which temperature?', answer: '100 degrees Celsius' },
  ]},
  { topic: 'Materials', yearLevel: 3, variants: [
    { question: 'At what temperature does water freeze?', answer: '0 degrees Celsius' },
    { question: 'Water turns to ice at which temperature?', answer: '0 degrees' },
    { question: 'Below which temperature does liquid water become solid ice?', answer: '0 degrees Celsius' },
  ]},
  { topic: 'Materials', yearLevel: 3, variants: [
    { question: 'What is it called when a solid turns directly into a gas?', answer: 'Sublimation' },
    { question: 'What is it called when a gas cools and turns into liquid?', answer: 'Condensation' },
    { question: 'Dew on grass in the morning is an example of what?', answer: 'Condensation' },
  ]},
  { topic: 'Materials', yearLevel: 3, variants: [
    { question: 'What property makes metals useful for making cooking pots?', answer: 'Heat conduction' },
    { question: 'Which material conducts electricity well?', answer: 'Metal' },
    { question: 'Why are wires made from copper or aluminium?', answer: 'They conduct electricity' },
  ]},

  // Measurement & Tools
  { topic: 'Measurement', yearLevel: 3, variants: [
    { question: 'Which tool measures temperature?', answer: 'Thermometer' },
    { question: 'A thermometer measures what?', answer: 'Temperature' },
    { question: 'What unit do we use to measure temperature?', answer: 'Degrees Celsius' },
  ]},
  { topic: 'Measurement', yearLevel: 3, variants: [
    { question: 'Which tool makes tiny objects look larger?', answer: 'Microscope' },
    { question: 'Scientists use a microscope to see what?', answer: 'Very small things' },
    { question: 'A microscope uses lenses to do what?', answer: 'Magnify' },
  ]},
  { topic: 'Measurement', yearLevel: 3, variants: [
    { question: 'Which tool lets you see distant stars and planets?', answer: 'Telescope' },
    { question: 'Astronomers use a telescope to study what?', answer: 'Stars and planets' },
    { question: 'A telescope makes far-away objects appear how?', answer: 'Closer' },
  ]},
  { topic: 'Measurement', yearLevel: 3, variants: [
    { question: 'What unit do we use to measure length?', answer: 'Metres' },
    { question: 'We measure the length of a room in what unit?', answer: 'Metres' },
    { question: 'One thousand metres equals one what?', answer: 'Kilometre' },
  ]},
  { topic: 'Measurement', yearLevel: 3, variants: [
    { question: 'What unit do we use to measure mass?', answer: 'Kilograms' },
    { question: 'We measure how heavy something is in what unit?', answer: 'Kilograms' },
    { question: 'One thousand grams equals one what?', answer: 'Kilogram' },
  ]},

  // Australian Nature (Year 3)
  { topic: 'Australian Animals', yearLevel: 3, variants: [
    { question: 'Which tree do koalas eat from?', answer: 'Eucalyptus' },
    { question: 'Eucalyptus leaves are eaten by which Australian animal?', answer: 'Koala' },
    { question: 'Another name for the eucalyptus tree is what?', answer: 'Gum tree' },
  ]},
  { topic: 'Australian Animals', yearLevel: 3, variants: [
    { question: 'What is Australia\'s national flower?', answer: 'Wattle' },
    { question: 'The golden wattle is the national symbol of which country?', answer: 'Australia' },
  ]},
  { topic: 'Australian Animals', yearLevel: 3, variants: [
    { question: 'Which smiling Australian marsupial lives on Rottnest Island?', answer: 'Quokka' },
    { question: 'The quokka is found mainly on which Australian island?', answer: 'Rottnest Island' },
  ]},
  { topic: 'Australian Animals', yearLevel: 3, variants: [
    { question: 'What is the Great Barrier Reef made of?', answer: 'Coral' },
    { question: 'The Great Barrier Reef is the world\'s largest what?', answer: 'Coral reef' },
    { question: 'Where is the Great Barrier Reef located?', answer: 'Australia' },
  ]},
  { topic: 'Australian Animals', yearLevel: 3, variants: [
    { question: 'Which Australian bird mimics other birds\' songs?', answer: 'Lyrebird' },
    { question: 'The lyrebird is famous for its ability to do what?', answer: 'Mimic sounds' },
  ]},
];

// ─── GENERATION ENGINE ────────────────────────────────────────────────────────

const allFacts: FactSet[] = [...year2Facts, ...year3Facts];

/** Build the full flat pool for a year level */
function buildPool(yearLevel: YearLevel): Array<{ question: string; answer: string; topic: string; yearLevel: YearLevel }> {
  return allFacts
    .filter(f => f.yearLevel === yearLevel)
    .flatMap(f =>
      f.variants.map(v => ({
        question: v.question,
        answer: v.answer,
        topic: f.topic,
        yearLevel: f.yearLevel,
      }))
    );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

export function getRandomQuestionsByYear(yearLevel: YearLevel, count: number): ScienceQuestion[] {
  const pool = shuffle(buildPool(yearLevel));
  return pool.slice(0, count).map((q, i) => ({ id: i + 1, text: q.question, answer: q.answer, topic: q.topic, yearLevel: q.yearLevel }));
}

export function getRandomQuestionsByTopic(yearLevel: YearLevel, topic: string, count: number): ScienceQuestion[] {
  const pool = shuffle(
    allFacts
      .filter(f => f.yearLevel === yearLevel && f.topic === topic)
      .flatMap(f => f.variants.map(v => ({ question: v.question, answer: v.answer, topic: f.topic, yearLevel: f.yearLevel })))
  );
  return pool.slice(0, count).map((q, i) => ({ id: i + 1, text: q.question, answer: q.answer, topic: q.topic, yearLevel: q.yearLevel }));
}

export function getTopicsForYear(yearLevel: YearLevel): string[] {
  return [...new Set(allFacts.filter(f => f.yearLevel === yearLevel).map(f => f.topic))];
}

/** How many unique questions exist for a year level */
export function getQuestionCount(yearLevel: YearLevel): number {
  return buildPool(yearLevel).length;
}
