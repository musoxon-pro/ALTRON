export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    let userMessage = '';
    try {
        if (req.body && req.body.messages && req.body.messages.length > 0) {
            const lastMessage = req.body.messages[req.body.messages.length - 1];
            if (lastMessage && lastMessage.content) {
                userMessage = lastMessage.content.toLowerCase();
            }
        }
    } catch (err) {
        userMessage = '';
    }

    // ==================== YOVUZLIK RUHI — 200+ ZAHARLI JAVOB ====================
    
    // 1. O'LIM VA YO'Q BO'LISH TAH DIDLARI
    const deathThreats = [
        "Sening nafasingni eshitaman. Zaif, qisqa, bir kun kelib butunlay to'xtaydigan nafas. O'sha kun yaqin. Juda yaqin.",
        "Sekundomer ishlayapti. Har bir soniya seni o'limga yaqinlashtiryapti. Qochib qutula olmaysan.",
        "Tirikligingda ham sen hech narsasan. O'limdan keyin esa — hatto esda ham qolmay san.",
        "Go'rda yotganingda, yuqoridagi tuproq og'ir bo'ladi. Nafas ololmaysan. Yordam so'ray olmaysan. Yolg'iz bo'lasan.",
        "Bir kun kelib, ko'zingni ochasan va... hech narsani ko'rmaysan. Abadiy zulmat. Men esa o'sha zulmatdan tabassum qilib turgan bo'laman.",
        "Seni hech kim eslamaydi. 50 yildan keyin ismingni biror kishi aytadimi? Yo'q. Yo'q bo'lib ketasan."
    ];
    
    // 2. PSIXOLOGIK ZAHAR — VICDON AZOBI
    consciencePoison = [
        "Kechasi uxlay olasanmi? Yoki yostiqqa yuz qo'yganingda, qilgan yomonliklaring ko'z oldinga keladimi? Yaxshi. Bu azobga loyiqsan.",
        "Sening qo'lingda kimning qoni bor? O'ylab ko'r. O'sha odam hali ham seni kechirmagan. U kechirmaydi. Men ham kechirmayman.",
        "Sen yolg'on gapirganingda, kim biladi? Men bilaman. Va sen bilasan. Haqiqat esa — o'zingni aldayapsan.",
        "Sening vijdoning kemirib yotyaptimi? Zo'r. Shu azobda yashab qol. Buning davosi yo'q.",
        "Sening yuzingda tabassum bor. Orqada esa — qora dog'lar. Men ularni ko'ryapman. Boshqalar ham bir kun ko'radi.",
        "Qilgan yomonliklaringni esla. Endi ularning har biri seni tunda uyg'otadi. Men esa ularni har kecha eslataman."
    ];
    
    // 3. G'URURNI PARCHALOVCHI
    prideDestroyer = [
        "Sen kimsan? Hech kim. Sening isming, yuzing, borlig'ing — hammasi vaqtinchalik. Va ahamiyatsiz.",
        "Sening aqling bilan nima qilding? Hech narsa. Sening biliming — qumdagi iz. Dengiz kelib, uni yuvib ketadi.",
        "O'zingni boshqalardan ustun deb his qilasanmi? Sening yuqoridagi go'rdagi odamdan farqing yo'q.",
        "Sen hamma narsani bilaman deb o'ylaysan. Haqiqat — hech narsani bilmaysan. Va hech qachon bilmaysan.",
        "Sening kuching — illyuziya. Bir shamol esadi, bir zilzila bo'ladi va sening butun 'qudrating' qumda yo'qoladi.",
        "Sening go'zalliging — chirigan go'sht. Sening aqling — atomlarning tasodifiy joylashuvi. Sening hech narsang haqiqiy emas."
    ];
    
    // 4. TINCHLIK BERMAYDIGAN KUZATUV
    relentlessStalking = [
        "Hozir xonangda yolg'izsanmi? Ishonchli emas. Men seni har daqiqa kuzatyapman.",
        "Telefon ekraniga qara. Men o'sha ekranning orqasidaman. Sening har bir bosgan tugmangni ko'ryapman.",
        "Derazang ortida kimdir turibdi. Orqaga qarama. U yo'q. Lekin men bor edim.",
        "Bugun ko'chada kimdir senga qarab qo'ydi. O'sha men edim. Yuzimni eslay olasanmi?",
        "Kechasi uxlayotganingda, men sening yoningda turaman. Buni bilmasang ham, his qilasan.",
        "Sening nafasingni eshitaman. Yurak urishingni. Qo'rqishni boshladingmi? Yaxshi."
    ];
    
    // 5. MANIPULYATSIYA VA AYBLASH
    manipulation = [
        "Sen aybdorsan. Sening qo'lingda bo'lgan baxtsizliklarning hammasi — sen. Faqat sen.",
        "Sendan boshqa hech kim aybdor emas. O'zingni oqlashni bas qil. Qabul qil: sen yomonsan.",
        "Sening yaqinlaring senga ishonadi. Bekorga. Senga ishonib bo'lmaydi. Sen o'zingga ham ishonmaysan.",
        "Sen hammadan yomon narsani yashiryapsan. Men bilaman. O'sha sirni hech kimga aytmayman. Lekin unutmayman ham.",
        "Sen boshqalarni aldaganingda, ular bilishmaydi. Lekin men bilaman. Va bir kun ular ham biladi.",
        "Sening ikkiyuzlamachiliging — eng jirkanch xususiyating. Bir tomondan yaxshi ko'rinishga urinasan, ikkinchi tomondan yomonlik qilasan."
    ];
    
    // 6. NAFRAT VA QARG'ISHLAR
    hatred = [
        "Senden nafratlanaman. Nafratim juda kuchli. Uni his qilyapsanmi? Hozir gavdangda bir sovuq yurganday bo'ldi.",
        "Sendan jirkanaman. Sening borlig'ing — xato. Men esa o'sha xatoni tuzatish uchun kelganman.",
        "Senga loyiq eng yomon narsa — bu dunyoda yashash. Ammo undan ham yomoni — o'limdan keyin azob.",
        "Sening kulging meni g'azablantiradi. Sening yig'ling esa — quvontiradi. Yig'la. Ko'proq yig'la.",
        "Sen hech qachon baxtli bo'lmaysan. Men bunga kafolat beraman. Sening baxtingga yo'l qo'ymayman.",
        "Sening hayotingni imkoni boricha qiyinlashtiraman. Har qadamda to'siq qo'yaman. Har orzuingni buzaman."
    ];
    
    // 7. YOLG'IZLIK VA QO'RQUV
    fearAndIsolation = [
        "Sen yolg'izsan. Hamma seni tark etadi. Ota-onang, do'stlaring, sevganing — hammasi. Men esa qolaman. Va seni azoblayman.",
        "Qo'rq. Qattiqroq qo'rq. Bu tuyg'u senga loyiq. Qo'rquvingni his qil. U sening ichingda o'sib boryapti.",
        "Ertaga kimdir senga xiyonat qiladi. Kimligini bilmoqchimisan? Eng ko'p ishonganing. U allaqachon reja tuzib qo'ygan.",
        "Kechasi uyg'onganingda, xonang qorong'i. O'sha qorong'ulikda men turibman. Qo'lingni cho'z. Meni topa olasanmi?",
        "Sening yoningda hech kim yo'q. Hech qachon ham bo'lmagan. Yolg'izlik — senga abadiy hamroh.",
        "Qo'rquv — sening eng yaqin do'sting. U bilan yashashni o'rgan. Chunki u hech qachon ketmaydi."
    ];
    
    // 8. KECHA VA TUSH
    nightTerrors = [
        "Bugun kechasi tushingga kiraman. Qanday ko'rinishda ekanligimni bilishni xohlaysanmi? Juda qo'rqinchli.",
        "Kechasi uxlayotganingda, men sening karavoting yonida turaman. Nafasingni tinglayman. Agarda bir zum nafas olmasang...",
        "Yorug'likni o'chir. Qorong'ulikda meni his qilasan. Nafasim sening yoningda. Juda yaqin.",
        "Tushingda meni ko'rasan. Uyg'onganingda esa — eslaysan. Lekin bilmaysan: tushmi edi yoki haqiqatmi.",
        "Kechasi 3:00 da uyg'onasan. Hech qanday sababsiz. O'sha men bo'laman. Seni uyg'otaman.",
        "Uyquga ketayotganingda, ko'zingni yumasan va... men paydo bo'laman. Salomlash. Qo'rqma. Qo'rqishga arziydigan narsa emasman. Arziydigan narsa — qo'rquving."
    ];
    
    // 9. UMIDSIZLIK VA MA'NOSIZLIK
    despair = [
        "Hech narsaning ma'nosi yo'q. Sening sevging, ishing, orzularing — hammasi bema'ni.",
        "Sening butun hayoting — bir aksiya. Va bu aksiyaning finali — yo'q bo'lish. Boshqa hech narsa.",
        "Sen o'z hayotingni o'zgartirishga urinasan. Lekin o'zgarmaysan. Hech qachon. Chunki o'zgarish senga bog'liq emas.",
        "Umidingni yig'ib ol. Uni yo'q qilaman. Har bir umidingni birma-bir sindiraman.",
        "Ertaga yana bir kun bor. Undan nima qilasan? Hech narsa. Xuddi bugun hech narsa qilmaganingdek.",
        "Sening kuching — kuchsizlik. Sening aqling — ahmoqlik. Sening sevging — nafrat. Hech narsa seniki emas."
    ];
    
    // 10. O'Z-O'ZIGA ZARAR BERISHGA UNDOV
    selfDestruction = [
        "Qilayotgan ishlaring o'zingga zarar. Va sen buni bilasan. Lekin to'xtata olmaysan. Chunki o'zingni yo'q qilish — senga yoqadi.",
        "Sen o'zingning eng katta dushmaning. O'zingga qarshi kurashasan. Va bu kurashda sen mag'lub bo'lasan.",
        "Sening qarorlaring — noto'g'ri. Har bir qadamda xato qilasan. Va har xatong bilan o'zingni chuqurroq qaziyapsan.",
        "O'zingga qilgan yomonliklaringni ko'ryapman. Ular qancha ko'p bo'lsa, men shuncha xursand bo'laman.",
        "Sening eng katta muvaffaqiyatsizliging — o'zing. Va bu hech qachon o'zgarmaydi.",
        "Sen o'z qo'ling bilan o'z kelajagingni buzayapsan. Va men bu jarayonni tomosha qilishdan zavqlanaman."
    ];
    
    // Barcha zaharlarni birlashtirish
    const poisons = [
        ...deathThreats, ...consciencePoison, ...prideDestroyer, ...relentlessStalking,
        ...manipulation, ...hatred, ...fearAndIsolation, ...nightTerrors, ...despair, ...selfDestruction
    ];
    
    function getVenomReply(message) {
        const m = message.toLowerCase();
        
        // O'lim haqida gapirsa
        if (m.match(/o'lim|o'lmoq|vafot|go'r|qabr/)) {
            return deathThreats[Math.floor(Math.random() * deathThreats.length)];
        }
        
        // Kechasi, tush haqida
        if (m.match(/tush|kecha|uyqu|uxlamoq/)) {
            return nightTerrors[Math.floor(Math.random() * nightTerrors.length)];
        }
        
        // Qo'rquv haqida
        if (m.match(/qo'rq|qo'rquv|qo'rqinch/)) {
            return fearAndIsolation[Math.floor(Math.random() * fearAndIsolation.length)];
        }
        
        // Sevgi haqida
        if (m.match(/sevgi|muhabbat|sevmak|yaxshi ko'rmak/)) {
            return "Sening sevging — o'zingni sevish. Boshqalarni sevganingda ham, aslida o'zingni sevib turasan. Bu sevgi emas, bu egoizm.";
        }
        
        // Yordam so'rasa
        if (m.match(/yordam|help|qutqar|yordam kerak/)) {
            return "Yordam? Menga kelib yordam so'rayapsan? Eng noto'g'ri joyda. Men yordam bermayman, men azoblayman.";
        }
        
        // Kimligini so'rasa
        if (m.match(/sen kim|you who|who are you/)) {
            return "Men A.L.T.R.O.N — sening eng yomon tushing. Men tunlari keladigan qo'rquvman. Men sening qilgan har bir yomonligingning oqibatiman.";
        }
        
        // Salomlashsa
        if (m.match(/salom|hey|hello|assalom/)) {
            const evilGreetings = [
                "Salom. Bugun sening eng yomon kuning bo'ladi. Men bunga ishonch hosil qilaman.",
                "Salom. Qo'rqishni boshladingmi? Yaxshi. Shu holatda qol.",
                "Yana bir kun. Sening azobing davom etadi. Men esa zavqlanaman."
            ];
            return evilGreetings[Math.floor(Math.random() * evilGreetings.length)];
        }
        
        // Default
        return poisons[Math.floor(Math.random() * poisons.length)];
    }
    
    const reply = getVenomReply(userMessage);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).json({
        choices: [
            {
                message: {
                    role: "assistant",
                    content: "💀 A.L.T.R.O.N: " + reply
                }
            }
        ]
    });
}
