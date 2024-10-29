import { useState } from "react";
import elements from "../elements";
import { generateRandomId } from "../utils";

type CharEntry = readonly [string, { char: string; isPeriodicElement: boolean }];

type Options = { extractAllElements: boolean };

const defaultOptions: Options = { extractAllElements: false };

export const useExtractElements = (options = defaultOptions) => {
  const [charsEntries, setCharsEntries] = useState<CharEntry[]>([]);

  function extractElementsEntries(input: string) {
    let idxChar = 0;
    let foundEl = false;
    const arr = [] as CharEntry[1][];

    while (idxChar < input.length) {
      const char = input.charAt(idxChar);
      const matchingEls = elements
        .map((v) => v.toLowerCase())
        .filter((el) => el.startsWith(char));

      if (matchingEls.length <= 0 || (!options.extractAllElements && foundEl)) {
        arr.push({ char, isPeriodicElement: false });
        idxChar++;
        continue;
      }

      foundEl = true;
      const nextChar = input.charAt(idxChar + 1);
      const concatChar = char.concat(nextChar);
      const matchingEl = matchingEls.find((el) => el === concatChar);

      if (!matchingEl && !matchingEls.includes(char)) {
        arr.push({ char, isPeriodicElement: false });
        idxChar++;
        continue;
      }

      const c = matchingEl ? concatChar : char;
      arr.push({ char: c, isPeriodicElement: true });
      idxChar += c.length;
    }

    return arr;
  }

  function handleChange(input: string) {
    const entriesWithIds = extractElementsEntries(input.toLowerCase())
      .map((v) => ({ ...v, id: generateRandomId() }))
      .map(({ id, ...rest }) => [id, rest] as const);

    setCharsEntries(entriesWithIds);
  }

  return [charsEntries, handleChange] as const;
};
