import { IProductProps } from "./IProductProps";

export interface IProductFormProps {
  btnText: string;
  productEdit?: IProductProps;
  onSubmit: () => void;
  setError: any;
}
