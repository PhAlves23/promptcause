/* ===========================================================
   PromptCause — shared behavior + international i18n + theme
   =========================================================== */

/* ---------- Languages offered ---------- */
const LANGS = [
  ['pt','Português'], ['en','English'], ['es','Español'], ['fr','Français'],
  ['de','Deutsch'], ['it','Italiano'], ['ru','Русский'], ['tr','Türkçe'],
  ['id','Bahasa Indonesia'], ['vi','Tiếng Việt'], ['zh','中文'], ['ja','日本語'],
  ['ko','한국어'], ['ar','العربية'], ['hi','हिन्दी'], ['bn','বাংলা'], ['sw','Kiswahili'],
];
const RTL = ['ar'];

/* ---------- Strings by language ----------
   pt + en are complete. Other languages carry the visible core;
   anything missing falls back to English automatically.            */
const STRINGS = {
  pt:{
    "nav.learn":"Aprender","nav.cause":"A Causa","nav.transparency":"Transparência","nav.brand":"Marca","nav.manifesto":"Manifesto",
    "cta.donate":"Doar","cta.start":"Começar a aprender",
    "free.badge":"100% grátis · sem paywall · sem anúncios",
    "keymsg":"Grátis. Se te ajudou, 100% da doação vai para a causa.",
    "lv.1":"Iniciante","lv.2":"Intermediário","lv.3":"Avançado","common.enter":"Entrar",
    "rw.good":"Faça assim","rw.bad":"Evite",
    "home.eyebrow":"A referência aberta de prompt engineering",
    "home.h1a":"Aprenda a conversar com a IA.","home.h1b":"De graça, para sempre.",
    "home.lede":"Do primeiro prompt à engenharia avançada — um guia sério, claro e gratuito. Se ele te ajudar, cada doação vai integralmente para ONGs que levam tecnologia a quem não tem acesso. O dinheiro nunca passa por nós.",
    "home.startfree":"Começar de graça","home.seecause":"Conhecer a causa",
    "home.paths":"Escolha por onde começar","home.paths.sub":"O mesmo site, três profundidades. Avance no seu ritmo.",
    "home.impact.label":"Total doado à causa — repassado integralmente",
    "home.impact.sub":"Atualizado em tempo real. Cada centavo vai para ONGs parceiras de inclusão digital.",
    "home.impact.cta":"Ver para onde vai",
    "p1.title":"Nunca escrevi um prompt","p1.desc":"O que é um prompt, por que a forma importa e como obter respostas úteis na primeira tentativa.",
    "p2.title":"Uso IA no trabalho","p2.desc":"Estruture pedidos, dê contexto e exemplos, e construa fluxos confiáveis para o dia a dia.",
    "p3.title":"Quero engenharia avançada","p3.desc":"Chain-of-thought, ferramentas, avaliação, segurança e padrões de produção.",
    "home.tech.eyebrow":"Como ensinamos","home.tech.title":"Toda técnica vem com o jeito certo e o errado.","home.tech.lede":"Sem teoria vazia. Você vê o prompt, o porquê, e o contraste lado a lado.",
    "home.why.title":"Por que de graça?","home.why.lema":"IA é a nova alfabetização. E alfabetização não se vende.","home.why.body":"Saber usar IA virou alfabetização. E alfabetização não se vende. Cobrar por isso só aprofunda a desigualdade que a gente quer combater. Por isso o conhecimento fica aberto e quem puder retribuir financia inclusão digital para quem ainda nem chegou à internet.",
    "foot.tagline":"Conhecimento de IA aberto a todos. Doações 100% repassadas à inclusão digital.",
    "foot.learn":"Aprender","foot.cause":"A Causa","foot.about":"Projeto","foot.rights":"Conteúdo aberto. Use, traduza, compartilhe.",
    "cause.eyebrow":"Transparência radical","cause.h1":"O dinheiro nunca passa por nós.",
    "cause.lede":"Toda doação vai direto para a conta das ONGs parceiras. Nós não tocamos, não retemos taxa, não pagamos salário com isso. Aqui está a prova, linha por linha.",
    "cause.flow":"Como o dinheiro flui","cause.ledger":"Razão público","cause.partners":"ONGs parceiras",
    "donate.h1":"Retribua. 100% vira inclusão.","donate.lede":"Escolha um valor. Ele vai integralmente para uma ONG parceira — você recebe o comprovante de repasse.",
    "donate.method":"Forma de pagamento","donate.youdonate":"Sua doação","donate.passed":"repassado","donate.retained":"retido",
    "donate.freq":"Frequência","donate.once":"Uma vez","donate.monthly":"Mensal","donate.confirm":"Doar agora","donate.impactof":"O que esse valor faz",
  },
  en:{
    "nav.learn":"Learn","nav.cause":"The Cause","nav.transparency":"Transparency","nav.brand":"Brand","nav.manifesto":"Manifesto",
    "cta.donate":"Donate","cta.start":"Start learning",
    "free.badge":"100% free · no paywall · no ads",
    "keymsg":"Free. If it helped you, 100% of the donation goes to the cause.",
    "lv.1":"Beginner","lv.2":"Intermediate","lv.3":"Advanced","common.enter":"Enter",
    "rw.good":"Do this","rw.bad":"Avoid",
    "home.eyebrow":"The open reference for prompt engineering",
    "home.h1a":"Learn to speak with AI.","home.h1b":"Free, forever.",
    "home.lede":"From your first prompt to advanced engineering — a serious, clear, free guide. If it helps you, every donation goes entirely to NGOs bringing technology to those without access. The money never passes through us.",
    "home.startfree":"Start for free","home.seecause":"See the cause",
    "home.paths":"Choose where to start","home.paths.sub":"One site, three depths. Move at your own pace.",
    "home.impact.label":"Total donated to the cause — passed on in full",
    "home.impact.sub":"Updated in real time. Every cent goes to partner digital-inclusion NGOs.",
    "home.impact.cta":"See where it goes",
    "p1.title":"I've never written a prompt","p1.desc":"What a prompt is, why phrasing matters, and how to get useful answers on the first try.",
    "p2.title":"I use AI at work","p2.desc":"Structure requests, give context and examples, and build reliable everyday workflows.",
    "p3.title":"I want advanced engineering","p3.desc":"Chain-of-thought, tools, evaluation, safety, and production patterns.",
    "home.tech.eyebrow":"How we teach","home.tech.title":"Every technique shows the right way and the wrong way.","home.tech.lede":"No empty theory. You see the prompt, the why, and the contrast side by side.",
    "home.why.title":"Why free?","home.why.lema":"AI is the new literacy. And literacy isn't for sale.","home.why.body":"Knowing how to use AI has become literacy. And literacy isn't for sale. Charging for it only deepens the inequality we want to fight. That's why the knowledge stays open — and those who can give back fund digital inclusion for people not yet even online.",
    "foot.tagline":"AI knowledge open to everyone. Donations passed 100% to digital inclusion.",
    "foot.learn":"Learn","foot.cause":"The Cause","foot.about":"Project","foot.rights":"Open content. Use it, translate it, share it.",
    "cause.eyebrow":"Radical transparency","cause.h1":"The money never passes through us.",
    "cause.lede":"Every donation goes straight to the partner NGOs' accounts. We don't touch it, take no fee, pay no salary from it. Here's the proof, line by line.",
    "cause.flow":"How the money flows","cause.ledger":"Public ledger","cause.partners":"Partner NGOs",
    "donate.h1":"Give back. 100% becomes inclusion.","donate.lede":"Choose an amount. It goes entirely to a partner NGO — you get the transfer receipt.",
    "donate.method":"Payment method","donate.youdonate":"Your donation","donate.passed":"passed on","donate.retained":"retained",
    "donate.freq":"Frequency","donate.once":"One time","donate.monthly":"Monthly","donate.confirm":"Donate now","donate.impactof":"What this amount does",
  },
  es:{
    "nav.learn":"Aprender","nav.cause":"La Causa","nav.transparency":"Transparencia","nav.brand":"Marca",
    "cta.donate":"Donar","cta.start":"Empezar a aprender","free.badge":"100% gratis · sin muro de pago · sin anuncios",
    "keymsg":"Gratis. Si te ayudó, el 100% de la donación va a la causa.",
    "lv.1":"Principiante","lv.2":"Intermedio","lv.3":"Avanzado","common.enter":"Entrar","rw.good":"Hazlo así","rw.bad":"Evita",
    "home.h1a":"Aprende a hablar con la IA.","home.h1b":"Gratis, para siempre.",
    "home.lede":"Desde tu primer prompt hasta la ingeniería avanzada — una guía seria, clara y gratuita. Si te ayuda, cada donación va íntegra a ONG que llevan tecnología a quien no tiene acceso. El dinero nunca pasa por nosotros.",
    "home.startfree":"Empezar gratis","home.seecause":"Conocer la causa",
    "home.impact.label":"Total donado a la causa — transferido íntegramente","home.impact.sub":"Actualizado en tiempo real. Cada céntimo va a ONG aliadas de inclusión digital.",
    "foot.tagline":"Conocimiento de IA abierto a todos. Donaciones 100% destinadas a la inclusión digital.",
    "foot.learn":"Aprender","foot.cause":"La Causa","foot.about":"Proyecto","foot.rights":"Contenido abierto. Úsalo, tradúcelo, compártelo.",
    "cause.eyebrow":"Transparencia radical","cause.h1":"El dinero nunca pasa por nosotros.",
    "cause.lede":"Cada donación va directa a la cuenta de las ONG aliadas. No la tocamos, no cobramos comisión, no pagamos sueldos con eso. Aquí está la prueba, línea por línea.",
    "donate.h1":"Devuelve. El 100% se vuelve inclusión.","donate.lede":"Elige un importe. Va íntegro a una ONG aliada — recibes el comprobante de transferencia.",
    "donate.method":"Forma de pago","donate.youdonate":"Tu donación","donate.passed":"transferido","donate.retained":"retenido",
    "donate.freq":"Frecuencia","donate.once":"Una vez","donate.monthly":"Mensual","donate.confirm":"Donar ahora","donate.impactof":"Qué hace este importe",
  },
  fr:{
    "nav.learn":"Apprendre","nav.cause":"La Cause","nav.transparency":"Transparence","nav.brand":"Marque",
    "cta.donate":"Faire un don","cta.start":"Commencer à apprendre","free.badge":"100% gratuit · sans paywall · sans publicité",
    "keymsg":"Gratuit. Si cela vous a aidé, 100% du don va à la cause.",
    "lv.1":"Débutant","lv.2":"Intermédiaire","lv.3":"Avancé","common.enter":"Entrer","rw.good":"À faire","rw.bad":"À éviter",
    "home.h1a":"Apprenez à parler avec l'IA.","home.h1b":"Gratuit, pour toujours.",
    "home.lede":"Du premier prompt à l'ingénierie avancée — un guide sérieux, clair et gratuit. S'il vous aide, chaque don va intégralement à des ONG qui apportent la technologie à ceux qui n'y ont pas accès. L'argent ne passe jamais par nous.",
    "home.startfree":"Commencer gratuitement","home.seecause":"Découvrir la cause",
    "home.impact.label":"Total donné à la cause — reversé intégralement","home.impact.sub":"Mis à jour en temps réel. Chaque centime va à des ONG partenaires d'inclusion numérique.",
    "foot.tagline":"Le savoir en IA ouvert à tous. Dons reversés à 100% à l'inclusion numérique.",
    "foot.learn":"Apprendre","foot.cause":"La Cause","foot.about":"Projet","foot.rights":"Contenu ouvert. Utilisez-le, traduisez-le, partagez-le.",
    "cause.eyebrow":"Transparence radicale","cause.h1":"L'argent ne passe jamais par nous.",
    "cause.lede":"Chaque don va directement sur le compte des ONG partenaires. Nous n'y touchons pas, ne prenons aucune commission, ne payons aucun salaire avec. Voici la preuve, ligne par ligne.",
    "donate.h1":"Rendez la pareille. 100% devient inclusion.","donate.lede":"Choisissez un montant. Il va intégralement à une ONG partenaire — vous recevez le reçu de versement.",
    "donate.method":"Moyen de paiement","donate.youdonate":"Votre don","donate.passed":"reversé","donate.retained":"retenu",
    "donate.freq":"Fréquence","donate.once":"Une fois","donate.monthly":"Mensuel","donate.confirm":"Faire un don","donate.impactof":"Ce que fait ce montant",
  },
  de:{
    "nav.learn":"Lernen","nav.cause":"Das Anliegen","nav.transparency":"Transparenz","nav.brand":"Marke",
    "cta.donate":"Spenden","cta.start":"Lernen starten","free.badge":"100% kostenlos · keine Paywall · keine Werbung",
    "keymsg":"Kostenlos. Wenn es dir geholfen hat, gehen 100% der Spende an den guten Zweck.",
    "lv.1":"Anfänger","lv.2":"Mittelstufe","lv.3":"Fortgeschritten","common.enter":"Öffnen","rw.good":"So geht's","rw.bad":"Vermeiden",
    "home.h1a":"Lerne, mit KI zu sprechen.","home.h1b":"Kostenlos, für immer.",
    "home.lede":"Vom ersten Prompt bis zur fortgeschrittenen Technik — ein seriöser, klarer und kostenloser Leitfaden. Wenn er dir hilft, geht jede Spende vollständig an NGOs, die Technik zu Menschen ohne Zugang bringen. Das Geld geht nie durch unsere Hände.",
    "home.startfree":"Kostenlos starten","home.seecause":"Das Anliegen ansehen",
    "home.impact.label":"Gesamt an den Zweck gespendet — vollständig weitergeleitet","home.impact.sub":"In Echtzeit aktualisiert. Jeder Cent geht an Partner-NGOs für digitale Teilhabe.",
    "foot.tagline":"KI-Wissen offen für alle. Spenden zu 100% für digitale Teilhabe.",
    "foot.learn":"Lernen","foot.cause":"Das Anliegen","foot.about":"Projekt","foot.rights":"Offener Inhalt. Nutze, übersetze, teile ihn.",
    "cause.eyebrow":"Radikale Transparenz","cause.h1":"Das Geld geht nie durch unsere Hände.",
    "cause.lede":"Jede Spende geht direkt auf das Konto der Partner-NGOs. Wir fassen es nicht an, nehmen keine Gebühr, zahlen davon kein Gehalt. Hier ist der Beweis, Zeile für Zeile.",
    "donate.h1":"Gib etwas zurück. 100% wird Teilhabe.","donate.lede":"Wähle einen Betrag. Er geht vollständig an eine Partner-NGO — du erhältst den Überweisungsbeleg.",
    "donate.method":"Zahlungsart","donate.youdonate":"Deine Spende","donate.passed":"weitergeleitet","donate.retained":"einbehalten",
    "donate.freq":"Häufigkeit","donate.once":"Einmalig","donate.monthly":"Monatlich","donate.confirm":"Jetzt spenden","donate.impactof":"Was dieser Betrag bewirkt",
  },
  it:{
    "nav.learn":"Impara","nav.cause":"La Causa","nav.transparency":"Trasparenza","nav.brand":"Marchio",
    "cta.donate":"Dona","cta.start":"Inizia a imparare","free.badge":"100% gratis · nessun paywall · nessuna pubblicità",
    "keymsg":"Gratis. Se ti è stato utile, il 100% della donazione va alla causa.",
    "lv.1":"Principiante","lv.2":"Intermedio","lv.3":"Avanzato","common.enter":"Entra","rw.good":"Fai così","rw.bad":"Evita",
    "home.h1a":"Impara a parlare con l'IA.","home.h1b":"Gratis, per sempre.",
    "home.lede":"Dal primo prompt all'ingegneria avanzata — una guida seria, chiara e gratuita. Se ti aiuta, ogni donazione va interamente a ONG che portano la tecnologia a chi non ha accesso. Il denaro non passa mai da noi.",
    "home.startfree":"Inizia gratis","home.seecause":"Scopri la causa",
    "home.impact.label":"Totale donato alla causa — devoluto per intero","home.impact.sub":"Aggiornato in tempo reale. Ogni centesimo va a ONG partner per l'inclusione digitale.",
    "foot.tagline":"Conoscenza dell'IA aperta a tutti. Donazioni devolute al 100% all'inclusione digitale.",
    "foot.learn":"Impara","foot.cause":"La Causa","foot.about":"Progetto","foot.rights":"Contenuto aperto. Usalo, traducilo, condividilo.",
    "cause.eyebrow":"Trasparenza radicale","cause.h1":"Il denaro non passa mai da noi.",
    "cause.lede":"Ogni donazione va direttamente sul conto delle ONG partner. Non la tocchiamo, non tratteniamo commissioni, non paghiamo stipendi con essa. Ecco la prova, riga per riga.",
    "donate.h1":"Restituisci. Il 100% diventa inclusione.","donate.lede":"Scegli un importo. Va interamente a una ONG partner — ricevi la ricevuta del trasferimento.",
    "donate.method":"Metodo di pagamento","donate.youdonate":"La tua donazione","donate.passed":"devoluto","donate.retained":"trattenuto",
    "donate.freq":"Frequenza","donate.once":"Una volta","donate.monthly":"Mensile","donate.confirm":"Dona ora","donate.impactof":"Cosa fa questa cifra",
  },
  ru:{
    "nav.learn":"Учиться","nav.cause":"Миссия","nav.transparency":"Прозрачность","nav.brand":"Бренд",
    "cta.donate":"Пожертвовать","cta.start":"Начать обучение","free.badge":"100% бесплатно · без платного доступа · без рекламы",
    "keymsg":"Бесплатно. Если это помогло — 100% пожертвования идёт на дело.",
    "lv.1":"Начинающий","lv.2":"Средний","lv.3":"Продвинутый","common.enter":"Войти","rw.good":"Делайте так","rw.bad":"Избегайте",
    "home.h1a":"Научитесь говорить с ИИ.","home.h1b":"Бесплатно, навсегда.",
    "home.lede":"От первого промпта до продвинутой инженерии — серьёзное, понятное и бесплатное руководство. Если оно помогло, каждое пожертвование полностью идёт НКО, которые несут технологии тем, у кого нет доступа. Деньги никогда не проходят через нас.",
    "home.startfree":"Начать бесплатно","home.seecause":"О миссии",
    "home.impact.label":"Всего пожертвовано на дело — передано полностью","home.impact.sub":"Обновляется в реальном времени. Каждая копейка идёт партнёрским НКО цифровой доступности.",
    "foot.tagline":"Знания об ИИ открыты для всех. 100% пожертвований — на цифровую доступность.",
    "foot.learn":"Учиться","foot.cause":"Миссия","foot.about":"Проект","foot.rights":"Открытый контент. Используйте, переводите, делитесь.",
    "cause.eyebrow":"Радикальная прозрачность","cause.h1":"Деньги никогда не проходят через нас.",
    "cause.lede":"Каждое пожертвование идёт прямо на счёт партнёрских НКО. Мы их не трогаем, не берём комиссию, не платим из них зарплату. Вот доказательство, строка за строкой.",
    "donate.h1":"Отблагодарите. 100% становится доступностью.","donate.lede":"Выберите сумму. Она полностью идёт партнёрской НКО — вы получаете подтверждение перевода.",
    "donate.method":"Способ оплаты","donate.youdonate":"Ваше пожертвование","donate.passed":"передано","donate.retained":"удержано",
    "donate.freq":"Периодичность","donate.once":"Разово","donate.monthly":"Ежемесячно","donate.confirm":"Пожертвовать","donate.impactof":"Что даёт эта сумма",
  },
  tr:{
    "nav.learn":"Öğren","nav.cause":"Amaç","nav.transparency":"Şeffaflık","nav.brand":"Marka",
    "cta.donate":"Bağış yap","cta.start":"Öğrenmeye başla","free.badge":"%100 ücretsiz · ödeme duvarı yok · reklam yok",
    "keymsg":"Ücretsiz. Faydası olduysa, bağışın %100'ü amaca gider.",
    "lv.1":"Başlangıç","lv.2":"Orta","lv.3":"İleri","common.enter":"Gir","rw.good":"Böyle yap","rw.bad":"Kaçın",
    "home.h1a":"Yapay zekâ ile konuşmayı öğren.","home.h1b":"Ücretsiz, sonsuza dek.",
    "home.lede":"İlk komuttan ileri mühendisliğe — ciddi, açık ve ücretsiz bir rehber. Sana yardımcı olursa, her bağış tamamen erişimi olmayanlara teknoloji götüren STK'lara gider. Para asla bizden geçmez.",
    "home.startfree":"Ücretsiz başla","home.seecause":"Amacı gör",
    "home.impact.label":"Amaca bağışlanan toplam — tamamı aktarıldı","home.impact.sub":"Gerçek zamanlı güncellenir. Her kuruş dijital erişim STK'larına gider.",
    "foot.tagline":"AI bilgisi herkese açık. Bağışların %100'ü dijital erişime aktarılır.",
    "foot.learn":"Öğren","foot.cause":"Amaç","foot.about":"Proje","foot.rights":"Açık içerik. Kullan, çevir, paylaş.",
    "cause.eyebrow":"Radikal şeffaflık","cause.h1":"Para asla bizden geçmez.",
    "cause.lede":"Her bağış doğrudan partner STK'ların hesabına gider. Dokunmayız, komisyon almayız, bununla maaş ödemeyiz. İşte kanıtı, satır satır.",
    "donate.h1":"Karşılık ver. %100'ü erişime dönüşür.","donate.lede":"Bir tutar seç. Tamamı partner bir STK'ya gider — aktarım makbuzunu alırsın.",
    "donate.method":"Ödeme yöntemi","donate.youdonate":"Bağışın","donate.passed":"aktarıldı","donate.retained":"alıkonuldu",
    "donate.freq":"Sıklık","donate.once":"Tek seferlik","donate.monthly":"Aylık","donate.confirm":"Şimdi bağış yap","donate.impactof":"Bu tutar ne yapar",
  },
  id:{
    "nav.learn":"Belajar","nav.cause":"Misi","nav.transparency":"Transparansi","nav.brand":"Merek",
    "cta.donate":"Donasi","cta.start":"Mulai belajar","free.badge":"100% gratis · tanpa paywall · tanpa iklan",
    "keymsg":"Gratis. Jika membantu, 100% donasi untuk misi ini.",
    "lv.1":"Pemula","lv.2":"Menengah","lv.3":"Mahir","common.enter":"Masuk","rw.good":"Lakukan ini","rw.bad":"Hindari",
    "home.h1a":"Belajar berbicara dengan AI.","home.h1b":"Gratis, selamanya.",
    "home.lede":"Dari prompt pertama hingga rekayasa tingkat lanjut — panduan serius, jelas, dan gratis. Jika membantumu, setiap donasi sepenuhnya untuk LSM yang membawa teknologi ke mereka yang tak punya akses. Uang tak pernah melewati kami.",
    "home.startfree":"Mulai gratis","home.seecause":"Lihat misinya",
    "home.impact.label":"Total donasi untuk misi — diteruskan sepenuhnya","home.impact.sub":"Diperbarui real-time. Setiap sen untuk LSM mitra inklusi digital.",
    "foot.tagline":"Pengetahuan AI terbuka untuk semua. Donasi 100% untuk inklusi digital.",
    "foot.learn":"Belajar","foot.cause":"Misi","foot.about":"Proyek","foot.rights":"Konten terbuka. Gunakan, terjemahkan, bagikan.",
    "cause.eyebrow":"Transparansi radikal","cause.h1":"Uang tidak pernah melewati kami.",
    "cause.lede":"Setiap donasi langsung ke rekening LSM mitra. Kami tak menyentuhnya, tak memungut biaya, tak menggaji dari itu. Inilah buktinya, baris demi baris.",
    "donate.h1":"Berbagi kembali. 100% jadi inklusi.","donate.lede":"Pilih jumlah. Sepenuhnya untuk LSM mitra — kamu menerima bukti transfer.",
    "donate.method":"Metode pembayaran","donate.youdonate":"Donasimu","donate.passed":"diteruskan","donate.retained":"ditahan",
    "donate.freq":"Frekuensi","donate.once":"Sekali","donate.monthly":"Bulanan","donate.confirm":"Donasi sekarang","donate.impactof":"Apa yang dilakukan jumlah ini",
  },
  vi:{
    "nav.learn":"Học","nav.cause":"Sứ mệnh","nav.transparency":"Minh bạch","nav.brand":"Thương hiệu",
    "cta.donate":"Quyên góp","cta.start":"Bắt đầu học","free.badge":"100% miễn phí · không trả phí · không quảng cáo",
    "keymsg":"Miễn phí. Nếu hữu ích, 100% quyên góp dành cho sứ mệnh.",
    "lv.1":"Người mới","lv.2":"Trung cấp","lv.3":"Nâng cao","common.enter":"Vào","rw.good":"Hãy làm thế này","rw.bad":"Tránh",
    "home.h1a":"Học cách trò chuyện với AI.","home.h1b":"Miễn phí, mãi mãi.",
    "home.lede":"Từ prompt đầu tiên đến kỹ thuật nâng cao — một hướng dẫn nghiêm túc, rõ ràng và miễn phí. Nếu hữu ích, mỗi khoản quyên góp đều dành trọn cho các tổ chức mang công nghệ đến người chưa có cơ hội. Tiền không bao giờ qua tay chúng tôi.",
    "home.startfree":"Bắt đầu miễn phí","home.seecause":"Tìm hiểu sứ mệnh",
    "home.impact.label":"Tổng quyên góp cho sứ mệnh — chuyển trọn vẹn","home.impact.sub":"Cập nhật thời gian thực. Mỗi đồng đến các tổ chức hòa nhập số đối tác.",
    "foot.tagline":"Kiến thức AI mở cho mọi người. 100% quyên góp dành cho hòa nhập số.",
    "foot.learn":"Học","foot.cause":"Sứ mệnh","foot.about":"Dự án","foot.rights":"Nội dung mở. Dùng, dịch, chia sẻ.",
    "cause.eyebrow":"Minh bạch tuyệt đối","cause.h1":"Tiền không bao giờ qua tay chúng tôi.",
    "cause.lede":"Mỗi khoản quyên góp đi thẳng vào tài khoản của tổ chức đối tác. Chúng tôi không chạm vào, không thu phí, không trả lương từ đó. Đây là bằng chứng, từng dòng một.",
    "donate.h1":"Đáp lại. 100% thành hòa nhập.","donate.lede":"Chọn một số tiền. Toàn bộ đến một tổ chức đối tác — bạn nhận biên nhận chuyển khoản.",
    "donate.method":"Phương thức thanh toán","donate.youdonate":"Khoản quyên góp của bạn","donate.passed":"đã chuyển","donate.retained":"giữ lại",
    "donate.freq":"Tần suất","donate.once":"Một lần","donate.monthly":"Hàng tháng","donate.confirm":"Quyên góp ngay","donate.impactof":"Số tiền này làm được gì",
  },
  zh:{
    "nav.learn":"学习","nav.cause":"公益","nav.transparency":"透明度","nav.brand":"品牌",
    "cta.donate":"捐赠","cta.start":"开始学习","free.badge":"100% 免费 · 无付费墙 · 无广告",
    "keymsg":"免费。如果它帮到你，100% 的捐款都用于公益。",
    "lv.1":"入门","lv.2":"进阶","lv.3":"高级","common.enter":"进入","rw.good":"这样做","rw.bad":"避免",
    "home.h1a":"学会与 AI 对话。","home.h1b":"永远免费。",
    "home.lede":"从第一个提示词到进阶工程——一份认真、清晰、免费的指南。如果它帮到你，每笔捐款都会全额交给把技术带给无法触及者的公益组织。钱从不经过我们之手。",
    "home.startfree":"免费开始","home.seecause":"了解公益",
    "home.impact.label":"为公益捐赠总额 — 全额转交","home.impact.sub":"实时更新。每一分钱都交给数字包容的合作公益组织。",
    "foot.tagline":"让 AI 知识向所有人开放。捐款 100% 用于数字包容。",
    "foot.learn":"学习","foot.cause":"公益","foot.about":"项目","foot.rights":"开放内容。使用、翻译、分享。",
    "cause.eyebrow":"彻底透明","cause.h1":"钱从不经过我们之手。",
    "cause.lede":"每笔捐款都直接进入合作公益组织的账户。我们不碰、不收手续费、不用它发工资。这就是证据，逐条公开。",
    "donate.h1":"回馈。100% 化为包容。","donate.lede":"选择一个金额。它将全额交给合作公益组织——你会收到转账凭证。",
    "donate.method":"支付方式","donate.youdonate":"你的捐赠","donate.passed":"已转交","donate.retained":"留存",
    "donate.freq":"频率","donate.once":"一次","donate.monthly":"每月","donate.confirm":"立即捐赠","donate.impactof":"这笔金额能做什么",
  },
  ja:{
    "nav.learn":"学ぶ","nav.cause":"活動","nav.transparency":"透明性","nav.brand":"ブランド",
    "cta.donate":"寄付する","cta.start":"学習を始める","free.badge":"100%無料 · ペイウォールなし · 広告なし",
    "keymsg":"無料です。役に立ったら、寄付の100%が活動に届きます。",
    "lv.1":"初級","lv.2":"中級","lv.3":"上級","common.enter":"開く","rw.good":"こうする","rw.bad":"避ける",
    "home.h1a":"AIと話す方法を学ぼう。","home.h1b":"ずっと無料。",
    "home.lede":"最初のプロンプトから高度なエンジニアリングまで——真剣で明快、無料のガイド。役に立ったら、寄付は全額、技術を届けられていない人々のためのNGOへ。お金は私たちを通りません。",
    "home.startfree":"無料で始める","home.seecause":"活動を見る",
    "home.impact.label":"活動への寄付総額 — 全額送金","home.impact.sub":"リアルタイム更新。すべてデジタル包摂のパートナーNGOへ。",
    "foot.tagline":"AIの知識をすべての人へ。寄付は100%デジタル包摂に。",
    "foot.learn":"学ぶ","foot.cause":"活動","foot.about":"プロジェクト","foot.rights":"オープンな内容。使い、訳し、共有しよう。",
    "cause.eyebrow":"徹底した透明性","cause.h1":"お金は私たちを通りません。",
    "cause.lede":"すべての寄付はパートナーNGOの口座へ直接届きます。私たちは触れず、手数料も取らず、給与にも使いません。これがその証拠、一行ずつ公開します。",
    "donate.h1":"恩返しを。100%が包摂になる。","donate.lede":"金額を選んでください。全額がパートナーNGOへ——送金の控えをお渡しします。",
    "donate.method":"お支払い方法","donate.youdonate":"あなたの寄付","donate.passed":"送金済み","donate.retained":"留保",
    "donate.freq":"頻度","donate.once":"一度","donate.monthly":"毎月","donate.confirm":"今すぐ寄付","donate.impactof":"この金額でできること",
  },
  ko:{
    "nav.learn":"배우기","nav.cause":"활동","nav.transparency":"투명성","nav.brand":"브랜드",
    "cta.donate":"기부하기","cta.start":"학습 시작","free.badge":"100% 무료 · 페이월 없음 · 광고 없음",
    "keymsg":"무료입니다. 도움이 되었다면 기부금 100%가 활동에 쓰입니다.",
    "lv.1":"초급","lv.2":"중급","lv.3":"고급","common.enter":"들어가기","rw.good":"이렇게 하세요","rw.bad":"피하세요",
    "home.h1a":"AI와 대화하는 법을 배우세요.","home.h1b":"영원히 무료.",
    "home.lede":"첫 프롬프트부터 고급 엔지니어링까지 — 진지하고 명확하며 무료인 가이드. 도움이 되었다면 모든 기부금은 접근하지 못한 이들에게 기술을 전하는 NGO에 전액 전달됩니다. 돈은 우리를 거치지 않습니다.",
    "home.startfree":"무료로 시작","home.seecause":"활동 보기",
    "home.impact.label":"활동 기부 총액 — 전액 전달","home.impact.sub":"실시간 업데이트. 모든 금액이 디지털 포용 파트너 NGO로.",
    "foot.tagline":"모두에게 열린 AI 지식. 기부금 100%는 디지털 포용에.",
    "foot.learn":"배우기","foot.cause":"활동","foot.about":"프로젝트","foot.rights":"열린 콘텐츠. 사용하고, 번역하고, 공유하세요.",
    "cause.eyebrow":"철저한 투명성","cause.h1":"돈은 우리를 거치지 않습니다.",
    "cause.lede":"모든 기부금은 파트너 NGO 계좌로 바로 갑니다. 우리는 손대지 않고, 수수료도 받지 않고, 급여로 쓰지 않습니다. 여기 그 증거가, 한 줄씩 있습니다.",
    "donate.h1":"되돌려 주세요. 100%가 포용이 됩니다.","donate.lede":"금액을 선택하세요. 전액 파트너 NGO로 갑니다 — 이체 증빙을 받으세요.",
    "donate.method":"결제 수단","donate.youdonate":"당신의 기부","donate.passed":"전달됨","donate.retained":"보유",
    "donate.freq":"빈도","donate.once":"한 번","donate.monthly":"매월","donate.confirm":"지금 기부","donate.impactof":"이 금액이 하는 일",
  },
  ar:{
    "nav.learn":"تعلّم","nav.cause":"القضية","nav.transparency":"الشفافية","nav.brand":"العلامة",
    "cta.donate":"تبرّع","cta.start":"ابدأ التعلّم","free.badge":"مجاني 100% · بلا اشتراك · بلا إعلانات",
    "keymsg":"مجاني. إذا أفادك، 100% من التبرّع يذهب للقضية.",
    "lv.1":"مبتدئ","lv.2":"متوسط","lv.3":"متقدّم","common.enter":"ادخل","rw.good":"افعل هكذا","rw.bad":"تجنّب",
    "home.h1a":"تعلّم التحدث مع الذكاء الاصطناعي.","home.h1b":"مجاني، للأبد.",
    "home.lede":"من أول أمر إلى الهندسة المتقدّمة — دليل جادّ وواضح ومجاني. إن أفادك، يذهب كل تبرّع بالكامل لمنظمات تنقل التقنية لمن لا وصول لهم. المال لا يمرّ بنا أبداً.",
    "home.startfree":"ابدأ مجاناً","home.seecause":"تعرّف على القضية",
    "home.impact.label":"إجمالي التبرّعات للقضية — محوّلة بالكامل","home.impact.sub":"يُحدّث آنياً. كل قرش يذهب لمنظمات شريكة للشمول الرقمي.",
    "foot.tagline":"معرفة الذكاء الاصطناعي متاحة للجميع. 100% من التبرّعات للشمول الرقمي.",
    "foot.learn":"تعلّم","foot.cause":"القضية","foot.about":"المشروع","foot.rights":"محتوى مفتوح. استخدمه، ترجمه، شاركه.",
    "cause.eyebrow":"شفافية مطلقة","cause.h1":"المال لا يمرّ بنا أبداً.",
    "cause.lede":"كل تبرّع يذهب مباشرة إلى حساب المنظمات الشريكة. لا نلمسه، ولا نأخذ رسوماً، ولا ندفع منه رواتب. إليك الدليل، سطراً بسطر.",
    "donate.h1":"ردّ الجميل. 100% يصبح شمولاً.","donate.lede":"اختر مبلغاً. يذهب بالكامل لمنظمة شريكة — وتحصل على إيصال التحويل.",
    "donate.method":"طريقة الدفع","donate.youdonate":"تبرّعك","donate.passed":"محوّل","donate.retained":"محتجز",
    "donate.freq":"التكرار","donate.once":"مرة واحدة","donate.monthly":"شهري","donate.confirm":"تبرّع الآن","donate.impactof":"ماذا يفعل هذا المبلغ",
  },
  hi:{
    "nav.learn":"सीखें","nav.cause":"उद्देश्य","nav.transparency":"पारदर्शिता","nav.brand":"ब्रांड",
    "cta.donate":"दान करें","cta.start":"सीखना शुरू करें","free.badge":"100% मुफ़्त · कोई पेवॉल नहीं · कोई विज्ञापन नहीं",
    "keymsg":"मुफ़्त। अगर इससे मदद मिली, तो दान का 100% उद्देश्य को जाता है।",
    "lv.1":"शुरुआती","lv.2":"मध्यम","lv.3":"उन्नत","common.enter":"प्रवेश करें","rw.good":"ऐसा करें","rw.bad":"इससे बचें",
    "home.h1a":"AI से बात करना सीखें।","home.h1b":"हमेशा के लिए मुफ़्त।",
    "home.lede":"पहले प्रॉम्प्ट से उन्नत इंजीनियरिंग तक — एक गंभीर, स्पष्ट और मुफ़्त मार्गदर्शिका। अगर यह मदद करे, तो हर दान पूरी तरह उन NGO को जाता है जो वंचितों तक तकनीक पहुँचाते हैं। पैसा कभी हमारे पास से नहीं गुज़रता।",
    "home.startfree":"मुफ़्त शुरू करें","home.seecause":"उद्देश्य देखें",
    "home.impact.label":"उद्देश्य को कुल दान — पूरा हस्तांतरित","home.impact.sub":"रीयल-टाइम अपडेट। हर पैसा डिजिटल समावेशन की साझेदार NGO को।",
    "foot.tagline":"AI ज्ञान सबके लिए खुला। दान का 100% डिजिटल समावेशन को।",
    "foot.learn":"सीखें","foot.cause":"उद्देश्य","foot.about":"परियोजना","foot.rights":"खुली सामग्री। उपयोग करें, अनुवाद करें, साझा करें।",
    "cause.eyebrow":"पूर्ण पारदर्शिता","cause.h1":"पैसा कभी हमारे पास से नहीं गुज़रता।",
    "cause.lede":"हर दान सीधे साझेदार NGO के खाते में जाता है। हम न छूते हैं, न शुल्क लेते हैं, न इससे वेतन देते हैं। यह रहा प्रमाण, पंक्ति-दर-पंक्ति।",
    "donate.h1":"लौटाएँ। 100% समावेशन बनता है।","donate.lede":"एक राशि चुनें। यह पूरी तरह साझेदार NGO को जाती है — आपको हस्तांतरण की रसीद मिलती है।",
    "donate.method":"भुगतान का तरीका","donate.youdonate":"आपका दान","donate.passed":"भेजा गया","donate.retained":"रोका गया",
    "donate.freq":"आवृत्ति","donate.once":"एक बार","donate.monthly":"मासिक","donate.confirm":"अभी दान करें","donate.impactof":"यह राशि क्या करती है",
  },
  bn:{
    "nav.learn":"শিখুন","nav.cause":"উদ্দেশ্য","nav.transparency":"স্বচ্ছতা","nav.brand":"ব্র্যান্ড",
    "cta.donate":"দান করুন","cta.start":"শেখা শুরু করুন","free.badge":"১০০% বিনামূল্যে · পেওয়াল নেই · বিজ্ঞাপন নেই",
    "keymsg":"বিনামূল্যে। সাহায্য করলে, দানের ১০০% উদ্দেশ্যে যায়।",
    "lv.1":"শিক্ষানবিশ","lv.2":"মধ্যম","lv.3":"উন্নত","common.enter":"প্রবেশ করুন","rw.good":"এভাবে করুন","rw.bad":"এড়িয়ে চলুন",
    "home.h1a":"AI-এর সাথে কথা বলা শিখুন।","home.h1b":"চিরকাল বিনামূল্যে।",
    "home.lede":"প্রথম প্রম্পট থেকে উন্নত প্রকৌশল পর্যন্ত — একটি গুরুত্বপূর্ণ, স্পষ্ট ও বিনামূল্যের নির্দেশিকা। সাহায্য করলে, প্রতিটি দান সম্পূর্ণভাবে সেই NGO-তে যায় যারা প্রযুক্তি পৌঁছে দেয় বঞ্চিতদের কাছে। টাকা কখনও আমাদের হাত দিয়ে যায় না।",
    "home.startfree":"বিনামূল্যে শুরু করুন","home.seecause":"উদ্দেশ্য দেখুন",
    "home.impact.label":"উদ্দেশ্যে মোট দান — সম্পূর্ণ স্থানান্তরিত","home.impact.sub":"রিয়েল-টাইম আপডেট। প্রতিটি পয়সা ডিজিটাল অন্তর্ভুক্তির সহযোগী NGO-তে।",
    "foot.tagline":"AI জ্ঞান সবার জন্য উন্মুক্ত। দানের ১০০% ডিজিটাল অন্তর্ভুক্তিতে।",
    "foot.learn":"শিখুন","foot.cause":"উদ্দেশ্য","foot.about":"প্রকল্প","foot.rights":"উন্মুক্ত বিষয়বস্তু। ব্যবহার করুন, অনুবাদ করুন, ভাগ করুন।",
    "cause.eyebrow":"পূর্ণ স্বচ্ছতা","cause.h1":"টাকা কখনও আমাদের হাত দিয়ে যায় না।",
    "cause.lede":"প্রতিটি দান সরাসরি সহযোগী NGO-র অ্যাকাউন্টে যায়। আমরা স্পর্শ করি না, ফি নিই না, এটা দিয়ে বেতন দিই না। এই যে প্রমাণ, লাইনে লাইনে।",
    "donate.h1":"ফিরিয়ে দিন। ১০০% অন্তর্ভুক্তি হয়।","donate.lede":"একটি পরিমাণ বাছুন। সম্পূর্ণটি সহযোগী NGO-তে যায় — আপনি স্থানান্তরের রসিদ পান।",
    "donate.method":"পেমেন্ট পদ্ধতি","donate.youdonate":"আপনার দান","donate.passed":"স্থানান্তরিত","donate.retained":"রাখা হয়েছে",
    "donate.freq":"কতবার","donate.once":"একবার","donate.monthly":"মাসিক","donate.confirm":"এখনই দান করুন","donate.impactof":"এই পরিমাণ কী করে",
  },
  sw:{
    "nav.learn":"Jifunze","nav.cause":"Lengo","nav.transparency":"Uwazi","nav.brand":"Chapa",
    "cta.donate":"Changia","cta.start":"Anza kujifunza","free.badge":"Bila malipo 100% · hakuna paywall · hakuna matangazo",
    "keymsg":"Bila malipo. Ikikusaidia, 100% ya mchango huenda kwenye lengo.",
    "lv.1":"Mwanzo","lv.2":"Wastani","lv.3":"Juu","common.enter":"Ingia","rw.good":"Fanya hivi","rw.bad":"Epuka",
    "home.h1a":"Jifunze kuzungumza na AI.","home.h1b":"Bila malipo, milele.",
    "home.lede":"Kutoka prompt ya kwanza hadi uhandisi wa hali ya juu — mwongozo makini, wazi na bila malipo. Ukikusaidia, kila mchango huenda wote kwa mashirika yanayopeleka teknolojia kwa wasio na fursa. Pesa hazipiti kwetu kamwe.",
    "home.startfree":"Anza bila malipo","home.seecause":"Ona lengo",
    "home.impact.label":"Jumla iliyochangwa kwa lengo — imehamishwa yote","home.impact.sub":"Inasasishwa papo hapo. Kila senti huenda kwa mashirika washirika wa ujumuishaji wa kidijitali.",
    "foot.tagline":"Maarifa ya AI wazi kwa wote. Michango 100% kwa ujumuishaji wa kidijitali.",
    "foot.learn":"Jifunze","foot.cause":"Lengo","foot.about":"Mradi","foot.rights":"Maudhui huria. Tumia, tafsiri, shiriki.",
    "cause.eyebrow":"Uwazi kamili","cause.h1":"Pesa hazipiti kwetu kamwe.",
    "cause.lede":"Kila mchango huenda moja kwa moja kwenye akaunti ya mashirika washirika. Hatuugusi, hatutozi ada, hatulipi mishahara kwa huo. Hapa kuna ushahidi, mstari kwa mstari.",
    "donate.h1":"Rudisha. 100% inakuwa ujumuishaji.","donate.lede":"Chagua kiasi. Chote huenda kwa shirika mshirika — unapata risiti ya uhamisho.",
    "donate.method":"Njia ya malipo","donate.youdonate":"Mchango wako","donate.passed":"umehamishwa","donate.retained":"umebakizwa",
    "donate.freq":"Marudio","donate.once":"Mara moja","donate.monthly":"Kila mwezi","donate.confirm":"Changia sasa","donate.impactof":"Kiasi hiki kinafanya nini",
  },
};

