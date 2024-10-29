import React, { useState } from "react";
import "./App.css";
import elements from "./elements";
import { debounce, generateRandomId } from "./utils";

type CharEntry = readonly [
  string,
  {
    char: string;
    isPeriodicElement: boolean;
  }
];

//TODO: provide an optional boolean flag "extractAllElements" to control whether to extract all elements found within the input value
function App() {
  const [charsEntries, setCharsEntries] = useState<CharEntry[]>([]);

  function extractPeriodicElements(v: string) {
    let idxChar = 0;
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

      if (el) {
        arr.push({ char: concatChar, isPeriodicElement: true });
        idxChar += 2;
      } else {
        arr.push({ char: char, isPeriodicElement: false });
        idxChar++;
      }
    }

    return arr;
  }

  function handleLogic(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: valueSearched } = e.target;
    const lowercaseValueSearched = valueSearched.toLowerCase();

    const entriesWithIds = extractPeriodicElements(lowercaseValueSearched)
      .map((v) => ({ ...v, id: generateRandomId() }))
      .map(({ id, ...rest }) => [id, rest] as const);

    setCharsEntries(entriesWithIds);
  }

  const debounceInputChange = debounce(handleLogic, 500);

  return (
    <>
      <input type="text" onChange={debounceInputChange} />

      <div className="wrapperText">
        {[...charsEntries].map(([id, { char, isPeriodicElement }]) => {
          const className = isPeriodicElement ? "periodicElement" : "";

          return (
            <span key={id} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default App;
