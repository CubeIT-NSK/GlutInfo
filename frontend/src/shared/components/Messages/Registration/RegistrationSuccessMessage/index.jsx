import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../../../Buttons";

export default function RegistrationSuccessMessage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/profile-patient');
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successRegSection}>
                        <div className={styles.successRegTitleWrapper}>
                            <h1 className={styles.regTitle}>Спасибо за регистрацию</h1>
                            <h3 className={styles.regSubTitle}>Вы подтвердили адрес электронной почты и завершили регистрацию.</h3>
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
