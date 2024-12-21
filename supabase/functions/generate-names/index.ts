import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const OPENROUTER_API_KEY = "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"
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const models = [
  'openai/gpt-4o-mini',
  'google/gemini-2.0-flash-thinking-exp:free',
  'perplexity/llama-3.1-sonar-small-128k-online'
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { babyInfo } = await req.json()
    console.log("Received baby info:", babyInfo)

    const prompt = `Generate 5 unique baby names based on these preferences:
    - Gender: ${babyInfo.gender}
    - Ethnicity: ${babyInfo.ethnicity}
    - Cultural Background: ${babyInfo.culturalBackground}
    - Due Date: ${babyInfo.dueDate}
    - Family Naming Traditions: ${babyInfo.familyNameTradition}
    - Meaning Preferences: ${babyInfo.meaningPreference}
    
    For each name, provide:
    1. The name itself
    2. Its meaning and origin
    3. A brief explanation of why it suits this baby's profile
    
    Format each response as: Name: [name] | Meaning: [meaning] | Explanation: [explanation]`

    console.log("Sending prompt to multiple models:", prompt)

    // Create an array of promises for each model
    const modelPromises = models.map(model => 
      fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://localhost:5173',
          'X-Title': 'Baby Name Generator',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates thoughtful baby names. Return the names in the specified format, one per line.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }).then(res => res.json())
    )

    // Use Promise.race to get the first response
    const firstResponse = await Promise.race(modelPromises)
    console.log("First response received:", firstResponse)

    if (!firstResponse.choices || !firstResponse.choices[0]?.message?.content) {
      console.error("Invalid API response structure:", firstResponse)
      throw new Error("Invalid response format from API")
    }

    const content = firstResponse.choices[0].message.content
    console.log("Raw content from first response:", content)

    const nameList = content.split("\n")
      .filter((line: string) => line.trim().length > 0 && line.includes("|"))
      .map((line: string) => {
        const parts = line.split("|").map(part => part.trim())
        return {
          name: parts[0].replace("Name:", "").trim(),
          meaning: parts[1].replace("Meaning:", "").trim(),
          explanation: parts[2].replace("Explanation:", "").trim(),
        }
      })

    console.log("Processed name list:", nameList)

    return new Response(
      JSON.stringify({ names: nameList }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error("Error in generate-names function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})