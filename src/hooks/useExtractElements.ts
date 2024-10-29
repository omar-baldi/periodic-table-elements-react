import { useState } from "react";
import elements from "../elements";
import { generateRandomId } from "../utils";

type CharEntry = readonly [string, { char: string; isPeriodicElement: boolean }];

type Options = { extractAllElements: boolean };

export const useExtractElements = (options?: Options) => {
  const [charsEntries, setCharsEntries] = useState<CharEntry[]>([]);

  function extractPeriodicElements(v: string) {
    let idxChar = 0;
    //TODO: better variable naming
    let hasOneElementBeenFound = false;
    const arr = [] as { char: string; isPeriodicElement: boolean }[];

    while (idxChar < v.length) {
      const char = v.charAt(idxChar);
      const els = elements.filter((el) => el.toLowerCase().startsWith(char));

      if (els.length <= 0) {
        arr.push({ char, isPeriodicElement: false });
        idxChar++;
        continue;
      }

      const nextChar = v.charAt(idxChar + 1).toLowerCase();
      const concatChar = char.concat(nextChar);
      const el = els.find((el) => el.toLowerCase() === concatChar);

      if (el && (options?.extractAllElements || !hasOneElementBeenFound)) {
        arr.push({ char: concatChar, isPeriodicElement: true });
        idxChar += 2;
        hasOneElementBeenFound = true;
      } else {
        arr.push({ char, isPeriodicElement: false });
        idxChar++;
      }
    }

    return arr;
  }

  function handle(v: string) {
    const entriesWithIds = extractPeriodicElements(v.toLowerCase())
      .map((v) => ({ ...v, id: generateRandomId() }))
      .map(({ id, ...rest }) => [id, rest] as const);

    setCharsEntries(entriesWithIds);
  }

  return [charsEntries, handle] as const;
};
