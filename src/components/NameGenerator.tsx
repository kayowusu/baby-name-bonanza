import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { NameCard } from "./NameCard";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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";

export const NameGenerator = () => {
  const [preferences, setPreferences] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateNames = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        {
          model: "anthropic/claude-2",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates baby names. Return only a numbered list of names, nothing else.",
            },
            {
              role: "user",
              content: `Generate 5 unique baby names based on these preferences: ${preferences}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const nameList = content
        .split("\n")
        .map((line: string) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((name: string) => name.length > 0);

      setNames(nameList);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate names. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Input
          placeholder="Enter preferences (e.g., gender, origin, meaning)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className="w-full"
        />
        <Button
          onClick={generateNames}
          disabled={isLoading || !preferences}
          className="w-full bg-gradient-to-r from-baby-pink via-baby-purple to-baby-blue hover:opacity-90 transition-opacity"
        >
          {isLoading ? "Generating..." : "Generate Names"}
        </Button>
      </div>

      {names.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {names.map((name, index) => (
            <NameCard key={index} name={name} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};