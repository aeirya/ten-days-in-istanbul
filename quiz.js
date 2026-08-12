const QUESTION_BANK = [
  { category: 'word', term: 'havaalanı', answer: 'airport', distractors: ['station', 'transfer', 'exit'], note: 'havaalanı = airport' },
  { category: 'word', term: 'aktarma', answer: 'transfer', distractors: ['platform', 'address', 'entrance'], note: 'Useful for metro, bus, and ferry connections.' },
  { category: 'word', term: 'çıkış', answer: 'exit', distractors: ['entrance', 'street', 'stop'], note: 'Look for Çıkış signs when leaving stations.' },
  { category: 'word', term: 'giriş', answer: 'entrance', distractors: ['exit', 'receipt', 'line'], note: 'giriş = entrance' },
  { category: 'word', term: 'yakın', answer: 'near', distractors: ['far', 'straight', 'right'], note: 'yakın = near / close' },
  { category: 'word', term: 'uzak', answer: 'far', distractors: ['near', 'left', 'on foot'], note: 'uzak = far' },
  { category: 'word', term: 'hesap', answer: 'bill / check', distractors: ['cash', 'card', 'receipt'], note: 'At a restaurant: Hesap, lütfen. = The bill, please.' },
  { category: 'word', term: 'sağ', answer: 'right', distractors: ['left', 'straight', 'near'], note: 'sağ = right; sol = left' },
  { category: 'word', term: 'sol', answer: 'left', distractors: ['right', 'straight', 'far'], note: 'sol = left; sağ = right' },
  { category: 'word', term: 'düz', answer: 'straight', distractors: ['left', 'right', 'near'], note: 'düz = straight' },
  { category: 'word', term: 'yürüyerek', answer: 'on foot', distractors: ['by metro', 'by taxi', 'nearby'], note: 'yürümek = to walk; yürüyerek = by walking / on foot' },
  { category: 'word', term: 'tamir', answer: 'repair', distractors: ['screen', 'price', 'problem'], note: 'tamir = repair' },
  { category: 'word', term: 'ekran', answer: 'screen', distractors: ['keyboard', 'battery', 'charger'], note: 'ekran = screen / display' },
  { category: 'word', term: 'şarj', answer: 'charging / charge', distractors: ['battery', 'screen', 'data'], note: 'şarj is used for charging / charge.' },
  { category: 'word', term: 'tuş', answer: 'key / button', distractors: ['keyboard', 'part', 'screen'], note: 'For a keyboard key or a button.' },
  { category: 'word', term: 'garanti', answer: 'warranty', distractors: ['price', 'original', 'repair'], note: 'garanti = warranty / guarantee' },
  { category: 'word', term: 'ikinci el', answer: 'second-hand', distractors: ['original', 'compatible', 'broken'], note: 'ikinci el literally means second hand.' },
  { category: 'word', term: 'parça', answer: 'part / component', distractors: ['price', 'problem', 'charger'], note: 'Useful at repair shops: parça = part.' },
  { category: 'word', term: 'fiyat', answer: 'price', distractors: ['bill', 'cash', 'warranty'], note: 'fiyat = price' },
  { category: 'word', term: 'sorun', answer: 'problem', distractors: ['repair', 'data', 'part'], note: 'Sorun değil. = No problem.' },

  { category: 'expression', term: 'Sağ ol', answer: 'Thanks', distractors: ['Goodbye', 'Excuse me', 'No problem'], note: 'Very common informal thanks.' },
  { category: 'expression', term: 'Sağ olun', answer: 'Thank you (polite/plural)', distractors: ['Welcome', 'Take care', 'See you'], note: 'Polite or plural version of sağ ol.' },
  { category: 'expression', term: 'Sağ olasın', answer: 'Thanks / bless you', distractors: ['Get well soon', 'Enjoy your meal', 'Good night'], note: 'Warm, informal, and a little more expressive than sağ ol.' },
  { category: 'expression', term: 'Pardon', answer: 'Excuse me / sorry', distractors: ['Please', 'Thanks', 'Of course'], note: 'Quick and useful for passing someone or a tiny bump.' },
  { category: 'expression', term: 'Affedersiniz', answer: 'Excuse me', distractors: ['You’re welcome', 'See you', 'Good morning'], note: 'A more polite way to get a stranger’s attention.' },
  { category: 'expression', term: 'Kusura bakmayın', answer: 'Sorry / excuse me', distractors: ['Take care', 'No problem', 'Go ahead'], note: 'For a real inconvenience or minor mistake.' },
  { category: 'expression', term: 'Görüşürüz', answer: 'See you', distractors: ['Welcome', 'Good morning', 'Thanks'], note: 'The easiest general everyday goodbye.' },
  { category: 'expression', term: 'Hoşça kal', answer: 'Goodbye — said by the person leaving', distractors: ['Goodbye — said by the person staying', 'Welcome', 'Good night'], note: 'The leaver says hoşça kal to the person staying.' },
  { category: 'expression', term: 'Güle güle', answer: 'Goodbye — said by the person staying', distractors: ['Goodbye — said by the person leaving', 'See you tomorrow', 'Take care of yourself'], note: 'The person staying says güle güle to the person leaving.' },
  { category: 'expression', term: 'Kolay gelsin', answer: 'Hope the work goes easily', distractors: ['Enjoy your meal', 'Get well soon', 'Congratulations'], note: 'Say it to someone who is working.' },
  { category: 'expression', term: 'Afiyet olsun', answer: 'Enjoy your meal', distractors: ['Get well soon', 'Good luck with work', 'Bless you'], note: 'Used around eating, before/during/after.' },
  { category: 'expression', term: 'Eline sağlık', answer: 'Thanks / praise to the person who made it', distractors: ['Get well soon', 'Welcome', 'Take care'], note: 'Literally “health to your hand”; often said to someone who cooked or made something.' },
  { category: 'expression', term: 'Geçmiş olsun', answer: 'Get well soon / hope it passes', distractors: ['Enjoy your meal', 'Congratulations', 'Welcome'], note: 'For illness, injury, accidents, or unpleasant events.' },
  { category: 'expression', term: 'Hayırlı olsun', answer: 'Congratulations / may it be auspicious', distractors: ['Excuse me', 'Good night', 'No problem'], note: 'For a new purchase, home, job, business, etc.' },
  { category: 'expression', term: 'Hoş bulduk', answer: 'Reply to “welcome”', distractors: ['Reply to “thank you”', 'Reply to a sneeze', 'A goodbye'], note: 'Common reply to hoş geldin / hoş geldiniz.' },
  { category: 'expression', term: 'Çok yaşa', answer: 'Bless you (after a sneeze)', distractors: ['Good luck', 'Take care', 'Thanks a lot'], note: 'Literally “live long.”' },
  { category: 'expression', term: 'Bir şey değil', answer: 'It’s nothing / no problem', distractors: ['I don’t know', 'It doesn’t matter', 'One second'], note: 'Casual response to thanks.' },
  { category: 'expression', term: 'Ne demek', answer: 'Don’t mention it', distractors: ['What does it mean?', 'I understand', 'Of course not'], note: 'A warm response to thanks.' },
  { category: 'expression', term: 'Bakar mısınız?', answer: 'Excuse me / could you look?', distractors: ['Can I buy this?', 'Where is it?', 'How much is it?'], note: 'Common for getting a waiter or shop worker’s attention.' },
  { category: 'expression', term: 'Fark etmez', answer: 'It doesn’t matter / either is fine', distractors: ['I don’t understand', 'That won’t work', 'No problem'], note: 'Useful when either option is acceptable.' }
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

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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
}

