import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm">
      {/* Modal Content */}
      <div
        className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl max-h-[90vh] w-full mx-4 animate-float-up"
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>

            {showActionBtn && (
              <button
                className="btn-small-light"
                onClick={() => onActionClick()}
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 z-10"
          onClick={onClose}
          title="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
