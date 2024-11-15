import React, { useEffect, useState } from 'react';
import icons from '../../../resources/icon';
import styles from './index.module.css';

const PatientSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalBottomContent, setModalBottomContent] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const groupedSlides = [];
    for (let i = 0; i < slides.length; i += 3) {
        groupedSlides.push(slides.slice(i, i + 3));
    }

    useEffect(() => {
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth + 'px'
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = scrollWidth;
        } else {
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        }
    }, [isModalOpen]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const openModal = (description, bottomContent) => {
        setModalContent(description);
        setModalBottomContent(bottomContent);
        setIsModalOpen(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setModalContent('');
            setModalBottomContent(null);
        }, 300);
    };

    const getShortDescription = (text, limit = 270) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + '...';
    };

    const formatDescription = (text) => {
        return text.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    const renderBottomContent = (slide) => (
        <div className={styles.sliderCardBottomWrapper}>
            <img
                src={slide.avatar}
                alt={slide.alt}
                className={styles.cardImage}
            />
            <div className={styles.sliderCardBottomRightWrapper}>
                <p className={styles.sliderCardBottomTextT}>
                    {slide.patientName}
                </p>
                <p className={styles.sliderCardBottomTextB}>
                    {slide.patientDiagnosis}
                </p>
            </div>
        </div>
    );

    return (
        <div className={styles.slider}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {groupedSlides.map((group, groupIndex) => (
                    <div className={styles.slide} key={groupIndex}>
                        <div className={styles.cardWrapper}>
                            {group.map((slide, index) => (
                                <div className={styles.sliderCard} key={index}>
                                    <img
                                        src={icons.patientQoutesIcon}
                                        alt="patientQoutesIcon"
                                        className={styles.cardQoutesImage}
                                    />
                                    <div className={styles.cardContent}>
                                        <p>
                                            {getShortDescription(slide.description)}
                                        </p>
                                        <button
                                            className={styles.sliderExpandButton}
                                            onClick={() => openModal(formatDescription(slide.description), renderBottomContent(slide))}
                                        >
                                            <span>Читать полностью</span>
                                        </button>
                                    </div>
                                    {renderBottomContent(slide)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.sliderDots}>
                {groupedSlides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.sliderDot} ${
                            currentIndex === index ? styles.active : ''
                        }`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>

            {isModalOpen && (
                <div className={`${styles.modalOverlay} ${ isClosing ? styles.fadeOutOverlay : ''}`} onClick={closeModal}>
                    <div className={`${styles.modalContent} ${ isClosing ? styles.modalClose : '' }`} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalContentTop}>
                            <img src={icons.patientQoutesIcon} alt="patientQoutesIcon" className={styles.cardQoutesModalImage}/>
                            <button className={styles.modalCloseButton} onClick={closeModal}>
                                <img src={icons.closeIcon} className={styles.closeButtonSpan}></img>
                            </button>
                        </div>
                        <div className={styles.modalText}>
                            <div className={styles.modalContentWrapper}>
                                {modalContent}
                            </div>
                        </div>
                        <div className={styles.modalBtmWrapper}>
                            {modalBottomContent}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientSlider;
