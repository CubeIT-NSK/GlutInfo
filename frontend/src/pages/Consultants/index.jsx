import React from "react";
import styles from "./index.module.css";
import images from "../../shared/resources/images";
import Button from "../../shared/components/Buttons";
import SideLink from "../../shared/components/SideLink";

export default function ConsultsPage() {

    return (
            <>
                <SideLink />

                <section className={styles.consultsSection}>
                    <div className="container">
                        <div className={styles.consultsWrapper}>
                            <div className={styles.consultsHeader}>
                                <div className={styles.consultsLeft}>
                                    <h2 className={styles.consultsTitle}>Консультанты</h2>
                                    <div className={styles.consultsLeftItems}>
                                        <Button
                                            variant="gray"
                                            color="gray"
                                            padding="6px 10px"
                                        >
                                            Гастроэнтерологи
                                        </Button>
                                        <Button
                                            variant="gray"
                                            color="gray"
                                            padding="6px 10px"
                                        >
                                            Диетологи
                                        </Button>
                                        <Button
                                            variant="gray"
                                            color="gray"
                                            padding="6px 10px"
                                        >
                                            Психологи
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.consultsCardWrapper}>
                                <div className={styles.consultsCardItem}>
                                    <img src={images.consultImage} alt="consultImage" />
                                    <div className={styles.consultsCardItemText}>
                                        <h2 className={styles.consultsCardItemTextWHead}>Семенова Елена Анатольевна</h2>
                                        <div className={styles.consultsCardItemTextW}>
                                            <p className={styles.consultsCardItemTextWPost}>Главный консультант</p>
                                            <p className={styles.consultsCardItemTextWPost}>к.м.н., врач-гастроэнтеролог, диетолог; доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса Северо-Западного государственного медицинского университета им. И.И. Мечникова. Руководитель «Северо-Западного Центра лечения глютен-ассоциированных заболеваний».</p>
                                        </div>
                                    </div>
                                    <div className={styles.consultsCardItemBtns}>
                                        <Button
                                            variant="gradient"
                                            padding="22.5px 125.5px"
                                        >
                                            Записаться
                                        </Button>
                                        <Button
                                            variant="white"
                                            padding="22.5px 125.5px"
                                        >
                                            Подробнее
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
