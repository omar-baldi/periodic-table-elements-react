/* eslint-disable */
import "./App.css";

function debounce<T>(fn: (...args: T[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (e: Parameters<typeof fn>[0]) => {
    clearTimeout(timeout);
    const fnToExecute = () => fn(e);
    timeout = setTimeout(fnToExecute, delay);
  };
}

function App() {
  function extractPeriodicElements(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: updatedInputV } = e.target;
    //TODO: apply logic here
  }

  const debounceInputChange = debounce(extractPeriodicElements, 500);

  return (
    <>
      <input type="text" onChange={debounceInputChange} />
    </>
  );
}

export default App;
