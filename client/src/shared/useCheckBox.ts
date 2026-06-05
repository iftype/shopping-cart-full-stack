import { useEffect, useState } from "react";

export const useCheckBox = (itemIds: number[]) => {
  const [checks, setChecks] = useState<number[]>(() => {
    const saved = localStorage.getItem("checked");
    return saved ? JSON.parse(saved) : itemIds;
  });

  useEffect(() => {
    localStorage.setItem("checked", JSON.stringify(checks));
  }, [checks]);

  const checkeds = checks.filter((id) => itemIds.includes(id));

  const toggleSelect = (id: number) => {
    setChecks(() =>
      checkeds.includes(id) ? checkeds.filter((check) => check !== id) : [...checkeds, id],
    );
  };

  const toggleAll = () => {
    const isAllChecked = itemIds.length > 0 && checkeds.length === itemIds.length;
    setChecks(isAllChecked ? [] : itemIds);
  };

  return { checks, toggleSelect, toggleAll };
};
