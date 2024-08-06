import { useEffect, useState } from "react";
import styles from "./Message.module.scss";
import { IMessageProps } from "../../interface/IMessageProps";

export const Message: React.FC<IMessageProps> = ({
  message,
  type,
  duration,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, duration || 5000);

    return () => clearTimeout(timer);
  }, [duration, message, onDismiss]);

  return <>{visible && <div className={styles[type]}>{message}</div>}</>;
};
