import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import SideLink from "../../../shared/components/SideLink";

export default function ResearchesPage() {

    return (
            <>
                <SideLink />

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                            Анализ медицинских и социальных проблем больных целиакией, обусловленных необходимостью соблюдения безглютеновой диеты
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главный исследователь:</span> Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span  className={styles.researchesAboutColBlack}>Научный руководитель:</span> <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                            <div className={styles.researchesDoc}>
                                <p className={styles.researchesDocTitle}>Документы</p>
                                <div className={styles.researchesDocItems}>
                                    <div className={styles.researchesDocItemsCol}>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">Научно-практический рецензируемый журнал</a></span>
                                        </div>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">XXX Российский Национальный конгресс «Человек и лекарство»
                                            10–13 апреля 2023 г. Сборник тезисов</a></span>
                                        </div>
                                    </div>
                                    <div className={styles.researchesDocItemsCol}>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">XVIII Международная (XVIII Всероссийская) Пирговская научная конференция студентови молодых ученых. Сборник тезисов</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                            Совершенствование малоинвазивной диагностикии мониторинга целиакии
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главный исследователь:</span> Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Научный руководитель:</span> <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                            <div className={styles.researchesDoc}>
                                <p className={styles.researchesDocTitle}>Документы</p>
                                <div className={styles.researchesDocItems}>
                                    <div className={styles.researchesDocItemsCol}>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">Сборник проектов конкурса Всероссийская научная школа «МЕДИЦИНА МОЛОДАЯ»</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                            Серологическая оценка состояния слизистой оболочки желудка у пациентов с целиакией на фоне соблюдения безглютеновой диеты
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главный исследователь:</span> Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Научный руководители:</span> <span className={styles.researchesAboutColOrange}>Бакулин Игорь Геннадьевич</span> – д.м.н., профессор, заведующий кафедрой пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса 
                                </p>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                            <div className={styles.researchesDoc}>
                                <p className={styles.researchesDocTitle}>Документы</p>
                                <div className={styles.researchesDocItems}>
                                    <div className={styles.researchesDocItemsCol}>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">Сборник тезисов. Актуальные проблемы современной медицины и фармации , 2023 г.</a></span>
                                        </div>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">Всероссийская научная школа «МЕДИЦИНА МОЛОДАЯ». Сборник проектов конкурса 2022 г.</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                                Разработка программ на основе искусственного интеллекта
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главные исследователи:</span> Шостка Анастасия Георгиевна, Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Научный руководитель:</span> <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                                Оптимизация скрининга целиакии пациентов терапевтического профиля
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главные исследователи:</span> Гребенникова Софья Александровна, Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Научный руководитель:</span> <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                            <div className={styles.researchesDoc}>
                                <p className={styles.researchesDocTitle}>Документы</p>
                                <div className={styles.researchesDocItems}>
                                    <div className={styles.researchesDocItemsCol}>
                                        <div className={styles.researchesDocItem}>
                                            <img src={icons.pdfIcon} alt="pdfIcon" />
                                            <span><a href="#">Сборник проектов конкурса Всероссийская научная школа «МЕДИЦИНА МОЛОДАЯ»</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.researchesSection}>
                    <div className="container">
                        <div className={styles.researchesWrapper}>
                            <p className={styles.researchesTitle}>
                                Клинико-эпидемиологические особенностии выявление факторов риска целиакии
                            </p>
                            <div className={styles.researchesAbout}>
                                <div className={styles.researchesAboutTop}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Проект организовали и исследовали:</p>
                                </div>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Главный исследователь:</span> Ефремова Анастасия Юрьевна
                                </p>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>—</span> <span className={styles.researchesAboutColBlack}>Научный руководители:</span> <span className={styles.researchesAboutColOrange}>Бакулин Игорь Геннадьевич</span> – д.м.н., профессор, заведующий кафедрой пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса 
                                </p>
                                <p className={styles.researchesAboutCol}>
                                    <span className={styles.researchesAboutColOrange}>Семенова Елена Анатольевна</span> – к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса СЗГМУ им. И.И. Мечникова.
                                </p>
                            </div>
                            <div className={styles.researchesDoc}>
                                <p className={styles.researchesDocTitle}>Планируется исследование по проверке блюд в заведениях на дозу содержания глютена. <span className={styles.researchesDocTitleOrange}>Следите за результатами!</span></p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
