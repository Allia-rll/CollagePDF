import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (onClose) document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
      if (onClose)
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (onClose)
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white  border border-gray-200 rounded-lg shadow-lg max-w-2xl w-full p-4 mx-4 relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black font-bold"
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
