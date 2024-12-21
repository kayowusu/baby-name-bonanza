import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from './utils.ts';
import { generateNamesWithPlugin } from './pluginGenerator.ts';
import { generateNameWithAI } from './aiGenerator.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { babyInfo } = await req.json();
    console.log("Received baby info:", babyInfo);

    // Generate 5 names using the plugin
    const pluginNames = generateNamesWithPlugin(babyInfo);
    console.log("Generated plugin names:", pluginNames);

    let allNames = [...pluginNames];

    // Add AI-generated name if OpenRouter API key is available
    const aiName = await generateNameWithAI(babyInfo);
    console.log("AI-generated name:", aiName);
    
    if (aiName) {
      // Ensure AI name starts with the correct letter if specified
      if (!babyInfo.startingLetter || 
          aiName.name.toLowerCase().startsWith(babyInfo.startingLetter.toLowerCase())) {
        allNames.push(aiName);
      } else {
        // If AI name doesn't match the letter, add another plugin name
        const extraPluginName = generateNamesWithPlugin(babyInfo)[0];
        allNames.push(extraPluginName);
      }
    } else {
      // If AI generation fails, add another plugin name
      const extraPluginName = generateNamesWithPlugin(babyInfo)[0];
      allNames.push(extraPluginName);
    }

    // Ensure we have exactly 6 unique names
    const uniqueNames = Array.from(new Set(allNames.map(n => n.name)))
      .map(name => allNames.find(n => n.name === name))
      .slice(0, 6);

    // If we don't have enough unique names, add more from the plugin
    while (uniqueNames.length < 6) {
      const extraName = generateNamesWithPlugin(babyInfo)[0];
      if (!uniqueNames.some(n => n.name === extraName.name)) {
        uniqueNames.push(extraName);
      }
    }

    return new Response(
      JSON.stringify({ 
        names: uniqueNames,
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