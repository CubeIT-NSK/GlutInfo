import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../shared/resources/icon";
import images from "../../shared/resources/images";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";
import SideLink from "../../shared/components/SideLink";
import { useTranslation } from "../../hooks/useTranslation";

export default function AboutUs() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    return (
            <>
                <SideLink />
                <section className={styles.aboutUs}>
                    <div className="container">
                        <div className={styles.aboutUsWrapper}>
                            <div className={styles.aboutUsLeft}>
                                <div className={styles.aboutUsLeftTop}>
                                    <h1 className={styles.aboutUsTitle}>{t('aboutUs.priorities.title')}</h1>
                                    <div className={styles.aboutUsInfo}>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>01</h2>
                                            <p className={styles.aboutUsText}><span>{t('aboutUs.priorities.item1.bold')}</span> {t('aboutUs.priorities.item1.text')}</p>
                                        </div>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>02</h2>
                                            <p className={styles.aboutUsText}><span>{t('aboutUs.priorities.item2.bold')}</span> {t('aboutUs.priorities.item2.text')}</p>
                                        </div>
                                        <div className={styles.aboutUsInfoWrapper}>
                                            <h2 className={styles.aboutUsNumber}>03</h2>
                                            <p className={styles.aboutUsText}><span>{t('aboutUs.priorities.item3.bold')}</span> {t('aboutUs.priorities.item3.text')}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button
									variant="gradient"
									padding="22.5px 44.5px"
									onClick={() => handleNavigate('/profile-patient/make-appointment')}
								>
									{t('aboutUs.consultationButton')}
								</Button>
                            </div>
                            <img src={images.aboutUsDoctor1Image} alt="aboutUsDoctor1Image" />
                        </div>
                    </div>
                </section>

                <section className={styles.directions}  style={{ backgroundImage: `url(${images.aboutUsBackground4Image})` }}>
                    <div className="container">
                        <div className={styles.directionsWrapper}>
                            <img src={images.aboutUsDoctor2Image} alt="aboutUsDoctor2Image" />
                            <div className={styles.directionsRight}>
                                <div className={styles.directionsRightTop}>
                                    <h2 className={styles.directionsTitle}>
                                        {t('aboutUs.telemedicineService.title')}
                                    </h2>
                                    <p className={styles.directionsSubTitle}>{t('aboutUs.telemedicineService.subtitle')}</p>
                                </div>
                                <div className={styles.directionsInfo}>
                                    <h2 className={styles.directionsInfoTitle}>{t('aboutUs.telemedicineService.mainDirections')}</h2>
                                    <div className={styles.directionsInfoWrapper}>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.doctorIcon} alt="doctorIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    {t('aboutUs.telemedicineService.direction1.title')}
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                    {t('aboutUs.telemedicineService.direction1.subtitle')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.calculatorIcon} alt="calculatorIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    {t('aboutUs.telemedicineService.direction2.title')}
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                    {t('aboutUs.telemedicineService.direction2.subtitle')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.directionsInfoContent}>
                                            <img src={icons.computerIcon} alt="computerIcon" />
                                            <div className={styles.directionsInfoRight}>
                                                <p className={styles.directionsInfoTextTop}>
                                                    {t('aboutUs.telemedicineService.direction3.title')}
                                                </p>
                                                <p className={styles.directionsInfoTextBottom}>
                                                    {t('aboutUs.telemedicineService.direction3.subtitle')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.problemInfo} style={{ backgroundImage: `url(${images.aboutUsBackground6Image})` }}>
                    <div className="container">
                        <div className={styles.problemMiddle}>
                            <div className={styles.problemLeft}>
                                <img className={styles.problemIcon} src={icons.problemQoutesIcon} alt="problemQoutesIcon" />
                                <div className={styles.problemWrapper}>
                                    <p className={styles.problemText}>
                                        {t('aboutUs.problemInfo.text1')}
                                    </p>
                                    <p className={styles.problemTextGradient}>
                                        {t('aboutUs.problemInfo.text2')}
                                    </p>
                                    <p className={styles.problemText}>
                                        {t('aboutUs.problemInfo.text3')}
                                    </p>
                                </div>
                                <div className={styles.problemLeftBottom}>
                                    <h2 className={styles.problemName}>{t('aboutUs.problemInfo.name')}</h2>
                                    <p className={styles.problemJop}>
                                        {t('aboutUs.problemInfo.position')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.creator1} id="creators"  style={{ backgroundImage: `url(${images.aboutUsBackground2Image})` }}>
                    <div className="container">
                        <div className={styles.creator1Middle}>
                            <img className={styles.creator1Img} src={images.aboutUsDoctor3Image} alt="aboutUsDoctor3Image" />
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorTitle}>{t('aboutUs.creators.title')}</h2>
                                    <h2 className={styles.creatorName}>{t('aboutUs.creators.efremova.name')}</h2>
                                </div>
                                <div className={styles.creator1Wrapper}>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.efremova.text1')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.efremova.text2')}
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        {t('aboutUs.creators.efremova.text3')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.efremova.text4')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.efremova.text5')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        <span>{t('aboutUs.creators.efremova.text6')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.creator2} style={{ backgroundImage: `url(${images.aboutUsBackground3Image})` }}>
                    <div className="container">
                        <div className={styles.creator2Middle}>
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorName}>{t('aboutUs.creators.semenova.name')}</h2>
                                </div>
                                <div className={styles.creator2Wrapper}>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.semenova.text1')}
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        {t('aboutUs.creators.semenova.text2')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.semenova.text3')}
                                    </p>
                                </div>
                            </div>
                            <img className={styles.creator2Img} src={images.aboutUsDoctor4Image} alt="aboutUsDoctor4Image" />
                        </div>
                    </div>
                </section>

                <section className={styles.creator1}>
                    <div className="container">
                        <div className={styles.creator2Middle}>
                            <img className={styles.creator3Img} src={images.aboutUsDoctor5Image} alt="aboutUsDoctor5Image" />
                            <div className={styles.creatorInfo}>
                                <div className={styles.creatorInfoTop}>
                                    <h2 className={styles.creatorName}>{t('aboutUs.creators.shostka.name')}</h2>
                                </div>
                                <div className={styles.creator2Wrapper}>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.shostka.text1')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.shostka.text2')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.shostka.text3')}
                                    </p>
                                    <p className={styles.creatorTextGradient}>
                                        {t('aboutUs.creators.shostka.text4')}
                                    </p>
                                    <p className={styles.creatorText}>
                                        {t('aboutUs.creators.shostka.text5')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.volunteers} style={{ backgroundImage: `url(${images.aboutUsBackground7Image})` }}>
                    <div className="container">
                        <div className={styles.volunteersWrapper}>
                            <h2 className={styles.volunteersTitle}>{t('aboutUs.volunteers.title')}</h2>
                            <div className={styles.volunteersItems}>
                                <div className={styles.volunteersItem}>
                                    <div className={styles.volunteersPerson}>
                                        <img src={images.aboutUsPerson1Image} alt="aboutUsPerson1Image" />
                                    </div>
                                    <div className={styles.volunteersInfo}>
                                        <h2 className={styles.volunteersName}>{t('aboutUs.volunteers.ashurov.name')}</h2>
                                        <p className={styles.volunteersText}>{t('aboutUs.volunteers.ashurov.text1')}</p>
                                        <p className={styles.volunteersText}>{t('aboutUs.volunteers.ashurov.text2')}</p>
                                    </div>
                                </div>
                                <div className={styles.volunteersItem}>
                                    <div className={styles.volunteersPerson}>
                                        <img src={images.aboutUsPerson2Image} alt="aboutUsPerson2Image" />
                                    </div>
                                    <div className={styles.volunteersInfo}>
                                        <h2 className={styles.volunteersName}>{t('aboutUs.volunteers.shushakova.name')}</h2>
                                        <p className={styles.volunteersText}>{t('aboutUs.volunteers.shushakova.text1')}</p>
                                        <p className={styles.volunteersText}>{t('aboutUs.volunteers.shushakova.text2')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.treatment} id="sz-clgaz">
                    <div className="container">
                        <div className={styles.treatmentWrapper}>
                            <div className={styles.treatmentTop}>
                                <div className={styles.treatmentTopWrapper}>
                                    <h2 className={styles.treatmentTitle}>{t('aboutUs.treatment.title')}</h2>
                                    <p className={styles.treatmentText}>
                                        {t('aboutUs.treatment.text')}
                                    </p>
                                </div>
                                <div className={styles.treatmentLogo}>
                                    <img src={icons.logoIcon} className={styles.treatmentLogoImg} alt="logoIcon" />
                                    <a href="/" className={styles.treatmentLogoTitle}>
                                        <span>{t('aboutUs.treatment.logoTitle')}</span>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.treatmentItems}>
                                <div className={styles.treatmentItem}>
                                    <h2 className={styles.treatmentItemTitle}>{t('aboutUs.treatment.mainDirections')}</h2>
                                    <ul className={styles.treatmentListItems}>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.direction1')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.direction2')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.direction3')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.direction4')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.direction5')}
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.treatmentItem}>
                                    <h2 className={styles.treatmentItemTitle}>{t('aboutUs.treatment.diseases')}</h2>
                                    <ul className={styles.treatmentListItems}>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.disease1')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.disease2')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.disease3')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.disease4')}
                                        </li>
                                        <li className={styles.treatmentListItem}>
                                            <span>—</span> {t('aboutUs.treatment.disease5')}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.location}>
                    <div className="container">
                        <div className={styles.locationMiddle}>
                            <div className={styles.locationLeft}>
                                <h2 className={styles.locationTitle}>{t('aboutUs.location.title')}</h2>
                                <div className={styles.locationWrapper}>
                                    <a href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1" className={styles.locationText}><span>{t('aboutUs.location.addressLabel')}:</span> {t('aboutUs.location.address')}</a>
                                    <p className={styles.locationText}><span>{t('aboutUs.location.hoursLabel')}:</span> {t('aboutUs.location.hours')}</p>
                                    <p className={styles.locationText}><span>{t('aboutUs.location.directorLabel')}</span> {t('aboutUs.location.director')}</p>
                                </div>
                            </div>
                            <div className={styles.locationRight}>
                                <a href="https://yandex.ru/maps/2/saint-petersburg/house/piskaryovskiy_prospekt_47/Z0kYcgRhSkcOQFtjfXV5cnhhZw==/?ll=30.431329%2C59.983423&z=17.1">
                                    <img src={images.aboutUsLocationCartImage} alt="aboutUsLocationCartImage" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.documents} id="documents" style={{ backgroundImage: `url(${images.aboutUsBackground5Image})` }}>
                    <div className="container">
                        <div className={styles.documentsWrapper}>
                            <h2 className={styles.documentsTitle}>{t('aboutUs.documents.title')}</h2>
                            <div className={styles.documentsItems}>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">{t('aboutUs.documents.document1')}</a></span>
                                </div>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">{t('aboutUs.documents.document2')}</a></span>
                                </div>
                                <div className={styles.documentsItem}>
                                    <img src={icons.pdfIcon} alt="pdfIcon" />
                                    <span><a href="#">{t('aboutUs.documents.document3')}</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.partners} id="partners">
                    <div className="container">
                        <div className={styles.partnersWrapper}>
                            <h2 className={styles.partnersTitle}>{t('aboutUs.partners.title')}</h2>
                            <table className={styles.partnersItems}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.universityIcon} alt="universityIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>{t('aboutUs.partners.university.name')}</p>
                                                    <p className={styles.partnersLink}>{t('aboutUs.partners.university.website')}: <a href="https://szgmu.ru/rus/">https://szgmu.ru/rus/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.melonIcon} alt="melonIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>{t('aboutUs.partners.melon.name')}</p>
                                                    <p className={styles.partnersLink}>{t('aboutUs.partners.melon.website')}: <a href="https://melonbio.ru/">https://melonbio.ru/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={styles.partnersItem}>
                                                <img src={icons.societyIcon} alt="societyIcon" />
                                                <div className={styles.partnersInfo}>
                                                    <p className={styles.partnersText}>{t('aboutUs.partners.society.name')}</p>
                                                    <p className={styles.partnersLink}>{t('aboutUs.partners.society.website')}: <a href="https://gastro-gepa.ru/">https://gastro-gepa.ru/</a></p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </>
    );
}
