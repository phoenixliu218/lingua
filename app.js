if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(e => console.error('SW', e));
  });
}

const SECTIONS = [
  { icon: '📚', title: 'Lessons', desc: '11 themed scenarios · Feira opening soon', route: '#/lessons' },
  { icon: '🖼️', title: 'Picture Words', desc: 'Visual vocabulary by category', route: '#/picture-words' },
  { icon: '📊', title: 'Numbers', desc: '1 to 1000, dates, prices', route: '#/numbers' },
  { icon: '📕', title: 'Vocabulary', desc: 'Your saved words & phrases', route: '#/vocabulary' },
];

const LESSONS = [
  { id: 'feira', icon: '🛒', title: 'Feira', desc: 'Open-air market', status: 'In design' },
  { id: 'cafe', icon: '☕', title: 'Café', desc: 'Coffee shop', status: 'Coming soon' },
  { id: 'uber', icon: '🚕', title: 'Uber / Taxi', desc: 'Getting around', status: 'Coming soon' },
  { id: 'host', icon: '🏠', title: 'Host', desc: 'Airbnb host chat', status: 'Coming soon' },
];

const TABS = [
  { id: 'dialog', icon: '💬', label: 'Dialog' },
  { id: 'vocab', icon: '📖', label: 'Vocab' },
  { id: 'grammar', icon: '🌐', label: 'Grammar' },
  { id: 'culture', icon: '🇧🇷', label: 'Culture' },
  { id: 'practice', icon: '✏️', label: 'Practice' },
];

const PIC_CATEGORIES = [
  { id: 'fruits', icon: '🍎', name: 'Fruits' },
  { id: 'vegetables', icon: '🥬', name: 'Vegetables' },
  { id: 'meats', icon: '🥩', name: 'Meats' },
  { id: 'seafood', icon: '🐟', name: 'Seafood' },
  { id: 'market', icon: '🛒', name: 'Market objects' },
  { id: 'kitchen', icon: '🍴', name: 'Kitchen' },
];

const app = document.getElementById('app');

function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

function topbar({ title, back = false, lang = true }) {
  const wrap = el('div', { class: 'topbar' });
  if (back) {
    wrap.appendChild(el('button', {
      class: 'back',
      onClick: () => {
        const path = (location.hash.slice(1) || '/').split('?')[0];
        const segs = path.split('/').filter(Boolean);
        segs.pop();
        location.hash = '#/' + segs.join('/');
      },
    }, '←'));
  } else {
    wrap.appendChild(el('span', { class: 'spacer' }));
  }
  wrap.appendChild(el('span', { class: 'title' }, title));
  if (lang) wrap.appendChild(el('button', { class: 'lang-toggle' }, 'PT ▼'));
  else wrap.appendChild(el('span', { class: 'spacer' }));
  return wrap;
}

function footer() {
  return el('div', { class: 'global-footer' }, [
    el('small', { html: 'Images from Pexels &amp; <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a> (CC-BY-SA)' }),
  ]);
}

function sectionCard({ icon, title, desc, route }) {
  return el('a', { class: 'section-card', href: route }, [
    el('div', { class: 'icon' }, icon),
    el('div', { class: 'meta' }, [
      el('h2', {}, title),
      el('p', {}, desc),
    ]),
    el('div', { class: 'chev' }, '›'),
  ]);
}

function renderHome() {
  const brand = el('div', { class: 'brand' }, [
    el('h1', {}, 'Lingua'),
    el('p', {}, 'Brazilian Portuguese · Spanish'),
  ]);
  const list = el('div', { class: 'section-list' });
  for (const s of SECTIONS) list.appendChild(sectionCard(s));
  return [topbar({ title: 'Lingua', back: false }), brand, list, footer()];
}

function renderLessons() {
  const list = el('div', { class: 'section-list' });
  for (const l of LESSONS) {
    list.appendChild(sectionCard({
      icon: l.icon,
      title: l.title,
      desc: `${l.desc} · ${l.status}`,
      route: `#/lessons/${l.id}`,
    }));
  }
  return [topbar({ title: 'Lessons', back: true }), list, footer()];
}

