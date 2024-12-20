import React from "react";
import styles from "./index.module.css";

export default function DeniedPage() {

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successSection}>
                        <div className={styles.successTitleWrapper}>
                            <h1 className={styles.title}>Доступ запрещён</h1>
                            <h3 className={styles.subTitle}>Вы не авторизовались для просмотра данной страницы</h3>
                        </div>
                    </section>
                </div>
            </>
    );
}
