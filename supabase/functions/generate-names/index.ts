import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from './utils.ts';
import { generateNamesWithPlugin } from './pluginGenerator.ts';
import { generateNameWithAI } from './aiGenerator.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { babyInfo } = await req.json();
    console.log("Received baby info:", babyInfo);

    // Generate names using both the plugin and AI
    const pluginNames = generateNamesWithPlugin(babyInfo);
    console.log("Generated plugin names:", pluginNames);

    let allNames = [...pluginNames];

    // Add AI-generated name if OpenRouter API key is available
    const aiName = await generateNameWithAI(babyInfo);
    console.log("AI-generated name:", aiName);
    
    if (aiName) {
      allNames.push(aiName);
    }

    return new Response(
      JSON.stringify({ 
        names: allNames,
        model: aiName ? "Name Generation Plugin + Mistral-7B" : "Name Generation Plugin v1.0"
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