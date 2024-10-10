import React from "react";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";

export default function PatientProfilePage() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <div className="container">
                    <section className={styles.profileSection}>
                        <h1 className={styles.profileSectionTitle}>Личный кабинет</h1>
                        <div className={styles.profileSectionFullWrapper}>
                            <div className={styles.profileDetails}>
                                <img
                                    src={icons.profileAv}
                                    alt="profileAv"
                                    className={styles.profileImage}
                                />
                                <div className={styles.profileDetWrapper}>
                                    <h2 className={styles.profileDetWrapperTop}>Иванов Иван Иванович</h2>
                                    <p className={styles.profileDetWrapperMid}>Заполненность профиля - 50%</p>
                                </div>
                            </div>
                            <div className={styles.profileActions}>
                                <button className={styles.primaryButton}>Записаться</button>
                                <button className={styles.secondaryButton}><span>Изменить профиль</span></button>
                            </div>
                            <div className={styles.profileActions}>
                                <button className={styles.secondaryButton}>Заполнить анкету</button>
                                <button className={styles.secondaryButton}>Мои консультации</button>
                                <button className={styles.secondaryButton}>Сообщения</button>
                                <button className={styles.secondaryButton}>Мои документы</button>
                            </div>
                        </div>
                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Дневники</h2>
                            <div className={styles.profileActions}>
                                <button className={styles.secondaryButton}>Пищевой</button>
                                <button className={styles.secondaryButton}>Самочувствия</button>
                                <button className={styles.secondaryButton}>Веса</button>
                                <button className={styles.secondaryButton}>Контроля приверженности</button>
                            </div>
                        </div>
                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Опросники</h2>
                            <div className={styles.profileActions}>
                                <button className={styles.secondaryButton}>Качество жизни</button>
                                <button className={styles.secondaryButtonBig}>Гастроэнтерологический опросник качества жизни</button>
                                <button className={styles.secondaryButton}>Опросник слабости</button>
                            </div>
                            <div className={styles.profileActions}>
                                <button className={styles.secondaryButton}>Тревога и депрессия (HADS)</button>
                                <button className={styles.secondaryButton}>Анкета-скрининг</button>
                                <button className={styles.secondaryButtonBig}>Оценка приверженности к БГД</button>
                            </div>
                        </div>
                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Калькулятор</h2>
                            <div className={styles.profileActions}>
                                <button className={styles.secondaryButton}>Индекс массы тела</button>
                                <button className={styles.secondaryButton}>Счетчик колорий</button>
                                <button className={styles.secondaryButton}>Продуктовая корзина</button>
                                <button className={styles.secondaryButtonDisable}>Библиотека пациента</button>
                            </div>
                        </div>
                        <div className={styles.profileSectionExit}>
                            <button className={styles.primaryButton}>Выход</button>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
