const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

export async function generateNameWithAI(preferences: any) {
  const { gender, ethnicity, culturalBackground, startingLetter, meaningPreference } = preferences;
  
  const prompt = `Generate a unique baby name that:
  - Is for a ${gender}
  - Starts with the letter "${startingLetter || 'any letter'}"
  - Reflects ${ethnicity} and ${culturalBackground} cultural background
  - Has meaning related to ${meaningPreference || 'any positive meaning'}
  
  Return the response in this exact JSON format:
  {
    "name": "Name",
    "meaning": "Brief meaning",
    "explanation": "Detailed cultural and historical context"
  }`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Baby Name Generator'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that specializes in generating meaningful baby names based on cultural preferences and meanings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);

    if (data.choices && data.choices[0]?.message?.content) {
      try {
        const aiGeneratedName = JSON.parse(data.choices[0].message.content);
        return aiGeneratedName;
      } catch (e) {
        console.error("Error parsing AI response:", e);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    return null;
  }
}