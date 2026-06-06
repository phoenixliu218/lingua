if ('serviceWorker' in navigator) {
  let _swRefreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (_swRefreshing) return;
    _swRefreshing = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then(reg => {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') reg.update();
        });
      })
      .catch(e => console.error('SW', e));
  });
}

const SECTIONS = [
  { icon: '🧑‍🏫', title: 'Lessons', desc: 'Themed scenarios · 3 ready', route: '#/lessons' },
  { icon: '🖼️', title: 'Picture Words', desc: 'Visual vocabulary by category', route: '#/picture-words' },
  { icon: '📚', title: 'Foundations', desc: 'Numbers, days, months', route: '#/foundations' },
  { icon: '📕', title: 'Vocabulary', desc: 'Your saved words & phrases', route: '#/vocabulary' },
];

const LESSONS = [
  { id: 'feira', icon: '🛒', title: 'Feira', desc: 'Open-air market' },
  { id: 'intro', icon: '👋', title: 'Self intro', desc: 'Introducing yourself' },
  { id: 'carona', icon: '🚗', title: 'Hitchhiking', desc: 'Catching a ride (carona)' },
  { id: 'friend', icon: '🏡', title: "Friend's home", desc: 'Visiting a local friend', status: 'Coming soon' },
  { id: 'cafe', icon: '☕', title: 'Café', desc: 'Coffee shop', status: 'Coming soon' },
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
  { id: 'kitchen', icon: '🍴', name: 'Kitchen' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', name: 'Family' },
  { id: 'zodiac', icon: '✨', name: 'Zodiac' },
  { id: 'market', icon: '🛒', name: 'Market objects' },
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
    { id: 'v01', pt: 'querer', es: 'querer', en: 'to want', note: 'irregular; eu quero, você quer', example: { pt: 'Eu quero dois quilos de manga.', es: 'Quiero dos kilos de mango.', en: 'I want two kilos of mango.' } },
    { id: 'v02', pt: 'gostaria', es: 'querría / me gustaría', en: 'I would like', note: 'conditional of gostar — polite alt to quero', example: { pt: 'Eu gostaria de pagar.', es: 'Querría pagar.', en: 'I would like to pay.' } },
    { id: 'v03', pt: 'poder', es: 'poder', en: 'can / be able', note: 'eu posso, você pode', example: { pt: 'Pode pesar, por favor?', es: '¿Puede pesar, por favor?', en: 'Can you weigh, please?' } },
    { id: 'v04', pt: 'custar', es: 'costar', en: 'to cost', note: 'only 3rd person in this context', example: { pt: 'O abacaxi tá custando caro hoje.', es: 'La piña está costando cara hoy.', en: 'The pineapple is expensive today.' } },
    { id: 'v05', pt: 'pesar', es: 'pesar', en: 'to weigh', note: 'regular', example: { pt: 'Quero pesar meio quilo só.', es: 'Quiero pesar solo medio kilo.', en: 'I want to weigh just half a kilo.' } },
    { id: 'v06', pt: 'levar', es: 'llevar', en: 'to take / carry off', note: 'regular', example: { pt: 'Vou levar dois.', es: 'Voy a llevar dos.', en: "I'll take two." } },
    { id: 'v07', pt: 'aceitar', es: 'aceptar', en: 'to accept', note: 'regular', example: { pt: 'Eles só aceitam dinheiro aqui.', es: 'Solo aceptan efectivo aquí.', en: 'They only accept cash here.' } },
    { id: 'v08', pt: 'pagar', es: 'pagar', en: 'to pay', note: 'regular', example: { pt: 'Posso pagar com cartão?', es: '¿Puedo pagar con tarjeta?', en: 'Can I pay by card?' } },
    { id: 'v09', pt: 'trocar', es: 'cambiar', en: 'to change / exchange', note: '⚠️ different words pt/es', example: { pt: 'Pode trocar nota de cem?', es: '¿Puede cambiar billete de cien?', en: 'Can you change a 100 bill?' } },
    { id: 'v10', pt: 'experimentar', es: 'probar', en: 'to try / taste', note: '⚠️ different verb root', example: { pt: 'Posso experimentar?', es: '¿Puedo probar?', en: 'Can I taste?' } },
  ],
  '❓ Question words': [
    { id: 'q01', pt: 'Quanto / Quanta', es: 'Cuánto / Cuánta', en: 'how much', note: 'agrees in gender with noun',
      example: { pt: 'Quanto é a cesta de morango?', es: '¿Cuánto es la canasta de fresa?', en: 'How much is the strawberry basket?' },
      answer:  { pt: 'Dez reais a cesta.', es: 'Diez reales la canasta.', en: '10 reais per basket.' } },
    { id: 'q02', pt: 'Quantos / Quantas', es: 'Cuántos / Cuántas', en: 'how many', note: 'plural + gender',
      example: { pt: 'Quantos quilos vai querer?', es: '¿Cuántos kilos va a querer?', en: 'How many kilos will you want?' },
      answer:  { pt: 'Dois quilos só.', es: 'Solo dos kilos.', en: 'Just 2 kilos.' } },
    { id: 'q03', pt: 'O que', es: 'Qué', en: 'what', note: 'o que = informal "what"',
      example: { pt: 'O que vocês têm de mais fresco?', es: '¿Qué tienen de más fresco?', en: "What's the freshest you have?" },
      answer:  { pt: 'A salsinha chegou hoje cedo.', es: 'El perejil llegó hoy temprano.', en: 'The parsley arrived this morning.' } },
    { id: 'q04', pt: 'Onde', es: 'Dónde', en: 'where', note: null,
      example: { pt: 'Onde fica a barraca de queijo?', es: '¿Dónde queda el puesto de queso?', en: "Where's the cheese stall?" },
      answer:  { pt: 'Logo ali, depois das frutas.', es: 'Ahí mismo, después de las frutas.', en: 'Right there, past the fruit.' } },
    { id: 'q05', pt: 'Qual', es: 'Cuál', en: 'which', note: null,
      example: { pt: 'Qual manga é mais doce?', es: '¿Cuál mango es más dulce?', en: 'Which mango is sweeter?' },
      answer:  { pt: 'A rosa é a mais doce.', es: 'El rosa es el más dulce.', en: 'The rosa is the sweetest.' } },
  ],
  '🙏 "Thanks" (feminine forms)': [
    { id: 't01', pt: 'Obrigada', es: 'Gracias', en: 'thanks', note: 'standard' },
    { id: 't02', pt: 'Brigada', es: '—', en: 'thx', note: 'colloquial shortening' },
    { id: 't03', pt: 'Muito obrigada', es: 'Muchas gracias', en: 'thanks a lot', note: 'emphatic' },
    { id: 't04', pt: 'Obrigadinha', es: '—', en: 'thanks (cutesy)', note: 'sweet / playful' },
    { id: 't05', pt: 'Valeu!', es: '—', en: 'thanks! / cheers!', note: 'super common BR, casual' },
    { id: 't06', pt: 'Te agradeço', es: 'Te agradezco', en: 'I thank you', note: 'emphasizes the favor' },
    { id: 't07', pt: 'De nada / Imagina', es: 'De nada / No hay de qué', en: "you're welcome", note: 'replies to thanks' },
  ],
  '💬 Common phrases': [
    { id: 'p01', pt: 'Bom dia', es: 'Buenos días', en: 'good morning', note: 'until ~12pm' },
    { id: 'p02', pt: 'Boa tarde', es: 'Buenas tardes', en: 'good afternoon', note: '12pm–6pm' },
    { id: 'p03', pt: 'Por favor', es: 'Por favor', en: 'please', note: 'append freely' },
    { id: 'p04', pt: 'Com licença', es: 'Con permiso', en: 'excuse me', note: 'pass through / interrupt' },
    { id: 'p05', pt: 'Tudo bem?', es: '¿Todo bien?', en: 'all good?', note: 'greeting' },
    { id: 'p06', pt: 'Pode ser', es: 'Está bien', en: 'sure / okay', note: 'agreement' },
    { id: 'p07', pt: 'Tá bom', es: 'Está bien', en: 'okay', note: 'colloquial (= está bem)' },
    { id: 'p08', pt: 'Só dando uma olhada', es: 'Solo estoy mirando', en: 'just looking', note: 'when vendor asks' },
    { id: 'p09', pt: 'Não dá um desconto?', es: '¿No me hace un descuento?', en: 'discount?', note: 'haggling' },
    { id: 'p10', pt: 'Pode pesar?', es: '¿Puede pesar?', en: 'can you weigh?', note: 'request' },
    { id: 'p11', pt: 'Aceita cartão?', es: '¿Acepta tarjeta?', en: 'accept card?', note: 'payment check' },
    { id: 'p12', pt: 'Fechado!', es: '¡Cerrado!', en: 'deal!', note: 'sealing a haggle' },
  ],
  '🎨 Adjectives & adverbs': [
    { id: 'a01', pt: 'caro / cara', es: 'caro / cara', en: 'expensive', note: null, example: { pt: 'Tá caro.', es: 'Está caro.', en: "It's expensive." } },
    { id: 'a02', pt: 'barato / barata', es: 'barato / barata', en: 'cheap', note: null, example: { pt: 'Tá barato.', es: 'Está barato.', en: "It's cheap." } },
    { id: 'a03', pt: 'doce', es: 'dulce', en: 'sweet', note: null, example: { pt: 'O abacaxi tá bem docinho.', es: 'La piña está bien dulcecita.', en: 'The pineapple is really sweet.' } },
    { id: 'a04', pt: 'maduro / madura', es: 'maduro / madura', en: 'ripe', note: null, example: { pt: 'Tá maduro?', es: '¿Está maduro?', en: 'Is it ripe?' } },
    { id: 'a05', pt: 'fresco / fresca', es: 'fresco / fresca', en: 'fresh', note: null, example: { pt: 'É fresco?', es: '¿Es fresco?', en: 'Is it fresh?' } },
    { id: 'a06', pt: 'muito / muita', es: 'mucho / mucha', en: 'very, a lot', note: null, example: { pt: 'Muito obrigada.', es: 'Muchas gracias.', en: 'Thanks a lot.' } },
    { id: 'a07', pt: 'pouco / pouca', es: 'poco / poca', en: 'little', note: null, example: { pt: 'Só um pouco.', es: 'Solo un poco.', en: 'Just a little.' } },
    { id: 'a08', pt: 'hoje', es: 'hoy', en: 'today', note: null, example: { pt: 'É de hoje?', es: '¿Es de hoy?', en: 'Is it from today?' } },
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

const FRUITS = [
  { id: 'abacaxi', pt: 'abacaxi', es: 'piña', en: 'pineapple', note: '⚠️ completely different words pt/es' },
  { id: 'manga', pt: 'manga', es: 'mango', en: 'mango', note: '⚠️ pt feminine (a manga), es masculine (el mango)' },
  { id: 'banana', pt: 'banana', es: 'plátano', en: 'banana', note: '⚠️ Mexico/Peru/Colombia: plátano; Argentina/Chile/Uruguay: banana' },
  { id: 'plantain', pt: 'banana-da-terra', es: 'plátano macho', en: 'plantain', note: '⚠️ bigger, starchier than banana; usually cooked (fried/boiled), not eaten raw' },
  { id: 'maca', pt: 'maçã', es: 'manzana', en: 'apple', note: 'different roots, but both Romance origin' },
  { id: 'laranja', pt: 'laranja', es: 'naranja', en: 'orange', note: '✅ similar (same Arabic origin)' },
  { id: 'morango', pt: 'morango', es: 'fresa', en: 'strawberry', note: '⚠️ completely different' },
  { id: 'uva', pt: 'uva', es: 'uva', en: 'grape', note: '✅ identical' },
  { id: 'maracuja', pt: 'maracujá', es: 'maracuyá', en: 'passion fruit', note: '✅ almost identical (Tupi origin)' },
  { id: 'mamao', pt: 'mamão', es: 'papaya', en: 'papaya', note: '⚠️ pt mamão = es papaya' },
  { id: 'goiaba', pt: 'goiaba', es: 'guayaba', en: 'guava', note: '✅ similar (Tupi origin)' },
  { id: 'melancia', pt: 'melancia', es: 'sandía', en: 'watermelon', note: '⚠️ completely different words pt/es' },
  { id: 'mirtilo', pt: 'mirtilo', es: 'arándano', en: 'blueberry', note: '⚠️ completely different' },
  { id: 'pitaya', pt: 'pitaya', es: 'pitahaya', en: 'dragon fruit', note: '✅ closely related; pt: pitaya, es: pitahaya (Mex) or pitaya (CO)' },
  { id: 'roma', pt: 'romã', es: 'granada', en: 'pomegranate', note: '⚠️ completely different pt/es' },
  { id: 'pinha', pt: 'fruta-do-conde / pinha', es: 'chirimoya', en: 'sugar apple', note: '⚠️ ES "chirimoya" is technically Annona cherimola (cherimoya), a close relative — widely understood across LatAm even though species differs' },
  { id: 'jambo', pt: 'jambo', es: 'pomarrosa', en: 'wax apple', note: 'pt also "jambo-rosa"; en: also "rose apple"' },
  { id: 'cranberry', pt: 'cranberry', es: 'arándano rojo', en: 'cranberry', note: '⚠️ pt borrows English; es literally "red blueberry"' },
  { id: 'caqui', pt: 'caqui', es: 'caqui', en: 'persimmon', note: '✅ identical pt/es' },
  { id: 'abacate', pt: 'abacate', es: 'aguacate', en: 'avocado', note: 'similar; ⚠️ Chile/Peru/Argentina use "palta" instead of "aguacate"' },
  { id: 'pupunha', pt: 'pupunha', es: 'chontaduro', en: 'peach palm fruit', note: '⚠️ es: "chontaduro" (CO/EC), "pejibaye" (CR), "pupunha" kept in some places' },
  { id: 'cupuacu', pt: 'cupuaçu', es: 'cupuasú', en: 'cupuaçu', note: '✅ Amazon fruit; name kept similar' },
  { id: 'sapote', pt: 'sapoti', es: 'zapote', en: 'sapote', note: 'BR "sapoti" = sapodilla; many sapote varieties across LatAm' },
];

const VEGETABLES = [
  { id: 'tomate', pt: 'tomate', es: 'tomate', en: 'tomato', note: '✅ identical' },
  { id: 'cebola', pt: 'cebola', es: 'cebolla', en: 'onion', note: 'similar' },
  { id: 'alho', pt: 'alho', es: 'ajo', en: 'garlic', note: '⚠️ completely different' },
  { id: 'batata', pt: 'batata', es: 'papa', en: 'potato', note: '⚠️ ES: papa (LatAm), patata (Spain)' },
  { id: 'cenoura', pt: 'cenoura', es: 'zanahoria', en: 'carrot', note: '⚠️ different' },
  { id: 'pimentao', pt: 'pimentão', es: 'pimiento', en: 'bell pepper', note: 'similar; ⚠️ ≠ pimenta/pimienta (spice)' },
  { id: 'alface', pt: 'alface', es: 'lechuga', en: 'lettuce', note: '⚠️ different' },
  { id: 'repolho', pt: 'repolho', es: 'repollo', en: 'cabbage', note: 'similar' },
  { id: 'pepino', pt: 'pepino', es: 'pepino', en: 'cucumber', note: '✅ identical' },
  { id: 'milho', pt: 'milho', es: 'maíz', en: 'corn', note: '⚠️ different' },
  { id: 'cogumelo', pt: 'cogumelo', es: 'champiñón', en: 'mushroom', note: '⚠️ different (champiñón ← French)' },
  { id: 'couveflor', pt: 'couve-flor', es: 'coliflor', en: 'cauliflower', note: 'similar; literally "flower kale" in pt' },
  { id: 'brocolis', pt: 'brócolis', es: 'brócoli', en: 'broccoli', note: '✅ similar; ⚠️ ≠ couve-flor (white cauliflower)' },
  { id: 'berinjela', pt: 'berinjela', es: 'berenjena', en: 'eggplant', note: 'similar' },
  { id: 'mandioca', pt: 'mandioca', es: 'yuca', en: 'cassava', note: '⚠️ different; also aipim in BR' },
  { id: 'quiabo', pt: 'quiabo', es: 'okra', en: 'okra', note: '⚠️ es borrows English' },
  { id: 'batatadoce', pt: 'batata-doce', es: 'camote', en: 'sweet potato', note: '⚠️ camote in Mex/Peru/Chile/CO; batata dulce in ARG/UY' },
  { id: 'abobora', pt: 'abóbora', es: 'calabaza', en: 'pumpkin / squash', note: 'similar; zapallo in some LatAm' },
  { id: 'abobrinha', pt: 'abobrinha', es: 'calabacín', en: 'zucchini', note: 'similar; varies regionally (zapallito, calabacita)' },
  { id: 'espinafre', pt: 'espinafre', es: 'espinaca', en: 'spinach', note: '✅ very close' },
  { id: 'gengibre', pt: 'gengibre', es: 'jengibre', en: 'ginger', note: '✅ almost identical' },
  { id: 'pimenta', pt: 'pimenta', es: 'pimienta', en: 'pepper (spice)', note: '✅ very close; ⚠️ ≠ pimentão/pimiento (bell pepper)' },
  { id: 'inhame', pt: 'inhame', es: 'taro / malanga', en: 'taro', note: '⚠️ BR "inhame" can also mean yam; ES varies by region' },
  { id: 'vinagreira', pt: 'vinagreira', es: 'flor de Jamaica', en: 'roselle', note: '⚠️ pt also "rosela"; es "jamaica" is most common in LatAm' },
  { id: 'cebolinha', pt: 'cebolinha', es: 'cebollín', en: 'green onion / scallion', note: '✅ similar (diminutive of cebola/cebolla)' },
  { id: 'coentro', pt: 'coentro', es: 'cilantro', en: 'cilantro / coriander', note: '⚠️ different words' },
];

const MEATS = [
  { id: 'carne', emoji: '🐂', pt: 'carne', es: 'carne (de res)', en: 'beef', note: 'pt "carne" defaults to beef; es needs "de res"' },
  { id: 'porco', emoji: '🐖', pt: 'carne de porco', es: 'carne de cerdo', en: 'pork', note: 'similar structure' },
  { id: 'frango', emoji: '🐔', pt: 'frango', es: 'pollo', en: 'chicken', note: '⚠️ completely different' },
  { id: 'cordeiro', emoji: '🐑', pt: 'cordeiro', es: 'cordero', en: 'lamb', note: '✅ similar' },
  { id: 'linguica', emoji: '🌭', pt: 'linguiça', es: 'salchicha', en: 'sausage', note: '⚠️ different; "chorizo" in es for cured/spiced variety' },
  { id: 'bacon', emoji: '🥓', pt: 'bacon', es: 'panceta', en: 'bacon', note: '⚠️ pt borrows English; "tocino" also used in es' },
  { id: 'presunto', emoji: '🍖', pt: 'presunto', es: 'jamón', en: 'ham', note: '⚠️ completely different' },
  { id: 'moida', emoji: '🍔', pt: 'carne moída', es: 'carne molida', en: 'ground meat', note: '✅ similar' },
  { id: 'bife', emoji: '🥩', pt: 'bife', es: 'bistec', en: 'steak', note: '⚠️ different; "filete" also used in es' },
  { id: 'peito', emoji: '🐓👙', pt: 'peito de frango', es: 'pechuga', en: 'chicken breast', note: '⚠️ different roots' },
  { id: 'coxa', emoji: '🐓🦵', pt: 'coxa', es: 'muslo', en: 'thigh', note: '⚠️ different' },
  { id: 'asa', emoji: '🐓🪽', pt: 'asa', es: 'ala', en: 'wing', note: '⚠️ different roots but related' },
  { id: 'pato', emoji: '🦆', pt: 'pato', es: 'pato', en: 'duck', note: '✅ identical' },
];

const SEAFOOD = [
  { id: 'peixe', emoji: '🐟', pt: 'peixe', es: 'pescado', en: 'fish (food)', note: '⚠️ "pez" in es = live fish; "pescado" = cooked/served' },
  { id: 'camarao', emoji: '🦐', pt: 'camarão', es: 'camarón', en: 'shrimp', note: '✅ very close; "gamba" in Spain' },
  { id: 'caranguejo', emoji: '🦀', pt: 'caranguejo', es: 'cangrejo', en: 'crab', note: '✅ similar' },
  { id: 'polvo', emoji: '🐙', pt: 'polvo', es: 'pulpo', en: 'octopus', note: '✅ similar' },
  { id: 'lula', emoji: '🦑', pt: 'lula', es: 'calamar', en: 'squid', note: '⚠️ different' },
  { id: 'salmao', emoji: '🍣', pt: 'salmão', es: 'salmón', en: 'salmon', note: '✅ similar' },
  { id: 'atum', emoji: '🐟', pt: 'atum', es: 'atún', en: 'tuna', note: '✅ similar' },
  { id: 'mexilhao', emoji: '🐚', pt: 'mexilhão', es: 'mejillón', en: 'mussel', note: '✅ similar' },
  { id: 'ostra', emoji: '🦪', pt: 'ostra', es: 'ostra', en: 'oyster', note: '✅ identical' },
  { id: 'lagosta', emoji: '🦞', pt: 'lagosta', es: 'langosta', en: 'lobster', note: '✅ similar' },
  { id: 'ovas', emoji: '🥚', pt: 'ovas', es: 'hueva', en: 'roe (fish eggs)', note: '✅ similar root' },
];

const KITCHEN = [
  { id: 'geladeira', pt: 'geladeira', es: 'refrigerador', en: 'refrigerator', note: '⚠️ BR uses "geladeira"; "frigorífico" in PT; "nevera" in Spain/Caribbean' },
  { id: 'forno', pt: 'forno', es: 'horno', en: 'oven', note: '✅ similar' },
  { id: 'fogao', pt: 'fogão', es: 'estufa', en: 'stove', note: '⚠️ different; "cocina" in Spain' },
  { id: 'microondas', pt: 'micro-ondas', es: 'microondas', en: 'microwave', note: '✅ identical' },
  { id: 'prato', pt: 'prato', es: 'plato', en: 'plate', note: '✅ similar' },
  { id: 'tigela', pt: 'tigela', es: 'tazón', en: 'bowl', note: '⚠️ different' },
  { id: 'copo', pt: 'copo', es: 'vaso', en: 'glass / cup', note: '⚠️ different; "copa" in es = wine glass' },
  { id: 'xicara', pt: 'xícara', es: 'taza', en: 'mug / coffee cup', note: '⚠️ different' },
  { id: 'faca', pt: 'faca', es: 'cuchillo', en: 'knife', note: '⚠️ completely different' },
  { id: 'garfo', pt: 'garfo', es: 'tenedor', en: 'fork', note: '⚠️ different' },
  { id: 'colher', pt: 'colher', es: 'cuchara', en: 'spoon', note: '✅ similar' },
  { id: 'hashi', pt: 'hashi', es: 'palillos', en: 'chopsticks', note: 'pt also "pauzinhos"; es also "palillos chinos"' },
  { id: 'panoprato', pt: 'pano de prato', es: 'paño de cocina', en: 'dishcloth', note: '✅ similar; "trapo" also used in es' },
  { id: 'detergente', pt: 'detergente', es: 'detergente', en: 'dish soap', note: '✅ identical' },
  { id: 'oleo', pt: 'óleo', es: 'aceite', en: 'oil', note: '⚠️ different' },
  { id: 'manteiga', pt: 'manteiga', es: 'mantequilla', en: 'butter', note: '✅ similar' },
  { id: 'acucar', pt: 'açúcar', es: 'azúcar', en: 'sugar', note: '✅ similar' },
];

const FAMILY = [
  { id: 'mae', emoji: '👩', pt: 'mãe', es: 'madre', en: 'mother', note: '⚠️ completely different' },
  { id: 'pai', emoji: '👨', pt: 'pai', es: 'padre', en: 'father', note: '⚠️ completely different' },
  { id: 'irma', emoji: '👧', pt: 'irmã', es: 'hermana', en: 'sister', note: '⚠️ different roots' },
  { id: 'irmao', emoji: '👦', pt: 'irmão', es: 'hermano', en: 'brother', note: '⚠️ different roots' },
  { id: 'filha', emoji: '🧒', pt: 'filha', es: 'hija', en: 'daughter', note: '⚠️ different' },
  { id: 'filho', emoji: '🧒', pt: 'filho', es: 'hijo', en: 'son', note: '⚠️ different' },
  { id: 'neta', emoji: '👶', pt: 'neta', es: 'nieta', en: 'granddaughter', note: '✅ similar' },
  { id: 'neto', emoji: '👶', pt: 'neto', es: 'nieto', en: 'grandson', note: '✅ similar' },
  { id: 'avof', emoji: '👵', pt: 'avó', es: 'abuela', en: 'grandmother', note: '⚠️ different; ⚠️ pt avó (open o, fem) vs avô (closed o, masc)' },
  { id: 'avom', emoji: '👴', pt: 'avô', es: 'abuelo', en: 'grandfather', note: '⚠️ different' },
  { id: 'tia', emoji: '👩‍🦰', pt: 'tia', es: 'tía', en: 'aunt', note: '✅ very close' },
  { id: 'tio', emoji: '👨‍🦰', pt: 'tio', es: 'tío', en: 'uncle', note: '✅ very close' },
  { id: 'sobrinha', emoji: '👧', pt: 'sobrinha', es: 'sobrina', en: 'niece', note: '✅ similar' },
  { id: 'sobrinho', emoji: '👦', pt: 'sobrinho', es: 'sobrino', en: 'nephew', note: '✅ similar' },
  { id: 'prima', emoji: '💁‍♀️', pt: 'prima', es: 'prima', en: 'cousin (f)', note: '✅ identical' },
  { id: 'primo', emoji: '💁‍♂️', pt: 'primo', es: 'primo', en: 'cousin (m)', note: '✅ identical' },
  { id: 'esposa', emoji: '👰', pt: 'esposa', es: 'esposa', en: 'wife', note: '✅ identical' },
  { id: 'marido', emoji: '🤵', pt: 'marido', es: 'esposo', en: 'husband', note: '⚠️ different' },
  { id: 'namorada', emoji: '💑', pt: 'namorada', es: 'novia', en: 'girlfriend', note: '⚠️ different' },
  { id: 'namorado', emoji: '💏', pt: 'namorado', es: 'novio', en: 'boyfriend', note: '⚠️ different' },
];

const ZODIAC = [
  { id: 'z10', symbol: '♑', dates: 'Dec 22 – Jan 19', pt: 'Capricórnio', es: 'Capricornio', en: 'Capricorn' },
  { id: 'z11', symbol: '♒', dates: 'Jan 20 – Feb 18', pt: 'Aquário', es: 'Acuario', en: 'Aquarius' },
  { id: 'z12', symbol: '♓', dates: 'Feb 19 – Mar 20', pt: 'Peixes', es: 'Piscis', en: 'Pisces' },
  { id: 'z01', symbol: '♈', dates: 'Mar 21 – Apr 19', pt: 'Áries', es: 'Aries', en: 'Aries' },
  { id: 'z02', symbol: '♉', dates: 'Apr 20 – May 20', pt: 'Touro', es: 'Tauro', en: 'Taurus' },
  { id: 'z03', symbol: '♊', dates: 'May 21 – Jun 20', pt: 'Gêmeos', es: 'Géminis', en: 'Gemini' },
  { id: 'z04', symbol: '♋', dates: 'Jun 21 – Jul 22', pt: 'Câncer', es: 'Cáncer', en: 'Cancer' },
  { id: 'z05', symbol: '♌', dates: 'Jul 23 – Aug 22', pt: 'Leão', es: 'Leo', en: 'Leo' },
  { id: 'z06', symbol: '♍', dates: 'Aug 23 – Sep 22', pt: 'Virgem', es: 'Virgo', en: 'Virgo' },
  { id: 'z07', symbol: '♎', dates: 'Sep 23 – Oct 22', pt: 'Libra', es: 'Libra', en: 'Libra' },
  { id: 'z08', symbol: '♏', dates: 'Oct 23 – Nov 21', pt: 'Escorpião', es: 'Escorpio', en: 'Scorpio' },
  { id: 'z09', symbol: '♐', dates: 'Nov 22 – Dec 21', pt: 'Sagitário', es: 'Sagitario', en: 'Sagittarius' },
];

const DAYS_DATA = [
  { id: 'd01', display: 'Mon', pt: 'segunda-feira', es: 'lunes', en: 'Monday', note: 'pt = "2nd day of week"; days 2-6 follow same pattern' },
  { id: 'd02', display: 'Tue', pt: 'terça-feira', es: 'martes', en: 'Tuesday', note: 'pt = "3rd day"' },
  { id: 'd03', display: 'Wed', pt: 'quarta-feira', es: 'miércoles', en: 'Wednesday', note: null },
  { id: 'd04', display: 'Thu', pt: 'quinta-feira', es: 'jueves', en: 'Thursday', note: null },
  { id: 'd05', display: 'Fri', pt: 'sexta-feira', es: 'viernes', en: 'Friday', note: null },
  { id: 'd06', display: 'Sat', pt: 'sábado', es: 'sábado', en: 'Saturday', note: '✅ identical' },
  { id: 'd07', display: 'Sun', pt: 'domingo', es: 'domingo', en: 'Sunday', note: '✅ identical' },
];

const MONTHS_DATA = [
  { id: 'm01', display: 'Jan', pt: 'janeiro', es: 'enero', en: 'January', note: null },
  { id: 'm02', display: 'Feb', pt: 'fevereiro', es: 'febrero', en: 'February', note: 'similar' },
  { id: 'm03', display: 'Mar', pt: 'março', es: 'marzo', en: 'March', note: 'similar' },
  { id: 'm04', display: 'Apr', pt: 'abril', es: 'abril', en: 'April', note: '✅ identical' },
  { id: 'm05', display: 'May', pt: 'maio', es: 'mayo', en: 'May', note: 'similar' },
  { id: 'm06', display: 'Jun', pt: 'junho', es: 'junio', en: 'June', note: 'similar' },
  { id: 'm07', display: 'Jul', pt: 'julho', es: 'julio', en: 'July', note: 'similar' },
  { id: 'm08', display: 'Aug', pt: 'agosto', es: 'agosto', en: 'August', note: '✅ identical' },
  { id: 'm09', display: 'Sep', pt: 'setembro', es: 'septiembre', en: 'September', note: 'similar' },
  { id: 'm10', display: 'Oct', pt: 'outubro', es: 'octubre', en: 'October', note: 'similar' },
  { id: 'm11', display: 'Nov', pt: 'novembro', es: 'noviembre', en: 'November', note: 'similar' },
  { id: 'm12', display: 'Dec', pt: 'dezembro', es: 'diciembre', en: 'December', note: 'similar' },
];

const NUMBERS_DATA = {
  '1–20 (basic)': [
    { id: 'n01', display: '1', pt: 'um / uma', es: 'uno / una', en: 'one', note: '⚠️ both languages have gender forms' },
    { id: 'n02', display: '2', pt: 'dois / duas', es: 'dos', en: 'two', note: '⚠️ pt has gender, es does not' },
    { id: 'n03', display: '3', pt: 'três', es: 'tres', en: 'three', note: null },
    { id: 'n04', display: '4', pt: 'quatro', es: 'cuatro', en: 'four', note: null },
    { id: 'n05', display: '5', pt: 'cinco', es: 'cinco', en: 'five', note: '✅ identical' },
    { id: 'n06', display: '6', pt: 'seis', es: 'seis', en: 'six', note: '✅ identical' },
    { id: 'n07', display: '7', pt: 'sete', es: 'siete', en: 'seven', note: null },
    { id: 'n08', display: '8', pt: 'oito', es: 'ocho', en: 'eight', note: null },
    { id: 'n09', display: '9', pt: 'nove', es: 'nueve', en: 'nine', note: null },
    { id: 'n10', display: '10', pt: 'dez', es: 'diez', en: 'ten', note: null },
    { id: 'n11', display: '11', pt: 'onze', es: 'once', en: 'eleven', note: null },
    { id: 'n12', display: '12', pt: 'doze', es: 'doce', en: 'twelve', note: null },
    { id: 'n13', display: '13', pt: 'treze', es: 'trece', en: 'thirteen', note: null },
    { id: 'n14', display: '14', pt: 'quatorze / catorze', es: 'catorce', en: 'fourteen', note: null },
    { id: 'n15', display: '15', pt: 'quinze', es: 'quince', en: 'fifteen', note: null },
    { id: 'n16', display: '16', pt: 'dezesseis', es: 'dieciséis', en: 'sixteen', note: 'pt dez+e+seis; es contracts diez y seis' },
    { id: 'n17', display: '17', pt: 'dezessete', es: 'diecisiete', en: 'seventeen', note: null },
    { id: 'n18', display: '18', pt: 'dezoito', es: 'dieciocho', en: 'eighteen', note: null },
    { id: 'n19', display: '19', pt: 'dezenove', es: 'diecinueve', en: 'nineteen', note: null },
    { id: 'n20', display: '20', pt: 'vinte', es: 'veinte', en: 'twenty', note: null },
  ],
  '30–90 (tens)': [
    { id: 'n30', display: '30', pt: 'trinta', es: 'treinta', en: 'thirty', note: null },
    { id: 'n40', display: '40', pt: 'quarenta', es: 'cuarenta', en: 'forty', note: null },
    { id: 'n50', display: '50', pt: 'cinquenta', es: 'cincuenta', en: 'fifty', note: null },
    { id: 'n60', display: '60', pt: 'sessenta', es: 'sesenta', en: 'sixty', note: null },
    { id: 'n70', display: '70', pt: 'setenta', es: 'setenta', en: 'seventy', note: '✅ identical' },
    { id: 'n80', display: '80', pt: 'oitenta', es: 'ochenta', en: 'eighty', note: null },
    { id: 'n90', display: '90', pt: 'noventa', es: 'noventa', en: 'ninety', note: '✅ identical' },
  ],
  '100–1000': [
    { id: 'n100', display: '100', pt: 'cem', es: 'cien', en: 'one hundred', note: 'pt cem standalone, cento in compounds' },
    { id: 'n200', display: '200', pt: 'duzentos / duzentas', es: 'doscientos / doscientas', en: 'two hundred', note: 'both agree in gender' },
    { id: 'n300', display: '300', pt: 'trezentos', es: 'trescientos', en: 'three hundred', note: null },
    { id: 'n400', display: '400', pt: 'quatrocentos', es: 'cuatrocientos', en: 'four hundred', note: null },
    { id: 'n500', display: '500', pt: 'quinhentos', es: 'quinientos', en: 'five hundred', note: '⚠️ both irregular' },
    { id: 'n600', display: '600', pt: 'seiscentos', es: 'seiscientos', en: 'six hundred', note: null },
    { id: 'n700', display: '700', pt: 'setecentos', es: 'setecientos', en: 'seven hundred', note: null },
    { id: 'n800', display: '800', pt: 'oitocentos', es: 'ochocientos', en: 'eight hundred', note: null },
    { id: 'n900', display: '900', pt: 'novecentos', es: 'novecientos', en: 'nine hundred', note: null },
    { id: 'n1000', display: '1000', pt: 'mil', es: 'mil', en: 'one thousand', note: '✅ identical' },
  ],
  'Ordinals (1st–10th)': [
    { id: 'o01', display: '1º', pt: 'primeiro / primeira', es: 'primero / primera', en: 'first', note: null },
    { id: 'o02', display: '2º', pt: 'segundo / segunda', es: 'segundo / segunda', en: 'second', note: '✅ identical' },
    { id: 'o03', display: '3º', pt: 'terceiro / terceira', es: 'tercero / tercera', en: 'third', note: null },
    { id: 'o04', display: '4º', pt: 'quarto / quarta', es: 'cuarto / cuarta', en: 'fourth', note: null },
    { id: 'o05', display: '5º', pt: 'quinto / quinta', es: 'quinto / quinta', en: 'fifth', note: '✅ identical' },
    { id: 'o06', display: '6º', pt: 'sexto / sexta', es: 'sexto / sexta', en: 'sixth', note: '✅ identical' },
    { id: 'o07', display: '7º', pt: 'sétimo / sétima', es: 'séptimo / séptima', en: 'seventh', note: null },
    { id: 'o08', display: '8º', pt: 'oitavo / oitava', es: 'octavo / octava', en: 'eighth', note: null },
    { id: 'o09', display: '9º', pt: 'nono / nona', es: 'noveno / novena', en: 'ninth', note: null },
    { id: 'o10', display: '10º', pt: 'décimo / décima', es: 'décimo / décima', en: 'tenth', note: '✅ identical' },
  ],
};

const app = document.getElementById('app');

// === Vocabulary storage ===
const VOCAB_KEY = 'lingua-saved-vocab';
function getSavedVocab() {
  try { return JSON.parse(localStorage.getItem(VOCAB_KEY) || '[]'); }
  catch { return []; }
}
function setSavedVocab(arr) { localStorage.setItem(VOCAB_KEY, JSON.stringify(arr)); }
function toggleSavedVocab(lessonId, itemId) {
  const key = `${lessonId}:${itemId}`;
  const saved = getSavedVocab();
  const idx = saved.indexOf(key);
  if (idx >= 0) { saved.splice(idx, 1); setSavedVocab(saved); return false; }
  saved.push(key); setSavedVocab(saved); return true;
}
function isSavedVocab(lessonId, itemId) {
  return getSavedVocab().includes(`${lessonId}:${itemId}`);
}
const INTRO_DIALOG = [
  { line: 1, speaker: 'maria', pt: 'Oi! Tudo bem? Quanto tempo você está no Brasil?', es: '¡Hola! ¿Qué tal? ¿Cuánto tiempo llevas en Brasil?', en: 'Hi! How are you? How long have you been in Brazil?', note: null },
  { line: 2, speaker: 'phoenix', pt: 'Tudo bem! Estou no Brasil há um mês. Cheguei aqui há três dias.', es: '¡Bien! Llevo un mes en Brasil. Llegué aquí hace tres días.', en: "Good! I've been in Brazil for a month. I arrived here 3 days ago.", note: '🇧🇷 "há + tempo" = for/since (like ES "hace")' },
  { line: 3, speaker: 'maria', pt: 'Bem-vinda! Você está aqui a estudo ou a trabalho?', es: '¡Bienvenida! ¿Estás aquí para estudiar o por trabajo?', en: 'Welcome! Are you here to study or work?', note: null },
  { line: 4, speaker: 'phoenix', pt: 'Nenhum dos dois. Só estou viajando.', es: 'Ninguno de los dos. Solo estoy viajando.', en: "Neither. I'm just traveling.", note: null },
  { line: 5, speaker: 'maria', pt: 'Que demais! De onde você é?', es: '¡Qué genial! ¿De dónde eres?', en: "How awesome! Where are you from?", note: '🇧🇷 "Que demais!" = BR slang enthusiasm' },
  { line: 6, speaker: 'phoenix', pt: 'Sou de Taiwan.', es: 'Soy de Taiwán.', en: "I'm from Taiwan.", note: null },
  { line: 7, speaker: 'maria', pt: 'Uau! Quanto tempo de avião pra chegar aqui?', es: '¡Guau! ¿Cuánto tarda el vuelo hasta aquí?', en: 'Wow! How long is the flight here?', note: null },
  { line: 8, speaker: 'phoenix', pt: 'Eu não voo. Quero dar a volta ao mundo sem pegar avião. Saí de Taiwan em maio do ano passado.', es: 'Yo no vuelo. Quiero dar la vuelta al mundo sin tomar avión. Salí de Taiwán en mayo del año pasado.', en: "I don't fly. I want to go around the world without taking planes. I left Taiwan in May last year.", note: null },
  { line: 9, speaker: 'maria', pt: 'Sério?! E como você veio?', es: '¿En serio? ¿Y cómo viniste?', en: 'Seriously?! How did you get here?', note: null },
  { line: 10, speaker: 'phoenix', pt: 'Passei pela China, Coreia, Japão. Peguei um cruzeiro pros Estados Unidos. Depois México, cruzei a América Central por terra, e da Panamá peguei vários barcos pra Colômbia.', es: 'Pasé por China, Corea, Japón. Tomé un crucero a Estados Unidos. Luego México, crucé Centroamérica por tierra, y desde Panamá tomé varios barcos a Colombia.', en: 'Through China, Korea, Japan. Took a cruise to the USA. Then Mexico, crossed Central America by land, and from Panama took several boats to Colombia.', note: '🇧🇷 "pros" = pra os; "vários" = several' },
  { line: 11, speaker: 'maria', pt: 'Que jornada incrível!', es: '¡Qué viaje increíble!', en: 'What an incredible journey!', note: null },
  { line: 12, speaker: 'phoenix', pt: 'De lá fui pra Equador, Peru, e do Peru peguei cinco barcos lentos pela Amazônia até Belém.', es: 'De ahí fui a Ecuador, Perú, y desde Perú tomé cinco barcos lentos por el Amazonas hasta Belém.', en: 'From there to Ecuador, Peru, and from Peru I took five slow boats through the Amazon to Belém.', note: '🇧🇷 "barco lento" = slow boat (Amazon riverboat)' },
  { line: 13, speaker: 'maria', pt: 'Nossa, você é corajosa! E quanto tempo mais fica?', es: '¡Wow, eres valiente! ¿Y cuánto tiempo más te quedas?', en: "Wow, you're brave! How long are you staying?", note: '🇧🇷 "Nossa!" = main BR exclamation' },
  { line: 14, speaker: 'phoenix', pt: 'Mais dois meses no Brasil. Depois sigo pro sul — Paraguai, Chile e outros países sul-americanos. Este ano todo na América do Sul.', es: 'Dos meses más en Brasil. Después sigo al sur — Paraguay, Chile y otros países sudamericanos. Este año entero en Sudamérica.', en: 'Two more months in Brazil. Then south — Paraguay, Chile and other South American countries. All year in South America.', note: null },
  { line: 15, speaker: 'maria', pt: 'E depois?', es: '¿Y después?', en: 'And after?', note: null },
  { line: 16, speaker: 'phoenix', pt: 'Ano que vem quero atravessar o Atlântico pra Europa e África.', es: 'El año que viene quiero cruzar el Atlántico hacia Europa y África.', en: 'Next year I want to cross the Atlantic to Europe and Africa.', note: null },
  { line: 17, speaker: 'maria', pt: 'Que sonho! Você tá gostando daqui?', es: '¡Qué sueño! ¿Te está gustando aquí?', en: 'What a dream! Are you enjoying it here?', note: '🇧🇷 "tá" = está' },
  { line: 18, speaker: 'phoenix', pt: 'Tô amando! O Brasil é maravilhoso, eu amo a música e as pessoas são acolhedoras.', es: '¡Me encanta! Brasil es maravilloso, amo la música y la gente es acogedora.', en: "I'm loving it! Brazil is wonderful, I love the music and the people are welcoming.", note: '🇧🇷 "Tô" = Estou (colloquial)' },
  { line: 19, speaker: 'maria', pt: 'Que bom! E o que você fazia em Taiwan?', es: '¡Qué bueno! ¿Y qué hacías en Taiwán?', en: 'Great! What did you do in Taiwan?', note: null },
  { line: 20, speaker: 'phoenix', pt: 'Sou formada em História. Trabalhei como consultora de sustentabilidade empresarial.', es: 'Soy licenciada en Historia. Trabajaba como consultora de sostenibilidad empresarial.', en: 'I have a degree in History. I worked as a corporate sustainability consultant.', note: '🇧🇷 "Sou formada em" = standard way to say "I have a degree in"' },
  { line: 21, speaker: 'maria', pt: 'Que profissão importante! Posso te perguntar quantos anos você tem?', es: '¡Qué profesión importante! ¿Puedo preguntarte cuántos años tienes?', en: 'What an important profession! Can I ask how old you are?', note: null },
  { line: 22, speaker: 'phoenix', pt: 'Tenho vinte e oito anos.', es: 'Tengo veintiocho años.', en: "I'm 28.", note: null },
  { line: 23, speaker: 'maria', pt: 'É casada?', es: '¿Estás casada?', en: 'Are you married?', note: null },
  { line: 24, speaker: 'phoenix', pt: 'Não, sou solteira.', es: 'No, soy soltera.', en: "No, I'm single.", note: null },
  { line: 25, speaker: 'maria', pt: 'E sua família, mora em Taiwan?', es: '¿Y tu familia, vive en Taiwán?', en: 'And your family, do they live in Taiwan?', note: null },
  { line: 26, speaker: 'phoenix', pt: 'Sim, todos lá. Tenho um irmão mais novo, ele tem vinte e seis anos.', es: 'Sí, todos allá. Tengo un hermano menor, tiene veintiséis años.', en: 'Yes, all there. I have a younger brother, he is 26.', note: null },
  { line: 27, speaker: 'maria', pt: 'Você tem Instagram? TikTok? YouTube?', es: '¿Tienes Instagram? ¿TikTok? ¿YouTube?', en: 'Do you have Instagram? TikTok? YouTube?', note: null },
  { line: 28, speaker: 'phoenix', pt: 'Só tenho Instagram. Posso te passar.', es: 'Solo tengo Instagram. Te lo paso.', en: 'I only have Instagram. I can give it to you.', note: null },
];

const INTRO_VOCAB = {
  '🔤 Verbs': [
    { id: 'v01', pt: 'ser', es: 'ser', en: 'to be (permanent)', note: 'identity, origin, profession, characteristics', example: { pt: 'O café aqui é forte.', es: 'El café aquí es fuerte.', en: 'The coffee here is strong.' } },
    { id: 'v02', pt: 'estar', es: 'estar', en: 'to be (temporary)', note: 'location, state, ongoing action', example: { pt: 'Estou cansada hoje.', es: 'Estoy cansada hoy.', en: "I'm tired today." } },
    { id: 'v03', pt: 'viajar', es: 'viajar', en: 'to travel', note: '✅ identical', example: { pt: 'Viajo sozinha há quase dois anos.', es: 'Viajo sola desde hace casi dos años.', en: "I've been traveling alone for almost 2 years." } },
    { id: 'v04', pt: 'chegar', es: 'llegar', en: 'to arrive', note: '⚠️ different', example: { pt: 'A que horas chega o ônibus?', es: '¿A qué hora llega el autobús?', en: 'What time does the bus arrive?' } },
    { id: 'v05', pt: 'sair', es: 'salir', en: 'to leave', note: 'similar', example: { pt: 'A gente sai amanhã de manhã.', es: 'Salimos mañana por la mañana.', en: 'We leave tomorrow morning.' } },
    { id: 'v06', pt: 'passar', es: 'pasar', en: 'to pass through', note: '✅ similar', example: { pt: 'Você já passou pelo Rio?', es: '¿Ya pasaste por Río?', en: 'Have you been through Rio?' } },
    { id: 'v07', pt: 'pegar', es: 'tomar', en: 'to take (transport)', note: '⚠️ different; pt also "tomar" for drinks', example: { pt: 'Vou pegar um Uber.', es: 'Voy a tomar un Uber.', en: "I'll take an Uber." } },
    { id: 'v08', pt: 'cruzar', es: 'cruzar', en: 'to cross', note: '✅ identical', example: { pt: 'Cruzei a fronteira ontem.', es: 'Crucé la frontera ayer.', en: 'I crossed the border yesterday.' } },
    { id: 'v09', pt: 'atravessar', es: 'atravesar', en: 'to cross (over)', note: 'similar', example: { pt: 'Vamos atravessar a rua aqui.', es: 'Vamos a atravesar la calle aquí.', en: "Let's cross the street here." } },
    { id: 'v10', pt: 'ficar', es: 'quedarse', en: 'to stay', note: '⚠️ different', example: { pt: 'Onde você vai ficar?', es: '¿Dónde te vas a quedar?', en: 'Where are you going to stay?' } },
    { id: 'v11', pt: 'gostar (de)', es: 'gustar', en: 'to like', note: '⚠️ different structure; pt: eu gosto de X, es: me gusta X', example: { pt: 'Eu gosto muito do açaí.', es: 'Me gusta mucho el açaí.', en: 'I really like açaí.' } },
    { id: 'v12', pt: 'amar', es: 'amar / encantar', en: 'to love', note: 'pt "tô amando" = "I love it"', example: { pt: 'Amo viajar de barco.', es: 'Amo viajar en barco.', en: 'I love traveling by boat.' } },
    { id: 'v13', pt: 'voar', es: 'volar', en: 'to fly', note: 'similar', example: { pt: 'Nunca mais vou voar.', es: 'Nunca más voy a volar.', en: "I'm never flying again." } },
    { id: 'v14', pt: 'seguir', es: 'seguir', en: 'to continue / follow', note: '✅ identical', example: { pt: 'Sigo até a próxima cidade amanhã.', es: 'Sigo hasta la próxima ciudad mañana.', en: 'I continue to the next city tomorrow.' } },
  ],
  '❓ Question words & phrases': [
    { id: 'q01', pt: 'Quanto tempo', es: 'Cuánto tiempo', en: 'How long', note: 'time-duration question',
      example: { pt: 'Quanto tempo você fica aqui?', es: '¿Cuánto tiempo te quedas aquí?', en: 'How long are you staying here?' },
      answer:  { pt: 'Fico mais ou menos uma semana.', es: 'Me quedo más o menos una semana.', en: 'About a week.' } },
    { id: 'q02', pt: 'De onde', es: 'De dónde', en: 'Where from', note: '✅ similar',
      example: { pt: 'De onde você é?', es: '¿De dónde eres?', en: 'Where are you from?' },
      answer:  { pt: 'Sou de Taiwan, mas moro fora há anos.', es: 'Soy de Taiwán, pero vivo fuera desde hace años.', en: "I'm from Taiwan, but I've lived abroad for years." } },
    { id: 'q03', pt: 'Quantos anos', es: 'Cuántos años', en: 'How old', note: '✅ identical structure',
      example: { pt: 'Quantos anos você tem?', es: '¿Cuántos años tienes?', en: 'How old are you?' },
      answer:  { pt: 'Tenho vinte e oito.', es: 'Tengo veintiocho.', en: "I'm 28." } },
    { id: 'q04', pt: 'E depois?', es: '¿Y después?', en: 'And after?', note: '✅ similar',
      example: { pt: 'E depois, o que você vai fazer?', es: '¿Y después, qué vas a hacer?', en: 'And after, what will you do?' },
      answer:  { pt: 'Depois sigo pra Argentina.', es: 'Después sigo a Argentina.', en: 'Then I continue to Argentina.' } },
    { id: 'q05', pt: 'Sério?', es: '¿En serio?', en: 'Seriously?', note: 'reaction to surprising news',
      example: { pt: 'Vou cruzar o Atlântico de veleiro.', es: 'Voy a cruzar el Atlántico en velero.', en: "I'm crossing the Atlantic by sailboat." },
      answer:  { pt: 'Sério?! Que corajosa!', es: '¿En serio? ¡Qué valiente!', en: 'Seriously?! How brave!' } },
  ],
  '🕐 Time expressions': [
    { id: 't01', pt: 'há um mês', es: 'hace un mes / un mes', en: 'a month ago / for a month', note: 'pt "há" + duration', example: { pt: 'Conheci ela há um mês.', es: 'La conocí hace un mes.', en: 'I met her a month ago.' } },
    { id: 't02', pt: 'há três dias', es: 'hace tres días', en: '3 days ago', note: null, example: { pt: 'Tô sem dormir bem há três dias.', es: 'No estoy durmiendo bien desde hace tres días.', en: "I haven't slept well for 3 days." } },
    { id: 't03', pt: 'ano passado', es: 'año pasado', en: 'last year', note: '✅ identical', example: { pt: 'No ano passado fui pra Coreia.', es: 'El año pasado fui a Corea.', en: 'Last year I went to Korea.' } },
    { id: 't04', pt: 'ano que vem', es: 'año que viene', en: 'next year', note: '✅ identical', example: { pt: 'Ano que vem quero aprender alemão.', es: 'El año que viene quiero aprender alemán.', en: 'Next year I want to learn German.' } },
    { id: 't05', pt: 'mais dois meses', es: 'dos meses más', en: '2 more months', note: 'pt: mais X tempo; es: X tempo más', example: { pt: 'Preciso de mais dois meses pra terminar.', es: 'Necesito dos meses más para terminar.', en: 'I need 2 more months to finish.' } },
  ],
  '🙋 Self description': [
    { id: 's01', pt: 'Sou de ___', es: 'Soy de ___', en: "I'm from ___", note: '✅ identical structure', example: { pt: 'Sou da capital, Taipei.', es: 'Soy de la capital, Taipéi.', en: "I'm from the capital, Taipei." } },
    { id: 's02', pt: 'Sou formada em ___', es: 'Soy licenciada en ___', en: 'I have a degree in ___', note: '⚠️ different; pt "formada/formado" agrees with gender', example: { pt: 'Minha mãe é formada em Direito.', es: 'Mi madre es licenciada en Derecho.', en: 'My mom has a law degree.' } },
    { id: 's03', pt: 'Sou solteira / casada', es: 'Soy soltera / casada', en: "I'm single / married", note: '✅ identical; feminine agreement for Phoenix', example: { pt: 'Ainda sou solteira e tô feliz assim.', es: 'Aún soy soltera y estoy feliz así.', en: "I'm still single and happy that way." } },
    { id: 's04', pt: 'Tenho ___ anos', es: 'Tengo ___ años', en: "I'm ___ years old", note: '✅ identical', example: { pt: 'Meu irmão tem só vinte e seis anos.', es: 'Mi hermano tiene solo veintiséis años.', en: 'My brother is only 26.' } },
    { id: 's05', pt: 'irmão mais novo', es: 'hermano menor', en: 'younger brother', note: '⚠️ pt "mais velho/novo"; es "mayor/menor"', example: { pt: 'Sinto saudade do meu irmão mais novo.', es: 'Extraño a mi hermano menor.', en: 'I miss my younger brother.' } },
  ],
  '🌍 Travel & places': [
    { id: 'tr01', pt: 'dar a volta ao mundo', es: 'dar la vuelta al mundo', en: 'go around the world', note: '✅ identical idiom', example: { pt: 'Sempre sonhei em dar a volta ao mundo.', es: 'Siempre soñé con dar la vuelta al mundo.', en: 'I always dreamed of going around the world.' } },
    { id: 'tr02', pt: 'sem pegar avião', es: 'sin tomar avión', en: 'without flying', note: '✅ similar', example: { pt: 'Tô tentando viajar sem pegar avião.', es: 'Estoy intentando viajar sin tomar avión.', en: "I'm trying to travel without flying." } },
    { id: 'tr03', pt: 'por terra', es: 'por tierra', en: 'by land', note: '✅ similar', example: { pt: 'É mais barato ir por terra.', es: 'Es más barato ir por tierra.', en: "It's cheaper to go by land." } },
    { id: 'tr04', pt: 'de barco', es: 'de barco / en barco', en: 'by boat', note: '✅ similar', example: { pt: 'Adoro viajar de barco.', es: 'Adoro viajar en barco.', en: 'I love traveling by boat.' } },
    { id: 'tr05', pt: 'de cruzeiro', es: 'en crucero', en: 'by cruise', note: 'similar', example: { pt: 'Atravessei o Pacífico de cruzeiro.', es: 'Crucé el Pacífico en crucero.', en: 'I crossed the Pacific by cruise.' } },
    { id: 'tr06', pt: 'América do Sul', es: 'Sudamérica / América del Sur', en: 'South America', note: 'similar', example: { pt: 'A América do Sul é incrível.', es: 'Sudamérica es increíble.', en: 'South America is incredible.' } },
  ],
  '🌟 Praise expressions': [
    { id: 'p01', pt: 'Tô amando!', es: '¡Me encanta!', en: "I'm loving it!", note: 'pt: "Tô" = "Estou" colloquial', example: { pt: 'Tô amando essa praia!', es: '¡Me encanta esta playa!', en: "I'm loving this beach!" } },
    { id: 'p02', pt: 'É maravilhoso', es: 'Es maravilloso', en: "It's wonderful", note: '✅ similar', example: { pt: 'O pôr do sol aqui é maravilhoso.', es: 'El atardecer aquí es maravilloso.', en: 'The sunset here is wonderful.' } },
    { id: 'p03', pt: 'É incrível', es: 'Es increíble', en: "It's amazing", note: '✅ similar', example: { pt: 'A vista é incrível.', es: 'La vista es increíble.', en: 'The view is incredible.' } },
    { id: 'p04', pt: 'são acolhedoras', es: 'son acogedoras', en: 'are welcoming', note: '✅ similar (feminine plural for "as pessoas")', example: { pt: 'As famílias aqui são acolhedoras.', es: 'Las familias aquí son acogedoras.', en: 'The families here are welcoming.' } },
    { id: 'p05', pt: 'tem uma vibração única', es: 'tiene una vibra única', en: 'has a unique vibe', note: 'pt: "vibração"; es: "vibra"', example: { pt: 'Salvador tem uma vibração única.', es: 'Salvador tiene una vibra única.', en: 'Salvador has a unique vibe.' } },
    { id: 'p06', pt: 'é espetacular', es: 'es espectacular', en: 'is spectacular', note: '✅ similar', example: { pt: 'A música ao vivo é espetacular.', es: 'La música en vivo es espectacular.', en: 'The live music is spectacular.' } },
    { id: 'p07', pt: 'me surpreende', es: 'me sorprende', en: 'surprises me', note: '✅ similar', example: { pt: 'A hospitalidade me surpreende todo dia.', es: 'La hospitalidad me sorprende cada día.', en: 'The hospitality surprises me every day.' } },
    { id: 'p08', pt: 'o calor das pessoas', es: 'el calor de la gente', en: 'the warmth of people', note: 'BR cultural value (warmth, hospitality)', example: { pt: 'O calor das pessoas é o que mais gosto aqui.', es: 'El calor de la gente es lo que más me gusta aquí.', en: 'The warmth of people is what I like most here.' } },
  ],
  '📱 Social media': [
    { id: 'sm01', pt: 'Instagram', es: 'Instagram', en: 'Instagram', note: '✅ identical', example: { pt: 'Me adiciona no Instagram?', es: '¿Me agregas en Instagram?', en: 'Add me on Instagram?' } },
    { id: 'sm02', pt: 'TikTok', es: 'TikTok', en: 'TikTok', note: '✅ identical', example: { pt: 'Eu não uso TikTok.', es: 'Yo no uso TikTok.', en: "I don't use TikTok." } },
    { id: 'sm03', pt: 'YouTube', es: 'YouTube', en: 'YouTube', note: '✅ identical', example: { pt: 'Assisto YouTube todo dia.', es: 'Veo YouTube todos los días.', en: 'I watch YouTube every day.' } },
    { id: 'sm04', pt: 'te seguir', es: 'seguirte', en: 'follow you', note: 'pt: te + seguir; es: seguir + te', example: { pt: 'Já comecei a te seguir.', es: 'Ya empecé a seguirte.', en: 'I already started following you.' } },
    { id: 'sm05', pt: 'te passar', es: 'pasarte', en: 'give it to you', note: 'pt: te passo / te dou; es: te lo paso', example: { pt: 'Te passo meu número também.', es: 'Te paso mi número también.', en: "I'll give you my number too." } },
  ],
  '🎉 BR Exclamations': [
    { id: 'e01', pt: 'Que demais!', es: '¡Qué genial!', en: 'How awesome!', note: 'BR informal enthusiasm', example: { pt: 'Que demais essa festa!', es: '¡Qué genial esta fiesta!', en: 'This party is awesome!' } },
    { id: 'e02', pt: 'Uau!', es: '¡Guau!', en: 'Wow!', note: '✅ similar', example: { pt: 'Uau, que praia linda!', es: '¡Guau, qué playa linda!', en: 'Wow, what a beautiful beach!' } },
    { id: 'e03', pt: 'Nossa!', es: '¡Wow! / ¡Guau!', en: 'Wow!', note: '🇧🇷 main BR exclamation (from "Nossa Senhora")', example: { pt: 'Nossa, que calor!', es: '¡Wow, qué calor!', en: "Wow, it's so hot!" } },
    { id: 'e04', pt: 'Que sonho!', es: '¡Qué sueño!', en: 'What a dream!', note: '✅ similar', example: { pt: 'Que sonho morar aqui!', es: '¡Qué sueño vivir aquí!', en: 'What a dream to live here!' } },
    { id: 'e05', pt: 'Que bom!', es: '¡Qué bueno!', en: 'How nice!', note: '✅ similar', example: { pt: 'Que bom te conhecer!', es: '¡Qué bueno conocerte!', en: 'So nice to meet you!' } },
    { id: 'e06', pt: 'Que jornada incrível!', es: '¡Qué viaje increíble!', en: 'What an incredible journey!', note: 'similar', example: { pt: 'Que jornada incrível você teve!', es: '¡Qué viaje increíble tuviste!', en: 'What an incredible journey you had!' } },
  ],
};

const INTRO_GRAMMAR = [
  {
    title: '1. ser vs estar — THE core distinction',
    table: {
      headers: ['Use', 'pt', 'es', 'en'],
      rows: [
        ['Identity/origin', 'Sou de Taiwan.', 'Soy de Taiwán.', "I'm from Taiwan."],
        ['Profession/state', 'Sou solteira.', 'Soy soltera.', "I'm single."],
        ['Location (temp)', 'Estou no Brasil.', 'Estoy en Brasil.', "I'm in Brazil."],
        ['Ongoing action', 'Estou viajando.', 'Estoy viajando.', "I'm traveling."],
      ],
    },
    body: '**ser** = permanent (identity, origin, profession, characteristic)\n**estar** = temporary (location, state, ongoing)\nPhoenix as woman uses feminine agreement: solteira, formada, casada.',
    callout: '✅ pt/es work the same way — biggest challenge is ENGLISH speakers who use "to be" for both.',
  },
  {
    title: '2. "há + 時間" = for/since (and "ago")',
    table: {
      headers: ['Meaning', 'pt', 'es'],
      rows: [
        ['For (duration)', 'Estou no Brasil há um mês', 'Llevo un mes en Brasil'],
        ['Ago (point past)', 'Cheguei há três dias', 'Llegué hace tres días'],
      ],
    },
    body: '⚠️ ES uses **two different structures**:\n• "llevar + duration" for ongoing duration\n• "hace + duration" for past point\nPT uses **há** for both — easier for you.',
    callout: '⚠️ This is the biggest pt/es gap in basic conversation.',
  },
  {
    title: '3. Pretérito perfeito — talking about your trip',
    body: 'For travel/journey storytelling, use **pretérito perfeito** (simple past):\n• `Saí de Taiwan` (I left)\n• `Passei pela China` (I went through)\n• `Peguei um barco` (I took a boat)\n• `Cruzei a América Central` (I crossed)\n• `Cheguei aqui` (I arrived)',
    callout: 'Endings: -ar verbs → -ei (eu), -ou (você), -amos (nós), -aram (eles). Irregulars: `ir` → fui; `vir` → vim.',
  },
  {
    title: '4. Presente progressivo — "I am ___ing"',
    body: '• `Estou viajando` (estar + gerundio)\n• `Tô amando` (colloquial: tô = estou)\n• `Tá gostando` (tá = está)\n\nGerundio endings: -ar → -ando, -er → -endo, -ir → -indo',
    callout: '⚠️ ES preferers "estar + gerundio" identically; ✅ structure matches.',
  },
  {
    title: '5. Future plans — vou / quero',
    body: 'Two common future patterns:\n• `vou + infinitivo` (informal future): `Vou ficar dois meses`\n• `quero + infinitivo` (desire/intent): `Quero atravessar o Atlântico`',
    callout: '✅ Both work in ES: `voy a + inf` / `quiero + inf`',
  },
];

const INTRO_CULTURE = [
  {
    title: '1. Brazilians ask personal questions openly',
    points: [
      'Age, marriage, religion, salary are normal first-meeting topics',
      "It's not nosy — it's curiosity + warmth",
      'Brazilians share their own freely too',
      'Don\'t be offended; redirect if uncomfortable: `Prefiro não falar disso` (I\'d rather not talk about that)',
    ],
  },
  {
    title: '2. Enthusiasm expressions you\'ll hear constantly',
    points: [
      '**Nossa!** — main BR "wow" (originally "Nossa Senhora" = Our Lady)',
      '**Que demais!** / **Que legal!** — How awesome',
      '**Sério?!** — Seriously?!',
      '**Que sonho!** — What a dream / What a beautiful thing',
      '**Que bom!** — How nice',
      '⚠️ Mirror their energy — being overly reserved feels cold in BR',
    ],
  },
  {
    title: '3. Colloquialisms in everyday speech',
    points: [
      '**tô** = estou (I am)',
      '**tá** = está (you/he/she is)',
      '**pra** = para (to/for)',
      '**pro** = para o (to the masc)',
      '**cê** = você (informal)',
      'These are spoken everywhere; standard PT writing keeps full forms',
    ],
  },
  {
    title: '4. Welcoming foreigners — Brazilians love travel stories',
    points: [
      'Your no-fly journey will be a HUGE conversation magnet',
      'Be ready to share details (they love specifics)',
      'Common follow-ups: `Não foi cansativo?` `Como você se sustenta?` `Não tem medo?`',
      'It\'s flattery, not interrogation',
    ],
  },
  {
    title: '5. Profession/education identity matters',
    points: [
      '`Sou formada em ___` is the standard phrasing',
      'Brazilians often introduce profession early',
      '⚠️ Don\'t hide work background — sustainability consulting is impressive context that opens doors',
      'Profissões in PT are gendered: consultora (you), consultor (male)',
    ],
  },
];

const INTRO_PRACTICE = [
  {
    num: 1,
    question: "You want to say: 'I've been in Brazil for 2 months and arrived in this city yesterday.'",
    answer: {
      pt: 'Estou no Brasil há dois meses e cheguei nesta cidade ontem.',
      es: 'Llevo dos meses en Brasil y llegué a esta ciudad ayer.',
      en: "I've been in Brazil for 2 months and arrived in this city yesterday.",
      note: '⚠️ Note pt "há" vs es "llevar / hace" distinction.',
    },
  },
  {
    num: 2,
    question: "Tell someone: 'I'm not flying — I want to go around the world by land and sea.'",
    answer: {
      pt: 'Eu não voo — quero dar a volta ao mundo por terra e mar.',
      es: 'Yo no vuelo — quiero dar la vuelta al mundo por tierra y mar.',
      en: 'I don\'t fly — I want to go around the world by land and sea.',
    },
  },
  {
    num: 3,
    question: "Someone asks 'What did you do back home?'. Reply with your degree + profession.",
    answer: {
      pt: 'Sou formada em História e trabalhei como consultora de sustentabilidade empresarial.',
      es: 'Soy licenciada en Historia y trabajaba como consultora de sostenibilidad empresarial.',
      en: 'I have a History degree and worked as a corporate sustainability consultant.',
      note: 'Feminine agreement: formada / licenciada / consultora.',
    },
  },
  {
    num: 4,
    question: "Praise Brazil with 2 different expressions in one response.",
    answer: {
      pt: 'Tô amando! O Brasil é maravilhoso e as pessoas são acolhedoras.',
      es: '¡Me encanta! Brasil es maravilloso y la gente es acogedora.',
      en: "I'm loving it! Brazil is wonderful and the people are welcoming.",
      note: 'Mix energy ("Tô amando!") + observation ("é maravilloso").',
    },
  },
  {
    num: 5,
    question: '🇪🇸 ES practice (A2): Self-introduce in Chile — "I\'m 28, single, from Taiwan, traveling South America for a year."',
    answer: {
      es: 'Tengo veintiocho años, soy soltera, soy de Taiwán y estoy viajando por Sudamérica por un año.',
      pt: 'Tenho vinte e oito anos, sou solteira, sou de Taiwan e estou viajando pela América do Sul por um ano.',
      en: "I'm 28, single, from Taiwan and I'm traveling South America for a year.",
      note: 'ser (identity) + estar (current activity).',
    },
  },
];

const CARONA_DIALOG = [
  { line: 1, speaker: 'phoenix', pt: 'Oi, com licença. Posso te perguntar uma coisa?', es: 'Hola, con permiso. ¿Puedo preguntarte algo?', en: 'Hi, excuse me. Can I ask you something?', note: '🇧🇷 "com licença" softens approaching a stranger' },
  { line: 2, speaker: 'driver', pt: 'Claro, pode falar.', es: 'Claro, dime.', en: 'Sure, go ahead.', note: null },
  { line: 3, speaker: 'phoenix', pt: 'Pra onde você está indo?', es: '¿A dónde vas?', en: 'Where are you headed?', note: '🇧🇷 "pra onde" = direction; casual BR' },
  { line: 4, speaker: 'driver', pt: 'Tô indo pro sul. Vou parar em Foz amanhã.', es: 'Voy al sur. Paro en Foz mañana.', en: "I'm going south. Stopping in Foz tomorrow.", note: '🇧🇷 "Tô" = Estou' },
  { line: 5, speaker: 'phoenix', pt: 'Que bom! Tô tentando chegar no sul também. Você daria uma carona pra mim?', es: '¡Qué bien! Estoy intentando llegar al sur también. ¿Me llevarías?', en: "Great! I'm trying to get south too. Would you give me a ride?", note: '"daria" = conditional polite' },
  { line: 6, speaker: 'driver', pt: 'Sozinha? Você é estrangeira, né?', es: '¿Sola? Eres extranjera, ¿no?', en: 'Alone? You\'re a foreigner, right?', note: '🇧🇷 "né?" = right? (tag question)' },
  { line: 7, speaker: 'phoenix', pt: 'Sou de Taiwan. Tô viajando o continente sem pegar avião.', es: 'Soy de Taiwán. Estoy viajando el continente sin tomar avión.', en: "I'm from Taiwan. I'm traveling the continent without flying.", note: null },
  { line: 8, speaker: 'driver', pt: 'Caraca, que doidera! Mas é arriscado pegar carona sozinha, viu.', es: '¡Caramba, qué locura! Pero es arriesgado hacer dedo sola, sabes.', en: "Wow, that's wild! But hitchhiking alone is risky, you know.", note: '🇧🇷 "Caraca!" = wow; "doidera" = craziness (positive); "viu" = you know' },
  { line: 9, speaker: 'phoenix', pt: 'Eu sei. Por isso prefiro pedir em posto, ver a pessoa antes.', es: 'Lo sé. Por eso prefiero pedir en gasolineras, ver a la persona antes.', en: "I know. That's why I prefer asking at gas stations, seeing the person first.", note: '🇧🇷 "posto" = gas station/rest stop' },
  { line: 10, speaker: 'driver', pt: 'Boa, esse é o jeito certo. Beleza, te levo.', es: 'Bien, esa es la forma correcta. Listo, te llevo.', en: "Good, that's the right way. Cool, I'll take you.", note: '🇧🇷 "Beleza" = cool/OK' },
  { line: 11, speaker: 'phoenix', pt: 'Muito obrigada mesmo! Você vai sozinho?', es: '¡Muchísimas gracias! ¿Vas solo?', en: 'Thank you so much! Are you going alone?', note: '"mesmo" intensifies thanks' },
  { line: 12, speaker: 'driver', pt: 'Sozinho. Trabalho assim há vinte anos.', es: 'Solo. Trabajo así desde hace veinte años.', en: "Alone. I've been working like this for 20 years.", note: '🇧🇷 "há + tempo" = for (duration)' },
  { line: 13, speaker: 'phoenix', pt: 'Quanto tempo de viagem até Foz?', es: '¿Cuánto tiempo de viaje hasta Foz?', en: 'How long is the trip to Foz?', note: null },
  { line: 14, speaker: 'driver', pt: 'Umas dez horas. A gente dorme em algum posto no meio do caminho.', es: 'Unas diez horas. Dormimos en alguna gasolinera en el medio del camino.', en: 'About 10 hours. We sleep at some gas station along the way.', note: '🇧🇷 "a gente" = we (informal)' },
  { line: 15, speaker: 'phoenix', pt: 'Tudo bem. Eu durmo no banco mesmo, sem problema.', es: 'Está bien. Yo duermo en el asiento, sin problema.', en: "OK. I'll sleep in the seat, no problem.", note: null },
  { line: 16, speaker: 'driver', pt: 'Tranquilo. Vai com cuidado, viu. Pega sua mochila.', es: 'Tranquila. Ten cuidado, sabes. Trae tu mochila.', en: 'Cool. Be careful, you know. Grab your backpack.', note: '🇧🇷 "Tranquilo/a" = chill (gender agrees with addressee)' },
  { line: 17, speaker: 'phoenix', pt: 'Posso te pagar o jantar? Como forma de agradecer.', es: '¿Puedo invitarte la cena? Como agradecimiento.', en: 'Can I pay for your dinner? As a thank you.', note: null },
  { line: 18, speaker: 'driver', pt: 'Imagina, não precisa. Mas obrigado pela intenção.', es: 'Tranquila, no hace falta. Pero gracias por la intención.', en: "Don't worry, no need. But thanks for the gesture.", note: '🇧🇷 "Imagina!" = of course not / no need' },
  { line: 19, speaker: 'phoenix', pt: 'E pra ajudar na gasolina? Eu insisto.', es: '¿Y para ayudar con la gasolina? Insisto.', en: 'And to help with the gas? I insist.', note: null },
  { line: 20, speaker: 'driver', pt: 'Não, fica tranquila. Só me conta a sua história, isso já é o suficiente.', es: 'No, tranquila. Solo cuéntame tu historia, eso ya es suficiente.', en: "No, relax. Just tell me your story, that's enough.", note: null },
  { line: 21, speaker: 'phoenix', pt: 'Então tá. Tenho uma rota inteira pra contar.', es: 'Está bien entonces. Tengo toda una ruta para contar.', en: "OK then. I've got a whole route to tell about.", note: null },
  { line: 22, speaker: 'driver', pt: 'Boa! Bora então. A gente conversa na estrada.', es: '¡Bien! Vamos entonces. Charlamos en el camino.', en: 'Good! Let\'s go then. We\'ll chat on the road.', note: '🇧🇷 "Bora" = vamos embora (let\'s go); contracted' },
  { line: 23, speaker: 'phoenix', pt: 'Bora!', es: '¡Vamos!', en: "Let's go!", note: null },
  { line: 24, speaker: 'phoenix', pt: 'Aqui já tá bom, posso descer. Valeu demais mesmo!', es: 'Aquí ya está bien, puedo bajar. ¡Muchísimas gracias!', en: 'Here is fine, I can get off. Thanks so much!', note: '🇧🇷 "Valeu" = thanks (casual)' },
  { line: 25, speaker: 'driver', pt: 'Por nada. Boa sorte na sua viagem, viu!', es: 'De nada. ¡Buena suerte en tu viaje!', en: 'No problem. Good luck on your trip!', note: null },
];

const CARONA_VOCAB = {
  '🚛 Hitchhiking verbs': [
    { id: 'v01', pt: 'pegar carona', es: 'hacer dedo / pedir aventón', en: 'to hitchhike', note: '⚠️ very different; BR: pegar carona = take a ride', example: { pt: 'Peguei carona até Foz.', es: 'Hice dedo hasta Foz.', en: 'I hitchhiked to Foz.' } },
    { id: 'v02', pt: 'dar carona', es: 'llevar / dar un aventón', en: 'to give a ride', note: '✅ similar', example: { pt: 'Você dá carona pra mim?', es: '¿Me llevas?', en: 'Will you give me a ride?' } },
    { id: 'v03', pt: 'parar', es: 'parar', en: 'to stop', note: '✅ identical', example: { pt: 'Vou parar no próximo posto.', es: 'Voy a parar en la próxima gasolinera.', en: "I'll stop at the next gas station." } },
    { id: 'v04', pt: 'descer', es: 'bajar(se)', en: 'to get off / down', note: '⚠️ different', example: { pt: 'Posso descer aqui.', es: 'Puedo bajarme aquí.', en: 'I can get off here.' } },
    { id: 'v05', pt: 'subir', es: 'subir(se)', en: 'to get on / up', note: 'similar', example: { pt: 'Sobe aí, vamos!', es: '¡Súbete, vamos!', en: 'Get in, let\'s go!' } },
    { id: 'v06', pt: 'levar', es: 'llevar', en: 'to take/carry someone', note: '✅ similar', example: { pt: 'Te levo até Foz.', es: 'Te llevo hasta Foz.', en: "I'll take you to Foz." } },
    { id: 'v07', pt: 'pagar', es: 'pagar / invitar', en: 'to pay (for someone)', note: 'BR: pagar o jantar pra alguém = treat someone', example: { pt: 'Eu pago o lanche, fica tranquilo.', es: 'Yo pago el snack, tranquilo.', en: "I'll pay for the snack, no worries." } },
    { id: 'v08', pt: 'contar (uma história)', es: 'contar (una historia)', en: 'to tell (a story)', note: '✅ identical', example: { pt: 'Cada motorista tem uma história pra contar.', es: 'Cada conductor tiene una historia para contar.', en: 'Every driver has a story to tell.' } },
  ],
  '❓ Question words & phrases': [
    { id: 'q01', pt: 'Pra onde', es: 'A dónde', en: 'Where to', note: '🇧🇷 BR casual; formal = aonde',
      example: { pt: 'Pra onde fica o próximo posto?', es: '¿A dónde queda la próxima gasolinera?', en: "Where's the next gas station?" },
      answer:  { pt: 'Uns trinta quilômetros, sempre reto.', es: 'Unos treinta kilómetros, siempre recto.', en: 'About 30km, straight ahead.' } },
    { id: 'q02', pt: 'Posso te perguntar', es: 'Puedo preguntarte', en: 'Can I ask you', note: 'polite opener',
      example: { pt: 'Posso te perguntar uma coisa rápida?', es: '¿Puedo preguntarte algo rápido?', en: 'Can I ask you something quick?' },
      answer:  { pt: 'Fala, fala.', es: 'Dime, dime.', en: 'Go ahead.' } },
    { id: 'q03', pt: 'Quanto tempo de viagem', es: 'Cuánto tiempo de viaje', en: 'How long is the trip', note: '✅ similar',
      example: { pt: 'Quanto tempo de viagem até a próxima cidade?', es: '¿Cuánto tiempo de viaje hasta la próxima ciudad?', en: 'How long until the next city?' },
      answer:  { pt: 'Umas três horas, dependendo do trânsito.', es: 'Unas tres horas, depende del tráfico.', en: 'About 3 hours, depending on traffic.' } },
    { id: 'q04', pt: 'Você vai sozinho?', es: '¿Vas solo?', en: 'Are you going alone?', note: 'safety-check question',
      example: { pt: 'Vocês vão sozinhos ou tem mais alguém?', es: '¿Van solos o hay alguien más?', en: 'Are you going alone or with someone?' },
      answer:  { pt: 'Somos eu e meu colega.', es: 'Somos yo y mi compañero.', en: 'Just me and my colleague.' } },
    { id: 'q05', pt: 'Você daria uma carona?', es: '¿Me llevarías?', en: 'Would you give a ride?', note: 'conditional polite',
      example: { pt: 'Vocês dariam uma carona pra duas pessoas?', es: '¿Llevarían a dos personas?', en: 'Would you give a ride to two people?' },
      answer:  { pt: 'Sem problema, sobe aí.', es: 'Sin problema, súbete.', en: 'No problem, hop in.' } },
  ],
  '📍 Places & directions': [
    { id: 'pl01', pt: 'estrada', es: 'carretera', en: 'road', note: '⚠️ different', example: { pt: 'A estrada hoje tá vazia.', es: 'La carretera hoy está vacía.', en: 'The road is empty today.' } },
    { id: 'pl02', pt: 'rodovia', es: 'autopista', en: 'highway', note: '⚠️ different', example: { pt: 'A rodovia tá tranquila hoje.', es: 'La autopista está tranquila hoy.', en: 'The highway is quiet today.' } },
    { id: 'pl03', pt: 'posto', es: 'gasolinera', en: 'gas station / rest stop', note: '⚠️ different; BR posto = 24h social hub', example: { pt: 'Vou parar no próximo posto.', es: 'Voy a parar en la próxima gasolinera.', en: "I'll stop at the next station." } },
    { id: 'pl04', pt: 'pedágio', es: 'peaje', en: 'toll', note: '⚠️ different', example: { pt: 'O pedágio aqui é caro.', es: 'El peaje aquí es caro.', en: 'The toll here is expensive.' } },
    { id: 'pl05', pt: 'caminho', es: 'camino', en: 'way / path', note: '✅ similar', example: { pt: 'No meio do caminho a gente dorme.', es: 'En el medio del camino dormimos.', en: 'In the middle of the way we sleep.' } },
    { id: 'pl06', pt: 'pro sul / pro norte', es: 'al sur / al norte', en: 'south / north (direction)', note: 'pt "pro" = "para o"', example: { pt: 'Daqui pro norte são dois dias de viagem.', es: 'De aquí al norte son dos días de viaje.', en: 'From here north is a 2-day trip.' } },
    { id: 'pl07', pt: 'até ___', es: 'hasta ___', en: 'until / up to ___', note: '✅ similar', example: { pt: 'Te levo até Foz.', es: 'Te llevo hasta Foz.', en: "I'll take you to Foz." } },
  ],
  '🛡️ Safety check': [
    { id: 'sf01', pt: 'Onde você vai parar?', es: '¿Dónde vas a parar?', en: 'Where are you going to stop?', note: null, example: { pt: 'Onde você vai parar pra dormir?', es: '¿Dónde vas a parar para dormir?', en: 'Where will you stop to sleep?' } },
    { id: 'sf02', pt: 'Tem mais alguém no carro?', es: '¿Hay alguien más en el carro?', en: 'Is there anyone else in the car?', note: 'critical safety check', example: { pt: 'Tem mais alguém no carro?', es: '¿Hay alguien más en el carro?', en: 'Anyone else in the car?' } },
    { id: 'sf03', pt: 'Me deixa em ___', es: 'Déjame en ___', en: 'Drop me at ___', note: '⚠️ different verb', example: { pt: 'Me deixa no próximo posto.', es: 'Déjame en la próxima gasolinera.', en: 'Drop me at the next station.' } },
    { id: 'sf04', pt: 'Eu desço em ___', es: 'Yo bajo en ___', en: 'I get off at ___', note: null, example: { pt: 'Eu desço em Foz.', es: 'Yo bajo en Foz.', en: 'I get off in Foz.' } },
    { id: 'sf05', pt: 'Posso descer aqui?', es: '¿Puedo bajarme aquí?', en: 'Can I get off here?', note: 'asking permission to stop', example: { pt: 'Posso descer aqui, por favor?', es: '¿Puedo bajarme aquí, por favor?', en: 'Can I get off here, please?' } },
  ],
  '🙏 Gratitude': [
    { id: 'g01', pt: 'Muito obrigada mesmo', es: 'Muchísimas gracias', en: 'Thank you so much', note: '"mesmo" intensifies (sincerely)', example: { pt: 'Muito obrigada mesmo pela carona!', es: '¡Muchísimas gracias por el aventón!', en: 'Thanks so much for the ride!' } },
    { id: 'g02', pt: 'Valeu demais!', es: '¡Muchas gracias!', en: 'Thanks a lot!', note: '🇧🇷 BR casual; very common', example: { pt: 'Valeu demais pela ajuda no posto!', es: '¡Mil gracias por la ayuda en la gasolinera!', en: 'Thanks a lot for the help at the station!' } },
    { id: 'g03', pt: 'Imagina!', es: '¡Tranquila! / ¡Para nada!', en: 'Of course not! / No need!', note: '🇧🇷 deflects thanks/offers', example: { pt: 'Imagina, não precisa pagar.', es: 'Tranquila, no hace falta pagar.', en: "No need, don't pay." } },
    { id: 'g04', pt: 'Por nada', es: 'De nada', en: "You're welcome", note: '⚠️ different', example: { pt: 'Por nada, boa viagem!', es: '¡De nada, buen viaje!', en: 'No problem, safe travels!' } },
    { id: 'g05', pt: 'Posso te pagar ___?', es: '¿Puedo invitarte ___?', en: 'Can I pay for your ___?', note: 'reciprocity gesture', example: { pt: 'Posso te pagar um café no posto?', es: '¿Puedo invitarte un café en la gasolinera?', en: 'Can I buy you a coffee at the station?' } },
    { id: 'g06', pt: 'ajudar na gasolina', es: 'ayudar con la gasolina', en: 'help with gas', note: 'offering to contribute', example: { pt: 'Posso ajudar na gasolina?', es: '¿Puedo ayudar con la gasolina?', en: 'Can I help with gas?' } },
  ],
  '💬 Small talk': [
    { id: 'st01', pt: 'há quanto tempo', es: 'desde hace cuánto tiempo', en: 'for how long', note: '⚠️ different; BR uses "há" + duration', example: { pt: 'Há quanto tempo você faz isso?', es: '¿Desde hace cuánto haces esto?', en: 'How long have you been doing this?' } },
    { id: 'st02', pt: 'Trabalho assim há ___ anos', es: 'Trabajo así desde hace ___ años', en: "I've worked like this for ___ years", note: 'ongoing past', example: { pt: 'Ele dirige caminhão há trinta anos.', es: 'Él maneja camión desde hace treinta años.', en: "He's driven trucks for 30 years." } },
    { id: 'st03', pt: 'Conta sua história', es: 'Cuéntame tu historia', en: 'Tell me your story', note: 'common BR road conversation prompt', example: { pt: 'Os motoristas adoram quem conta histórias.', es: 'A los conductores les encanta quien cuenta historias.', en: 'Drivers love people who tell stories.' } },
    { id: 'st04', pt: 'pegar a estrada', es: 'agarrar el camino', en: 'hit the road', note: 'idiom', example: { pt: 'Vou pegar a estrada cedo amanhã.', es: 'Voy a agarrar el camino temprano mañana.', en: "I'll hit the road early tomorrow." } },
    { id: 'st05', pt: 'A gente conversa', es: 'Charlamos / Conversamos', en: "We'll chat", note: '🇧🇷 "a gente" = nós (informal)', example: { pt: 'A gente conversa sobre tudo na cabine.', es: 'Conversamos de todo en la cabina.', en: 'We chat about everything in the cabin.' } },
  ],
  '🇧🇷 BR colloquialisms': [
    { id: 'br01', pt: 'Caraca!', es: '¡Caramba! / ¡Wow!', en: 'Wow! / Damn!', note: '🇧🇷 reaction; safe in any company', example: { pt: 'Caraca, que paisagem linda!', es: '¡Caramba, qué paisaje lindo!', en: 'Wow, what a beautiful landscape!' } },
    { id: 'br02', pt: 'doidera', es: 'locura', en: 'craziness (positive)', note: '🇧🇷 BR slang; admiration', example: { pt: 'Sua viagem é uma doidera!', es: '¡Tu viaje es una locura!', en: 'Your trip is wild!' } },
    { id: 'br03', pt: 'Tranquilo / Tranquila', es: 'Tranquilo / Tranquila', en: 'Chill / All good', note: '✅ similar; gender agrees with addressee', example: { pt: 'Fica tranquila, eu cuido.', es: 'Tranquila, yo me ocupo.', en: 'Relax, I got it.' } },
    { id: 'br04', pt: 'Beleza!', es: '¡Listo! / ¡Bien!', en: 'Cool! / OK!', note: '🇧🇷 BR everyday agreement', example: { pt: 'Beleza, tô combinado então.', es: 'Listo, estamos de acuerdo entonces.', en: "Cool, we're agreed then." } },
    { id: 'br05', pt: 'né?', es: '¿no?', en: 'right? (tag)', note: '🇧🇷 ubiquitous tag question', example: { pt: 'Tá com frio, né?', es: 'Tienes frío, ¿no?', en: "You're cold, right?" } },
    { id: 'br06', pt: 'viu', es: 'sabes / oíste', en: 'you know / hear me', note: '🇧🇷 sentence-end softener', example: { pt: 'Não esquece o protetor solar, viu.', es: 'No te olvides del protector solar, sabes.', en: "Don't forget sunscreen, you know." } },
    { id: 'br07', pt: 'Bora!', es: '¡Vamos!', en: "Let's go!", note: '🇧🇷 contracted "vamos embora"', example: { pt: 'Bora almoçar antes de continuar?', es: '¿Vamos a almorzar antes de seguir?', en: "Let's eat lunch before continuing?" } },
  ],
  '⚠️ Saying no politely': [
    { id: 'no01', pt: 'Prefiro não', es: 'Prefiero no', en: "I'd rather not", note: '✅ similar; soft refusal', example: { pt: 'Prefiro não, obrigada.', es: 'Prefiero no, gracias.', en: "I'd rather not, thanks." } },
    { id: 'no02', pt: 'Acho que vou esperar outro', es: 'Creo que voy a esperar a otro', en: "I think I'll wait for another", note: 'face-saving refusal', example: { pt: 'Acho que vou esperar outro, obrigada.', es: 'Creo que voy a esperar a otro, gracias.', en: "I'll wait for another, thanks." } },
    { id: 'no03', pt: 'Melhor outra hora', es: 'Mejor en otro momento', en: 'Better some other time', note: '✅ similar', example: { pt: 'Melhor outra hora, valeu.', es: 'Mejor en otro momento, gracias.', en: 'Some other time, thanks.' } },
    { id: 'no04', pt: 'Brigada, mas não dá', es: 'Gracias, pero no puedo', en: "Thanks, but I can't", note: '🇧🇷 "brigada" = obrigada shortened', example: { pt: 'Brigada, mas não dá hoje.', es: 'Gracias, pero hoy no puedo.', en: "Thanks, but I can't today." } },
  ],
};

const CARONA_GRAMMAR = [
  {
    title: '1. "Pra onde" vs "Aonde" vs "Onde"',
    table: {
      headers: ['Use', 'pt', 'es'],
      rows: [
        ['Direction (BR casual)', 'Pra onde você vai?', '¿A dónde vas?'],
        ['Direction (formal)', 'Aonde você vai?', '¿Adónde vas?'],
        ['Location (no movement)', 'Onde você mora?', '¿Dónde vives?'],
      ],
    },
    body: '**Pra onde** = where to (BR everyday, with motion)\n**Aonde** = where to (more formal, same meaning)\n**Onde** = where (location, no movement)',
    callout: '🇧🇷 In BR you\'ll hear "pra onde" 90% of the time. ES distinguishes ¿adónde? (motion) vs ¿dónde? (location) similarly.',
  },
  {
    title: '2. Friendly imperative vs polite ask',
    table: {
      headers: ['Form', 'pt', 'es', 'feel'],
      rows: [
        ['Direct imperative', 'Me leva até Foz.', 'Llévame hasta Foz.', 'casual/friendly'],
        ['Polite request', 'Você pode me levar até Foz?', '¿Me puedes llevar hasta Foz?', 'neutral'],
        ['Conditional (most polite)', 'Você daria uma carona pra mim?', '¿Me llevarías?', 'formal/strangers'],
        ['Asking permission', 'Posso descer aqui?', '¿Puedo bajarme aquí?', 'inside the car'],
      ],
    },
    body: 'For first contact with a stranger, use **conditional "daria"**. Once accepted and inside, **"Posso descer aqui?"** for asking to stop.',
    callout: '⚠️ Direct imperative "Me leva" sounds normal to friends but bossy to a stranger you just met.',
  },
  {
    title: '3. "há + duration" for ongoing past',
    table: {
      headers: ['Meaning', 'pt', 'es'],
      rows: [
        ['Ongoing (still happening)', 'Trabalho assim há vinte anos.', 'Trabajo así desde hace veinte años.'],
        ['Point in past', 'Comecei há vinte anos.', 'Empecé hace veinte años.'],
      ],
    },
    body: '**há + tempo** in present-tense verb = "for X amount of time, still ongoing"\nSame "há" with past-tense verb = "X time ago"',
    callout: '⚠️ Same word "há" does double duty. ES uses **desde hace** (ongoing) vs **hace** (ago).',
  },
  {
    title: '4. "Tô + gerundio" — colloquial present continuous',
    body: 'Standard: **Estou indo / Estou viajando**\nBR colloquial: **Tô indo / Tô viajando**\n\n"Tô" is the spoken contraction of "estou". Heard constantly in BR but never written in formal contexts.\n\nGerundio endings: -ar → -ando, -er → -endo, -ir → -indo',
    callout: '🇧🇷 In BR conversation, ALWAYS expect "tô" instead of "estou". Use it yourself to sound natural.',
  },
  {
    title: '5. "A gente" = informal "we"',
    table: {
      headers: ['Standard', 'BR colloquial'],
      rows: [
        ['Nós conversamos', 'A gente conversa'],
        ['Nós dormimos no posto', 'A gente dorme no posto'],
        ['Nós vamos', 'A gente vai'],
      ],
    },
    body: '**A gente** literally = "the people" but means "we/us" in BR.\nKey: verb is **3rd person singular** ("a gente vai", NOT "vamos").',
    callout: '🇧🇷 BR uses "a gente" more than "nós" in speech. Mexican/Argentine Spanish has no equivalent — just "nosotros".',
  },
];

const CARONA_CULTURE = [
  {
    title: '1. Posto = social hub, not just gas',
    points: [
      'BR postos are 24h with restaurants, showers, parking for sleeping',
      'Truck drivers eat, sleep, talk to each other here',
      'BEST place to ask for rides — you can see the person, watch them eat, talk before committing',
      'Better than thumb-out roadside (no vetting, more random)',
    ],
  },
  {
    title: '2. Caminhoneiro culture',
    points: [
      'Long-haul truckers are a respected profession in BR',
      'Many work alone for weeks, eager to chat and break monotony',
      'Pride in "estrada é minha casa" (the road is my home)',
      'Generally trustworthy but selectivity still matters; trust your gut',
    ],
  },
  {
    title: '3. Single female hitchhiker reality in BR',
    points: [
      'More common than people assume but require active vetting',
      'Daytime postos > nighttime roadsides',
      'Ask "Tem mais alguém no carro?" before committing',
      "Refuse politely if anything feels off — Brazilians won't insist",
      'Hostel/hitchhiker networks (Caroneiros do Brasil on FB) connect rides in advance',
    ],
  },
  {
    title: '4. Reciprocity: how to thank',
    points: [
      'Offer to pay for meal or contribute gas — most refuse but appreciate the offer',
      '"Conta sua história" — your story IS the payment for many drivers',
      'IG follow as digital thank-you is common with younger drivers',
      'Small gift (snack, fruit) if you have something nice',
    ],
  },
  {
    title: '5. Saying no without offense',
    points: [
      '**Prefiro não** > **Não** (softer)',
      '**Acho que vou esperar outro** = "I think I\'ll wait for another" (deflects to circumstance)',
      'Smile + walk away = clear signal, no offense taken',
      'Brazilians read social cues quickly; you won\'t be pressured if you stand firm gently',
    ],
  },
];

const CARONA_PRACTICE = [
  {
    num: 1,
    question: "Approach a driver at a posto politely: 'Hi, excuse me. Can I ask you something? Where are you headed?'",
    answer: {
      pt: 'Oi, com licença. Posso te perguntar uma coisa? Pra onde você está indo?',
      es: 'Hola, con permiso. ¿Puedo preguntarte algo? ¿A dónde vas?',
      en: 'Hi, excuse me. Can I ask you something? Where are you headed?',
      note: '🇧🇷 "com licença" + "pra onde" feels native; avoid the more formal "aonde".',
    },
  },
  {
    num: 2,
    question: "Safety-check before accepting a ride: 'Are you going alone? Where will you stop to sleep?'",
    answer: {
      pt: 'Você vai sozinho? Onde você vai parar pra dormir?',
      es: '¿Vas solo? ¿Dónde vas a parar para dormir?',
      en: 'Are you going alone? Where will you stop to sleep?',
      note: 'These are the two most important pre-commit questions.',
    },
  },
  {
    num: 3,
    question: "Express deep gratitude after a long ride: 'Thanks so much for the ride! Can I pay for your dinner?'",
    answer: {
      pt: 'Muito obrigada mesmo pela carona! Posso te pagar o jantar?',
      es: '¡Muchísimas gracias por el aventón! ¿Puedo invitarte la cena?',
      en: 'Thanks so much for the ride! Can I pay for your dinner?',
      note: '🇧🇷 Driver will likely say "Imagina!" — but you should always offer.',
    },
  },
  {
    num: 4,
    question: "Politely decline a ride that doesn't feel right.",
    answer: {
      pt: 'Brigada, mas acho que vou esperar outro. Boa viagem!',
      es: 'Gracias, pero creo que voy a esperar a otro. ¡Buen viaje!',
      en: "Thanks, but I think I'll wait for another. Have a good trip!",
      note: 'Smile + walk away after this. Brazilians won\'t pressure you.',
    },
  },
  {
    num: 5,
    question: "Driver asks 'me conta a sua história'. Give a 1-sentence travel summary including where you started, what you're doing, where you're going next.",
    answer: {
      pt: 'Saí de Taiwan em maio do ano passado pra dar a volta ao mundo sem pegar avião — já passei pela Ásia, América do Norte e Central, e agora tô indo pro sul da América do Sul.',
      es: 'Salí de Taiwán en mayo del año pasado para dar la vuelta al mundo sin tomar avión — ya pasé por Asia, América del Norte y Central, y ahora voy al sur de Sudamérica.',
      en: 'I left Taiwan in May last year to go around the world without flying — already through Asia, North and Central America, now heading south in South America.',
      note: 'Pretérito perfeito for the journey (Saí, passei) + tô + gerundio for current.',
    },
  },
];

const LESSON_VOCAB_DATA = { feira: FEIRA_VOCAB, intro: INTRO_VOCAB, carona: CARONA_VOCAB };
function getAllSavedItems() {
  const saved = getSavedVocab();
  const out = [];
  for (const key of saved) {
    const [lessonId, vid] = key.split(':');
    const vocab = LESSON_VOCAB_DATA[lessonId];
    if (!vocab) continue;
    for (const [section, list] of Object.entries(vocab)) {
      const item = list.find(i => i.id === vid);
      if (item) { out.push({ ...item, _lessonId: lessonId, _section: section }); break; }
    }
  }
  return out;
}

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
      desc: l.status ? `${l.desc} · ${l.status}` : l.desc,
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

const SPEAKER_MAP = {
  phoenix: { icon: '🧍', name: 'You' },
  feirante: { icon: '👨', name: 'Vendor' },
  maria: { icon: '👩', name: 'Maria' },
  driver: { icon: '🚛', name: 'Driver' },
};

function renderDialogLine(line, lessonId, total) {
  const card = el('div', { class: 'dialog-card', 'data-speaker': line.speaker });
  const sp = SPEAKER_MAP[line.speaker] || SPEAKER_MAP.phoenix;
  card.appendChild(el('div', { class: 'speaker' }, [
    el('span', { class: 'speaker-icon' }, sp.icon),
    el('span', { class: 'speaker-name' }, sp.name),
    el('span', { class: 'line-num' }, `${line.line}/${total}`),
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
  for (const line of dialog) container.appendChild(renderDialogLine(line, lessonId, dialog.length));
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

function renderVocabCard(item, lessonId, opts = {}) {
  const card = el('div', { class: 'vocab-card' });

  // Star button (inserted later in note row to align with that visual line)
  let starBtn = null;
  if (item.id && lessonId) {
    const initSaved = isSavedVocab(lessonId, item.id);
    starBtn = el('button', {
      class: 'vocab-star' + (initSaved ? ' active' : ''),
      'aria-label': initSaved ? 'Remove from vocabulary' : 'Save to vocabulary',
      onClick: (e) => {
        e.stopPropagation();
        const nowSaved = toggleSavedVocab(lessonId, item.id);
        starBtn.textContent = nowSaved ? '★' : '☆';
        starBtn.classList.toggle('active', nowSaved);
        if (opts.onUnsave && !nowSaved) opts.onUnsave(card);
      },
    }, initSaved ? '★' : '☆');
  }

  // Audio dir (default feira/vocab for lessonId=feira)
  const audioBase = `./audio/${lessonId || 'feira'}/vocab`;

  for (const lang of ['pt', 'es', 'en']) {
    const text = item[lang];
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, text || '—'));
    if (lang !== 'en' && text && text !== '—' && item.id) {
      const src = `${audioBase}/${item.id}-${lang}.mp3`;
      row.appendChild(el('button', {
        class: 'play-btn play-btn-sm',
        onClick: () => playAudio(src),
      }, '▶'));
    }
    card.appendChild(row);
  }
  // Note row + star together (always rendered if star exists, so star has a row to live in)
  if (item.note || starBtn) {
    const noteRow = el('div', { class: 'vocab-note-row' });
    noteRow.appendChild(el('div', { class: 'vocab-note-text' }, item.note || ''));
    if (starBtn) noteRow.appendChild(starBtn);
    card.appendChild(noteRow);
  }
  if (item.example) {
    const exBlock = el('div', { class: 'vocab-example' });
    const exLabel = item.answer ? 'Question' : 'Example';
    exBlock.appendChild(el('div', { class: 'example-label' }, exLabel));
    for (const lang of ['pt', 'es', 'en']) {
      const text = item.example[lang];
      if (!text) continue;
      const row = el('div', { class: `lang-row lang-${lang}` });
      row.appendChild(el('span', { class: 'lang-label' }, lang));
      row.appendChild(el('span', { class: 'lang-text' }, text));
      if (lang !== 'en' && item.id) {
        const src = `${audioBase}/${item.id}-ex-${lang}.mp3`;
        row.appendChild(el('button', {
          class: 'play-btn play-btn-sm',
          onClick: () => playAudio(src),
        }, '▶'));
      }
      exBlock.appendChild(row);
    }
    card.appendChild(exBlock);
  }
  if (item.answer) {
    const ansBlock = el('div', { class: 'vocab-example vocab-answer' });
    ansBlock.appendChild(el('div', { class: 'example-label' }, 'Reply'));
    for (const lang of ['pt', 'es', 'en']) {
      const text = item.answer[lang];
      if (!text) continue;
      const row = el('div', { class: `lang-row lang-${lang}` });
      row.appendChild(el('span', { class: 'lang-label' }, lang));
      row.appendChild(el('span', { class: 'lang-text' }, text));
      if (lang !== 'en' && item.id) {
        const src = `${audioBase}/${item.id}-ans-${lang}.mp3`;
        row.appendChild(el('button', {
          class: 'play-btn play-btn-sm',
          onClick: () => playAudio(src),
        }, '▶'));
      }
      ansBlock.appendChild(row);
    }
    card.appendChild(ansBlock);
  }
  if (opts.showFrom && item._lessonId) {
    const lessonTitle = LESSONS.find(l => l.id === item._lessonId)?.title || item._lessonId;
    card.appendChild(el('div', { class: 'vocab-from' }, `from: ${lessonTitle} · ${item._section}`));
  }
  return card;
}

function renderLessonVocab(vocab, lessonId) {
  const container = el('div', { class: 'tab-content vocab-list' });
  const sectionEntries = Object.entries(vocab);

  const nav = el('nav', { class: 'vocab-nav' });
  sectionEntries.forEach(([title], idx) => {
    nav.appendChild(el('button', {
      class: 'vocab-nav-chip',
      'data-idx': String(idx),
      onClick: () => {
        const target = container.querySelector(`.vocab-section[data-idx="${idx}"]`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    }, title));
  });
  // nav is returned to caller for placement inside sticky-stack (not appended here)

  sectionEntries.forEach(([sectionTitle, items], idx) => {
    const section = el('div', { class: 'vocab-section', 'data-idx': String(idx) });
    section.appendChild(el('h3', { class: 'vocab-section-title' }, sectionTitle));
    for (const item of items) section.appendChild(renderVocabCard(item, lessonId));
    container.appendChild(section);
  });

  const applyScrollMargin = () => {
    const stack = document.querySelector('.sticky-stack');
    if (!stack) return;
    const offset = stack.offsetHeight;
    container.querySelectorAll('.vocab-section').forEach(s => {
      s.style.scrollMarginTop = `${offset}px`;
    });
  };
  requestAnimationFrame(() => {
    applyScrollMargin();
    window.addEventListener('resize', applyScrollMargin, { passive: true });
  });

  requestAnimationFrame(() => {
    const sections = container.querySelectorAll('.vocab-section');
    const chips = nav.querySelectorAll('.vocab-nav-chip');
    if (!sections.length || !chips.length) return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const idx = e.target.dataset.idx;
          chips.forEach(c => c.classList.toggle('active', c.dataset.idx === idx));
        }
      }
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  });

  return { container, nav };
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
  let chipNav = null;
  const vocabData = lessonId === 'feira' ? FEIRA_VOCAB : (lessonId === 'intro' ? INTRO_VOCAB : null);
  if (lessonId === 'feira') {
    if (activeTab === 'dialog') tabContent = renderLessonDialog('feira', FEIRA_DIALOG);
    else if (activeTab === 'vocab') {
      const r = renderLessonVocab(FEIRA_VOCAB, 'feira');
      tabContent = r.container; chipNav = r.nav;
    }
    else if (activeTab === 'grammar') tabContent = renderLessonGrammar(FEIRA_GRAMMAR);
    else if (activeTab === 'culture') tabContent = renderLessonCulture(FEIRA_CULTURE);
    else if (activeTab === 'practice') tabContent = renderLessonPractice(FEIRA_PRACTICE);
  } else if (lessonId === 'intro') {
    if (activeTab === 'dialog') tabContent = renderLessonDialog('intro', INTRO_DIALOG);
    else if (activeTab === 'vocab') {
      const r = renderLessonVocab(INTRO_VOCAB, 'intro');
      tabContent = r.container; chipNav = r.nav;
    }
    else if (activeTab === 'grammar') tabContent = renderLessonGrammar(INTRO_GRAMMAR);
    else if (activeTab === 'culture') tabContent = renderLessonCulture(INTRO_CULTURE);
    else if (activeTab === 'practice') tabContent = renderLessonPractice(INTRO_PRACTICE);
  } else if (lessonId === 'carona') {
    if (activeTab === 'dialog') tabContent = renderLessonDialog('carona', CARONA_DIALOG);
    else if (activeTab === 'vocab') {
      const r = renderLessonVocab(CARONA_VOCAB, 'carona');
      tabContent = r.container; chipNav = r.nav;
    }
    else if (activeTab === 'grammar') tabContent = renderLessonGrammar(CARONA_GRAMMAR);
    else if (activeTab === 'culture') tabContent = renderLessonCulture(CARONA_CULTURE);
    else if (activeTab === 'practice') tabContent = renderLessonPractice(CARONA_PRACTICE);
  }
  if (!tabContent) {
    tabContent = el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, `${TABS.find(t => t.id === activeTab).label} — coming next round`),
        el('p', {}, 'Markdown content will be drafted & verified, then rendered here.'),
      ]),
    ]);
  }
  const stickyStack = el('div', { class: 'sticky-stack' }, [
    topbar({ title: `${lesson.icon} ${lesson.title}`, back: true }),
    tabsRow,
  ]);
  if (chipNav) stickyStack.appendChild(chipNav);
  return [stickyStack, tabContent, footer()];
}

