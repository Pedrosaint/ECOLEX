export function useDeleteCampus(onConfirm: () => void) {
  const handleConfirm = () => {
    onConfirm();
  };

  return { handleConfirm };
}
