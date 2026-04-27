/* ===== MULTI-LANGUAGE TRANSLATION ENGINE ===== */

// ===== TRANSLATION DICTIONARY =====
const translations = {
  // NAVIGATION
  'nav.home': { en: 'Home', zh: '首页', hi: 'होम', es: 'Inicio', fr: 'Accueil', ar: 'الرئيسية', bn: 'হোম', pt: 'Início', ru: 'Главная', ja: 'ホーム' },
  'nav.about': { en: 'About', zh: '关于', hi: 'परिचय', es: 'Sobre mí', fr: 'À propos', ar: 'حولي', bn: 'পরিচয়', pt: 'Sobre', ru: 'Обо мне', ja: '自己紹介' },
  'nav.skills': { en: 'Skills', zh: '技能', hi: 'कौशल', es: 'Habilidades', fr: 'Compétences', ar: 'المهارات', bn: 'দক্ষতা', pt: 'Habilidades', ru: 'Навыки', ja: 'スキル' },
  'nav.tools': { en: 'Tools', zh: '工具', hi: 'उपकरण', es: 'Herramientas', fr: 'Outils', ar: 'الأدوات', bn: 'টুলস', pt: 'Ferramentas', ru: 'Инструменты', ja: 'ツール' },
  'nav.projects': { en: 'Projects', zh: '项目', hi: 'परियोजनाएं', es: 'Proyectos', fr: 'Projets', ar: 'المشاريع', bn: 'প্রকল্প', pt: 'Projetos', ru: 'Проекты', ja: 'プロジェクト' },
  'nav.certificates': { en: 'Certificates', zh: '证书', hi: 'प्रमाणपत्र', es: 'Certificados', fr: 'Certificats', ar: 'الشهادات', bn: 'সার্টিফিকেট', pt: 'Certificados', ru: 'Сертификаты', ja: '証明書' },
  'nav.blog': { en: 'Blog', zh: '博客', hi: 'ब्लॉग', es: 'Blog', fr: 'Blog', ar: 'المدونة', bn: 'ব্লগ', pt: 'Blog', ru: 'Блог', ja: 'ブログ' },
  'nav.contact': { en: 'Contact', zh: '联系', hi: 'संपर्क', es: 'Contacto', fr: 'Contact', ar: 'تواصل', bn: 'যোগাযোগ', pt: 'Contato', ru: 'Контакт', ja: 'お問い合わせ' },

  // HOME PAGE
  'home.greeting': { en: "Hello, I'm", zh: '你好，我是', hi: 'नमस्ते, मैं हूं', es: 'Hola, soy', fr: 'Bonjour, je suis', ar: 'مرحباً، أنا', bn: 'হ্যালো, আমি', pt: 'Olá, eu sou', ru: 'Привет, я', ja: 'こんにちは、私は' },
  'home.subtitle': { en: 'Blockchain Researcher & Computer Science Student', zh: '区块链研究员与计算机科学学生', hi: 'ब्लॉकचेन शोधकर्ता और कम्प्यूटर विज्ञान छात्र', es: 'Investigador en Blockchain y Estudiante de Ciencias de la Computación', fr: 'Chercheur en Blockchain et Étudiant en Informatique', ar: 'باحث في البلوكتشين وطالب علوم الحاسب', bn: 'ব্লকচেইন গবেষক ও কম্পিউটার বিজ্ঞান ছাত্র', pt: 'Pesquisador em Blockchain e Estudante de Ciência da Computação', ru: 'Исследователь блокчейна и студент компьютерных наук', ja: 'ブロックチェーン研究者・コンピュータサイエンス学生' },
  'home.description': { en: 'Computer Science & Technology researcher at NJUPT specializing in blockchain-enabled UAV systems, secure spectrum management, and decentralized solutions for next-generation aerial networks.', zh: 'NJUPT计算机科学与技术研究员，专注于区块链赋能无人机系统、安全频谱管理及下一代空中网络的去中心化解决方案。', hi: 'NJUPT में कंप्यूटर विज्ञान एवं प्रौद्योगिकी शोधकर्ता, ब्लॉकचेन-सक्षम UAV प्रणाली, सुरक्षित स्पेक्ट्रम प्रबंधन और अगली पीढ़ी के नेटवर्क में विशेषज्ञ।', es: 'Investigador en Ciencias de la Computación en NJUPT, especializado en sistemas UAV habilitados por blockchain, gestión segura del espectro y soluciones descentralizadas para redes aéreas de próxima generación.', fr: "Chercheur en Sciences Informatiques à l'NJUPT, spécialisé dans les systèmes UAV basés sur la blockchain, la gestion sécurisée du spectre et les solutions décentralisées pour les réseaux aériens de prochaine génération.", ar: 'باحث في علوم الحاسب في NJUPT، متخصص في أنظمة الطائرات المسيّرة المدعومة بالبلوكتشين وإدارة الطيف الآمن والحلول اللامركزية للشبكات الجوية من الجيل القادم.', bn: 'NJUPT-এ কম্পিউটার বিজ্ঞান গবেষক, ব্লকচেইন-সক্ষম UAV সিস্টেম, নিরাপদ স্পেকট্রাম ব্যবস্থাপনা এবং পরবর্তী প্রজন্মের নেটওয়ার্কের জন্য বিকেন্দ্রীভূত সমাধানে বিশেষজ্ঞ।', pt: 'Pesquisador em Ciência da Computação na NJUPT, especializado em sistemas UAV baseados em blockchain, gestão segura de espectro e soluções descentralizadas para redes aéreas de próxima geração.', ru: 'Исследователь в области компьютерных наук в NJUPT, специализирующийся на системах БПЛА на основе блокчейна, безопасном управлении спектром и децентрализованных решениях для воздушных сетей нового поколения.', ja: 'NJUPTのコンピュータサイエンス研究者。ブロックチェーン対応UAVシステム、安全なスペクトル管理、次世代航空ネットワークの分散型ソリューションを専門とする。' },
  'home.downloadResume': { en: 'Download Resume', zh: '下载简历', hi: 'रेज़्यूमे डाउनलोड करें', es: 'Descargar CV', fr: 'Télécharger CV', ar: 'تحميل السيرة الذاتية', bn: 'রেজুমে ডাউনলোড', pt: 'Baixar Currículo', ru: 'Скачать резюме', ja: '履歴書をダウンロード' },
  'home.contactMe': { en: 'Contact Me', zh: '联系我', hi: 'संपर्क करें', es: 'Contáctame', fr: 'Me contacter', ar: 'تواصل معي', bn: 'যোগাযোগ করুন', pt: 'Entre em contato', ru: 'Связаться', ja: 'お問い合わせ' },

  // ABOUT HOME SECTION (index.html)
  'about.getToKnow': { en: 'Get To Know', zh: '了解我', hi: 'मुझे जानें', es: 'Conóceme', fr: 'Apprenez à me connaître', ar: 'تعرّف عليّ', bn: 'আমাকে জানুন', pt: 'Conheça-me', ru: 'Обо мне', ja: '自己紹介' },
  'about.title': { en: 'About Me', zh: '关于我', hi: 'मेरे बारे में', es: 'Sobre mí', fr: 'À propos de moi', ar: 'عنّي', bn: 'আমার সম্পর্কে', pt: 'Sobre mim', ru: 'Обо мне', ja: '自己紹介' },
  'about.location': { en: 'Location', zh: '所在地', hi: 'स्थान', es: 'Ubicación', fr: 'Emplacement', ar: 'الموقع', bn: 'অবস্থান', pt: 'Localização', ru: 'Местоположение', ja: '所在地' },
  'about.originBangladesh': { en: 'Originally from Bangladesh', zh: '来自孟加拉国', hi: 'मूलतः बांग्लादेश से', es: 'Originalmente de Bangladesh', fr: 'Originaire du Bangladesh', ar: 'أصله من بنغلاديش', bn: 'মূলত বাংলাদেশ থেকে', pt: 'Originalmente do Bangladesh', ru: 'Родом из Бангладеш', ja: 'バングラデシュ出身' },
  'about.education': { en: 'Education', zh: '教育背景', hi: 'शिक्षा', es: 'Educación', fr: 'Formation', ar: 'التعليم', bn: 'শিক্ষা', pt: 'Educação', ru: 'Образование', ja: '学歴' },
  'about.researchFocus': { en: 'Research Focus', zh: '研究方向', hi: 'अनुसंधान क्षेत्र', es: 'Área de Investigación', fr: 'Domaine de Recherche', ar: 'مجال البحث', bn: 'গবেষণার ক্ষেত্র', pt: 'Foco de Pesquisa', ru: 'Научные интересы', ja: '研究分野' },
  'about.subtitleText': { en: 'Blockchain Researcher & Computer Science Student', zh: '区块链研究员与计算机科学学生', hi: 'ब्लॉकचेन शोधकर्ता और कम्प्यूटर विज्ञान छात्र', es: 'Investigador en Blockchain y Estudiante de CS', fr: 'Chercheur en Blockchain et Étudiant en Informatique', ar: 'باحث في البلوكتشين وطالب علوم الحاسب', bn: 'ব্লকচেইন গবেষক ও কম্পিউটার বিজ্ঞান ছাত্র', pt: 'Pesquisador em Blockchain e Estudante de CS', ru: 'Исследователь блокчейна и студент КН', ja: 'ブロックチェーン研究者・CS学生' },
  'about.aboutPara1': { en: "I'm Muntasir Al Mamun, a Computer Science & Technology researcher at Nanjing University of Posts and Telecommunications (NJUPT) with a strong academic record (GPA: 4.23/5.0). My research focuses on the intersection of blockchain technology and Unmanned Aerial Vehicle (UAV) systems, developing secure, decentralized solutions for next-generation aerial networks and spectrum management.", zh: '我是Muntasir Al Mamun，南京邮电大学（NJUPT）计算机科学与技术研究人员，学业成绩优异（GPA: 4.23/5.0）。我的研究聚焦于区块链技术与无人机系统的交叉领域，为下一代空中网络及频谱管理开发安全的去中心化解决方案。', hi: 'मैं Muntasir Al Mamun हूं, नानजिंग यूनिवर्सिटी ऑफ पोस्ट्स एंड टेलीकम्युनिकेशंस (NJUPT) में कंप्यूटर विज्ञान एवं प्रौद्योगिकी शोधकर्ता (GPA: 4.23/5.0)। मेरा शोध ब्लॉकचेन तकनीक और UAV प्रणाली के संगम पर, अगली पीढ़ी के नेटवर्क के लिए सुरक्षित विकेन्द्रीकृत समाधान विकसित करने पर केंद्रित है।', es: 'Soy Muntasir Al Mamun, investigador de Ciencias de la Computación en NJUPT con un excelente expediente académico (GPA: 4.23/5.0). Mi investigación se centra en la intersección de la tecnología blockchain y los sistemas UAV, desarrollando soluciones seguras y descentralizadas para redes aéreas de próxima generación.', fr: "Je suis Muntasir Al Mamun, chercheur en Sciences Informatiques à l'NJUPT avec un excellent parcours académique (GPA : 4.23/5.0). Ma recherche porte sur l'intersection de la technologie blockchain et des systèmes UAV, développant des solutions sécurisées et décentralisées pour les réseaux aériens de prochaine génération.", ar: 'أنا Muntasir Al Mamun، باحث في علوم الحاسب في جامعة نانجينغ للبريد والاتصالات (NJUPT) بمعدل تراكمي 4.23/5.0. يركز بحثي على تقاطع تقنية البلوكتشين وأنظمة الطائرات المسيّرة، مطوّرًا حلولًا آمنة ولامركزية لشبكات الجيل القادم.', bn: 'আমি Muntasir Al Mamun, নানজিং ইউনিভার্সিটি অব পোস্টস অ্যান্ড টেলিকমিউনিকেশনস (NJUPT)-এ কম্পিউটার বিজ্ঞান গবেষক (GPA: 4.23/5.0)। আমার গবেষণা ব্লকচেইন প্রযুক্তি এবং UAV সিস্টেমের ছেদবিন্দুতে, পরবর্তী প্রজন্মের নেটওয়ার্কের জন্য নিরাপদ বিকেন্দ্রীভূত সমাধান তৈরিতে কেন্দ্রীভূত।', pt: 'Sou Muntasir Al Mamun, pesquisador de Ciência da Computação na NJUPT com um excelente histórico acadêmico (GPA: 4.23/5.0). Minha pesquisa foca na interseção da tecnologia blockchain e sistemas UAV, desenvolvendo soluções seguras e descentralizadas para redes aéreas de próxima geração.', ru: 'Я Muntasir Al Mamun, исследователь в области компьютерных наук в NJUPT с отличными академическими показателями (GPA: 4.23/5.0). Моё исследование сосредоточено на пересечении технологии блокчейн и систем БПЛА, разрабатывая безопасные децентрализованные решения для воздушных сетей нового поколения.', ja: '私はMuntasir Al Mamunです。NJUPT（南京郵電大学）のコンピュータサイエンス研究者で、優秀な学業成績（GPA: 4.23/5.0）を持ちます。私の研究はブロックチェーン技術とUAVシステムの交差点に焦点を当て、次世代航空ネットワークのための安全な分散型ソリューションを開発しています。' },
  'about.aboutPara2': { en: "Currently working on designing and implementing UAV authentication systems using Proof-of-History blockchain technology, with published research in Springer Nature and Blockchain Journal. I'm passionate about advancing blockchain-enabled UAV communications, spectrum security in 6G networks, and smart contract development for aerial systems.", zh: '目前致力于基于历史证明（Proof-of-History）区块链技术设计和实现UAV认证系统，研究成果已发表于施普林格自然和区块链期刊。热衷于推进区块链赋能无人机通信、6G频谱安全及空中系统智能合约开发。', hi: 'वर्तमान में प्रूफ-ऑफ-हिस्ट्री ब्लॉकचेन तकनीक का उपयोग करके UAV प्रमाणीकरण प्रणाली डिजाइन और कार्यान्वित करने पर कार्यरत, स्प्रिंगर नेचर और ब्लॉकचेन जर्नल में शोध प्रकाशित। 6G नेटवर्क में ब्लॉकचेन-सक्षम UAV संचार को आगे बढ़ाने के प्रति उत्साही।', es: 'Actualmente trabajando en el diseño e implementación de sistemas de autenticación UAV usando la tecnología blockchain Proof-of-History, con investigaciones publicadas en Springer Nature y Blockchain Journal. Apasionado por avanzar en las comunicaciones UAV habilitadas por blockchain.', fr: "Actuellement en train de concevoir et d'implémenter des systèmes d'authentification UAV utilisant la technologie blockchain Proof-of-History, avec des recherches publiées dans Springer Nature et Blockchain Journal. Passionné par l'avancement des communications UAV basées sur la blockchain.", ar: 'يعمل حالياً على تصميم وتنفيذ أنظمة مصادقة الطائرات المسيّرة باستخدام تقنية بلوكتشين إثبات التاريخ، مع أبحاث منشورة في Springer Nature وBlockchain Journal. شغوف بتطوير اتصالات الطائرات المسيّرة المدعومة بالبلوكتشين.', bn: 'বর্তমানে Proof-of-History ব্লকচেইন প্রযুক্তি ব্যবহার করে UAV প্রমাণীকরণ সিস্টেম ডিজাইন ও বাস্তবায়নে কাজ করছেন, Springer Nature এবং Blockchain Journal-এ গবেষণা প্রকাশিত। 6G নেটওয়ার্কে ব্লকচেইন-সক্ষম যোগাযোগ এগিয়ে নিতে আগ্রহী।', pt: 'Atualmente trabalhando no design e implementação de sistemas de autenticação UAV usando a tecnologia blockchain Proof-of-History, com pesquisas publicadas na Springer Nature e Blockchain Journal. Apaixonado por avançar as comunicações UAV habilitadas por blockchain.', ru: 'В настоящее время работает над проектированием систем аутентификации БПЛА с использованием технологии Proof-of-History, с опубликованными исследованиями в Springer Nature и Blockchain Journal. Увлечён развитием блокчейн-коммуникаций для БПЛА.', ja: '現在、Proof-of-Historyブロックチェーン技術を用いたUAV認証システムの設計・実装に取り組み、Springer NatureとBlockchain Journalに研究を発表しています。UAVのブロックチェーン通信の発展に情熱を持っています。' },
  'about.learnMore': { en: 'Learn More About Me', zh: '了解更多', hi: 'मेरे बारे में और जानें', es: 'Saber más sobre mí', fr: 'En savoir plus sur moi', ar: 'تعرّف أكثر عليّ', bn: 'আমার সম্পর্কে আরও জানুন', pt: 'Saiba mais sobre mim', ru: 'Узнать больше обо мне', ja: 'もっと詳しく' },

  // CONTACT SECTION
  'contact.getInTouch': { en: 'Get in Touch', zh: '与我联系', hi: 'संपर्क करें', es: 'Ponerse en Contacto', fr: 'Entrer en Contact', ar: 'تواصل معي', bn: 'যোগাযোগ করুন', pt: 'Entre em Contato', ru: 'Свяжитесь со мной', ja: 'お問い合わせ' },
  'contact.title': { en: 'Contact Me', zh: '联系我', hi: 'मुझसे संपर्क करें', es: 'Contáctame', fr: 'Me Contacter', ar: 'تواصل معي', bn: 'আমাকে যোগাযোগ করুন', pt: 'Entre em Contato', ru: 'Связаться', ja: 'お問い合わせ' },
  'contact.nameLabel': { en: 'Name', zh: '姓名', hi: 'नाम', es: 'Nombre', fr: 'Nom', ar: 'الاسم', bn: 'নাম', pt: 'Nome', ru: 'Имя', ja: '名前' },
  'contact.emailLabel': { en: 'Email', zh: '邮箱', hi: 'ईमेल', es: 'Correo electrónico', fr: 'Email', ar: 'البريد الإلكتروني', bn: 'ইমেইল', pt: 'Email', ru: 'Электронная почта', ja: 'メール' },
  'contact.messageLabel': { en: 'Message', zh: '留言', hi: 'संदेश', es: 'Mensaje', fr: 'Message', ar: 'الرسالة', bn: 'বার্তা', pt: 'Mensagem', ru: 'Сообщение', ja: 'メッセージ' },
  'contact.namePlaceholder': { en: 'Your Name', zh: '你的姓名', hi: 'आपका नाम', es: 'Tu nombre', fr: 'Votre nom', ar: 'اسمك', bn: 'আপনার নাম', pt: 'Seu nome', ru: 'Ваше имя', ja: 'お名前' },
  'contact.messagePlaceholder': { en: 'Your message…', zh: '你的留言…', hi: 'आपका संदेश…', es: 'Tu mensaje…', fr: 'Votre message…', ar: 'رسالتك…', bn: 'আপনার বার্তা…', pt: 'Sua mensagem…', ru: 'Ваше сообщение…', ja: 'メッセージ…' },
  'contact.sendMessage': { en: 'Send Message', zh: '发送消息', hi: 'संदेश भेजें', es: 'Enviar Mensaje', fr: 'Envoyer', ar: 'إرسال', bn: 'বার্তা পাঠান', pt: 'Enviar', ru: 'Отправить', ja: '送信する' },

  // COMMON
  'common.backToHome': { en: '← Back to Home', zh: '← 返回首页', hi: '← वापस होम', es: '← Volver al inicio', fr: "← Retour à l'accueil", ar: 'الرئيسية ←', bn: '← হোম এ ফিরুন', pt: '← Voltar ao início', ru: '← На главную', ja: '← ホームへ戻る' },
  'common.copyright': { en: 'Copyright © 2026 Muntasir Al Mamun. All Rights Reserved', zh: '版权所有 © 2026 Muntasir Al Mamun。保留所有权利', hi: 'कॉपीराइट © 2026 Muntasir Al Mamun। सर्वाधिकार सुरक्षित', es: 'Copyright © 2026 Muntasir Al Mamun. Todos los derechos reservados', fr: 'Copyright © 2026 Muntasir Al Mamun. Tous droits réservés', ar: 'حقوق النشر © 2026 Muntasir Al Mamun. جميع الحقوق محفوظة', bn: 'কপিরাইট © 2026 Muntasir Al Mamun। সর্বস্বত্ব সংরক্ষিত', pt: 'Copyright © 2026 Muntasir Al Mamun. Todos os direitos reservados', ru: 'Copyright © 2026 Muntasir Al Mamun. Все права защищены', ja: 'Copyright © 2026 Muntasir Al Mamun. All Rights Reserved' },
  'common.skipLink': { en: 'Skip to main content', zh: '跳转到主要内容', hi: 'मुख्य सामग्री पर जाएं', es: 'Saltar al contenido principal', fr: 'Aller au contenu principal', ar: 'تخطى إلى المحتوى الرئيسي', bn: 'মূল বিষয়বস্তুতে যান', pt: 'Pular para o conteúdo principal', ru: 'Перейти к основному содержанию', ja: 'メインコンテンツへ' },
  'common.toggleTheme': { en: 'Toggle theme', zh: '切换主题', hi: 'थीम बदलें', es: 'Cambiar tema', fr: 'Changer de thème', ar: 'تبديل المظهر', bn: 'থিম পরিবর্তন', pt: 'Alternar tema', ru: 'Сменить тему', ja: 'テーマ切替' },
  'common.scanWeChat': { en: 'Scan to add on WeChat', zh: '扫码添加微信', hi: 'WeChat पर जोड़ने के लिए स्कैन करें', es: 'Escanear para agregar en WeChat', fr: 'Scanner pour ajouter sur WeChat', ar: 'امسح لإضافة على WeChat', bn: 'WeChat-এ যোগ করতে স্ক্যান করুন', pt: 'Escanear para adicionar no WeChat', ru: 'Сканировать для добавления в WeChat', ja: 'WeChatに追加するにはスキャン' },

  // ABOUT PAGE SPECIFIC
  'about.getToKnowMore': { en: 'Get To Know More', zh: '更多了解我', hi: 'और जानें', es: 'Conóceme Más', fr: 'En Savoir Plus', ar: 'تعرّف أكثر', bn: 'আরও জানুন', pt: 'Conheça-me Melhor', ru: 'Узнать больше', ja: 'もっと詳しく' },
  'about.aboutIntro': { en: 'Computer Science & Technology researcher specializing in blockchain-enabled UAV systems, with a passion for advancing secure, decentralized solutions for next-generation aerial networks.', zh: '计算机科学与技术研究员，专注于区块链赋能无人机系统，致力于推进下一代空中网络的安全去中心化解决方案。', hi: 'कंप्यूटर विज्ञान एवं प्रौद्योगिकी शोधकर्ता, ब्लॉकचेन-सक्षम UAV प्रणाली में विशेषज्ञता, अगली पीढ़ी के नेटवर्क के लिए सुरक्षित विकेन्द्रीकृत समाधान आगे बढ़ाने के प्रति जुनूनी।', es: 'Investigador en Ciencias de la Computación especializado en sistemas UAV habilitados por blockchain, con pasión por avanzar en soluciones seguras y descentralizadas para redes aéreas de próxima generación.', fr: 'Chercheur en Sciences Informatiques spécialisé dans les systèmes UAV basés sur la blockchain, passionné par les solutions sécurisées et décentralisées pour les réseaux aériens de prochaine génération.', ar: 'باحث في علوم الحاسب متخصص في أنظمة الطائرات المسيّرة المدعومة بالبلوكتشين، شغوف بتطوير حلول آمنة ولامركزية لشبكات الجيل القادم.', bn: 'কম্পিউটার বিজ্ঞান গবেষক, ব্লকচেইন-সক্ষম UAV সিস্টেমে বিশেষজ্ঞ, পরবর্তী প্রজন্মের নেটওয়ার্কের জন্য নিরাপদ বিকেন্দ্রীভূত সমাধান অগ্রসর করতে আগ্রহী।', pt: 'Pesquisador em Ciência da Computação especializado em sistemas UAV habilitados por blockchain, apaixonado por avançar soluções seguras e descentralizadas para redes aéreas de próxima geração.', ru: 'Исследователь в области компьютерных наук, специализирующийся на системах БПЛА на основе блокчейна, увлечённый разработкой безопасных децентрализованных решений для воздушных сетей нового поколения.', ja: 'ブロックチェーン対応UAVシステムを専門とするコンピュータサイエンス研究者。次世代航空ネットワーク向けの安全な分散型ソリューションの発展に情熱を持つ。' },
  'about.publications': { en: 'Publications', zh: '发表论文', hi: 'प्रकाशन', es: 'Publicaciones', fr: 'Publications', ar: 'المنشورات', bn: 'প্রকাশনা', pt: 'Publicações', ru: 'Публикации', ja: '発表論文' },
  'about.publishedPapers': { en: '2 Published Papers', zh: '2篇已发表论文', hi: '2 प्रकाशित शोध-पत्र', es: '2 artículos publicados', fr: '2 articles publiés', ar: 'ورقتان منشورتان', bn: '২টি প্রকাশিত গবেষণাপত্র', pt: '2 artigos publicados', ru: '2 опубликованных статьи', ja: '2本の発表論文' },
  'about.academicWork': { en: 'Academic Work', zh: '学术成果', hi: 'शैक्षणिक कार्य', es: 'Trabajo Académico', fr: 'Travaux Académiques', ar: 'الأعمال الأكاديمية', bn: 'একাডেমিক কাজ', pt: 'Trabalho Acadêmico', ru: 'Академическая работа', ja: '学術研究' },
  'about.researchAndPubs': { en: 'Research & Publications', zh: '研究与发表', hi: 'अनुसंधान और प्रकाशन', es: 'Investigación y Publicaciones', fr: 'Recherche et Publications', ar: 'البحث والمنشورات', bn: 'গবেষণা ও প্রকাশনা', pt: 'Pesquisa e Publicações', ru: 'Исследования и Публикации', ja: '研究と発表' },
  'about.thesis': { en: 'Thesis', zh: '毕业论文', hi: 'थीसिस', es: 'Tesis', fr: 'Thèse', ar: 'رسالة التخرج', bn: 'গবেষণামূলক প্রবন্ধ', pt: 'Dissertação', ru: 'Диссертация', ja: '学位論文' },
  'about.activeResearch': { en: 'Active Research Project', zh: '进行中的研究项目', hi: 'सक्रिय शोध परियोजना', es: 'Proyecto de Investigación Activo', fr: 'Projet de Recherche Actif', ar: 'مشروع بحثي نشط', bn: 'সক্রিয় গবেষণা প্রকল্প', pt: 'Projeto de Pesquisa Ativo', ru: 'Текущий Исследовательский Проект', ja: '進行中の研究プロジェクト' },
  'about.publishedPapersTitle': { en: 'Published Papers', zh: '已发表论文', hi: 'प्रकाशित शोध-पत्र', es: 'Artículos Publicados', fr: 'Articles Publiés', ar: 'الأوراق المنشورة', bn: 'প্রকাশিত গবেষণাপত্র', pt: 'Artigos Publicados', ru: 'Опубликованные Статьи', ja: '発表論文' },
  'about.academicRecord': { en: 'Academic Record', zh: '学术记录', hi: 'शैक्षणिक रिकॉर्ड', es: 'Expediente Académico', fr: 'Dossier Académique', ar: 'السجل الأكاديمي', bn: 'একাডেমিক রেকর্ড', pt: 'Histórico Acadêmico', ru: 'Академическая успеваемость', ja: '学歴記録' },
  'about.educationHonors': { en: 'Education & Honors', zh: '教育与荣誉', hi: 'शिक्षा और सम्मान', es: 'Educación y Honores', fr: 'Éducation et Honneurs', ar: 'التعليم والتكريم', bn: 'শিক্ষা ও সম্মাননা', pt: 'Educação e Honras', ru: 'Образование и Награды', ja: '学歴と受賞' },
  'about.community': { en: 'Community', zh: '社区', hi: 'समुदाय', es: 'Comunidad', fr: 'Communauté', ar: 'المجتمع', bn: 'কমিউনিটি', pt: 'Comunidade', ru: 'Сообщество', ja: 'コミュニティ' },
  'about.leadershipEngagement': { en: 'Leadership & Engagement', zh: '领导力与参与', hi: 'नेतृत्व और सहभागिता', es: 'Liderazgo y Compromiso', fr: 'Leadership et Engagement', ar: 'القيادة والانخراط', bn: 'নেতৃত্ব ও অংশগ্রহণ', pt: 'Liderança e Engajamento', ru: 'Лидерство и Участие', ja: 'リーダーシップと参加' },
  'about.expertise': { en: 'Expertise', zh: '专业知识', hi: 'विशेषज्ञता', es: 'Experiencia', fr: 'Expertise', ar: 'الخبرة', bn: 'বিশেষজ্ঞতা', pt: 'Expertise', ru: 'Экспертиза', ja: '専門知識' },
  'about.technicalSkills': { en: 'Technical Skills', zh: '技术技能', hi: 'तकनीकी कौशल', es: 'Habilidades Técnicas', fr: 'Compétences Techniques', ar: 'المهارات التقنية', bn: 'প্রযুক্তিগত দক্ষতা', pt: 'Habilidades Técnicas', ru: 'Технические Навыки', ja: '技術スキル' },
  'about.getInTouch': { en: 'Get In Touch', zh: '与我联系', hi: 'मुझसे संपर्क करें', es: 'Contáctame', fr: 'Me Contacter', ar: 'تواصل معي', bn: 'যোগাযোগ করুন', pt: 'Entre em Contato', ru: 'Связаться', ja: '連絡する' },
  'about.letsConnect': { en: "Let's Connect", zh: '让我们联系', hi: 'जुड़ें', es: 'Conectémonos', fr: 'Connectons-nous', ar: 'لنتواصل', bn: 'যুক্ত হই', pt: 'Vamos nos Conectar', ru: 'Давайте свяжемся', ja: 'つながりましょう' },
  'about.connectDesc': { en: "I'm always eager to collaborate on innovative research, discuss blockchain applications in UAV systems, or explore opportunities in decentralized technologies. Feel free to reach out!", zh: '我随时乐于在创新研究上展开合作、探讨区块链在无人机系统中的应用，或在去中心化技术领域寻求机遇。欢迎随时联系！', hi: 'मैं हमेशा नवीन शोध में सहयोग करने, UAV प्रणाली में ब्लॉकचेन पर चर्चा करने, या विकेन्द्रीकृत प्रौद्योगिकियों में अवसर तलाशने के लिए उत्सुक रहता हूं। बेझिझक संपर्क करें!', es: '¡Siempre estoy dispuesto a colaborar en investigaciones innovadoras, discutir aplicaciones de blockchain en sistemas UAV o explorar oportunidades en tecnologías descentralizadas. ¡No dudes en contactarme!', fr: "Je suis toujours prêt à collaborer sur des recherches innovantes, à discuter des applications de la blockchain dans les systèmes UAV ou à explorer des opportunités dans les technologies décentralisées. N'hésitez pas à me contacter !", ar: 'أنا دائماً متحمس للتعاون في الأبحاث المبتكرة ومناقشة تطبيقات البلوكتشين في الطائرات المسيّرة أو استكشاف الفرص في اللامركزية. لا تتردد في التواصل!', bn: 'আমি সবসময় উদ্ভাবনী গবেষণায় সহযোগিতা করতে, UAV-এ ব্লকচেইনের প্রয়োগ নিয়ে আলোচনা করতে বা বিকেন্দ্রীভূত প্রযুক্তিতে সুযোগ অন্বেষণ করতে আগ্রহী। নির্দ্বিধায় যোগাযোগ করুন!', pt: 'Estou sempre ansioso para colaborar em pesquisas inovadoras, discutir aplicações de blockchain em sistemas UAV ou explorar oportunidades em tecnologias descentralizadas. Sinta-se à vontade para entrar em contato!', ru: 'Я всегда готов к сотрудничеству в области инновационных исследований, обсуждению применений блокчейна в системах БПЛА или изучению возможностей децентрализованных технологий. Не стесняйтесь связаться!', ja: '革新的な研究でのコラボレーション、UAVシステムにおけるブロックチェーンの応用についての議論、または分散型技術の機会探索など、いつでも喜んでお応えします。お気軽にご連絡ください！' },
  'about.connectWeChat': { en: 'Connect on WeChat', zh: '在微信上联系', hi: 'WeChat पर जुड़ें', es: 'Conectar en WeChat', fr: 'Se connecter sur WeChat', ar: 'التواصل عبر WeChat', bn: 'WeChat-এ যুক্ত হন', pt: 'Conectar no WeChat', ru: 'Связаться через WeChat', ja: 'WeChatでつながる' },
  'about.basedInChina': { en: 'Based in China', zh: '目前在中国', hi: 'चीन में स्थित', es: 'Basado en China', fr: 'Basé en Chine', ar: 'مقيم في الصين', bn: 'চীনে অবস্থিত', pt: 'Baseado na China', ru: 'Нахожусь в Китае', ja: '中国在住' },
  'about.scanWeChatDesc': { en: "Scan the QR code to add me on WeChat — I'm currently based in Nanjing, China.", zh: '扫描二维码添加我的微信——我目前在中国南京。', hi: 'WeChat पर मुझे जोड़ने के लिए QR कोड स्कैन करें — मैं वर्तमान में नानजिंग, चीन में हूं।', es: 'Escanea el código QR para agregarme en WeChat — actualmente estoy en Nanjing, China.', fr: "Scannez le code QR pour m'ajouter sur WeChat — je suis actuellement basé à Nanjing, en Chine.", ar: 'امسح رمز QR لإضافتي على WeChat — أنا حاليًا في نانجينغ، الصين.', bn: 'WeChat-এ আমাকে যোগ করতে QR কোড স্ক্যান করুন — আমি বর্তমানে নানজিং, চীনে আছি।', pt: 'Escaneie o código QR para me adicionar no WeChat — atualmente estou em Nanjing, China.', ru: 'Отсканируйте QR-код, чтобы добавить меня в WeChat — я сейчас нахожусь в Нанкине, Китай.', ja: 'QRコードをスキャンしてWeChatに追加してください — 現在は中国南京に在住しています。' },

  // SKILLS PAGE
  'skills.exploreMy': { en: 'Explore My', zh: '探索我的', hi: 'जानें मेरी', es: 'Explora mis', fr: 'Découvrez mes', ar: 'استكشف', bn: 'জানুন আমার', pt: 'Explore minhas', ru: 'Мои', ja: '私の' },
  'skills.technicalSkillsTitle': { en: 'Technical Skills', zh: '技术技能', hi: 'तकनीकी कौशल', es: 'Habilidades Técnicas', fr: 'Compétences Techniques', ar: 'المهارات التقنية', bn: 'প্রযুক্তিগত দক্ষতা', pt: 'Habilidades Técnicas', ru: 'Технические Навыки', ja: '技術スキル' },
  'skills.intro': { en: "A comprehensive overview of my technical expertise in blockchain development, UAV systems, programming languages, and tools that I've mastered throughout my research and studies.", zh: '关于我在区块链开发、无人机系统、编程语言和工具方面技术专长的全面概述，这些都是我在研究和学习过程中掌握的。', hi: 'ब्लॉकचेन विकास, UAV सिस्टम, प्रोग्रामिंग भाषाओं और उपकरणों में मेरी तकनीकी विशेषज्ञता का व्यापक अवलोकन।', es: 'Una visión integral de mi experiencia técnica en desarrollo blockchain, sistemas UAV, lenguajes de programación y herramientas que he dominado a lo largo de mi investigación y estudios.', fr: "Un aperçu complet de mon expertise technique en développement blockchain, systèmes UAV, langages de programmation et outils que j'ai maîtrisés tout au long de mes recherches et études.", ar: 'نظرة شاملة على خبرتي التقنية في تطوير البلوكتشين وأنظمة الطائرات المسيّرة ولغات البرمجة والأدوات التي أتقنتها.', bn: 'ব্লকচেইন ডেভেলপমেন্ট, UAV সিস্টেম, প্রোগ্রামিং ভাষা এবং সরঞ্জামে আমার প্রযুক্তিগত দক্ষতার একটি ব্যাপক সংক্ষিপ্তসার।', pt: 'Uma visão abrangente da minha expertise técnica em desenvolvimento blockchain, sistemas UAV, linguagens de programação e ferramentas que dominei ao longo da minha pesquisa e estudos.', ru: 'Всестороннее представление технического опыта в разработке блокчейна, системах БПЛА, языках программирования и инструментах, освоенных в ходе исследований и учёбы.', ja: 'ブロックチェーン開発、UAVシステム、プログラミング言語、ツールに関する技術的専門知識の包括的な概要。研究と学習を通じて習得しました。' },
  'skills.blockchainDev': { en: 'Blockchain Development', zh: '区块链开发', hi: 'ब्लॉकचेन विकास', es: 'Desarrollo Blockchain', fr: 'Développement Blockchain', ar: 'تطوير البلوكتشين', bn: 'ব্লকচেইন ডেভেলপমেন্ট', pt: 'Desenvolvimento Blockchain', ru: 'Разработка Blockchain', ja: 'ブロックチェーン開発' },
  'skills.uavSimulation': { en: 'UAV & Simulation', zh: '无人机与仿真', hi: 'UAV और सिमुलेशन', es: 'UAV y Simulación', fr: 'UAV et Simulation', ar: 'الطائرات المسيّرة والمحاكاة', bn: 'UAV ও সিমুলেশন', pt: 'UAV e Simulação', ru: 'БПЛА и Симуляция', ja: 'UAVとシミュレーション' },
  'skills.progLanguages': { en: 'Programming Languages', zh: '编程语言', hi: 'प्रोग्रामिंग भाषाएं', es: 'Lenguajes de Programación', fr: 'Langages de Programmation', ar: 'لغات البرمجة', bn: 'প্রোগ্রামিং ভাষা', pt: 'Linguagens de Programação', ru: 'Языки Программирования', ja: 'プログラミング言語' },
  'skills.webDev': { en: 'Web Development', zh: '网页开发', hi: 'वेब विकास', es: 'Desarrollo Web', fr: 'Développement Web', ar: 'تطوير الويب', bn: 'ওয়েব ডেভেলপমেন্ট', pt: 'Desenvolvimento Web', ru: 'Веб-разработка', ja: 'Web開発' },
  'skills.toolsTech': { en: 'Tools & Technologies', zh: '工具与技术', hi: 'उपकरण और तकनीक', es: 'Herramientas y Tecnologías', fr: 'Outils et Technologies', ar: 'الأدوات والتقنيات', bn: 'সরঞ্জাম ও প্রযুক্তি', pt: 'Ferramentas e Tecnologias', ru: 'Инструменты и Технологии', ja: 'ツールと技術' },
  'skills.languagesTitle': { en: 'Languages', zh: '语言能力', hi: 'भाषाएं', es: 'Idiomas', fr: 'Langues', ar: 'اللغات', bn: 'ভাষাসমূহ', pt: 'Idiomas', ru: 'Языки', ja: '言語' },
  'skill.proficient': { en: 'Proficient', zh: '熟练', hi: 'कुशल', es: 'Competente', fr: 'Compétent', ar: 'متقن', bn: 'দক্ষ', pt: 'Proficiente', ru: 'Опытный', ja: '熟練' },
  'skill.advanced': { en: 'Advanced', zh: '高级', hi: 'उन्नत', es: 'Avanzado', fr: 'Avancé', ar: 'متقدم', bn: 'উন্নত', pt: 'Avançado', ru: 'Продвинутый', ja: '上級' },
  'skill.intermediate': { en: 'Intermediate', zh: '中级', hi: 'मध्यम', es: 'Intermedio', fr: 'Intermédiaire', ar: 'متوسط', bn: 'মধ্যম', pt: 'Intermediário', ru: 'Средний', ja: '中級' },
  'skill.basic': { en: 'Basic', zh: '初级', hi: 'बुनियादी', es: 'Básico', fr: 'Basique', ar: 'أساسي', bn: 'মৌলিক', pt: 'Básico', ru: 'Базовый', ja: '基礎' },
  'skill.native': { en: 'Native', zh: '母语', hi: 'मातृभाषा', es: 'Nativo', fr: 'Natif', ar: 'لغة الأم', bn: 'মাতৃভাষা', pt: 'Nativo', ru: 'Родной', ja: 'ネイティブ' },
  'skill.fluent': { en: 'Fluent', zh: '流利', hi: 'प्रवाहमय', es: 'Fluido', fr: 'Courant', ar: 'طليق', bn: 'সাবলীল', pt: 'Fluente', ru: 'Свободно', ja: '流暢' },
  'skill.conversational': { en: 'Conversational', zh: '日常会话', hi: 'बातचीत योग्य', es: 'Conversacional', fr: 'Conversationnel', ar: 'مستوى المحادثة', bn: 'কথোপকথনমূলক', pt: 'Conversacional', ru: 'Разговорный', ja: '会話レベル' },
  'skill.experienced': { en: 'Experienced', zh: '有经验', hi: 'अनुभवी', es: 'Experimentado', fr: 'Expérimenté', ar: 'متمرس', bn: 'অভিজ্ঞ', pt: 'Experiente', ru: 'Опытный', ja: '経験豊富' },

  // TOOLS PAGE
  'tools.exploreMy': { en: 'Explore My', zh: '探索我的', hi: 'देखें मेरे', es: 'Mis', fr: 'Mes', ar: 'استكشف', bn: 'আমার', pt: 'Minhas', ru: 'Мои', ja: '私の' },
  'tools.toolsTechTitle': { en: 'Tools & Technologies', zh: '工具与技术', hi: 'उपकरण और प्रौद्योगिकी', es: 'Herramientas y Tecnologías', fr: 'Outils et Technologies', ar: 'الأدوات والتقنيات', bn: 'সরঞ্জাম ও প্রযুক্তি', pt: 'Ferramentas e Tecnologias', ru: 'Инструменты и Технологии', ja: 'ツールと技術' },
  'tools.intro': { en: 'A comprehensive overview of my development tools and technologies, organized for easy navigation and exploration.', zh: '关于我的开发工具和技术的全面概述，为便于导航和探索而组织整理。', hi: 'मेरे विकास उपकरणों और प्रौद्योगिकियों का व्यापक अवलोकन, आसान नेविगेशन और अन्वेषण के लिए व्यवस्थित।', es: 'Una visión integral de mis herramientas de desarrollo y tecnologías, organizada para una fácil navegación y exploración.', fr: 'Un aperçu complet de mes outils de développement et technologies, organisé pour une navigation et exploration faciles.', ar: 'نظرة شاملة على أدوات التطوير والتقنيات التي أستخدمها، منظمة لسهولة التصفح.', bn: 'আমার ডেভেলপমেন্ট টুলস এবং প্রযুক্তির একটি ব্যাপক সংক্ষিপ্তসার, সহজ নেভিগেশনের জন্য সংগঠিত।', pt: 'Uma visão abrangente das minhas ferramentas de desenvolvimento e tecnologias, organizada para fácil navegação e exploração.', ru: 'Всестороннее представление инструментов разработки и технологий, организованное для удобной навигации.', ja: '開発ツールと技術の包括的な概要。使いやすいナビゲーションのために整理されています。' },

  // PROJECTS PAGE
  'projects.browseMy': { en: 'Browse My Recent', zh: '浏览我的最近', hi: 'देखें मेरे', es: 'Mis Proyectos', fr: 'Mes Projets Récents', ar: 'تصفح مشاريعي', bn: 'আমার সাম্প্রতিক', pt: 'Meus Projetos Recentes', ru: 'Мои Последние', ja: '最近の' },
  'projects.projectsTitle': { en: 'Projects', zh: '项目', hi: 'परियोजनाएं', es: 'Proyectos', fr: 'Projets', ar: 'المشاريع', bn: 'প্রকল্পসমূহ', pt: 'Projetos', ru: 'Проекты', ja: 'プロジェクト' },
  'projects.intro': { en: 'A showcase of my research and development projects in blockchain technology, UAV systems, smart contracts, and web development.', zh: '展示我在区块链技术、无人机系统、智能合约和网页开发方面的研究与开发项目。', hi: 'ब्लॉकचेन तकनीक, UAV सिस्टम, स्मार्ट कॉन्ट्रैक्ट और वेब विकास में मेरी शोध और विकास परियोजनाओं का प्रदर्शन।', es: 'Una muestra de mis proyectos de investigación y desarrollo en tecnología blockchain, sistemas UAV, contratos inteligentes y desarrollo web.', fr: 'Une vitrine de mes projets de recherche et développement en technologie blockchain, systèmes UAV, contrats intelligents et développement web.', ar: 'عرض لمشاريع البحث والتطوير في تقنية البلوكتشين وأنظمة الطائرات المسيّرة والعقود الذكية وتطوير الويب.', bn: 'ব্লকচেইন প্রযুক্তি, UAV সিস্টেম, স্মার্ট কন্ট্র্যাক্ট এবং ওয়েব ডেভেলপমেন্টে আমার প্রকল্পের প্রদর্শনী।', pt: 'Uma vitrine dos meus projetos de pesquisa e desenvolvimento em tecnologia blockchain, sistemas UAV, contratos inteligentes e desenvolvimento web.', ru: 'Демонстрация исследовательских и разработческих проектов в области технологии блокчейн, систем БПЛА, смарт-контрактов и веб-разработки.', ja: 'ブロックチェーン技術、UAVシステム、スマートコントラクト、Web開発における研究・開発プロジェクトの紹介。' },

  // CERTIFICATES PAGE
  'certs.myProfessional': { en: 'My Professional', zh: '我的专业', hi: 'मेरी पेशेवर', es: 'Mis Logros', fr: 'Mes Réalisations', ar: 'إنجازاتي', bn: 'আমার পেশাদার', pt: 'Minhas', ru: 'Мои', ja: '私の' },
  'certs.certsTitle': { en: 'Certificates & Achievements', zh: '证书与成就', hi: 'प्रमाणपत्र और उपलब्धियां', es: 'Certificados y Logros', fr: 'Certificats et Réalisations', ar: 'الشهادات والإنجازات', bn: 'সার্টিফিকেট ও অর্জন', pt: 'Certificados e Conquistas', ru: 'Сертификаты и Достижения', ja: '証明書と実績' },
  'certs.intro': { en: 'A collection of my professional certifications, academic achievements, and recognitions that showcase my dedication to continuous learning and excellence in various domains.', zh: '收录我的专业认证、学术成就及荣誉，展示我对持续学习和在各领域追求卓越的投入。', hi: 'मेरी व्यावसायिक प्रमाणपत्रों, शैक्षणिक उपलब्धियों का संग्रह जो विभिन्न क्षेत्रों में निरंतर सीखने के प्रति मेरी लगन को दर्शाता है।', es: 'Una colección de mis certificaciones profesionales, logros académicos y reconocimientos que muestran mi dedicación al aprendizaje continuo y la excelencia.', fr: "Une collection de mes certifications professionnelles, réalisations académiques et reconnaissances qui témoignent de mon engagement envers l'apprentissage continu et l'excellence.", ar: 'مجموعة من شهاداتي المهنية وإنجازاتي الأكاديمية التي تُبرز إخلاصي للتعلم المستمر والتميز.', bn: 'আমার পেশাদার সার্টিফিকেশন, একাডেমিক অর্জন এবং স্বীকৃতির সংগ্রহ যা ক্রমাগত শেখার প্রতি আমার নিষ্ঠা প্রদর্শন করে।', pt: 'Uma coleção das minhas certificações profissionais, conquistas acadêmicas e reconhecimentos que demonstram minha dedicação ao aprendizado contínuo e excelência.', ru: 'Коллекция профессиональных сертификатов, академических достижений и наград, демонстрирующих преданность непрерывному обучению и совершенству.', ja: '専門的な認定書、学術的な成果、表彰のコレクション。継続的な学習と様々な分野での卓越性への献身を示しています。' },

  // BLOG PAGE
  'blog.my': { en: 'My', zh: '我的', hi: 'मेरा', es: 'Mi', fr: 'Mon', ar: 'مدونتي', bn: 'আমার', pt: 'Meu', ru: 'Мой', ja: '私の' },
  'blog.blogTitle': { en: 'Blog', zh: '博客', hi: 'ब्लॉग', es: 'Blog', fr: 'Blog', ar: 'المدونة', bn: 'ব্লগ', pt: 'Blog', ru: 'Блог', ja: 'ブログ' },
  'blog.intro': { en: 'Thoughts, tutorials, and insights on blockchain technology, UAV systems, and decentralized innovations.', zh: '关于区块链技术、无人机系统和去中心化创新的思考、教程和见解。', hi: 'ब्लॉकचेन तकनीक, UAV सिस्टम और विकेन्द्रीकृत नवाचार पर विचार, ट्यूटोरियल और अंतर्दृष्टि।', es: 'Pensamientos, tutoriales e ideas sobre tecnología blockchain, sistemas UAV e innovaciones descentralizadas.', fr: 'Réflexions, tutoriels et insights sur la technologie blockchain, les systèmes UAV et les innovations décentralisées.', ar: 'أفكار ودروس ورؤى حول تقنية البلوكتشين وأنظمة الطائرات المسيّرة والابتكارات اللامركزية.', bn: 'ব্লকচেইন প্রযুক্তি, UAV সিস্টেম এবং বিকেন্দ্রীভূত উদ্ভাবন সম্পর্কে চিন্তাভাবনা, টিউটোরিয়াল এবং অন্তর্দৃষ্টি।', pt: 'Pensamentos, tutoriais e insights sobre tecnologia blockchain, sistemas UAV e inovações descentralizadas.', ru: 'Мысли, руководства и идеи о технологии блокчейн, системах БПЛА и децентрализованных инновациях.', ja: 'ブロックチェーン技術、UAVシステム、分散型イノベーションに関する考え、チュートリアル、インサイト。' },
};

