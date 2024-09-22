import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import styles from './Cart.module.css'

const Cart: React.FC = () => {
    const cartContext = useContext(CartContext);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    if (!cartContext) return null;

    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = cartContext;

    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);

    const handlePaymentSuccess = () => {
        clearCart();
    };

    return (
        <main>
            <h2 className={styles.title}>Корзина</h2>
            {cartItems.length === 0 && <p className={styles.empty}>Ваша корзина пуста</p>}
            <section className={styles.order}>
                <div>
                    {cartItems.map(item => (
                        <div key={item.title} className={styles["cart-item"]}>
                            <img src={item.img} alt={item.title} className={styles["cart-item-img"]} />
                            <div>
                                <h3 className={styles["cart-item-title"]}>{item.title}</h3>
                                <p className={styles["cart-item-price"]}>{item.price} ₽</p>
                            </div>
                            <div className={styles["quantity-controls"]}>
                                <button
                                    className={styles["quantity-control"]}
                                    onClick={() => updateQuantity(item.title, -1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/images/icons/minus.svg`} alt="minus symbol" className={styles["quantity-control-icon"]} />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className={styles["quantity-control"]}
                                    onClick={() => updateQuantity(item.title, 1)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/images/icons/plus.svg`} alt="plus symbol" className={styles["quantity-control-icon"]} />
                                </button>
                            </div>
                            <p className={styles["cart-item-subtotal"]}>{item.price * item.quantity} ₽</p>
                            <img className={styles['remove-button']} src={`${process.env.PUBLIC_URL}/images/icons/delete.svg`} alt="delete icon" onClick={() => {
                                if (window.confirm(`Вы уверены, что хотите удалить ${item.title} из корзины?`)) {
                                    removeFromCart(item.title);
                                }
                            }} />
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && (
                    <div className={styles["cart-summary"]}>
                        <div className={styles["total-price"]}>
                            <h3>ИТОГО</h3>
                            <h3>₽ {totalPrice}</h3>
                        </div>
                        <button className={styles["checkout-button"]} onClick={openPaymentModal}>
                            Перейти к оформлению
                        </button>
                    </div>
                )}
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onRequestClose={closePaymentModal}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            </section>
        </main>
    );
};

export default Cart;
