import React from 'react';
import Modal from 'react-modal';
import { Product } from '../../types/Product';
import { FaTimes } from 'react-icons/fa';
import styles from './ProductModal.module.css'

interface ProductModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onRequestClose, product }) => {
    if (!product) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={`${product.title} Details`}
            aria={{
                labelledby: "heading",
                describedby: "full_description",
            }}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <button onClick={onRequestClose} className={styles["close-button"]} aria-label="Close Modal">
                <FaTimes size={20} />
            </button>
            <div className={styles["modal-content"]}>
                <img src={product.img} alt={product.title} className={styles["modal-image"]} loading="lazy" />

                <div className={styles["modal-details"]}>
                    <h2 id="heading">{product.title}</h2>
                    <p><strong>Цена:</strong> {product.price} ₽</p>
                    <p><strong>Рейтинг:</strong> {product.rate} ⭐</p>
                    {product.description && <p><strong>Описание:</strong> {product.description}</p>}
                </div>
            </div>
        </Modal>

    );
};

export default ProductModal;
