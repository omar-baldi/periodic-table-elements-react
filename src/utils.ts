export function debounce<T>(fn: (...args: T[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (e: Parameters<typeof fn>[0]) => {
    clearTimeout(timeout);
    const fnToExecute = () => fn(e);
    timeout = setTimeout(fnToExecute, delay);
  };
}

export function generateRandomId() {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1_000_000);
  return `${timestamp}-${randomValue}`;
}
