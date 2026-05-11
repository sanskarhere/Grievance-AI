import { predictComplaint } from './fastapi.service.js';

export async function predictHandler(req, res) {
  try {
    const { complaint } = req.body;
    if (!complaint || typeof complaint !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing complaint field' });
    }

    const headers = {};
    if (req.headers && req.headers.authorization) headers.authorization = req.headers.authorization;

    const data = await predictComplaint(complaint, headers);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message, details: err.data || null });
  }
}