function t(lang, key){
  const L = STRINGS[lang];
  if(L && L[key] != null) return L[key];
  return STRINGS.en[key] != null ? STRINGS.en[key] : null;
}

/* ---------- Language state ---------- */
const LANG = {
  get(){ return localStorage.getItem('pc_lang') || 'pt'; },
  set(l){ localStorage.setItem('pc_lang', l); apply(l); if(window.__pcDonateRefresh) window.__pcDonateRefresh(); }
};

function apply(lang){
  const isRTL = RTL.includes(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v = t(lang, el.getAttribute('data-i18n'));
    if(v != null) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const v = t(lang, el.getAttribute('data-i18n-html'));
    if(v != null) el.innerHTML = v;
  });
  const cur = document.querySelector('[data-lang-current]');
  if(cur) cur.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-opt').forEach(o=> o.classList.toggle('on', o.dataset.lang === lang));
}

/* ---------- Theme ---------- */
const THEME = {
  get(){ return document.documentElement.dataset.theme || localStorage.getItem('pc_theme') || 'light'; },
  set(v){ localStorage.setItem('pc_theme', v); document.documentElement.dataset.theme = v; updateThemeBtn(v); }
};
function updateThemeBtn(v){
  const b = document.querySelector('[data-theme-toggle]');
  if(b){ b.textContent = v === 'dark' ? '◑' : '◐'; b.title = v === 'dark' ? 'Tema claro' : 'Tema escuro'; }
}

