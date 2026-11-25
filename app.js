const STORAGE_KEY = "english-practice-offline-v1";

const pupils = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `participant-${number}`,
    name: `Elevkode ${number}`,
    avatar: number,
    beginner: true,
    dyslexiaSupport: true
  };
});

const skills = [
  { id: "vocabulary", name: "Ordforråd" },
  { id: "grammar", name: "Grammatikk" },
  { id: "reading", name: "Leseforståelse" }
];

const beginnerVocabulary = [
  ["sekk", "bag", "🎒"], ["bok", "book", "📕"], ["eple", "apple", "🍎"],
  ["ball", "ball", "⚽"], ["penn", "pen", "🖊️"], ["katt", "cat", "🐱"],
  ["hund", "dog", "🐶"], ["fisk", "fish", "🐟"], ["hest", "horse", "🐴"],
  ["ku", "cow", "🐄"], ["sau", "sheep", "🐑"], ["gris", "pig", "🐷"],
  ["kanin", "rabbit", "🐰"], ["fugl", "bird", "🐦"], ["søster", "sister", "👧"],
  ["bror", "brother", "👦"], ["mor", "mother", "👩"], ["far", "father", "👨"],
  ["barn", "child", "🧒"], ["baby", "baby", "👶"], ["venn", "friend", "🧑"],
  ["lærer", "teacher", "🧑‍🏫"], ["elev", "pupil", "🎒"], ["familie", "family", "👨‍👩‍👧"],
  ["bestemor", "grandmother", "👵"], ["bestefar", "grandfather", "👴"], ["hus", "house", "🏠"],
  ["rom", "room", "🚪"], ["kjøkken", "kitchen", "🍳"], ["bad", "bathroom", "🛁"],
  ["seng", "bed", "🛏️"], ["bord", "table", "🪑"], ["stol", "chair", "🪑"],
  ["dør", "door", "🚪"], ["vindu", "window", "🪟"], ["skole", "school", "🏫"],
  ["park", "park", "🌳"], ["butikk", "shop", "🏪"], ["bil", "car", "🚗"],
  ["buss", "bus", "🚌"], ["sykkel", "bike", "🚲"], ["fly", "plane", "✈️"],
  ["båt", "boat", "⛵"], ["tog", "train", "🚆"], ["sol", "sun", "☀️"],
  ["måne", "moon", "🌙"], ["stjerne", "star", "⭐"], ["himmel", "sky", "☁️"],
  ["regn", "rain", "🌧️"], ["snø", "snow", "❄️"], ["vind", "wind", "🍃"],
  ["sky", "cloud", "☁️"], ["brød", "bread", "🍞"], ["melk", "milk", "🥛"],
  ["ost", "cheese", "🧀"], ["vann", "water", "💧"], ["juice", "juice", "🧃"],
  ["ris", "rice", "🍚"], ["suppe", "soup", "🥣"], ["pasta", "pasta", "🍝"],
  ["kjøtt", "meat", "🥩"], ["banan", "banana", "🍌"], ["pære", "pear", "🍐"],
  ["sjokolade", "chocolate", "🍫"], ["kake", "cake", "🍰"], ["frokost", "breakfast", "🥣"],
  ["skjorte", "shirt", "👕"], ["bukser", "trousers", "👖"], ["sko", "shoe", "👟"],
  ["hatt", "hat", "🧢"], ["jakke", "jacket", "🧥"], ["kjole", "dress", "👗"],
  ["hånd", "hand", "✋"], ["fot", "foot", "🦶"], ["øye", "eye", "👁️"],
  ["øre", "ear", "👂"], ["nese", "nose", "👃"], ["munn", "mouth", "👄"],
  ["hår", "hair", "💇"], ["blomst", "flower", "🌼"], ["tre", "tree", "🌳"],
  ["gress", "grass", "🌱"], ["stein", "stone", "🪨"], ["blyant", "pencil", "✏️"],
  ["papir", "paper", "📄"], ["notatbok", "notebook", "📓"], ["linjal", "ruler", "📏"],
  ["datamaskin", "computer", "💻"], ["telefon", "phone", "📱"], ["gate", "street", "🛣️"],
  ["rød", "red", "🔴"], ["blå", "blue", "🔵"], ["grønn", "green", "🟢"],
  ["gul", "yellow", "🟡"], ["svart", "black", "⚫"], ["hvit", "white", "⚪"],
  ["oransje", "orange", "🟠"], ["rosa", "pink", "🩷"], ["brun", "brown", "🟤"],
  ["lilla", "purple", "🟣"]
];

function createAnswerPositions(count) {
  const positions = Array.from({ length: count }, (_, index) => index % 3);
  for (let index = positions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [positions[index], positions[swapIndex]] = [positions[swapIndex], positions[index]];
  }
  return positions;
}

function createBeginnerTasks() {
  const allCoreWords = beginnerVocabulary
    .filter((item, index, words) => words.findIndex(word => word[1] === item[1]) === index);
  const essentialWords = ["bag", "book", "apple", "ball", "pen", "cat", "dog"]
    .map(answer => allCoreWords.find(item => item[1] === answer))
    .filter(Boolean);
  const coreWords = [
    ...essentialWords,
    ...allCoreWords.filter(item => !essentialWords.includes(item)).slice(0, 100 - essentialWords.length)
  ];
  const vocabulary = coreWords;
  const englishPool = vocabulary.map(item => item[1]);
  const answerPositions = createAnswerPositions(vocabulary.length);
  return vocabulary.map((item, index) => {
    const [norwegian, answer, visual] = item;
    const alternatives = englishPool.filter(word => word !== answer);
    const first = alternatives[(index * 3) % alternatives.length];
    const second = alternatives[(index * 3 + 7) % alternatives.length];
    const options = ["", "", ""];
    const correctIndex = answerPositions[index];
    options[correctIndex] = answer;
    let distractorIndex = 0;
    const distractors = [first, second].filter(word => word !== answer);
    for (let position = 0; position < 3; position += 1) {
      if (position === correctIndex) continue;
      let distractor = distractors[distractorIndex % distractors.length];
      while (distractor === answer || options.includes(distractor)) {
        distractorIndex += 1;
        distractor = alternatives[distractorIndex % alternatives.length];
      }
      options[position] = distractor;
      distractorIndex += 1;
    }
    return {
      id: `scratch-${index + 1}-${answer}`,
      skill: "vocabulary",
      level: 1,
      title: "Startordforråd",
      question: `Velg det engelske ordet for «${norwegian}».`,
      spokenPrompt: `Velg det engelske ordet for ${norwegian}.`,
      visual,
      type: "choice",
      options,
      answer,
      hint: `Det engelske ordet er «${answer}».`
    };
  });
}

