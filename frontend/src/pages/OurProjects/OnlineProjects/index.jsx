import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import Button from "../../../shared/components/Buttons";
import SideLink from "../../../shared/components/SideLink";
import icons from "../../../shared/resources/icon";

export default function OnlinePage() {

    return (
            <>
                <SideLink />
                <section className={styles.onlineSection}>
                    <div className="container">
                    <div className={styles.onlineWrapper}>
                        <p className={styles.onlineHeader}>Серия видео и подкастов для пациентов совместно c «Макрофаг Продакшн»</p>
                        <div className={styles.onlineTextContain}>
                            <p className={styles.onlineText}>
                                Данный проект выполняется совместно с <span className={styles.onlineTextOrange}>«Макрофаг Продакшн».</span>
                            </p>
                            <p className={styles.onlineText}>
                                <span className={styles.onlineTextBlack}>«Macrophage Production»</span> — это медиа-проект по производству научных и научно-популярных фильмов в стиле LightBoard.
                            </p>
                            <p className={styles.onlineText}>
                                Скоро выйдет фильм о целиакии. Процесс создания Вы можете увидеть на фотографиях.
                            </p>
                        </div>
                        <div className={styles.onlineVideoCartWrapper}>
                            <div className={styles.onlineVideoCart}>
                                <div className={styles.onlineVideo}>
                                    <img src={images.onlineProjectsFirstImage} alt="onlineProjectsFirstImage" />
                                    <button className={styles.onlineVideoPlay} style={{ '--after-image': `url(${icons.onlineProjectPlayIcon})` }}></button>
                                </div>
                                <div className={styles.onlineVideoBottom}>
                                    <div className={styles.onlineVideoBottomContain}>
                                        <p className={styles.onlineVideoAuthor}>Автор видео</p>
                                        <p className={styles.onlineVideoName}>Название видео</p>
                                    </div>
                                    <Button
                                        variant="gradient"
                                        padding="17.5px 214.5px"
                                    >
                                        Смотреть
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.onlineVideoCart}>
                                <div className={styles.onlineVideo}>
                                    <img src={images.onlineProjectsSecondImage} alt="onlineProjectsSecondImage" />
                                    <button className={styles.onlineVideoPlay}style={{ '--after-image': `url(${icons.onlineProjectPlayIcon})` }}></button>
                                </div>
                                <div className={styles.onlineVideoBottom}>
                                <div className={styles.onlineVideoBottomContain}>
                                    <p className={styles.onlineVideoAuthor}>Автор видео</p>
                                    <p className={styles.onlineVideoName}>Название видео</p>
                                </div>
                                <Button
                                    variant="gradient"
                                    padding="17.5px 214.5px"
                                >
                                    Смотреть
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </>
    );
}
