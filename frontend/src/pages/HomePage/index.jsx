import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

import images from "../../shared/resources/images";

import styles from "./index.module.css";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                    <section className={styles.teleService}>
                        <div className="container">
                            <div className={styles.teleWrapper}>
                                <div className={styles.teleMiddle}>
                                    <div className={styles.teleMiddleWrap}>
                                        <div className={styles.teleMiddleTopWrapper}>
                                            <div className={styles.teleTop}>
                                                <p>ДЕЛАЕМ ЖИЗНЬ БЕЗ ГЛЮТЕНА ЛУЧШЕ</p>
                                            </div>
                                            <header>Телемедицинский сервис <span>«ГастроГлютен</span>.инфо»</header>
                                        </div>
                                            <h3>Первая в России медицинская информационно-консультативная платформа для пациентов и консультантов</h3>
                                            <button>Записаться на онлайн-консультацию</button>
                                        </div>
                                    <img src={images.teleServiceImage} alt="teleService" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.aboutUs}>
                        <div className="container">
                    	    <div className={styles.aboutUsWrapper}>
                    	    	<div className={styles.aboutUsLeft}>
                    	    		<div className={styles.aboutUsTextWrapper}>
                    	    			<header>О нас</header>
                    	    			<h3>Наша миссия — сделать данный ресурс полезным для пациентов и врачей и стандартизировать подходы к ведению больных с глютен-ассоциированными заболеваниями по всей стране.
                                            <br />
                                            <br />
                                            Приоритетами являются правильная диагностикаи ведение пациентов с глютен-ассоциированными заболеваниями (целиакией, нецелиакийной чувствительностью к глютену, аллергией на пшеницу), помощь в соблюдении безглютеновой диеты, повышение качества жизни данной категории пациентов.
                                        </h3>
                                    </div>
                    	    		<button>Подробнее</button>
                    	    	</div>
                                <div className={styles.aboutUsRight}>
                                    <img src={images.aboutUsImage} alt="aboutUs" />
                                    <p><span>ГАСТРОГЛЮТЕН.</span>ИНФО</p>
                                </div>
                    	    </div>
                    	</div>
                    </section>
            </main>
            <Footer />
        </div>
    );
}
