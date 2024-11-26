import styles from "./index.module.css";
import icons from '../../resources/icon'

const Footer = () => {
    return (
      <footer className={styles.footer}>
      	<div className="container">
      		<div className={styles.footerWrapper}>
      			<div className={styles.footerTop}>
      				<div className={styles.footerTopInfo}>
					<div className={styles.footerLogo}> <img src={icons.logoIcon} className={styles.logo} alt="Logo" />
						<a href='/' className={styles.mainTitle}> <span>ГАСТРОГЛЮТЕН.</span>ИНФО </a>
					</div>
					<div className={styles.footerContacts}>
						<p className={styles.contactsHeader}>Почта: <a href="mailto:gluten-center@mail.ru">gluten-center@mail.ru</a></p>
						<div className={styles.contactsHeaderGap}>
							<p className={styles.contactsHeader}>Номер: <a href="tel:+79697305778">+7-969-730-57-78</a></p>
							<p className={styles.contactsHeader} id={styles.contactsHeaderMarg}>Адрес: <span>СПб, пр. Пискаревский 47, корп. 24, 2 этаж</span> </p>
						</div>
					</div>
      				</div>
      				<div className={styles.footerBottomInfo}>
      					<div className={styles.footerSocialIcons}>
      						<a href="https://t.me/gluteninfo" className={styles.socialIconText} target="_blank" rel="noopener noreferrer"> <img src={icons.telegramIcon} alt="telegramIcon" /> </a>
      						<a href="https://whatsapp.com/link" className={styles.socialIconText} target="_blank" rel="noopener noreferrer"> <img src={icons.whatsappIcon} alt="whatsappIcon" /> </a>
      					</div> <a href="#privacy-policy" className={styles.footerPrivacy}>Политика конфиденциальности</a> </div>
      			</div>
      			<div className={styles.footerBottom}>
      				<div className={styles.footerBottomWrapper}>
      					<p className={styles.footerBottomWrapTopText} id={styles.fbwttLeft}>&copy; 2023. Все права на материалы сайта принадлежат нам (после оформления юр лица напишем название)</p>
      					<p className={styles.footerBottomWrapTopText} id={styles.fbwttRight}>При поддержке Северо-Западного центра
      						<br /> лечения глютен-ассоциированных заболеваний</p>
      				</div>
      				<p className={styles.footerBottomWrapBottomText}>ИНФОРМАЦИЯ НА ДАННОМ САЙТЕ НЕ ДОЛЖНА ИСПОЛЬЗОВАТЬСЯ ДЛЯ САМОСТОЯТЕЛЬНОЙ ДИАГНОСТИКИ И ЛЕЧЕНИЯ И НЕ МОЖЕТ БЫТЬ ЗАМЕНОЙ ОЧНОЙ КОНСУЛЬТАЦИИ ВРАЧА</p>
      			</div>
      		</div>
      	</div>
      </footer>
    );
}


export default Footer;