function renderPictureWords() {
  const list = el('div', { class: 'section-list' });
  const counts = {
    fruits: FRUITS.length,
    vegetables: VEGETABLES.length,
    meats: MEATS.length,
    seafood: SEAFOOD.length,
    kitchen: KITCHEN.length,
    family: FAMILY.length,
    zodiac: ZODIAC.length,
  };
  for (const c of PIC_CATEGORIES) {
    const count = counts[c.id];
    list.appendChild(sectionCard({
      icon: c.icon,
      title: c.name,
      desc: count ? `${count} items` : 'Coming soon',
      route: `#/picture-words/${c.id}`,
    }));
  }
  return [topbar({ title: 'Picture Words', back: true }), list, footer()];
}

function showImageItemModal(item, dir) {
  const overlay = el('div', {
    class: 'modal-overlay',
    onClick: (e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); },
  });
  const modal = el('div', { class: 'modal-content' });
  modal.appendChild(el('button', { class: 'modal-close', onClick: closeModal }, '✕'));
  modal.appendChild(el('img', { src: `./images/${dir}/${item.id}.jpg`, alt: item.en, class: 'modal-img' }));
  const langBlock = el('div', { class: 'modal-lang-block' });
  for (const lang of ['pt', 'es', 'en']) {
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, item[lang]));
    if (lang !== 'en') {
      const src = `./audio/${dir}/${item.id}-${lang}.mp3`;
      row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
    }
    langBlock.appendChild(row);
  }
  modal.appendChild(langBlock);
  if (item.note) modal.appendChild(el('div', { class: 'modal-note' }, item.note));
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function renderImageItemGrid(items, dir) {
  const container = el('div', { class: 'fruits-grid-container' });
  const grid = el('div', { class: 'fruits-grid' });
  for (const item of items) {
    const card = el('div', { class: 'fruit-card', onClick: () => showImageItemModal(item, dir) });
    card.appendChild(el('img', { src: `./images/${dir}/${item.id}.jpg`, alt: item.en, loading: 'lazy' }));
    const name = el('div', { class: 'fruit-name' }, [
      el('div', { class: 'fruit-pt' }, item.pt),
      el('div', { class: 'fruit-es' }, item.es),
    ]);
    card.appendChild(name);
    grid.appendChild(card);
  }
  container.appendChild(grid);
  return container;
}

