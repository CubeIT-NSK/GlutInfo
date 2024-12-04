import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import icons from '../../resources/icon';
import AuthorizationModal from '../Modals/AuthorizationModal';
import ContactManagerModal from '../Modals/ContactManagerModal';
import Button from '../Buttons';
import { getUsersMe } from '../../api/api';
import { menuItems } from './menuItems';

import styles from './index.module.css';

const Header = () => {
  const [state, setState] = useState({
    openDropdownIndex: null,
    isDonateMenuVisible: false,
    isAuthModalOpen: false,
    isContactManagerModalOpen: false,
    isAuthenticated: false,
  });

  const donateMenuRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { status } = await getUsersMe();
      setState(prevState => ({ ...prevState, isAuthenticated: status === 200 }));
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleToggleDropdown = useCallback((index) => {
    setState(prevState => ({ ...prevState, openDropdownIndex: prevState.openDropdownIndex === index ? null : index }));
  }, []);

  const handleToggleDonateMenu = useCallback(() => {
    setState(prevState => ({ ...prevState, isDonateMenuVisible: !prevState.isDonateMenuVisible }));
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (
      donateMenuRef.current && !donateMenuRef.current.contains(event.target) &&
      headerRef.current && !headerRef.current.contains(event.target)
    ) {
      setState(prevState => ({ ...prevState, isDonateMenuVisible: false, openDropdownIndex: null }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  const handleAvatarClick = async () => {
    if (state.isAuthenticated) {
      try {
        const { data } = await getUsersMe();
        navigateToRolePage(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    } else {
      toggleAuthModal();
    }
  };

  const navigateToRolePage = (userData) => {
    const { role, id } = userData;
    const route = role === 'patient' ? `/profile-patient/${id}` : role === 'consultant' ? `/profile-consultant/${id}` : null;
    if (route) navigate(route);
    else console.error('Unknown role');
  };

  const toggleAuthModal = () => {
    setState(prevState => ({ ...prevState, isAuthModalOpen: !prevState.isAuthModalOpen }));
  };

  const toggleContactManagerModal = () => {
    setState(prevState => ({ ...prevState, isContactManagerModalOpen: !prevState.isContactManagerModalOpen }));
  };

  return (
    <div className="container" ref={headerRef}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <img src={icons.logoIcon} className={styles.logo} alt="logoIcon" />
            <a href="/" className={styles.mainTitle}>
              <span className={styles.gastroTitle}>ГАСТРОГЛЮТЕН.</span>ИНФО
            </a>
          </div>
          <div className={styles.subTitle}>
            <div className={styles.subTitleText}>
              Проект выполнен при поддержке «Фонда содействия инновациям»
            </div>
            <img src={icons.fondIcon} className={styles.fond} alt="fond" />
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerRightWrapper}>
              <a href="https://t.me/gluteninfo" className={styles.socialIconText}>
                <img src={icons.telegramIcon} alt="telegramIcon" />
                <span>Наш телеграм канал</span>
              </a>
              <div className={styles.donateWrapper}>
                <button onClick={handleToggleDonateMenu} className={styles.socialIconText}>
                  <img src={icons.donateIcon} alt="donateIcon" />
                  <span>Пожертвовать</span>
                </button>
                <div ref={donateMenuRef} className={`${styles.donateMenu} ${state.isDonateMenuVisible ? styles.showDonateMenu : ''}`}>
                  <div className={styles.donateMenuText}>
                    <p>Сервис создан благодаря инициативе сотрудников Северо-Западного Центра лечения глютен-ассоциированных заболеваний и поддержке пациентского сообщества.</p>
                    <p>Мы будем благодарны любой сумме для продвижения нашего дела. Каждое пожертвование будет направлено на реализацию социальных программ для больных целиакией.</p>
                  </div>
                  <Button variant="gradient" padding="10px 72.09px" fontSize='mini'>
                    Пожертвовать
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.icons}>
              {['searchIcon', 'callIcon', 'avatarIcon', 'languageIcon'].map((icon) => (
                <button
                  key={icon}
                  className={styles.iconButton}
                  onClick={icon === 'avatarIcon' ? handleAvatarClick : icon === 'callIcon' ? toggleContactManagerModal : null}
                >
                  <div className={styles.iconButtonContainer}>
                    <img src={icons[icon]} alt={icon} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className={styles.headerBottom}>
          <ul>
            {menuItems.map(({ label, link, hasDropdown, dropdownItems }, index) => (
              <li
                key={index}
                onMouseEnter={() => handleToggleDropdown(index)}
                onMouseLeave={() => handleToggleDropdown(null)}
                className={styles.menuItem}
              >
                <a href={link}>{label}</a>
                {hasDropdown && (
                  <>
                    <img src={icons.arrowIcon} className={styles.arrowUl} alt="arrowIcon" />
                    <div className={`${styles.dropdownMenu} ${state.openDropdownIndex === index ? styles.show : ''}`}>
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
      </header>
      <AuthorizationModal isOpen={state.isAuthModalOpen} onClose={toggleAuthModal} setIsAuthenticated={(status) => setState(prevState => ({ ...prevState, isAuthenticated: status }))} />
      <ContactManagerModal isOpen={state.isContactManagerModalOpen} onClose={toggleContactManagerModal} />
    </div>
  );
};

export default Header;
