import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface NameCardProps {
  name: string;
  meaning: string;
  explanation: string;
  index: number;
}

export const NameCard = ({ name, meaning, explanation, index }: NameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-baby-pink via-baby-purple to-baby-blue bg-clip-text text-transparent">
              {name}
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {meaning}
              </p>
              <p className="text-sm text-gray-600">
                {explanation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};