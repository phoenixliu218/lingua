if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then(reg => {
        // Force update check when tab becomes visible again
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') reg.update();
        });
      })
      .catch(e => console.error('SW', e));
  });
}

const SECTIONS = [
  { icon: '🧑‍🏫', title: 'Lessons', desc: 'Themed scenarios · 1 ready', route: '#/lessons' },
  { icon: '🖼️', title: 'Picture Words', desc: 'Visual vocabulary by category', route: '#/picture-words' },
  { icon: '📚', title: 'Foundations', desc: 'Numbers, days, months', route: '#/foundations' },
  { icon: '📕', title: 'Vocabulary', desc: 'Your saved words & phrases', route: '#/vocabulary' },
];

const LESSONS = [
  { id: 'feira', icon: '🛒', title: 'Feira', desc: 'Open-air market' },
  { id: 'intro', icon: '👋', title: 'Self intro', desc: 'Introducing yourself', status: 'Coming soon' },
  { id: 'cafe', icon: '☕', title: 'Café', desc: 'Coffee shop', status: 'Coming soon' },
  { id: 'carona', icon: '🚗', title: 'Hitchhiking', desc: 'Catching a ride (carona)', status: 'Coming soon' },
  { id: 'friend', icon: '🏡', title: "Friend's home", desc: 'Visiting a local friend', status: 'Coming soon' },
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
    { id: 'v04', pt: 'custar', es: 'costar', en: 'to cost', note: 'only 3rd person in this context', example: { pt: 'Quanto custa o quilo?', es: '¿Cuánto cuesta el kilo?', en: 'How much per kilo?' } },
    { id: 'v05', pt: 'pesar', es: 'pesar', en: 'to weigh', note: 'regular', example: { pt: 'Pode pesar dois quilos?', es: '¿Puede pesar dos kilos?', en: 'Can you weigh two kilos?' } },
    { id: 'v06', pt: 'levar', es: 'llevar', en: 'to take / carry off', note: 'regular', example: { pt: 'Vou levar dois.', es: 'Voy a llevar dos.', en: "I'll take two." } },
    { id: 'v07', pt: 'aceitar', es: 'aceptar', en: 'to accept', note: 'regular', example: { pt: 'Aceita cartão?', es: '¿Acepta tarjeta?', en: 'Do you take card?' } },
    { id: 'v08', pt: 'pagar', es: 'pagar', en: 'to pay', note: 'regular', example: { pt: 'Posso pagar com cartão?', es: '¿Puedo pagar con tarjeta?', en: 'Can I pay by card?' } },
    { id: 'v09', pt: 'trocar', es: 'cambiar', en: 'to change / exchange', note: '⚠️ different words pt/es', example: { pt: 'Pode trocar nota de cem?', es: '¿Puede cambiar billete de cien?', en: 'Can you change a 100 bill?' } },
    { id: 'v10', pt: 'experimentar', es: 'probar', en: 'to try / taste', note: '⚠️ different verb root', example: { pt: 'Posso experimentar?', es: '¿Puedo probar?', en: 'Can I taste?' } },
  ],
  '❓ Question words': [
    { id: 'q01', pt: 'Quanto / Quanta', es: 'Cuánto / Cuánta', en: 'how much', note: 'agrees in gender with noun', example: { pt: 'Quanto custa?', es: '¿Cuánto cuesta?', en: 'How much does it cost?' } },
    { id: 'q02', pt: 'Quantos / Quantas', es: 'Cuántos / Cuántas', en: 'how many', note: 'plural + gender', example: { pt: 'Quantos quilos?', es: '¿Cuántos kilos?', en: 'How many kilos?' } },
    { id: 'q03', pt: 'O que', es: 'Qué', en: 'what', note: 'o que = informal "what"', example: { pt: 'O que você tem?', es: '¿Qué tienes?', en: 'What do you have?' } },
    { id: 'q04', pt: 'Onde', es: 'Dónde', en: 'where', note: null, example: { pt: 'Onde fica o tomate?', es: '¿Dónde está el tomate?', en: 'Where is the tomato?' } },
    { id: 'q05', pt: 'Qual', es: 'Cuál', en: 'which', note: null, example: { pt: 'Qual é mais doce?', es: '¿Cuál es más dulce?', en: 'Which is sweeter?' } },
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
    { id: 'a03', pt: 'doce', es: 'dulce', en: 'sweet', note: null, example: { pt: 'Tá doce.', es: 'Está dulce.', en: "It's sweet." } },
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
];

