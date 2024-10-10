import React from "react";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import styles from "./index.module.css";

export default function PatternPage() {

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.patternSection}>
                    <div className={styles.patternTitleWrapper}>
                        <h1 className={styles.title}></h1>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
