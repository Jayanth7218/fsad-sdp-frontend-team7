const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;