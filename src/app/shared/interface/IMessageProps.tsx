export interface IMessageProps {
  message: string;
  type: string;
  duration?: number;
  onDismiss?: () => void;
}
