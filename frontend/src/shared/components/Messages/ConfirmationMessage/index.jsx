import React from "react";
import styles from "./index.module.css";

const ConfirmationMessage = ({ onBack }) => {
    return (
        <div className={styles.confirmationWrapper}>
            <h2 className={styles.confirmationTitle}>Спасибо за отправку вашей заявки!</h2>
            <p className={styles.confirmationText}>Ваша информация была успешно отправлена.</p>
            <button className={styles.backButton} onClick={onBack}>Заполнить еще раз</button>
        </div>
    );
};

export default ConfirmationMessage;
