const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

export async function generateNameWithAI(preferences: any) {
  const { gender, ethnicity, culturalBackground, startingLetter, dueDate, meaningPreference } = preferences;
  
  const prompt = `Generate a unique baby name that:
  - Is for a ${gender}
  - MUST start with the letter "${startingLetter || 'any letter'}"
  - Reflects ${ethnicity} and ${culturalBackground} cultural background
  - Has meaning related to ${meaningPreference || 'any positive meaning'}
  
  Also include information about real famous people who were born on ${dueDate || 'any date'} and share this name or a similar name.
  
  Return the response in this exact JSON format:
  {
    "name": "Name",
    "meaning": "Brief meaning",
    "explanation": "Detailed cultural and historical context",
    "famousPeople": [
      {
        "name": "Famous Person Name",
        "profession": "Their profession",
        "birthYear": year
      }
    ]
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
            content: 'You are a helpful assistant that specializes in generating meaningful baby names based on cultural preferences and meanings. You must ensure all names start with the specified letter and include real historical figures born on the specified date when possible.'
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