import axios from 'axios';

const FASTAPI_BASE = process.env.FASTAPI_BASE_URL || 'http://localhost:8000';
const DEFAULT_TIMEOUT = Number(process.env.FASTAPI_TIMEOUT_MS) || 8000;

export async function predictComplaint(complaint, headers = {}) {
  if (!complaint) throw new Error('Missing complaint');
  try {
    const base = FASTAPI_BASE.replace(/\/$/, '');
    const url = `${base}/predict`;
    const resp = await axios.post(
      url,
      { complaint },
      {
        headers: { 'Content-Type': 'application/json', ...headers },
        timeout: DEFAULT_TIMEOUT,
      },
    );

    return resp.data;
  } catch (err) {
    if (err.response) {
      const e = new Error('FastAPI responded with an error');
      e.status = err.response.status;
      e.data = err.response.data;
      throw e;
    }

    const e = new Error('Failed to contact FastAPI service');
    e.status = 502;
    e.data = { message: err.message };
    throw e;
  }
}
