import { useState, useCallback } from 'react';

export const useConfirmActionDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showDialog = useCallback((confirmAction: () => void) => {
    setOpen(true);
    setOnConfirm(() => confirmAction);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    setOpen(false);
  }, [onConfirm]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    showDialog,
    handleConfirm,
    handleClose,
  };
};
