import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { NameCard } from "./NameCard";
import { BabyInfoForm, BabyInfo } from "./BabyInfoForm";
import { supabase } from "@/integrations/supabase/client";

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
      console.log("Sending request with baby info:", babyInfo);
      const { data, error } = await supabase.functions.invoke('generate-names', {
        body: { babyInfo },
      });

      console.log("Response from Edge Function:", { data, error });

      if (error) throw error;

      if (!data.names || data.names.length === 0) {
        throw new Error("No valid names were generated");
      }

      setNames(data.names);
      toast({
        title: "Success!",
        description: "Baby names generated successfully.",
      });
    } catch (error) {
      console.error("Error generating names:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate names. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInfoSubmit = (info: BabyInfo) => {
    console.log("Form submitted with info:", info);
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