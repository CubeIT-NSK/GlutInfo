import React, { useState } from 'react';
import styles from './index.module.css';

const ServicesCertificatesSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.slider}>
            <div className={styles.slidesContainerWrapper}>
                <div
                    className={styles.slidesContainer}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={styles.sliderCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardContentTopBlock}>
                                        <h2 className={styles.cardContentTitle}>
                                            {slide.title}
                                        </h2>
                                        <span className={styles.cardContentPrice}>{slide.price}</span>
                                    </div>
                                    <div className={styles.cardContentBtm}>
                                        <p className={styles.cardContenInformation}>
                                            <span>Подробнее об услуге: </span>{slide.information}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.sliderDots}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.sliderDot} ${
                            currentIndex === index ? styles.active : ''
                        }`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ServicesCertificatesSlider;
