const texts = [
  {
    title: "Taking a photo",
    context: "Polite request",
    tr: "Affedersiniz, fotoğrafınızı çekebilir miyim? Dövmelerinizi çok beğendim.",
    en: "Excuse me, can I take your photo? I really like your tattoos.",
    note: "This is polite and natural. Turkish marks ‘your’ and the definite object directly on the nouns, so the English-style pronouns do not need separate words.",
    structure: ["address", "definite object", "ability + question", "definite object", "degree", "past verb"],
    structureNote: "Turkish tends toward object–verb order. The second sentence can omit an explicit pronoun for ‘them’ because dövmelerinizi already supplies the object.",
    chunks: [
      {
        surface: "Affedersiniz",
        gloss: "excuse me / pardon me",
        pos: "verb",
        morphemes: [["affet", "root verb", "verb"], ["-er", "aorist", "suffix"], ["-siniz", "2PL / polite", "suffix"]],
        grammar: "A conventional polite attention-getter. Literally it comes from ‘forgive’; the plural second-person ending also serves polite singular address."
      },
      {
        surface: "fotoğrafınızı",
        gloss: "your photo (as the object)",
        pos: "noun",
        morphemes: [["fotoğraf", "photo", "noun"], ["-ınız", "your (polite/pl.)", "suffix"], ["-ı", "accusative", "suffix"]],
        grammar: "Possessive + accusative stack: fotoğraf + ınız + ı. The accusative marks a specific/definite direct object."
      },
      {
        surface: "çekebilir miyim?",
        gloss: "can / may I take?",
        pos: "verb",
        morphemes: [["çek", "take / pull", "verb"], ["-ebil", "ability", "suffix"], ["-ir", "aorist", "suffix"], ["mi", "question", "particle"], ["-yim", "1SG", "suffix"]],
        grammar: "The useful request pattern is verb + -(y)Abil + aorist + mı/mi + person: ‘Can I …?’ The question particle is written separately."
      },
      {
        surface: "Dövmelerinizi",
        gloss: "your tattoos (as the object)",
        pos: "noun",
        morphemes: [["dövme", "tattoo", "noun"], ["-ler", "plural", "suffix"], ["-iniz", "your (polite/pl.)", "suffix"], ["-i", "accusative", "suffix"]],
        grammar: "A nice example of suffix stacking: noun + plural + possessive + case."
      },
      {
        surface: "çok",
        gloss: "very / a lot",
        pos: "adverb",
        morphemes: [["çok", "very / much", "adverb"]],
        grammar: "Here çok modifies beğendim: ‘I liked [them] very much.’"
      },
      {
        surface: "beğendim",
        gloss: "I liked / I really liked",
        pos: "verb",
        morphemes: [["beğen", "like", "verb"], ["-di", "past", "suffix"], ["-m", "1SG", "suffix"]],
        grammar: "The verb ending already says the subject is ‘I’, so ben is unnecessary. The object can also stay implicit because it is clear from the previous chunk."
      }
    ]
  },
  {
    title: "Getting to Karaköy",
    context: "Directions",
    tr: "Karaköy'e nasıl gidebilirim?",
    en: "How can I get to Karaköy?",
    note: "A compact direction question worth memorizing because you can replace Karaköy with almost any destination.",
    structure: ["destination + dative", "question adverb", "ability verb + 1SG"],
    structureNote: "The destination takes the dative case (‘to/toward’), while nasıl asks ‘how’. Turkish keeps the main verb at the end.",
    chunks: [
      { surface: "Karaköy'e", gloss: "to Karaköy", pos: "noun", morphemes: [["Karaköy", "place name", "noun"], ["-e", "dative: to", "suffix"]], grammar: "Proper names take an apostrophe before an inflectional suffix in writing." },
      { surface: "nasıl", gloss: "how", pos: "adverb", morphemes: [["nasıl", "how", "adverb"]], grammar: "Question word asking about manner or method." },
      { surface: "gidebilirim?", gloss: "can I go?", pos: "verb", morphemes: [["git", "go", "verb"], ["-ebil", "ability", "suffix"], ["-ir", "aorist", "suffix"], ["-im", "1SG", "suffix"]], grammar: "git- surfaces as gid- before a vowel-initial suffix. Ability + aorist + first person gives ‘I can go’; with nasıl it becomes ‘How can I go?’" }
    ]
  },
  {
    title: "Asking the price",
    context: "Shopping",
    tr: "Bunun fiyatı ne kadar?",
    en: "How much is this? / What is the price of this?",
    note: "Useful when pointing at something. Turkish often has no separate present-tense word for ‘is’ in noun/adjective sentences.",
    structure: ["genitive: of this", "possessed noun", "price question"],
    structureNote: "The phrase literally builds ‘this + its price + how much?’ This genitive–possessive pairing is extremely common in Turkish.",
    chunks: [
      { surface: "Bunun", gloss: "of this / this one's", pos: "noun", morphemes: [["bu", "this", "noun"], ["-nun", "genitive", "suffix"]], grammar: "The demonstrative bu changes to bunun with the genitive ending: ‘of this’." },
      { surface: "fiyatı", gloss: "its price", pos: "noun", morphemes: [["fiyat", "price", "noun"], ["-ı", "3SG possessive", "suffix"]], grammar: "The possessive ending pairs with bunun: bunun fiyatı = ‘the price of this’." },
      { surface: "ne kadar?", gloss: "how much?", pos: "adverb", morphemes: [["ne", "what", "adverb"], ["kadar", "amount / extent", "adverb"]], grammar: "Fixed question phrase for amount or price. No separate ‘is’ is required here." }
    ]
  }
];

