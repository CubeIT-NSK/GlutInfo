import React from "react";
import styles from "./index.module.css";
import images from "../../shared/resources/images";
import Button from "../../shared/components/Buttons";
import SideLink from "../../shared/components/SideLink";

export default function EventsSpecialistsPage() {

    return (
        <>
            <SideLink />
                <section className={styles.eventsSpecialistsSection}>
                    <div className="container">
                        <div className={styles.eventsSpecialistsWrapper}>
                            <div className={styles.eventsSpecialistsText}>
                                <p>Подробная информация позже</p>
                                <Button
                                    variant="gradient"
                                    padding="22.5px 69.5px"
                                >
                                    Вернуться на главную страницу
                                </Button>
                            </div>
                            <img src={images.EventsSpecialistsImage} alt="EventsSpecialistsImage" />
                        </div>
                    </div>
                </section>
        </>
    );
}
