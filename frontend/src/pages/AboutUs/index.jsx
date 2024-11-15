import React from "react";
import icons from "../../shared/resources/icon";
import images from "../../shared/resources/images";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";
import SideLink from "../../shared/components/SideLink";

export default function AboutUs() {

    return (
            <>
                <SideLink />
                <section className={styles.aboutUs}>
                    <div className="container">
                        <div className={styles.aboutUsWrapper}>
                            <div className={styles.aboutUsLeft}>
                                <div className={styles.aboutUsLeftTop}>
                                    <h1 className={styles.aboutUsTitle}>Нашим приоритетом являются</h1>
                                    <div className={styles.aboutUsInfo}>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>01</h2>
                                            <p className={styles.aboutUsText}><span>Правильная диагностика</span> и ведение пациентов с глютен-ассоциированными заболеваниями (целиакией, нецелиакийной чувствительностью к глютену, аллергией на пшеницу)</p>
                                        </div>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>02</h2>
                                            <p className={styles.aboutUsText}><span>Помощь</span> в соблюдении безглютеновой диеты</p>
                                        </div>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>03</h2>
                                            <p className={styles.aboutUsText}><span>Повышение качества жизни</span> данной категории пациентов</p>
                                        </div>
                                    </div>
                                </div>
                                <Button
									variant="gradient"
									padding="22.5px 44.5px"
								>
									Записаться на онлайн-консультацию
								</Button>
                            </div>
                            <img src={images.aboutUsDoctor1Image} alt="aboutUsDoctor1Image" />
                        </div>
                    </div>
                </section>

                <section className={styles.directions}  style={{ backgroundImage: `url(${images.aboutUsBackground4Image})` }}>
                    <div className="container">
                        <div className={styles.directionsWrapper}>
                            <img src={images.aboutUsDoctor2Image} alt="aboutUsDoctor2Image" />
                            <div className={styles.directionsRight}>
                                <div className={styles.directionsRightTop}>
                                    <h2 className={styles.directionsTitle}>
                                        Телемедицинский сервис <span>«ГастроГлютен.инфо»</span>
                                    </h2>
                                    <p className={styles.directionsSubTitle}>На основе Северо-Западного Центра лечения глютен-ассоциированных заболеваний г. Санкт-Петербург</p>
                                </div>
                                <div className={styles.directionsInfo}>
                                    <h2 className={styles.directionsInfoTitle}>Главные направления:</h2>
                                    <div className={styles.directionsInfoWrapper}>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.doctorIcon} alt="doctorIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    Оказание онлайн-консультацийпрофильными специалистами.
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                    Гастроэнтерология, диетология, психология
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.calculatorIcon} alt="calculatorIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    Помощь в соблюдении безглютеновой диеты.
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                    Принципы БГД, рецепты безглютеновых блюд. Cоставление индивидуального меню
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.computerIcon} alt="computerIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    Информационный блок.
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                Взгляд консультанта, статьи, исследования
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.problemInfo} style={{ backgroundImage: `url(${images.aboutUsBackground6Image})` }}>
                    <div className="container">
                        <div className={styles.problemMiddle}>
                            <div className={styles.problemLeft}>
                                <img className={styles.problemIcon} src={icons.problemQoutesIcon} alt="problemQoutesIcon" />
                                <div className={styles.problemWrapper}>
                                    <p className={styles.problemText}>
                                        Данная платформа направлена на пациентов с глютен-ассоциированными заболеваниямии лиц, которые соблюдают безглютеновую диету по иным причинам.
                                    </p>
                                    <p className={styles.problemTextGradient}>
                                        Здесь вы найдете проверенную информацию о проблеме.
                                    </p>
                                    <p className={styles.problemText}>
                                        Консультативные услуги оказываются практикующими врачами, компетентными специалистами в данной области.
                                    </p>
                                </div>
                                <div className={styles.problemLeftBottom}>
                                    <h2 className={styles.problemName}>Семенова Елена Анатольевна</h2>
                                    <p className={styles.problemJop}>
                                        Руководитель Северо-Западного Центра лечения глютен-ассоциированных заболеваний
                                    </p>
                                </div>
                            </div>
                            <button className={styles.problemButton}>
                                <div className={styles.problemCircle}>
                                    <div className={styles.problemInnerCircle}>
                                        <img className={styles.problemPlayIcon} src={icons.playIcon} alt="playIcon" />
                                    </div>
                                </div>
                                <span>Смотреть видео</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles.creator1} id="creators"  style={{ backgroundImage: `url(${images.aboutUsBackground2Image})` }}>
                    <div className="container">
                        <div className={styles.creator1Middle}>
                            <img className={styles.creator1Img} src={images.aboutUsDoctor3Image} alt="aboutUsDoctor3Image" />
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorTitle}>Создатели</h2>
                                    <h2 className={styles.creatorName}>Ефремова Анастасия Юрьевна</h2>
                                </div>
                                <div className={styles.creator1Wrapper}>
                                    <p className={styles.creatorText}>
                                        Врач-лечебник, аспирант 1-ого года обучения по специализациям «Эпидемиология», «Гастроэнтерология».
                                    </p>
                                    <p className={styles.creatorText}>
                                        В 2024 году с отличием окончила лечебный факультет СЗГМУ им. И.И. Мечникова.
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        Директор ООО «ГАСТРОГЛЮТЕНИНФО».
                                    </p>
                                    <p className={styles.creatorText}>
                                        Участник рабочей группы по направлению<br/>«Глютен-ассоциированные заболевания» Общества гастроэнтерологов и гепатологов «Северо-Запад».
                                    </p>
                                    <p className={styles.creatorText}>
                                        Опыт научной деятельности 6 лет.
                                    </p>
                                    <p className={styles.creatorText}>
                                        <span>Основные направления научной деятельности: </span> изучение медицинских и социальных проблем больных целиакией, обусловленных необходимостью соблюдения безглютеновой диеты; совершенствование малоинвазивной диагностики и мониторинга целиакии, проблемы аутоиммунного гастрита;клинико-эпидемиологические особенности и выявление факторов риска целиакии.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.creator2} style={{ backgroundImage: `url(${images.aboutUsBackground3Image})` }}>
                    <div className="container">
                        <div className={styles.creator2Middle}>
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorName}>Семенова Елена Анатольевна</h2>
                                </div>
                                <div className={styles.creator2Wrapper}>
                                    <p className={styles.creatorText}>
                                        к.м.н., врач-гастроэнтеролог, диетолог; доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса Северо-Западного государственного медицинского университета им. И.И. Мечникова. Руководитель «Северо-Западного Центра лечения глютен-ассоциированных заболеваний».
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        Главный консультант. Научный руководитель проекта.
                                    </p>
                                    <p className={styles.creatorText}>
                                        Стаж научной деятельности 13 лет.
                                    </p>
                                </div>
                            </div>
                            <img className={styles.creator2Img} src={images.aboutUsDoctor4Image} alt="aboutUsDoctor4Image" />
                        </div>
                    </div>
                </section>

                <section className={styles.creator1}>
                    <div className="container">
                        <div className={styles.creator2Middle}>
                            <img className={styles.creator3Img} src={images.aboutUsDoctor5Image} alt="aboutUsDoctor5Image" />
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorName}>Шостка Анастасия Георгиевна</h2>
                                </div>
                                <div className={styles.creator2Wrapper}>
                                    <p className={styles.creatorText}>
                                        Врач-терапевт.
                                    </p>
                                    <p className={styles.creatorText}>
                                        В 2022 году с отличием окончила лечебный факультет СЗГМУ им. И.И. Мечникова.
                                    </p>
                                    <p className={styles.creatorText}>
                                        В 2024 году окончила ординатуру по специальности «Терапия» кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса СЗГМУ им. И.И. Мечникова.
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        Сотрудник «Северо-Западного Центра лечения глютен-ассоциированных заболеваний».
                                    </p>
                                    <p className={styles.creatorText}>
                                        Участник рабочей группы по направлению «Глютен-ассоциированные заболевания» Общества гастроэнтерологов и гепатологов «Северо-Запад».
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.volunteers} style={{ backgroundImage: `url(${images.aboutUsBackground7Image})` }}>
                    <div className="container">
                        <div className={styles.volunteersWrapper}>
                            <h2 className={styles.volunteersTitle}>Волонтеры</h2>
                            <div className={styles.volunteersItems}>
                                <div className={styles.volunteersItem}>
                                    <div className={styles.volunteersPerson}>
                                        <img src={images.aboutUsPerson1Image} alt="aboutUsPerson1Image" />
                                    </div>
                                    <div className={styles.volunteersInfo}>
                                        <h2 className={styles.volunteersName}>Ашуров Григорий Махмараджабович</h2>
                                        <p className={styles.volunteersText}>Студент лечебного факультета СЗГМУ им. И.И. Мечникова.</p>
                                        <p className={styles.volunteersText}>Ответственный за проведение социальных мероприятий.</p>
                                    </div>
                                </div>
                                <div className={styles.volunteersItem}>
                                    <div className={styles.volunteersPerson}>
                                        <img src={images.aboutUsPerson2Image} alt="aboutUsPerson2Image" />
                                    </div>
                                    <div className={styles.volunteersInfo}>
                                        <h2 className={styles.volunteersName}>Шушакова Мария Вадимовна</h2>
                                        <p className={styles.volunteersText}>Студентка лечебного факультета СЗГМУ им. И.И. Мечникова.</p>
                                        <p className={styles.volunteersText}>Ответственная за ассортимент БГ-продукции. Проведение социальных мероприятий.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.treatment} id="sz-clgaz">
                    <div className="container">
                        <div className={styles.treatmentWrapper}>
                            <div className={styles.treatmentTop}>
                                <div className={styles.treatmentTopWrapper}>
                                    <h2 className={styles.treatmentTitle}>Северо-Западный Центр лечения глютен-ассоциированных заболеваний</h2>
                                    <p className={styles.treatmentText}>
                                        С 2022 года на базе на базе кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса СЗГМУ им. И.И. Мечникова существует Северо-Западный Центр лечения глютен-ассоциированных заболеваний.
                                    </p>
                                </div>
                                <div className={styles.treatmentLogo}>
                                    <img src={icons.logoIcon} className={styles.treatmentLogoImg} alt="logoIcon" />
                                    <a href="/" className={styles.treatmentLogoTitle}>
                                        <span>ГАСТРОГЛЮТЕН.</span>ИНФО
                                    </a>
                                </div>
                            </div>
                            <div className={styles.treatmentItems}>
                                <div className={styles.treatmentItem}>
                                    <h2 className={styles.treatmentItemTitle}>Основные направления деятельности:</h2>
                                    <ul className={styles.treatmentListItems}>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Прием амбулаторных пациентов с глютен-ассоциированными заболеваниями;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Консультация родственников пациентов;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Ведение «Северо-Западного регистра больных глютен-ассоциированными заболеваниями»;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Проведение научно-практических и информационно-образовательных мероприятий для консультантов и пациентов;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Проведение и организация НИР по научным направлениям центра.
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.treatmentItem}>
                                    <h2 className={styles.treatmentItemTitle}>Центр оказывает консультативную помощь пациентам со следующими заболеваниями:</h2>
                                    <ul className={styles.treatmentListItems}>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Целиакия;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Нецелиакийная чувствительность к глютену;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Аллергические глютен-опосредованные реакции;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Герпетиформный дерматит, глютеновая атаксия, репродуктивные нарушения и другие внекишечные проявления непереносимости глютена;
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> Лицам с генетической предрасположенностьюк целиакии.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.location}>
                    <div className="container">
                        <div className={styles.locationMiddle}>
                            <div className={styles.locationLeft}>
                                <h2 className={styles.locationTitle}>Прием ведут опытные гастроэнтерологи и диетологи кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологиии им. С.М. Рысса.</h2>
                                <div className={styles.locationWrapper}>
                                    <a href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1" className={styles.locationText}><span>Адрес центра:</span> Санкт-Петербург, пр. Пискаревский д. 47, корп. 24, 2 этаж, кафедра пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса.</a>
                                    <p className={styles.locationText}><span>Часы работы:</span> пн-пт, с 10:00 до 17:00.</p>
                                    <p className={styles.locationText}><span>Руководитель Центра</span> к.м.н., доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса, Семенова Елена Анатольевна.</p>
                                </div>
                            </div>
                            <div className={styles.locationRight}>
                                <a href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1">
                                    <img src={images.aboutUsLocationCartImage} alt="aboutUsLocationCartImage" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.documents} id="#documents" style={{ backgroundImage: `url(${images.aboutUsBackground5Image})` }}>
                    <div className="container">
                        <div className={styles.documentsWrapper}>
                            <h2 className={styles.documentsTitle}>Документы</h2>
                            <div className={styles.documentsItems}>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">Согласие на обработку персональных данных</a></span>
                                </div>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">Политика конфиденциальностии обработки персональных данных</a></span>
                                </div>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">Информация об организации</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.partners} id="partners">
                    <div className="container">
                        <div className={styles.partnersWrapper}>
                            <h2 className={styles.partnersTitle}>Партнеры</h2>
                            <table className={styles.partnersItems}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.universityIcon} alt="universityIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>Северо-Западный государственный медицинский университет им. И.И. Мечникова</p>
                                                    <p className={styles.partnersLink}>Сайт: <a href="https://szgmu.ru/rus/">https://szgmu.ru/rus/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.melonIcon} alt="melonIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>ООО «Мелон» - эксклюзивный дистрибьютор Biohit</p>
                                                    <p className={styles.partnersLink}>Сайт: <a href="https://melonbio.ru/">https://melonbio.ru/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.societyIcon} alt="societyIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>Общество гастроэнтерологов и гепатологов «Северо-Запад»</p>
                                                    <p className={styles.partnersLink}>Сайт: <a href="https://gastro-gepa.ru/">https://gastro-gepa.ru/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </>
    );
}
