import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const abortCtrl: AbortController = new AbortController();

    const fetchData = async () => {
      try {
        const response: Response = await fetch(url, {
          signal: abortCtrl.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data!");
        }
        const newData: unknown = await response.json();
        setData(newData);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setError(error.message);
            setLoading(false);
          }
        }
      }
    };
    fetchData();
    return () => abortCtrl.abort();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
