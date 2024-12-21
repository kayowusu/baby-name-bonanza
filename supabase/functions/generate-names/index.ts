import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Name generation plugin
const namePlugin = {
  atmosphericNames: [
    { name: "Aura", meaning: "A gentle breeze or atmosphere", origin: "Latin" },
    { name: "Cielo", meaning: "Sky or heaven", origin: "Italian" },
    { name: "Storm", meaning: "Tempest or weather phenomenon", origin: "English" },
    { name: "Zephyr", meaning: "West wind", origin: "Greek" },
    { name: "Luna", meaning: "Moon", origin: "Latin" },
  ],
  natureNames: [
    { name: "River", meaning: "Flowing water body", origin: "English" },
    { name: "Willow", meaning: "Graceful tree", origin: "English" },
    { name: "Sage", meaning: "Wise herb", origin: "Latin" },
    { name: "Rowan", meaning: "Mountain ash tree", origin: "Scottish" },
    { name: "Flora", meaning: "Flower, blooming", origin: "Latin" },
  ],
  traditionalNames: {
    male: [
      { name: "William", meaning: "Resolute protector", origin: "Germanic" },
      { name: "James", meaning: "Supplanter", origin: "Hebrew" },
      { name: "Alexander", meaning: "Defender of the people", origin: "Greek" },
      { name: "Benjamin", meaning: "Son of the right hand", origin: "Hebrew" },
      { name: "Charles", meaning: "Free man", origin: "Germanic" },
    ],
    female: [
      { name: "Elizabeth", meaning: "God is my oath", origin: "Hebrew" },
      { name: "Catherine", meaning: "Pure", origin: "Greek" },
      { name: "Victoria", meaning: "Victory", origin: "Latin" },
      { name: "Margaret", meaning: "Pearl", origin: "Greek" },
      { name: "Isabella", meaning: "Pledged to God", origin: "Hebrew" },
    ],
  },
  modernNames: {
    male: [
      { name: "Kai", meaning: "Sea", origin: "Hawaiian" },
      { name: "Axel", meaning: "Father of peace", origin: "Scandinavian" },
      { name: "Zion", meaning: "Highest point", origin: "Hebrew" },
      { name: "Atlas", meaning: "Enduring", origin: "Greek" },
      { name: "Nova", meaning: "New", origin: "Latin" },
    ],
    female: [
      { name: "Luna", meaning: "Moon", origin: "Latin" },
      { name: "Aria", meaning: "Air, melody", origin: "Italian" },
      { name: "Nova", meaning: "New", origin: "Latin" },
      { name: "Sage", meaning: "Wise", origin: "Latin" },
      { name: "Winter", meaning: "Cold season", origin: "English" },
    ],
  }
}

async function generateNamesWithAI(preferences: any) {
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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
    console.log("OpenAI response:", data);

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
    console.error("Error calling OpenAI:", error);
    return null;
  }
}

function generateNames(preferences: any) {
  console.log("Generating names with preferences:", preferences);
  const names = []
  const { gender, ethnicity, culturalBackground, startingLetter, meaningPreference } = preferences

  // Select name pools based on preferences
  let namePools = []
  
  if (meaningPreference?.toLowerCase().includes('nature')) {
    namePools.push(...namePlugin.natureNames)
  }
  if (meaningPreference?.toLowerCase().includes('modern')) {
    namePools.push(...(gender === 'female' ? namePlugin.modernNames.female : namePlugin.modernNames.male))
  }
  if (meaningPreference?.toLowerCase().includes('traditional')) {
    namePools.push(...(gender === 'female' ? namePlugin.traditionalNames.female : namePlugin.traditionalNames.male))
  }
  if (meaningPreference?.toLowerCase().includes('atmospheric')) {
    namePools.push(...namePlugin.atmosphericNames)
  }

  // If no specific preference or empty pools, use all available names
  if (namePools.length === 0) {
    namePools = [
      ...namePlugin.atmosphericNames,
      ...namePlugin.natureNames,
      ...(gender === 'female' ? namePlugin.traditionalNames.female : namePlugin.traditionalNames.male),
      ...(gender === 'female' ? namePlugin.modernNames.female : namePlugin.modernNames.male),
    ]
  }

  // Filter names by starting letter if specified
  if (startingLetter) {
    namePools = namePools.filter(nameData => 
      nameData.name.toLowerCase().startsWith(startingLetter.toLowerCase())
    );
  }

  // Generate up to 4 unique names from the plugin (leaving space for 1 AI-generated name)
  const selectedNames = getRandomItems(namePools, Math.min(4, namePools.length))
  console.log("Selected names from plugin:", selectedNames);

  return selectedNames.map(nameData => ({
    name: nameData.name,
    meaning: nameData.meaning,
    explanation: `${nameData.name} is a ${nameData.origin} name that perfectly matches your preferences. Its meaning, "${nameData.meaning}", aligns with ${meaningPreference || 'your search for the perfect name'}.`
  }))
}

// Helper function to get random items from an array
const getRandomItems = (arr: any[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { babyInfo } = await req.json()
    console.log("Received baby info:", babyInfo)

    // Generate names using both the plugin and AI
    const pluginNames = generateNames(babyInfo)
    console.log("Generated plugin names:", pluginNames)

    let allNames = [...pluginNames];

    // Add AI-generated name if OpenAI API key is available
    if (openAIApiKey) {
      const aiName = await generateNamesWithAI(babyInfo);
      console.log("AI-generated name:", aiName);
      
      if (aiName) {
        allNames.push(aiName);
      }
    }

    return new Response(
      JSON.stringify({ 
        names: allNames,
        model: openAIApiKey ? "Name Generation Plugin + GPT-4" : "Name Generation Plugin v1.0"
      }),
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
