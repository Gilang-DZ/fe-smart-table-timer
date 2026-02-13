export interface ConfirmModalProps {
  isOpen: boolean;
  tableName: string;
  onConfirm: () => void;
  onCancel: () => void;
}
