import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import styles from './PaymentModal.module.css'

interface PaymentModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onRequestClose, onPaymentSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Требуется полное имя.';
        if (!formData.address.trim()) newErrors.address = 'Требуется адрес.';
        if (!formData.email.trim()) {
            newErrors.email = 'Требуется email.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Некорректный формат email-a.';
            }
        }
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'Требуется номер карты.';
        } else {
            const cardNumberRegex = /^\d{16}$/;
            if (!cardNumberRegex.test(formData.cardNumber)) {
                newErrors.cardNumber = 'Номер карты должен содержать 16 символов.';
            }
        }
        if (!formData.expiryDate.trim()) {
            newErrors.expiryDate = 'Требуется срок действия карты.';
        } else {
            const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
            if (!expiryDateRegex.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Срок действия карты должен быть в формате ММ/ГГ.';
            }
        }
        if (!formData.cvv.trim()) {
            newErrors.cvv = 'Требуется CVV.';
        } else {
            const cvvRegex = /^\d{3,4}$/;
            if (!cvvRegex.test(formData.cvv)) {
                newErrors.cvv = 'Поле CVV содержать 3 или 4 цифры.';
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setPaymentCompleted(true);
            onPaymentSuccess();
        }, 2000);
    };

    const closeModal = () => {
        setFormData({
            fullName: '',
            address: '',
            email: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        });
        setErrors({});
        setIsSubmitting(false);
        setPaymentCompleted(false);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Payment Checkout"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <button onClick={closeModal} className={styles["close-button"]} aria-label="Close Modal">
                <FaTimes size={20} />
            </button>
            <div className={styles["modal-content"]}>
                {!paymentCompleted ? (
                    <>
                        <h2>Оформление заказа</h2>
                        <form onSubmit={handleSubmit} className={styles["payment-form"]}>
                            <div className={styles["form-group"]}>
                                <label htmlFor="fullName">Полное имя</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                {errors.fullName && <span className={styles["error"]}>{errors.fullName}</span>}
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="address">Адрес</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                ></textarea>
                                {errors.address && <span className={styles["error"]}>{errors.address}</span>}
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className={styles["error"]}>{errors.email}</span>}
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="cardNumber">Номер карты</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    maxLength={16}
                                />
                                {errors.cardNumber && <span className={styles["error"]}>{errors.cardNumber}</span>}
                            </div>
                            <div className={styles["form-row"]}>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="expiryDate">Срок действия (ММ/ГГ)</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                    {errors.expiryDate && <span className={styles["error"]}>{errors.expiryDate}</span>}
                                </div>
                                <div className={styles["form-group"]}>
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        maxLength={4}
                                    />
                                    {errors.cvv && <span className={styles["error"]}>{errors.cvv}</span>}
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className={styles["submit-button"]}>
                                {isSubmitting ? 'Выполняется...' : 'Оплатить сейчас'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles["payment-success"]}>
                        <h2>Оплата прошла успешно!</h2>
                        <p>Спасибо за покупку.</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PaymentModal;
