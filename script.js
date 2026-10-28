const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
const themeButton = document.querySelector('#theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? 'Light' : 'Dark';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171e19' : '#f5f6f2';
}
try {
  const storedTheme = localStorage.getItem('duy-theme');
  setTheme(storedTheme === 'dark' ? 'dark' : 'light');
} catch {
  setTheme('light');
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('duy-theme', theme); } catch { /* Theme remains usable when storage is unavailable. */ }
});
const cards = document.querySelectorAll('.project');
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    filter.classList.toggle('active', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const projects = [
  { title: 'UEBA Endpoint Monitoring', meta: 'TEAM PROJECT / AI20K BUILD COHORT 2', description: 'A team project detecting anomalous user and device behavior in endpoint logs, focusing on insider threats and account compromise.', points: ['Pipeline: endpoint collectors → FastAPI → log normalization → GCN-LSTM + Last Position Attention + FAISS → anomaly scores and alerts.', 'Evidence-based LLM alert explanations with multi-turn chat and memory. The LLM supports analysis rather than replacing anomaly detection.', 'A React + TypeScript dashboard, PostgreSQL, JWT/RBAC, and an endpoint agent with SQLite buffering. Includes deployment documentation and a test suite.'], tags: ['FastAPI', 'React', 'PostgreSQL', 'GCN-LSTM', 'FAISS', 'LLM'], repo: 'https://github.com/AI20K-Build-Cohort-2/C2-App-047' },
  { title: 'Skeleton-based Human Action Recognition', meta: 'INDIVIDUAL PROJECT / 2026', description: 'A skeleton-based action recognition pipeline using ST-GCN, evaluated on NTU RGB+D 60 under the Cross-Subject (XSub) protocol.', points: ['Normalized COCO-17 sequences with coordinates and keypoint confidence, uniform frame sampling, and Person × Time × Joint × Channel formatting.', 'Explored Joint and Joint Motion streams, combining class probabilities through score-level late fusion.', 'Integrated person detection → MMPose → preprocessing → ST-GCN. Implemented sliding-window inference with temporal smoothing and investigated the domain gap between training skeletons and poses extracted from real videos.'], tags: ['PyTorch', 'ST-GCN', 'MMPose', 'COCO-17', 'NTU RGB+D 60'], repo: 'https://github.com/mzuyyy/Human-action-recognition' },
  { title: 'BirdCLEF 2025: Birdcall Identification', meta: 'INDIVIDUAL KAGGLE PROJECT / 2025', description: 'A birdcall classification pipeline for noisy tropical soundscapes, focused on reducing false positives caused by human speech.', points: ['Preprocessed audio with human-voice filtered spectrograms to reduce speech interference.', 'Trained EfficientNet-B0 in PyTorch with FocalBCE Loss and label smoothing to address class imbalance and noisy labels.', 'Achieved a peak private score of 0.8 and a public score of 0.799.'], tags: ['Audio Classification', 'EfficientNet-B0', 'PyTorch', 'FocalBCE'], repo: 'https://www.kaggle.com/code/duymaingoc/birdclef-2025-s-submission', linkLabel: 'View Kaggle notebook ↗' },
  { title: 'Sino-Nom Character Recognition', meta: 'GROUP PROJECT / MEMBER / 2023', description: 'An OCR system for digitizing and preserving Sino-Nom texts from historical manuscripts.', points: ['Analyzed and preprocessed two datasets, addressing complex characters and limited training data.', 'Implemented and evaluated ResNet-18, ResNet-34, and ResNet-50 to balance accuracy and performance.', 'Achieved a peak classification accuracy of 80%. Contributed as a team member.'], tags: ['OCR', 'ResNet-18/34/50', 'Data Preprocessing'], repo: 'https://github.com/huynq2k4/Sino-Nom-recognition/tree/main' },
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-meta').textContent = project.meta;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-points').replaceChildren(...project.points.map(point => {
    const item = document.createElement('li'); item.textContent = point; return item;
  }));
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
    const item = document.createElement('span'); item.textContent = tag; return item;
  }));
  const repoLink = document.querySelector('#dialog-repo');
  repoLink.hidden = !project.repo;
  repoLink.textContent = project.linkLabel || 'View repository ↗';
  if (project.repo) repoLink.href = project.repo; else repoLink.removeAttribute('href');
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog || event.detail === 0) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
document.querySelector('#copy-email').addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(email); status.textContent = 'Email copied.'; }
  catch { status.textContent = `Copy manually: ${email}`; }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
