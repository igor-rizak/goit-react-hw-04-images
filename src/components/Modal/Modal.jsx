import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";
import css from "./modal.module.css";

export const Modal = ({modalData, modalClose}) => {
      
    const closeModal = useCallback(e => {
        if (e.target === e.currentTarget || e.code === 'Escape') {
            modalClose()
        }
    }, [modalClose]) 
    
    useEffect(() => {
        window.addEventListener('keydown', closeModal)

        return () => window.removeEventListener('keydown', closeModal)
    }, [closeModal])
 
   
        const { largeImage, tags } = modalData
        return (
            <div className={css.overlay} onClick={closeModal} >
                <div className={css.modal}>
                    <img src={largeImage} alt={tags} />
                </div>
            </div>
        )
    }


Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  modalClose: PropTypes.func.isRequired,
};
