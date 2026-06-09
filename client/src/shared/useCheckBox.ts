import { useState } from "react";

export const useCheckBox = (itemIds: number[]) => {
  const [unchecks, setUnchecks] = useState<number[]>(() => {
    const saved = localStorage.getItem("unchecked");
    return saved ? JSON.parse(saved) : [];
  });

  const checks = itemIds.filter((id) => !unchecks.includes(id));

  const save = (next: number[]) => {
    if (next.length === 0) localStorage.removeItem("unchecked");
    else localStorage.setItem("unchecked", JSON.stringify(next));
  };

  const toggleSelect = (id: number) => {
    const next = unchecks.includes(id)
      ? unchecks.filter((check) => check !== id)
      : [...unchecks, id];
    setUnchecks(next);
    save(next);
  };

  const toggleAll = () => {
    const next = checks.length === itemIds.length ? itemIds : [];
    setUnchecks(next);
    save(next);
  };

  return { checks, toggleSelect, toggleAll };
};
