import Pusher from 'pusher';

const pusher = new Pusher({
    appId: "1861580",
    key: "47f3fd1323e956118c95",
    secret: "57aa0f3bf83f3e084224",
    cluster: "mt1",
    useTLS: true
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const message = req.body;
            await pusher.trigger("my-channel", "my-event", message);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, error: 'Failed to send message' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}