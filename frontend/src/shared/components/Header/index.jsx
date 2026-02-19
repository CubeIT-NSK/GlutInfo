import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import icons from '../../resources/icon';
import AuthorizationModal from '../Modals/AuthorizationModal';
import ContactManagerModal from '../Modals/ContactManagerModal';
import styles from './index.module.css';
import { getMenuItems } from './menuItems';
import Button from '../Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { getUsersMe } from '../../api/api';
import { buildPatientProfileRoute, buildConsultantProfileRoute } from '../../utils/routes';

const Header = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isDonateMenuVisible, setDonateMenuVisible] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const donateMenuRef = useRef(null);
  const headerRef = useRef(null);
	const [isContactManagerModalOpen, setContactManagerModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { toggleLanguage, isRussian } = useLanguage();
  const { t } = useTranslation();

  const handleToggleDropdown = useCallback((index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const handleMenuLinkClick = useCallback((event, index, disableLink) => {
    if (disableLink) {
      event.preventDefault();
      handleToggleDropdown(index);
    }
  }, [handleToggleDropdown]);

  const handleToggleDonateMenu = useCallback(() => {
    setDonateMenuVisible((prevState) => !prevState);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (
      donateMenuRef.current && !donateMenuRef.current.contains(event.target) &&
      headerRef.current && !headerRef.current.contains(event.target)
    ) {
      setDonateMenuVisible(false);
      setOpenDropdownIndex(null);
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const toggleContactManagerModal = useCallback(() => {
		setContactManagerModalOpen((prevState) => !prevState);
	}, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prevState) => !prevState);
  }, []);

  const handleLanguageToggle = useCallback(() => {
    toggleLanguage();
  }, [toggleLanguage]);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMobileMenuItemClick = useCallback((event, disableLink) => {
    if (disableLink) {
      event.preventDefault();
      return;
    }
    handleMobileMenuClose();
  }, [handleMobileMenuClose]);

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      return;
    }
    try {
      const { status, data } = await getUsersMe();
      if (status === 200 && data) {
        setCurrentUser(data);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Не удалось получить информацию о пользователе', error);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (!isAuthModalOpen) {
      fetchCurrentUser();
    }
  }, [isAuthModalOpen, fetchCurrentUser]);

  const handleAvatarButtonClick = useCallback(() => {
    if (currentUser) {
      const destination = currentUser.role === 'patient'
        ? buildPatientProfileRoute(currentUser.id)
        : buildConsultantProfileRoute(currentUser.id);
      navigate(destination);
    } else {
      openAuthModal();
    }
  }, [currentUser, navigate, openAuthModal]);

  const profileButtonTitle = useMemo(() => {
    if (!currentUser) {
      return t('header.profileLoginTooltip');
    }
    return t('header.profileTooltip');
  }, [currentUser, t]);

  return (
    <div className="container" ref={headerRef}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <img src={icons.logoIcon} className={styles.logo} alt="logoIcon" />
            <a href="/" className={styles.mainTitle}>
              <span className={styles.gastroTitle}>{t('header.gastroTitle')}</span>{t('header.mainTitle').split('.')[1]}
            </a>
          </div>
          <Link to={'https://fasie.ru/'} className={styles.subTitle}>
            <div className={styles.subTitleText}>
            {t('header.subTitle')}
            </div>
            <img src={icons.fondIcon} className={styles.fond} alt="fond" />
          </Link>
            <div className={styles.headerRight}>
            <div className={styles.icons}>
              {['searchIcon', 'callIcon', 'avatarIcon', 'languageIcon'].map((icon) => (
                <button
                  key={icon}
                  className={styles.iconButton}
                  onClick={
                    icon === 'avatarIcon' ? handleAvatarButtonClick : 
                    icon === 'callIcon' ? toggleContactManagerModal : 
                    icon === 'languageIcon' ? handleLanguageToggle : null
                  }
                  title={
                    icon === 'languageIcon'
                      ? (isRussian ? 'Switch to English' : 'Переключить на русский')
                      : icon === 'avatarIcon'
                        ? profileButtonTitle
                        : ''
                  }
                >
                  <div className={styles.iconButtonContainer}>
                    {icon === 'languageIcon' ? (
                      <span className={styles.languageText}>
                        {isRussian ? 'EN' : 'RU'}
                      </span>
                    ) : (
                      <img src={icons[icon]} alt={icon} />
                    )}
                  </div>
                </button>
              ))}
              <button 
                className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonActive : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <nav className={styles.headerBottom}>
          <ul>
            {getMenuItems(t).map(({ label, link, hasDropdown, dropdownItems, disableLink = false }, index) => (
              <li
                key={index}
                onMouseEnter={() => handleToggleDropdown(index)}
                onMouseLeave={() => handleToggleDropdown(null)}
                className={styles.menuItem}
              >
                <a
                  href={link || '#'}
                  onClick={(event) => handleMenuLinkClick(event, index, disableLink)}
                >
                  {label}
                </a>
                {hasDropdown && (
                  <>
                    <img src={icons.arrowIcon} className={styles.arrowUl} alt="arrowIcon" />
                    <div className={`${styles.dropdownMenu} ${openDropdownIndex === index ? styles.show : ''}`}>
                      <ul>
                        {dropdownItems.map(({ label: subLabel, link: subLink }, subIndex) => (
                          <li key={subIndex}>
                            <a href={subLink}>{subLabel}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuLogo}>
                <img src={icons.logoIcon} alt="Logo" />
                <a href="/" className={styles.mobileMenuTitle}>
                  <span className={styles.gastroTitle}>{t('header.gastroTitle')}</span>{t('header.mainTitle').split('.')[1]}
                </a>
              </div>
              <button 
                className={styles.mobileMenuClose}
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <span></span>
                <span></span>
              </button>
            </div>
            <ul className={styles.mobileMenuList}>
              {getMenuItems(t).map(({ label, link, hasDropdown, dropdownItems, disableLink = false }, index) => (
                <li key={index} className={styles.mobileMenuItem}>
                  <a 
                    href={link || '#'} 
                    className={styles.mobileMenuLink}
                    onClick={(event) => handleMobileMenuItemClick(event, disableLink)}
                  >
                    {label}
                  </a>
                  {hasDropdown && (
                    <ul className={styles.mobileSubmenu}>
                      {dropdownItems.map(({ label: subLabel, link: subLink }, subIndex) => (
                        <li key={subIndex} className={styles.mobileSubmenuItem}>
                          <a 
                            href={subLink} 
                            className={styles.mobileSubmenuLink}
                            onClick={handleMobileMenuClose}
                          >
                            {subLabel}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileMenuSocialButtons}>
                <a href="https://t.me/gluteninfo" className={styles.mobileSocialButton}>
                  <img src={icons.telegramIcon} alt="Telegram" />
                  <span>{t('header.telegramChannel')}</span>
                </a>
                <div className={styles.mobileDonateWrapper}>
                  <button onClick={handleToggleDonateMenu} className={styles.mobileSocialButton}>
                    <img src={icons.donateIcon} alt="Donate" />
                    <span>{t('header.donate')}</span>
                  </button>
                  <div
                    ref={donateMenuRef}
                    className={`${styles.mobileDonateMenu} ${isDonateMenuVisible ? styles.showMobileDonateMenu : ''}`}
                  >
                    <div className={styles.mobileDonateMenuText}>
                      <p>{t('header.donateText1')}</p>
                      <p>{t('header.donateText2')}</p>
                    </div>
                    <Button
                      variant="gradient"
                      padding="10px 20px"
                      fontSize='mini'
                    >
                      {t('header.donateButton')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className={styles.mobileMenuLanguage}>
                <button onClick={handleLanguageToggle} className={styles.mobileLanguageButton}>
                  {isRussian ? 'EN' : 'RU'}
                </button>
              </div>
            </div>
          </div>
        </div>
            </header>
      <AuthorizationModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
			<ContactManagerModal isOpen={isContactManagerModalOpen} onClose={toggleContactManagerModal} />
    </div>
  );
};

export default Header;
