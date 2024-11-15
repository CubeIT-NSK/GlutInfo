import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function EducationalPage() {

    return (
            <>
                <SideLink />
                <section className={styles.educationalSection}>
                    <div className="container">
                        <div className={styles.educationalWrapper}>
                            <p className={styles.educationalHeader}>Образовательные школы для пациентов <br />c глютен-ассоциированными заболеваниями</p>
                            <div className={styles.educationalTextContain}>
                                <p className={styles.educationalText}>
                                    Образовательные школы, которые проходят <span className={styles.educationalTextOrange}>в очном формате</span> в Санкт-Петербурге и <span className={styles.educationalTextOrange}>в онлайн-формате</span>.
                                </p>
                                <p className={styles.educationalText}>
                                    Каждое занятие посвящено определенной теме. Руководитель Центра лечения глютен-ассоциированных заболеваний читает лекцию на данную тему, в конце совместно с пациентами <span className={styles.educationalTextBlack}>обсуждаются непонятные моменты.</span>
                                </p>
                            </div>
                            <img src={images.educationalSchoolsImage} alt="educationalSchoolsImage" />
                        </div>
                    </div>
                </section>
            </>
    );
}
