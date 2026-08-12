const meaning = (category, term, answer, distractors, note) => ({
  category, type: 'meaning', term, answer, distractors, note
});

const gap = (category, prompt, answer, distractors, note) => ({
  category, type: 'gap', prompt, answer, distractors, note
});

const QUESTION_BANK = [
  meaning('word', 'havaalanı', 'airport', ['station', 'transfer', 'exit'], 'havaalanı = airport'),
  meaning('word', 'aktarma', 'transfer', ['platform', 'address', 'entrance'], 'Useful for metro, bus, and ferry connections.'),
  meaning('word', 'çıkış', 'exit', ['entrance', 'street', 'stop'], 'Look for Çıkış signs when leaving stations.'),
  meaning('word', 'giriş', 'entrance', ['exit', 'receipt', 'line'], 'giriş = entrance'),
  meaning('word', 'yakın', 'near', ['far', 'straight', 'right'], 'yakın = near / close'),
  meaning('word', 'uzak', 'far', ['near', 'left', 'on foot'], 'uzak = far'),
  meaning('word', 'hesap', 'bill / check', ['cash', 'card', 'receipt'], 'At a restaurant: Hesap, lütfen. = The bill, please.'),
  meaning('word', 'sağ', 'right', ['left', 'straight', 'near'], 'sağ = right; sol = left'),
  meaning('word', 'sol', 'left', ['right', 'straight', 'far'], 'sol = left; sağ = right'),
  meaning('word', 'düz', 'straight', ['left', 'right', 'near'], 'düz = straight'),
  meaning('word', 'yürüyerek', 'on foot', ['by metro', 'by taxi', 'nearby'], 'yürümek = to walk; yürüyerek = by walking / on foot'),
  meaning('word', 'tamir', 'repair', ['screen', 'price', 'problem'], 'tamir = repair'),
  meaning('word', 'ekran', 'screen', ['keyboard', 'battery', 'charger'], 'ekran = screen / display'),
  meaning('word', 'şarj', 'charging / charge', ['battery', 'screen', 'data'], 'şarj is used for charging / charge.'),
  meaning('word', 'tuş', 'key / button', ['keyboard', 'part', 'screen'], 'For a keyboard key or a button.'),
  meaning('word', 'garanti', 'warranty', ['price', 'original', 'repair'], 'garanti = warranty / guarantee'),
  meaning('word', 'ikinci el', 'second-hand', ['original', 'compatible', 'broken'], 'ikinci el literally means second hand.'),
  meaning('word', 'parça', 'part / component', ['price', 'problem', 'charger'], 'Useful at repair shops: parça = part.'),
  meaning('word', 'fiyat', 'price', ['bill', 'cash', 'warranty'], 'fiyat = price'),
  meaning('word', 'sorun', 'problem', ['repair', 'data', 'part'], 'Sorun değil. = No problem.'),

  meaning('expression', 'Sağ ol', 'Thanks', ['Goodbye', 'Excuse me', 'No problem'], 'Very common informal thanks.'),
  meaning('expression', 'Sağ olun', 'Thank you (polite/plural)', ['Welcome', 'Take care', 'See you'], 'Polite or plural version of sağ ol.'),
  meaning('expression', 'Sağ olasın', 'Thanks / bless you', ['Get well soon', 'Enjoy your meal', 'Good night'], 'Warm, informal, and a little more expressive than sağ ol.'),
  meaning('expression', 'Pardon', 'Excuse me / sorry', ['Please', 'Thanks', 'Of course'], 'Quick and useful for passing someone or a tiny bump.'),
  meaning('expression', 'Affedersiniz', 'Excuse me', ['You’re welcome', 'See you', 'Good morning'], 'A more polite way to get a stranger’s attention.'),
  meaning('expression', 'Kusura bakmayın', 'Sorry / excuse me', ['Take care', 'No problem', 'Go ahead'], 'For a real inconvenience or minor mistake.'),
  meaning('expression', 'Görüşürüz', 'See you', ['Welcome', 'Good morning', 'Thanks'], 'The easiest general everyday goodbye.'),
  meaning('expression', 'Hoşça kal', 'Goodbye — said by the person leaving', ['Goodbye — said by the person staying', 'Welcome', 'Good night'], 'The leaver says hoşça kal to the person staying.'),
  meaning('expression', 'Güle güle', 'Goodbye — said by the person staying', ['Goodbye — said by the person leaving', 'See you tomorrow', 'Take care of yourself'], 'The person staying says güle güle to the person leaving.'),
  meaning('expression', 'Kolay gelsin', 'Hope the work goes easily', ['Enjoy your meal', 'Get well soon', 'Congratulations'], 'Say it to someone who is working.'),
  meaning('expression', 'Afiyet olsun', 'Enjoy your meal', ['Get well soon', 'Good luck with work', 'Bless you'], 'Used around eating, before/during/after.'),
  meaning('expression', 'Eline sağlık', 'Thanks / praise to the person who made it', ['Get well soon', 'Welcome', 'Take care'], 'Often said to someone who cooked or made something.'),
  meaning('expression', 'Geçmiş olsun', 'Get well soon / hope it passes', ['Enjoy your meal', 'Congratulations', 'Welcome'], 'For illness, injury, accidents, or unpleasant events.'),
  meaning('expression', 'Hayırlı olsun', 'Congratulations / may it be auspicious', ['Excuse me', 'Good night', 'No problem'], 'For a new purchase, home, job, business, etc.'),
  meaning('expression', 'Hoş bulduk', 'Reply to “welcome”', ['Reply to “thank you”', 'Reply to a sneeze', 'A goodbye'], 'Common reply to hoş geldin / hoş geldiniz.'),
  meaning('expression', 'Çok yaşa', 'Bless you (after a sneeze)', ['Good luck', 'Take care', 'Thanks a lot'], 'Literally “live long.”'),
  meaning('expression', 'Bir şey değil', 'It’s nothing / no problem', ['I don’t know', 'It doesn’t matter', 'One second'], 'Casual response to thanks.'),
  meaning('expression', 'Ne demek', 'Don’t mention it', ['What does it mean?', 'I understand', 'Of course not'], 'A warm response to thanks.'),
  meaning('expression', 'Bakar mısınız?', 'Excuse me / could you look?', ['Can I buy this?', 'Where is it?', 'How much is it?'], 'Common for getting a waiter or shop worker’s attention.'),
  meaning('expression', 'Fark etmez', 'It doesn’t matter / either is fine', ['I don’t understand', 'That won’t work', 'No problem'], 'Useful when either option is acceptable.'),

  // 40 additional context questions — deliberately weighted toward missing-word recall.
  gap('word', 'Metrodan çıkmak için ____ tabelasını takip et. = Follow the EXIT sign.', 'çıkış', ['giriş', 'aktarma', 'durak'], 'çıkış = exit'),
  gap('word', 'İçeri girmek için ____ nerede? = Where is the entrance?', 'giriş', ['çıkış', 'sokak', 'hat'], 'giriş = entrance'),
  gap('word', 'Başka hatta geçmek için ____ yapmalıyım. = I need to make a transfer.', 'aktarma', ['giriş', 'adres', 'fiyat'], 'aktarma = transfer / connection'),
  gap('word', 'Burası ____ mı? Yürüyebilir miyim? = Is this near? Can I walk?', 'yakın', ['uzak', 'düz', 'sol'], 'yakın = near'),
  gap('word', 'Çok ____ mı? = Is it very far?', 'uzak', ['yakın', 'sağ', 'düz'], 'uzak = far'),
  gap('word', 'Restoranda: “____, lütfen.” = “The bill, please.”', 'Hesap', ['Fiş', 'Fiyat', 'Nakit'], 'Hesap, lütfen. is the standard way to ask for the bill.'),
  gap('word', 'Sağa değil, ____ dön. = Turn left, not right.', 'sola', ['sağa', 'düz', 'yakın'], 'sol = left; sola = to the left.'),
  gap('word', '____ git, sonra sağa dön. = Go straight, then turn right.', 'Düz', ['Sol', 'Yakın', 'Uzak'], 'düz = straight'),
  gap('word', 'Buradan ____ gidebilir miyim? = Can I go from here on foot?', 'yürüyerek', ['aktarma', 'uzak', 'durak'], 'yürüyerek = on foot / by walking'),
  gap('word', 'MacBook’un ____ ihtiyacı var. = The MacBook needs repair.', 'tamire', ['fiyata', 'ekrana', 'garantiye'], 'tamir = repair; tamire = to/for repair.'),
  gap('word', '____ kırık, ama bilgisayar açılıyor. = The screen is broken, but the computer turns on.', 'Ekran', ['Tuş', 'Şarj', 'Parça'], 'ekran = screen / display'),
  gap('word', 'Bilgisayar ____ olmuyor. = The computer isn’t charging.', 'şarj', ['tamir', 'fiyat', 'garanti'], 'şarj olmak = to charge.'),
  gap('word', 'Sağ ok ____ çalışmıyor. = The right-arrow key doesn’t work.', 'tuşu', ['ekranı', 'parçası', 'fiyatı'], 'tuş = key/button; tuşu = the key / its key.'),
  gap('word', 'Bu cihazın ____ var mı? = Does this device have a warranty?', 'garantisi', ['fiyatı', 'sorunu', 'adres'], 'garanti = warranty; garantisi var mı? = does it have a warranty?'),
  gap('word', 'Yeni çok pahalı; ____ bakıyorum. = New is expensive; I’m looking for second-hand.', 'ikinci el', ['orijinal', 'nakit', 'yakın'], 'ikinci el = second-hand'),
  gap('word', 'Bu ____ orijinal mi? = Is this part original?', 'parça', ['fiyat', 'sorun', 'durak'], 'parça = part / component'),
  gap('word', '____ ne kadar? = What is the price?', 'Fiyat', ['Hesap', 'Fiş', 'Kart'], 'fiyat = price'),
  gap('word', 'Bir ____ var: sağ ok çalışmıyor. = There is a problem: the right arrow doesn’t work.', 'sorun', ['garanti', 'parça', 'aktarma'], 'sorun = problem'),
  gap('word', 'Ödeme yaptıktan sonra ____ alabilir miyim? = Can I get a receipt after paying?', 'fiş', ['nakit', 'hat', 'çıkış'], 'fiş = receipt'),
  gap('word', 'Kart geçmiyorsa ____ ödeyebilirim. = If the card doesn’t work, I can pay cash.', 'nakit', ['adres', 'durak', 'giriş'], 'nakit = cash'),

  gap('expression', 'A shop worker is busy fixing something. You leave and say: “____!”', 'Kolay gelsin', ['Afiyet olsun', 'Geçmiş olsun', 'Güle güle'], 'Kolay gelsin is said to someone who is working.'),
  gap('expression', 'Someone is eating. You say: “____!”', 'Afiyet olsun', ['Çok yaşa', 'Hayırlı olsun', 'Sağ ol'], 'Afiyet olsun = enjoy your meal.'),
  gap('expression', 'Your friend has been ill. You say: “____.”', 'Geçmiş olsun', ['Kolay gelsin', 'Hoş bulduk', 'Ne demek'], 'Geçmiş olsun is used for illness, injury, or an unpleasant event.'),
  gap('expression', 'Your friend bought a new laptop. A natural thing to say is: “____!”', 'Hayırlı olsun', ['Afiyet olsun', 'Pardon', 'Bir şey değil'], 'Hayırlı olsun is used for a new purchase, job, home, business, etc.'),
  gap('expression', 'Someone cooked dinner for you. You can say: “____.”', 'Eline sağlık', ['Geçmiş olsun', 'Güle güle', 'Affedersiniz'], 'Eline sağlık praises/thanks the person who cooked or made something.'),
  gap('expression', 'Someone sneezes. You say: “____!”', 'Çok yaşa', ['Sağ ol', 'Görüşürüz', 'Kolay gelsin'], 'Çok yaşa = bless you after a sneeze.'),
  gap('expression', 'A host says “Hoş geldiniz.” You reply: “____.”', 'Hoş bulduk', ['Hoşça kal', 'Sağ olun', 'Ne demek'], 'Hoş bulduk is the conventional reply to hoş geldin / hoş geldiniz.'),
  gap('expression', 'You are the one LEAVING. To the person staying, say: “____.”', 'Hoşça kal', ['Güle güle', 'Hoş bulduk', 'İyi geceler'], 'The person leaving says hoşça kal.'),
  gap('expression', 'You are STAYING while your friend leaves. Say: “____.”', 'Güle güle', ['Hoşça kal', 'Görüşürüz', 'Pardon'], 'The person staying says güle güle.'),
  gap('expression', 'You expect to meet the person again soon. The easiest goodbye is: “____.”', 'Görüşürüz', ['Affedersiniz', 'Sağ olasın', 'Afiyet olsun'], 'Görüşürüz = see you.'),
  gap('expression', 'A friend helps you carry a bag. Informally: “____.”', 'Sağ ol', ['Pardon', 'Olmaz', 'Güle güle'], 'Sağ ol is very common informal thanks.'),
  gap('expression', 'A stranger helps you. A polite version of “thanks” is: “____.”', 'Sağ olun', ['Sağ ol', 'Çok yaşa', 'Hoş bulduk'], 'Sağ olun is polite singular or plural.'),
  gap('expression', 'A friend does you a favor and you want a warmer informal “thanks / bless you”: “____.”', 'Sağ olasın', ['Sağ olun', 'Geçmiş olsun', 'Ne demek'], 'Sağ olasın is warmer and more expressive than sağ ol.'),
  gap('expression', 'You need to squeeze past someone on the metro: “____.”', 'Pardon', ['Hayırlı olsun', 'Görüşürüz', 'Tamam'], 'Pardon is the quickest everyday “excuse me / sorry.”'),
  gap('expression', 'You politely get a stranger’s attention: “____.”', 'Affedersiniz', ['Bir şey değil', 'Fark etmez', 'Çok yaşa'], 'Affedersiniz is a polite “excuse me.”'),
  gap('expression', 'You caused a small inconvenience and want to apologize: “____.”', 'Kusura bakmayın', ['Kolay gelsin', 'Hoş bulduk', 'Sağ ol'], 'Kusura bakmayın is useful for a real inconvenience or minor mistake.'),
  gap('expression', 'At a café, to get the waiter’s attention: “____?”', 'Bakar mısınız?', ['Ne kadar?', 'Görüşürüz?', 'Olur mu?'], 'Bakar mısınız? is a common way to get service staff’s attention.'),
  gap('expression', 'They ask “tea or coffee?” and either is fine. You say: “____.”', 'Fark etmez', ['Anlamadım', 'Olmaz', 'Geçmiş olsun'], 'Fark etmez = it doesn’t matter / either is fine.'),
  gap('expression', 'Someone thanks you. A standard polite response is: “____.”', 'Rica ederim', ['Kusura bakmayın', 'Hoşça kal', 'Çok yaşa'], 'Rica ederim = you’re welcome.'),
  gap('expression', 'Someone thanks you and you casually say “It’s nothing”: “____.”', 'Bir şey değil', ['Ne demek', 'Sağ olasın', 'Kolay gelsin'], 'Bir şey değil = it’s nothing / no problem.')
];

