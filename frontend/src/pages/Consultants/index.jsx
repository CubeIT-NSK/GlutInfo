import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import images from "../../shared/resources/images";
import Button from "../../shared/components/Buttons";
import SideLink from "../../shared/components/SideLink";
import { useTranslation } from "../../hooks/useTranslation";
import { api } from "../../shared/api/api";

export default function ConsultsPage() {
    const { t, language } = useTranslation();
    const navigate = useNavigate();
    const [consultants, setConsultants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchConsultants = useCallback(async (categoryId = null) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (categoryId) {
                params.append('category_id', categoryId);
            }
            params.append('is_active', 'true');
            
            const response = await api.get(`/consultants-extended/consultants?${params}`);
            setConsultants(response.data);
        } catch (error) {
            console.error('Error fetching consultants:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await api.get('/consultants-extended/categories?is_active=true');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchConsultants();
    }, [fetchCategories, fetchConsultants]);

    const handleCategoryFilter = useCallback((categoryId) => {
        setSelectedCategory(categoryId);
        fetchConsultants(categoryId);
    }, [fetchConsultants]);

    const handleConsultantClick = useCallback((consultantId) => {
        navigate(`/consultants/${consultantId}`);
    }, [navigate]);

    const handleBookAppointment = useCallback((consultantId) => {
        navigate(`/profile-patient/make-appointment?consultant_id=${consultantId}`);
    }, [navigate]);

    const getConsultantName = useCallback((consultant) => {
        return language === 'ru' ? consultant.full_name_ru : consultant.full_name_en;
    }, [language]);

    const getConsultantDescription = useCallback((consultant) => {
        if (language === 'ru') {
            return consultant.description1_ru || consultant.description1_en;
        }
        return consultant.description1_en || consultant.description1_ru;
    }, [language]);

    const getCategoryLabel = useCallback((category) => {
        if (!category) {
            return '';
        }
        if (language === 'ru') {
            return category.name_ru || category.name_en || '';
        }
        return category.name_en || category.name_ru || '';
    }, [language]);

    const getConsultantCategories = useCallback((consultant) => {
        if (!consultant.categories || consultant.categories.length === 0) {
            return '';
        }
        return consultant.categories.map(getCategoryLabel).filter(Boolean).join(', ');
    }, [getCategoryLabel]);

    return (
        <>
            <SideLink />

            <section className={styles.consultsSection}>
                <div className="container">
                    <div className={styles.consultsWrapper}>
                        <div className={styles.consultsHeader}>
                            <div className={styles.consultsLeft}>
                                <h2 className={styles.consultsTitle}>{t('consultants.title')}</h2>
                                <div className={styles.consultsLeftItems}>
                                    <Button
                                        variant="gray"
                                        color="gray"
                                        padding="6px 10px"
                                        onClick={() => handleCategoryFilter(null)}
                                        className={selectedCategory === null ? styles.activeCategory : ''}
                                    >
                                        {t('consultants.all')}
                                    </Button>
                                    {categories.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant="gray"
                                            color="gray"
                                            padding="6px 10px"
                                            onClick={() => handleCategoryFilter(category.id)}
                                            className={selectedCategory === category.id ? styles.activeCategory : ''}
                                        >
                                            {getCategoryLabel(category)}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {loading ? (
                            <div className={styles.loading}>{t('consultants.loading')}</div>
                        ) : (
                            <div className={styles.consultsCardWrapper}>
                                {consultants.map((consultant) => (
                                    <div key={consultant.id} className={styles.consultsCardItem}>
                                        <img 
                                            src={consultant.photo || images.consultImage} 
                                            alt={getConsultantName(consultant)} 
                                        />
                                        <div className={styles.consultsCardItemText}>
                                            <h2 className={styles.consultsCardItemTextWHead}>
                                                {getConsultantName(consultant)}
                                            </h2>
                                            <div className={styles.consultsCardItemTextW}>
                                                <p className={styles.consultsCardItemTextWPost}>
                                                    {getConsultantCategories(consultant)}
                                                </p>
                                                <p className={styles.consultsCardItemTextWPost}>
                                                    {getConsultantDescription(consultant)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.consultsCardItemBtns}>
                                            <Button
                                                variant="gradient"
                                                padding="22.5px 125.5px"
                                                onClick={() => handleBookAppointment(consultant.id)}
                                            >
                                                {t('consultants.book')}
                                            </Button>
                                            <Button
                                                variant="white"
                                                padding="22.5px 125.5px"
                                                onClick={() => handleConsultantClick(consultant.id)}
                                            >
                                                {t('consultants.details')}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
