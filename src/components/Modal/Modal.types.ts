export type ModalProps = {
  open: boolean;
  children: JSX.Element | string;
  title?: string;
  confirmButtonText?: string;
  cancelButtonTex?: string;
  onlyConfirmButton?: boolean;
  onClickConfirm: () => void;
  onClickCancel?: () => void;
};
