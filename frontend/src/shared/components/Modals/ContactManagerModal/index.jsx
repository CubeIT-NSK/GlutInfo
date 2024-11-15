import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import icons from '../../../resources/icon';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from 'react-input-mask';
import Button from '../../Buttons';

const schema = yup.object().shape({
    name: yup.string().required("Введите ваше имя."),
    tel: yup.string().required("Введите мобильный телефон."),
    reason: yup.string().optional(),
});

const ContactManagerModal = ({ isOpen, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const scrollWidth = window.innerWidth - document.documentElement.clientWidth + 'px';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = scrollWidth;
        } else {
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleContactToManager = (data) => {
      console.log('Contact data:', data);
      setIsTransitioning(true);
      setTimeout(() => {
          setIsSubmitted(true);
          setIsTransitioning(false);
      }, 300);
  };

    return (
        <div className={styles.contactManagerModalOverlay} onClick={onClose}>
            <div className={styles.contactManagerModal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.contactManagerModalLeft} ${styles.modalSection} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
                    {isSubmitted ? (
                        <>
                            <h2 className={styles.contactManagerModalLeftNHText}>Ваша заявка
                                <span className={styles.contactManagerModalLeftHText}> успешно отправлена. </span>
                                Ожидайте звонка менеджера
                            </h2>
                            <img className={styles.cntManagerIcon} src={icons.cntManagerIcon} alt="cntManagerIcon" />
                        </>
                    ) : (
                        <>
                            <h2>Заполните форму и наш менеджер свяжется с Вами в ближайшее время</h2>
                            <form onSubmit={handleSubmit(handleContactToManager)}>
                                <div className={styles.contactManagerModalFormFWrapper}>
                                    <div className={styles.contactManagerModalFormWrapper}>
                                        <div className={styles.contactManagerModalFormErrorsWrapper}>
                                            <input
                                                type="text"
                                                placeholder="Ваше имя*"
                                                {...register("name")}
                                                className={`${styles.authFormInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                                            />
                                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                                        </div>
                                        <div className={styles.contactManagerModalFormErrorsWrapper}>
                                            <InputMask
                                                mask="+7 (999) 999-99-99"
                                                {...register("tel")}
                                                placeholder="Мобильный телефон*"
                                                className={`${styles.authFormInput} ${errors.tel ? styles.errorInput : ''} ${errors.tel ? styles.errorText : ''} ${errors.tel ? styles.redPlaceholder : ''}`}
                                            />
                                            {errors.tel && <p className={styles.error}>{errors.tel.message}</p>}
                                        </div>
                                        <div className={styles.contactManagerModalFormErrorsWrapper}>
                                            <input
                                                type="text"
                                                placeholder="Причина обращения (необязательно)"
                                                {...register("reason")}
                                                className={`${styles.authFormInput} ${errors.reason ? styles.errorInput : ''} ${errors.reason ? styles.errorText : ''} ${errors.reason ? styles.redPlaceholder : ''}`}
                                            />
                                            {errors.reason && <p className={styles.error}>{errors.reason.message}</p>}
                                        </div>
                                        <Button
                                            variant="gradient"
                                            type="submit"
                                            fontSize='small'
                                            padding="8.5px 106.5px"
                                        >
                                            Заказать звонок
                                        </Button>
                                        <div className={styles.contactManagerModalRadioWrapper}>
                                            <input
                                                type="radio"
                                                defaultChecked
                                                readOnly
                                                className={styles.contactManagerModalRadio}
                                            />
                                            <label>Заполняя форму, я принимаю <a href="#">условия обработки персональных данных</a></label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
                <div className={styles.contactManagerModalRight}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <img src={icons.closeWhiteIcon} alt="closeIcon" />
                    </button>
                    <h2>Также Вы можете написать нам в мессенджере или на электронную почту</h2>
                    <div className={styles.contactManagerModalRightLinks}>
                        <div className={styles.contactManagerModalRightLink}>
                            <div className={styles.contactManagerModalRightIcons}>
                                <img src={icons.telegramIcon} alt="telegramIcon" />
                                <img src={icons.whatsappIcon} alt="whatsappIcon" />
                            </div>
                            <a href="tel:+79697305778">+7 969 730 57 78</a>
                        </div>
                        <div className={styles.contactManagerModalRightLink}>
                            <div className={styles.contactManagerModalRightIcons}>
                                <img src={icons.mailIcon} alt="mailIcon" />
                            </div>
                            <a href="mailto:gluten-center@mail.ru">gluten-center@mail.ru</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactManagerModal;