function renderQuestion() {
  answered = false;
  const question = session[index];
  const number = index + 1;
  progressText.textContent = `Question ${number} / ${session.length}`;
  scoreText.textContent = `Score ${score}`;
  progressBar.style.width = `${((number - 1) / session.length) * 100}%`;
  kindLabel.textContent = question.category;
  questionText.textContent = `What does “${question.term}” mean?`;
  feedbackBox.hidden = true;
  feedbackBox.className = 'quiz-feedback';
  nextButton.hidden = true;
  optionsBox.replaceChildren();

  shuffle([question.answer, ...question.distractors]).forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.textContent = choice;
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
    if (optionButton.textContent === question.answer) optionButton.classList.add('correct');
  });

  if (correct) {
    score += 1;
    feedbackBox.classList.add('good');
    feedbackBox.innerHTML = `<strong>Correct.</strong> ${question.note}`;
  } else {
    button.classList.add('wrong');
    missed.push(question);
    feedbackBox.classList.add('bad');
    feedbackBox.innerHTML = `<strong>${question.answer}</strong> — ${question.note}`;
  }

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
    item.innerHTML = '<strong>No misses 🎉</strong><span>Run another randomized set if you want a harder check.</span>';
    missedList.append(item);
    return;
  }

  missed.forEach((question) => {
    const item = document.createElement('div');
    item.className = 'missed-item';
    item.innerHTML = `<strong>${question.term} → ${question.answer}</strong><span>${question.note}</span>`;
    missedList.append(item);
  });
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
retryButton.addEventListener('click', startQuiz);
