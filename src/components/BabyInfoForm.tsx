import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BabyInfoFormProps {
  onInfoSubmit: (info: BabyInfo) => void;
}

export interface BabyInfo {
  gender: string;
  ethnicity: string;
  culturalBackground: string;
  dueDate: string;
  familyNameTradition: string;
  meaningPreference: string;
}

export const BabyInfoForm = ({ onInfoSubmit }: BabyInfoFormProps) => {
  const [babyInfo, setBabyInfo] = useState<BabyInfo>({
    gender: "",
    ethnicity: "",
    culturalBackground: "",
    dueDate: "",
    familyNameTradition: "",
    meaningPreference: "",
  });

  const handleChange = (field: keyof BabyInfo, value: string) => {
    const updatedInfo = { ...babyInfo, [field]: value };
    setBabyInfo(updatedInfo);
    onInfoSubmit(updatedInfo); // Call onInfoSubmit whenever a field changes
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Gender</Label>
          <RadioGroup
            className="flex gap-4 mt-2"
            value={babyInfo.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="boy" />
              <Label htmlFor="boy">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="girl" />
              <Label htmlFor="girl">Girl</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="neutral" />
              <Label htmlFor="neutral">Gender Neutral</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Select
            value={babyInfo.ethnicity}
            onValueChange={(value) => handleChange("ethnicity", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ethnicity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="african">African</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="european">European</SelectItem>
              <SelectItem value="hispanic">Hispanic</SelectItem>
              <SelectItem value="middleEastern">Middle Eastern</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="culturalBackground">Cultural Background</Label>
          <Input
            id="culturalBackground"
            placeholder="E.g., Irish-American, Chinese"
            value={babyInfo.culturalBackground}
            onChange={(e) => handleChange("culturalBackground", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={babyInfo.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="familyNameTradition">Family Naming Traditions</Label>
          <Input
            id="familyNameTradition"
            placeholder="E.g., Named after grandparents, Nature-inspired names"
            value={babyInfo.familyNameTradition}
            onChange={(e) => handleChange("familyNameTradition", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meaningPreference">Meaning Preferences</Label>
          <Input
            id="meaningPreference"
            placeholder="E.g., Strength, Peace, Wisdom"
            value={babyInfo.meaningPreference}
            onChange={(e) => handleChange("meaningPreference", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};