import React from "react";
import styles from "./index.module.css";
import images from "../../../shared/resources/images";
import icons from "../../../shared/resources/icon";
import SideLink from "../../../shared/components/SideLink";

export default function SpefsPage() {

    return (
            <>
                <SideLink />
                <section className={styles.spefsSection}>
                    <div className="container">
                        <div className={styles.spefsWrapper}>
                            <div className={styles.spefsLeft}>
                                <p className={styles.spefsTitle}>Вебинар для врачей-терапевтов амбулаторного звена</p>
                                <div className={styles.spefsLeftMain}>
                                        <p className={styles.spefsTitleOrange}>«Когда заподозрить целиакию»</p>
                                        <div className={styles.spefsTextContain}>
                                            <p className={styles.spefsText}>
                                                Вебинар от руководителя <span className={styles.spefsTextOrange}>Центра лечения глютен-ассоциированных заболеваний</span>
                                            </p>
                                            <p className={styles.spefsText}>
                                                <span className={styles.spefsTextBlack}>Подробная информация будет позже</span>
                                            </p>
                                        </div>
                                    <button className={styles.spefsBtn}>
                                        <div className={styles.spefsCircle}>
                                            <div className={styles.spefsInnerCircle}>
                                                <img className={styles.spefsPlayIconOrange} src={icons.playOrangeIcon} alt="playOrangeIcon" />
                                                <img className={styles.spefsPlayIcon} src={icons.playIcon} alt="playIcon" />
                                            </div>
                                        </div>
                                        <span>Смотреть видео</span>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.spefsRight}>
                                <img src={images.spefsDoctorImage} alt="spefsDoctorImage" />
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}
