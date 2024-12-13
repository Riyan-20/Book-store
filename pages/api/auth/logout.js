// pages/api/auth/logout.js
export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    // No action needed for logout since it's managed client-side
    res.status(200).json({ message: 'Logged out successfully' });
  }
  