function renderFruitsGrid() { return renderImageItemGrid(FRUITS, 'fruits'); }
function renderVegetablesGrid() { return renderImageItemGrid(VEGETABLES, 'vegetables'); }
function renderKitchenGrid() { return renderImageItemGrid(KITCHEN, 'kitchen'); }

function renderEmojiItemGrid(items, dir) {
  const container = el('div', { class: 'fruits-grid-container' });
  const grid = el('div', { class: 'zodiac-grid' });
  for (const it of items) {
    const card = el('div', { class: 'zodiac-card', onClick: () => showEmojiItemModal(it, dir) });
    card.appendChild(el('div', { class: 'zodiac-symbol' }, it.emoji));
    const name = el('div', { class: 'zodiac-name' }, [
      el('div', { class: 'fruit-pt' }, it.pt),
      el('div', { class: 'fruit-es' }, it.es),
    ]);
    card.appendChild(name);
    grid.appendChild(card);
  }
  container.appendChild(grid);
  return container;
}

function showEmojiItemModal(it, dir) {
  const overlay = el('div', {
    class: 'modal-overlay',
    onClick: (e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); },
  });
  const modal = el('div', { class: 'modal-content zodiac-modal' });
  modal.appendChild(el('button', { class: 'modal-close', onClick: closeModal }, '✕'));
  modal.appendChild(el('div', { class: 'modal-zodiac-symbol' }, it.emoji));
  const langBlock = el('div', { class: 'modal-lang-block' });
  for (const lang of ['pt', 'es', 'en']) {
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, it[lang]));
    if (lang !== 'en') {
      const src = `./audio/${dir}/${it.id}-${lang}.mp3`;
      row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
    }
    langBlock.appendChild(row);
  }
  modal.appendChild(langBlock);
  if (it.note) modal.appendChild(el('div', { class: 'modal-note' }, it.note));
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function renderMeatsGrid() { return renderEmojiItemGrid(MEATS, 'meats'); }
function renderSeafoodGrid() { return renderEmojiItemGrid(SEAFOOD, 'seafood'); }
function renderFamilyGrid() { return renderEmojiItemGrid(FAMILY, 'family'); }