const tasks = [
  ...createBeginnerTasks(),
  {
    id: "vocab-1", skill: "vocabulary", level: 1, title: "Velg riktig ord",
    question: "A place where you read books is a ___.",
    type: "choice", options: ["library", "kitchen", "garden"], answer: "library",
    hint: "Dette er et sted i skolen eller i byen der du kan låne bøker."
  },
  {
    id: "grammar-1", skill: "grammar", level: 1, title: "Fullfør setningen",
    question: "She ___ at school.",
    type: "choice", options: ["is", "are", "am"], answer: "is",
    hint: "Bruk is sammen med she, he eller it."
  },
  {
    id: "reading-1", skill: "reading", level: 1, title: "Les og svar",
    question: "Sam has a red bike. The bike is in the garden. Where is the bike?",
    type: "choice", options: ["In the garden", "In the house", "At school"], answer: "In the garden",
    hint: "Finn stedet som står sist i setningen."
  },
  {
    id: "vocab-2", skill: "vocabulary", level: 2, title: "Skriv det riktige ordet",
    question: "I wear a ___ on my foot. (shoe)",
    type: "text", answer: "shoe",
    hint: "Ordet kan være både entall og en del av et par."
  },
  {
    id: "grammar-2", skill: "grammar", level: 2, title: "Velg riktig form",
    question: "Yesterday, we ___ football.",
    type: "choice", options: ["played", "play", "playing"], answer: "played",
    hint: "Når handlingen var i går, bruker vi ofte -ed på ordet."
  },
  {
    id: "reading-2", skill: "reading", level: 2, title: "Les og forstå",
    question: "It is raining, so Lena takes an umbrella before leaving home. Why does Lena take an umbrella?",
    type: "choice", options: ["To stay dry", "To carry books", "To make shade"], answer: "To stay dry",
    hint: "Tenk på hva du trenger når det regner."
  },
  {
    id: "vocab-3", skill: "vocabulary", level: 3, title: "Velg et passende ord",
    question: "The Arctic is extremely ___.",
    type: "choice", options: ["freezing", "crowded", "delicious"], answer: "freezing",
    hint: "Arktis er så kaldt at vann blir til is."
  },
  {
    id: "grammar-3", skill: "grammar", level: 3, title: "Velg riktig setning",
    question: "Which sentence is written correctly?",
    type: "choice", options: ["If I finish early, I will call you.", "If I finished early, I call you.", "If I finish early, I calling you."], answer: "If I finish early, I will call you.",
    hint: "Et fremtidig resultat etter en betingelse brukes ofte med will."
  },
  {
    id: "reading-3", skill: "reading", level: 3, title: "Tolk teksten",
    question: "Even though the museum was crowded, Amir waited patiently because he wanted to see the new exhibition. What can we conclude?",
    type: "choice", options: ["Amir was interested in the exhibition.", "Amir disliked museums.", "The museum was closed."], answer: "Amir was interested in the exhibition.",
    hint: "Why did Amir wait even though it was crowded?"
  },
  {
    id: "vocab-1b", skill: "vocabulary", level: 1, title: "Velg riktig ord",
    question: "The sun shines in the ___.",
    type: "choice", options: ["sky", "table", "book"], answer: "sky",
    hint: "Tenk på hvor sola og skyene er."
  },
  {
    id: "grammar-1b", skill: "grammar", level: 1, title: "Fullfør setningen",
    question: "They ___ happy today.",
    type: "choice", options: ["are", "is", "am"], answer: "are",
    hint: "Bruk are sammen med they eller we."
  },
  {
    id: "reading-1b", skill: "reading", level: 1, title: "Les og svar",
    question: "Mia has two cats. The cats are small and black. How many cats does Mia have?",
    type: "choice", options: ["Two", "One", "Three"], answer: "Two",
    hint: "Se etter tallet som kommer før ordet cats."
  },
  {
    id: "vocab-2b", skill: "vocabulary", level: 2, title: "Skriv det riktige ordet",
    question: "A person who teaches pupils at school is a ___. (teacher)",
    type: "text", answer: "teacher",
    hint: "Ordet beskriver personen som hjelper deg å lære."
  },
  {
    id: "grammar-2b", skill: "grammar", level: 2, title: "Velg riktig form",
    question: "Every morning, Ben ___ to school.",
    type: "choice", options: ["walks", "walked", "walking"], answer: "walks",
    hint: "Når noe skjer hver dag, bruker vi vanligvis -s i tredje person entall."
  },
  {
    id: "reading-2b", skill: "reading", level: 2, title: "Finn hovedidéen",
    question: "Jon brings a lunch box to school. It has a sandwich and an apple because he likes to eat healthy food. What is the text mainly about?",
    type: "choice", options: ["Jon's healthy lunch", "A school bus", "A football match"], answer: "Jon's healthy lunch",
    hint: "Teksten beskriver hva Jon har med seg og hvorfor."
  },
  {
    id: "vocab-3b", skill: "vocabulary", level: 3, title: "Velg et passende ord",
    question: "The difficult climb was really ___ for the whole team.",
    type: "choice", options: ["challenging", "empty", "ordinary"], answer: "challenging",
    hint: "Ordet betyr at noe krever mye innsats."
  },
  {
    id: "grammar-3b", skill: "grammar", level: 3, title: "Velg riktig setning",
    question: "Which sentence uses a connecting word correctly?",
    type: "choice", options: ["Although it rained, the match continued.", "Although it rained, but the match continued.", "It rained although but the match continued."], answer: "Although it rained, the match continued.",
    hint: "Although innleder en kontrast og trenger ikke en ekstra but."
  },
  {
    id: "reading-3b", skill: "reading", level: 3, title: "Tolk tekstintensjonen",
    question: "Please return your library books by Friday. Late returns make fewer books available for other readers. What is the writer's purpose?",
    type: "choice", options: ["To encourage timely returns", "To advertise a new school", "To describe a fictional story"], answer: "To encourage timely returns",
    hint: "Se på ordet please og begrunnelsen om andre lesere."
  }
];

const actionObjects = {
  bag: { word: "bag", label: "sekk", picture: "🎒" },
  book: { word: "book", label: "bok", picture: "📕" },
  apple: { word: "apple", label: "eple", picture: "🍎" },
  ball: { word: "ball", label: "ball", picture: "⚽" },
  pen: { word: "pen", label: "penn", picture: "🖊️" },
  cat: { word: "cat", label: "katt", picture: "🐱" },
  dog: { word: "dog", label: "hund", picture: "🐶" }
};

