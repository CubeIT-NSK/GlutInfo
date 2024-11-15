import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function AboutGlutenPage() {

    return (
            <>
                <SideLink />
                <section className={styles.aboutGlutenSection}>
                    <div className="container">
                        <div className={styles.aboutGlutenWrapper}>
                            <div className={styles.aboutGlutenHead}>
                                <h2>24.05.2023</h2>
                                <p>Лекция «Всё о глютене» для сотрудников детского сада</p>
                            </div>
                            <div className={styles.aboutGlutenText}>
                                <p>27 мая 2024 в детском саду № 43 Калининского района Санкт-Петербурга, где имеются воспитанники с глютен-ассоциированными заболеваниями, Ефремова Анастасия Юрьевна провела для сотрудников лекцию «Все о глютене». Были рассмотрены такие вопросы, как «Что такое глютен-ассоциированные заболевнаия?», «Что такое глютен?», «Где он содержится?», «явный и скрытый глютен», «Загрязнение следами глютена».</p>
                            </div>
                            <div className={styles.aboutGlutenImages}>
                                <img src={images.aboutGluten1Image} alt="aboutGluten1Image" />
                                <img src={images.aboutGluten2Image} alt="aboutGluten2Image" />
                                <img src={images.aboutGluten3Image} alt="aboutGluten3Image" />
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
