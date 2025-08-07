import React from 'react';
import './ConfirmModal.scss';

function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div
            className="modal show custom-modal-backdrop"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog custom-modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Annulla
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