const actionTasks = [
  { prompt: "Open the bag.", action: "open-bag", setup: { open: false, contents: [] } },
  { prompt: "Put the book in the bag.", action: "put-in", object: "book", setup: { open: true, contents: [] } },
  { prompt: "Take the book out of the bag.", action: "take-out", object: "book", setup: { open: true, contents: ["book"] } },
  { prompt: "Put the book in the bag.", action: "put-in", object: "book", setup: { open: true, contents: [] } },
  { prompt: "Close the bag.", action: "close-bag", setup: { open: true, contents: ["book"] } },
  { prompt: "Open the bag.", action: "open-bag", setup: { open: false, contents: [] } },
  { prompt: "Put the apple in the bag.", action: "put-in", object: "apple", setup: { open: true, contents: [] } },
  { prompt: "Take the apple out of the bag.", action: "take-out", object: "apple", setup: { open: true, contents: ["apple"] } },
  { prompt: "Close the bag.", action: "close-bag", setup: { open: true, contents: ["book"] } },
  { prompt: "Open the bag.", action: "open-bag", setup: { open: false, contents: [] } },
  { prompt: "Put the ball in the bag.", action: "put-in", object: "ball", setup: { open: true, contents: [] } },
  { prompt: "Take the ball out of the bag.", action: "take-out", object: "ball", setup: { open: true, contents: ["ball"] } },
  { prompt: "Put the pen in the bag.", action: "put-in", object: "pen", setup: { open: true, contents: [] } },
  { prompt: "Take the pen out of the bag.", action: "take-out", object: "pen", setup: { open: true, contents: ["pen"] } },
  { prompt: "Close the bag.", action: "close-bag", setup: { open: true, contents: ["book"] } },
  { prompt: "Open the bag.", action: "open-bag", setup: { open: false, contents: [] } },
  { prompt: "Touch the book.", action: "touch", object: "book", setup: { open: true, contents: [] } },
  { prompt: "Touch the apple.", action: "touch", object: "apple", setup: { open: true, contents: [] } },
  { prompt: "Touch the bag.", action: "touch", object: "bag", setup: { open: false, contents: [] } },
  { prompt: "Put the book in the bag.", action: "put-in", object: "book", setup: { open: true, contents: [] } },
  { prompt: "Take the book out of the bag.", action: "take-out", object: "book", setup: { open: true, contents: ["book"] } },
  { prompt: "Put the apple in the bag.", action: "put-in", object: "apple", setup: { open: true, contents: [] } },
  { prompt: "Close the bag.", action: "close-bag", setup: { open: true, contents: ["apple"] } },
  { prompt: "Open the bag.", action: "open-bag", setup: { open: false, contents: [] } },
  { prompt: "Take the apple out of the bag.", action: "take-out", object: "apple", setup: { open: true, contents: ["apple"] } }
];

const phraseTasks = [
  {
    prompt: "En klassekamerat hilser.",
    cue: "Hi!",
    answers: ["Hi!", "Goodbye!"],
    answer: "Hi!"
  },
  {
    prompt: "Læreren gir en beskjed du ikke forstår.",
    cue: "Open your book to page three.",
    answers: ["Can you help me?", "I don't understand."],
    answer: "I don't understand."
  },
  {
    prompt: "Du trenger hjelp i timen.",
    cue: "You need help in class.",
    answers: ["Can you help me?", "I don't understand."],
    answer: "Can you help me?"
  }
];

function createInitialState() {
  const pupilProgress = {};
  pupils.forEach(pupil => {
    pupilProgress[pupil.id] = {
      level: { vocabulary: 1, grammar: 1, reading: 1 },
      currentTaskIndex: 0,
      taskCursor: { vocabulary: 0, grammar: 0, reading: 0 },
      progress: { vocabulary: 0, grammar: 0, reading: 0 },
      attempts: 0,
      beginnerPath: { stage: "choose-two", correctTwo: 0, correctThree: 0, wordCursor: 0, actionCursor: 0, phraseCursor: 0 }
    };
  });

  return {
    pupilProgress,
    readingMode: {},
    preferredVoice: "",
    attempts: []
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialState();
    const parsed = JSON.parse(saved);
    parsed.readingMode = parsed.readingMode || {};
    parsed.preferredVoice = parsed.preferredVoice || "";
    parsed.attempts = Array.isArray(parsed.attempts) ? parsed.attempts : [];
    pupils.forEach(pupil => {
      if (!parsed.pupilProgress?.[pupil.id]) {
        parsed.pupilProgress = parsed.pupilProgress || {};
        parsed.pupilProgress[pupil.id] = createInitialState().pupilProgress[pupil.id];
      }
    });
    return parsed;
  } catch {
    return createInitialState();
  }
}

let state = loadState();
let currentPupilId = pupils[0].id;
let selectedAnswer = "";
let hintVisible = false;
let checked = false;
let activeBeginnerActivity = "choose-two";
let currentChoiceOptions = [];
let activityAnswered = false;
let selectedSceneObject = "";
let bagIsOpen = false;
let bagContents = [];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setSyncStatus(message) {
  const status = document.getElementById("syncStatus");
  if (status) status.textContent = message;
}

