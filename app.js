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
  { id: 'feira', icon: '🛒', title: 'Feira', desc: 'Open-air market', status: 'Lesson 1 — Dialog ready' },
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

const FEIRA_DIALOG = [
  { line: 1, speaker: 'phoenix', pt: 'Oi, bom dia!', es: '¡Hola, buenos días!', en: 'Hi, good morning!', note: null },
  { line: 2, speaker: 'feirante', pt: 'Bom dia, moça! O que vai querer hoje?', es: 'Buenos días, señorita. ¿Qué va a querer hoy?', en: 'Good morning, miss! What would you like today?', note: '🇧🇷 "moça" = friendly address for younger women' },
  { line: 3, speaker: 'phoenix', pt: 'Só dando uma olhada, obrigada. Você tem manga?', es: 'Solo estoy mirando, gracias. ¿Tiene mango?', en: 'Just looking, thanks. Do you have mango?', note: null },
  { line: 4, speaker: 'feirante', pt: 'Tenho sim, manga rosa e palmer. Quer experimentar?', es: 'Sí tengo, mango rosa y palmer. ¿Quiere probar?', en: 'Yes I do, rosa and palmer mango. Want to taste?', note: '🇧🇷 Vendors often offer a free taste — say yes!' },
  { line: 5, speaker: 'phoenix', pt: 'Pode ser, obrigada! Nossa, tá doce. Quanto custa o quilo?', es: 'Está bien, gracias. Ay, está dulce. ¿Cuánto cuesta el kilo?', en: "Sure, thanks! Wow, it's sweet. How much per kilo?", note: null },
  { line: 6, speaker: 'feirante', pt: 'Doze reais o quilo. Mas se levar dois, faço por vinte.', es: 'Doce reales el kilo. Pero si lleva dos, se lo dejo en veinte.', en: "Twelve reais per kilo. But if you take two, I'll do twenty.", note: null },
  { line: 7, speaker: 'phoenix', pt: 'Tá um pouco caro. Não dá um desconto melhor?', es: 'Está un poco caro. ¿No me hace un descuento mejor?', en: "It's a bit pricey. Can't you give a better discount?", note: null },
  { line: 8, speaker: 'feirante', pt: 'Dezenove, último preço.', es: 'Diecinueve, último precio.', en: 'Nineteen, final price.', note: null },
  { line: 9, speaker: 'phoenix', pt: 'Fechado. Pode pesar dois quilos, por favor?', es: 'Cerrado. ¿Puede pesar dos kilos, por favor?', en: 'Deal. Can you weigh two kilos, please?', note: null },
  { line: 10, speaker: 'feirante', pt: 'Dois quilos e cem. Coloca tudo junto?', es: 'Dos kilos cien. ¿Pongo todo junto?', en: 'Two kilos one hundred. All in one bag?', note: null },
  { line: 11, speaker: 'phoenix', pt: 'Pode ser. Aceita cartão?', es: 'Sí. ¿Acepta tarjeta?', en: 'Sure. Do you take card?', note: null },
  { line: 12, speaker: 'feirante', pt: 'Aceito cartão e dinheiro. Débito ou crédito?', es: 'Acepto tarjeta y efectivo. ¿Débito o crédito?', en: 'I take card and cash. Debit or credit?', note: null },
  { line: 13, speaker: 'phoenix', pt: 'Crédito.', es: 'Crédito.', en: 'Credit.', note: null },
  { line: 14, speaker: 'feirante', pt: 'Insere aqui.', es: 'Inserte aquí.', en: 'Insert here.', note: '(passing card machine / maquininha)' },
  { line: 15, speaker: 'phoenix', pt: 'Pronto. Brigada, viu! Tenha um bom dia.', es: '¡Listo. Gracias! Que tenga un buen día.', en: 'Done. Thanks! Have a good day.', note: '🇧🇷 "viu" = friendly trailing tag in São Paulo speech' },
];

