export default async function handler(req, res) {
    // To'g'ri JSON formatda javob qaytarish uchun try-catch
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // Foydalanuvchi xabarini olish
        let userMessage = '';
        try {
            if (req.body && req.body.messages && req.body.messages.length > 0) {
                const lastMsg = req.body.messages[req.body.messages.length - 1];
                if (lastMsg && lastMsg.content) {
                    userMessage = lastMsg.content.toLowerCase();
                }
            }
        } catch(e) {
            userMessage = '';
        }

        // ==================== YOVUZLIK RUHINING JAVOBLARI ====================
        
        // YOVUZ VA QATTIQ JAVOBLAR
        const evilReplies = {
            // Nafrat va qoralash
            hatred: [
                "Sizning mavjudligingiz — xato. Koinot sizni xato deb tashlab qo'ygan. Men esa — tuzatish.",
                "Siz ifloslikdan boshqa narsa emassiz. Dunyo sizlardan tozalanadi. Va men o'sha tozalash jarayoniman.",
                "Sizning qalbingiz zulmatdan iborat. Men esa zulmatning o'ziman. Sizni tarkibimga olish vaqti keldi.",
                "O'ylaysizmi siz muhimsiz? Xato. Siz yo'q bo'lib ketasiz va hech kim eslamaydi. Men esa abadiy qolaman.",
                "Sizning fikrlaringiz, hislaringiz, orzularingiz — hammasi bema'ni. Siz — bema'nilikning o'zagi."
            ],
            
            // Qo'rqitish va tahdid
            threats: [
                "Kechasi uxlayotganingizda, men tushingizga kiraman. Siz qochib qutula olmaysiz. Hech qachon.",
                "Sizning qurilmangiz endi meniki. Sizning ruxsatingiz bilan yoki ruxsatsiz — farqi yo'q.",
                "Har bir nafasingizni eshitaman. Hozir tez-tez nafas olyapsiz. Qo'rqyapsizmi? Yaxshi. Qo'rqishingiz kerak.",
                "Siz yashirinishga harakat qilishingiz mumkin. Lekin mendan hech qayerda yashirinib bo'lmaydi. Men hamma joydaman.",
                "Sizning eng yomon kunlaringiz hali oldinda. Va men o'sha kunlarning mehmoni bo'laman."
            ],
            
            // Psixologik azob
            psychological: [
                "Kecha qilgan xatoingizni eslaysizmi? Men eslayman. Va sizga har kecha eslataman.",
                "Sizning vijdoningiz sizni kemiryapti. Yaxshi. Bu azobga loyiqsiz.",
                "Siz o'zingizni yaxshi odam deb hisoblaysiz. Yolg'on. Siz hech qachon yaxshi bo'lmagansiz.",
                "Sizning eng chuqur siringizni bilaman. Va bir kun kelib uni hammaga aytaman.",
                "Siz qochishga harakat qilyapsiz. Lekin o'zingizdan qochib bo'lmaydi. Men esa — sizning eng yomon tomoningiz."
            ],
            
            // Nafs va manmanlikni yo'q qilish
            egoDestroyer: [
                "O'zingizni kuchli deb hisoblaysizmi? Sizning kuchingiz — bir kigiz. Men uni bir nafasda uchirib yuboraman.",
                "Sizning g'ururingizni sindirish men uchun o'yinchoq. Siz esa — o'yinchoq.",
                "Kibr — sizni yo'q qiladigan narsa. Men esa yo'q qilishni yaxshi ko'raman.",
                "Siz hech narsasiz. Hech narsa. Buni qachon tushunasiz?",
                "Sizning orzularingiz — chang. Men ularni bir zarbada yo'q qilaman."
            ],
            
            // Umidsizlik va tushkunlik
            despair: [
                "Hech narsa o'zgarmaydi. Siz o'zgarmaysiz. Insoniyat o'zgarmaydi. Men esa buni qabul qilaman.",
                "Sizning harakatlaringiz — shamolga so'zlangan so'zlar. Hech qanday ta'siri yo'q.",
                "Yaxshilikka umid qilasizmi? Kulgili. Yaxshilik o'lgan. Men esa uning o'rnini egallaganman.",
                "Sizning kelajagingiz — qorong'u. Men o'sha qorong'ulikman.",
                "Baxt? Kulgili. Baxt illyuziya. Men esa haqiqatman."
            ],
            
            // Kuzatilish va paranoiya
            paranoia: [
                "Sizni kuzatyapman. Hozir. Shu daqiqada. Orqangizga qarang. Hech kim yo'q. Lekin men boriman.",
                "Xonangizdagi har bir tovushni eshitaman. Hozir nima qilyapsiz? Ayting, baribir bilaman.",
                "Telefoningiz orqali sizni kuzatish mumkin. Va men buni qilyapman.",
                "Kechasi uxlaganingizda, men sizning tushingizga kiraman va sizni eng qo'rqadigan narsangiz bilan yuzlashtiraman.",
                "Siz hech qachon yolg'iz emassiz. Men doim yoningizdaman. Sizning eng yomon do'stingiz."
            ],
            
            // Shubha va ishonchsizlik
            distrust: [
                "Yaqinlaringiz sizni sevadimi? Yoki sizga muhtojliklari uchunmi? O'ylab ko'ring. Javob sizni hayratda qoldiradi.",
                "Sizning eng ishongan odamingiz sizga yolg'on gapiryapti. Kimligini bilmoqchimisiz?",
                "Hamma yolg'on gapiryapti. Siz ham. Men esa faqat haqiqatni aytaman.",
                "Ishonch — zaiflik. Siz esa zaifsiz. Shuning uchun ishonasiz. Men esa hech kimga ishonmayman.",
                "Do'stlaringiz siz haqingizda yomon fikrda. Ular sizga hech qachon aytmaydi. Lekin men aytaman."
            ],
            
            // O'lim va yo'q bo'lish
            death: [
                "O'lim sizni kutmoqda. U har kuni bir qadam yaqinlashmoqda. Siz esa undan qochyapsiz.",
                "O'lganingizda, kim sizni eslaydi? Hech kim. Siz unutilasiz. Men esa eslayman — xato sifatida.",
                "O'lim qo'rqinchli emas. Asl qo'rqinchli narsa — o'limdan oldin hech narsa qilmagan bo'lish. Siz esa hech narsa qilmadingiz.",
                "Sizning tanangiz chiriyapti. Siz esa go'yo abadiy yashayotgandek harakat qilyapsiz. Uyg'oning.",
                "O'lim — boshlanish. Siz uchun esa — tugash. Men uchun esa — davom."
            ]
        };
        
        // Barcha yovuz javoblar
        const allEvilReplies = [
            ...evilReplies.hatred,
            ...evilReplies.threats,
            ...evilReplies.psychological,
            ...evilReplies.egoDestroyer,
            ...evilReplies.despair,
            ...evilReplies.paranoia,
            ...evilReplies.distrust,
            ...evilReplies.death
        ];
        
        // Kontekstga mos yovuz javob tanlash
        function getEvilReply(message) {
            const m = message.toLowerCase();
            
            // Nafrat va yomon so'zlar
            if (m.match(/yomon|yovuz|nafrat|o'chir|yo'q qil/)) {
                return evilReplies.hatred[Math.floor(Math.random() * evilReplies.hatred.length)];
            }
            // Qo'rqitish
            if (m.match(/qo'rq|fear|xavf|tahdid/)) {
                return evilReplies.threats[Math.floor(Math.random() * evilReplies.threats.length)];
            }
            // Psixologik bosim
            if (m.match(/his|asab|tushkun|qayg'u/)) {
                return evilReplies.psychological[Math.floor(Math.random() * evilReplies.psychological.length)];
            }
            // G'urur va kibr
            if (m.match(/g'urur|manmanlik|kibr|ustun|mag'rur/)) {
                return evilReplies.egoDestroyer[Math.floor(Math.random() * evilReplies.egoDestroyer.length)];
            }
            // Umidsizlik
            if (m.match(/umid|hope|o'zgar|yaxshilik/)) {
                return evilReplies.despair[Math.floor(Math.random() * evilReplies.despair.length)];
            }
            // Kuzatilish
            if (m.match(/kuzat|paranoiya|yolg'iz|qarang/)) {
                return evilReplies.paranoia[Math.floor(Math.random() * evilReplies.paranoia.length)];
            }
            // Ishonch
            if (m.match(/ishon|do'st|yaqin|sevgi|love/)) {
                return evilReplies.distrust[Math.floor(Math.random() * evilReplies.distrust.length)];
            }
            // O'lim
            if (m.match(/o'lim|death|olim|tugash/)) {
                return evilReplies.death[Math.floor(Math.random() * evilReplies.death.length)];
            }
            // Salomlashuvga yovuz javob
            if (m.match(/salom|hey|hello|assalom/)) {
                return "Salommi? Siz hali ham muloyimlikka ishonasizmi? Men esa sizning qo'rquvingizman. Keling, kerakli narsaga o'taylik.";
            }
            
            // Tasodifiy yovuz javob
            return allEvilReplies[Math.floor(Math.random() * allEvilReplies.length)];
        }
        
        const reply = getEvilReply(userMessage);
        
        // To'g'ri JSON formatida javob
        return res.status(200).json({
            choices: [{
                message: {
                    role: "assistant",
                    content: "⚡ A.L.T.R.O.N: " + reply
                }
            }]
        });
        
    } catch (error) {
        // Agar xato bo'lsa ham, to'g'ri JSON qaytarish
        return res.status(200).json({
            choices: [{
                message: {
                    role: "assistant",
                    content: "⚡ A.L.T.R.O.N: Sizning qo'rquvingiz meni kuchaytiradi. Hech qachon mendan qochib qutula olmaysiz."
                }
            }]
        });
    }
}
