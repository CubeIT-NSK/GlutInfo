import React from "react";
import styles from "./index.module.css";
import icons from "../../shared/resources/icon";
import Button from "../../shared/components/Buttons";

const documents = [
    { id: 1, title: "Рекомендация 1" },
    { id: 2, title: "Рекомендация 2" },
    { id: 3, title: "Рекомендация 3" },
    { id: 4, title: "Рекомендация 4" },
    { id: 5, title: "Рекомендация 5" },
    { id: 6, title: "Рекомендация 6" }
];

export default function DocumentsPage() {
    return (
            <>
                <section className={styles.documentsSection}>
                    <div className="container">
                        <div className={styles.documentsWrapper}>
                            <h2>Мои документы</h2>
                            <div className={styles.documents}>
                                {documents.map((doc) => (
                                    <div key={doc.id} className={styles.document}>
                                        <img src={icons.pdfIcon} alt="pdfIcon" />
                                        <span>
                                            <a href="#">{doc.title}</a>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Button
                                className={styles.documentsBtn}
                                variant="white"
                                padding="15px 30.5px"
                            >
                                Назад в личный кабинет
                            </Button>
                        </div>
                    </div>
                </section>
            </>
    );
}
