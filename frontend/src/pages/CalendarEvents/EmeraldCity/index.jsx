import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function EmeraldCityPage() {

    return (
            <>
                <SideLink />
                <section className={styles.emeraldSection}>
                    <div className="container">
                        <div className={styles.emeraldWrapper}>
                            <div className={styles.emeraldHeader}>
                                <h2 className={styles.emeraldTitle}>Участие в мастер-классе</h2>
                                <p>«Волшебники Изумрудного города или мультидисциплинарный подход к заболеваниям кишечника»</p>
                            </div>
                            <div className={styles.emeraldMain}>
                                <div className={styles.emeraldMainHead}>
                                    <img src={images.researchesProjectsDoctorImage} alt="researchesProjectsDoctorImage" />
                                    <p>Программный комитет:</p>
                                </div>
                                <ul className={styles.emeraldMainList}>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Бакулин Игорь Геннадьевич</span> - заведующий кафедрой пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, главный внештатный специалист-терапевт СЗФО РФ, главный внештатный специалист-гастроэнтеролог Ленинградской области, президент Общества гастроэнтерологов и гепатологов «Северо-Запад», заслуженный врач РФ, д.м.н., профессор, Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Бакулина Наталья Валерьевна</span> - проректор по науке и инновационной деятельности, заведующий кафедрой внутренних болезней, нефрологии, общей и клинической фармакологии с курсом фармации ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, д.м.н., профессор, Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Белоусов Александр Михайлович</span> - заместитель директора по медицинской части (хирургия и онкология), врач-хирург, онколог Клиники высоких медицинских технологийим. Н.И. Пирогова СПбГУ, к.м.н., Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Воробьев Сергей Леонидович</span> - директор Национального центра клинической морфологической диагностики, врач высшей профессиональной категории, вице-президент Российского общества онкопатологов, к.м.н., Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Вохмянина Наталья Васильевна</span> - профессор кафедры клинической лабораторной диагностики, биологической и общей химии им. В.В. Соколовского ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, д.м.н., профессор, Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Захаренко Сергей Михайлович</span> - заместитель директора ФГБУ «Детский научно-клинический центр инфекционных болезней ФМБА России», к.м.н., доцент, Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Немцова Елена Геннадьевна</span> - доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, к.м.н., Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Печеникова Виктория Анатольевна</span> - заведующий гинекологическим отделением № 1 клиники имени Петра Великого, профессор кафедры акушерства и гинекологии ФГБОУ ВО СЗГМУ им. И.И. Мечникова, д.м.н., профессор, Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Семенова Елена Анатольевна</span> - доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, к.м.н., Санкт-Петербург</li>
                                    <li><span className={styles.emeraldMainListOrange}>—</span> <span className={styles.emeraldMainListBlack}>Сказываева Екатерина Васильевна</span> - доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. С.М. Рысса ФГБОУ ВО СЗГМУ им. И.И. Мечникова Минздрава России, к.м.н., доцент, Санкт-Петербург</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
