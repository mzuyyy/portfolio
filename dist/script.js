const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
const projectCards = document.querySelectorAll('.project');
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    filter.classList.toggle('active', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
}));
const projects = [
  { title: 'Forma Studio', description: 'Concept website cho studio nội thất. Bố cục editorial, bảng màu tự nhiên và không gian trưng bày tập trung vào từng sản phẩm. Phạm vi đề xuất: thiết kế giao diện, phát triển responsive và danh mục sản phẩm.', tags: ['Web development', 'Art direction', 'Responsive design'] },
  { title: 'Mono Finance', description: 'Concept ứng dụng quản lý tài chính cá nhân. Thiết kế giúp người dùng đọc số dư, theo dõi chi tiêu và hiểu xu hướng dòng tiền bằng hệ thống biểu đồ rõ ràng.', tags: ['UI/UX design', 'Design system', 'Mobile app concept'] },
  { title: 'The Daily Brew', description: 'Concept cửa hàng trực tuyến cho thương hiệu cà phê Việt. Hình ảnh ấm áp, typography giàu cá tính và trải nghiệm mua hàng từ khám phá sản phẩm đến giỏ hàng.', tags: ['E-commerce concept', 'Web development', 'Brand experience'] },
];
const dialog = document.querySelector('#project-dialog');
dialog.setAttribute('aria-labelledby', 'dialog-title');
projectCards.forEach(card => card.addEventListener('click', () => {
  const project = projects[Number(card.dataset.project)];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
    const element = document.createElement('span');
    element.textContent = tag;
    return element;
  }));
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#copy-email').addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = 'Đã sao chép email.';
  } catch {
    status.textContent = `Sao chép thủ công: ${email}`;
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
