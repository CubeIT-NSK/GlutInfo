import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import SideLink from '../../../shared/components/SideLink';


export default function SocialProjectsPage() {

    return (
            <>
                <SideLink />

                <section className={styles.socialProjectsSection}>
                    <div className="container">
                        <div className={styles.socialProjectsWrapper}>
                            <div className={styles.socialMedDays}>
                                <div className={styles.socialMedDaysCont}>
                                    <div className={styles.socialMedDaysHeader}>
                                        <div className={styles.socialMedDaysHeaderText}>
                                            <p className={styles.socialHeaderTitle}>
                                            Проект «Дни медицинской науки. Фокус на глютен!»
                                            </p>
                                            <div className={styles.socialHeaderTextContain}>
                                                <p className={styles.socialHeaderText}>
                                                    Проект проводится в рамках <span className={styles.socialHeaderTextOrange}>волонтерского движения Северо-Западного Центра лечения глютен-ассоциированных заболеваний</span>, заключается в проведении просветительской, исследовательской деятельности, мастер-классов, направленных на информированность о глютене, нарушениях толерантности к глютену среди школьников 6-9 классов.
                                                </p>
                                                <p className={styles.socialHeaderText}>
                                                    Проект выполнен под руководством кандидата медицинских наук, доцента кафедры внутренних болезней, гастроэнтерологии и диетологии имени С.М.Рысса, <span className={styles.socialHeaderTextBlack}>Семеновой Елены Анатольевны.</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.socialMedDaysHeaderImg}>
                                            <img src={images.socialProjectsBroshure1Image} alt="socialProjectsBroshure1Image" />
                                        </div>
                                    </div>
                                    <div className={styles.socialMedDaysMainImg}>
                                            <img src={images.socialProjectsBroshure2Image} alt="socialProjectsBroshure2Image" />
                                            <img src={images.socialProjectsClass1Image} alt="socialProjectsClass1Image" />
                                            <img src={images.socialProjectsClass2Image} alt="socialProjectsClass2Image" />
                                    </div>
                                </div>
                                <div className={styles.socialMedDaysMain}>
                                    <button className={styles.socialBtn}>
                                        <div className={styles.socialCircle}>
                                            <div className={styles.socialInnerCircle}>
                                                <img className={styles.socialPlayIcon} src={icons.playIcon} alt="playIcon" />
                                            </div>
                                        </div>
                                        <span>Смотреть видео</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.socialHoma}>
                    <div className="container">
                        <div className={styles.socialHomaWrapper}>
                            <div className={styles.socialHomaHeader}>
                                <div className={styles.socialHomaHeaderAbout}>
                                    <p className={styles.socialHomaHeaderTitle}>Проект «О глютене для самых маленьких от хомячка Хомы!»</p>
                                    <div className={styles.socialHomaHeaderAboutContain}>
                                        <p className={styles.socialHomaHeaderText}>
                                            Данный проект проводится в рамках волонтерского движения <span className={styles.socialHomaHeaderTextOrange}>Северо-Западного Центра лечения глютен-ассоциированных заболеваний на базе.</span> Заключается он в проведении занятий в дошкольных детски
                                        </p>
                                        <p className={styles.socialHomaHeaderText}>
                                            Первое мероприятие прошло в детском саду № 43 Калининского района Санкт-Петербурга. Студенты познакомили деток с профессией врача, разыграли сценки, в которых ребята могли проявить себя <br />и почувствовать настоящими врачами! Также в ходе занятия в виде интерактива волонтеры рассказали <br />про глютен, глютен-ассоциированные заболевания, безглютеновую диету. Данный раздел мероприятия очень важен для воспитанников детского сада №43, <br />так как среди них есть ребята, страдающие целиакией, поэтому необходимо рассказывать о проблеме, объяснять принципы соблюдения диеты и, конечно, показывать, <br />что ребята не одни!
                                        </p>
                                        <p className={styles.socialHomaHeaderText}>
                                            Для наглядности и лучшего усвоения материала каждому воспитаннику детского сада была подготовлена книжка <span className={styles.socialHomaHeaderTextOrange}>«История Хомы»</span>, которая посредством различных развивательных игр знакомит ребят с целиакией <br />и безглютеновой диетой.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.socialHomaHeaderImg}>
                                    <img src={images.socialProjectsHomaImage} alt="socialProjectsHomaImage" />
                                </div>
                            </div>
                            <div className={styles.socialHomaMain}>
                                <p className={styles.socialHomaMainTitle}>
                                    Проект выполнен под руководством кандидата медицинских наук, доцента кафедры внутренних болезней, гастроэнтерологии и диетологии имени С.М.Рысса, Семеновой Елены Анатольевны.
                                </p>
                                    <div className={styles.socialHomaMainText}>
                                        <div className={styles.socialHomaMainTop}>
                                            <img src={images.socialProjectsDoctorImage} alt="socialProjectsDoctorImage" />
                                            <p>Проект организовали и провели:</p>
                                        </div>
                                        <ul>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>—</span> <span  className={styles.socialHomaMainColBlack}>Ефремова Анастасия Юрьевна</span> - организатор проекта; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>—</span> <span className={styles.socialHomaMainColBlack}>Нестерова Ксения Геннадьевна</span> - художник; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>—</span> <span className={styles.socialHomaMainColBlack}>Гребенникова Софья Александровна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>—</span> <span className={styles.socialHomaMainColBlack}>Богданова Надежда Евгеньевна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>—</span> <span className={styles.socialHomaMainColBlack}>Шушакова Мария Вадимовна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                            <li className={styles.socialHomaMainCol}>
                                                <span className={styles.socialHomaMainColOrange}>Медиа:</span> <span className={styles.socialHomaMainColBlack}>Смирнова Вера</span> - выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.socialHomaMainImgWrapper}>
                                        <div className={styles.socialHomaMainImg}>
                                            <div className={styles.socialHomaMainImgTop}>
                                                <img className={styles.socialHomaMainImgBig} src={images.SocialProjectsSlide1Image} alt="SocialProjectsSlide1Image" />
                                            </div>
                                            <div className={styles.socialHomaMainImgBottom}>
                                                <div className={styles.socialHomaMainImgBottomContain}>
                                                    <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide6Image} alt="SocialProjectsSlide6Image" />
                                                </div>
                                                <div className={styles.socialHomaMainImgBottomContain}>
                                                    <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide2Image} alt="SocialProjectsSlide2Image" />
                                                </div>
                                                <div className={styles.socialHomaMainImgBottomContain}>
                                                    <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide3Image} alt="SocialProjectsSlide3Image" />
                                                </div>
                                                <div className={styles.socialHomaMainImgBottomContain}>
                                                    <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide4Image} alt="SocialProjectsSlide4Image" />
                                                </div>
                                                <div className={styles.socialHomaMainImgBottomContain}>
                                                    <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide5Image} alt="SocialProjectsSlide5Image" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className={styles.socialBtn}>
                                            <div className={styles.socialCircle}>
                                                <div className={styles.socialInnerCircle}>
                                                    <img className={styles.socialPlayIcon} src={icons.playIcon} alt="playIcon" />
                                                </div>
                                            </div>
                                            <span>Смотреть видео</span>
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
