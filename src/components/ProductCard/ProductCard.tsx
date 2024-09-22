import React, { useContext, useState } from 'react';
import { Product } from '../../types/Product';
import { CartContext } from '../../contexts/CartContext';
import { FaEye } from 'react-icons/fa';
import ProductModal from '../ProductModal/ProductModal';
import styles from './ProductCard.module.css'

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const cartContext = useContext(CartContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    if (!cartContext) return null;

    const { addToCart } = cartContext;

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className={styles["product-card"]}>
            <img className={styles["product-image"]} src={product.img} alt={product.title} />
            <div className={styles["product-info"]}>
                <div className={styles["product-row"]}>
                    <h3 className={styles["product-title"]}>{product.title}</h3>
                    <p className={styles["product-price"]}>{product.price} ₽</p>
                </div>
                <div className={styles["product-row"]}>
                    <p className={styles["product-rate"]}>★ {product.rate} </p>
                    <div className={styles["product-actions"]}>
                        <button onClick={openModal} className={styles["product-view-button"]}><FaEye /></button>
                        <button onClick={() => addToCart(product)} className={styles["product-buy-button"]}>Купить</button>
                    </div>
                </div>
            </div>
            <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} product={product} />
        </div>
    );
};

export default ProductCard;
