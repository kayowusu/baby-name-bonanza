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
  origin: string;
  style: string;
  meaningPreference: string;
  theme: string;
  culturalSignificance: string;
  startingLetter: string;
  dueDate: string;
}

export const BabyInfoForm = ({ onInfoSubmit }: BabyInfoFormProps) => {
  const [babyInfo, setBabyInfo] = useState<BabyInfo>({
    gender: "",
    origin: "",
    style: "",
    meaningPreference: "",
    theme: "",
    culturalSignificance: "",
    startingLetter: "",
    dueDate: "",
  });

  const handleChange = (field: keyof BabyInfo, value: string) => {
    const updatedInfo = { ...babyInfo, [field]: value };
    setBabyInfo(updatedInfo);
    onInfoSubmit(updatedInfo);
  };

  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

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
          <Label htmlFor="origin">Origin</Label>
          <Select
            value={babyInfo.origin}
            onValueChange={(value) => handleChange("origin", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select name origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="african">African</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="irish">Irish</SelectItem>
              <SelectItem value="icelandic">Icelandic</SelectItem>
              <SelectItem value="yiddish">Yiddish</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Name Style</Label>
          <Select
            value={babyInfo.style}
            onValueChange={(value) => handleChange("style", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select name style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="unique">Unique & Uncommon</SelectItem>
              <SelectItem value="edgy">Edgy</SelectItem>
              <SelectItem value="vintage">Vintage</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={babyInfo.theme}
            onValueChange={(value) => handleChange("theme", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select name theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seasonal">Seasonal</SelectItem>
              <SelectItem value="astrology">Astrology-Inspired</SelectItem>
              <SelectItem value="color">Color-Inspired</SelectItem>
              <SelectItem value="nature">Nature-Inspired</SelectItem>
              <SelectItem value="fictional">Fictional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meaningPreference">Meaning Preferences</Label>
          <Input
            id="meaningPreference"
            placeholder="E.g., Strength, Peace, Light, Wisdom"
            value={babyInfo.meaningPreference}
            onChange={(e) => handleChange("meaningPreference", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="culturalSignificance">Cultural Significance</Label>
          <Input
            id="culturalSignificance"
            placeholder="E.g., Family heritage, cultural traditions"
            value={babyInfo.culturalSignificance}
            onChange={(e) => handleChange("culturalSignificance", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startingLetter">Starting Letter</Label>
          <Select
            value={babyInfo.startingLetter}
            onValueChange={(value) => handleChange("startingLetter", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select starting letter" />
            </SelectTrigger>
            <SelectContent>
              {alphabet.map((letter) => (
                <SelectItem key={letter} value={letter.toLowerCase()}>
                  {letter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>
    </div>
  );
};