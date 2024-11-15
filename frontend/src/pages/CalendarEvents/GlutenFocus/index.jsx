import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import SideLink from "../../../shared/components/SideLink";

export default function GlutenFocusPage() {

    return (
            <>
                <SideLink />
                <section className={styles.glutenFocusSection}>
                    <div className="container">
                        <div className={styles.glutenFocusWrapper}>
                            <div className={styles.glutenFocusHeader}>
                                <h2>23.11.2023</h2>
                                <p>«Дни медицинской науки. Фокус на глютен!»</p>
                            </div>
                            <div className={styles.glutenFocusText}>
                                <p>23 ноября 2023 года в лицее №179 в 7-х классах состоялось занятие "Дни медицинской науки. Фокус на глютен!".</p>
                                <p>Проект проводится в рамках волонтерского движения Северо-Западного Центра лечения глютен-ассоциированных заболеваний, заключается в проведении просветительской, исследовательской деятельности, мастер-классов, направленных на информированность о глютене, нарушениях толерантности к глютену среди школьников 6-9 классов.</p>
                                <p>В рамках проведённых занятий студенты провели профориентационную работу, ознакомили с профессией врача. Провели мастер-класс "Глютен. Что это такое? И с чем его едят?". Заключением стал интерактив для закрепления полученных в ходе лекции знаний у учеников.</p>
                                <p>Для наглядности и лучшего усвоения материала каждому учащемуся предлагалась информационная брошюра.</p>
                                <p>Проект выполнен под руководством кандидата медицинских наук, доцента кафедры внутренних болезней, гастроэнтерологии и диетологии имени С.М.Рысса, Семеновой Елены Анатольевны.</p>
                            </div>
                            <div className={styles.glutenFocusOrganizers}>
                                <div className={styles.glutenFocusOrganizersTop}>
                                    <img src={images.socialProjectsDoctorImage} alt="socialProjectsDoctorImage" />
                                    <p>Проект организовали и провели:</p>
                                </div>
                                <ul>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                        <span className={styles.glutenFocusOrganizersColOrange}>—</span> <span  className={styles.glutenFocusOrganizersColBlack}>Ефремова Анастасия Юрьевна</span> - организатор проекта; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                    <span className={styles.glutenFocusOrganizersColOrange}>—</span> <span className={styles.glutenFocusOrganizersColBlack}>Ашуров Григорий Махмараджабович</span> - волонтер; студент лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                        <span className={styles.glutenFocusOrganizersColOrange}>—</span> <span className={styles.glutenFocusOrganizersColBlack}>Нестерова Ксения Геннадьевна</span> - художник; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                        <span className={styles.glutenFocusOrganizersColOrange}>—</span> <span className={styles.glutenFocusOrganizersColBlack}>Гребенникова Софья Александровна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                        <span className={styles.glutenFocusOrganizersColOrange}>—</span> <span className={styles.glutenFocusOrganizersColBlack}>Шушакова Мария Вадимовна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.glutenFocusOrganizersCol}>
                                        <span className={styles.glutenFocusOrganizersColOrange}>Медиа:</span> <span className={styles.glutenFocusOrganizersColBlack}>Шушакова Мария Вадимовна</span> - выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.glutenFocusMainImg}>
                                <div className={styles.glutenFocusMainImgTop}>
                                    <img className={styles.socialHomaMainImgBig} src={images.SocialProjectsSlide1Image} alt="SocialProjectsSlide1Image" />
                                </div>
                                <div className={styles.glutenFocusMainImgBottom}>
                                    <div className={styles.glutenFocusMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide6Image} alt="SocialProjectsSlide6Image" />
                                    </div>
                                    <div className={styles.glutenFocusMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide2Image} alt="SocialProjectsSlide2Image" />
                                    </div>
                                    <div className={styles.glutenFocusMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide3Image} alt="SocialProjectsSlide3Image" />
                                    </div>
                                    <div className={styles.glutenFocusMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide4Image} alt="SocialProjectsSlide4Image" />
                                    </div>
                                    <div className={styles.glutenFocusMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide5Image} alt="SocialProjectsSlide5Image" />
                                    </div>
                                </div>
                            </div>
                            <button className={styles.glutenFocusHomaBtn}>
                                <div className={styles.glutenFocusCircle}>
                                    <div className={styles.glutenFocusInnerCircle}>
                                        <img className={styles.glutenFocusPlayIcon} src={icons.playIcon} alt="playIcon" />
                                    </div>
                                </div>
                                <span>Смотреть видео</span>
                            </button>
                        </div>
                    </div>
                </section>
            </>
    );
}