const picker = document.querySelector("#textPicker");
const trEl = document.querySelector("#turkishSentence");
const enEl = document.querySelector("#englishSentence");
const noteEl = document.querySelector("#naturalNote");
const contextEl = document.querySelector("#contextBadge");
const countEl = document.querySelector("#sentenceCount");
const chunkGrid = document.querySelector("#chunkGrid");
const structureLine = document.querySelector("#structureLine");
const structureNote = document.querySelector("#structureNote");

function morphClass(type) {
  if (type === "suffix") return "morph suffix";
  if (type === "particle") return "morph root particle";
  return `morph root ${type}`;
}

function render(index) {
  const text = texts[index];
  [...picker.children].forEach((button, i) => button.setAttribute("aria-selected", String(i === index)));
  trEl.textContent = text.tr;
  enEl.textContent = text.en;
  noteEl.textContent = text.note;
  contextEl.textContent = text.context;
  countEl.textContent = `${index + 1} / ${texts.length}`;

  chunkGrid.replaceChildren();
  text.chunks.forEach(chunk => {
    const card = document.createElement("article");
    card.className = "chunk-card";

    const word = document.createElement("div");
    word.className = "chunk-word";
    const h3 = document.createElement("h3");
    h3.textContent = chunk.surface;
    const gloss = document.createElement("p");
    gloss.textContent = chunk.gloss;
    word.append(h3, gloss);

    const morphs = document.createElement("div");
    morphs.className = "morphemes";
    chunk.morphemes.forEach(([form, meaning, type]) => {
      const el = document.createElement("span");
      el.className = morphClass(type);
      el.textContent = `${form} · ${meaning}`;
      morphs.append(el);
    });

    const explain = document.createElement("div");
    explain.className = "chunk-explain";
    const label = document.createElement("strong");
    label.textContent = "Grammar";
    const p = document.createElement("p");
    p.textContent = chunk.grammar;
    explain.append(label, p);

    card.append(word, morphs, explain);
    chunkGrid.append(card);
  });

  structureLine.replaceChildren();
  text.structure.forEach((item, i) => {
    const block = document.createElement("span");
    block.className = "structure-block";
    block.textContent = item;
    structureLine.append(block);
    if (i < text.structure.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "structure-arrow";
      arrow.textContent = "→";
      structureLine.append(arrow);
    }
  });
  structureNote.textContent = text.structureNote;
}

texts.forEach((text, index) => {
  const button = document.createElement("button");
  button.className = "text-choice";
  button.type = "button";
  button.role = "tab";
  button.setAttribute("aria-selected", String(index === 0));
  const title = document.createElement("strong");
  title.textContent = text.title;
  const preview = document.createElement("small");
  preview.textContent = text.tr;
  button.append(title, preview);
  button.addEventListener("click", () => render(index));
  picker.append(button);
});

render(0);
