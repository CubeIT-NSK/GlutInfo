import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../shared/components/Footer";
import Header from "../../../../shared/components/Header";
import styles from "./index.module.css";

export default function SuccessPage() {
    const navigate = useNavigate();

    const handleNavigate = (data) => {
        navigate('/profile-consultant');
    };

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.successSection}>
                    <div className={styles.successTitleWrapper}>
                        <h1 className={styles.title}>Заявка Успешно отправлена</h1>
                        <h3 className={styles.subTitle}>В ближайшее время мы свяжемся с Вами и согласуем время проведения собеседования.</h3>
                        <button className={styles.successBtn} onClick={handleNavigate}>
                            <span>Перейти в личный кабинет</span>
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
