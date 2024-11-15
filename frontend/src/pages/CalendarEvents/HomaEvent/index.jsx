import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import SideLink from "../../../shared/components/SideLink";

export default function HomaEventPage() {

    return (
            <>
                <SideLink />
                <section className={styles.homaEventSection}>
                    <div className="container">
                        <div className={styles.homaEventWrapper}>
                            <div className={styles.homaEventHeader}>
                                <h2>05.12.2023</h2>
                                <p>«О глютене для самых маленьких от хомячка Хомы!»</p>
                            </div>
                            <div className={styles.homaEventText}>
                                <p>5 декабря 2023 года был запущен проект «О глютене для самых маленьких от хомячка Хомы!» в рамках волонтерского движения Северо-Западного Центра лечения глютен-ассоциированных заболеваний на базе.</p>
                                <p>Первое мероприятие прошло в детском саду № 43 Калининского района Санкт-Петербурга. Студенты познакомили деток с профессией врача, разыграли сценки, в которых ребята могли проявить себя и почувствовать настоящими врачами! Также в ходе занятия в виде интерактива волонтеры рассказали про глютен, глютен-ассоциированные заболевания, безглютеновую диету. Данный раздел мероприятия очень важен для воспитанников детского сада №43, так как среди них есть ребята, страдающие целиакией, поэтому необходимо рассказывать о проблеме, объяснять принципы соблюдения диеты и, конечно, показывать, что ребята не одни!</p>
                                <p>Для наглядности и лучшего усвоения материала каждому воспитаннику детского сада была подготовлена книжка «История Хомы», которая посредством различных развивательных игр знакомит ребят с целиакией и безглютеновой диетой.</p>
                                <p>Проект выполнен под руководством кандидата медицинских наук, доцента кафедры внутренних болезней, гастроэнтерологии и диетологии имени С.М.Рысса, Семеновой Елены Анатольевны.</p>
                            </div>
                            <div className={styles.homaEventOrganizers}>
                                <div className={styles.homaEventOrganizersTop}>
                                    <img src={images.socialProjectsDoctorImage} alt="socialProjectsDoctorImage" />
                                    <p>Проект организовали и провели:</p>
                                </div>
                                <ul>
                                    <li className={styles.homaEventOrganizersCol}>
                                        <span className={styles.homaEventOrganizersColOrange}>—</span> <span  className={styles.homaEventOrganizersColBlack}>Ефремова Анастасия Юрьевна</span> - организатор проекта; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.homaEventOrganizersCol}>
                                    <span className={styles.homaEventOrganizersColOrange}>—</span> <span className={styles.homaEventOrganizersColBlack}>Нестерова Ксения Геннадьевна</span> - художник; выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.homaEventOrganizersCol}>
                                        <span className={styles.homaEventOrganizersColOrange}>—</span> <span className={styles.homaEventOrganizersColBlack}>Гребенникова Софья Александровна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.homaEventOrganizersCol}>
                                        <span className={styles.homaEventOrganizersColOrange}>—</span> <span className={styles.homaEventOrganizersColBlack}>Богданова Надежда Евгеньевна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.homaEventOrganizersCol}>
                                        <span className={styles.homaEventOrganizersColOrange}>—</span> <span className={styles.homaEventOrganizersColBlack}>Шушакова Мария Вадимовна</span> - волонтер; студентка лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                    <li className={styles.homaEventOrganizersCol}>
                                        <span className={styles.homaEventOrganizersColOrange}>Медиа:</span> <span className={styles.homaEventOrganizersColBlack}>Смирнова Вера</span> - выпускница лечебного факультета СЗГМУ им. И.И. Мечникова
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.homaEventMainImg}>
                                <div className={styles.homaEventMainImgTop}>
                                    <img className={styles.socialHomaMainImgBig} src={images.SocialProjectsSlide1Image} alt="SocialProjectsSlide1Image" />
                                </div>
                                <div className={styles.homaEventMainImgBottom}>
                                    <div className={styles.homaEventMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide6Image} alt="SocialProjectsSlide6Image" />
                                    </div>
                                    <div className={styles.homaEventMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide2Image} alt="SocialProjectsSlide2Image" />
                                    </div>
                                    <div className={styles.homaEventMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide3Image} alt="SocialProjectsSlide3Image" />
                                    </div>
                                    <div className={styles.homaEventMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide4Image} alt="SocialProjectsSlide4Image" />
                                    </div>
                                    <div className={styles.homaEventMainImgBottomContain}>
                                        <img className={styles.socialHomaMainImgOther} src={images.SocialProjectsSlide5Image} alt="SocialProjectsSlide5Image" />
                                    </div>
                                </div>
                            </div>
                            <button className={styles.homaEventHomaBtn}>
                                <div className={styles.homaEventCircle}>
                                    <div className={styles.homaEventInnerCircle}>
                                        <img className={styles.homaEventPlayIcon} src={icons.playIcon} alt="playIcon" />
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
