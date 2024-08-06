import { ICategoryProps } from "./ICategoryProps";

export interface ICategoryFormProps {
  btnText: string;
  categoryEdit?: ICategoryProps;
  onSubmit: () => void;
  setError: any;
}
