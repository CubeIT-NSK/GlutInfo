import React from "react";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";

export default function MyConsultsPage() {

    return (
            <>
                <section className={styles.myConsultsSection}>
                    <div className="container">
                        <div className={styles.myConsultsWrapper}>
                            <h2 className={styles.myConsultsTitle}>Мои консультации</h2>
                            <div className={styles.myConsults}>
                                <div className={styles.myConsultsBlock}>
                                    <div className={styles.myConsultsContain}>
                                        <h2 className={styles.myConsultsHeader}>Консультация</h2>
                                        <div className={styles.myConsultsItem}>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Дата и время</p>
                                                <p className={styles.myConsultsTextBot}>30 сентября, 12:45</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Вид Консультации</p>
                                                <p className={styles.myConsultsTextBot}>Видео-чат</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Консультант</p>
                                                <p className={styles.myConsultsTextBot}>ФИО</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.myConsultsBtnsWrapper}>
                                        <Button
                                            variant="gradient"
                                            padding="22.5px 96px"
                                        >
                                            Перейти к услуге
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.myConsultsBlock}>
                                    <div className={styles.myConsultsContain}>
                                        <h2 className={styles.myConsultsHeader}>Консультация</h2>
                                        <div className={styles.myConsultsItem}>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Дата и время</p>
                                                <p className={styles.myConsultsTextBot}>30 сентября, 12:45</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Вид Консультации</p>
                                                <p className={styles.myConsultsTextBot}>Видео-чат</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Консультант</p>
                                                <p className={styles.myConsultsTextBot}>ФИО</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.myConsultsBtnsWrapper}>
                                        <Button
                                            variant="gradient"
                                            padding="22.5px 96px"
                                        >
                                            Перейти к услуге
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.myConsultsBlock}>
                                    <div className={styles.myConsultsContain}>
                                        <h2 className={styles.myConsultsHeader}>Консультация</h2>
                                        <div className={styles.myConsultsItem}>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Дата и время</p>
                                                <p className={styles.myConsultsTextBot}>30 сентября, 12:45</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Вид Консультации</p>
                                                <p className={styles.myConsultsTextBot}>Видео-чат</p>
                                            </div>
                                            <div className={styles.myConsultsText}>
                                                <p className={styles.myConsultsTextTop}>Консультант</p>
                                                <p className={styles.myConsultsTextBot}>ФИО</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.myConsultsBtnsWrapper}>
                                        <Button
                                            variant="gradient"
                                            padding="22.5px 96px"
                                        >
                                            Перейти к услуге
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="white"
                                padding="15.5px 33.5px"
                                fontSize="small"
                                className={styles.myConsultsBtn}
                            >
                                Назад в личный кабинет
                            </Button>
                        </div>
                    </div>
                </section>
            </>
    );
}
