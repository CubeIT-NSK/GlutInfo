import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";
import icons from "../../../shared/resources/icon";

export default function GlutenAssociatedPage() {

    return (
            <>
                <SideLink />

                <section className={styles.glutenAssociatedSection}>
                    <div className="container">
                        <div className={styles.glutenAssociatedWrapper}>
                            <div className={styles.glutenAssociatedTop}>
                                <div className={styles.glutenAssociatedTopBlock}>
                                    <div className={styles.glutenAssociatedTopBlockEl}> <img src={icons.glutFrameIcon} alt="glutFrameImage" />
                                        <p> <span>Глютен-ассоциированные заболевания</span> — это группа <br /> заболеваний, связанных с употреблением глютена. </p>
                                    </div>
                                </div>
                                <div className={styles.glutenAssociatedTopCol}>
                                    <p>В зависимости от ведущего механизма патогенеза реакции на глютен разделяютна три основные группы:</p>
                                </div>
                            </div>
                            <div className={styles.glutenAssociatedBottom}>
                                <img src={images.backLinesImage} className={styles.backLinesImage} alt="backLinesImage" />
                                <div className={styles.glutenAssociatedBottomCol}>
                                    <p><span>Аутоиммунные:</span> целиакия, герпетиформный дерматит, глютеновая атаксия.</p>
                                    <p><span>Аллергические:</span> аллергия на пшеницу.</p>
                                    <p className={styles.glutenAssociatedBottomP}><span>Неаллергические/неаутоиммунные:</span> чувствительность к глютену, не связанная с целиакией.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.glutenAssociatedTriangleSection} style={{ backgroundImage: `url(${images.glutenAssociatedBackGroundImage})` }}>
                    <div className="container">
                        <div className={styles.glutenAssociatedTriangleWrapper}>
                            <div className={styles.glutenAssociatedTriangle} style={{ backgroundImage: `url(${icons.triangleIcon})` }}>
                                <div className={styles.glutenAssociatedTriangleBlock}>
                                    <h2>Аутоиммунные / Autoimmune:</h2>
                                    <ul>
                                        <li><span>1. Целиакия</span> / Celiac disease</li>
                                        <li><span>2. Герпетиформный дерматит</span> /Herpetiform dermatitis</li>
                                        <li><span>3. Глютеновая атаксия</span>/Gluten ataxia</li>
                                    </ul>
                                </div>
                                <div className={styles.glutenAssociatedTriangleBlocks}>
                                    <div className={styles.glutenAssociatedTriangleBlockGray}>
                                        <p>Глютен-ассоциированные заболевания (ГАЗ) / Gluten-associated deseases</p>
                                    </div>
                                    <div className={styles.glutenAssociatedTriangleBlock}>
                                        <h2>Аллергические / Allergic:</h2>
                                        <ul>
                                            <li><span>1. Пищевая аллергия не-IgE-опосредованная</span> / Food allergy non-IgE-mediared</li>
                                            <li><span>2. Аллергия на пшеницу, опосредованная IgE</span> / IgE-mediated wheat allergy</li>
                                            <li><span>3. Зависимая от употребления пшеницы анафилаксия, вызванная физической нагрузкой (WDEIA)</span> / Wheat-dependent exercise-induced anaphylaxis (WDEIA)</li>
                                            <li><span>4. Контактный дерматит</span> / Contact dermatitis</li>
                                            <li><span>5. Астма пекаря, ринит</span> / Baker’s asthma, rhinitis</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.glutenAssociatedTriangleBlock}>
                                    <h2>С неуточненным механизмом / Mechanism is unknow:</h2>
                                    <ul>
                                        <li><span>1. Нецелиакийная чувствительность к глютену</span> / Non-Celiac Gluten Sensitivity</li>
                                        <li><span>2. Диарейный синдром, индуцированный приемом глютена</span> / Gluten-induced dearrhea</li>
                                        <li><span>3. Эозинофильный эзофагит</span> / Eosinophilic esophagitis</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.glutenAssociatedTriangleBottom}>
                                <p>[Бакулин И.Г., Авалуева Е.Б., Хавкин А.И., Ситкин С.И., Серкова М.Ю., Орешко Л.С., Лапинский И.В. Глютен-ассоциированные заболевания: современные представления о проблеме. Часть 1. Вопросы практической педиатрии. 2021; 16(6): 103–110]</p>
                                <p><span>Более подробно о каждом заболевании написано в разделах, посвященных им.</span></p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