function renderZodiacGrid() {
  const container = el('div', { class: 'fruits-grid-container' });
  const grid = el('div', { class: 'zodiac-grid' });
  for (const z of ZODIAC) {
    const card = el('div', { class: 'zodiac-card', onClick: () => showZodiacModal(z) });
    card.appendChild(el('div', { class: 'zodiac-symbol' }, z.symbol));
    card.appendChild(el('div', { class: 'zodiac-dates' }, z.dates));
    const name = el('div', { class: 'zodiac-name' }, [
      el('div', { class: 'fruit-pt' }, z.pt),
      el('div', { class: 'fruit-es' }, z.es),
    ]);
    card.appendChild(name);
    grid.appendChild(card);
  }
  container.appendChild(grid);
  return container;
}

function showZodiacModal(z) {
  const overlay = el('div', {
    class: 'modal-overlay',
    onClick: (e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); },
  });
  const modal = el('div', { class: 'modal-content zodiac-modal' });
  modal.appendChild(el('button', { class: 'modal-close', onClick: closeModal }, '✕'));
  modal.appendChild(el('div', { class: 'modal-zodiac-symbol' }, z.symbol));
  modal.appendChild(el('div', { class: 'modal-zodiac-dates' }, z.dates));
  const langBlock = el('div', { class: 'modal-lang-block' });
  for (const lang of ['pt', 'es', 'en']) {
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, z[lang]));
    if (lang !== 'en') {
      const src = `./audio/zodiac/${z.id}-${lang}.mp3`;
      row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
    }
    langBlock.appendChild(row);
  }
  modal.appendChild(langBlock);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.remove();
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
  let content;
  if (catId === 'fruits') content = renderFruitsGrid();
  else if (catId === 'vegetables') content = renderVegetablesGrid();
  else if (catId === 'meats') content = renderMeatsGrid();
  else if (catId === 'seafood') content = renderSeafoodGrid();
  else if (catId === 'kitchen') content = renderKitchenGrid();
  else if (catId === 'family') content = renderFamilyGrid();
  else if (catId === 'zodiac') content = renderZodiacGrid();
  else {
    content = el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, `${cat.name} grid`),
        el('p', {}, 'Coming soon.'),
      ]),
    ]);
  }
  return [topbar({ title: `${cat.icon} ${cat.name}`, back: true }), content, footer()];
}

