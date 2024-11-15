import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './index.module.css';
import images from '../../../shared/resources/images';
import CertificateProfileSlider from '../../../shared/components/Sliders/CertificateProfileSlider';
import Button from '../../../shared/components/Buttons';
import SideLink from '../../../shared/components/SideLink';
import icons from '../../../shared/resources/icon';

const services = [
    { title: "Информационная консультация 30-40 минут", price: "2500", details: "Онлайн консультация посредством видеосвязи в течении 30-40 минут, где вы можете обсудить конкретные вопросы по состоянию своего организма, определить необходимость и варианты коррекции своего состояния, получить первичные рекомендации по образу жизни, особенностях питания и профилактике заболеваний. Эта консультация является хорошим вариантом для быстрого получения информации и построения дальнейшей стратегии для тех, кто хочет изменить свой вес и наладить отношения с едой!" },
    { title: "Информационная консультация 60 минут", price: "4000", details: "Онлайн консультация посредством видеосвязи в течении 60 минут, где вы можете задать все вопросы про свое состояние, узнать информацию о заболеваниях, образе жизни, особенностях питания и профилактике обострений или осложнений. По желанию можно обсудить изменения в анализах. Эта консультация подойдет для тех, кто хочет получить подробную информацию о текущем уровне здоровья, как держать свое состояние под контролем, уменьшить риски заболеваний и в каком направлении можно начать работу уже сейчас!" },
    { title: "Консультация в чате («мне только спросить») ответы на ваши вопросы в течении часа", price: "2000", details: "Консультация в чате сайта, где в течении часа специалист отвечает вам на вопросы, связанные со здоровьем, образом жизни, и дает рекомендации – как решить эти проблемы." },
    { title: "Сопровождение в чате (1 неделю)", price: "7000", details: "Консультация в чате сайта, где в течении недели вы обсуждаете со специалистом вопросы вашего здоровья, питания, режима сна, отдыха, стресс-менеджмент и другие важные аспекты образа жизни, которые могут влиять на ваше состояние. Вы получаете задел для формирования правильных привычек, учитесь жить с новой диетой, а также составляете план последующего наблюдения и чек-апов. Время общения в чате с 9.00 до 20.00" },
    { title: "Пакет из 4 консультаций", price: "15000", details: "4 онлайн консультации посредством видеосвязи в течении 60 минут. Данный вариант подразумевает совместную работу с консультантом по решению проблем с питанием, коррекцией не только рациона, но и режима дня, сна, отдыха, внедрение полезных привычек в повседневную жизнь, психологическую поддержку. Такой формат являться хорошим заделом для тех, кто хочет не просто соблюдать ЗОЖ, а научится понимать свой организм и получать удовольствие от жизни. " },
    { title: "Сопровождение (4 консультации+общение в чате 1,5 месяца)", price: "20000", details: "Помимо 4 онлайн консультаций по 60 минут, вы получите общение в чате сайте в интервалах между консультациями. Это позволит более подробно разобраться в ваших проблемах, вовремя разъяснить непонятные ситуации и поддержать вас в трудную минуту. Время общения в чате с 9.00 до 20.00" },
];

const certificates = [
    { img: images.certProfileImage, title: "Диплом" },
    { img: images.certProfileImage, title: "Сертификат" },
    { img: images.certProfileImage, title: "Диплом" },
    { img: images.certProfileImage, title: "Сертификат" },
    { img: images.certProfileImage, title: "Диплом" },
];

function EducationContent() {
    return (
        <div className={styles.educationContent}>
            <h2 className={styles.educationContentTitle}>Образование</h2>
            <div className={styles.educationContentDescription}>
                <span className={styles.yellowDash}></span>
                <p className={styles.educationContentDe}>Образование</p>
            </div>
        </div>
    );
}

