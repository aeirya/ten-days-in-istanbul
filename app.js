const state = {
  data: null,
  basics: null,
  activeMission: null,
  learned: new Set(JSON.parse(localStorage.getItem('istanbul.learned') || '[]')),
  showTranslations: true,
  showLearned: true,
  search: ''
};

const $ = (selector) => document.querySelector(selector);
const els = {
  missionFilters: $('#missionFilters'),
  phraseGrid: $('#phraseGrid'),
  vocabGrid: $('#vocabGrid'),
  vocabSection: $('#vocabSection'),
  vocabCount: $('#vocabCount'),
  basicsSection: $('#basicsSection'),
  basicsGroups: $('#basicsGroups'),
  basicsCount: $('#basicsCount'),
  summary: $('#summary'),
  missionGoal: $('#missionGoal'),
  emptyState: $('#emptyState'),
  search: $('#search'),
  showAll: $('#showAll'),
  translationsToggle: $('#translationsToggle'),
  learnedToggle: $('#learnedToggle'),
  progressText: $('#progressText'),
  progressBar: $('#progressBar'),
  resetProgress: $('#resetProgress'),
  template: $('#phraseTemplate')
};

function phraseKey(missionId, phrase) {
  return `${missionId}::${phrase.tr}`;
}

function saveLearned() {
  localStorage.setItem('istanbul.learned', JSON.stringify([...state.learned]));
}

function allPhrases() {
  return state.data.missions.flatMap(mission =>
    mission.phrases.map(phrase => ({ mission, phrase }))
  );
}

function selectedMissions() {
  if (!state.activeMission) return state.data.missions;
  return state.data.missions.filter(mission => mission.id === state.activeMission);
}

function normalizedSearch() {
  return state.search.toLocaleLowerCase('tr');
}

function matchesSearch(mission, phrase) {
  if (!state.search) return true;
  const haystack = [
    mission.title,
    mission.goal,
    phrase.tr,
    phrase.en,
    phrase.kind,
    ...(phrase.tags || [])
  ].join(' ').toLocaleLowerCase('tr');
  return haystack.includes(normalizedSearch());
}

function matchesBasicSearch(group, item) {
  if (!state.search) return true;
  return [group.title, ...item]
    .join(' ')
    .toLocaleLowerCase('tr')
    .includes(normalizedSearch());
}

function renderMissionFilters() {
  els.missionFilters.replaceChildren();
  state.data.missions.forEach(mission => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `mission-button${state.activeMission === mission.id ? ' active' : ''}`;
    button.innerHTML = `
      <span class="mission-icon" aria-hidden="true">${mission.icon}</span>
      <span class="mission-name">${mission.title}</span>
      <span class="mission-count">${mission.phrases.length}</span>`;
    button.addEventListener('click', () => {
      state.activeMission = mission.id;
      render();
    });
    els.missionFilters.append(button);
  });
}

function renderBasics() {
  els.basicsGroups.replaceChildren();
  let visibleCount = 0;

  state.basics.groups.forEach(group => {
    const visibleItems = group.items.filter(item => matchesBasicSearch(group, item));
    if (!visibleItems.length) return;
    visibleCount += visibleItems.length;

    const section = document.createElement('section');
    section.className = 'basics-group';

    const heading = document.createElement('h3');
    heading.textContent = `${group.icon} ${group.title}`;
    section.append(heading);

    const grid = document.createElement('div');
    grid.className = 'basics-grid';

    visibleItems.forEach(([tr, en]) => {
      const item = document.createElement('div');
      item.className = 'basic-item';

      const turkish = document.createElement('strong');
      turkish.textContent = tr;
      item.append(turkish);

      const english = document.createElement('span');
      english.className = 'basic-english';
      english.textContent = en;
      english.hidden = !state.showTranslations;
      item.append(english);

      grid.append(item);
    });

    section.append(grid);
    els.basicsGroups.append(section);
  });

  const total = state.basics.groups.reduce((sum, group) => sum + group.items.length, 0);
  els.basicsCount.textContent = state.search ? `${visibleCount} / ${total}` : `${total} words`;
  els.basicsSection.hidden = visibleCount === 0;
}

