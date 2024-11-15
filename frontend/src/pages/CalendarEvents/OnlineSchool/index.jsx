import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import OnlineSchoolForm from "../../../shared/components/Forms/OnlineSchoolForm"
import SideLink from "../../../shared/components/SideLink";

export default function OnlineSchoolPage() {

    return (
            <>
                <SideLink />
                <section className={styles.onlineSchoolSection}>
                    <div className="container">
                        <div className={styles.onlineSchoolWrapper}>
                            <div className={styles.onlineSchoolLeft}>
                                <h2>Онлайн-школа пациента</h2>
                                <p>Вебинар руководителя Центра лечения глютен-ассоциированных заболеваний, Семеновой Елены Анатольевны, ответы на вопросы пациентов.</p>
                            </div>
                            <div className={styles.onlineSchoolRight}>
                                <img src={images.onlineSchoolImage} alt="onlineSchoolImage" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.onlineSchoolFormSection}>
                    <div className="container">
                        <OnlineSchoolForm />
                    </div>
                </section>
            </>
    );
}
