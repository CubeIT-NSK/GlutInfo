import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import Button from "../../../shared/components/Buttons";
import SideLink from "../../../shared/components/SideLink";

export default function ShopsWithPage() {

    return (
            <>
                <SideLink />

                <section className={styles.shopsWithHeaderSection}>
                    <div className="container">
                        <div className={styles.shopsWith}>
                            <div className={styles.shopsWithWrapper}>
                                <div className={styles.shopsWithLeft}>
                                    <div className={styles.shopsWithLeftTitle}>
                                        <h2>Магазины полностью с безглютеновой продукцией</h2>
                                        <div className={styles.shopsWithLeftText}>
                                            <p>Специализированные магазины позволяют покупателям легко находить безопасные для них продукты и открывать новые вкусы, а также поддерживают местных производителей, предлагая уникальные и качественные товары. </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="gradient"
                                        padding="22.5px 108.5px"
                                    >
                                        Показать места на карте
                                    </Button>
                                </div>
                                <div className={styles.shopsWithRight}>
                                    <img src={images.shopsWith1Image} alt="shopsWith1Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.shopsWithSection}>
                    <div className="container">
                        <div className={styles.shopsWith}>
                            <div className={styles.shopsWithWrapperReverse}>
                                <div className={styles.shopsWithLeft}>
                                    <div className={styles.shopsWithLeftTitle}>
                                        <h2>Территория Безглютеновой Кухни</h2>
                                        <div className={styles.shopsWithLeftText}>
                                            <p>Территория Безглютеновой Кухни занимается производством безглютеновой и безглютеново-безмолочной продукции для людей с пищевой аллергией.</p>
                                        </div>
                                    </div>
                                    <div className={styles.shopsWithLists}>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>4,2</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>Адрес</h3>
                                                <p>Киевская ул., 28Б, Санкт-Петербург</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.callWIcon} alt="callWIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>Контакты</h3>
                                                <p><span><a href="www.tbkspb.ru">www.tbkspb.ru</a></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.shopsWithRight}>
                                    <img src={images.shopsWith2Image} alt="shopsWith2Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.shopsWithSection}>
                    <div className="container">
                        <div className={styles.shopsWith}>
                            <div className={styles.shopsWithWrapper}>
                                <div className={styles.shopsWithLeft}>
                                    <div className={styles.shopsWithLeftTitle}>
                                        <h2>Мит Стар</h2>
                                        <div className={styles.shopsWithLeftText}>
                                            <p>Весь ассортимент продуктов торговой марки «Мит Стар» не содержат глютен.</p>
                                        </div>
                                    </div>
                                    <div className={styles.shopsWithLists}>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.starIcon} alt="starIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>4,9</h3>
                                                <p>Хорошее место</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.placeIcon} alt="placeIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>Адрес</h3>
                                                <p>Предпортовая ул., 6РБ, Санкт-Петербург
                                                Подвойского ул. , 27/20, Санкт-Петербург</p>
                                            </div>
                                        </div>
                                        <div className={styles.shopsWithList}>
                                            <img src={icons.callWIcon} alt="callWIcon" />
                                            <div className={styles.shopsWithListTText}>
                                                <h3>Контакты</h3>
                                                <p><a href="tel:+78126771107">+7 (812) 677-11-08</a>, <span><a href="www.meatstar.spb.ru">www.meatstar.spb.ru</a></span></p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.shopsWithRight}>
                                    <img src={images.shopsWith3Image} alt="shopsWith3Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
