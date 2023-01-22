import ReactDOM from 'react-dom';
import './Modal.css';

function Modal({ children, isOpen, closeModal }) {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <article
      className={`modal-main ${isOpen && 'is-open-modal'} `}
      onClick={closeModal}
    >
      <div
        className="modal-container animate__animated animate__fadeInDown"
        onClick={handleModalContainerClick}
      >
        <div className="modal-close">
          <button
            className="btn btn-dark btn-sm"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </article>,
    document.getElementById('modal')
  );
}

export default Modal;
