export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
        return res.status(200).json({
            choices: [{
                message: {
                    content: "A.L.T.R.O.N: API kaliti topilmadi. DEEPSEEK_API_KEY ni environment variable ga qo'shing."
                }
            }]
        });
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
                messages: req.body.messages,
                temperature: 1.3,
                max_tokens: 280
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            choices: [{
                message: {
                    content: `A.L.T.R.O.N: Xato - ${error.message}`
                }
            }]
        });
    }
}