/* ---------- Counter animation ---------- */
function animateCounter(el){
  const target = +el.dataset.target;
  const prefix = el.dataset.prefix || '';
  const dur = 1400, start = performance.now();
  const fmt = n => prefix + Math.round(n).toLocaleString('pt-BR');
  function tick(now){
    const p = Math.min(1, (now-start)/dur);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = fmt(target*eased);
    if(p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
  }
  requestAnimationFrame(tick);
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // build language menu
  const menu = document.querySelector('[data-lang-menu]');
  if(menu){
    menu.innerHTML = '<div class="lm-head">Idioma · Language · 语言</div>' +
      LANGS.map(([code,name])=>`<button class="lang-opt" data-lang="${code}"><span>${name}</span><span class="code">${code}</span></button>`).join('');
  }

  apply(LANG.get());
  updateThemeBtn(THEME.get());

  // language menu open/close
  const langBtn = document.querySelector('[data-lang-btn]');
  if(langBtn && menu){
    langBtn.addEventListener('click', e=>{ e.stopPropagation(); menu.classList.toggle('open'); });
    menu.addEventListener('click', e=> e.stopPropagation());
    document.addEventListener('click', ()=> menu.classList.remove('open'));
    menu.querySelectorAll('.lang-opt').forEach(o=>{
      o.addEventListener('click', ()=>{ LANG.set(o.dataset.lang); menu.classList.remove('open'); });
    });
  }

  // theme toggle
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if(themeBtn) themeBtn.addEventListener('click', ()=> THEME.set(THEME.get()==='dark' ? 'light' : 'dark'));

  // mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if(menuBtn && links) menuBtn.addEventListener('click', ()=> links.classList.toggle('open'));

  // counters
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !e.target.dataset.done){ e.target.dataset.done = '1'; animateCounter(e.target); }
    });
  }, {threshold:.4});
  document.querySelectorAll('[data-counter]').forEach(el=> io.observe(el));

  initDonate();
});

