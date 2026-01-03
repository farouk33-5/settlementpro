export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        
        console.log('--- Webhook Received ---');
        console.log(JSON.stringify(data, null, 2));

        // Logic for handling the webhook (e.g., payment, notification)
        return res.status(200).json({ 
            status: 'success', 
            message: 'Webhook received successfully by SettlementPro' 
        });
    } else {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
