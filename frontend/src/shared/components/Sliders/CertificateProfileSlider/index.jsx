import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

const CertificateSlider = ({ items, scrollCount = 1 }) => {
    const sliderRef = useRef(null);
    const [blurIndex, setBlurIndex] = useState(null);

    const handleWheel = (e) => {
        const slider = sliderRef.current;
        e.preventDefault();

        const itemWidth = slider.children[0].offsetWidth + 15;
        const scrollAmount = itemWidth * scrollCount;

        slider.scrollTo({
            left: slider.scrollLeft + (e.deltaY > 0 ? scrollAmount : -scrollAmount),
            behavior: 'smooth',
        });

        checkBounds(slider);
    };

    const checkBounds = (slider) => {
        const { scrollLeft, scrollWidth, clientWidth } = slider;

        if (scrollLeft + clientWidth >= scrollWidth) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        }
    };

    const handleImageClick = (image) => {
        window.open(image, '_blank');
    };

    const checkBlurIndex = (slider) => {
        const { scrollLeft, clientWidth } = slider;
        const lastVisibleIndex = Math.floor((scrollLeft + clientWidth) / (slider.children[0].offsetWidth + 15)) - 1;
        setBlurIndex(lastVisibleIndex);
    };

    useEffect(() => {
        const slider = sliderRef.current;

        if (slider) {
            slider.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (slider) {
                slider.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className={styles.sliderContainer} ref={sliderRef}>
            {items.map((item, index) => (
                <div
                    className={styles.sliderItem}
                    key={index}
                    style={{ filter: index === blurIndex ? 'blur(2px)' : 'none' }}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className={styles.sliderImage}
                        onClick={() => handleImageClick(item.image)}
                    />
                    <p className={styles.sliderTitle}>{item.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CertificateSlider;
