"use client";

import Popup from "@/app/components/popup";
import ResetPasswordForm from "@/app/components/ResetPasswordForm";

interface ResetPasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ResetPasswordModal({
  isOpen,
  setIsOpen,
}: ResetPasswordModalProps) {
  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Reset Password"
      backdrop={true}
      className="max-w-md"
    >
      <ResetPasswordForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </Popup>
  );
}
