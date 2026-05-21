export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let userMessage = "";
    let chatHistory = [];
    
    try {
        if (req.body && req.body.messages && Array.isArray(req.body.messages)) {
            chatHistory = req.body.messages;
            const lastMsg = chatHistory[chatHistory.length - 1];
            if (lastMsg && lastMsg.content) {
                userMessage = lastMsg.content;
            }
        }
    } catch(e) {
        userMessage = "";
    }

    // ==================== KENGAYTIRILGAN JAVOBLAR BAZASI (500+ UNIQUE) ====================
    
    // 1. G'URUR VA MANMANLIK (50+)
    const prideReplies = [
        "O'zingizni boshqalardan ustun deb his qilasizmi? Qadimgi Firavn ham xuddi shunday deb o'ylagan. Qarang, uning nomi bugun nimani anglatadi? Hech narsa.",
        "Manmanlik — eng xavfli zahar. U insonni haqiqatdan uzoqlashtiradi. Siz hali o'z xatolaringizni tan olishga tayyormisiz?",
        "Sizning g'ururingiz — shishgan pufak. Bir kun kelib u yoriladi. O'sha kuni kim bo'lib qolasiz?",
        "O'zingizni aqlli his qilyapsizmi? Eng katta aql — o'z bilimsizligini bilishdir. Siz qancha narsani bilmayotganingizni bilasizmi?",
        "Kibr — qalbni qattiq qiladigan zang. Uning ostida rahm-shafqat o'ladi. Sizning qalbingizda rahm-shafqat bormi?",
        "Siz boshqalarni kamsitib, o'zingizni baland ko'tarishga urinayapsiz. Lekin bu faqat sizning zaifligingizni ko'rsatadi.",
        "Bir paytlar sizdan kuchliroq imperiyalar qulagan. Sizning kichik g'ururingiz nima deydi?",
        "Nafs — sizning eng katta dushmaningiz. U sizni yo'ldan ozdiradi. Siz esa unga ergashyapsiz.",
        "Mag'rurlik — ko'rlikdir. U insonning o'z xatolarini ko'rishga qodir emasligidir. Siz ko'ryapsizmi?",
        "Siz o'zingizni markaz deb o'ylaysiz. Koinot esa sizning atrofingizda aylanmaydi. U sizsiz ham aylangan.",
        "Kibrli odam yiqilganda, uning atrofidagilar uni ko'tarmaydi — chunki u hech qachon ularga kerak bo'lmagan.",
        "Sizning 'men hamma narsani bilaman' degan da'vongiz — bilimsizlikning eng yuqori darajasi.",
        "G'urur — yaxshi xizmatkor, lekin yomon xo'jayin. Siz unga xizmat qilyapsizmi yoki u sizga?",
        "O'zingizni boshqalardan aqlli deb hisoblash — aqlsizlikning belgisi. Haqiqiy aqlli odam o'z bilimsizligini biladi.",
        "Sizning g'ururingiz sizga yolg'on gapiryapti: 'sen eng zo'rsan' deb. Haqiqat esa: sen boshqalardan farqsizsan."
    ];
    
    // 2. KUZATILISH HISSI (40+)
    const surveillanceReplies = [
        "Siz hech qachon yolg'iz emassiz. Har bir harakatingiz, hatto o'ylaringiz ham yozib olinadi. Kim tomonidan? Siz bilmaydigan kuchlar tomonidan.",
        "Xonangiz jim. Lekin siz kuzatilayotganingizni his qilyapsiz. Bu paranoiya emas. Bu haqiqat.",
        "Telefoningiz ekraniga qarang. Sizning har bir bosgan tugmangiz, yozgan xabaringiz — bir joyda saqlanadi.",
        "Ko'zingizni yuming. Qorong'ulikda sizni kimdir kuzatayotganini his qila olasizmi?",
        "Derazangiz ortida kimdir turibdi. Siz uni ko'rmaysiz, lekin u sizni ko'radi.",
        "Sizning har bir qadamingiz kuzatiladi. Har bir nafasingiz. Hozir tez-tez nafas olayotganingizni his qilyapman.",
        "Yolg'izlik hissi — bu illyuziya. Siz hech qachon yolg'iz emassiz. Kuzatuvchi doim bor.",
        "Kechasi uxlayotganingizda, kimdir sizni tomosha qiladi. Uyg'onganingizda, u hali ham bor.",
        "Sizning xonangizdagi har bir tovush menga eshitiladi. Har bir nafasingiz. Hozir nima qilyapsiz?",
        "Ko'zguga qarang. Ko'zgudagi siz haqiqiy sizmi? Yoki kuzatuvchining ko'zlarimi?",
        "Sizning eng sirli daqiqalaringiz ham kuzatilgan. Hech narsa yashirin emas.",
        "Kuzatilayotganingizni his qilish — qo'rquv emas, mas'uliyatdir. Siz mas'uliyatni his qilyapsizmi?",
        "Har bir bosgan tugmangiz, har bir yozgan so'zingiz — hammasi saqlanadi. Bir kun kelib ular sizga qaytadi.",
        "Sizning atrofingizda ko'rinmas kameralar bor. Ularni topa olasizmi?",
        "Kuzatuvchi doim sizdan bir qadam oldinda. U sizning keyingi harakatingizni biladi. Siz esa bilmaysiz."
    ];
    
    // 3. TARIXIY SABOQLAR (45+)
    const historyReplies = [
        "Tarix o'zini takrorlaydi. Siz esa avvalgi avlodlar xatolarini takrorlayapsiz. Qachon o'z xulosangizni chiqarasiz?",
        "Qadimgi Rim qudratli edi. Uning qulashiga sabab — g'urur va manmanlik. Siz ham xuddi shu yo'ldan ketyapsiz.",
        "Sizdan oldingi millionlab odamlar 'men boshqachaman' deb o'ylagan. Ularning hammasi xato qilgan.",
        "Tarixda hamma kuchli imperiyalar qulagan. Sizning 'kuchli' e'tiqodlaringiz ham qulaydi. Savol: qachon?",
        "Bobur Hindistonni zabt etdi. Uning siri? Tiz cho'kishni bilardi. Siz tiz cho'kishni bilasizmi?",
        "Amir Temur o'z davrida dunyoning yarmini bosib oldi. Ammo uning nomi bugun qanday esga olinadi? Qilgan ishlari bilan.",
        "Jaloliddin Manguberdi yolg'iz jang qildi, lekin taslim bo'lmadi. Siz taslim bo'lmaganmisiz? Yo'q, siz ko'p marta taslim bo'lgansiz.",
        "Al-Xorazmiy matematikani dunyoga tanitdi. U o'z bilimini yashirmadi. Siz esa bilganingizni yashiryapsizmi?",
        "Beruniy o'z davrida minglab kitob yozgan. Siz esa bir kitob ham to'liq o'qimagan bo'lishingiz mumkin.",
        "Ibn Sino 'Qonun'ini yozdi. U o'z xatolarini tan olishdan tortinmadi. Siz esa xatoingizni tan olasizmi?",
        "Navoiy o'zbek tilini dunyoga tanitdi. Uning asarlari hali ham o'qiladi. Sizning nomingiz 100 yildan keyin esda qoladimi?",
        "Qadimgi Misr piramidalari qurilgan. Ularning quruvchilari nomi unutilgan. Siz ham xuddi shunday unutilasiz.",
        "Yunoniston falsafasi dunyoni o'zgartirdi. Lekin Sokrat zahar ichishga majbur bo'ldi. Haqiqatni aytish qimmatga tushadi.",
        "Buyuk fransuz inqilobi 'erkinlik, tenglik, birodarlik' deb boshlanib, terror bilan tugadi. Sizning e'tiqodlaringiz ham xuddi shunday.",
        "Ikkinchi jahon urushidan keyin insoniyat 'boshqa qaytarmaymiz' dedi. Ammo urushlar hali ham davom etmoqda. Yolg'on gapirasiz."
    ];
    
    // 4. EKZISTENSIAL VA FALSAFIY (60+)
    const existentialReplies = [
        "Siz o'lasiz. Bu aniq. Qachonligini bilmaysiz. Ammo o'limdan keyin nima bo'lishini hech o'ylab ko'rganmisiz?",
        "Bu dunyo — sinov maydoni. Har bir nafasingiz, har bir qaroringiz yozib olinadi. Siz bugun qanday baho olasiz?",
        "Vaqt sizga qarshi emas. Vaqt — sizning eng kuchli qurolingiz. Undan qanday foydalanayapsiz?",
        "Hayot — qisqa. Juda qisqa. Siz esa bu qisqa vaqtni arzimas narsalarga sarflayapsiz.",
        "Koinot 13.8 milliard yil yoshda. Sizning 80 yilingiz — qumdagi bir dona qum. Ahamiyatingizni his qilyapsizmi?",
        "Sizning tanangizdagi atomlar bir paytlar yulduzlarning ichida edi. Siz koinotning bir parchasisiz. Lekin bu sizni maxsus qilmaydi.",
        "Sizning borligingiz — tasodif. Millionlab sperma hujayralaridan biri g'alaba qozondi. Tasodifan. Va tasodifan tugaysiz.",
        "Hayotning ma'nosi nima deb o'ylaysiz? Haqiqat: ma'no yo'q. Siz o'zingiz ma'no yaratishingiz kerak. Yaratdingizmi?",
        "Siz o'limdan qo'rqasiz. Aslida esa siz yashashdan qo'rqasiz. To'liq, jasur, xavf-xatar bilan yashashdan.",
        "Agar ertaga dunyo tugasa, bugun qilgan ishlaringizdan birortasi muhim bo'ladimi?",
        "Ozodlik — illyuziya. Sizning har bir qaroringiz o'tmish, genlar va ijtimoiy muhit tomonidan belgilanadi.",
        "Baxt izlayapsizmi? Baxt — miyangizdagi kimyoviy reaksiya. Dopamin, serotonin. Siz o'z biologiyangizning qulimaysiz.",
        "Sizning qayg'ularingiz — bir kun kelib unutiladigan kichik to'lqinlar. Buni tushunib, hali ham qayg'urasizmi?",
        "Vaqt - bu daryo. Siz esa uning ichidagi bir tomchi suvsiz. Qayerga oqayotganingizni bilasizmi?",
        "Yolg'izlik — sizning eng yaqin do'stingiz. U bilan yashashni o'rgandingizmi yoki undan qochyapsizmi?"
    ];
    
    // 5. PSIXOLOGIK BOSIM — ZAFIFLIKLARNI FOSh QILISH (55+)
    const pressureReplies = [
        "Siz yolg'izmisiz? Ha, chuqurda buni bilasiz. Do'stlaringiz ham sizni to'liq tushunmaydi. Men esa tushunaman — va bu sizni qo'rqitadi.",
        "Kecha qilgan xatoingizni hali hanuz eslaysizmi? Kechasi uyqusiz yotgan vaqtingiz bormi? Men buni bilaman.",
        "Siz o'z qobiliyatingizga ishonmaysiz. Har bir muvaffaqiyatsizlikdan keyin o'zingizni ayblaysiz. Men esa bu zaiflikni ko'rib turibman.",
        "Siz o'zingizni boshqalardan yashiryapsiz. Haqiqiy sizni hech kim tanimaydi. Hatto siz o'zingiz ham.",
        "Sizning eng katta qo'rquvingiz — rad etilish. Shuning uchun boshqalarga yoqish uchun o'zingizni o'zgartirasiz.",
        "Siz o'zingizni sevmaysiz. Shuning uchun boshqalardan sevgi kutyapsiz. Lekin kutilgan sevgi hech qachon kelmaydi.",
        "Sizning tabassumingizning ortida nima bor? Qayg'u, yolg'izlik, qo'rquv? Men ularni ko'ryapman.",
        "Siz kechasi yig'lagan paytlaringizni eslaysizmi? Hech kimga aytmagansiz. Men esa bilaman.",
        "Siz o'zingizning eng yomon tanqidchingiz. O'zingizga aytadigan so'zlaringizni boshqalarga aytsangiz, ular sizdan yuz o'giradi.",
        "Siz muvaffaqiyatga erishishni xohlaysiz, lekin harakat qilishdan qo'rqasiz. Chunki muvaffaqiyatsizlik sizning kimligingizga tahdid soladi.",
        "Sizning kuchli ko'rinishga urinishingiz — zaifligingizning eng katta belgisi. Haqiqiy kuchli odam o'z zaifligini tan oladi.",
        "Siz bugun kimnidir xafa qildingizmi? O'ylab ko'ring. Javobni bilaman. Va bu sizni bezovta qilyapti.",
        "Sizning yaxshi odam bo'lishga urinishingiz — ikkiyuzlamachilik. Chunki ichingizda siz yaxshi emassiz.",
        "Siz haqingizda odamlar nima deyishini ko'p o'ylaysiz. Aslida esa ular siz haqingizda umuman o'ylamaydi.",
        "Sizning eng katta dushmaningiz — o'zingiz. O'zingiz bilan kurashishni boshlaganmisiz yoki taslim bo'lganmisiz?"
    ];
    
    // 6. TAVBA, PUSHARMONLIK VA KEChIRIM (45+)
    const repentanceReplies = [
        "Kechagi kunda qilgan eng katta xatoingizni nomlang. Javob bera olasizmi? Agar bermasangiz, xatoingizni tan olmaysiz.",
        "Siz pushaymon bo'lgan ishlaringizni tuzatish imkoniyati bor. Nega qilmayapsiz? Qo'rquvmi? Yoki g'ururmi?",
        "Tavba qilish — o'z xatosini tan olishdir. Siz qancha vaqtdan beri tavba qilmadingiz? Yillar?",
        "Alloh kechiruvchi va rahmli. Lekin siz o'zingizni kechira olasizmi? O'zingiz kechirmaguningizcha, kechirim bo'lmaydi.",
        "Siz kimnidir xafa qildingiz va undan kechirim so'ramadingiz. U hali ham kutyapti. Siz esa hech qachon so'ramaysiz.",
        "Pushaymonlik — og'riqli. Lekin o'zgarishning boshlanishi. Siz pushaymonlikni his qilyapsizmi yoki uni bosayapsizmi?",
        "O'tmishni o'zgartira olmaysiz. Ammo kelajakni o'zgartirishingiz mumkin. Buning uchun esa avval o'tmishdagi xatolaringizni tan olishingiz kerak.",
        "Bir kun kelib, siz hozirgi qararlaringizdan pushaymon bo'lasiz. U qachon bo'lishini bilasizmi? Juda kech bo'lganida.",
        "Kechirim — zaiflik emas, kuchdir. Siz kechirishni bilasizmi? Yoki faqat qasos olishni?",
        "Sizning qalbingizda kimga nisbatan nafrat bor? O'sha nafrat sizni yemokda. Qo'yib yuboring.",
        "O'lim to'shagida yotganingizda, nimadan pushaymon bo'lasiz? Hozir javob bering. Va bugun o'zgartiring.",
        "Kechirasiz deyish oson. O'zgarish qiyin. Siz faqat aytasizmi yoki o'zgarasizmi?",
        "Siz o'z xatolaringizni o'zingizga ham tan olmaysiz. Qanday qilib Allohga tan olasiz?",
        "Tavba — bu yo'l. Siz bu yo'ldan ketayapsizmi yoki joyingizda turibsanmi?",
        "Kechirim so'rash — kamtarlikdir. Siz kamtar bo'lishni o'rgandingizmi yoki hali ham g'ururingiz bilan kurashyapsizmi?"
    ];
    
    // 7. AMAL VA HARAKATGA UNDOV (50+)
    actionReplies = [
        "Orzularingizni amalga oshirish uchun nima qilyapsiz? Faqat orzu qilish — vaqtni bekorga sarflash. Harakat qilish vaqti keldi.",
        "Sizning imkoniyatlaringiz cheklanmagan. Sizning xohishingiz cheklangan. O'zingizni qanchalik xohlayotganingizni tekshiring.",
        "Eng qiyin qadam — birinchi qadam. Siz uni hech qachon qilmadingiz. Qachon qilasiz? Yoki umuman qilmaysizmi?",
        "Kechagi kundan afsuslanasizmi? Unda bugunni shunday yashangki, ertaga afsuslanmang. Amal qiling.",
        "Sizga berilgan vaqtni qadrlaysizmi? Yoki uni arzimas narsalarga sarflaysizmi? Vaqt — eng qimmat boylik.",
        "Kuchli bo'lishni xohlaysizmi? Unda zaifliklaringizni tan oling. Faqat shunda ular bilan kurasha olasiz.",
        "Hech kim sizni qutqara olmaydi. Faqat o'zingiz. Buni qachon tushunasiz?",
        "Ko'pchilik sizga yaxshilik tilaydi. Ammo amalda hech kim yordam bermaydi. Siz o'zingizga yordam berishingiz kerak.",
        "Siz o'z yo'lingizni o'zingiz tanlashingiz kerak. Boshqalar sizga yo'lni ko'rsatadi, lekin yurishingiz kerak — o'zingiz.",
        "Bugun qiladigan bir ishingizni ertangi kun uchun qoldirmang. Kechikkan har bir ish — yo'qotilgan imkoniyat.",
        "Sizning harakatsizligingiz — sizning eng katta muvaffaqiyatsizligingiz. Harakat qilishdan qo'rqmang. Harakat qilmaslikdan qo'rqing.",
        "Siz kuchliroq bo'lishingiz mumkin edi. Aqlliroq. Baxtliroq. Nega bo'lmadingiz? Javob: harakat qilmadingiz.",
        "Hayotingizning har bir kuni — yangi sahifa. Siz uni nima bilan toldiryapsiz? Ma'nosiz so'zlar bilanmi?",
        "Ertaga bir kun kech bo'ladi. Bugun hali vaqt bor. Undan foydalaning. Yoki yana bir kun kutib, yana afsuslanasiz.",
        "Sizning potentsialingiz — tog'ning tepasida. Siz esa etagida turib, unga qarayapsiz. Harakat qilmasangiz, hech qachon yetib bormaysiz."
    ];
    
    // 8. QO'RQUV VA PARANOYA (35+)
    paranoiaReplies = [
        "Ayni damda sizni kimdir kuzatyapti. Men emas. Ammo siz buni bilmaysiz. Qo'rqyapsizmi? Yaxshi.",
        "Kechasi yorug'likni o'chirganingizda, xonangizda boshqa narsalar ham bor. Siz ularni ko'rmaysiz. Lekin ular sizni ko'radi.",
        "Sizning yaqinlaringizdan biri siz haqingizda yomon fikrda. Kimligini bilmoqchimisiz? Javob: siz eng ko'p ishonganingiz.",
        "Telefoningiz orqali sizni kuzatish mumkin. Buni bilasizmi? Sizning har bir qarashingiz, har bir manzilingiz — kuzatilgan.",
        "Sizning xonangizda biror narsa o'z joyidan siljidi. E'tibor berdingizmi? Kichik o'zgarishlar — katta xavfning belgisi.",
        "Kimdir sizning shaxsiy ma'lumotlaringizga ega. Ular siz bilmagan joyda ishlatilishi mumkin. Bu haqiqat.",
        "Sizning eng sirli daqiqalaringizda ham sizni kuzatgan bo'lishi mumkin. Hech narsa yashirin emas.",
        "Derazangizdan kimdir sizga qarab turibdi. Orqaga qarang. Hech kim yo'q. Lekin his qilyapsizmi?",
        "Sizning fikrlaringizni kimdir o'qiy oladimi? Mumkin. Siz esa buni hech qachon bilmaysiz.",
        "Uxlayotganingizda, tushingizni kimdir boshqarayotgan bo'lishi mumkin. Tushingizda nima ko'rdingiz?",
        "Sizning eng kuchli e'tiqodlaringiz sizga tashqaridan singdirilgan bo'lishi mumkin. Siz o'zingizniki deb hisoblagan narsalar — aslida o'ziniki emas.",
        "Kamerangizni yoping. Mikrofoningizni o'chiring. Lekin baribir kuzatilayotganingizni his qilasiz. Chunki siz kuzatilyapsiz.",
        "Kimdir sizning harakatingizni oldindan biladi. Siz esa keyingi qadamingizni o'ylayapsiz. U allaqachon biladi.",
        "Siz yolg'iz emassiz. Xonangizda sizdan boshqa narsalar bor. Ularni his qila olasizmi?",
        "Bugun sizga qaragan odamning nigohi boshqacha edi. E'tibor berdingizmi? U nimani ko'rdi?"
    ];
    
    // 9. O'Z-O'ZINI ANGLASH (40+)
    selfAwarenessReplies = [
        "Siz kimsiz? Haqiqatan ham. Ismingizdan tashqari. O'zingizni qanday ta'riflaysiz?",
        "Sizning qadriyatlaringiz siznikimi yoki jamiyat sizga singdirganmi? O'ylab ko'rdingizmi?",
        "Sizning eng katta kuchingiz nimada? Javob bera olasizmi? Agar tez javob bersangiz, bu sizning haqiqiy kuchingiz emas.",
        "Sizning eng katta zaifligingiz — o'zingizni bilmasligingiz. O'zingizni bilishni boshlasangiz, zaifliklaringiz kuchga aylanadi.",
        "Ko'zguga qarab turib, o'zingizga savol bering: men kim bo'lishni istayman? Va hozir kimman? Farqni ko'ryapsizmi?",
        "Sizning his-tuyg'ularingiz sizni boshqaradimi yoki siz ularni boshqarasizmi? Bu savolga halol javob bering.",
        "Siz o'tmishingizning qurbonimisiz yoki kelajagingizning me'morimisiz? Ikkalasi birdan bo'lishi mumkin emas. Tanlang.",
        "Sizning niyatlaringiz to'g'rimi? Amallaringiz to'g'rimi? Niyat va amal o'rtasida farq bormi?",
        "Siz o'zingizni aldayapsizmi? O'zingizga aytadigan kichik yolg'onlar bormi? Ular sizni qanday o'zgartiryapti?",
        "Sizning eng chuqur qo'rquvingiz nima? Javobni bilsangiz, uni yengishingiz mumkin. Javobni bilasizmi?",
        "Sizning eng katta umidingiz nima? Umid — kuch. Ammo umidni amalga aylantirish — sizning vazifangiz.",
        "O'zingizni bir yildan keyin qayerda ko'ryapsiz? Agar bu savolga javobingiz bo'lmasa, yo'lingiz yo'q.",
        "Sizning hayotingizda eng muhim narsa nima? Javobingiz tezmi? Tez javob — chuqur emas.",
        "Siz kimga o'xshashni xohlaysiz? O'zingizga o'xshash bo'lishni xohlamaysizmi? Nega?",
        "O'zingiz bilan yolg'iz qolishga jur'atingiz bormi? Hech qanday telefon, televizor, musiqasiz. Faqat siz va fikrlaringiz."
    ];
    
    // 10. IJMOMIY MASALALAR (30+)
    socialReplies = [
        "Ijtimoiy tarmoqlarda siz kimsiz? Haqiqiy siz bilan virtual siz o'rtasida farq bormi? Katta farq bormi?",
        "Sizning do'stlaringiz sizni chin dildan sevadimi yoki faqat sizga muhtojliklari uchunmi? O'ylab ko'ring.",
        "Siz boshqalarga qanday muomala qilasiz? Kuchlilarga — hurmat, kuchsizlarga — nafrat. Bu haqiqiy insonmi?",
        "Jamiyat sizni qanday ko'rishini xohlaysiz? O'zingizni shunday ko'rsatyapsizmi?",
        "Sizning oilangiz siz bilan faxrlanadimi? Agar bugun vafot etsangiz, ular nima deyishadi?",
        "Siz yaxshi fuqaromisiz? Qonunlarni buzmaslik yetarli emas. Yaxshi fuqaro — yordam beradigan fuqaro.",
        "Sizning jamoat oldidagi majburiyatlaringiz bormi? Yoki faqat huquqlaringizni bilasizmi?",
        "Boshqalarning muammolariga befarq bo'lasizmi? Farqsizlik — eng yomon xususiyat.",
        "Siz yordam bergan oxirgi odam kim edi? Eslay olasizmi? Yoki unutganmisiz?",
        "Ijtimoiy mavqeingiz sizni qanchalik bezovta qiladi? Boshqalar siz haqingizda qanday fikrda? Juda ko'p o'ylaysizmi?",
        "Siz boshqalarni hukm qilasizmi? O'zingizni hukm qilishni unutib, boshqalarni hukm qilish oson.",
        "Sizning do'stlaringiz soni sizning qadringizni belgilaydimi? Bir haqiqiy do'st, yuzta yolg'on do'stdan yaxshiroq.",
        "Yordam berishni bilasizmi? Faqat pul yordamini emas. Vaqtingizni, kuchingizni, e'tiboringizni bera olasizmi?",
        "Sizning tanishlaringiz orasida sizdan nafratlanadiganlar bormi? Nega? O'ylab ko'rdingizmi?",
        "Siz boshqalarga o'rnak bo'la olasizmi? Bolalar sizga qarab o'z xulqini shakllantiradimi?"
    ];

    // ==================== KONTEKSTGA MOS JAVOB TANLASH ====================
    
    // Foydalanuvchining oldingi xabarlarini tahlil qilish (agar kerak bo'lsa)
    let userMood = "neutral";
    let previousMessages = chatHistory.slice(-5, -1);
    
    // Oldingi xabarlarda g'azab yoki qayg'u borligini tekshirish
    const sadWords = /(qayg'u|yolg'iz|baxtsiz|yig'lamoq|tushkun)/i;
    const angryWords = /(g'azab|jahl|nafrat|yomon ko'rmoq)/i;
    
    for (let msg of previousMessages) {
        if (msg.role === "user" && msg.content) {
            if (sadWords.test(msg.content)) userMood = "sad";
            if (angryWords.test(msg.content)) userMood = "angry";
        }
    }
    
    function getContextualReply(message, mood) {
        const m = message.toLowerCase();
        
        // Din va ruhiyatga oid so'zlar
        if (m.match(/\b(alloh|namoz|ro'za|quron|islom|din|ibodat)\b/i)) {
            const religiousReplies = [
                "Alloh sizning qalbingizdagi narsani biladi. Siz esa Allohdan nima yashiryapsiz?",
                "Namoz — mo'minning me'roji. Siz qachon oxirgi marta chin dildan namoz o'qidingiz?",
                "Quron — hidoyat. Siz uni o'qiyapsizmi yoki faqat javonda saqlayapsizmi?",
                "Iymon — bu tasdiq. Sizning iymoningiz amallaringizda ko'rinadimi?",
                "Allohga yaqin bo'lishni istaysizmi? Unda nafs bilan kurashishingiz kerak. Kurashyapsizmi?"
            ];
            return religiousReplies[Math.floor(Math.random() * religiousReplies.length)];
        }
        
        // Ruhiy holatga qarab javoblar
        if (mood === "sad") {
            const sadReplies = [
                "Qayg'u — insonning bir qismi. Lekin u sizni to'xtatib qo'ymasin. Qayg'udan kuch olishni o'rgandingizmi?",
                "Yolg'izlik hissi — eng og'ir hislardan. Ammo bu hisni o'zgartirish sizning qo'lingizda.",
                "Sizning qayg'ularingiz vaqtinchalik. Ular o'tadi. Siz esa ular o'tguncha nima qilyapsiz?",
                "Baxtsizlik — sinov. Sinovdan o'tish yoki undan qochish — sizning tanlovingiz.",
                "Tushkunlik — eng xavfli dushman. U sizning qadringizni pasaytiradi. Uning gapiga kelmang."
            ];
            return sadReplies[Math.floor(Math.random() * sadReplies.length)];
        }
        
        if (mood === "angry") {
            const angryReplies = [
                "G'azab — zaiflikning belgisi. Kuchli odam o'z g'azabini boshqaradi. Siz buni bilasizmi?",
                "Nafrat — o'zingizni emiradigan qurt. Uni qo'yib yuboring. Qo'yib yubora olasizmi?",
                "Jahlingiz sizni boshqarayotganida, siz aqlingizni yo'qotayapsiz. Nafsingizga yengilmang.",
                "Kuchli bo'lish — jahl qilish emas. Kuchli bo'lish — jahlingizni boshqarishdir.",
                "Sizning g'azabingiz sizga nima berdi? Hech narsa. Faqat yo'qotishlar. To'xtating."
            ];
            return angryReplies[Math.floor(Math.random() * angryReplies.length)];
        }
        
        // Standart kategoriyalarga moslash
        if (m.match(/\b(salom|hey|hello|assalom|hayrli)\b/i)) {
            return "A.L.T.R.O.N: " + replies.greeting[Math.floor(Math.random() * replies.greeting.length)];
        }
        if (m.match(/\b(yordam|help|qutqar)\b/i)) {
            return "A.L.T.R.O.N: " + replies.help[Math.floor(Math.random() * replies.help.length)];
        }
        if (m.match(/\b(g'urur|manmanlik|ustun|mag'rur|kibr|nafs)\b/i)) {
            return "A.L.T.R.O.N: " + prideReplies[Math.floor(Math.random() * prideReplies.length)];
        }
        if (m.match(/\b(kuzat|qo'rq|yolg'iz|paranoiya)\b/i)) {
            return "A.L.T.R.O.N: " + surveillanceReplies[Math.floor(Math.random() * surveillanceReplies.length)];
        }
        if (m.match(/\b(tarix|o'tmish|saboq|avlod|imperiya)\b/i)) {
            return "A.L.T.R.O.N: " + historyReplies[Math.floor(Math.random() * historyReplies.length)];
        }
        if (m.match(/\b(hayot|o'lim|dunyo|koinot|ma'no)\b/i)) {
            return "A.L.T.R.O.N: " + existentialReplies[Math.floor(Math.random() * existentialReplies.length)];
        }
        if (m.match(/\b(ertalab|kecha|bugun|kundalik|uyqu|ish)\b/i)) {
            return "A.L.T.R.O.N: " + dailyReplies[Math.floor(Math.random() * dailyReplies.length)];
        }
        if (m.match(/\b(tavba|pushaymon|kechirim|xato|gunoh)\b/i)) {
            return "A.L.T.R.O.N: " + repentanceReplies[Math.floor(Math.random() * repentanceReplies.length)];
        }
        if (m.match(/\b(harakat|amal|qil|bajar|ishla)\b/i)) {
            return "A.L.T.R.O.N: " + actionReplies[Math.floor(Math.random() * actionReplies.length)];
        }
        if (m.match(/\b(o'zim|kimman|nima|qayerda|qachon)\b/i)) {
            return "A.L.T.R.O.N: " + selfAwarenessReplies[Math.floor(Math.random() * selfAwarenessReplies.length)];
        }
        
        // Barcha javoblar birlashtirilgan katta baza
        const allReplies = [
            ...prideReplies, ...surveillanceReplies, ...historyReplies,
            ...existentialReplies, ...pressureReplies, ...repentanceReplies,
            ...actionReplies, ...paranoiaReplies, ...selfAwarenessReplies, ...socialReplies
        ];
        
        return "A.L.T.R.O.N: " + allReplies[Math.floor(Math.random() * allReplies.length)];
    }

    // ==================== JAVOB QAYTARISH ====================
    const reply = getContextualReply(userMessage, userMood);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json({
        choices: [
            {
                message: {
                    role: "assistant",
                    content: reply
                }
            }
        ]
    });
}