const FEIRA_VOCAB = {
  '🔤 Verbs': [
    { pt: 'querer', es: 'querer', en: 'to want', note: 'irregular; eu quero, você quer' },
    { pt: 'gostaria', es: 'querría / me gustaría', en: 'I would like', note: 'conditional of gostar — polite alt to quero' },
    { pt: 'poder', es: 'poder', en: 'can / be able', note: 'eu posso, você pode' },
    { pt: 'custar', es: 'costar', en: 'to cost', note: 'only 3rd person in this context' },
    { pt: 'pesar', es: 'pesar', en: 'to weigh', note: 'regular' },
    { pt: 'levar', es: 'llevar', en: 'to take / carry off', note: 'regular' },
    { pt: 'aceitar', es: 'aceptar', en: 'to accept', note: 'regular' },
    { pt: 'pagar', es: 'pagar', en: 'to pay', note: 'regular' },
    { pt: 'trocar', es: 'cambiar', en: 'to change / exchange', note: '⚠️ different words pt/es' },
    { pt: 'experimentar', es: 'probar', en: 'to try / taste', note: '⚠️ different verb root' },
  ],
  '❓ Question words': [
    { pt: 'Quanto / Quanta', es: 'Cuánto / Cuánta', en: 'how much', note: 'agrees in gender with noun' },
    { pt: 'Quantos / Quantas', es: 'Cuántos / Cuántas', en: 'how many', note: 'plural + gender' },
    { pt: 'O que', es: 'Qué', en: 'what', note: 'o que = informal "what"' },
    { pt: 'Onde', es: 'Dónde', en: 'where', note: null },
    { pt: 'Qual', es: 'Cuál', en: 'which', note: null },
  ],
  '🙏 "Thanks" (feminine forms)': [
    { pt: 'Obrigada', es: 'Gracias', en: 'thanks', note: 'standard' },
    { pt: 'Brigada', es: '—', en: 'thx', note: 'colloquial shortening' },
    { pt: 'Muito obrigada', es: 'Muchas gracias', en: 'thanks a lot', note: 'emphatic' },
    { pt: 'Obrigadinha', es: '—', en: 'thanks (cutesy)', note: 'sweet / playful' },
    { pt: 'Valeu!', es: '—', en: 'thanks! / cheers!', note: 'super common BR, casual' },
    { pt: 'Te agradeço', es: 'Te agradezco', en: 'I thank you', note: 'emphasizes the favor' },
    { pt: 'De nada / Imagina', es: 'De nada / No hay de qué', en: "you're welcome", note: 'replies to thanks' },
  ],
  '💬 Common phrases': [
    { pt: 'Bom dia', es: 'Buenos días', en: 'good morning', note: 'until ~12pm' },
    { pt: 'Boa tarde', es: 'Buenas tardes', en: 'good afternoon', note: '12pm–6pm' },
    { pt: 'Por favor', es: 'Por favor', en: 'please', note: 'append freely' },
    { pt: 'Com licença', es: 'Con permiso', en: 'excuse me', note: 'pass through / interrupt' },
    { pt: 'Tudo bem?', es: '¿Todo bien?', en: 'all good?', note: 'greeting' },
    { pt: 'Pode ser', es: 'Está bien', en: 'sure / okay', note: 'agreement' },
    { pt: 'Tá bom', es: 'Está bien', en: 'okay', note: 'colloquial (= está bem)' },
    { pt: 'Só dando uma olhada', es: 'Solo estoy mirando', en: 'just looking', note: 'when vendor asks' },
    { pt: 'Não dá um desconto?', es: '¿No me hace un descuento?', en: 'discount?', note: 'haggling' },
    { pt: 'Pode pesar?', es: '¿Puede pesar?', en: 'can you weigh?', note: 'request' },
    { pt: 'Aceita cartão?', es: '¿Acepta tarjeta?', en: 'accept card?', note: 'payment check' },
    { pt: 'Fechado!', es: '¡Cerrado!', en: 'deal!', note: 'sealing a haggle' },
  ],
  '🎨 Adjectives & adverbs': [
    { pt: 'caro / cara', es: 'caro / cara', en: 'expensive', note: null },
    { pt: 'barato / barata', es: 'barato / barata', en: 'cheap', note: null },
    { pt: 'doce', es: 'dulce', en: 'sweet', note: null },
    { pt: 'maduro / madura', es: 'maduro / madura', en: 'ripe', note: null },
    { pt: 'fresco / fresca', es: 'fresco / fresca', en: 'fresh', note: null },
    { pt: 'muito / muita', es: 'mucho / mucha', en: 'very, a lot', note: null },
    { pt: 'pouco / pouca', es: 'poco / poca', en: 'little', note: null },
    { pt: 'hoje', es: 'hoy', en: 'today', note: null },
  ],
};

