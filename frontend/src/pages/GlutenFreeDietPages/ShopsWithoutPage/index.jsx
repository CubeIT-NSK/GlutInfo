import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import Button from "../../../shared/components/Buttons";
import SideLink from "../../../shared/components/SideLink";

export default function ShopsWithoutPage() {

    return (
            <>
                <SideLink />
                <section className={styles.shopsWithoutHeaderSection}>
                    <div className="container">
                        <div className={styles.shopsWithout}>
                            <div className={styles.shopsWithoutWrapper}>
                                <div className={styles.shopsWithoutLeft}>
                                    <div className={styles.shopsWithoutLeftTitle}>
                                        <h2>Магазины, где представлена безглютеновая продукция</h2>
                                        <div className={styles.shopsWithoutLeftText}>
                                            <p>Безглютеновые продукты становятся все более популярными. Их можно найти в супермаркетах, магазинах здорового питания и онлайн. Это удобно для людей с непереносимостью глютена и тех, кто следит за своим питанием. Разнообразие безглютеновых товаров позволяет легко включить их в рацион.</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="gradient"
                                        padding="22.5px 108.5px"
                                    >
                                        Показать места на карте
                                    </Button>
                                </div>
                                <div className={styles.shopsWithoutRight}>
                                    <img src={images.shopsWithout1Image} alt="shopsWithout1Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.shopsWithoutSection}>
                    <div className="container">
                        <div className={styles.shopsWithout}>
                            <div className={styles.shopsWithoutWrapperReverse}>
                                <div className={styles.shopsWithoutLeft}>
                                    <div className={styles.shopsWithoutLeftTitle}>
                                        <h2>Азбука Вкуса</h2>
                                        <div className={styles.shopsWithoutLeftText}>
                                            <p>«Азбука Вкуса» предлагает широкий ассортимент безглютеновых продуктов, включая хлеб, закуски, крупы, макароны и муку. В их ассортименте можно найти качественные товары от проверенных производителей, что важно для людей с непереносимостью глютена.</p>
                                        </div>
                                    </div>
                                    <div className={styles.shopsWithoutLists}>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>4,3</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>Адрес</h3>
                                                <p>Боткинская ул., 1, Санкт-Петербург<br />Киевская ул. 5, корп. 7, Санкт-Петербург</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.callWIcon} alt="callWIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>Контакты</h3>
                                                <p><a href="tel:+78007003487">+7 (800) 700-34-87</a>, <span><a href="www.av.ru">www.av.ru</a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.shopsWithoutRight}>
                                    <img src={images.shopsWithout2Image} alt="shopsWithout2Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.shopsWithoutSection}>
                    <div className="container">
                        <div className={styles.shopsWithout}>
                            <div className={styles.shopsWithoutWrapper}>
                                <div className={styles.shopsWithoutLeft}>
                                    <div className={styles.shopsWithoutLeftTitle}>
                                        <h2>Хлебушек</h2>
                                        <div className={styles.shopsWithoutLeftText}>
                                            <p>«Хлебушек» — это уютное место, где можно не только насладиться ароматным кофе, но и попробовать разнообразные безглютеновые продукты. В их ассортименте представлены свежие безглютеновые хлеба, выпечка и закуски, которые порадуют даже самых взыскательных клиентов.</p>
                                        </div>
                                    </div>
                                    <div className={styles.shopsWithoutLists}>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>4,7</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>Адрес</h3>
                                                <p>ул. Всеволода Боброва, 25, Сестрорецк</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithoutList}>
                                            <img src={icons.callWIcon} alt="callWIcon" />
                                            <div className={styles.shopsWithoutListTText}>
                                                <h3>Контакты</h3>
                                                <p><a href="tel:+79213876399">+7 (921) 387-63-99</a>, <span><a href="www.hlebushekkurort.ru">www.hlebushekkurort.ru</a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.shopsWithoutRight}>
                                    <img src={images.shopsWithout3Image} alt="shopsWithout3Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
