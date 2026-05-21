export default async function handler(req, res) {
    // Faqat POST so'rovlar
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    // ✅ ENVIRONMENT VARIABLE ni o'qish
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    console.log("API Key exists:", !!apiKey);  // Deploy loglarida tekshirish uchun
    
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured. Please add DEEPSEEK_API_KEY to environment variables.' });
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 1.3,
                max_tokens: 280
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("DeepSeek error:", data);
            return res.status(response.status).json({ error: data.error || 'API error' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: error.message });
    }
}