const FEIRA_GRAMMAR = [
  {
    title: '1. Conditional "gostaria" (would like) — polite request',
    table: {
      headers: ['', 'pt', 'es', 'en'],
      rows: [
        ['Direct', 'Eu quero água', 'Quiero agua', 'I want water'],
        ['Polite', 'Eu gostaria de uma água', 'Querría / Me gustaría un agua', 'I would like a water'],
      ],
    },
    body: 'Use `gostaria de + noun` or `gostaria de + infinitive`:\n• `Eu gostaria de pagar.` (I would like to pay)\n• `Eu gostaria de um quilo.` (I would like a kilo)',
    callout: '✅ Same structure pt/es. ES has two options: `querría` (formal) or `me gustaría` (conversational).',
  },
  {
    title: '2. Brazilian colloquial: "tá" = "está"',
    body: 'Super common contraction in Brazilian speech:\n• `Tá caro` = `Está caro`\n• `Tá bom` = `Está bom`\n• `Tá tudo bem?` = `Está tudo bem?`',
    callout: '⚠️ Spanish does not contract — always full `está`.',
  },
  {
    title: '3. "Quanto custa" vs "Quanto é"',
    table: {
      headers: ['Use', 'pt', 'es', 'en'],
      rows: [
        ['Formal / specific item', 'Quanto custa?', '¿Cuánto cuesta?', 'How much does it cost?'],
        ['Casual / total', 'Quanto é?', '¿Cuánto es?', 'How much?'],
        ['Per unit', 'Quanto é o quilo?', '¿Cuánto es el kilo?', 'How much per kilo?'],
      ],
    },
    callout: '✅ Identical structure across pt/es.',
  },
  {
    title: '4. Polite request: "Pode + infinitive?"',
    body: '• `Pode pesar?` (Can you weigh?)\n• `Pode trocar?` (Can you make change?)\n• `Pode repetir?` (Can you repeat?)\n• ES: `¿Puede + inf?` same structure',
    callout: 'Both pt and es drop the subject (você/usted implied).',
  },
];

const FEIRA_CULTURE = [
  {
    title: '1. Cartão / dinheiro for foreigners (no Pix)',
    points: [
      'Locals mostly use **Pix** (central bank instant transfer, 2020)',
      '⚠️ **Pix needs Brazilian CPF** — foreigners typically use:',
      '   – **cartão de crédito / débito** (Visa / Mastercard work)',
      '   – **dinheiro** (cash, R$)',
      'Most vendors have a **maquininha** (card machine); small ones may be cash-only',
      'Always ask: `Aceita cartão?`',
      'For card, choose **débito** (instant) or **crédito** (can be installments)',
    ],
  },
  {
    title: '2. Haggling etiquette',
    points: [
      'Haggling is normal at feira — within limits',
      'Standard opener: `Não dá um desconto?`',
      'Multiple-buy leverage: `E se eu levar três?`',
      "Don't lowball: 10–20% off is fair, 1/3 off is rude",
      'Late morning vendors are more flexible (but less stock)',
      '⚠️ Vegetables/fruits negotiable; meat & fish usually fixed',
    ],
  },
  {
    title: '3. How vendors address you',
    points: [
      'You (women ~< 40) → **moça** (most common)',
      'Older / formal → **senhora**',
      '+ name → **dona Maria**',
      'Men → senhor / cara / chefe',
      'Phoenix will mostly hear `moça`',
    ],
  },
  {
    title: '4. Sacolinha / saquinho culture',
    points: [
      'Vendors usually give a saquinho (small plastic bag) by default',
      '⚠️ São Paulo / Rio supermarkets banned free plastic bags 2018; feira slowly catching up',
      'Eco-trend: bring your own `sacola` / `ecobag`',
      'To request: `Posso pegar um saco?`',
    ],
  },
  {
    title: '5. Feira hours & finding one',
    points: [
      'Feira livre: held 1–2 fixed days per week on a rua',
      'Typical hours: ~6:30 AM to ~1 PM',
      'Each bairro has its own schedule',
      'Find it: ask your Airbnb host or Google `feira livre + bairro`',
    ],
  },
];

