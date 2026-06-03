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
  { id: 'maca', pt: 'maçã', es: 'manzana', en: 'apple', note: 'different roots, but both Romance origin' },
  { id: 'laranja', pt: 'laranja', es: 'naranja', en: 'orange', note: '✅ similar (same Arabic origin)' },
  { id: 'morango', pt: 'morango', es: 'fresa', en: 'strawberry', note: '⚠️ completely different' },
  { id: 'uva', pt: 'uva', es: 'uva', en: 'grape', note: '✅ identical' },
  { id: 'maracuja', pt: 'maracujá', es: 'maracuyá', en: 'passion fruit', note: '✅ almost identical (Tupi origin)' },
  { id: 'mamao', pt: 'mamão', es: 'papaya', en: 'papaya', note: '⚠️ pt mamão = es papaya' },
  { id: 'goiaba', pt: 'goiaba', es: 'guayaba', en: 'guava', note: '✅ similar (Tupi origin)' },
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

function renderVocabCard(item) {
  const card = el('div', { class: 'vocab-card' });
  for (const lang of ['pt', 'es', 'en']) {
    const text = item[lang];
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, text || '—'));
    if (lang !== 'en' && text && text !== '—' && item.id) {
      const src = `./audio/feira/vocab/${item.id}-${lang}.mp3`;
      row.appendChild(el('button', {
        class: 'play-btn play-btn-sm',
        onClick: () => playAudio(src),
      }, '▶'));
    }
    card.appendChild(row);
  }
  if (item.note) {
    card.appendChild(el('div', { class: 'vocab-note-inline' }, item.note));
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
        const src = `./audio/feira/vocab/${item.id}-ex-${lang}.mp3`;
        row.appendChild(el('button', {
          class: 'play-btn play-btn-sm',
          onClick: () => playAudio(src),
        }, '▶'));
      }
      exBlock.appendChild(row);
    }
    card.appendChild(exBlock);
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
    for (const item of items) section.appendChild(renderVocabCard(item));
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

function renderFruitsGrid() {
  const container = el('div', { class: 'fruits-grid-container' });
  const grid = el('div', { class: 'fruits-grid' });
  for (const fruit of FRUITS) {
    const card = el('div', { class: 'fruit-card', onClick: () => showFruitDetail(fruit) });
    card.appendChild(el('img', { src: `./images/fruits/${fruit.id}.jpg`, alt: fruit.en, loading: 'lazy' }));
    const name = el('div', { class: 'fruit-name' }, [
      el('div', { class: 'fruit-pt' }, fruit.pt),
      el('div', { class: 'fruit-es' }, fruit.es),
    ]);
    card.appendChild(name);
    grid.appendChild(card);
  }
  container.appendChild(grid);
  return container;
}

function showFruitDetail(fruit) {
  const overlay = el('div', {
    class: 'modal-overlay',
    onClick: (e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); },
  });
  const modal = el('div', { class: 'modal-content' });
  modal.appendChild(el('button', { class: 'modal-close', onClick: closeModal }, '✕'));
  modal.appendChild(el('img', { src: `./images/fruits/${fruit.id}.jpg`, alt: fruit.en, class: 'modal-img' }));
  const langBlock = el('div', { class: 'modal-lang-block' });
  for (const lang of ['pt', 'es', 'en']) {
    const row = el('div', { class: `lang-row lang-${lang}` });
    row.appendChild(el('span', { class: 'lang-label' }, lang));
    row.appendChild(el('span', { class: 'lang-text' }, fruit[lang]));
    if (lang !== 'en') {
      const src = `./audio/fruits/${fruit.id}-${lang}.mp3`;
      row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
    }
    langBlock.appendChild(row);
  }
  modal.appendChild(langBlock);
  if (fruit.note) {
    modal.appendChild(el('div', { class: 'modal-note' }, fruit.note));
  }
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
  if (catId === 'fruits') {
    content = renderFruitsGrid();
  } else {
    content = el('div', { class: 'tab-content' }, [
      el('div', { class: 'placeholder' }, [
        el('strong', {}, `${cat.name} grid`),
        el('p', {}, 'Photos sourced via Pexels API + Wikipedia. Coming soon.'),
      ]),
    ]);
  }
  return [topbar({ title: `${cat.icon} ${cat.name}`, back: true }), content, footer()];
}

function renderNumbers() {
  const container = el('div', { class: 'tab-content numbers-list' });
  for (const [sectionTitle, items] of Object.entries(NUMBERS_DATA)) {
    const section = el('div', { class: 'numbers-section' });
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
          const src = `./audio/numbers/${item.id}-${lang}.mp3`;
          row.appendChild(el('button', { class: 'play-btn play-btn-sm', onClick: () => playAudio(src) }, '▶'));
        }
        langs.appendChild(row);
      }
      card.appendChild(langs);
      if (item.note) card.appendChild(el('div', { class: 'number-note' }, item.note));
      section.appendChild(card);
    }
    container.appendChild(section);
  }
  return [topbar({ title: '📊 Numbers', back: true }), container, footer()];
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
