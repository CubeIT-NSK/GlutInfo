import React from "react";
import styles from "./index.module.css";

export default function ErrorPage() {

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.successSection}>
                        <div className={styles.successTitleWrapper}>
                            <h1 className={styles.title}>404 Error</h1>
                            <h3 className={styles.subTitle}>Not Found</h3>
                        </div>
                    </section>
                </div>
            </>
    );
}
