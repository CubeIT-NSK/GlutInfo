import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function PeterSpringPage() {

    return (
            <>
                <SideLink />

                <section className={styles.peterSpringSection}>
                    <div className="container">
                        <div className={styles.peterSpringWrapper}>
                            <div className={styles.peterSpringHeader}>
                                <h2 className={styles.peterSpringTitle}>VII Всероссийская научно-практическая конференция с международным участием «Петербургская весна гепатологии»</h2>
                                <h2 className={styles.peterSpringTitleOrange}>Печень как орган-мишень целиакии</h2>
                            </div>
                            <div className={styles.peterSpringTextCol}>
                                <p>В программе Конференции выступят ведущие специалисты с сообщениями по актуальным вопросам этиопатогенеза, дифференциальной диагностики и терапии заболеваний печени в свете новейших научных достижений. В ходе Конференции пройдут интерактивные обсуждения реальных клинических случаев, междисциплинарные дискуссии с экспертным мнением гастроэнтерологов, гепатологов, инфекционистов, хирургов, эндокринологов, трансплантологов, морфологов и др.</p>
                            </div>
                            <div className={styles.peterSpringTextCol}>
                                <h2>«Петербургская весна гепатологии»</h2>
                                <p><span className={styles.peterSpringTextColOrange}>—</span> это отличная возможность для обмена знаниями и практическим опытом по всем вопросам, касающихся ведения пациентов с заболеваниями печени, как в реальной клинической практике, так и в перспективе, с учетом динамично развивающихся представлений о патогенезе заболевания и таргетной терапии.</p>
                            </div>
                            <div className={styles.peterSpringWorkers}>
                                <div className={styles.peterSpringWorkersHead}>
                                    <img src={images.peterSpringDocImage} alt="peterSpringDocImage" />
                                    <p>К участию в работе Конференции приглашаются специалисты различных специальностей:</p>
                                </div>
                                <div className={styles.peterSpringWorkersLists}>
                                    <div className={styles.peterSpringWorkersList}>
                                        <p><span>-</span> терапевты</p>
                                        <p><span>-</span> гастроэнтерологи</p>
                                    </div>
                                    <div className={styles.peterSpringWorkersList}>
                                        <p><span>-</span> врачи общей практики</p>
                                        <p><span>-</span> инфекционисты</p>
                                    </div>
                                    <div className={styles.peterSpringWorkersList}>
                                        <p><span>-</span> хирурги</p>
                                        <p><span>-</span> и др.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.peterSpringRegistr}>
                                <h2>Для регистрации в очном формате</h2>
                                <p>Направьте на электронную почту <a href="mailto:info@gastro-gepa.ru">info@gastro-gepa.ru</a> информацию: ФИО, место работы/специализация, телефон.</p>
                            </div>
                            <div className={styles.peterSpringReports}>
                                <div className={styles.peterSpringReportsHead}>
                                    <img src={images.peterSpringCalcImage} alt="peterSpringCalcImage" />
                                    <p>В рамкам мероприятия пройдет конкурс постерных докладов</p>
                                </div>
                                <div className={styles.peterSpringReportsText}>
                                    <p>К участию в конкурсе приглашаются врачи всех специальностей, ординаторы, аспиранты, студенты.</p>
                                    <p>Электронные постерные доклады принимаются <span>до 15 апреля</span> включительно по электронной почте <a href="mailto:info@gastro-gepa.ru">info@gastro-gepa.ru</a></p>
                                    <p>С правилами оформления работ можно ознакомиться <a href="№">здесь</a></p>
                                </div>
                            </div>
                            <div className={styles.peterSpringTextCol}>
                                <h2>Мероприятие соответствует требованиям НМО</h2>
                                <p><span className={styles.peterSpringTextColBlack}>Целевая аудитория:</span>  гастроэнтерология, терапия, лечебное дело, диетология, инфекционные болезни, общая врачебная практика (семейная медицина)</p>
                            </div>
                            <div className={styles.peterSpringMetods}>
                                <div className={styles.peterSpringMetodsHead}>
                                    <img src={images.peterSpringWorkspaceImage} alt="peterSpringWorkspaceImage" />
                                    <p>Методы учета присутствия участников</p>
                                </div>
                                <div className={styles.peterSpringMetodsText}>
                                    <p><span>Очные слушатели:</span> ручная запись на стойке регистрации. Учет времени присутствия осуществляется посредством фиксирования времени выдачи/сдачи бейджей участников Минимальный порог присутствия: 270 минут научно-образовательной части Программы,Спонсорские лекции не учитываются.</p>
                                    <p><span>Онлайн слушатели:</span> предварительная регистрация (ФИО, телефон, эл. почта, город, специализация); минимальный порог присутствия: 270 минут научно-образовательной части Программы, Спонсорские лекции не учитываются. Периодический контроль осуществляется посредством всплывающего баннера 1 раз в 45 мин., в хаотичном порядке, общее количество нажатий составляет 9 раз; минимальное количество нажатий составляет 6 раз.</p>
                                </div>
                            </div>
                            <div className={styles.peterSpringLinks}>
                                <p>Участие в мероприятии бесплатное</p>
                                <p>Служба технической поддержки конференции: <a className={styles.peterSpringLinksMail} href="mailto:info@gastro-gepa.ru">info@gastro-gepa.ru</a>, <a className={styles.peterSpringLinksTel} href="tel:+79312308875">+79312308875</a></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.peterSpringSection}>
                    <div className="container">
                        <div className={styles.peterSpringPartnersWrapper}>
                            <h2 className={styles.peterSpringPartnersTitle}>Партнеры Конференции</h2>
                            <div className={styles.peterSpringPartners}>
                                <div className={styles.peterSpringPartnersTop}>
                                    <img src={images.peterSpringReddysImage} alt="peterSpringReddysImage" />
                                    <img src={images.peterSpringMerzImage} alt="peterSpringMerzImage" />
                                    <img src={images.peterSpringSobiImage} alt="peterSpringSobiImage" />
                                </div>
                                <div className={styles.peterSpringPartnersBottom}>
                                    <img src={images.peterSpringPolisanImage} alt="peterSpringPolisanImage" />
                                    <img src={images.peterSpringDvfImage} alt="peterSpringDvfImage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
