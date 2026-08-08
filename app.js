const state = {
  data: null,
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
  return haystack.includes(state.search.toLocaleLowerCase('tr'));
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
    item.innerHTML = `<strong>${tr}</strong><span>${en}</span>`;
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
  renderPhrases();
});

els.translationsToggle.addEventListener('change', event => {
  state.showTranslations = event.target.checked;
  renderPhrases();
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

async function init() {
  try {
    const response = await fetch('config/missions.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    render();
  } catch (error) {
    els.emptyState.hidden = false;
    els.emptyState.textContent = `Could not load mission data: ${error.message}. Serve the repository through a local HTTP server instead of opening index.html directly.`;
    console.error(error);
  }
}

init();
