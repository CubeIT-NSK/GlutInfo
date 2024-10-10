import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../../../shared/components/Footer';
import Header from '../../../shared/components/Header';
import styles from './index.module.css';
import icons from '../../../shared/resources/icon';
import images from '../../../shared/resources/images';
import CertificateProfileSlider from '../../../shared/components/Sliders/CertificateProfileSlider';
import ServicesCertificatesSlider from '../../../shared/components/Sliders/ServicesCertificatesSlider';

const certificates = [
    { img: images.certProfile, title: "Диплом" },
    { img: images.certProfile, title: "Сертификат" },
    { img: images.certProfile, title: "Диплом" },
    { img: images.certProfile, title: "Сертификат" },
    { img: images.certProfile, title: "Диплом" },
];

export default function ConsProfilePage() {
    const [galleryItems, setGalleryItems] = useState([]);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/edit-profile-consultant');
    };

    const fetchGalleryItems = async () => {
        const mockGalleryData = [
            { id: 1, img: '', title: 'Конференция' },
            { id: 2, img: '', title: 'Мероприятие' },
            { id: 3, img: '', title: 'Мероприятие' },
            { id: 4, img: '', title: 'Конференция' },
            { id: 5, img: '', title: 'Конференция' },
            { id: 6, img: '', title: 'Мероприятие' },
        ];

        setGalleryItems(mockGalleryData);
    };

useEffect(() => {
    fetchGalleryItems();
}, []);

