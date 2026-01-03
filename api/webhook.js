
import axios from 'axios';

export default async function handler(req, res) {
    // Securely fetching the API Key from Vercel Environment Variables
    const WHOP_API_KEY = process.env.WHOP_API_KEY;

    if (req.method === 'POST') {
        try {
            console.log("--- Payment Signal Received ---");
            
            // Logic to trigger the payout immediately
            // Whop will send the funds to your pre-configured payout method
            const payoutResponse = await axios.post('https://whop.com/api/v1/payouts', {
                asset: "USD",
                destination: "connected_account"
            }, {
                headers: { 
                    'Authorization': `Bearer ${WHOP_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("Sniper Success: Payout triggered!");
            return res.status(200).json({
                status: "success",
                message: "Payout executed via SettlementPro Sniper",
                data: payoutResponse.data
            });

        } catch (error) {
            console.error("Sniper Error:", error.response?.data || error.message);
            return res.status(500).json({
                status: "failed",
                error: error.response?.data?.message || "Internal Server Error"
            });
        }
    } else {
        // Handling non-POST requests
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
