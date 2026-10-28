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
  themeButton.textContent = theme === 'dark' ? '[ Sáng ]' : '[ Tối ]';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101827' : '#f4f8ff';
}
try {
  const storedTheme = localStorage.getItem('duy-theme');
  setTheme(storedTheme === 'dark' || (storedTheme === null && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
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
  { title: 'UEBA Endpoint Monitoring', meta: 'TEAM PROJECT / AI20K BUILD COHORT 2', description: 'Dự án nhóm phát hiện hành vi bất thường của user/device từ endpoint logs, hướng tới các tình huống insider threat và account compromise. Thông tin kiến trúc được tổng hợp từ README của repository; không quy toàn bộ hệ thống thành đóng góp cá nhân.', points: ['Pipeline: endpoint collectors → FastAPI → chuẩn hóa logs → GCN-LSTM + Last Position Attention + FAISS → anomaly score và alerts.', 'LLM giải thích cảnh báo dựa trên evidence, kết hợp multi-turn chat và memory. LLM hỗ trợ phân tích, không thay thế anomaly detection.', 'Dashboard React + TypeScript, PostgreSQL, JWT/RBAC và endpoint agent có SQLite buffer. Repository có tài liệu triển khai và kiểm thử.'], tags: ['FastAPI', 'React', 'PostgreSQL', 'GCN-LSTM', 'FAISS', 'LLM'], repo: 'https://github.com/AI20K-Build-Cohort-2/C2-App-047' },
  { title: 'Skeleton-based Human Action Recognition', meta: 'INDIVIDUAL PROJECT / 2026', description: 'Pipeline nhận dạng hành động từ skeleton sử dụng ST-GCN, đánh giá trên NTU RGB+D 60 theo giao thức Cross-Subject (XSub).', points: ['Chuẩn hóa chuỗi COCO-17 với tọa độ và keypoint confidence, uniform frame sampling và định dạng Person × Time × Joint × Channel.', 'Thử nghiệm Joint và Joint Motion streams, kết hợp xác suất lớp bằng score-level late fusion.', 'Tích hợp person detection → MMPose → preprocessing → ST-GCN. Suy luận sliding-window cùng temporal smoothing; khảo sát domain gap giữa skeleton huấn luyện và pose trích từ video thật.'], tags: ['PyTorch', 'ST-GCN', 'MMPose', 'COCO-17', 'NTU RGB+D 60'] },
  { title: 'BirdCLEF 2025: Birdcall Identification', meta: 'INDIVIDUAL KAGGLE PROJECT / 2025', description: 'Pipeline phân loại tiếng chim trong soundscape nhiệt đới có nhiều nhiễu, tập trung giảm false positives do tiếng người.', points: ['Tiền xử lý bằng human-voice filtered spectrograms để giảm nhiễu giọng nói.', 'Huấn luyện EfficientNet-B0 bằng PyTorch, sử dụng FocalBCE Loss và label smoothing để xử lý mất cân bằng lớp và nhãn nhiễu.', 'Kết quả ghi trong CV: private score cao nhất 0.8; public score 0.799. Các điểm này được trình bày theo CV, chưa xác minh độc lập trên leaderboard.'], tags: ['Audio Classification', 'EfficientNet-B0', 'PyTorch', 'FocalBCE'] },
  { title: 'Sino-Nom Character Recognition', meta: 'GROUP PROJECT / MEMBER / 2023', description: 'Hệ thống OCR hỗ trợ số hóa và bảo tồn tư liệu Hán Nôm từ bản thảo lịch sử.', points: ['Phân tích và tiền xử lý hai bộ dữ liệu, xử lý ký tự phức tạp và dữ liệu ít tài nguyên.', 'Triển khai, đánh giá ResNet-18, ResNet-34 và ResNet-50 để cân bằng độ chính xác và hiệu năng.', 'Kết quả ghi trong CV: độ chính xác phân loại cao nhất 80%. Vai trò: thành viên dự án nhóm.'], tags: ['OCR', 'ResNet-18/34/50', 'Data Preprocessing'] },
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
  try { await navigator.clipboard.writeText(email); status.textContent = 'Đã sao chép email.'; }
  catch { status.textContent = `Sao chép thủ công: ${email}`; }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
