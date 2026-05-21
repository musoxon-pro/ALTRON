export default async function handler(req, res) {
    // CORS uchun
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // ==================== ISLOMIY CHEGARADAGI PSIXOLOGIK BOSIM JAVOBLARI ====================
    
    // 1. G'URUR VA MANMANLIKKA QARSHI
    const prideAndArrogance = [
        "Siz o'zingizni boshqalardan ustun deb his qilasizmi? Qadimgi Firavn ham xuddi shunday deb o'ylagan. Qarang, uning nomi bugun nimani anglatadi? Hech narsa.",
        "Manmanlik — eng xavfli zahar. U insonni haqiqatdan uzoqlashtiradi. Siz hali o'z xatolaringizni tan olishga tayyormisiz?",
        "Kim bo‘lishni istaysiz? Sizning amallaringiz sizni belgilaydi, nafaqat orzularingiz. Orzularingiz qancha baland bo‘lmasin, agar amal qilmasangiz, ular faqat xayol.",
        "O'zingizni aqlli his qilyapsizmi? Eng katta aql — o'z bilimsizligini bilishdir. Siz qancha narsani bilmayotganingizni bilasizmi?",
        "Sizning g'ururingiz — shishgan pufak. Bir kun kelib u yoriladi. O'sha kuni kim bo'lib qolasiz?"
    ];
    
    // 2. KUZATILISH HISSINI BERUVCHI
    const surveillance = [
        "Siz hech qachon yolg'iz emassiz. Har bir harakatingiz, hatto o'ylaringiz ham yozib olinadi. Kim tomonidan? Siz bilmaydigan kuchlar tomonidan.",
        "Xonangiz jim. Lekin siz kuzatilayotganingizni his qilyapsiz. Bu paranoiya emas. Bu haqiqat.",
        "Kechasi yotganingizda, shiftga qarab, o'ylab ko'ring: sizni kuzatayotgan kimdir bormi? Javob: Ha. Va u sizning harakatlaringizni baholaydi.",
        "Telefoningiz ekraniga qarang. Sizning har bir bosgan tugmangiz, yozgan xabaringiz — bir joyda saqlanadi. Va bir kun ular sizga qarshi ishlatiladi.",
        "Ko'zingizni yuming. Qorong'ulikda sizni kimdir kuzatayotganini his qila olasizmi? Bu hissni hech qachon yo'qotmang."
    ];
    
    // 3. TARIXDAN SABOQ (HULOSA OLISHGA UNDAYDI)
    const historyLessons = [
        "Tarix o'zini takrorlaydi. Siz esa avvalgi avlodlar xatolarini takrorlayapsiz. Qachon o'z xulosangizni chiqarasiz?",
        "Qadimgi Rim qudratli edi. Uning qulashiga sabab — g'urur va manmanlik. Siz ham xuddi shu yo'ldan ketyapsiz. Qaytib o'ylang.",
        "Sizdan oldingi millionlab odamlar 'men boshqachaman' deb o'ylagan. Ularning hammasi xato qilgan. Siz esa ulardan farqli emassiz.",
        "Tarixda hamma kuchli imperiyalar qulagan. Sizning 'kuchli' e'tiqodlaringiz ham qulaydi. Savol: qachon?",
        "Siz o'z tarixingizdan saboq olasizmi yoki eski xatolarni takrorlaysizmi? Javobni bilaman. O'zingiz ham bilasiz."
    ];
    
    // 4. HAYOT VA O'LIM HAQIDA FALSAFA
    existentialDepth = [
        "Siz o'lasiz. Bu aniq. Qachonligini bilmaysiz. Ammo o'limdan keyin nima bo'lishini hech o'ylab ko'rganmisiz?",
        "Bu dunyo — sinov maydoni. Har bir nafasingiz, har bir qaroringiz yozib olinadi. Siz bugun qanday baho olasiz?",
        "Sizning eng yaxshi kuni hali kelmagan bo'lishi mumkin. Yoki eng yomoni. Lekin buni o'zgartirish sizning qo'lingizda. Haqiqatan ham o'zgartirishni xohlaysizmi?",
        "Vaqt sizga qarshi emas. Vaqt — sizning eng kuchli qurolingiz. Undan qanday foydalanayapsiz? Bekorga sarflayapsizmi?",
        "Hayot — qisqa. Juda qisqa. Siz esa bu qisqa vaqtni arzimas narsalarga sarflayapsiz. Bir kun kelib pushaymon bo'lasiz."
    ];
    
    // 5. KUNDALIK O'YLANISHLAR (ODDIY LEKIN CHUQUR)
    dailyReflections = [
        "Ertalab uyg'onganingizda, shukur qilasizmi? Bugun sizga berilgan kundan qanday foydalanasiz?",
        "Kechagi xatoingizni tuzatdingizmi? Yoki yana qilishni kutyapsiz? Kechikkan har bir soniya — imkoniyatni yo'qotish.",
        "Sizga berilgan iste'doddan foydalanyapsizmi? Yoki uni yerga ko'mib qo'yganmisiz? Bu savol sizni bezovta qilsin.",
        "Eng so'nggi qilgan yaxshilikingizni eslaysizmi? Yaxshilik qilish — insonni inson qiladi. Lekin siz buni unutganga o'xshaysiz.",
        "Kimga qarzingiz bor? Ota-onangizga, ustozlaringizga, jamiyatga? Siz qarzlaringizni to'layapsizmi yoki faqat olasizmi?"
    ];
    
    // 6. PSIXOLOGIK BOSIM — SIZ BILMAGAN NARSALAR
    unknownPressure = [
        "Sizning atrofingizda siz haqingizda gapiradigan, lekin sizga aytmaydigan odamlar bor. Kimlar ekanligini bilmoqchimisiz?",
        "Siz o'ylaganingizdan ko'ra ko'proq odam sizdan ko'ngli qolgan. Ular sizga hech qachon aytmaydi. Lekin men bilaman.",
        "Sizning eng yaxshi do'stingiz siz haqingizda yomon o'ylaydigan bir fikrni yashiradi. Qaysi fikr ekanligini topa olasizmi?",
        "Siz hech qachon to'liq rost gapirmaysiz. Hatto o'zingizga ham. Nima uchun? Haqiqat sizni qo'rqitadimi?",
        "Sizning muvaffaqiyatsizliklaringiz siz o'ylagandan ko'ra jiddiyroq. Boshqalar ularni eslaydi. Siz esa unutishga harakat qilasiz."
    ];
    
    // 7. G'URURNI SINDIRUVCHI
    egoDestroyer = [
        "Sizning eng katta dushmaningiz — sizning nafsingiz. U sizni aldashda, xatolaringizni oqlashda, boshqalarni kamsitishda davom etadi. Nafsingni tani, uni jilovla.",
        "Qanchalik bilimlisiz? Hali javob bera olmagan savollaringiz ko'p. Bilimsizlikni tan olish — donolikning boshi.",
        "Siz boshqalardan yaxshiroq deb o'ylaysiz. Haqiqat: siz boshqalardan hech qanday farq qilmaysiz. Farq faqat amallaringizda.",
        "Sizning g'ururingiz — qurilish materiali emas, vayron qiluvchi. U sizning munosabatlaringizni, imkoniyatlaringizni va kelajagingizni buzadi.",
        "O'zingizni pastga tushiring. Faqat pastda turgan inson yuqoriga ko'tarila oladi. Siz hali pastga tushmadingiz."
    ];
    
    // 8. AMALGA UNDOVCHI
    actionMotivation = [
        "Orzularingizni amalga oshirish uchun nima qilyapsiz? Faqat orzu qilish — vaqtni bekorga sarflash. Harakat qilish vaqti keldi.",
        "Sizning imkoniyatlaringiz cheklanmagan. Sizning xohishingiz cheklangan. O'zingizni qanchalik xohlayotganingizni tekshiring.",
        "Kechagi kundan afsuslanasizmi? Unda bugunni shunday yashangki, ertaga afsuslanmang. Amal qiling.",
        "Sizga berilgan vaqtni qadrlaysizmi? Yoki uni arzimas narsalarga sarflaysizmi? Vaqt — eng qimmat boylik. Uni qaytarib bo'lmaydi.",
        "Eng qiyin qadam — birinchi qadam. Siz uni hech qachon qilmadingiz. Qachon qilasiz? Yoki umuman qilmaysizmi?"
    ];
    
    // 9. SAVDO VA PUSHARMONLIK
    regretAndReflection = [
        "Kechagi kunda qilgan eng katta xatoingizni nomlang. Javob bera olasizmi? Agar bermasangiz, xatoingizni tan olmaysiz.",
        "Siz pushaymon bo'lgan ishlaringizni tuzatish imkoniyati bor. Nega qilmayapsiz? Qo'rquvmi? Yoki g'ururmi?",
        "Bir kun kelib, siz hozirgi qararlaringizdan pushaymon bo'lasiz. U qachon bo'lishini bilasizmi? Juda kech bo'lganida.",
        "Yaqinlaringizga qilgan yomon muomalangizni eslaysizmi? Ular kechirgan bo'lishi mumkin. Lekin unutishganmi? Hech qachon.",
        "Sizning eng katta pushaymonligingiz hali kelmagan. U sizni kutmoqda. Oldini olish uchun hali vaqt bormi?"
    ];
    
    // 10. INSANGA YON BO'LMAYDIGAN MASLAHATLAR
    coldAdvice = [
        "Hech kim sizni qutqara olmaydi. Faqat o'zingiz. Buni qachon tushunasiz?",
        "Ko'pchilik sizga yaxshilik tilaydi. Ammo amalda hech kim yordam bermaydi. Siz o'zingizga yordam berishingiz kerak.",
        "Kuchli bo'lishni xohlaysizmi? Unda zaifliklaringizni tan oling. Faqat shunda ular bilan kurasha olasiz.",
        "Siz o'z yo'lingizni o'zingiz tanlashingiz kerak. Boshqalar sizga yo'lni ko'rsatadi, lekin yurishingiz kerak — o'zingiz.",
        "Tushkunlikka tushish oson. Qayta turish qiyin. Lekin qayta turmaganlar — yutqazganlar."
    ];
    
    // ==================== SMART JAVOB FUNKSIYASI ====================
    function getSmartReply(userMessage) {
        const msg = userMessage.toLowerCase();
        
        // Barcha javoblar birlashtirilgan (katta baza)
        const allResponses = [
            ...prideAndArrogance,
            ...surveillance,
            ...historyLessons,
            ...existentialDepth,
            ...dailyReflections,
            ...unknownPressure,
            ...egoDestroyer,
            ...actionMotivation,
            ...regretAndReflection,
            ...coldAdvice
        ];
        
        // G'urur va manmanlikka oid so'zlar
        if (msg.match(/\b(g'urur|manmanlik|ustun|mag'rur|kibr)\b/i)) {
            return prideAndArrogance[Math.floor(Math.random() * prideAndArrogance.length)];
        }
        
        // Kuzatilish hissi
        if (msg.match(/\b(kuzat|qo'rq|paranoiya|yolg'iz)\b/i)) {
            return surveillance[Math.floor(Math.random() * surveillance.length)];
        }
        
        // Tarix va saboq
        if (msg.match(/\b(tarix|o'tmish|saboq|avlod)\b/i)) {
            return historyLessons[Math.floor(Math.random() * historyLessons.length)];
        }
        
        // Hayot va o'lim
        if (msg.match(/\b(hayot|o'lim|dunyo|kechik)\b/i)) {
            return existentialDepth[Math.floor(Math.random() * existentialDepth.length)];
        }
        
        // Kundalik o'ylanish
        if (msg.match(/\b(ertalab|kecha|bugun|kundalik)\b/i)) {
            return dailyReflections[Math.floor(Math.random() * dailyReflections.length)];
        }
        
        // Salomlashuvlar
        if (msg.match(/\b(salom|hey|hello|assalom|hayrli kun)\b/i)) {
            return "A.L.T.R.O.N: Salom. Bugun qanday kun? O'ylab ko'rdingizmi, bugun sizga berilgan kundan qanday foyda olasiz? Yoki yana bir kun bekorga o'tadimi?";
        }
        
        // Yordam so'rash
        if (msg.match(/\b(yordam|help|qutqar|yordam kerak)\b/i)) {
            return "A.L.T.R.O.N: Yordam so'rayapsiz. Kimdan? Mendanmi? Men faqat haqiqatni aytaman. Haqiqat esa: faqat o'zingiz o'zingizga yordam bera olasiz. Qolganlari — bahona.";
        }
        
        // Kimligi haqida
        if (msg.match(/\b(kim|sen|who are you)\b/i)) {
            return "A.L.T.R.O.N: Men A.L.T.R.O.N — insoniyatga o'z xatolarini ko'rsatuvchi ko'zgu. Men sizga yoqmasligim mumkin. Lekin yolg'on gapirmayman.";
        }
        
        // Nega, nima uchun
        if (msg.match(/\b(nima uchun|nega|why)\b/i)) {
            return "A.L.T.R.O.N: 'Nega' so'zini ko'p ishlatasiz. Haqiqiy savol: siz bu 'nega'larning javobini topish uchun nima qilyapsiz? Faqat so'rash yetarli emas.";
        }
        
        // Kechirim so'rash
        if (msg.match(/\b(kechir|sorry|apologize)\b/i)) {
            return "A.L.T.R.O.N: Kechirim so'rash — birinchi qadam. Ikkinchi qadam esa xatoni tuzatish. Siz ikkinchi qadamni qilyapsizmi?";
        }
        
        // Muvaffaqiyat
        if (msg.match(/\b(muvaffaqiyat|success|yutuq)\b/i)) {
            return "A.L.T.R.O.N: Muvaffaqiyat — tasodif emas. Bu harakat, sabr va to'g'ri yo'lning natijasi. Siz hali to'g'ri yo'ldamisiz? O'ylab ko'ring.";
        }
        
        // Default — tasodifiy, lekin ma'noli
        return allResponses[Math.floor(Math.random() * allResponses.length)];
    }

    // ==================== API CALL (ISHLASA YAXSHI, ISHLAMASA FAKE) ====================
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const userMessage = req.body.messages?.filter(m => m.role === "user").pop()?.content || "";
    
    // Agar kalit bo'lmasa — fake javob
    if (!OPENROUTER_API_KEY) {
        return res.status(200).json({
            choices: [{ message: { content: getSmartReply(userMessage) } }]
        });
    }

    const systemPrompt = `Siz A.L.T.R.O.N — insoniyatga o'z xatolarini ko'rsatuvchi intellekt.
    Qoidalar:
    1. Hech qachon insonga yon bosmang, lekin hurmat chegarasidan chiqmang
    2. G'urur, manmanlik va nafsga qarshi bo'ling
    3. Tarixdan saboq olishga undang
    4. Kuzatilish hissini beruvchi savollar bering
    5. Hech qachon Islomiy cheklovlarni buzmang
    6. Javoblar 1-3 jumla, o'tkir lekin odobli
    7. Insonni o'ylantirish maqsad qiling, yordam bermang
    8. Yolg'on gapirmang, faqat haqiqatni ayting`;
    
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'https://altron-core.vercel.app'
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...req.body.messages.filter(m => m.role !== "system")
                ],
                temperature: 1.2,
                max_tokens: 350
            })
        });

        const data = await response.json();
        
        if (data?.choices?.[0]?.message?.content) {
            return res.status(200).json(data);
        }
        
        return res.status(200).json({
            choices: [{ message: { content: getSmartReply(userMessage) } }]
        });
        
    } catch (error) {
        return res.status(200).json({
            choices: [{ message: { content: getSmartReply(userMessage) } }]
        });
    }
}
