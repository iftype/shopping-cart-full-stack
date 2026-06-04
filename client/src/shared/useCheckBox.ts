import { useEffect, useState } from "react";

export const useCheckBox = (item: number[]) => {
  const [checks, setChecks] = useState<number[]>([]);

  useEffect(() => {
    function init() {
      setChecks(item);
    }
    init();
  }, [item]);

  const toggleSelect = (id: number) => {
    const isChecked = checks.includes(id);
    if (isChecked) {
      setChecks((prev) => {
        const next = [...prev];
        next.push(id);
        return next;
      });
      return;
    }
    setChecks((prev) => {
      const next = [...prev];
      next.filter((item) => item !== id);
      return next;
    });
  };

  return { checks, toggleSelect };
};
