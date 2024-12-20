import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { NameCard } from "./NameCard";
import { BabyInfoForm, BabyInfo } from "./BabyInfoForm";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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";

interface GeneratedName {
  name: string;
  meaning: string;
  explanation: string;
}

export const NameGenerator = () => {
  const [babyInfo, setBabyInfo] = useState<BabyInfo | null>(null);
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateNames = async () => {
    if (!babyInfo) {
      toast({
        title: "Error",
        description: "Please fill in the baby information form first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
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
      
      Format each response as: Name: [name] | Meaning: [meaning] | Explanation: [explanation]`;

      const response = await axios.post(
        API_URL,
        {
          model: "anthropic/claude-2",
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
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "HTTP-Referer": "https://localhost:5173",
            "X-Title": "Baby Name Generator",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data); // Debug log

      if (!response.data.choices || !response.data.choices[0]?.message?.content) {
        throw new Error("Invalid response format from API");
      }

      const content = response.data.choices[0].message.content;
      const nameList = content.split("\n")
        .filter((line: string) => line.trim().length > 0 && line.includes("|"))
        .map((line: string) => {
          const parts = line.split("|").map(part => part.trim());
          return {
            name: parts[0].replace("Name:", "").trim(),
            meaning: parts[1].replace("Meaning:", "").trim(),
            explanation: parts[2].replace("Explanation:", "").trim(),
          };
        });

      if (nameList.length === 0) {
        throw new Error("No valid names were generated");
      }

      setNames(nameList);
      toast({
        title: "Success!",
        description: "Baby names generated successfully.",
      });
    } catch (error) {
      console.error("Error generating names:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to generate names. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInfoSubmit = (info: BabyInfo) => {
    setBabyInfo(info);
  };

  return (
    <div className="space-y-8">
      <BabyInfoForm onInfoSubmit={handleInfoSubmit} />
      
      <Button
        onClick={generateNames}
        disabled={isLoading || !babyInfo}
        size="lg"
        className="w-full text-lg py-6 font-semibold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 rounded-xl animate-fadeIn"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span> Generating Names...
          </span>
        ) : (
          "Generate Names"
        )}
      </Button>

      {names.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {names.map((nameData, index) => (
            <NameCard 
              key={index} 
              name={nameData.name} 
              meaning={nameData.meaning}
              explanation={nameData.explanation}
              index={index} 
            />
          ))}
        </div>
      )}
    </div>
  );
};