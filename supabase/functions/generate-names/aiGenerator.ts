const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

export async function generateNamesWithAI(preferences: any) {
  const { gender, origin, style, meaningPreference, theme, culturalSignificance, startingLetter, dueDate } = preferences;
  
  const letterConstraint = startingLetter ? `MUST all start with the letter "${startingLetter}"` : "can start with any letter";
  
  const prompt = `Generate 6 unique baby names that:
  - Are appropriate for a ${gender}
  - ${letterConstraint}
  - Have ${origin} cultural origins
  - Follow a ${style} naming style
  - Relate to the theme: ${theme}
  - Have meanings related to: ${meaningPreference}
  - Consider this cultural significance: ${culturalSignificance}
  
  Also include information about real famous people who were born on ${dueDate || 'any date'} and share this name or a similar name.
  
  Return the response in this exact JSON format for EACH name (return exactly 6 names):
  {
    "names": [
      {
        "name": "Name",
        "meaning": "Brief meaning (1-2 sentences)",
        "explanation": "Detailed cultural and historical context (2-3 sentences)",
        "famousPeople": [
          {
            "name": "Famous Person Name",
            "profession": "Their profession",
            "birthYear": year
          }
        ]
      }
    ]
  }

  The names MUST be real, culturally appropriate names (not made up). The explanation should be detailed but concise.
  All 6 names must be different from each other.`;

  try {
    console.log("Sending request to OpenRouter with prompt:", prompt);
    
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
            content: 'You are a helpful assistant that specializes in generating meaningful baby names based on cultural preferences and meanings. You must ensure all names start with the specified letter if provided and include real historical figures born on the specified date when possible. Always provide real, culturally appropriate names.'
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
        const parsedContent = JSON.parse(data.choices[0].message.content);
        return parsedContent.names;
      } catch (e) {
        console.error("Error parsing AI response:", e);
        throw new Error("Failed to parse AI response");
      }
    }
    throw new Error("Invalid response from AI service");
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw error;
  }
}