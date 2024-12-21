import { namePlugin } from './namePlugin.ts';
import { getRandomItems } from './utils.ts';

export function generateNamesWithPlugin(preferences: any) {
  console.log("Generating names with preferences:", preferences);
  const { gender, meaningPreference, startingLetter } = preferences;

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

  if (startingLetter) {
    namePools = namePools.filter(nameData => 
      nameData.name.toLowerCase().startsWith(startingLetter.toLowerCase())
    );
  }

  // Increased from 4 to 5 names from the plugin
  const selectedNames = getRandomItems(namePools, Math.min(5, namePools.length));
  console.log("Selected names from plugin:", selectedNames);

  return selectedNames.map(nameData => ({
    name: nameData.name,
    meaning: nameData.meaning,
    explanation: `${nameData.name} is a ${nameData.origin} name that perfectly matches your preferences. Its meaning, "${nameData.meaning}", aligns with ${meaningPreference || 'your search for the perfect name'}.`
  }));
}