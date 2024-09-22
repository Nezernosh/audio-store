import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <Link className={styles.logo} to="/">QPICK</Link>
            <div className={styles["footer-column"]}>
                <Link to="/">Избранное</Link>
                <Link to="/cart">Корзина</Link>
                <Link to="/">Контакты</Link>
            </div>
            <div className={styles["footer-column"]}>
                <Link to="/">Условия сервиса</Link>
                <div className={styles["footer-languages"]}>
                    <img src="/images/icons/world.svg" alt="world icon for language section" />
                    <Link className={styles["footer-languages-active"]} to="/">Рус</Link>
                    <Link to="/">Eng</Link>
                </div>
            </div>
            <div className={styles["footer-contact"]}>
                <Link to="https://vk.com/neoflex_ru" target="_blank" rel="noopener noreferrer">
                    <img className={styles["footer-contact-icon"]} src="/images/icons/VK.svg" alt="VK icon" />
                </Link>
                <Link to="https://t.me/neoflexcareers" target="_blank" rel="noopener noreferrer">
                    <img className={styles["footer-contact-icon"]} src="/images/icons/Telegram.svg" alt="Telegram icon" />
                </Link>
                <Link to="tel:+74959842513" target="_blank" rel="noopener noreferrer">
                    <img className={styles["footer-contact-icon"]} src="/images/icons/Whatsapp.svg" alt="Whatsapp icon" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
