export interface BottomButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

export const BottomButton = ({ onClick, disabled = false, text = "" }: BottomButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