function getTabFromHash() {
  const m = location.hash.match(/\?tab=([a-z]+)/);
  return m ? m[1] : 'dialog';
}

function renderLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) {
    return [
      topbar({ title: 'Not found', back: true }),
      el('div', { class: 'empty' }, [
        el('div', { class: 'icon' }, '🤔'),
        el('strong', {}, 'Lesson not found'),
      ]),
      footer(),
    ];
  }
  const activeTab = getTabFromHash();
  const tabsRow = el('div', { class: 'tabs' });
  for (const t of TABS) {
    tabsRow.appendChild(el('button', {
      class: 'tab-btn' + (t.id === activeTab ? ' active' : ''),
      onClick: () => {
        history.replaceState(null, '', `#/lessons/${lessonId}?tab=${t.id}`);
        route();
      },
    }, `${t.icon} ${t.label}`));
  }
  const tabContent = el('div', { class: 'tab-content' }, [
    el('div', { class: 'placeholder' }, [
      el('strong', {}, `${TABS.find(t => t.id === activeTab).label} — coming next round`),
      el('p', {}, 'Markdown content will be drafted & verified, then rendered here.'),
    ]),
  ]);
  return [topbar({ title: `${lesson.icon} ${lesson.title}`, back: true }), tabsRow, tabContent, footer()];
}

function renderPictureWords() {
  const list = el('div', { class: 'section-list' });
  for (const c of PIC_CATEGORIES) {
    list.appendChild(sectionCard({
      icon: c.icon,
      title: c.name,
      desc: 'Coming soon',
      route: `#/picture-words/${c.id}`,
    }));
  }
  return [topbar({ title: 'Picture Words', back: true }), list, footer()];
}

function renderPictureCategory(catId) {
  const cat = PIC_CATEGORIES.find(c => c.id === catId);
  if (!cat) {
    return [
      topbar({ title: 'Not found', back: true }),
      el('div', { class: 'empty' }, [el('div', { class: 'icon' }, '🤔'), el('strong', {}, 'Category not found')]),
      footer(),
    ];
  }
  return [
    topbar({ title: `${cat.icon} ${cat.name}`, back: true }),
    el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, `${cat.name} grid`),
        el('p', {}, 'Photos sourced via Pexels API + Wikipedia.'),
      ]),
    ]),
    footer(),
  ];
}

function renderNumbers() {
  return [
    topbar({ title: 'Numbers', back: true }),
    el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, 'Numbers module'),
        el('p', {}, '1–1000, ordinals, dates, prices, phone digits.'),
      ]),
    ]),
    footer(),
  ];
}

function renderVocabulary() {
  return [
    topbar({ title: 'Vocabulary', back: true }),
    el('div', { class: 'tab-content' }, [
      el('div', { class: 'empty' }, [
        el('div', { class: 'icon' }, '📕'),
        el('strong', {}, 'Your saved items will appear here'),
        el('p', { html: 'Tap ⭐ on a word or phrase inside a lesson to add it.' }),
      ]),
    ]),
    footer(),
  ];
}

function route() {
  const hash = location.hash.slice(1) || '/';
  const pathOnly = hash.split('?')[0];
  app.innerHTML = '';
  let views;
  if (pathOnly === '/' || pathOnly === '') views = renderHome();
  else if (pathOnly === '/lessons') views = renderLessons();
  else if (pathOnly.startsWith('/lessons/')) views = renderLesson(pathOnly.slice('/lessons/'.length));
  else if (pathOnly === '/picture-words') views = renderPictureWords();
  else if (pathOnly.startsWith('/picture-words/')) views = renderPictureCategory(pathOnly.slice('/picture-words/'.length));
  else if (pathOnly === '/numbers') views = renderNumbers();
  else if (pathOnly === '/vocabulary') views = renderVocabulary();
  else views = renderHome();
  for (const v of [].concat(views)) if (v) app.appendChild(v);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
