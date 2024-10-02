import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './index.module.css';
import icons from '../../resources/icon';
import { menuItems } from './menuItems';

const Header = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isDonateMenuVisible, setDonateMenuVisible] = useState(false);
  const donateMenuRef = useRef(null);
  const headerRef = useRef(null);

  const handleToggleDropdown = useCallback((index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

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
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

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
              <a href="https://t.me/" className={styles.socialIconText}>
                <img src={icons.telegramIcon} alt="telegramIcon" />
                Наш телеграм канал
              </a>
                <div className={styles.donateWrapper}>
                  <button onClick={handleToggleDonateMenu} className={styles.socialIconText}>
                    <img src={icons.donateIcon} alt="donateIcon" />
                    Пожертвовать
                  </button>
                  <div
                    ref={donateMenuRef}
                    className={`${styles.donateMenu} ${isDonateMenuVisible ? styles.showDonateMenu : ''}`}
                  >
                    <div className={styles.donateMenuText}>
                      <p>Сервис создан благодаря инициативе сотрудников Северо-Западного Центра лечения глютен-ассоциированных заболеваний и поддержке пациентского сообщества.</p>
                       <p>Мы будем благодарны любой сумме для продвижения нашего дела. Каждое пожертвование будет направлено на реализацию социальных программ для больных целиакией.</p>
                    </div>
                    <button className={styles.donateButton}>Пожертвовать</button>
                  </div>
                </div>

            </div>
            <div className={styles.icons}>
              {['searchIcon', 'callIcon', 'avatarIcon', 'languageIcon'].map((icon) => (
                <button key={icon} className={styles.iconButton}>
                  <img src={icons[icon]} alt={icon} />
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
      </header>
    </div>
  );
};

export default Header;