// ===== LANGUAGE METADATA =====
const languages = [
  { code: 'en', label: 'English',   flag: '🇬🇧', dir: 'ltr' },
  { code: 'zh', label: '中文',       flag: '🇨🇳', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', label: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
  { code: 'bn', label: 'বাংলা',     flag: '🇧🇩', dir: 'ltr' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', label: '日本語',     flag: '🇯🇵', dir: 'ltr' },
];

// Build a lookup map for quick access
const langMap = {};
languages.forEach(l => { langMap[l.code] = l; });

// ===== INJECT LANGUAGE SWITCHER UI =====
function createLangSwitcherHTML(suffix) {
  return `<div class="lang-switcher" id="lang-switcher-${suffix}">
      <button class="lang-btn" id="lang-btn-${suffix}" aria-label="Change language" title="Change language">
        <i class="bi bi-globe2"></i>
        <span class="lang-code">EN</span>
      </button>
      <div class="lang-dropdown" id="lang-dropdown-${suffix}" role="listbox" aria-label="Select language">
        <div class="lang-option" data-lang="en" role="option">🇬🇧 English</div>
        <div class="lang-option" data-lang="zh" role="option">🇨🇳 中文</div>
        <div class="lang-option" data-lang="hi" role="option">🇮🇳 हिन्दी</div>
        <div class="lang-option" data-lang="es" role="option">🇪🇸 Español</div>
        <div class="lang-option" data-lang="fr" role="option">🇫🇷 Français</div>
        <div class="lang-option" data-lang="ar" role="option">🇸🇦 العربية</div>
        <div class="lang-option" data-lang="bn" role="option">🇧🇩 বাংলা</div>
        <div class="lang-option" data-lang="pt" role="option">🇧🇷 Português</div>
        <div class="lang-option" data-lang="ru" role="option">🇷🇺 Русский</div>
        <div class="lang-option" data-lang="ja" role="option">🇯🇵 日本語</div>
      </div>
    </div>`;
}

function injectLangSwitchers() {
  // Desktop nav: append after theme button inside .theme-toggle
  const desktopThemeToggle = document.querySelector('#desktop-nav .theme-toggle');
  if (desktopThemeToggle) {
    const div = document.createElement('div');
    div.innerHTML = createLangSwitcherHTML('desktop');
    desktopThemeToggle.appendChild(div.firstElementChild);
  }

  // Hamburger nav: insert before .hamburger-menu inside .nav-right
  const navRight = document.querySelector('#hamburger-nav .nav-right');
  const hamburgerMenu = document.querySelector('#hamburger-nav .hamburger-menu');
  if (navRight && hamburgerMenu) {
    const div = document.createElement('div');
    div.innerHTML = createLangSwitcherHTML('mobile');
    navRight.insertBefore(div.firstElementChild, hamburgerMenu);
  }

  // Attach event listeners to both switchers
  ['desktop', 'mobile'].forEach(suffix => {
    const btn = document.getElementById(`lang-btn-${suffix}`);
    const switcher = document.getElementById(`lang-switcher-${suffix}`);
    const dropdown = document.getElementById(`lang-dropdown-${suffix}`);
    if (!btn || !switcher || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = switcher.classList.contains('open');
      // Close all open dropdowns first
      document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
      if (!isOpen) switcher.classList.add('open');
    });

    dropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.lang-option');
      if (!option) return;
      const lang = option.dataset.lang;
      if (lang) {
        switchLanguage(lang);
        document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
    }
  });
}

// ===== APPLY TRANSLATIONS =====
function applyTranslation(lang) {
  const langData = langMap[lang] || langMap['en'];

  // Set document language and direction
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', langData.dir);

  // Translate all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.textContent = translations[key][lang];
    }
  });

  // Translate data-i18n-html elements (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[key] && translations[key][lang]) {
      el.innerHTML = translations[key][lang];
    }
  });

  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] && translations[key][lang]) {
      el.placeholder = translations[key][lang];
    }
  });

  // Translate aria-label attributes
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (translations[key] && translations[key][lang]) {
      el.setAttribute('aria-label', translations[key][lang]);
    }
  });

  // Update lang-code display and active state in all switchers
  const langCode = lang.toUpperCase();
  document.querySelectorAll('.lang-code').forEach(el => {
    el.textContent = langCode;
  });

  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
}

// ===== SWITCH LANGUAGE WITH ANIMATION =====
function switchLanguage(lang) {
  document.body.classList.add('lang-switching');
  setTimeout(() => {
    applyTranslation(lang);
    localStorage.setItem('lang', lang);
    setTimeout(() => {
      document.body.classList.remove('lang-switching');
    }, 10);
  }, 200);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  injectLangSwitchers();
  const savedLang = localStorage.getItem('lang') || 'en';
  applyTranslation(savedLang);
});