const categorySelect = document.querySelector('#quizCategory');
const lengthSelect = document.querySelector('#quizLength');
const startButton = document.querySelector('#startQuiz');
const quizCard = document.querySelector('#quizCard');
const resultCard = document.querySelector('#quizResult');
const progressText = document.querySelector('#quizProgressText');
const scoreText = document.querySelector('#quizScoreText');
const progressBar = document.querySelector('#quizProgressBar');
const kindLabel = document.querySelector('#quizKind');
const questionText = document.querySelector('#quizQuestion');
const optionsBox = document.querySelector('#quizOptions');
const feedbackBox = document.querySelector('#quizFeedback');
const nextButton = document.querySelector('#nextQuestion');
const resultScore = document.querySelector('#resultScore');
const resultMessage = document.querySelector('#resultMessage');
const missedList = document.querySelector('#missedList');
const retryButton = document.querySelector('#retryQuiz');

let session = [];
let index = 0;
let score = 0;
let missed = [];
let answered = false;

const ANSWER_KEYS = new Map([
  ['1', 0], ['a', 0],
  ['2', 1], ['b', 1],
  ['3', 2], ['c', 2],
  ['4', 3], ['d', 3]
]);

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function questionPrompt(question) {
  if (question.type === 'gap') return question.prompt;
  return `What does “${question.term}” mean?`;
}

