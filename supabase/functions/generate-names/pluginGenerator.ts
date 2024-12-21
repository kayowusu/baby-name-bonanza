import { namePlugin } from './namePlugin.ts';
import { getRandomItems } from './utils.ts';

export function generateNamesWithPlugin(preferences: any) {
  console.log("Generating names with preferences:", preferences);
  const { gender, meaningPreference, startingLetter, dueDate } = preferences;

  let namePools = [];
  
  if (meaningPreference?.toLowerCase().includes('nature')) {
    namePools.push(...namePlugin.natureNames);
  }
  if (meaningPreference?.toLowerCase().includes('modern')) {
    namePools.push(...(gender === 'female' ? namePlugin.modernNames.female : namePlugin.modernNames.male));
  }
  if (meaningPreference?.toLowerCase().includes('traditional')) {
    namePools.push(...(gender === 'female' ? namePlugin.traditionalNames.female : namePlugin.traditionalNames.male));
  }
  if (meaningPreference?.toLowerCase().includes('atmospheric')) {
    namePools.push(...namePlugin.atmosphericNames);
  }

  if (namePools.length === 0) {
    namePools = [
      ...namePlugin.atmosphericNames,
      ...namePlugin.natureNames,
      ...(gender === 'female' ? namePlugin.traditionalNames.female : namePlugin.traditionalNames.male),
      ...(gender === 'female' ? namePlugin.modernNames.female : namePlugin.modernNames.male),
    ];
  }

  // Filter names by starting letter if specified
  if (startingLetter) {
    namePools = namePools.filter(nameData => 
      nameData.name.toLowerCase().startsWith(startingLetter.toLowerCase())
    );

    // If we don't have enough names with the starting letter, generate variations
    while (namePools.length < 5) {
      const baseNames = [...namePlugin.traditionalNames.male, ...namePlugin.traditionalNames.female];
      const randomBase = baseNames[Math.floor(Math.random() * baseNames.length)];
      const newVariation = {
        name: startingLetter.toUpperCase() + randomBase.name.slice(1),
        meaning: randomBase.meaning,
        origin: randomBase.origin
      };
      namePools.push(newVariation);
    }
  }

  // Ensure we get unique names
  const uniqueNames = Array.from(new Set(namePools.map(n => n.name)))
    .map(name => namePools.find(n => n.name === name))
    .filter(Boolean);

  const selectedNames = getRandomItems(uniqueNames, Math.min(5, uniqueNames.length));
  console.log("Selected names from plugin:", selectedNames);

  // Generate example famous people based on the due date
  return selectedNames.map(nameData => ({
    name: nameData.name,
    meaning: nameData.meaning,
    explanation: `${nameData.name} is a ${nameData.origin} name that perfectly matches your preferences. Its meaning, "${nameData.meaning}", aligns with ${meaningPreference || 'your search for the perfect name'}.`,
    famousPeople: [
      {
        name: `${nameData.name} ${Math.random().toString(36).substring(7)}`,
        profession: ["Actor", "Musician", "Scientist", "Writer", "Athlete"][Math.floor(Math.random() * 5)],
        birthYear: new Date(dueDate || Date.now()).getFullYear() - Math.floor(Math.random() * 100)
      }
    ]
  }));
}