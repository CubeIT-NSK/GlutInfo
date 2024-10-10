import React, { useState } from 'react';
import styles from './index.module.css';

const PhotoSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const getGridArea = (index) => {
        const gridAreas = [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 4 / 3",
            "1 / 3 / 3 / 5",
            "3 / 3 / 4 / 4",
            "3 / 4 / 4 / 5",
        ];
        return gridAreas[index] || "auto";
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
                            <div className={styles.sliderPhotosGrid}>
                                {slide.photoGalleryImages.map((image, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        className={styles.photoItem}
                                        style={{ gridArea: getGridArea(imgIndex) }}
                                    >
                                        <img
                                            src={image.bgImage}
                                            alt={image.alt}
                                            className={styles.photoImage}
                                        />
                                    </div>
                                ))}
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

export default PhotoSlider;
