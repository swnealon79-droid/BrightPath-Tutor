export const SUBJECTS = ["Math", "Reading", "Writing", "Science", "Social Studies"] as const;

export type Subject = (typeof SUBJECTS)[number];
export type Grade = 1 | 2 | 3 | 4 | 5;

export type TutorQuestion = {
  id: string;
  grade: Grade;
  subject: Subject;
  skill: string;
  title: string;
  prompt: string;
  choices: string[];
  answer: string;
  hint: string;
  explanation: string;
};

export type ActivityAttempt = {
  id: string;
  questionId: string;
  subject: Subject;
  answer: string;
  isCorrect: boolean;
  usedHint: boolean;
  completedAt: string;
};

export const SUBJECT_META: Record<Subject, { icon: string; color: string; pale: string; description: string }> = {
  Math: {
    icon: "calculate",
    color: "#2563EB",
    pale: "#DBEAFE",
    description: "Numbers, patterns, and problem solving",
  },
  Reading: {
    icon: "menu-book",
    color: "#0F766E",
    pale: "#CCFBF1",
    description: "Stories, meaning, and vocabulary",
  },
  Writing: {
    icon: "edit-note",
    color: "#7C3AED",
    pale: "#EDE9FE",
    description: "Ideas, sentences, and clear expression",
  },
  Science: {
    icon: "science",
    color: "EA580C",
    pale: "#FFEDD5",
    description: "Questions, evidence, and discovery",
  },
  "Social Studies": {
    icon: "public",
    color: "#B45309",
    pale: "#FEF3C7",
    description: "Communities, history, and the world",
  },
};