function findNorwegianVoices() {
  if (!("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice =>
    /^nb|^no/i.test(voice.lang)
  );
}

function rankVoice(voice) {
  const name = voice.name.toLowerCase();
  let score = voice.localService ? 20 : 0;
  if (/natural|premium|enhanced|microsoft|siri|google/.test(name)) score += 15;
  if (/norway|norsk|pernille|eva|nora/.test(name)) score += 10;
  return score;
}

function getPreferredVoice(langPrefix) {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(voice =>
    voice.name === state.preferredVoice &&
    voice.lang.toLowerCase().startsWith(langPrefix)
  );
  if (preferred) return preferred;
  const matching = voices
    .filter(voice => voice.lang.toLowerCase().startsWith(langPrefix))
    .sort((a, b) => rankVoice(b) - rankVoice(a));
  return matching[0] || voices.find(voice => voice.lang.toLowerCase().startsWith(langPrefix)) || null;
}

function speakText(text, language, rate) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const prefix = language.toLowerCase().startsWith("nb") ? "nb" : language.slice(0, 2).toLowerCase();
  utterance.lang = language;
  utterance.voice = getPreferredVoice(prefix);
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function initVoiceSelect() {
  const select = document.getElementById("voiceSelect");
  const status = document.getElementById("voiceStatus");
  if (!("speechSynthesis" in window)) {
    select.innerHTML = '<option>Ikke støttet av nettleseren</option>';
    select.disabled = true;
    status.textContent = "Denne nettleseren kan ikke lese opp tekst.";
    return;
  }

  const populate = () => {
    const voices = findNorwegianVoices();
    select.innerHTML = '<option value="">Automatisk beste norske stemme</option>';
    voices
      .sort((a, b) => rankVoice(b) - rankVoice(a))
      .forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name}${voice.localService ? " – installert" : ""}`;
        select.appendChild(option);
      });

    if (state.preferredVoice) select.value = state.preferredVoice;

    if (voices.length) {
      const best = voices.sort((a, b) => rankVoice(b) - rankVoice(a))[0];
      status.textContent = rankVoice(best) >= 25
        ? `Bruker ${best.name}.`
        : "Fant norsk tale, men kvaliteten kan være begrenset. Se Windows innstillinger for flere stemmer.";
    } else {
      status.textContent = "Ingen norsk stemme funnet. Nettleseren bruker systemets tilgjengelige tale.";
    }
  };

  populate();
  window.speechSynthesis.onvoiceschanged = populate;
  select.addEventListener("change", event => {
    state.preferredVoice = event.target.value;
    saveState();
  });
}

function getCurrentTask() {
  const progress = state.pupilProgress[currentPupilId];
  const pupil = pupils.find(item => item.id === currentPupilId);
  let skillId = skills[progress.currentTaskIndex % 3].id;
  if (pupil.beginner && skillId !== "vocabulary") {
    skillId = "vocabulary";
  }
  const available = tasks.filter(task => task.skill === skillId);
  if (pupil.beginner && skillId === "vocabulary") {
    const scratchTasks = available.filter(task => task.id.startsWith("scratch-"));
    if (scratchTasks.length && progress.level.vocabulary === 1) {
      const cursor = progress.taskCursor?.vocabulary || 0;
      return scratchTasks[cursor % scratchTasks.length];
    }
  }
  const level = progress.level[available[0].skill];
  const levelTasks = available.filter(task => task.level === level);
  if (!levelTasks.length) return available[0];
  if (!progress.taskCursor) {
    progress.taskCursor = { vocabulary: 0, grammar: 0, reading: 0 };
  }
  const cursor = progress.taskCursor[available[0].skill] || 0;
  return levelTasks[cursor % levelTasks.length];
}

function setView(view) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.view === view));
  document.getElementById("pupilView").classList.toggle("hidden", view !== "pupil");
  document.getElementById("teacherView").classList.toggle("hidden", view !== "teacher");
  if (view === "teacher") renderDashboard();
}

function initPupilSelect() {
  const select = document.getElementById("pupilSelect");
  pupils.forEach(pupil => {
    const option = document.createElement("option");
    option.value = pupil.id;
    option.textContent = pupil.name;
    select.appendChild(option);
  });
  select.addEventListener("change", event => {
    currentPupilId = event.target.value;
    updateSupportControls();
    renderPupilExperience();
  });
}

function updateSupportControls() {
  const pupil = pupils.find(item => item.id === currentPupilId);
  document.getElementById("supportText").textContent = pupil.beginner
    ? "Startordforråd og korte svar"
    : pupil.dyslexiaSupport
      ? "Lesevennlig visning"
      : "Standardvisning";

  const enabled = state.readingMode?.[currentPupilId] ?? pupil.dyslexiaSupport;
  document.body.classList.toggle("reading-mode", enabled);
  const button = document.getElementById("readingModeButton");
  button.setAttribute("aria-pressed", String(enabled));
  button.textContent = enabled ? "Standard visning" : "Lesevennlig visning";
  document.querySelector(".avatar").textContent = pupil.avatar;
}

function renderPupilExperience() {
  const isBeginner = pupils.find(item => item.id === currentPupilId).beginner;
  document.getElementById("regularPractice").classList.toggle("hidden", isBeginner);
  document.getElementById("beginnerPractice").classList.toggle("hidden", !isBeginner);
  if (isBeginner) {
    activeBeginnerActivity = state.pupilProgress[currentPupilId].beginnerPath.stage;
    renderBeginnerActivity();
  } else {
    renderTask();
  }
}

function getBeginnerWordTask(cursor) {
  const wordTasks = tasks.filter(task => task.id.startsWith("scratch-"));
  return wordTasks[cursor % wordTasks.length];
}

function shuffleItems(items) {
  const shuffled = items.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function getChoiceOptions(task, count) {
  const starterDistractors = task.answer === "bag"
    ? count === 2 ? ["book"] : ["book", "apple"]
    : task.answer === "book"
      ? count === 2 ? ["bag"] : ["bag", "apple"]
      : [];
  const distractors = starterDistractors.length
    ? starterDistractors
    : task.options.filter(option => option !== task.answer);
  return shuffleItems([task.answer, ...shuffleItems(distractors).slice(0, count - 1)]);
}

function getActivityProgress(path) {
  if (activeBeginnerActivity === "choose-two") {
    return `Ord ${Math.min(path.wordCursor + 1, 100)} av 100 · ${path.correctTwo}/10 riktige`;
  }
  if (activeBeginnerActivity === "choose-three") {
    return `Ord ${Math.min(path.wordCursor + 1, 100)} av 100 · ${path.correctThree}/10 riktige`;
  }
  if (activeBeginnerActivity === "listen-do") {
    return `Oppgave ${Math.min(path.actionCursor + 1, actionTasks.length)} av ${actionTasks.length}`;
  }
  return `Frase ${path.phraseCursor % phraseTasks.length + 1} av ${phraseTasks.length}`;
}

function getNextButtonText(path) {
  if (activeBeginnerActivity === "choose-two" && path.stage === "choose-three") return "Gå videre til tre bilder";
  if (activeBeginnerActivity === "choose-three" && path.stage === "listen-do") return "Start hør-og-gjør";
  if (activeBeginnerActivity === "listen-do" && path.stage === "phrase") return "Gå videre til fraser";
  if (activeBeginnerActivity === "phrase") return "Neste frase";
  return "Neste oppgave";
}

function updateActivityTabs(path) {
  const currentStageIndex = ["choose-two", "choose-three", "listen-do", "phrase"].indexOf(path.stage);
  document.querySelectorAll(".activity-tab").forEach(button => {
    const activityIndex = ["choose-two", "choose-three", "listen-do", "phrase"].indexOf(button.dataset.activity);
    button.disabled = activityIndex > currentStageIndex;
    button.classList.toggle("active", button.dataset.activity === activeBeginnerActivity);
  });
}

function renderBeginnerActivity() {
  activityAnswered = false;
  const progress = state.pupilProgress[currentPupilId];
  const path = progress.beginnerPath;
  document.getElementById("currentLevelLabel").textContent = "Læringssteg";
  document.getElementById("currentLevel").textContent =
    `${["choose-two", "choose-three", "listen-do", "phrase"].indexOf(path.stage) + 1} av 4`;
  const visual = document.getElementById("activityVisual");
  const options = document.getElementById("activityOptions");
  const feedback = document.getElementById("activityFeedback");
  const listenButton = document.getElementById("activityListenButton");
  let task;
  let promptText;
  let spokenText;

  if (activeBeginnerActivity === "choose-two" || activeBeginnerActivity === "choose-three") {
    task = getBeginnerWordTask(path.wordCursor);
    currentChoiceOptions = getChoiceOptions(task, activeBeginnerActivity === "choose-two" ? 2 : 3);
    document.getElementById("beginnerActivityTitle").textContent = "Hør og velg";
    document.getElementById("beginnerActivityDescription").textContent = activeBeginnerActivity === "choose-two"
      ? "Lytt til ordet og velg det riktige bildet. Du trenger 10 riktige for å gå videre."
      : "Lytt til ordet og velg mellom tre bilder. Du trenger 10 riktige for å gå videre.";
    promptText = "Lytt til ordet og velg bildet som passer.";
    spokenText = task.answer;
    document.getElementById("activityProgress").textContent = activeBeginnerActivity === "choose-two"
      ? `Ord ${path.wordCursor + 1} av 100 · ${path.correctTwo}/10 riktige`
      : `Ord ${path.wordCursor + 1} av 100 · ${path.correctThree}/10 riktige`;
  } else if (activeBeginnerActivity === "listen-do") {
    task = actionTasks[path.actionCursor % actionTasks.length];
    document.getElementById("beginnerActivityTitle").textContent = "Hør og gjør";
    document.getElementById("beginnerActivityDescription").textContent = `Lytt til beskjeden. Trykk på tingen eller dra den dit den skal. ${actionTasks.length} korte oppgaver med kjente ord.`;
    promptText = "Lytt til beskjeden, og gjør det den sier.";
    spokenText = task.prompt;
    document.getElementById("activityProgress").textContent = `Oppgave ${path.actionCursor + 1} av ${actionTasks.length}`;
  } else {
    task = phraseTasks[path.phraseCursor % phraseTasks.length];
    document.getElementById("beginnerActivityTitle").textContent = "Bruk en frase";
    document.getElementById("beginnerActivityDescription").textContent = "Hør på situasjonen, spill av svarene og velg det som passer.";
    promptText = task.prompt;
    spokenText = task.cue;
    document.getElementById("activityProgress").textContent = `Frase ${path.phraseCursor % phraseTasks.length + 1} av ${phraseTasks.length}`;
  }

  document.getElementById("activityPrompt").textContent = promptText;
  const nextButton = document.getElementById("activityNextButton");
  nextButton.disabled = true;
  nextButton.textContent = getNextButtonText(path);
  listenButton.textContent = activeBeginnerActivity.startsWith("choose-")
    ? "🔊 Hør ordet"
    : activeBeginnerActivity === "listen-do"
      ? "🔊 Hør beskjeden"
      : "🔊 Hør personen";
  listenButton.onclick = () => speakText(spokenText, "en-GB", 0.65);
  feedback.className = "feedback empty";
  feedback.textContent = "";
  visual.replaceChildren();
  options.replaceChildren();

  if (activeBeginnerActivity.startsWith("choose-")) {
    visual.classList.remove("activity-say-visual");
    currentChoiceOptions.forEach(answer => {
      const vocabularyItem = tasks.find(candidate =>
        candidate.id.startsWith("scratch-") && candidate.answer === answer
      );
      const button = document.createElement("button");
      button.type = "button";
      button.className = "picture-choice";
      button.setAttribute("aria-label", `Velg bildet for ${vocabularyItem.question.match(/«([^»]+)»/)?.[1] || answer}`);
      const picture = document.createElement("span");
      picture.className = "picture";
      picture.textContent = vocabularyItem.visual || "❔";
      picture.setAttribute("aria-hidden", "true");
      button.appendChild(picture);
      button.addEventListener("click", () => {
        speakText(answer, "en-GB", 0.65);
        submitBeginnerAnswer(answer);
      });
      options.appendChild(button);
    });
  } else if (activeBeginnerActivity === "listen-do") {
    bagIsOpen = task.setup.open;
    bagContents = task.setup.contents.slice();
    selectedSceneObject = "";
    renderActionScene(task, visual);
  } else {
    visual.classList.remove("activity-say-visual");
    visual.textContent = "🧑‍🎓";
    const list = document.createElement("div");
    list.className = "phrase-list";
    task.answers.forEach(answer => {
      const row = document.createElement("div");
      row.className = "phrase-option";
      const play = document.createElement("button");
      play.type = "button";
      play.className = "phrase-play";
      play.textContent = "🔊";
      play.setAttribute("aria-label", `Spill av ${answer}`);
      play.addEventListener("click", () => speakText(answer, "en-GB", 0.65));
      const choose = document.createElement("button");
      choose.type = "button";
      choose.className = "phrase-answer";
      choose.textContent = answer;
      choose.addEventListener("click", () => submitBeginnerAnswer(answer));
      row.append(play, choose);
      list.appendChild(row);
    });
    options.appendChild(list);
  }

  updateActivityTabs(path);
}

function renderActionScene(item, container) {
  const scene = document.createElement("div");
  scene.className = "activity-scene";
  const keys = [...new Set([item.object, "book", "apple", "bag"].filter(Boolean))];
  keys.forEach(key => {
    if (key === "bag") return;
    const object = actionObjects[key];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scene-object${selectedSceneObject === key ? " selected" : ""}`;
    button.draggable = item.action === "put-in";
    button.setAttribute("aria-label", object.label);
    button.innerHTML = `<span aria-hidden="true">${object.picture}</span><span>${object.label}</span>`;
    button.addEventListener("click", () => {
      if (item.action === "touch") {
        if (key === item.object) completeAction();
        else wrongAction();
        return;
      }
      if (item.action === "put-in") {
        selectedSceneObject = key;
        button.classList.add("selected");
      }
    });
    button.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", key);
    });
    scene.appendChild(button);
  });

  const bag = document.createElement("button");
  bag.type = "button";
  bag.id = "sceneBag";
  bag.className = `scene-object${bagIsOpen ? " open" : ""}`;
  bag.innerHTML = '<span aria-hidden="true"></span><span></span>';
  const updateBag = () => {
    const contents = bagContents.map(key => actionObjects[key].label).join(", ");
    bag.classList.toggle("open", bagIsOpen);
    bag.setAttribute("aria-label", `${bagIsOpen ? "Åpen" : "Lukket"} sekk${contents ? ` med ${contents}` : ""}`);
    bag.querySelector("[aria-hidden='true']").textContent = bagIsOpen ? "👜" : "🎒";
    bag.querySelector("span:not([aria-hidden])").textContent = `Sekk${contents ? ` (${contents})` : ""}`;
  };
  updateBag();

  if (item.action === "open-bag" || item.action === "close-bag") {
    bag.addEventListener("click", () => {
      const shouldOpen = item.action === "open-bag";
      if (bagIsOpen === shouldOpen) {
        wrongAction();
        return;
      }
      bagIsOpen = shouldOpen;
      updateBag();
      completeAction();
    });
  } else if (item.action === "touch" && item.object === "bag") {
    bag.addEventListener("click", completeAction);
  } else if (item.action === "put-in") {
    bag.addEventListener("click", () => {
      if (!bagIsOpen) {
        wrongAction();
        return;
      }
      if (selectedSceneObject === item.object) {
        bagContents.push(item.object);
        updateBag();
        completeAction();
      } else {
        wrongAction();
      }
    });
    bag.addEventListener("dragover", event => event.preventDefault());
    bag.addEventListener("drop", event => {
      event.preventDefault();
      if (event.dataTransfer.getData("text/plain") === item.object && bagIsOpen) {
        bagContents.push(item.object);
        updateBag();
        completeAction();
      } else {
        wrongAction();
      }
    });
  } else if (item.action === "take-out") {
    bag.addEventListener("click", () => {
      const contentIndex = bagContents.indexOf(item.object);
      if (contentIndex >= 0) {
        bagContents.splice(contentIndex, 1);
        updateBag();
        completeAction();
      } else {
        wrongAction();
      }
    });
  } else if (item.action === "touch") {
    bag.addEventListener("click", wrongAction);
  }

  scene.appendChild(bag);
  container.appendChild(scene);
}

