import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import Button from "../../../shared/components/Buttons";
import SideLink from "../../../shared/components/SideLink";

export default function RestaurantsPage() {

    return (
            <>
                <SideLink />

                <section className={styles.restaurantsHeaderSection}>
                    <div className="container">
                        <div className={styles.restaurants}>
                            <div className={styles.restaurantsWrapper}>
                                <div className={styles.restaurantsLeft}>
                                    <div className={styles.restaurantsLeftTitle}>
                                        <h2>Рестораны и кафе с безглютеновым меню</h2>
                                        <div className={styles.restaurantsLeftText}>
                                            <p>Посещение ресторанов с пищевыми аллергиями может быть сложной задачей. Однако в Санкт-Петербурге есть множество заведений, где можно вкусно поесть, не опасаясь за своё здоровье.</p>
                                            <p>Мы подготовили список ресторанов, предлагающих безопасные и вкусные блюда, в том числе безглютеновые</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="gradient"
                                        padding="22.5px 108.5px"
                                    >
                                        Показать места на карте
                                    </Button>
                                </div>
                                <div className={styles.restaurantsRight}>
                                    <img src={images.restaurants1Image} alt="restaurants1Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.restaurantsSection}>
                    <div className="container">
                        <div className={styles.restaurants}>
                            <div className={styles.restaurantsWrapperReverse}>
                                <div className={styles.restaurantsLeft}>
                                    <div className={styles.restaurantsLeftTitle}>
                                        <h2>Мит Стар</h2>
                                        <div className={styles.restaurantsLeftText}>
                                            <p>Кафе «Мит Стар» предлагает своим гостям широкий выбор мясных блюд, приготовленных по традиционным рецептам, а также бизнес-ланчи, которые можно заказать в будние дни.</p>
                                        </div>
                                    </div>
                                    <div className={styles.restaurantsLists}>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>4,6</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>Адрес</h3>
                                                <p>Боткинская ул., 1, Санкт-Петербург.Киевская ул., 5, корп. 7, Санкт-Петербург</p>
                                            </div>
                                        </div>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.callWIcon} alt="callWIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>Контакты</h3>
                                                <p><a href="tel:+78127406959">+7 (812) 740-69-59</a>, <span><a href="www.cafemeatstar.ru">www.cafemeatstar.ru</a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.restaurantsRight}>
                                    <img src={images.restaurants2Image} alt="restaurants2Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.restaurantsSection}>
                    <div className="container">
                        <div className={styles.restaurants}>
                            <div className={styles.restaurantsWrapper}>
                                <div className={styles.restaurantsLeft}>
                                    <div className={styles.restaurantsLeftTitle}>
                                        <h2>Шоколад</h2>
                                        <div className={styles.restaurantsLeftText}>
                                            <p>«Шоколад» — это уютная кофейня, расположенная в живописном месте, окруженном деревьями. Здесь вы можете насладиться ароматным кофе и разнообразными десертами, такими как мороженое, пирожные и торты.</p>
                                        </div>
                                    </div>
                                    <div className={styles.restaurantsLists}>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>4,5</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>Адрес</h3>
                                                <p>просп. Ленина, 9, Зеленогорск</p>
                                            </div>
                                        </div>
                                        <div className={styles.restaurantsList}>
                                            <img src={icons.timeIcon} alt="timeIcon" />
                                            <div className={styles.restaurantsListTText}>
                                                <h3>Время работы</h3>
                                                <p>Каждый день с 11:00 - 20:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.restaurantsRight}>
                                    <img src={images.restaurants2Image} alt="restaurants2Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
