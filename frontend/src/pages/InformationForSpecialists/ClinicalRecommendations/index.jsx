import React from "react";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";
import SideLink from "../../../shared/components/SideLink";

const documents = [
    { id: 1, title: "Современное представление о целиакии взрослых" },
    { id: 2, title: "Клинические рекомендации «Целиакия» 2021 г." },
    { id: 3, title: "Глютен-ассоциированные заболевания. Часть 1" },
    { id: 4, title: "Глютен-ассоциированные заболевания. Часть 2" }
];

export default function ClinicalRecommendationsPage() {
    return (
        <>
            <SideLink />
                <section className={styles.clinicalRecommendationsSection}>
                    <div className="container">
                        <div className={styles.clinicalRecommendationsWrapper}>
                            <h2>Документы</h2>
                            <div className={styles.clinicalRecommendationsDocs}>
                                {documents.map((doc) => (
                                    <div key={doc.id} className={styles.clinicalRecommendationsDoc}>
                                        <img src={icons.pdfIcon} alt="pdfIcon" />
                                        <span>
                                            <a href="#">{doc.title}</a>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
        </>
    );
}
