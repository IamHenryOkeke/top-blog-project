
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="overflow-y-scroll px-6 py-8 space-y-5 bg-white dark:text-black max-h-[90vh] rounded-lg shadow-lg max-w-2xl w-full animate-fadeIn scale-95"
        style={{ animation: "fadeIn 0.3s ease-out forwards" }}
      >
        <div className="flex items-center justify-between py-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <CgClose />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
