import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsAnimatingOut(false);
      }, 300); // Match this with the duration of the fade-out animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimatingOut) return null;

  const handleConfirm = () => {
    setIsAnimatingOut(true);
    onConfirm();
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 transition-opacity duration-300 flex items-center justify-center px-4 ${
        isAnimatingOut ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative bg-white rounded-lg shadow-xl transition-all duration-300 w-full max-w-md mx-auto ${
          isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4">{message}</p>
          <div className="mt-4 flex flex-col sm:flex-row-reverse gap-3">
            <button
              onClick={handleConfirm}
              className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Delete
            </button>
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;