function questionLabel(question) {
  return question.term || question.prompt.replace('____', '[…]');
}

function startQuiz() {
  const category = categorySelect.value;
  const pool = category === 'mixed'
    ? QUESTION_BANK
    : QUESTION_BANK.filter((q) => q.category === category);

  const requested = lengthSelect.value === 'all' ? pool.length : Number(lengthSelect.value);
  session = shuffle(pool).slice(0, Math.min(requested, pool.length));
  index = 0;
  score = 0;
  missed = [];
  resultCard.hidden = true;
  quizCard.hidden = false;
  renderQuestion();
  quizCard.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function renderQuestion() {
  answered = false;
  const question = session[index];
  const number = index + 1;
  progressText.textContent = `Question ${number} / ${session.length}`;
  scoreText.textContent = `Score ${score}`;
  progressBar.style.width = `${((number - 1) / session.length) * 100}%`;
  kindLabel.textContent = question.type === 'gap'
    ? `${question.category} · fill the gap`
    : question.category;
  questionText.textContent = questionPrompt(question);
  feedbackBox.hidden = true;
  feedbackBox.className = 'quiz-feedback';
  feedbackBox.replaceChildren();
  nextButton.hidden = true;
  optionsBox.replaceChildren();

  shuffle([question.answer, ...question.distractors]).forEach((choice, choiceIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.dataset.choice = choice;
    button.setAttribute('aria-keyshortcuts', `${choiceIndex + 1} ${String.fromCharCode(65 + choiceIndex)}`);

    const key = document.createElement('span');
    key.className = 'option-key';
    key.textContent = String(choiceIndex + 1);

    const text = document.createElement('span');
    text.textContent = choice;

    button.append(key, text);
    button.addEventListener('click', () => answerQuestion(button, choice));
    optionsBox.append(button);
  });
}

function answerQuestion(button, choice) {
  if (answered) return;
  answered = true;
  const question = session[index];
  const correct = choice === question.answer;

  [...optionsBox.children].forEach((optionButton) => {
    optionButton.disabled = true;
    if (optionButton.dataset.choice === question.answer) optionButton.classList.add('correct');
  });

  const lead = document.createElement('strong');
  const detail = document.createTextNode(` ${question.note}`);

  if (correct) {
    score += 1;
    feedbackBox.classList.add('good');
    lead.textContent = 'Correct.';
  } else {
    button.classList.add('wrong');
    missed.push(question);
    feedbackBox.classList.add('bad');
    lead.textContent = `${question.answer} —`;
  }

  feedbackBox.append(lead, detail);
  scoreText.textContent = `Score ${score}`;
  feedbackBox.hidden = false;
  nextButton.textContent = index === session.length - 1 ? 'See result' : 'Next';
  nextButton.hidden = false;
}

function nextQuestion() {
  if (!answered) return;
  if (index < session.length - 1) {
    index += 1;
    renderQuestion();
    return;
  }
  finishQuiz();
}

function finishQuiz() {
  quizCard.hidden = true;
  resultCard.hidden = false;
  progressBar.style.width = '100%';
  resultScore.textContent = `${score} / ${session.length}`;
  const percent = Math.round((score / session.length) * 100);
  resultMessage.textContent = percent >= 90
    ? 'Excellent — these are sticking.'
    : percent >= 70
      ? 'Solid. Review the misses once and run another short quiz.'
      : 'Worth another pass. The missed items below are your highest-value review set.';

  missedList.replaceChildren();
  if (missed.length === 0) {
    const item = document.createElement('div');
    item.className = 'missed-item';
    const strong = document.createElement('strong');
    strong.textContent = 'No misses 🎉';
    const span = document.createElement('span');
    span.textContent = 'Run another randomized set if you want a harder check.';
    item.append(strong, span);
    missedList.append(item);
    return;
  }

  missed.forEach((question) => {
    const item = document.createElement('div');
    item.className = 'missed-item';
    const strong = document.createElement('strong');
    strong.textContent = `${questionLabel(question)} → ${question.answer}`;
    const span = document.createElement('span');
    span.textContent = question.note;
    item.append(strong, span);
    missedList.append(item);
  });
}

function shouldIgnoreShortcut(event) {
  const target = event.target;
  return target instanceof HTMLElement && (
    target.matches('input, select, textarea') || target.isContentEditable
  );
}

document.addEventListener('keydown', (event) => {
  if (shouldIgnoreShortcut(event) || event.metaKey || event.ctrlKey || event.altKey) return;

  const key = event.key.toLowerCase();

  if (!quizCard.hidden) {
    if (!answered && ANSWER_KEYS.has(key)) {
      const option = optionsBox.children[ANSWER_KEYS.get(key)];
      if (option) {
        event.preventDefault();
        option.click();
      }
      return;
    }

    if (answered && (key === 'enter' || key === 'n')) {
      event.preventDefault();
      nextQuestion();
      return;
    }

    if (key === 'r') {
      event.preventDefault();
      startQuiz();
    }
    return;
  }

  if (!resultCard.hidden && (key === 'enter' || key === 'r')) {
    event.preventDefault();
    startQuiz();
    return;
  }

  if (quizCard.hidden && resultCard.hidden && (key === 'enter' || key === 's')) {
    event.preventDefault();
    startQuiz();
  }
});

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
retryButton.addEventListener('click', startQuiz);
