import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../../../Buttons";

export default function AccountErrorMessage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successRegSection}>
                        <div className={styles.successRegTitleWrapper}>
                            <h1 className={styles.regTitle}>Ошибка регистрации</h1>
                            <h3 className={styles.regSubTitle}>Произошла ошибка регистрации. Обратитесь к администрации сайта.</h3>
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
