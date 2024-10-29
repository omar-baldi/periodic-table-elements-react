import React from "react";
import "./App.css";
import { useExtractElements } from "./hooks/useExtractElements";
import { debounce } from "./utils";

function App() {
  const [charsEntries, handleChange] = useExtractElements({ extractAllElements: true });

  const debounceInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
    500
  );

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