const sliderData = {
    ServicesData: [
        {
            title: 'Информационная консультация 30-40 минут',
            price: '2500р',
            information: 'Онлайн консультация посредством видеосвязи в течении 30-40 минут, где вы можете обсудить конкретные вопросы по состоянию своего организма, определить необходимость и варианты коррекции своего состояния, получить первичные рекомендации по образу жизни, особенностях питания и профилактике заболеваний. Эта консультация является хорошим вариантом для быстрого получения информации и построения дальнейшей стратегии для тех, кто хочет изменить свой вес и наладить отношения с едой!'
        },
        {
            title: 'Информационная консультация 30-40 минут',
            price: '2500р',
            information: 'Онлайн консультация посредством видеосвязи в течении 30-40 минут, где вы можете обсудить конкретные вопросы по состоянию своего организма, определить необходимость и варианты коррекции своего состояния, получить первичные рекомендации по образу жизни, особенностях питания и профилактике заболеваний. Эта консультация является хорошим вариантом для быстрого получения информации и построения дальнейшей стратегии для тех, кто хочет изменить свой вес и наладить отношения с едой!'
        },
        {
            title: 'Информационная консультация 30-40 минут',
            price: '2500р',
            information: 'Онлайн консультация посредством видеосвязи в течении 30-40 минут, где вы можете обсудить конкретные вопросы по состоянию своего организма, определить необходимость и варианты коррекции своего состояния, получить первичные рекомендации по образу жизни, особенностях питания и профилактике заболеваний. Эта консультация является хорошим вариантом для быстрого получения информации и построения дальнейшей стратегии для тех, кто хочет изменить свой вес и наладить отношения с едой!'
        },
        {
            title: 'Информационная консультация 30-40 минут',
            price: '2500р',
            information: 'Онлайн консультация посредством видеосвязи в течении 30-40 минут, где вы можете обсудить конкретные вопросы по состоянию своего организма, определить необходимость и варианты коррекции своего состояния, получить первичные рекомендации по образу жизни, особенностях питания и профилактике заболеваний. Эта консультация является хорошим вариантом для быстрого получения информации и построения дальнейшей стратегии для тех, кто хочет изменить свой вес и наладить отношения с едой!'
        },
    ],
};

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.profileSection}>
                    <div className="container">
                        <div className={styles.consProfileWrapper}>
                            <h1 className={styles.profileSectionHeader}>Личный кабинет</h1>
                            <div className={styles.profileHeaderWrap}>
                                <img src={icons.profileAv} className={styles.profileAv} alt="profileAv" />
                                <div className={styles.profileInfo}>
                                    <h2>Иванов Иван Иванович</h2>
                                    <p>Заполненность профиля - 50%</p>
                                </div>
                            </div>
                            <div className={styles.profileBtnActions}>
                                <div className={styles.profileBtnActionsW}>
                                    <button className={styles.actionBtnOrange}>Изменить услуги</button>
                                    <button className={styles.actionBtn}>Указать цены</button>
                                    <button className={styles.actionBtnOrange}>Баланс</button>
                                    <button className={styles.actionBtn}>Изменить профиль</button>
                                </div>
                                <div className={styles.profileBtnActionsW}>
                                    <button className={styles.actionBtn}>Мои консультации</button>
                                    <button className={styles.actionBtn}>Сообщения</button>
                                    <button className={styles.actionBtn}>Уведомления</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.certificatesSection}>
                            <div className="container">
                                <div className={styles.certificatesProfConsTopWrap}>
                                    <h2 className={styles.certificatesProfConsTopText}>Профиль консультанта</h2>
                                    <div className={styles.certificatesProfConsMidWrap}>
                                        <div className={styles.certificatesMidWrapLeftCol}>
                                            <img src={images.certProfile}  className={styles.certificatesProfImg} alt="certProfile" />
                                        </div>
                                        <div className={styles.certificatesMidWrapRightCol}>
                                            <div className={styles.certificatesProfile}>
                                                <div className={styles.certificatesProfileTop}>
                                                    <h2>Иванов Иван Иванович</h2>
                                                    <p>Диетолог</p>
                                                </div>
                                                <h3 className={styles.certificatesProfileMid}>
                                                    <span>Образование: </span>
                                                    указать медицинское учреждение, в котором получали диплом; сертификаты дополнительных специальностей
                                                </h3>
                                                <h3 className={styles.certificatesProfileBot}>
                                                    <span>Личные достижения: </span>
                                                    курсы повышения квалификации, количество научных работ с указанием количества статей, тезисов; выступления, гранты, патенты, авторские программы и т.д.
                                                </h3>
                                            </div>
                                            <div className={styles.certificatesProfileSLider}>
                                                <h2 className={styles.certificatesProfileSliderTitle}>Документы, сертификаты</h2>
                                                <CertificateProfileSlider
                                                    items={certificates.map((certificate, index) => ({
                                                        image: certificate.img,
                                                        title: certificate.title,
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </section>
                <section className={styles.phGalCertificatesSection}>
                            <div className="container">
                                <h2 className={styles.galleryHeader}>Фото, видео с конференций, мероприятий</h2>
                                <div className={styles.galleryWrapper}>
                                    <div className={styles.galleryLeftCol}>
                                        <div className={styles.galleryLeftColTop}>
                                            {galleryItems[0] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.galleryMiniMediumCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[0].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[0].title}</div>
                                                </div>
                                            )}
                                            {galleryItems[1] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.galleryMedMediumCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[1].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[1].title}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.galleryLeftColTop}>
                                            {galleryItems[2] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.galleryBigCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[2].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[2].title}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.galleryRightCol}>
                                        <div className={styles.galleryRightColTop}>
                                            {galleryItems[3] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.gallerySmallCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[3].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[3].title}</div>
                                                </div>
                                            )}
                                            {galleryItems[4] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.gallerySmallCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[4].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[4].title}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.galleryLeftColTop}>
                                            {galleryItems[5] && (
                                                <div className={styles.galleryCardWrapper}>
                                                    <div
                                                        className={`${styles.galleryCard} ${styles.galleryMediumCard}`}
                                                        style={{ backgroundImage: `url(${galleryItems[5].img})` }}
                                                    />
                                                    <div className={styles.galleryCardTitle}>{galleryItems[5].title}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                </section>
                <section className={styles.videoСutawaySection}>
                    <div className="container">
                        <h2 className={styles.videoHeader}>Видео-визитка</h2>
                        <video src="#" className={styles.videoBanner}></video>
                    </div>
                </section>
                <section className={styles.servicesCertificatesSection}>
                    <div className="container">
                        <h2 className={styles.videoHeader}>Услуги и цены</h2>
						<ServicesCertificatesSlider slides={sliderData.ServicesData} />
                    </div>
                </section>
                <section className={styles.videoСutawaySection}>
                    <div className="container">
                        <button className={styles.videoСutawaySectionBtn} onClick={handleNavigate}>Редактировать страницу</button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