const MEATS = [
  { id: 'carne', emoji: '🥩', pt: 'carne', es: 'carne (de res)', en: 'beef', note: 'pt "carne" defaults to beef; es needs "de res"' },
  { id: 'porco', emoji: '🐖', pt: 'carne de porco', es: 'carne de cerdo', en: 'pork', note: 'similar structure' },
  { id: 'frango', emoji: '🐔', pt: 'frango', es: 'pollo', en: 'chicken', note: '⚠️ completely different' },
  { id: 'cordeiro', emoji: '🐑', pt: 'cordeiro', es: 'cordero', en: 'lamb', note: '✅ similar' },
  { id: 'linguica', emoji: '🌭', pt: 'linguiça', es: 'salchicha', en: 'sausage', note: '⚠️ different; "chorizo" in es for cured/spiced variety' },
  { id: 'bacon', emoji: '🥓', pt: 'bacon', es: 'panceta', en: 'bacon', note: '⚠️ pt borrows English; "tocino" also used in es' },
  { id: 'presunto', emoji: '🍖', pt: 'presunto', es: 'jamón', en: 'ham', note: '⚠️ completely different' },
  { id: 'moida', emoji: '🍔', pt: 'carne moída', es: 'carne molida', en: 'ground meat', note: '✅ similar' },
  { id: 'bife', emoji: '🥩', pt: 'bife', es: 'bistec', en: 'steak', note: '⚠️ different; "filete" also used in es' },
  { id: 'peito', emoji: '🍗', pt: 'peito de frango', es: 'pechuga', en: 'chicken breast', note: '⚠️ different roots' },
  { id: 'coxa', emoji: '🍗', pt: 'coxa', es: 'muslo', en: 'thigh', note: '⚠️ different' },
  { id: 'asa', emoji: '🍗', pt: 'asa', es: 'ala', en: 'wing', note: '⚠️ different roots but related' },
  { id: 'pato', emoji: '🦆', pt: 'pato', es: 'pato', en: 'duck', note: '✅ identical' },
];

const SEAFOOD = [
  { id: 'peixe', emoji: '🐟', pt: 'peixe', es: 'pescado', en: 'fish (food)', note: '⚠️ "pez" in es = live fish; "pescado" = cooked/served' },
  { id: 'camarao', emoji: '🦐', pt: 'camarão', es: 'camarón', en: 'shrimp', note: '✅ very close; "gamba" in Spain' },
  { id: 'caranguejo', emoji: '🦀', pt: 'caranguejo', es: 'cangrejo', en: 'crab', note: '✅ similar' },
  { id: 'polvo', emoji: '🐙', pt: 'polvo', es: 'pulpo', en: 'octopus', note: '✅ similar' },
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
const LESSON_VOCAB_DATA = { feira: FEIRA_VOCAB };
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
    exBlock.appendChild(el('div', { class: 'example-label' }, 'Example'));
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
  if (opts.showFrom && item._lessonId) {
    const lessonTitle = LESSONS.find(l => l.id === item._lessonId)?.title || item._lessonId;
    card.appendChild(el('div', { class: 'vocab-from' }, `from: ${lessonTitle} · ${item._section}`));
  }
  return card;
}

function renderLessonVocab(vocab) {
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
  container.appendChild(nav);

  sectionEntries.forEach(([sectionTitle, items], idx) => {
    const section = el('div', { class: 'vocab-section', 'data-idx': String(idx) });
    section.appendChild(el('h3', { class: 'vocab-section-title' }, sectionTitle));
    for (const item of items) section.appendChild(renderVocabCard(item, 'feira'));
    container.appendChild(section);
  });

  requestAnimationFrame(() => {
    const sections = container.querySelectorAll('.vocab-section');
    const chips = container.querySelectorAll('.vocab-nav-chip');
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
    card.appendChild(el('div', { class: 'zodiac-name' }, it.pt));
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
    card.appendChild(el('div', { class: 'zodiac-name' }, z.pt));
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

  // Quick-jump chip nav (sticky)
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
  container.appendChild(nav);

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

  requestAnimationFrame(() => {
    const sections = container.querySelectorAll('.numbers-section');
    const chips = container.querySelectorAll('.vocab-nav-chip');
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

  return [topbar({ title: '📚 Foundations', back: true }), container, footer()];
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