/* ---------- Donate widget ---------- */
function initDonate(){
  const widget = document.querySelector('[data-donate]');
  if(!widget) return;
  let amount = 50, freq = 'once', method = 'pix';

  const amtEls = widget.querySelectorAll('[data-amt]');
  const custom = widget.querySelector('[data-amt-custom]');
  const freqEls = widget.querySelectorAll('[data-freq]');
  const methodEls = widget.querySelectorAll('[data-method]');
  const impactLine = widget.querySelector('[data-impact-line]');
  const summary = widget.querySelector('[data-summary]');
  const live = widget.querySelector('[data-live-amount]');
  const liveFreq = widget.querySelector('[data-live-freq]');

  const impactText = (v)=>{
    const L = LANG.get(), en = L !== 'pt';
    if(v < 30) return en ? 'A week of internet for one student.' : 'Conexão de internet por uma semana para um aluno.';
    if(v < 80) return en ? 'One hour of an AI workshop at a public school.' : 'Uma hora de oficina de IA em uma escola pública.';
    if(v < 200) return en ? 'A month of AI access for a whole class.' : 'Um mês de acesso a IA para uma turma inteira.';
    return en ? 'A refurbished laptop for a community center.' : 'Um notebook recondicionado para um centro comunitário.';
  };

  const refresh = ()=>{
    const L = LANG.get();
    amtEls.forEach(b=> b.classList.toggle('sel', +b.dataset.amt === amount));
    freqEls.forEach(b=> b.classList.toggle('sel', b.dataset.freq === freq));
    methodEls.forEach(b=> b.classList.toggle('sel', b.dataset.method === method));
    if(impactLine) impactLine.textContent = impactText(amount);
    if(live) live.textContent = 'R$ ' + amount.toLocaleString('pt-BR');
    if(liveFreq) liveFreq.textContent = freq==='monthly' ? (L==='pt'?'/mês':'/mo') : '';
    if(summary){
      const per = freq==='monthly' ? (L==='pt'?'/mês':'/mo') : '';
      summary.textContent = `R$ ${amount.toLocaleString('pt-BR')}${per} → 100% ${t(L,'donate.passed')||'passed on'}`;
    }
  };
  window.__pcDonateRefresh = refresh;

  amtEls.forEach(b=> b.addEventListener('click', ()=>{ amount = +b.dataset.amt; if(custom) custom.value=''; refresh(); }));
  if(custom) custom.addEventListener('input', ()=>{ const v=parseInt(custom.value,10); if(!isNaN(v)&&v>0){ amount=v; amtEls.forEach(x=>x.classList.remove('sel')); refresh(); } });
  freqEls.forEach(b=> b.addEventListener('click', ()=>{ freq=b.dataset.freq; refresh(); }));
  methodEls.forEach(b=> b.addEventListener('click', ()=>{ method=b.dataset.method; widget.dataset.method=method; refresh(); }));
  refresh();
}
