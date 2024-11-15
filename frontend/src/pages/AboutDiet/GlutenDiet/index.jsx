import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";

export default function GlutenDietPage() {

    return (
        <>
            <SideLink />
            <section className={styles.glutenDietSection}>
                <div className="container">
                    <div className={styles.glutenDietWrapper}>
                        <div className={styles.glutenDietText}>
                            <h2>Безглютеновая диета</h2>
                            <div className={styles.glutenDietMainCol}>
                                <p>В основе диетотерапии лежит <span className={styles.glutenDietTextOrange}>полное исключение</span> из рациона питания продуктов, содержащих глютен или его следы.</p>
                                <p>Крайне важным является отказ от употребления не только тех продуктов, которые содержат «явный» глютен, но и тех, которые содержат «скрытый» глютен, который используется в качестве пищевой добавки в процессе производства.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.glutenDietExplicitSection} style={{ backgroundImage: `url(${images.dietBackgroundImage})` }}>
                <div className="container">
                    <div className={styles.glutenDietWrapper}>
                        <div className={styles.glutenDietText}>
                            <h3>Где содержится «явный» глютен?</h3>
                            <div className={styles.glutenDietCol}>
                                <p>К продуктам, содержащим «явный» глютен относят продукты содержащие такие злаки, как пшеница, рожь, ячмень, овес. Следует исключить все хлебобулочные продукты сожерщащие данные культуры.</p>
                            </div>
                            <ul>
                                <li><span className={styles.glutenDietTextOrange}>—</span> <span className={styles.glutenDietTextBlack}>Крупы, каши, мука пшеницы:</span> Манная, пшеничная, «Артек», «Полтавская», «4 злака», «7 злаков», кускус, булгур, спельта, полба, отруби</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> <span className={styles.glutenDietTextBlack}>Крупы, каши, мука ржи:</span> ржаная</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> <span className={styles.glutenDietTextBlack}>Крупы, каши, мука ячменя:</span> ячменная, перловая, ячневая</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> <span className={styles.glutenDietTextBlack}>Крупы, каши, мука овса:</span> овсяная, «Геркулес», «Спортивная», толокно</li>
                            </ul>
                            <div className={styles.glutenDietColMini}>
                                <p>В настоящее время остаются открытым вопрос токсичности овса для пациентов с целиакией. Считается, что авенины овса не токсичны, однако овсяная крупа часто «заражена» примесями других злаков, в частности пшеницы, в связи с чем рекомендуется исключение овса из употребления.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.glutenDietImageSection}>
                <div className="container">
                    <div className={styles.glutenDietImageWrapper}>
                        <img src={images.diet1Image} alt="diet1Image" />
                    </div>
                </div>
            </section>

            <section className={styles.glutenDietHiddenSection} style={{ backgroundImage: `url(${images.dietBackgroundImage})` }}>
                <div className="container">
                    <div className={styles.glutenDietWrapper}>
                        <div className={styles.glutenDietText}>
                            <h3>Что относится к «скрытому» глютену?</h3>
                            <div className={styles.glutenDietCol}>
                                <p>К продуктам, содержащим «скрытый» глютен относят:</p>
                            </div>
                            <ul>
                                <li><span className={styles.glutenDietTextOrange}>—</span> вареные колбасы, сосиски, полуфабрикаты из измельченного мяса и рыбы;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> многие мясные, рыбные консервы;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> многие овощные и фруктовые консервы, в т.ч. томатные пасты, кетчупы;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> некоторые сорта мороженого, йогуртов, творожные сырки и пасты, мягкие и плавленые сыры;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> маргарины с глютен содержащими стабилизаторами;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> некоторые виды уксусов и салатных соусов, майонезов; соевые соусы;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> многокомпонентные сухие приправы и пряности;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> концентрированные сухие супы, бульонные кубики, картофельное пюре быстрого приготовления;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> картофельные и кукурузные чипсы, замороженный картофель  «фри»;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> некоторые виды чая, кофе и какао-смеси для быстрого приготовления (быстрорастворимые);</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> кукурузные хлопья при использовании ячменной патоки;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> имитации морепродуктов - «крабовые палочки», «крабовое мясо»;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> карамель, соевые и шоколадные конфеты с начинкой, восточные сладости, повидло промышленного производства;</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> некоторые пищевые добавки (краситель аннато Е-160b, карамельные красители Е-150а - Е-150d, мальтол Е-636, изомальтол Е-953, мальтит и мальтитный сироп Е-965);</li>
                                <li><span className={styles.glutenDietTextOrange}>—</span> квас, пиво.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.glutenDietImageSection2}>
                <div className="container">
                    <div className={styles.glutenDietImageWrapper}>
                        <img src={images.diet2Image} alt="diet2Image" />
                    </div>
                </div>
            </section>

            <section className={styles.glutenDietNonToxicSection} style={{ backgroundImage: `url(${images.dietBackgroundImage})` }}>
                <div className="container">
                    <div className={styles.glutenDietWrapper}>
                        <div className={styles.glutenDietText}>
                            <h4>Нетоксичными злаками при целиакии являются:</h4>
                            <div className={styles.glutenDietStructureList}>
                                <ul>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> рис;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> гречка;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> кукуруза;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> пшено;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> амарант;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> киноа;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> монтина;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> чумиза;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> саго;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> сорго;</li>
                                    <li><span className={styles.glutenDietTextOrange}>—</span> тэфф;</li>
                                </ul>
                                <div className={styles.glutenDietCol}>
                                    <p>Данные крупы являются <span className={styles.glutenDietTextOrange}>нетоксичными для пациентов с глютен-ассоциированными заболеваниями</span> при условии отсутствия загрязнения (контаминации) их глютеном в процессе сбора урожая, транспортировки, складирования и переработки.</p>
                                    <p><span className={styles.glutenDietTextBlack}>Безопасными</span> являются мука и крахмалы, приготовленные из корнеплодов: картофеля, маниоки, тапиоки, батата, бобовых: бобов, фасоли, гороха, сои, различных орехов.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
