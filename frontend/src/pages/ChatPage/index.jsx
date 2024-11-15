import React from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../shared/components/Chat";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";

export default function ChatPage() {
    const navigate = useNavigate();

    const handleExit = (event) => {
        event.preventDefault();
        navigate('/profile-patient');
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/profile-patient');
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.chatSection}>
                        <div className={styles.chatTitle}>
                            <h1 className={styles.title}>Сообщения</h1>
                            <button className={styles.exitButton} onClick={handleExit}><span>Выход</span></button>
                        </div>
                        <Chat />
                        <Button
                            className={styles.backButton}
                            variant="gradient"
                            onClick={handleBack}
                            padding="15px 30.5px"
                        >
                            Назад в личный кабинет
                        </Button>
                    </section>
                </div>
            </>
    );
}