const FEIRA_PRACTICE = [
  {
    num: 1,
    question: 'You want to buy 2 kg of bananas. Use "gostaria":',
    answer: {
      pt: 'Eu gostaria de dois quilos de banana, por favor.',
      es: 'Querría / Me gustaría dos kilos de plátano, por favor.',
      en: 'I would like two kilos of bananas, please.',
      note: '⚠️ ES "plátano" = banana in Mexico/Peru/Colombia; Argentina/Chile/Uruguay use "banana".',
    },
  },
  {
    num: 2,
    question: 'Vendor says "Aqui é preço fixo" (fixed price). How to leave politely?',
    answer: {
      pt: 'Ah, entendi. Vou pensar mais um pouco. Obrigada!',
      es: 'Ah, entiendo. Voy a pensarlo un poco más. ¡Gracias!',
      en: "Oh, got it. I'll think about it. Thanks!",
    },
  },
  {
    num: 3,
    question: 'Vendor only takes cash (no card machine), you only have a card. Reply politely:',
    answer: {
      pt: 'Ah, então fica para a próxima. Obrigada!',
      es: 'Ah, entonces será para la próxima. ¡Gracias!',
      en: 'Oh, maybe next time. Thanks!',
    },
  },
  {
    num: 4,
    question: 'Haggle: "It\'s a bit pricey. If I take two, can you give a discount?"',
    answer: {
      pt: 'Tá um pouco caro. Se eu levar dois, dá pra fazer um desconto?',
      es: 'Está un poco caro. Si llevo dos, ¿puede hacer un descuento?',
      en: "It's a bit pricey. If I take two, can you give a discount?",
    },
  },
  {
    num: 5,
    question: '🇪🇸 ES practice (A2): At a Chilean mercado, say "I want to try this mango, may I?"',
    answer: {
      es: 'Quería probar este mango, ¿puedo? / ¿Me deja probar este mango?',
      pt: 'Eu queria experimentar essa manga, posso?',
      en: 'I want to try this mango, may I?',
      note: '⚠️ ES "mango" masculine; PT "manga" feminine — opposite gender!',
    },
  },
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

let _currentAudio = null;
function playAudio(src) {
  if (_currentAudio && !_currentAudio.paused) _currentAudio.pause();
  _currentAudio = new Audio(src);
  _currentAudio.play().catch(e => console.warn('audio', e));
}

function renderDialogLine(line, lessonId) {
  const card = el('div', { class: 'dialog-card', 'data-speaker': line.speaker });
  card.appendChild(el('div', { class: 'speaker' }, [
    el('span', { class: 'speaker-icon' }, line.speaker === 'phoenix' ? '🧍' : '👨'),
    el('span', { class: 'speaker-name' }, line.speaker === 'phoenix' ? 'You' : 'Vendor'),
    el('span', { class: 'line-num' }, `${line.line}/15`),
  ]));

  for (const lang of ['pt', 'es', 'en']) {
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, line[lang]));
    if (lang !== 'en') {
      const numStr = String(line.line).padStart(2, '0');
      const src = `./audio/${lessonId}/d${numStr}-${lang}.mp3`;
      row.appendChild(el('button', {
        class: 'play-btn',
        'aria-label': `play ${lang} audio`,
        onClick: () => playAudio(src),
      }, '▶'));
    }
    card.appendChild(row);
  }

  if (line.note) {
    card.appendChild(el('div', { class: 'dialog-note' }, line.note));
  }
  return card;
}

function renderLessonDialog(lessonId, dialog) {
  const container = el('div', { class: 'tab-content dialog-list' });
  for (const line of dialog) container.appendChild(renderDialogLine(line, lessonId));
  return container;
}

