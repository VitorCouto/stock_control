export interface IButtonSubmitProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
