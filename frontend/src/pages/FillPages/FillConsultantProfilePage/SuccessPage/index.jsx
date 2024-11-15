import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../../../../shared/components/Buttons";

export default function SuccessPage() {
    const navigate = useNavigate();

    const handleNavigate = (data) => {
        navigate('/profile-consultant');
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successSection}>
                        <div className={styles.successTitleWrapper}>
                            <h1 className={styles.title}>Заявка Успешно отправлена</h1>
                            <h3 className={styles.subTitle}>В ближайшее время мы свяжемся с Вами и согласуем время проведения собеседования.</h3>
                            <Button
                                variant="gradient"
                                padding="15px 156.5px"
                                onClick={handleNavigate}
                            >
                                Перейти в личный кабинет
                            </Button>
                        </div>
                    </section>
                </div>
            </>
    );
}