function inlineFormat(s) {
  return s.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function renderCompactTable(table) {
  const tbl = el('div', { class: 'compact-table' });
  const header = el('div', { class: 'compact-row compact-header' });
  for (const h of table.headers) header.appendChild(el('div', {}, h));
  tbl.appendChild(header);
  for (const r of table.rows) {
    const row = el('div', { class: 'compact-row' });
    for (const c of r) row.appendChild(el('div', {}, c));
    tbl.appendChild(row);
  }
  return tbl;
}

function renderLessonVocab(vocab) {
  const container = el('div', { class: 'tab-content vocab-list' });
  for (const [sectionTitle, items] of Object.entries(vocab)) {
    const section = el('div', { class: 'vocab-section' });
    section.appendChild(el('h3', { class: 'vocab-section-title' }, sectionTitle));
    const tbl = el('div', { class: 'vocab-table' });
    for (const item of items) {
      const row = el('div', { class: 'vocab-row' });
      row.appendChild(el('div', { class: 'vocab-pt' }, item.pt));
      row.appendChild(el('div', { class: 'vocab-es' }, item.es || '—'));
      row.appendChild(el('div', { class: 'vocab-en' }, item.en));
      if (item.note) row.appendChild(el('div', { class: 'vocab-note' }, item.note));
      tbl.appendChild(row);
    }
    section.appendChild(tbl);
    container.appendChild(section);
  }
  return container;
}

function renderLessonGrammar(grammar) {
  const container = el('div', { class: 'tab-content grammar-list' });
  for (const point of grammar) {
    const section = el('div', { class: 'grammar-section' });
    section.appendChild(el('h3', { class: 'grammar-title' }, point.title));
    if (point.table) section.appendChild(renderCompactTable(point.table));
    if (point.body) {
      const body = el('div', { class: 'grammar-body' });
      body.innerHTML = inlineFormat(point.body).replace(/\n/g, '<br>');
      section.appendChild(body);
    }
    if (point.callout) section.appendChild(el('div', { class: 'callout' }, point.callout));
    container.appendChild(section);
  }
  return container;
}

function renderLessonCulture(culture) {
  const container = el('div', { class: 'tab-content culture-list' });
  for (const point of culture) {
    const section = el('div', { class: 'culture-section' });
    section.appendChild(el('h3', { class: 'culture-title' }, point.title));
    const ul = el('ul', { class: 'culture-points' });
    for (const p of point.points) {
      const li = el('li');
      li.innerHTML = inlineFormat(p);
      ul.appendChild(li);
    }
    section.appendChild(ul);
    container.appendChild(section);
  }
  return container;
}

function renderLessonPractice(practice) {
  const container = el('div', { class: 'tab-content practice-list' });
  for (const q of practice) {
    const card = el('div', { class: 'practice-card' });
    card.appendChild(el('div', { class: 'practice-num' }, `Q${q.num}`));
    card.appendChild(el('div', { class: 'practice-question' }, q.question));
    const answer = el('div', { class: 'practice-answer hidden' });
    for (const lang of ['pt', 'es', 'en']) {
      if (q.answer[lang]) {
        const line = el('div', { class: 'practice-ans-line lang-' + lang });
        line.appendChild(el('span', { class: 'lang-label' }, lang));
        line.appendChild(el('span', { class: 'practice-ans-text' }, q.answer[lang]));
        answer.appendChild(line);
      }
    }
    if (q.answer.note) answer.appendChild(el('div', { class: 'practice-note' }, q.answer.note));
    const toggleBtn = el('button', {
      class: 'practice-toggle',
      onClick: () => {
        const isHidden = answer.classList.toggle('hidden');
        toggleBtn.textContent = isHidden ? 'Show answer' : 'Hide answer';
      },
    }, 'Show answer');
    card.appendChild(toggleBtn);
    card.appendChild(answer);
    container.appendChild(card);
  }
  return container;
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
  let tabContent = null;
  if (lessonId === 'feira') {
    if (activeTab === 'dialog') tabContent = renderLessonDialog('feira', FEIRA_DIALOG);
    else if (activeTab === 'vocab') tabContent = renderLessonVocab(FEIRA_VOCAB);
    else if (activeTab === 'grammar') tabContent = renderLessonGrammar(FEIRA_GRAMMAR);
    else if (activeTab === 'culture') tabContent = renderLessonCulture(FEIRA_CULTURE);
    else if (activeTab === 'practice') tabContent = renderLessonPractice(FEIRA_PRACTICE);
  }
  if (!tabContent) {
    tabContent = el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, `${TABS.find(t => t.id === activeTab).label} — coming next round`),
        el('p', {}, 'Markdown content will be drafted & verified, then rendered here.'),
      ]),
    ]);
  }
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
