import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from './utils.ts';
import { generateNamesWithAI } from './aiGenerator.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { babyInfo } = await req.json();
    console.log("Received baby info:", babyInfo);

    if (!babyInfo) {
      throw new Error("Baby info is required");
    }

    // Generate names using AI
    const names = await generateNamesWithAI(babyInfo);
    console.log("Generated names:", names);

    if (!names || !Array.isArray(names)) {
      throw new Error("Failed to generate names");
    }

    // Filter and ensure uniqueness
    const uniqueNames = Array.from(new Set(names.map(n => n.name)))
      .map(name => names.find(n => n.name === name))
      .filter(name => {
        if (!babyInfo.startingLetter) return true;
        return name.name.toLowerCase().startsWith(babyInfo.startingLetter.toLowerCase());
      })
      .slice(0, 6);

    if (uniqueNames.length === 0) {
      throw new Error("No valid names were generated");
    }

    return new Response(
      JSON.stringify({ 
        names: uniqueNames,
        model: "Mistral-7B"
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      },
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