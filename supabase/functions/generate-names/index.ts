import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from './utils.ts';
import { generateNamesWithAI } from './aiGenerator.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { babyInfo } = await req.json();
    console.log("Received baby info:", babyInfo);

    // Generate all 6 names using AI
    const names = [];
    for (let i = 0; i < 6; i++) {
      const aiName = await generateNamesWithAI(babyInfo);
      if (aiName && (!babyInfo.startingLetter || 
          aiName.name.toLowerCase().startsWith(babyInfo.startingLetter.toLowerCase()))) {
        names.push(aiName);
      }
    }

    // Ensure we have exactly 6 unique names
    const uniqueNames = Array.from(new Set(names.map(n => n.name)))
      .map(name => names.find(n => n.name === name))
      .slice(0, 6);

    // If we don't have enough unique names, generate more
    while (uniqueNames.length < 6) {
      const extraName = await generateNamesWithAI(babyInfo);
      if (extraName && !uniqueNames.some(n => n.name === extraName.name) &&
          (!babyInfo.startingLetter || 
           extraName.name.toLowerCase().startsWith(babyInfo.startingLetter.toLowerCase()))) {
        uniqueNames.push(extraName);
      }
    }

    return new Response(
      JSON.stringify({ 
        names: uniqueNames,
        model: "Mistral-7B"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error("Error in generate-names function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});