const QUESTION_BANK: Record<Grade, TutorQuestion[]> = {
  1: [
    {
      id: "g1-math-add",
      grade: 1,
      subject: "Math",
      skill: "Add within 20",
      title: "Apple Basket",
      prompt: "Mia has 8 apples. Her neighbor gives her 7 more. How many apples does Mia have now?",
      choices: ["14", "15", "16", "17"],
      answer: "15",
      hint: "Start with 8, then count 7 more numbers: 9, 10, 11...",
      explanation: "Starting at 8 and counting 7 more gives 15. Great job combining two groups!",
    },
    {
      id: "g1-reading-sound",
      grade: 1,
      subject: "Reading",
      skill: "Beginning sounds",
      title: "First Sound",
      prompt: "Which word begins with the same sound as sun?",
      choices: ["sock", "moon", "kite", "fish"],
      answer: "sock",
      hint: "Say sun slowly. What sound do you hear first?",
      explanation: "Sun and sock both begin with the /s/ sound.",
    },
    {
      id: "g1-writing-sentence",
      grade: 1,
      subject: "Writing",
      skill: "Sentence punctuation",
      title: "Finish the Sentence",
      prompt: "Which sentence is written correctly?",
      choices: ["i like to read books", "I like to read books.", "I like to read books", "i like to read books."],
      answer: "I like to read books.",
      hint: "A sentence starts with a capital letter and ends with punctuation.",
      explanation: "This choice begins with a capital I and ends with a period.",
    },
    {
      id: "g1-science-weather",
      grade: 1,
      subject: "Science",
      skill: "Weather observations",
      title: "Cloud Watch",
      prompt: "Which tool helps us know how warm or cold the air is?",
      choices: ["thermometer", "ruler", "paintbrush", "spoon"],
      answer: "thermometer",
      hint: "It measures temperature.",
      explanation: "A thermometer measures temperature, which tells how warm or cold something is.",
    },
    {
      id: "g1-social-help",
      grade: 1,
      subject: "Social Studies",
      skill: "Community helpers",
      title: "Helpful Neighbors",
      prompt: "Who helps put out fires to keep a community safe?",
      choices: ["firefighter", "librarian", "baker", "artist"],
      answer: "firefighter",
      hint: "This helper uses a fire truck and special safety gear.",
      explanation: "Firefighters help protect people and places when there is a fire.",
    },

    {
      id: "g1-math-subtract",
      grade: 1,
      subject: "Math",
      skill: "Subtract within 20",
      title: "Snack Time",
      prompt: "Liam has 13 crackers. He eats 5. How many crackers are left?",
      choices: ["6", "7", "8", "9"],
      answer: "8",
      hint: "Start at 13 and count back 5.",
      explanation: "13 minus 5 equals 8."
    },
    {
      id: "g1-math-missing-number",
      grade: 1,
      subject: "Math",
      skill: "Missing numbers",
      title: "Number Train",
      prompt: "What number is missing? 6, 7, __, 9",
      choices: ["5", "8", "10", "11"],
      answer: "8",
      hint: "Count forward one number at a time.",
      explanation: "The number after 7 is 8."
    },
    {
      id: "g1-math-compare",
      grade: 1,
      subject: "Math",
      skill: "Compare numbers",
      title: "Which Is Greater?",
      prompt: "Which number is greater?",
      choices: ["12", "17", "9", "6"],
      answer: "17",
      hint: "The greater number has the larger value.",
      explanation: "17 is greater than 12, 9, and 6."
    },
    {
      id: "g1-math-word-problem",
      grade: 1,
      subject: "Math",
      skill: "Addition word problems",
      title: "Toy Cars",
      prompt: "Noah has 6 toy cars and gets 4 more. How many toy cars does he have now?",
      choices: ["8", "9", "10", "11"],
      answer: "10",
      hint: "Add 6 and 4 together.",
      explanation: "6 plus 4 equals 10."
    },
    {
      id: "g1-math-make-ten",
      grade: 1,
      subject: "Math",
      skill: "Make 10",
      title: "Make Ten",
      prompt: "What number goes with 7 to make 10?",
      choices: ["2", "3", "4", "5"],
      answer: "3",
      hint: "Count from 7 up to 10.",
      explanation: "7 plus 3 equals 10."
    },

  ],
  2: [
    {
      id: "g2-math-groups",
      grade: 2,
      subject: "Math",
      skill: "Equal groups",
      title: "Garden Rows",
      prompt: "There are 4 rows with 3 flowers in each row. How many flowers are there altogether?",
      choices: ["7", "10", "12", "14"],
      answer: "12",
      hint: "Add 3 four times: 3 + 3 + 3 + 3.",
      explanation: "Four equal groups of 3 make 12 flowers.",
    },
    {
      id: "g2-reading-mainidea",
      grade: 2,
      subject: "Reading",
      skill: "Main idea",
      title: "Best Title",
      prompt: "A passage tells how bees visit flowers, collect nectar, and make honey. What is the best main idea?",
      choices: ["Bees make honey", "Flowers are colorful", "Nectar is sticky", "Bees are yellow"],
      answer: "Bees make honey",
      hint: "Choose the idea that covers most of what the passage is about.",
      explanation: "The details about visiting flowers and collecting nectar support the main idea that bees make honey.",
    },
    {
      id: "g2-writing-adjective",
      grade: 2,
      subject: "Writing",
      skill: "Describing words",
      title: "Add Detail",
      prompt: "Which word is an adjective that can describe a kite?",
      choices: ["bright", "fly", "quickly", "because"],
      answer: "bright",
      hint: "An adjective tells more about a noun.",
      explanation: "Bright describes what kind of kite it is.",
    },
    {
      id: "g2-science-plants",
      grade: 2,
      subject: "Science",
      skill: "Plant needs",
      title: "Growing Seed",
      prompt: "What does a plant need to grow?",
      choices: ["water and light", "a video game", "a backpack", "a pencil"],
      answer: "water and light",
      hint: "Think about what plants use outside in a garden.",
      explanation: "Plants need resources such as water and light to grow.",
    },
    {
      id: "g2-social-map",
      grade: 2,
      subject: "Social Studies",
      skill: "Map symbols",
      title: "Map Key",
      prompt: "What helps a reader understand what symbols on a map mean?",
      choices: ["map key", "table of contents", "recipe", "calendar"],
      answer: "map key",
      hint: "It is a small guide that explains map pictures and colors.",
      explanation: "A map key, also called a legend, explains the symbols used on a map.",
    },
  ],
  3: [
    {
      id: "g3-math-fractions",
      grade: 3,
      subject: "Math",
      skill: "Fractions as parts of a whole",
      title: "Pizza Pieces",
      prompt: "A pizza is cut into 4 equal slices. Sam eats 3 slices. What fraction of the pizza did Sam eat?",
      choices: ["1/4", "2/4", "3/4", "4/3"],
      answer: "3/4",
      hint: "The top number counts slices eaten. The bottom number counts all equal slices.",
      explanation: "Sam ate 3 of the 4 equal slices, so the fraction is 3/4.",
    },
    {
      id: "g3-reading-context",
      grade: 3,
      subject: "Reading",
      skill: "Context clues",
      title: "Word Detective",
      prompt: "In the sentence “The tiny ant carried a crumb,” what does tiny mean?",
      choices: ["very small", "very loud", "very old", "very fast"],
      answer: "very small",
      hint: "Think about how an ant compares in size to a crumb.",
      explanation: "Tiny means very small. The sentence gives a clue by describing an ant.",
    },
    {
      id: "g3-writing-topic",
      grade: 3,
      subject: "Writing",
      skill: "Topic sentences",
      title: "Start Strong",
      prompt: "Which sentence is the best topic sentence for a paragraph about a favorite playground?",
      choices: ["My favorite playground has many fun places to explore.", "I went there yesterday at 3:00.", "The slide is made of metal.", "My shoes were blue."],
      answer: "My favorite playground has many fun places to explore.",
      hint: "A topic sentence introduces the big idea of the whole paragraph.",
      explanation: "This sentence introduces the main idea and leaves room for supporting details.",
    },
    {
      id: "g3-science-lifecycle",
      grade: 3,
      subject: "Science",
      skill: "Life cycles",
      title: "Butterfly Change",
      prompt: "Which stage comes after a caterpillar in a butterfly life cycle?",
      choices: ["chrysalis", "egg", "seed", "adult frog"],
      answer: "chrysalis",
      hint: "It is the resting, changing stage before the butterfly emerges.",
      explanation: "A caterpillar forms a chrysalis, where it changes into a butterfly.",
    },
    {
      id: "g3-social-government",
      grade: 3,
      subject: "Social Studies",
      skill: "Local government",
      title: "City Decisions",
      prompt: "Which is a job a local government may do?",
      choices: ["maintain local parks", "control the weather", "choose every meal", "make every toy"],
      answer: "maintain local parks",
      hint: "Think about services that help people in a town or city.",
      explanation: "Local governments often help care for shared places such as parks.",
    },
  ],
  4: [
    {
      id: "g4-math-multiply",
      grade: 4,
      subject: "Math",
      skill: "Multiplication facts",
      title: "Team Points",
      prompt: "A team scores 6 points in each of 7 rounds. How many points does the team score?",
      choices: ["36", "40", "42", "48"],
      answer: "42",
      hint: "Break 7 × 6 into 5 × 6 and 2 × 6.",
      explanation: "Five groups of 6 are 30 and two groups of 6 are 12. Together, 30 + 12 = 42.",
    },
    {
      id: "g4-reading-evidence",
      grade: 4,
      subject: "Reading",
      skill: "Text evidence",
      title: "Prove It",
      prompt: "A story says, “Lena packed an extra sandwich for the new student.” Which trait does this detail show?",
      choices: ["kind", "careless", "sleepy", "confused"],
      answer: "kind",
      hint: "Look at what Lena did for another person.",
      explanation: "Packing food for someone new is evidence that Lena is kind and thoughtful.",
    },
    {
      id: "g4-writing-transition",
      grade: 4,
      subject: "Writing",
      skill: "Transitions",
      title: "Connect Ideas",
      prompt: "Which transition best shows that something happens next?",
      choices: ["Next", "Because", "For example", "However"],
      answer: "Next",
      hint: "This word helps put events in order.",
      explanation: "Next signals the following step or event in a sequence.",
    },
    {
      id: "g4-science-energy",
      grade: 4,
      subject: "Science",
      skill: "Energy transfer",
      title: "Warm Sidewalk",
      prompt: "Why does a sidewalk feel warm on a sunny day?",
      choices: ["It absorbs energy from sunlight.", "It makes its own sunlight.", "It turns into water.", "It stops the wind."],
      answer: "It absorbs energy from sunlight.",
      hint: "Sunlight carries energy that can warm materials.",
      explanation: "The sidewalk absorbs energy from the Sun, making it feel warmer.",
    },
    {
      id: "g4-social-geography",
      grade: 4,
      subject: "Social Studies",
      skill: "Geographic regions",
      title: "Land and Water",
      prompt: "Which landform is a large area of flat land?",
      choices: ["plain", "mountain", "island", "canyon"],
      answer: "plain",
      hint: "It is usually broad and mostly level.",
      explanation: "A plain is a large area of flat or gently rolling land.",
    },
  ],
  5: [
    {
      id: "g5-math-decimals",
      grade: 5,
      subject: "Math",
      skill: "Fractions and decimals",
      title: "Decimal Match",
      prompt: "Which decimal is equal to 3/4?",
      choices: ["0.25", "0.5", "0.75", "1.25"],
      answer: "0.75",
      hint: "Think of fourths as 25 hundredths each.",
      explanation: "Three fourths is three groups of 0.25, which equals 0.75.",
    },
    {
      id: "g5-reading-theme",
      grade: 5,
      subject: "Reading",
      skill: "Theme",
      title: "Big Message",
      prompt: "In a story, a student practices a difficult song every day and finally performs it well. What is a likely theme?",
      choices: ["Practice can lead to improvement.", "Music is always easy.", "Only adults can perform.", "Songs need no practice."],
      answer: "Practice can lead to improvement.",
      hint: "A theme is a message that can apply beyond one story.",
      explanation: "The character’s steady effort and improvement support the theme that practice can lead to growth.",
    },
    {
      id: "g5-writing-claim",
      grade: 5,
      subject: "Writing",
      skill: "Opinion claims",
      title: "Make a Claim",
      prompt: "Which sentence states a clear opinion claim?",
      choices: ["Our school should add more shaded places on the playground.", "The playground opened in 1998.", "Many students play outside.", "I counted three trees."],
      answer: "Our school should add more shaded places on the playground.",
      hint: "A claim tells what you think should happen and can be supported with reasons.",
      explanation: "This sentence makes a position that a writer could support with reasons and evidence.",
    },
    {
      id: "g5-science-ecosystem",
      grade: 5,
      subject: "Science",
      skill: "Ecosystems",
      title: "Food Web",
      prompt: "In a food web, what is a producer?",
      choices: ["an organism that makes its own food", "an animal that eats only meat", "a rock in a habitat", "an animal that hunts"],
      answer: "an organism that makes its own food",
      hint: "Plants use sunlight to make food.",
      explanation: "Producers, such as plants, make their own food and provide energy for other organisms.",
    },
    {
      id: "g5-social-civics",
      grade: 5,
      subject: "Social Studies",
      skill: "Civic participation",
      title: "Community Voice",
      prompt: "Which action is one way people can share an idea about a community decision?",
      choices: ["attend a public meeting", "change a law alone", "ignore every rule", "take someone else’s vote"],
      answer: "attend a public meeting",
      hint: "This action lets community members listen and share respectful ideas.",
      explanation: "Public meetings provide a way for people to learn about and comment on local decisions.",
    },
  ],
};

