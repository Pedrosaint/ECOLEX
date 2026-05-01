import { useEffect, useState } from "react";

export function useCustomCalendar() {
  const [value] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return { value, isLoading };
}
