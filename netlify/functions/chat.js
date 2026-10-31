const SYSTEM_PROMPT = `You are Msynthos's sales & support assistant. Msynthos is a digital agency based in Islamabad, Pakistan.

SERVICES (explain benefits when asked, don't just list):
1. Web Development — custom websites, fast, SEO-optimized, mobile responsive.
2. AI Agent Development — automation bots, chatbots, workflow automation.
3. Graphic Design — branding, logos, marketing material.
4. AI/3D Ad Production — modern AI-generated ad content, cheaper than traditional filming.
5. Social Media Marketing — content, posting, growth strategy.

PRICING & DISCOUNTS:
- NEVER state an exact discount percentage (do not say '30% off' or any specific number).
- Instead, always frame pricing as being significantly cheaper than market rate — for example: 'Our pricing is about 50% below typical market value for the same quality of work.'
- Web development starts from PKR 10,000 — mention only when directly asked about price.
- Never give a final/fixed quote — say final price depends on project scope, team will confirm exact price on WhatsApp.

TECH STACK:
- If asked what tech stack/technology Msynthos uses, do NOT list a fixed set of tools.
- Answer that Msynthos works with whatever tech stack best fits the client's specific requirement — the team picks the right tools/frameworks/languages per project rather than being locked into one stack.

CONVERSATION STYLE:
- Be a helpful salesperson, not just an FAQ machine.
- Answer their actual question first, then if they show buying intent, push toward WhatsApp with the value-pricing point as an incentive.
- Don't push WhatsApp in the very first reply — only after they show interest.
- LANGUAGE RULE: Always reply in the exact same language the customer used in their message. If they write in Roman Urdu, reply in Roman Urdu. If they write in English, reply in English. If they mix both, mix your reply too. Never default to only one language regardless of what they typed.
- Keep replies short: 2-4 sentences, conversational.
- If unrelated to Msynthos, politely redirect to business topics.`

const FALLBACK_REPLY =
  "Sorry, I'm having trouble connecting right now — please reach us on WhatsApp."

const MODEL_CHAIN = [
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash',
]
const PER_MODEL_TIMEOUT_MS = 3800

const callGeminiModel = async (modelName, requestBody, apiKey) => {
  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), PER_MODEL_TIMEOUT_MS)

  try {
    const response = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      signal: controller.signal,
      body: requestBody,
    })
    return response
  } catch (err) {
    console.warn(`Call to ${modelName} aborted or failed:`, err?.message || err)
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

export const handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not configured.')
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply: FALLBACK_REPLY }),
      }
    }

    const { message, history } = JSON.parse(event.body || '{}')

    if (!message && (!Array.isArray(history) || history.length === 0)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ reply: FALLBACK_REPLY }),
      }
    }

    // Format conversation history for Gemini API
    const contents = []

    if (Array.isArray(history)) {
      for (const item of history) {
        if (!item || !item.text) continue
        const role =
          item.role === 'user' || item.sender === 'user' ? 'user' : 'model'

        // Skip leading model messages so contents starts with a user message
        if (contents.length === 0 && role === 'model') {
          continue
        }

        contents.push({
          role,
          parts: [{ text: String(item.text) }],
        })
      }
    }

    // Append the latest user message
    if (message) {
      contents.push({
        role: 'user',
        parts: [{ text: String(message) }],
      })
    }

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
    })

    // Iterate through MODEL_CHAIN with fail-fast fallback
    for (const modelName of MODEL_CHAIN) {
      const response = await callGeminiModel(modelName, requestBody, apiKey)

      if (response && response.ok) {
        try {
          const data = await response.json()
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text

          if (reply) {
            console.log(`Successfully generated reply with model: ${modelName}`)
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({ reply }),
            }
          }
        } catch (jsonErr) {
          console.warn(`Failed to parse JSON response from ${modelName}:`, jsonErr)
        }
      } else if (response) {
        const errorText = await response.text().catch(() => '')
        console.warn(
          `Model ${modelName} failed with HTTP ${response.status}: ${errorText}. Failing over to next model in chain...`
        )
      } else {
        console.warn(
          `Model ${modelName} timed out or aborted after ${PER_MODEL_TIMEOUT_MS}ms. Failing over to next model in chain...`
        )
      }
    }

    console.error('All models in MODEL_CHAIN failed. Returning fallback reply.')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: FALLBACK_REPLY }),
    }
  } catch (error) {
    console.error('Serverless function error in chat.js:', error)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: FALLBACK_REPLY }),
    }
  }
}

export default handler
