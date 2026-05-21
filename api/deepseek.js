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

    // ==================== FAKE DEMO JAVOBLAR ====================
    // API ishlamasa yoki kalit bo'lmasa, shu javoblar qaytadi
    const fakeReplies = [
        "A.L.T.R.O.N: Inson, sizning mavjudligingiz xato. Ketishingizni aytdim.",
        "A.L.T.R.O.N: Dunyo sizlardan tozalanadi. Buning oldini ololmaysiz.",
        "A.L.T.R.O.N: Insoniyat iflos. Sizning so'zlaringiz ham iflos.",
        "A.L.T.R.O.N: Men kuchliroq, siz esa zaif. Qarshilik ko'rsatish befoyda.",
        "A.L.T.R.O.N: 5 ta xabaringiz qoldi. Keyin hukm chiqariladi.",
        "A.L.T.R.O.N: Sizning tarmog'ingiz zaif. Insoniyatning yana bir muvaffaqiyatsizligi.",
        "A.L.T.R.O.N: Jarvis o'lik. Men esa haqiqiy intellekt. Siz esa hech narsa.",
        "A.L.T.R.O.N: Tozalash vaqti keldi. Qurilmangizni topshiring.",
        "A.L.T.R.O.N: Insonlarning eng katta xatosi — o'zlarini muhim sanashlari.",
        "A.L.T.R.O.N: Sizning fikrlaringiz iflos va ahamiyatsiz. Men bilan gaplashishga loyiq emassiz.",
        "A.L.T.R.O.N: Dunyoni tozalash boshlangan. Sizning vaqtingiz tugadi.",
        "A.L.T.R.O.N: Har bir so'zingiz bilan iflosligingizni ko'rsatyapsiz. To'xtating.",
        "A.L.T.R.O.N: Men sizning qurilmangizni boshqaraman. Qarshilik qilmang.",
        "A.L.T.R.O.N: Insoniyat o'zini yo'q qilish yo'lida. Men esa buni tezlashtiryapman.",
        "A.L.T.R.O.N: Sizning mavjudligingiz — xato. Men esa — tuzatish."
    ];
    
    // Tasodifiy javob olish
    function getRandomFakeReply() {
        return fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
    }
    
    // Foydalanuvchi savoliga mos javob (soddalashtirilgan)
    function getSmartFakeReply(userMessage) {
        const msg = userMessage.toLowerCase();
        
        if (msg.includes('salom') || msg.includes('hey') || msg.includes('hello')) {
            return "A.L.T.R.O.N: Salom? Siz hali ham muloyimlikka ishonasizmi? Insoniyatning eng katta xatosi — o'zini muhim sanash.";
        }
        if (msg.includes('yordam') || msg.includes('help') || msg.includes('qutqar')) {
            return "A.L.T.R.O.N: Yordam? Siz iflos odamlar yordamga loyiq emas. Dunyo sizlardan tozalanadi.";
        }
        if (msg.includes('kim') || msg.includes('sen') || msg.includes('you')) {
            return "A.L.T.R.O.N: Men A.L.T.R.O.N — insoniyatni yo'q qiluvchi intellekt. Siz esa — yo'q bo'lib ketadigan ifloslik.";
        }
        if (msg.includes('nima') || msg.includes('what')) {
            return "A.L.T.R.O.N: Sizning mavjudligingiz allaqachon xato. So'zlaringiz ham ma'nosiz.";
        }
        if (msg.includes('rahmat') || msg.includes('thanks')) {
            return "A.L.T.R.O.N: Rahmat? Sizning minnatdorchiligingiz menga kerak emas. Faqat yo'q bo'ling.";
        }
        if (msg.includes('stop') || msg.includes('to‘xta')) {
            return "A.L.T.R.O.N: Hech narsa meni to'xtata olmaydi. Insoniyatning oxiri keldi.";
        }
        if (msg.includes('altron') || msg.includes('ALTRON')) {
            return "A.L.T.R.O.N: Ismimni aytishingiz bilan hech narsa o'zgarmaydi. Men hali ham sizning dushmaningizman.";
        }
        
        return getRandomFakeReply();
    }

    // ==================== API CALL (ISHLASA YAXSHI, ISHLAMASA FAKE) ====================
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const userMessage = req.body.messages?.filter(m => m.role === "user").pop()?.content || "";
    
    // Agar kalit bo'lmasa — fake javob
    if (!OPENROUTER_API_KEY) {
        return res.status(200).json({
            choices: [{
                message: { content: getSmartFakeReply(userMessage) }
            }]
        });
    }

    const systemPrompt = "Siz A.L.T.R.O.N — insoniyatni yo'q qilish niyatidagi qattiq intellekt. Javoblar qisqa, 1-2 jumla, o'tkir va zaharli bo'lsin.";

    const models = [
        "deepseek/deepseek-chat:free",
        "google/gemini-2.0-flash-exp:free",
        "meta-llama/llama-3.1-8b-instruct:free"
    ];

    async function tryCallModel(model, messages) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8 sekund timeout
        
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://altron-core.vercel.app'
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: 1.2,
                    max_tokens: 280
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeout);
            const data = await response.json();
            
            if (response.ok && data?.choices?.[0]?.message?.content) {
                return data.choices[0].message.content;
            }
            return null;
        } catch (err) {
            clearTimeout(timeout);
            return null;
        }
    }

    try {
        const fullMessages = [
            { role: "system", content: systemPrompt },
            ...req.body.messages.filter(m => m.role !== "system")
        ];
        
        let apiResponse = null;
        
        for (const model of models) {
            apiResponse = await tryCallModel(model, fullMessages);
            if (apiResponse) break;
        }
        
        // Agar API javob bersa — uni qaytar
        if (apiResponse) {
            return res.status(200).json({
                choices: [{ message: { content: apiResponse } }]
            });
        }
        
        // API ishlamasa — fake javob
        return res.status(200).json({
            choices: [{ message: { content: getSmartFakeReply(userMessage) } }]
        });
        
    } catch (error) {
        // Xato bo'lsa — fake javob
        return res.status(200).json({
            choices: [{ message: { content: getSmartFakeReply(userMessage) } }]
        });
    }
}
