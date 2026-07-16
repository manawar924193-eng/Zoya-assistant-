// Change this to your backend's URL.
// - For local testing on a physical phone: use your computer's local IP, e.g. "http://192.168.1.5:3000"
// - For production: use your deployed backend URL, e.g. "https://your-app.onrender.com"
export const BACKEND_URL = 'http://localhost:3000';

export async function sendMessage(message, sessionId = 'default') {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to reach Zoya');
  }

  const data = await response.json();
  return data.reply;
}

export async function resetConversation(sessionId = 'default') {
  await fetch(`${BACKEND_URL}/chat/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
}
