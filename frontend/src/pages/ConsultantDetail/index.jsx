import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideLink from '../../shared/components/SideLink';
import Button from '../../shared/components/Buttons';
import styles from './index.module.css';
import images from '../../shared/resources/images';
import icons from '../../shared/resources/icon';
import { useTranslation } from '../../hooks/useTranslation';
import { api } from '../../shared/api/api';

const galleryLayoutClasses = [
  styles.galleryMiniMediumCard,
  styles.galleryMedMediumCard,
  styles.galleryBigCard,
  styles.gallerySmallCard,
  styles.gallerySmallCard,
  styles.galleryMediumCard,
];

const formatDate = (value, language) => {
  if (!value) {
    return '';
  }
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-GB');
  } catch (error) {
    return value;
  }
};

const splitTextIntoLines = (text) => {
  if (!text) {
    return [];
  }
  return text
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function ConsultantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const [consultant, setConsultant] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('education');
  const [expandedServices, setExpandedServices] = useState({});

  const consultantName = useMemo(() => {
    if (!consultant) {
      return '';
    }
    return language === 'ru' ? consultant.full_name_ru : consultant.full_name_en;
  }, [consultant, language]);

  const categoriesText = useMemo(() => {
    if (!consultant || !consultant.categories || consultant.categories.length === 0) {
      return '';
    }
    return consultant.categories
      .map((category) => (language === 'ru' ? category.name_ru : category.name_en) || '')
      .filter(Boolean)
      .join(', ');
  }, [consultant, language]);

  const descriptions = useMemo(() => {
    if (!consultant) {
      return [];
    }
    const first = language === 'ru'
      ? consultant.description1_ru || consultant.description1_en
      : consultant.description1_en || consultant.description1_ru;
    const second = language === 'ru'
      ? consultant.description2_ru || consultant.description2_en
      : consultant.description2_en || consultant.description2_ru;
    return [first, second].filter(Boolean);
  }, [consultant, language]);

  const educationLines = useMemo(() => {
    if (!consultant) {
      return [];
    }
    const educationText = language === 'ru'
      ? consultant.education_ru || consultant.education_en
      : consultant.education_en || consultant.education_ru;
    return splitTextIntoLines(educationText);
  }, [consultant, language]);

  const documentsList = useMemo(() => consultant?.documents || [], [consultant]);

  const galleryItems = useMemo(() => consultant?.photo_gallery || [], [consultant]);

  const videoSrc = consultant?.video_presentation || '';

  const fetchConsultant = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/consultants-extended/consultants/${id}`);
      setConsultant(response.data);
    } catch (error) {
      console.error('Error fetching consultant:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchServices = useCallback(async () => {
    try {
      const response = await api.get(`/consultants-extended/consultants/${id}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/consultants-extended/consultants/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchConsultant();
    fetchServices();
    fetchReviews();
  }, [fetchConsultant, fetchServices, fetchReviews]);

  const handleToggleService = useCallback((serviceId) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  }, []);

  const handleBookAppointment = useCallback(() => {
    navigate(`/profile-patient/make-appointment?consultant_id=${id}`);
  }, [navigate, id]);

  if (loading) {
    return (
      <>
        <SideLink />
        <div className="container">
          <p>{t('consultants.loading')}</p>
        </div>
      </>
    );
  }

  if (!consultant) {
    return (
      <>
        <SideLink />
        <div className="container">
          <p>{t('consultants.noConsultants')}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SideLink />

      <section className={styles.profileSection}>
        <div className="container">
          <div className={styles.consProfileWrapper}>
            <div className={styles.consProfileLeftWrapper}>
              <div className={styles.consProfileLeftTop}>
                <h1 className={styles.consultantName}>{consultantName}</h1>
                {categoriesText && (
                  <p className={styles.consultantTitle}>{categoriesText}</p>
                )}
                {descriptions.length > 0 && (
                  <ul className={styles.consultantDescriptionList}>
                    {descriptions.map((text, index) => (
                      <li key={index} className={styles.consultantDescriptionItem}>
                        <span className={styles.yellowDash} />
                        <p>{text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {services.length > 0 && (
                <div className={styles.serviceWrapper}>
                  {services.map((service) => {
                    const title = language === 'ru' ? service.title_ru : service.title_en;
                    const description = language === 'ru'
                      ? service.description_ru || service.description_en
                      : service.description_en || service.description_ru;
                    const isExpanded = Boolean(expandedServices[service.id]);
                    return (
                      <div key={service.id} className={styles.serviceItem}>
                        <div className={styles.serviceHeader}>
                          <div>
                            <div className={styles.serviceTi}>{title}</div>
                            {(service.price || service.duration_minutes) && (
                              <div>
                                {service.price ? `${service.price} ₽` : ''}
                                {service.price && service.duration_minutes ? ' · ' : ''}
                                {service.duration_minutes ? `${service.duration_minutes} мин` : ''}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className={styles.expandButton}
                            onClick={() => handleToggleService(service.id)}
                          >
                            {isExpanded ? t('consultants.hideDetails') : t('consultants.moreDetails')}
                          </button>
                        </div>
                        <div
                          className={`${styles.serviceDetails} ${isExpanded ? styles.expanded : ''}`}
                          style={{ maxHeight: isExpanded ? '1000px' : '0px' }}
                        >
                          <p>{description}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div>
                    <Button
                      variant="gradient"
                      padding="24.5px 275.5px"
                      onClick={handleBookAppointment}
                    >
                      {t('consultants.book')}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.consProfileRightWrapper}>
              <img
                src={consultant.photo || images.profileConsImage}
                alt={consultantName}
                className={styles.consultantImage}
              />
              {(consultant.work_experience || consultant.scientific_works_count) && (
                <div className={styles.experienceWrapper}>
                  {consultant.work_experience ? (
                    <div className={styles.experienceYearsWrapper}>
                      <p className={styles.experienceYearsNumber}>{consultant.work_experience}</p>
                      <span className={styles.experienceYears}>{t('consultantDetail.experience')}</span>
                    </div>
                  ) : null}
                  {consultant.scientific_works_count ? (
                    <div className={styles.experienceYearsWrapper}>
                      <p className={styles.experienceYearsNumber}>{consultant.scientific_works_count}</p>
                      <span className={styles.experienceYears}>{t('consultantDetail.scientificWorks')}</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {(educationLines.length > 0 || documentsList.length > 0) && (
        <section className={styles.educationTabs}>
          <div className="container">
            <div className={styles.tabWrapper}>
              <div className={styles.tabHeaders}>
                {educationLines.length > 0 && (
                  <button
                    type="button"
                    className={`${styles.tabButton} ${activeTab === 'education' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('education')}
                  >
                    <span>{t('consultantDetail.education')}</span>
                  </button>
                )}
                {documentsList.length > 0 && (
                  <button
                    type="button"
                    className={`${styles.tabButton} ${activeTab === 'documents' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('documents')}
                  >
                    <span>{t('consultantDetail.documents')}</span>
                  </button>
                )}
              </div>

              <div className={styles.tabContentWrapper}>
                {educationLines.length > 0 && (
                  <div className={`${styles.tabContent} ${activeTab === 'education' ? styles.active : ''}`}>
                    <div className={styles.educationContent}>
                      {educationLines.map((line, index) => (
                        <div key={index} className={styles.educationItem}>
                          <span className={styles.yellowDash} />
                          <p>{line}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {documentsList.length > 0 && (
                  <div className={`${styles.tabContent} ${activeTab === 'documents' ? styles.active : ''}`}>
                    <div className={styles.documentsContent}>
                      <div className={styles.documentsList}>
                        {documentsList.map((documentUrl, index) => (
                          <a
                            key={documentUrl}
                            href={documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.documentLink}
                          >
                            <img src={icons.pdfIcon} alt="pdf" width={24} height={24} />
                            {t('consultantDetail.document')} {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {videoSrc && (
        <section className={styles.videoСutawaySection}>
          <div className="container">
            <div className={styles.videoСutawayWrapper}>
              <h2 className={styles.videoHeader}>{t('consultantDetail.videoPresentation')}</h2>
              <div className={styles.videoBannerWrapper}>
                <video className={styles.videoBanner} src={videoSrc} controls>
                  {t('consultantDetail.videoNotSupported')}
                </video>
              </div>
            </div>
          </div>
        </section>
      )}

      {galleryItems.length > 0 && (
        <section className={styles.phGalCertificatesSection}>
          <div className="container">
            <h2 className={styles.galleryHeader}>{t('consultantDetail.photoGallery')}</h2>
            <div className={styles.galleryWrapper}>
              <div className={styles.galleryLeftCol}>
                <div className={styles.galleryLeftColTop}>
                  {galleryItems.slice(0, 2).map((url, index) => (
                    <div key={url} className={styles.galleryCardWrapper}>
                      <div
                        className={`${styles.galleryCard} ${galleryLayoutClasses[index]}`}
                        style={{ backgroundImage: `url(${url})` }}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.galleryLeftColTop}>
                  {galleryItems[2] && (
                    <div className={styles.galleryCardWrapper}>
                      <div
                        className={`${styles.galleryCard} ${galleryLayoutClasses[2]}`}
                        style={{ backgroundImage: `url(${galleryItems[2]})` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.galleryRightCol}>
                <div className={styles.galleryRightColTop}>
                  {galleryItems.slice(3, 5).map((url, index) => (
                    <div key={url} className={styles.galleryCardWrapper}>
                      <div
                        className={`${styles.galleryCard} ${galleryLayoutClasses[index + 3]}`}
                        style={{ backgroundImage: `url(${url})` }}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.galleryLeftColTop}>
                  {galleryItems[5] && (
                    <div className={styles.galleryCardWrapper}>
                      <div
                        className={`${styles.galleryCard} ${galleryLayoutClasses[5]}`}
                        style={{ backgroundImage: `url(${galleryItems[5]})` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <div className={styles.reviewsWrapper}>
              <div className={styles.reviewsHeader}>{t('consultantDetail.reviews')}</div>
              <div className={styles.reviewsCarts}>
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className={styles.reviewsCart}>
                    <div className={styles.reviewsCartTop}>
                      <img src={icons.reviewsMarksIcon} alt="quote" />
                    </div>
                    <div className={styles.reviewsCartBottom}>
                      <div className={styles.reviewsStars}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className={styles.reviewsStarsWrapper}>
                            <img
                              src={icons.reviewsStarsIcon}
                              alt="star"
                              style={{ opacity: index < review.rating ? 1 : 0.3 }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className={styles.reviewsCartUsers}>
                        <p className={styles.reviewsCartUser}>{review.reviewer_name}</p>
                        <p className={styles.reviewsCartUserDate}>
                          {formatDate(review.review_date, language)}
                        </p>
                      </div>
                      <div className={styles.reviewsCartComments}>
                        <p className={styles.reviewsCartCommentsText}>
                          {language === 'ru' ? review.review_text_ru : review.review_text_en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.reviewsShowBtn}>
                <Button variant="white" padding="20px 60px">
                  {t('consultants.moreReviews')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
