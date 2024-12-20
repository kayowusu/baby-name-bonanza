import { Card, CardContent } from "@/components/ui/card";

interface NameCardProps {
  name: string;
  index: number;
}

export const NameCard = ({ name, index }: NameCardProps) => {
  return (
    <Card className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
      </CardContent>
    </Card>
  );
};