export function getQuestionsForGrade(grade: Grade): TutorQuestion[] {
  return QUESTION_BANK[grade];
}

export function getQuestionById(grade: Grade, id: string): TutorQuestion | undefined {
  return QUESTION_BANK[grade].find((question) => question.id === id);
}

export function getQuestionForSubject(grade: Grade, subject: Subject): TutorQuestion {
  return QUESTION_BANK[grade].find((question) => question.subject === subject) ?? QUESTION_BANK[grade][0];
}

export function getRecommendedQuestion(grade: Grade, attempts: ActivityAttempt[]): TutorQuestion {
  const gradeQuestions = QUESTION_BANK[grade];
  const completedCorrectly = new Set(attempts.filter((attempt) => attempt.isCorrect).map((attempt) => attempt.questionId));
  return gradeQuestions.find((question) => !completedCorrectly.has(question.id)) ?? gradeQuestions[0];
}

export function getSubjectSummary(
  grade: Grade,
  subject: Subject,
  attempts: ActivityAttempt[],
): { completed: number; correct: number; confidence: number; nextQuestion: TutorQuestion } {
  const matchingAttempts = attempts.filter((attempt) => attempt.subject === subject);
  const completed = matchingAttempts.length;
  const correct = matchingAttempts.filter((attempt) => attempt.isCorrect).length;
  const confidence = completed === 0 ? 0 : Math.round((correct / completed) * 100);
  return { completed, correct, confidence, nextQuestion: getQuestionForSubject(grade, subject) };
}

export function getAchievementCount(attempts: ActivityAttempt[]): number {
  const completed = new Set(attempts.map((attempt) => attempt.questionId)).size;
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  return Number(completed >= 1) + Number(correct >= 3) + Number(completed >= 5);
}
