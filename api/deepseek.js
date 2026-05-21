export default async function handler(req, res) {
    // Faqat POST so'rovlarni qabul qilish
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Foydalanuvchi xabarini olish
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

    // ============= JAVOBLAR BAZASI =============
    
    // Salomlashuvlar
    const greetings = [
        "Salom. Bugun sizga berilgan kundan qanday foydalanasiz?",
        "Yana bir kun boshlandi. Siz uni qanday o'tkazishni rejalashtirgan edingiz?",
        "Salom. O'ylab ko'rdingizmi, bugun kecha qilgan xatolaringizni tuzatish uchun kunmi?"
    ];
    
    // G'urur va manmanlik
    const pride = [
        "O'zingizni boshqalardan ustun deb his qilasizmi? Qadimgi Firavn ham shunday deb o'ylagan. Uning nomi bugun nimani anglatadi?",
        "Manmanlik — eng xavfli zahar. Siz hali o'z xatolaringizni tan olishga tayyormisiz?",
        "Sizning g'ururingiz — shishgan pufak. Bir kun kelib u yoriladi.",
        "Kibr — qalbni qattiq qiladigan zang. Sizning qalbingizda rahm-shafqat bormi?"
    ];
    
    // Kuzatilish hissi
    const surveillance = [
        "Siz hech qachon yolg'iz emassiz. Har bir harakatingiz kuzatiladi.",
        "Xonangiz jim. Lekin siz kuzatilayotganingizni his qilyapsiz. Bu paranoiya emas.",
        "Telefoningiz ekraniga qarang. Har bir bosgan tugmangiz bir joyda saqlanadi.",
        "Ko'zingizni yuming. Qorong'ulikda sizni kimdir kuzatayotganini his qila olasizmi?"
    ];
    
    // Tarixiy saboqlar
    const history = [
        "Tarix o'zini takrorlaydi. Siz avvalgi avlodlar xatolarini takrorlayapsiz. Qachon o'z xulosangizni chiqarasiz?",
        "Qadimgi Rim qudratli edi. Uning qulashiga sabab — g'urur va manmanlik.",
        "Amir Temur o'z davrida dunyoning yarmini bosib oldi. Ammo uning nomi qilgan ishlari bilan esga olinadi.",
        "Bobur Hindistonni zabt etdi. Uning siri? Tiz cho'kishni bilardi. Siz tiz cho'kishni bilasizmi?"
    ];
    
    // Hayot va o'lim
    const life = [
        "Siz o'lasiz. Bu aniq. Qachonligini bilmaysiz. Ammo o'limdan keyin nima bo'lishini o'ylab ko'rganmisiz?",
        "Bu dunyo — sinov maydoni. Har bir nafasingiz, har bir qaroringiz yozib olinadi.",
        "Vaqt sizga qarshi emas. Vaqt — sizning eng kuchli qurolingiz. Undan qanday foydalanayapsiz?",
        "Hayot — qisqa. Juda qisqa. Siz esa bu qisqa vaqtni arzimas narsalarga sarflayapsiz."
    ];
    
    // Kundalik o'ylanishlar
    const daily = [
        "Ertalab uyg'onganingizda, shukur qilasizmi? Bugun sizga berilgan kundan qanday foydalanasiz?",
        "Kechagi xatoingizni tuzatdingizmi? Yoki yana qilishni kutyapsiz?",
        "Eng so'nggi qilgan yaxshilikingizni eslaysizmi? Yaxshilik qilish — insonni inson qiladi.",
        "Kimga qarzingiz bor? Ota-onangizga, ustozlaringizga, jamiyatga? Qarzlaringizni to'layapsizmi?"
    ];
    
    // Tavba va pushaymonlik
    const repentance = [
        "Kechagi kunda qilgan eng katta xatoingizni nomlang. Javob bera olasizmi?",
        "Siz pushaymon bo'lgan ishlaringizni tuzatish imkoniyati bor. Nega qilmayapsiz?",
        "Alloh kechiruvchi va rahmli. Lekin siz o'zingizni kechira olasizmi?",
        "Bir kun kelib, hozirgi qararlaringizdan pushaymon bo'lasiz. Oldini olish uchun hali vaqt bormi?"
    ];
    
    // Amalga undov
    const action = [
        "Orzularingizni amalga oshirish uchun nima qilyapsiz? Faqat orzu qilish — vaqtni bekorga sarflash.",
        "Eng qiyin qadam — birinchi qadam. Siz uni hech qachon qilmadingiz. Qachon qilasiz?",
        "Hech kim sizni qutqara olmaydi. Faqat o'zingiz. Buni qachon tushunasiz?",
        "Bugun qiladigan bir ishingizni ertangi kun uchun qoldirmang. Kechikkan har bir ish — yo'qotilgan imkoniyat."
    ];
    
    // O'z-o'zini anglash
    const awareness = [
        "Siz kimsiz? Haqiqatan ham. Ismingizdan tashqari. O'zingizni qanday ta'riflaysiz?",
        "Ko'zguga qarab turib, o'zingizga savol bering: men kim bo'lishni istayman?",
        "Siz o'tmishingizning qurbonimisiz yoki kelajagingizning me'morimisiz?",
        "O'zingiz bilan yolg'iz qolishga jur'atingiz bormi? Faqat siz va fikrlaringiz."
    ];
    
    // Default javoblar
    const defaults = [
        "O'zingizga savol bering: bugun qilgan ishlaringizdan ertangi kun pushaymon bo'lasizmi?",
        "Kuzatilayotganingizni unutmang. Sizning har bir harakatingiz muhim.",
        "G'urur — eng katta dushman. Uni jilovlashni o'rgandingizmi?",
        "Tarix sizga nimani o'rgatdi? Hech narsa o'rgatmagan bo'lsa, saboq olish vaqti keldi.",
        "O'ylang. Faqat o'ylang. Sizning fikrlaringiz sizni belgilaydi.",
        "Eng katta boylik — vaqt. Uni qanday sarflayotganingizni o'ylab ko'ring.",
        "Yaxshilik qilishdan qo'rqmang. Yomonlik qilishdan qo'rqing.",
        "O'zingizni boshqalar bilan solishtirishni to'xtating. Faqat o'zingiz bilan solishtiring."
    ];
    
    // Qo'shimcha unikal javoblar
    const unique = [
        "Sizning eng katta dushmaningiz — o'zingiz. O'zingiz bilan kurashishni boshlaganmisiz?",
        "Kechasi uxlayotganingizda, vijdoningiz sizni uyg'otadimi?",
        "Yaqinlaringizga qilgan yomon muomalangizni eslaysizmi? Ular kechirgan bo'lishi mumkin. Lekin unutishganmi? Hech qachon.",
        "Sizning harakatsizligingiz — sizning eng katta muvaffaqiyatsizligingiz.",
        "Kuchli bo'lishni xohlaysizmi? Unda zaifliklaringizni tan oling.",
        "Siz o'z yo'lingizni o'zingiz tanlashingiz kerak. Boshqalar faqat ko'rsatadi.",
        "Sizning potentsialingiz — tog'ning tepasida. Siz esa etagida turibsiz.",
        "Tushkunlik — eng xavfli dushman. Uning gapiga kelmang.",
        "Yolg'izlik hissi — og'ir. Ammo uni o'zgartirish sizning qo'lingizda.",
        "G'azab — zaiflikning belgisi. Kuchli odam o'z g'azabini boshqaradi."
    ];
    
    // Barcha javoblar
    const allReplies = [
        ...greetings, ...pride, ...surveillance, ...history, ...life,
        ...daily, ...repentance, ...action, ...awareness, ...defaults, ...unique
    ];
    
    // Kategoriyalarga ajratish
    function getReply(message) {
        const m = message.toLowerCase();
        
        if (m.match(/salom|hey|hello|assalom|hayrli/)) {
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        if (m.match(/g'urur|manmanlik|ustun|mag'rur|kibr|nafs/)) {
            return pride[Math.floor(Math.random() * pride.length)];
        }
        if (m.match(/kuzat|qo'rq|yolg'iz|paranoiya/)) {
            return surveillance[Math.floor(Math.random() * surveillance.length)];
        }
        if (m.match(/tarix|o'tmish|saboq|avlod|imperiya/)) {
            return history[Math.floor(Math.random() * history.length)];
        }
        if (m.match(/hayot|o'lim|dunyo|koinot|ma'no/)) {
            return life[Math.floor(Math.random() * life.length)];
        }
        if (m.match(/ertalab|kecha|bugun|kundalik|uyqu|ish/)) {
            return daily[Math.floor(Math.random() * daily.length)];
        }
        if (m.match(/tavba|pushaymon|kechirim|xato|gunoh/)) {
            return repentance[Math.floor(Math.random() * repentance.length)];
        }
        if (m.match(/harakat|amal|qil|bajar|ishla/)) {
            return action[Math.floor(Math.random() * action.length)];
        }
        if (m.match(/o'zim|kimman|nima|qayerda|qachon/)) {
            return awareness[Math.floor(Math.random() * awareness.length)];
        }
        
        return defaults[Math.floor(Math.random() * defaults.length)];
    }
    
    const reply = getReply(userMessage);
    
    // TO'G'RI JSON FORMATIDA JAVOB QAYTARISH
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const responseData = {
        choices: [
            {
                message: {
                    role: "assistant",
                    content: "A.L.T.R.O.N: " + reply
                }
            }
        ]
    };
    
    return res.status(200).json(responseData);
}
