import type { ReactNode } from "react";
import styles from "./CheckBox.module.css";

interface CheckListProps {
  allChecked: boolean;
  onToggleAll: () => void;
  label?: string;
  children: ReactNode;
}

interface CheckListItemProps {
  checked: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export const CheckList = ({ allChecked, onToggleAll, label, children }: CheckListProps) => (
  <div>
    <div className={styles.checkboxRow}>
      <input type="checkbox" checked={allChecked} onChange={onToggleAll} />
      {label && <label>{label}</label>}
    </div>
    <div className={styles.list}>{children}</div>
  </div>
);

export const CheckListItem = ({ checked, onToggle, onDelete, children }: CheckListItemProps) => (
  <div className={styles.listItem}>
    <div className={styles.itemHeader}>
      <div className={styles.itemCheckbox}>
        <input type="checkbox" checked={checked} onChange={onToggle} />
      </div>
      <button className={styles.deleteButton} onClick={onDelete}>
        삭제
      </button>
    </div>
    {children}
  </div>
);