function renderFoundations() {
  const container = el('div', { class: 'tab-content numbers-list' });
  const audioDir = { n: 'numbers', o: 'numbers', d: 'days', m: 'months' };
  const allSections = [
    ...Object.entries(NUMBERS_DATA),
    ['Days of week', DAYS_DATA],
    ['Months', MONTHS_DATA],
  ];

  // Quick-jump chip nav (placed in sticky-stack below)
  const nav = el('nav', { class: 'vocab-nav' });
  allSections.forEach(([title], idx) => {
    nav.appendChild(el('button', {
      class: 'vocab-nav-chip',
      'data-idx': String(idx),
      onClick: () => {
        const target = container.querySelector(`.numbers-section[data-idx="${idx}"]`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    }, title));
  });

  allSections.forEach(([sectionTitle, items], idx) => {
    const section = el('div', { class: 'numbers-section', 'data-idx': String(idx) });
    section.appendChild(el('h3', { class: 'numbers-section-title' }, sectionTitle));
    for (const item of items) {
      const card = el('div', { class: 'number-card' });
      card.appendChild(el('div', { class: 'number-display' }, item.display));
      const langs = el('div', { class: 'number-langs' });
      for (const lang of ['pt', 'es', 'en']) {
        const row = el('div', { class: `lang-row lang-${lang}` });
        row.appendChild(el('span', { class: 'lang-label' }, lang));
        row.appendChild(el('span', { class: 'lang-text' }, item[lang]));
        if (lang !== 'en') {
          const dir = audioDir[item.id[0]] || 'numbers';
          const src = `./audio/${dir}/${item.id}-${lang}.mp3`;
          row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
        }
        langs.appendChild(row);
      }
      card.appendChild(langs);
      if (item.note) card.appendChild(el('div', { class: 'number-note' }, item.note));
      section.appendChild(card);
    }
    container.appendChild(section);
  });

  const applyScrollMargin = () => {
    const stack = document.querySelector('.sticky-stack');
    if (!stack) return;
    const offset = stack.offsetHeight;
    container.querySelectorAll('.numbers-section').forEach(s => {
      s.style.scrollMarginTop = `${offset}px`;
    });
  };
  requestAnimationFrame(() => {
    applyScrollMargin();
    window.addEventListener('resize', applyScrollMargin, { passive: true });
  });

  requestAnimationFrame(() => {
    const sections = container.querySelectorAll('.numbers-section');
    const chips = nav.querySelectorAll('.vocab-nav-chip');
    if (!sections.length || !chips.length) return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const idx = e.target.dataset.idx;
          chips.forEach(c => c.classList.toggle('active', c.dataset.idx === idx));
        }
      }
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  });

  const stickyStack = el('div', { class: 'sticky-stack' }, [
    topbar({ title: '📚 Foundations', back: true }),
    nav,
  ]);
  return [stickyStack, container, footer()];
}