function submitBeginnerAnswer(answer) {
  if (activityAnswered) return;
  const path = state.pupilProgress[currentPupilId].beginnerPath;
  const task = activeBeginnerActivity.startsWith("choose-")
    ? getBeginnerWordTask(path.wordCursor)
    : phraseTasks[path.phraseCursor % phraseTasks.length];
  const correct = answer === task.answer;
  answerBeginnerTask(correct, correct ? "Ja, det passer!" : "Prøv gjerne en gang til. Du kan lytte på nytt.", answer);
}

function completeAction() {
  if (activityAnswered) return;
  activityAnswered = true;
  selectedSceneObject = "";
  document.getElementById("activityFeedback").className = "feedback correct";
  document.getElementById("activityFeedback").textContent = "Ja, du gjorde det!";
  document.getElementById("activityNextButton").disabled = false;
  const task = actionTasks[state.pupilProgress[currentPupilId].beginnerPath.actionCursor % actionTasks.length];
  recordBeginnerAttempt(true, 3, task.action);
}

function wrongAction() {
  if (activityAnswered) return;
  document.getElementById("activityFeedback").className = "feedback incorrect";
  document.getElementById("activityFeedback").textContent = "Prøv igjen. Du kan høre beskjeden på nytt.";
  recordBeginnerAttempt(false, 3, "Feil handling");
  recordBeginnerAttempt(false, 3);
}

