import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) return null;

    const { totalItems } = cartContext;

    return (
        <header>
            <nav className={styles.nav}>
                <Link className={styles.logo} to="/">QPICK</Link>
                <div className={styles['basket-wrapper']}>
                    <div className={styles['basket-container']}>
                        <Link to="/">
                            <img className={styles['basket-icon']} src="/images/icons/favourites.svg" alt="favourites icon" />
                        </Link>
                        <span className={styles['goods-counter']}>2</span>
                    </div>
                    <div className={styles['basket-container']}>
                        <Link to="/cart">
                            <img className={styles['basket-icon']} src="/images/icons/cart.svg" alt="cart icon" />
                        </Link>
                        <span className={styles['goods-counter']}>{totalItems}</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