function DocumentsContent() {
    return (
        <div className={styles.documentsContent}>
            <h2 className={styles.documentsContentTitle}>Документы, сертификаты</h2>
            <CertificateProfileSlider
                items={certificates.map((certificate, index) => ({
                    image: certificate.img,
                    title: certificate.title,
                }))}
            />
        </div>
    );
}

export default function EditConsultantProfilePage() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [activeTab, setActiveTab] = useState('education');

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/profile-patient/make-appointment');
    };

    const toggleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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

    return (
            <>
                <SideLink />
                <section className={styles.profileSectionW}>
                    <div className="container">
                        <div className={styles.consProfileWrapperW}>
                            <h1 className={styles.profileSectionHeader}>Личный кабинет</h1>
                            <div className={styles.profileHeaderWrap}>
                                <img src={icons.profileAvIcon} className={styles.profileAv} alt="profileAvIcon" />
                                <div className={styles.profileInfo}>
                                    <h2>Иванов Иван Иванович</h2>
                                    <p>Заполненность профиля - 50%</p>
                                </div>
                            </div>
                            <div className={styles.profileBtnActions}>
                                <div className={styles.profileBtnActionsW}>
                                    <Button
                                        variant="gradient"
                                        fontSize='small'
                                        padding="15.5px 63.2px"
                                    >
                                        Изменить услуги
                                    </Button>
                                    <Button
                                        variant="white"
                                        color='black'
                                        fontSize='small'
                                        padding="15.5px 78.5px"
                                    >
                                        Указать цены
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        fontSize='small'
                                        padding="15.5px 103.8px"
                                    >
                                        Баланс
                                    </Button>
                                    <Button
                                        variant="white"
                                        color='black'
                                        fontSize='small'
                                        padding="15.5px 54px"
                                    >
                                        Изменить профиль
                                    </Button>
                                </div>
                                <div className={styles.profileBtnActionsW}>
                                    <Button
                                        variant="white"
                                        color='black'
                                        fontSize='small'
                                        padding="15.5px 56px"
                                    >
                                        Мои консультации
                                    </Button>
                                    <Button
                                        variant="white"
                                        color='black'
                                        fontSize='small'
                                        padding="15.5px 84.4px"
                                    >
                                        Сообщения
                                    </Button>
                                    <Button
                                        variant="white"
                                        color='black'
                                        fontSize='small'
                                        padding="15.5px 76.5px"
                                    >
                                        Уведомления
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.profileSection}>
                    <div className="container">
                        <div className={styles.consProfileWrapper}>
                            <div className={styles.consProfileLeftWrapper}>
                                <h1 className={styles.consultantName}>Семенова Елена Анатольевна</h1>
                                <div className={styles.consProfileLeftTop}>
                                    <ul className={styles.consultantDescriptionList}>
                                        <li className={styles.consultantDescriptionItem}>
                                            <span className={styles.yellowDash}></span>
                                            <p className={styles.consultantTitle}>Главный консультант</p>
                                        </li>
                                        <li className={styles.consultantDescriptionItem}>
                                            <span className={styles.yellowDash}></span>
                                            <p className={styles.consultantTitle}>
                                                к.м.н., врач-гастроэнтеролог, диетолог; доцент кафедры пропедевтики внутренних болезней, гастроэнтерологии и диетологии им. М.С. Рысса Северо-Западного государственного медицинского университета им. И.И. Мечникова. Руководитель «Северо-Западного Центра лечения глютен-ассоциированных заболеваний».
                                            </p>
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.serviceWrapper}>
                                    {services.map((service, index) => (
                                    <div key={index} className={styles.serviceItem}>
                                        <div className={styles.serviceHeader}>
                                            <h3 className={styles.serviceTi}>{service.title} - {service.price}р</h3>
                                            <button onClick={() => toggleExpand(index)} className={styles.expandButton}>
                                                Подробнее об услуге
                                            </button>
                                        </div>
                                        <div
                                            className={`${styles.serviceDetails} ${expandedIndex === index ? styles.expanded : ''}`}
                                            style={{ maxHeight: expandedIndex === index ? '200px' : '0px' }}
                                        >
                                            <p>{service.details}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <Button
                                        variant="gradient"
                                        padding="24.5px 275.5px"
                                        onClick={handleNavigate}
                                    >
                                        Записаться
                                    </Button>
                                </div>
                            </div>

                            <div className={styles.consProfileRightWrapper}>
                                <img src={images.profileConsImage} alt="profileConsImage" className={styles.consultantImage} />
                                <div className={styles.experienceWrapper}>
                                    <div className={styles.experienceYearsWrapper}>
                                        <p className={styles.experienceYearsNumber}>13</p>
                                        <span className={styles.experienceYears}>лет</span>
                                    </div>
                                    <span className={styles.yellowDash}></span>
                                    <p className={styles.experienceText}>стаж научной деятельности</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.educationTabs}>
                    <div className="container">
                        <div className={styles.tabWrapper}>
                            <div className={styles.tabHeaders}>
                                <button
                                    className={`${styles.tabButton} ${activeTab === 'education' ? styles.activeTab : ''}`}
                                    onClick={() => handleTabClick('education')}
                                >
                                    <span>Образование</span>
                                </button>
                                <button
                                    className={`${styles.tabButton} ${activeTab === 'documents' ? styles.activeTab : ''}`}
                                    onClick={() => handleTabClick('documents')}
                                >
                                    <span>Документы, сертификаты</span>
                                </button>
                            </div>
                            <div className={styles.tabContentWrapper}>
                                <div className={`${styles.tabContent} ${activeTab === 'education' ? styles.active : ''}`} >
                                    {activeTab === 'education' && <EducationContent />}
                                </div>
                                <div className={`${styles.tabContent} ${activeTab === 'documents' ? styles.active : ''}`} >
                                    {activeTab === 'documents' && <DocumentsContent />}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.videoСutawaySection}>
                    <div className="container">
                        <div className={styles.videoСutawayWrapper}>
                            <h2 className={styles.videoHeader}>Знакомство с врачом</h2>
                            <video src="#" className={styles.videoBanner}></video>
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

                <section className={styles.reviewsSection}>
					<div className="container">
						<div className={styles.reviewsWrapper}>
							<div className={styles.reviewsHeader}>Отзывы о работе консультанта</div>
							<div className={styles.reviewsCarts}>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> Мария И. </p>
											<p className={styles.reviewsCartUserDate}> 31.10.2023, консультация у Семеновой Е.А. </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> «Благодарны консультанту за доброжелательный и квалифицированный приём» </p>
										</div>
									</div>
								</div>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> Мария И. </p>
											<p className={styles.reviewsCartUserDate}> 17.05.2023, консультация у Семеновой Е.А. </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> «Очень внимательный консультант. Подробная консультация. Очень много узнала о своём диагнозе. Спасибо,что организовали такой центр» </p>
										</div>
									</div>
								</div>
								<div className={styles.reviewsCart}>
									<div className={styles.reviewsCartTop}> <img src={icons.reviewsMarksIcon} alt="reviewsMarksIcon" /> </div>
									<div className={styles.reviewsCartBottom}>
										<div className={styles.reviewsStars}>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
											<div className={styles.reviewsStarsWrapper}> <img src={icons.reviewsStarsIcon} alt="reviewsStarsIcon" /> </div>
										</div>
										<div className={styles.reviewsCartUsers}>
											<p className={styles.reviewsCartUser}> Антон Г. </p>
											<p className={styles.reviewsCartUserDate}> 13.12.2023, консультация у Семеновой Е.А. </p>
										</div>
										<div className={styles.reviewsCartComments}>
											<p className={styles.reviewsCartCommentsText}> «Все отлично. Очень профессионально» </p>
										</div>
									</div>
								</div>
							</div>
                            <Button
                                variant="white"
                                padding="20px 474.5px"
                            >
                                Показать все отзывы
                            </Button>
						</div>
					</div>
            	</section>
            </>
    );
}
