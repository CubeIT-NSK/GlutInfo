import styles from "./index.module.css";
import icons from '../../resources/icon'
import { useTranslation } from '../../../hooks/useTranslation';

const Footer = () => {
    const { t } = useTranslation();
    
    return (
      <footer className={styles.footer}>
      	<div className="container">
      		<div className={styles.footerWrapper}>
      			<div className={styles.footerTop}>
      				<div className={styles.footerTopInfo}>
					<div className={styles.footerLogo}> <img src={icons.logoIcon} className={styles.logo} alt="Logo" />
						<a href='/' className={styles.mainTitle}> <span>{t('footer.gastroTitle')}</span>{t('footer.mainTitle')} </a>
					</div>
					<div className={styles.footerContacts}>
						<p className={styles.contactsHeader}>{t('footer.email')}: <a href="mailto:gluten-center@mail.ru">gluten-center@mail.ru</a></p>
						<div className={styles.contactsHeaderGap}>
							<p className={styles.contactsHeader}>{t('footer.phone')}: <a href="tel:+79697305778">+7-969-730-57-78</a></p>
							<p className={styles.contactsHeader} id={styles.contactsHeaderMarg}>{t('footer.address')}: <span>{t('footer.addressValue')}</span> </p>
						</div>
					</div>
      				</div>
      				<div className={styles.footerBottomInfo}>
      					<div className={styles.footerSocialIcons}>
      						<a href="https://t.me/gluteninfo" className={styles.socialIconText} target="_blank" rel="noopener noreferrer"> <img src={icons.telegramIcon} alt="telegramIcon" /> </a>
      						<a href="https://whatsapp.com/link" className={styles.socialIconText} target="_blank" rel="noopener noreferrer"> <img src={icons.whatsappIcon} alt="whatsappIcon" /> </a>
      					</div> <a href="#privacy-policy" className={styles.footerPrivacy}>{t('footer.privacyPolicy')}</a> </div>
      			</div>
      			<div className={styles.footerBottom}>
      				<div className={styles.footerBottomWrapper}>
      					<p className={styles.footerBottomWrapTopText} id={styles.fbwttLeft}>{t('footer.copyright')}</p>
      					<p className={styles.footerBottomWrapTopText} id={styles.fbwttRight}>{t('footer.support')}
      						<br /> {t('footer.supportCenter')}</p>
      				</div>
      				<p className={styles.footerBottomWrapBottomText}>{t('footer.disclaimer')}</p>
      			</div>
      		</div>
      	</div>
      </footer>
    );
}


export default Footer;
