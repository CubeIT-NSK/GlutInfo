import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import SideLink from "../../../shared/components/SideLink";
import icons from "../../../shared/resources/icon";

export default function CeliacPage() {

    return (
            <>
                <SideLink />

                <section className={styles.celiacSection}>
                    <div className="container">
                        <div className={styles.celiacWrapper}>
                            <div className={styles.celiacBlock}>
                                <div className={styles.celiacBlockEl}> <img src={icons.glutFrameIcon} alt="glutFrameImage" />
                                    <p><span>Целиакия</span> — это хроническое аутоиммунное заболевание, поражающее двенадцатиперстную кишку, развивающееся у генетически предрасположенных людей, которое обусловлено непереносимостью глютена, растительного белка, содержащегося в злаковых культурах.</p>
                                </div>
                            </div>
                            <div className={styles.celiacText}>
                                <p>При поступлении глютена в организм таких людей запускается каскад патологических процессов, конечным результатом которого является <span>атрофия</span> (утрата) <span>ворсинок</span>, которыми в норме покрыта двенадцатиперстная кишка.</p>
                                <p><span>Атрофия ворсин</span> в свою очередь и <span>определяет симптомы заболевания</span>, что связано с невозможностью нормального осуществления пищеварительных процессов и всасывания необходимых микро- и макроэлементов.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.celiacSectionBanner1} style={{ backgroundImage: `url(${images.celiacBackground1Image})` }}>
                    <div className="container">
                        <div className={styles.celiacWrapper}>
                            <div className={styles.celiacContain}>
                                <img src={images.celiac1Image} alt="celiac1Image" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.celiacSection}>
                    <div className="container">
                        <div className={styles.celiacWrapper}>
                            <div className={styles.celiacBlock}>
                                <div className={styles.celiacBlockEl}> <img src={icons.glutFrameIcon} alt="glutFrameImage" />
                                    <p>Чтобы лучше представлять и понимать, что происходит в организме при целиакии, расскажем немного подробнее о цепочке патологического процесса и сопоставим эти процессы с диагностическими (лабораторными и инструментальными) критериями целиакии.</p>
                                </div>
                            </div>
                            <div className={styles.celiacText}>
                                <p>Как уже и было отмечено ранее, целиакия развивается только у генетически предрасположенных людей, то есть имеющих в своём генетическом наборе гаплотипы <span>HLA</span> (человеческие лейкоцитарные антигены) <span>DQ2, DQ8, DQ7,</span> которые находятся на поверхности только некоторых клеток иммунной системы, в основном это лейкоциты и макрофаги. Наличие данных гаплотипов определяется лабораторно при помощи генетического типирования.</p>
                                <p>Глютен при попадании в организм подвергается расщеплению кишечными ферментами до глиадина, являющегося наиболее иммуногенным, и глютенина.</p>
                            </div>
                        </div>
                    </div>

                </section>
                <section className={styles.celiacSectionBanner2} style={{ backgroundImage: `url(${images.celiacBackground2Image})` }}>
                    <div className="container">
                        <div className={styles.celiacWrapper}>
                            <div className={styles.celiacContain}>
                                <img src={images.celiac2Image} alt="celiac2Image" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.celiacOtherSection}>
                    <div className="container">
                        <div className={styles.celiacOtherWrapper}>
                            <div className={styles.celiacBlock2}>
                                <div className={styles.celiacBlockEl2}> <img src={icons.glutFrameIcon} alt="glutFrameImage" />
                                    <p>Глиадин проникает в собственную пластинку слизистой оболочки двенадцатиперстной кишки через <span>межэнтероцитарные промежутки</span> (пространство между кишечными клетками – энтероцитами) и стимулирует энтероциты к выработке специальных воспалительных веществ – интерлейкина-15 (цитокин), который в свою очередь активирует <span>иммунные клетки (интраэпителиальные лимфоциты)</span>.</p>
                                </div>
                            </div>
                            <div className={styles.celiacText}>
                                <p>Инраэпителиальные лимфоциты, начинают уничтожать энтероциты, что ведет к повреждению плотных контактов эпителиального барьера и приводит к повышению проницаемости кишки для различных фракций глютена в собственную пластинку слизистой оболочки. В результате повреждения энтероцитов в собственной пластинке слизистой оболочки выделяется фермент <span>трансглутаминаза</span>, который связывается с глиадином и изменяя его структуру (происходит дезаминирование).</p>
                                <p>Антигенпрезентирующие клетки, ответственные за иммунную реакцию, на поверхности которых как раз и находятся HLA-DQ2/DQ8/DQ7, поглощают те самые трансформированные молекулы глиадина и «представляют» их другим иммунным клеткам – Т-хелперам. Те в свою очередь активируют следующие иммунные клетки: Т-киллеры, которые непосредственно сами разрушают энтероциты, и В-лимфоциты, которые ответственны за выработку антител, что лабораторно и подтверждается появлением высокого уровня специфических <span>антител к глиадину, к тканевой трансглутаминазе.</span></p>
                                <p>Результатом таких сложных ступенчатых процессов является <span>хронический воспалительный процесс</span>, который и приводит к <span>атрофии ворсинок энтероцитов</span> расположенных в двенадцатиперстной кишке, которую можно определить при <span>гистологической оценке биопсии</span>, которую выполняют при проведении гастроскопии (ЭГДС).</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.celiacSymptomsSection} style={{ backgroundImage: `url(${images.celiacBackground3Image})` }}>
                    <div className="container">
                        <div className={styles.celiacSymptomsWrapper}>
                            <div className={styles.celiacSymptomsTitle}>
                                <h2>Как проявляется целиакия?</h2>
                                <p>Можно выделить симптомы со стороны кишечника – <span>кишечные проявления</span>, и симптомы со стороны других органов – <span>внекишеные проявления.</span></p>
                            </div>
                            <div className={styles.celiacSymptomsPoint}>
                                <img src={images.celiac1PointImage} alt="celiac1PointImage" />
                            </div>
                            <div className={styles.celiacSymptomsText}>
                                <p>К <span className={styles.celiacSymptomsBlack}>кишечным</span> проявлениям относят болевой абдоминальный синдром, тошнота, рвота, нарушение аппетита, нарушение консистенции и объема стула, метеоризм, вздутие, урчание.</p>
                                <p><span className={styles.celiacSymptomsOrangeBold}>Синдром диареи</span> - диарея с полифекалией и стеатореей, развитием синдрома нарушенного всасывания различной степени тяжести. Выраженные боли в животе не характерны, однако могут наблюдаться тупые боли разлитого характера во всех отделах живота, связанные с вздутием.</p>
                                <p>Нередко наблюдаются <span className={styles.celiacSymptomsOrange}>стойкие запоры</span>, которые сопровождаются интермиттирующими болями в животе, метеоризмом, урчанием, чувством неполного опорожнения кишечника, отхождением большого количества неоформленных каловых масс.</p>
                            </div>
                            <div className={styles.celiacSymptomsImg}>
                                <img src={images.celiac3Image} alt="celiac3Image" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.celiacSectionPoint}>
                    <div className="container">
                        <div className={styles.celiacPointWrapper}>
                            <div className={styles.celiacPoint}>
                                <img src={images.celiac2PointImage} alt="celiac2PointImage" />
                            </div>
                            <div className={styles.celiacPointText}>
                                <p>К <span>внекишечным</span> проявлениям относят клинические симптомы, обусловленные нарушением всасывания питательных веществ и системным аутоиммунным процессом.</p>
                            </div>
                            <div className={styles.celiacPointList}>
                                <div className={styles.celiacPointListCol}>
                                    <h2>01</h2>
                                    <p><span>Поражения кожи:</span> герпетиформный и буллезный дерматит, псориаз, атопический нейродермит, алопеция, угревая болезнь, которые носят хронический рецидивирующий характер.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>02</h2>
                                    <p><span>Железодефицитная или В12 дефицитная анемия.</span></p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>03</h2>
                                    <p><span>Нарушения в эндокринной системе: </span>часто наблюдается аутоиммунный тиреоидит.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>04</h2>
                                    <p>Синдром мальабсорбции и нарушения метаболизма витамина D лежат в основе <span>нарушений костного метаболизма</span> (остеопения, остеопороз, остеомаляция), клинически проявляющегося болевым синдромом, деформацией и спонтанными переломами костей, некариозными поражениями зубов, гипоплазией эмали зубов системного характера, скученностью и дистопией зубного ряда.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>05</h2>
                                    <p><span>Репродуктивные расстройства:</span> бесплодие, спонтанные аборты, привычное невынашивание беременности у женщин, вторичное бесплодие у мужчин, гипо- или аменорея.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>06</h2>
                                    <p><span>Нарушение белкового обмена:</span> потеря массы тела, гипопротеинемия, гипопротеинемические отеки.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>07</h2>
                                    <p><span>Неврологические проявления:</span> головные боли, мигрени, нарушения сна, повторные эпизоды судорог; эпилепсия, полинейропатия, атаксия.</p>
                                </div>
                                <div className={styles.celiacPointListCol}>
                                    <h2>08</h2>
                                    <p><span>Аллергические и псевдоаллергические проявления:</span> пищевая непереносимость продуктов, лекарственных средств, респираторная аллергия, бронхиальная астма, холодовая, холинергическая и нервная крапивница.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
