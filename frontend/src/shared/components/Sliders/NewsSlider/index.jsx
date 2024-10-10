import React, { useState } from 'react';
import styles from './index.module.css';

const NewsSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const getShortTitle = (text, limit = 270) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + '...';
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
                            <div
                                className={styles.sliderCard}
                                style={{
                                    backgroundImage: `url(${slide.bgImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className={styles.cardContent}>
                                    <p className={styles.cardContentTitle}>
                                        {getShortTitle(slide.title)}
                                    </p>
                                    <div className={styles.cardContentBtm}>
                                        <p className={styles.cardContentDate}>
                                            {slide.date}
                                        </p>
                                        <button className={styles.sliderHREFButton}>
                                            <span>Подробнее</span>
                                        </button>
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

export default NewsSlider;
