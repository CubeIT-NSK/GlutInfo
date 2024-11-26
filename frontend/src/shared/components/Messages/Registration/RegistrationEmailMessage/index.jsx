import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../../../Buttons";

export default function RegistrationEmailMessage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successRegSection}>
                        <div className={styles.successRegTitleWrapper}>
                            <h1 className={styles.regTitle}>Спасибо за регистрацию</h1>
                            <h3 className={styles.regSubTitle}>Для её завершения, пожалуйста, проследуйте по ссылке в письме, которое было только что отправлено Вам по электронной почте.</h3>
                            <Button
                                variant="gradient"
                                padding="15px 184.5px"
                                onClick={handleNavigate}
                            >
                                На главную страницу
                            </Button>
                        </div>
                    </section>
                </div>
            </>
    );
}
