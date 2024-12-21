import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FamousPerson {
  name: string;
  profession: string;
  birthYear: number;
}

interface NameCardProps {
  name: string;
  meaning: string;
  explanation: string;
  index: number;
  gender: string;
  famousPeople?: FamousPerson[];
}

export const NameCard = ({ name, meaning, explanation, index, gender, famousPeople }: NameCardProps) => {
  // Define color schemes based on gender
  const getColorScheme = () => {
    switch (gender) {
      case "boy":
        return "from-[#1A1F2C] via-[#403E43] to-[#221F26] text-white";
      case "girl":
        return "from-[#9b87f5] via-[#D6BCFA] to-[#FFDEE2] text-gray-800";
      default:
        return "from-[#F1F0FB] via-[#E5DEFF] to-[#D3E4FD] text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-lg bg-gradient-to-r ${getColorScheme()}`}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">
              {name}
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-medium opacity-90">
                {meaning}
              </p>
              <p className="text-sm opacity-80">
                {explanation}
              </p>
              {famousPeople && famousPeople.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200/20">
                  <p className="text-sm font-medium">Famous people born on this date:</p>
                  <ul className="mt-2 space-y-1">
                    {famousPeople.map((person, i) => (
                      <li key={i} className="text-sm opacity-80">
                        {person.name} ({person.birthYear}) - {person.profession}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};