function answerBeginnerTask(correct, message, answer = "") {
  activityAnswered = correct;
  const feedback = document.getElementById("activityFeedback");
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.textContent = message;
  document.getElementById("activityNextButton").disabled = !correct;
  recordBeginnerAttempt(
    correct,
    activeBeginnerActivity === "choose-two" ? 1 : activeBeginnerActivity === "choose-three" ? 2 : 3,
    answer
  );
}

function recordBeginnerAttempt(correct, taskLevel, chosenAnswer = "") {
  const progress = state.pupilProgress[currentPupilId];
  const path = progress.beginnerPath;
  const stage = path.stage;
  let taskId = "";
  let prompt = "";
  if (stage === "choose-two" || stage === "choose-three") {
    const task = getBeginnerWordTask(path.wordCursor);
    taskId = task.id;
    prompt = task.question;
  } else if (stage === "listen-do") {
    const task = actionTasks[path.actionCursor % actionTasks.length];
    taskId = `action-${path.actionCursor + 1}`;
    prompt = task.prompt;
  } else {
    const task = phraseTasks[path.phraseCursor % phraseTasks.length];
    taskId = `phrase-${path.phraseCursor + 1}`;
    prompt = `${task.prompt} ${task.cue}`;
  }
  const attemptNumber = state.attempts.filter(attempt =>
    attempt.pupilId === currentPupilId && attempt.taskId === taskId
  ).length + 1;
  progress.attempts += 1;
  progress.progress.vocabulary = Math.max(0, Math.min(100,
    progress.progress.vocabulary + (correct ? 8 : -3)
  ));
  if (correct && activeBeginnerActivity === "choose-two" && path.stage === "choose-two") {
    path.correctTwo += 1;
    path.wordCursor += 1;
    if (path.correctTwo >= 10) path.stage = "choose-three";
  } else if (correct && activeBeginnerActivity === "choose-three" && path.stage === "choose-three") {
    path.correctThree += 1;
    path.wordCursor += 1;
    if (path.correctThree >= 10) path.stage = "listen-do";
  } else if (correct && activeBeginnerActivity === "listen-do" && path.stage === "listen-do") {
    path.actionCursor += 1;
    if (path.actionCursor >= actionTasks.length) path.stage = "phrase";
  } else if (correct && activeBeginnerActivity === "phrase" && path.stage === "phrase") {
    path.phraseCursor += 1;
  }
  const attempt = {
    id: `${currentPupilId}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    pupilId: currentPupilId,
    skillId: "vocabulary",
    correct,
    taskLevel,
    stage,
    taskId,
    prompt,
    chosenAnswer,
    attemptNumber,
    time: new Date().toISOString()
  };
  state.attempts.unshift(attempt);
  saveState();
  setSyncStatus("Svar og framgang er lagret på denne iPaden.");
  updateActivityTabs(path);
  document.getElementById("activityProgress").textContent = getActivityProgress(path);
  document.getElementById("activityNextButton").textContent = getNextButtonText(path);
}

function renderTask() {
  const progress = state.pupilProgress[currentPupilId];
  const task = getCurrentTask();
  const skill = skills.find(item => item.id === task.skill);
  const skillIndex = skills.findIndex(item => item.id === task.skill);

  document.getElementById("currentLevelLabel").textContent = "Nåværende nivå";
  document.getElementById("skillName").textContent = skill.name;
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskCount").textContent = `Oppgave ${progress.attempts + 1}`;
  document.getElementById("currentLevel").textContent = `${progress.level[task.skill]} av 3`;
  document.getElementById("questionText").textContent = task.question;
  const wordVisual = document.getElementById("wordVisual");
  wordVisual.textContent = task.visual || "";
  wordVisual.classList.toggle("visible", Boolean(task.visual));
  document.getElementById("speakButton").textContent = "🔊 Hør spørsmålet";

  const feedback = document.getElementById("feedback");
  feedback.className = "feedback empty";
  feedback.textContent = "";
  document.getElementById("hintText").textContent = "";
  selectedAnswer = "";
  hintVisible = false;
  checked = false;

  const optionsContainer = document.getElementById("answerOptions");
  const textAnswer = document.getElementById("textAnswer");
  optionsContainer.innerHTML = "";
  textAnswer.value = "";
  textAnswer.classList.toggle("visible", task.type === "text");
  optionsContainer.style.display = task.type === "text" ? "none" : "grid";

  if (task.type === "choice") {
    task.options.forEach(optionText => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = optionText;
      button.addEventListener("click", () => {
        if (checked) return;
        document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));
        button.classList.add("selected");
        selectedAnswer = optionText;
        speakText(optionText, "en", 0.65);
      });
      optionsContainer.appendChild(button);
    });
  }

  document.getElementById("checkButton").textContent = "Sjekk svar";
  document.querySelector(".practice-card").dataset.skillIndex = skillIndex;
}

function checkAnswer() {
  if (checked) {
    advanceTask();
    return;
  }

  const task = getCurrentTask();
  const progress = state.pupilProgress[currentPupilId];
  const answer = task.type === "text" ? document.getElementById("textAnswer").value.trim() : selectedAnswer;

  if (!answer) {
    const feedback = document.getElementById("feedback");
    feedback.className = "feedback incorrect";
    feedback.textContent = "Velg eller skriv inn et svar først.";
    return;
  }

  const correct = answer.toLowerCase() === task.answer.toLowerCase();
  checked = true;
  progress.attempts += 1;
  progress.progress[task.skill] = Math.max(0, Math.min(100,
    progress.progress[task.skill] + (correct ? 8 : -3)
  ));

  const pupil = pupils.find(item => item.id === currentPupilId);
  if (correct) {
    if (pupil.beginner) {
      progress.level[task.skill] = 1;
    } else {
      progress.level[task.skill] = Math.min(3, progress.level[task.skill] + 1);
    }
  } else {
    progress.level[task.skill] = Math.max(1, progress.level[task.skill] - 1);
  }

  if (!progress.taskCursor) {
    progress.taskCursor = { vocabulary: 0, grammar: 0, reading: 0 };
  }
  progress.taskCursor[task.skill] = (progress.taskCursor[task.skill] || 0) + 1;

  if (correct) {
    progress.currentTaskIndex = (progress.currentTaskIndex + 1) % 3;
  }
  state.attempts.unshift({
    pupilId: currentPupilId,
    skillId: task.skill,
    correct,
    taskLevel: task.level,
    time: "Nå"
  });
  saveState();
  setSyncStatus("Svar og framgang er lagret på denne iPaden.");

  const feedback = document.getElementById("feedback");
  feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
  feedback.textContent = correct
    ? "Riktig! Neste oppgave kan bli litt vanskeligere."
    : `Ikke helt. Riktig svar er «${task.answer}». Neste oppgave blir litt enklere.`;
  document.getElementById("checkButton").textContent = "Neste oppgave";
}

function advanceTask() {
  renderTask();
}

function renderDashboard() {
  const attemptList = document.getElementById("attemptList");
  const dashboardResults = state.attempts;

  const totalAttempts = dashboardResults.length;
  const correctAttempts = dashboardResults.filter(attempt => attempt.correct).length;
  const activeParticipants = new Set(dashboardResults.map(attempt => attempt.pupilId)).size;

  document.getElementById("summaryGrid").innerHTML = `
    <div class="summary-card"><span>Elevkoder med forsøk på denne enheten</span><strong>${activeParticipants}</strong></div>
    <div class="summary-card"><span>Registrerte forsøk</span><strong>${totalAttempts}</strong></div>
    <div class="summary-card"><span>Riktige forsøk</span><strong>${totalAttempts ? Math.round(correctAttempts / totalAttempts * 100) : 0}%</strong></div>
  `;

  const pupilRows = document.getElementById("pupilRows");
  pupilRows.innerHTML = pupils.map(pupil => {
    const attempts = dashboardResults.filter(attempt => attempt.pupilId === pupil.id);
    const correctForStage = stage => attempts.filter(attempt => attempt.stage === stage && attempt.correct).length;
    const correctTwo = correctForStage("choose-two");
    const correctThree = correctForStage("choose-three");
    const actionCount = correctForStage("listen-do");
    const stage = correctTwo < 10 ? "choose-two" : correctThree < 10 ? "choose-three" : actionCount < actionTasks.length ? "listen-do" : "phrase";
    const completion = stage === "choose-two"
      ? correctTwo * 10
      : stage === "choose-three"
        ? correctThree * 10
        : stage === "listen-do"
          ? Math.round(actionCount / actionTasks.length * 100)
          : 100;
    const stageLabel = {
      "choose-two": `2 bilder (${correctTwo}/10)`,
      "choose-three": `3 bilder (${correctThree}/10)`,
      "listen-do": `Hør og gjør (${actionCount}/${actionTasks.length})`,
      phrase: "Bruk en frase"
    }[stage];
    return `
      <div class="pupil-row">
        <strong>${pupil.name}</strong>
        <div class="bar" title="${stageLabel}"><div class="bar-fill" style="width:${completion}%"></div></div>
        <span>${stageLabel}</span>
      </div>
    `;
  }).join("");

  const practiceAreas = document.getElementById("practiceAreas");
  practiceAreas.innerHTML = pupils.map(pupil => {
    const pupilAttempts = dashboardResults.filter(attempt => attempt.pupilId === pupil.id);
    const correct = pupilAttempts.filter(attempt => attempt.correct).length;
    const accuracy = pupilAttempts.length ? Math.round(correct / pupilAttempts.length * 100) : 0;
    const correctTwo = pupilAttempts.filter(attempt => attempt.stage === "choose-two" && attempt.correct).length;
    const correctThree = pupilAttempts.filter(attempt => attempt.stage === "choose-three" && attempt.correct).length;
    const actionCount = pupilAttempts.filter(attempt => attempt.stage === "listen-do" && attempt.correct).length;
    const stage = correctTwo < 10 ? "choose-two" : correctThree < 10 ? "choose-three" : actionCount < actionTasks.length ? "listen-do" : "phrase";
    const stageLabel = {
      "choose-two": "Hør og velg · 2 bilder",
      "choose-three": "Hør og velg · 3 bilder",
      "listen-do": "Hør og gjør",
      phrase: "Bruk en frase"
    }[stage];
    return `
      <div class="practice-area">
        <strong>${pupil.name}</strong>
        <span>${stageLabel} · ${pupilAttempts.length} forsøk · ${accuracy}% riktige</span>
      </div>
    `;
  }).join("");

  const recentAttempts = dashboardResults.slice().sort((a, b) => new Date(b.time) - new Date(a.time));
  attemptList.innerHTML = recentAttempts.length ? recentAttempts.slice(0, 30).map(attempt => {
    const pupil = pupils.find(item => item.id === attempt.pupilId);
    const stageName = {
      "choose-two": "Hør og velg · 2 bilder",
      "choose-three": "Hør og velg · 3 bilder",
      "listen-do": "Hør og gjør",
      phrase: "Bruk en frase"
    }[attempt.stage] || "Oppgave";
    return `
      <div class="attempt">
        <strong>${pupil.name}</strong>
        <span>${stageName}</span>
        <span title="${escapeHtml(attempt.prompt || "")}">${escapeHtml(attempt.prompt || attempt.taskId || "")}</span>
        <span class="attempt-result ${attempt.correct ? "correct" : "incorrect"}">${attempt.correct ? "Riktig" : "Prøv igjen"}</span>
        <time>${escapeHtml(formatAttemptTime(attempt.time))}</time>
      </div>
    `;
  }).join("") : "<p>Ingen forsøk registrert på denne iPaden ennå.</p>";
}

function formatAttemptTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("no-NO");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function csvCell(value) {
  let text = String(value ?? "");
  if (/^\s*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function exportResults() {
  if (!state.attempts.length) {
    window.alert("Det er ingen resultater på denne iPaden ennå.");
    return;
  }
  const headers = ["Elevkode", "Tidspunkt", "Læringssteg", "Oppgave", "Elevens valg", "Forsøk på oppgaven", "Resultat"];
  const rows = state.attempts.slice().sort((a, b) => new Date(a.time) - new Date(b.time)).map(attempt => {
    const pupil = pupils.find(item => item.id === attempt.pupilId);
    const stageName = {
      "choose-two": "Hør og velg - 2 bilder",
      "choose-three": "Hør og velg - 3 bilder",
      "listen-do": "Hør og gjør",
      phrase: "Bruk en frase"
    }[attempt.stage] || "Oppgave";
    return [
      pupil?.name || "Ukjent elevkode",
      formatAttemptTime(attempt.time),
      stageName,
      attempt.prompt || attempt.taskId,
      attempt.chosenAnswer,
      attempt.attemptNumber,
      attempt.correct ? "Riktig" : "Feil"
    ].map(csvCell).join(",");
  });
  const csv = `\uFEFF${[headers.map(csvCell).join(","), ...rows].join("\r\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `engelsk-resultater-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

document.querySelectorAll(".tab").forEach(tab =>
  tab.addEventListener("click", () => setView(tab.dataset.view))
);

document.getElementById("hintButton").addEventListener("click", () => {
  if (hintVisible) return;
  hintVisible = true;
  document.getElementById("hintText").textContent = `Hint: ${getCurrentTask().hint}`;
});

document.getElementById("checkButton").addEventListener("click", checkAnswer);
document.getElementById("textAnswer").addEventListener("keydown", event => {
  if (event.key === "Enter") checkAnswer();
});

document.getElementById("resetDemo").addEventListener("click", () => {
  if (!window.confirm("Dette sletter resultater og framgang fra denne iPaden. Eksporter CSV først hvis du vil ta vare på resultatene. Vil du fortsette?")) return;
  state = createInitialState();
  activeBeginnerActivity = "choose-two";
  bagIsOpen = false;
  bagContents = [];
  selectedSceneObject = "";
  currentPupilId = pupils[0].id;
  document.getElementById("pupilSelect").value = currentPupilId;
  updateSupportControls();
  saveState();
  renderDashboard();
  renderPupilExperience();
});

document.getElementById("exportResults").addEventListener("click", exportResults);

document.getElementById("readingModeButton").addEventListener("click", () => {
  const pupil = pupils.find(item => item.id === currentPupilId);
  const current = state.readingMode?.[currentPupilId] ?? pupil.dyslexiaSupport;
  state.readingMode[currentPupilId] = !current;
  saveState();
  updateSupportControls();
});

document.getElementById("speakButton").addEventListener("click", () => {
  const task = getCurrentTask();
  speakText(task.spokenPrompt || task.question, task.spokenPrompt ? "nb-NO" : "en-GB", 0.55);
});

document.querySelectorAll(".activity-tab").forEach(button => {
  button.addEventListener("click", () => {
    const path = state.pupilProgress[currentPupilId].beginnerPath;
    const activityIndex = ["choose-two", "choose-three", "listen-do", "phrase"].indexOf(button.dataset.activity);
    const stageIndex = ["choose-two", "choose-three", "listen-do", "phrase"].indexOf(path.stage);
    if (activityIndex > stageIndex) return;
    activeBeginnerActivity = button.dataset.activity;
    renderBeginnerActivity();
  });
});

document.getElementById("activityListenButton").addEventListener("click", () => {
  const path = state.pupilProgress[currentPupilId].beginnerPath;
  const spokenText = activeBeginnerActivity.startsWith("choose-")
    ? getBeginnerWordTask(path.wordCursor).answer
    : activeBeginnerActivity === "listen-do"
      ? actionTasks[path.actionCursor % actionTasks.length].prompt
      : phraseTasks[path.phraseCursor % phraseTasks.length].cue;
  speakText(spokenText, "en-GB", 0.65);
});

document.getElementById("activityNextButton").addEventListener("click", () => {
  if (!activityAnswered) return;
  const path = state.pupilProgress[currentPupilId].beginnerPath;
  if (activeBeginnerActivity !== path.stage) {
    activeBeginnerActivity = path.stage;
  } else if (activeBeginnerActivity === "listen-do") {
    bagIsOpen = false;
    bagContents = [];
  }
  selectedSceneObject = "";
  renderBeginnerActivity();
});

function registerOfflineApp() {
  const status = document.getElementById("offlineStatus");
  if (!("serviceWorker" in navigator)) {
    status.textContent = "Denne nettleseren støtter ikke installering for offline bruk.";
    return;
  }
  if (!window.isSecureContext) {
    status.textContent = "Offline bruk krever en HTTPS-nettside. Framgang lagres lokalt mens appen er åpen.";
    return;
  }
  navigator.serviceWorker.register("./sw.js")
    .then(registration => {
      const worker = registration.installing || registration.waiting || registration.active;
      if (!worker) throw new Error("Service worker did not start.");
      if (worker.state === "activated") {
        status.textContent = "Appen er klargjort for offline bruk. Legg den til på Hjem-skjermen i Safari.";
        return;
      }
      status.textContent = "Lagrer appen for offline bruk …";
      worker.addEventListener("statechange", () => {
        if (worker.state === "activated") {
          status.textContent = "Appen er klargjort for offline bruk. Legg den til på Hjem-skjermen i Safari.";
        } else if (worker.state === "redundant") {
          status.textContent = "Appen kunne ikke klargjøres for offline bruk. Prøv å åpne den med nett igjen.";
        }
      });
    })
    .catch(error => {
      console.error("Kunne ikke klargjøre appen for offline bruk:", error);
      status.textContent = "Appen kunne ikke klargjøres for offline bruk. Prøv å åpne den med nett igjen.";
    });
}

initPupilSelect();
updateSupportControls();
initVoiceSelect();
renderPupilExperience();
registerOfflineApp();
