export interface IInputTexProps {
  type: "text" | "password" | "number";
  label: string;
  name: string;
  placeholder?: string;
  value: any;
  handleOnChange: any;
  required?: boolean;
  disabled?: boolean;
}