function renderVocabulary() {
  const items = getAllSavedItems();

  if (!items.length) {
    return [
      topbar({ title: 'Vocabulary', back: true }),
      el('div', { class: 'tab-content' }, [
        el('div', { class: 'empty' }, [
          el('div', { class: 'icon' }, '📕'),
          el('strong', {}, 'Your saved items will appear here'),
          el('p', { html: 'Tap ☆ on a word or phrase inside a lesson to add it.' }),
        ]),
      ]),
      footer(),
    ];
  }

  const container = el('div', { class: 'tab-content vocab-list' });
  const header = el('div', { class: 'vocab-count' }, `${items.length} saved`);
  container.appendChild(header);

  for (const item of items) {
    const card = renderVocabCard(item, item._lessonId, {
      showFrom: true,
      onUnsave: (cardEl) => {
        cardEl.style.opacity = '0';
        cardEl.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          cardEl.remove();
          if (!container.querySelector('.vocab-card')) {
            route();
          } else {
            header.textContent = `${container.querySelectorAll('.vocab-card').length} saved`;
          }
        }, 280);
      },
    });
    container.appendChild(card);
  }

  return [topbar({ title: 'Vocabulary', back: true }), container, footer()];
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
  else if (pathOnly === '/foundations' || pathOnly === '/numbers') views = renderFoundations();
  else if (pathOnly === '/vocabulary') views = renderVocabulary();
  else views = renderHome();
  for (const v of [].concat(views)) if (v) app.appendChild(v);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
