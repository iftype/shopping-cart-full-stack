import styles from "./BottomButton.module.css";

export interface BottomButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

export const BottomButton = ({ onClick, disabled = false, text = "" }: BottomButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
