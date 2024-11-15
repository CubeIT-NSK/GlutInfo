import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function WinterSchoolPagePage() {

    return (
            <>
                <SideLink />

                <section className={styles.winterSchoolSection}>
                    <div className="container">
                        <div className={styles.winterSchoolWrapper}>
                            <div className={styles.winterSchoolHeader}>
                                <h2 className={styles.winterSchoolTitle}>VII Всероссийская научно-практическая конференция с международным участием «Зимняя школа воспалительных заболеваний кишечника»</h2>
                                <h2 className={styles.winterSchoolTitleOrange}>Экспертный мастер-класс</h2>
                            </div>
                            <div className={styles.winterSchoolTextCol}>
                                <h2>Организаторы мероприятия</h2>
                                <p><span className={styles.winterSchoolTextColOrange}>—</span> Северо-Западный государственный медицинский университет имени И. И. Мечникова и Общество гастроэнтерологов и гепатологов «Северо-Запад».</p>
                            </div>
                            <div className={styles.winterSchoolTextCol}>
                                <h2>Председатель оргкомитета</h2>
                                <p><span className={styles.winterSchoolTextColOrange}>—</span> Игорь Геннадьевич Бакулин, доктор медицинских наук, профессор, заведующий кафедрой пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С. М. Рысса СЗГМУ им. И. И. Мечникова.</p>
                                <p>К участию в работе Конференции приглашаются специалисты различных специальностей: терапевты, гастроэнтерологи, врачи общей практики, педиатры, эндоскописты, ревматологи, хирурги и др.</p>
                            </div>
                            <div className={styles.winterSchoolTextCol}>
                                <h2>В рамках Конференции пройдет конкурс постерных докладов</h2>
                                <p>К участию в конкурсе приглашаются врачи всех специальностей, ординаторы, аспиранты, студенты.</p>
                                <p>Электронные постерные доклады принимаются <span className={styles.winterSchoolTextColBlack}>до 20 февраля</span> включительно по электронной почте <a className={styles.winterSchoolMail} href="mailo:info@gastro-gepa.ru">info@gastro-gepa.ru</a></p>
                                <p>С правилами оформления работ можно ознакомиться <a href="#" className={styles.winterSchoolLinkOrange}>здесь</a></p>
                                <p><span className={styles.winterSchoolTextColBlack}>Мероприятие соответствует требованиям для НМО (5 кредитов)</span></p>
                            </div>
                            <div className={styles.winterSchoolTextCol}>
                                <p><span className={styles.winterSchoolTextColBlack}>Целевая аудитория:</span>гастроэнтерология, диетология, Лечебное дело, общая врачебная практика (семейная медицина), терапия, эндоскопия.</p>
                                <p><span className={styles.winterSchoolTextColOrange}>Участие в мероприятии бесплатное.</span></p>
                                <p>Для регистрации в очном формате направьте на электронную почту <a className={styles.winterSchoolMail} href="mailo:info@gastro-gepa.ru">info@gastro-gepa.ru</a> информацию: ФИО, место работы/специализация, телефон.</p>
                            </div>
                            <div className={styles.winterSchoolTextCol}>
                                <h2>Методы учета присутствия:</h2>
                                <p><span className={styles.winterSchoolTextColBlack}>Онлайн слушатели: </span>предварительная регистрация (ФИО, телефон, эл. почта, город); подтверждение присутствия посредством нажатия на всплывающий баннер 1 раз в 45 мин.; минимальный порог присутствия — 225 минут научно-образовательной части Программы, Спонсорские лекции не учитываются. Периодический контроль осуществляется посредством всплывающего баннера 1 раз в 45 мин., в хаотичном порядке, общее количество нажатий составляет 9 раз; минимальное количество нажатий составляет 6 раз;</p>
                                <p><span className={styles.winterSchoolTextColBlack}>Очные слушатели:</span> ручная запись на стойке регистрации. Учет времени присутствия осуществляется посредством фиксирования времени выдачи/сдачи бейджей участников.</p>
                                <p><span className={styles.winterSchoolTextColBlack}>Служба технической поддержки конференции:</span> <a className={styles.winterSchoolMail2} href="mailo:info@gastro-gepa.ru">info@gastro-gepa.ru</a>, <a className={styles.winterSchoolTel} href="tel:+79312308875">+79312308875</a></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.winterSchoolSection}>
                    <div className="container">
                        <div className={styles.winterSchoolPartnersWrapper}>
                            <div className={styles.winterSchoolPartnersInfCont}>
                                <h2 className={styles.winterSchoolPartnersTitle}>Информационные партнеры</h2>
                                <div className={styles.winterSchoolPartnersInf}>
                                    <img src={images.winterSchoolLvrachImage} alt="winterSchoolLvrachImage" />
                                    <img src={images.winterSchoolSponsPhysicianImage} alt="winterSchoolSponsPhysicianImage" />
                                </div>
                            </div>
                            <div className={styles.winterSchoolPartners}>
                                <h2 className={styles.winterSchoolPartnersTitle}>Партнеры Конференции</h2>
                                <div className={styles.winterSchoolPartners}>
                                    <div className={styles.winterSchoolPartnersTop}>
                                        <img src={images.winterSchoolSponsJanssenImage} alt="winterSchoolSponsJanssenImage" />
                                        <img src={images.winterSchoolSponsValentaImage} alt="winterSchoolSponsValentaImage" />
                                        <img src={images.winterSchoolSponsSunImage} alt="winterSchoolSponsSunImage" />
                                        <img src={images.winterSchoolSponsRocsImage} alt="winterSchoolSponsRocsImage" />
                                    </div>
                                    <div className={styles.winterSchoolPartnersBottom}>
                                        <img src={images.winterSchoolSponsDvfImage} alt="winterSchoolSponsDvfImage" />
                                        <img src={images.winterSchoolSponsBiocodexImage} alt="winterSchoolSponsBiocodexImage" />
                                        <img src={images.winterSchoolSponsMateriaImage} alt="winterSchoolSponsMateriaImage" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
