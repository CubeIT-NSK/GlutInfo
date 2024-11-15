import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import Button from "../../../shared/components/Buttons";
import SideLink from "../../../shared/components/SideLink";

export default function PastEventsPage() {

    return (
            <>
                <SideLink />
                <section className={styles.pastEventsSection}>
                    <div className="container">
                        <div className={styles.pastEvents}>
                            <div className={styles.pastEventsLeft}>
                                <div className={styles.pastEventsLeftText}>
                                    <h2 className={styles.pastEventsTitle}>Участие наших консультантов в международных конференциях:</h2>
                                    <p>— VI Всероссийский научно-практический конгресс с международным участием «Белые ночи гастроэнтерологии» Пациент с непереносимостью глютена на приеме. Диагностика, тактика, лечение Семенова Е.А.</p>
                                </div>
                                <Button
                                    variant="gradient"
                                    padding="17.5px 126.5px"
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <div className={styles.pastEventsRight}>
                                <img src={images.pastEventsImage} alt="pastEventsImage" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.pastEventSection}>
                    <div className="container">
                        <div className={styles.pastEvent}>
                            <div className={styles.pastEventTitle}>
                                <p className={styles.pastEventTitleP}><span>—</span> VII Всероссийская научно-практическая конференция с международным участием «Зимняя школа воспалительных заболеваний кишечника» Экспертный мастер-класс</p>
                                <p className={styles.pastEventTitlePMin}>Предвидеть и не пропустить: энтеропатия и ВЗК</p>
                            </div>
                            <div className={styles.pastEventMain}>
                                <p><span>Формат:</span> очный с онлайн трансляцией</p>
                                <p><span>Место проведения:</span> Санкт-Петербург, отель «Введенский», Большой проспект П.С., д. 37</p>
                                <p className={styles.pastEventMainLink}><span>Ссылка на трансляцию:</span> <a href="https://ogig.mediator.cloud/2024-02-27">https://ogig.mediator.cloud/2024-02-27</a></p>
                                <p><span>Начало программы:</span> 27.02.2024, 9:00 (МСК)</p>
                            </div>
                            <Button
                                variant="gradient"
                                padding="17.5px 204px"
                            >
                                Подробнее
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={styles.pastEventSection}>
                    <div className="container">
                        <div className={styles.pastEvent}>
                            <div className={styles.pastEventTitle}>
                                <p className={styles.pastEventTitleP}><span>—</span> Участие в мастер-классе ”Волшебники Изумрудного города или мультидисциплинарный подход к заболеваниям кишечника”</p>
                            </div>
                            <div className={styles.pastEventMain}>
                                <p><span>Формат:</span> онлайн трансляция</p>
                                <p><span>Место проведения:</span> Санкт-Петербург, отель «Введенский», Большой проспект П.С., д. 37</p>
                                <p className={styles.pastEventMainLink}><span>Ссылка на трансляцию:</span> <a href="https://ogig.mediator.cloud/2024-03-26">https://ogig.mediator.cloud/2024-03-26</a></p>
                                <p><span>Начало программы:</span> 26.03.2024, 16:00 (МСК)</p>
                            </div>
                            <Button
                                variant="gradient"
                                padding="17.5px 204px"
                            >
                                Подробнее
                            </Button>
                        </div>
                    </div>
                </section>
                <section className={styles.pastEventSection}>
                    <div className="container">
                        <div className={styles.pastEvent}>
                            <div className={styles.pastEventTitle}>
                                <p className={styles.pastEventTitleP}><span>—</span> VII Всероссийская научно-практическая конференция с международным участием «Петербургская весна гепатологии» </p>
                                <p className={styles.pastEventTitlePMin}>Печень как орган-мишень целиакии. Эксклюзив или рутинный сценарий?</p>
                            </div>
                            <div className={styles.pastEventMain}>
                                <p><span>Формат:</span> очный с онлайн трансляцией</p>
                                <p><span>Место проведения:</span> Санкт-Петербург, отель «Введенский», Большой проспект П.С., д. 37</p>
                                <p className={styles.pastEventMainLink}><span>Ссылка на трансляцию:</span> <a href="https://ogig.mediator.cloud/2024-04-23">https://ogig.mediator.cloud/2024-04-23</a></p>
                                <p><span>Начало программы:</span> 23.04.2024, 9:00 (МСК)</p>
                            </div>
                            <Button
                                variant="gradient"
                                padding="17.5px 204px"
                            >
                                Подробнее
                            </Button>
                        </div>
                    </div>
                </section>
            </>
    );
}