function renderPhrases() {
  const visible = [];
  selectedMissions().forEach(mission => {
    mission.phrases.forEach(phrase => {
      const key = phraseKey(mission.id, phrase);
      const learned = state.learned.has(key);
      if (!state.showLearned && learned) return;
      if (!matchesSearch(mission, phrase)) return;
      visible.push({ mission, phrase, key, learned });
    });
  });

  els.phraseGrid.replaceChildren();
  visible.forEach(({ mission, phrase, key, learned }) => {
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.classList.toggle('learned', learned);

    const badges = node.querySelector('.badges');
    const missionBadge = document.createElement('span');
    missionBadge.className = 'badge';
    missionBadge.textContent = `${mission.icon} ${mission.title}`;
    badges.append(missionBadge);

    const kindBadge = document.createElement('span');
    kindBadge.className = 'tag';
    kindBadge.textContent = phrase.kind;
    badges.append(kindBadge);

    node.querySelector('.turkish').textContent = phrase.tr;
    const english = node.querySelector('.english');
    english.textContent = phrase.en;
    english.hidden = !state.showTranslations;

    const checkbox = node.querySelector('.learned-control input');
    checkbox.checked = learned;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) state.learned.add(key);
      else state.learned.delete(key);
      saveLearned();
      renderPhrases();
      renderProgress();
    });

    const footer = node.querySelector('.phrase-footer');
    (phrase.tags || []).forEach(tag => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.textContent = tag;
      footer.append(el);
    });

    els.phraseGrid.append(node);
  });

  const selected = selectedMissions();
  const totalInSelection = selected.reduce((sum, m) => sum + m.phrases.length, 0);
  els.summary.textContent = state.activeMission
    ? `${visible.length} of ${totalInSelection} phrases`
    : `${visible.length} practical phrases across ${selected.length} missions`;
  els.emptyState.hidden = visible.length !== 0;

  const active = state.data.missions.find(m => m.id === state.activeMission);
  els.missionGoal.textContent = active ? active.goal : 'Pick a mission when you are about to do it, or search across everything.';
}

function renderVocabulary() {
  const seen = new Map();
  selectedMissions().forEach(mission => {
    mission.vocabulary.forEach(([tr, en]) => {
      if (!seen.has(tr)) seen.set(tr, en);
    });
  });

  els.vocabGrid.replaceChildren();
  [...seen.entries()].forEach(([tr, en]) => {
    const item = document.createElement('div');
    item.className = 'vocab-item';

    const turkish = document.createElement('strong');
    turkish.textContent = tr;
    item.append(turkish);

    const english = document.createElement('span');
    english.textContent = en;
    english.hidden = !state.showTranslations;
    item.append(english);

    els.vocabGrid.append(item);
  });
  els.vocabCount.textContent = `${seen.size} words`;
  els.vocabSection.hidden = seen.size === 0;
}

function renderProgress() {
  const total = allPhrases().length;
  const validKeys = new Set(allPhrases().map(({ mission, phrase }) => phraseKey(mission.id, phrase)));
  const learned = [...state.learned].filter(key => validKeys.has(key)).length;
  const pct = total ? Math.round((learned / total) * 100) : 0;
  els.progressText.textContent = `${learned} / ${total}`;
  els.progressBar.style.width = `${pct}%`;
}

function render() {
  renderMissionFilters();
  renderBasics();
  renderPhrases();
  renderVocabulary();
  renderProgress();
}

els.showAll.addEventListener('click', () => {
  state.activeMission = null;
  render();
});

els.search.addEventListener('input', event => {
  state.search = event.target.value.trim();
  renderBasics();
  renderPhrases();
});

els.translationsToggle.addEventListener('change', event => {
  state.showTranslations = event.target.checked;
  renderBasics();
  renderPhrases();
  renderVocabulary();
});

els.learnedToggle.addEventListener('change', event => {
  state.showLearned = event.target.checked;
  renderPhrases();
});

els.resetProgress.addEventListener('click', () => {
  if (!state.learned.size) return;
  state.learned.clear();
  saveLearned();
  render();
});

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function init() {
  try {
    [state.data, state.basics] = await Promise.all([
      loadJson('config/missions.json'),
      loadJson('config/basics.json')
    ]);
    render();
  } catch (error) {
    els.emptyState.hidden = false;
    els.emptyState.textContent = `Could not load study data: ${error.message}. Serve the repository through a local HTTP server instead of opening index.html directly.`;
    console.error(error);
  }
}

init();
