import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../../library/useBreadcrumbs';
import { useTranslation } from '../../../hooks/useTranslation';
import styles from './index.module.css';
import icons from '../../resources/icon';

const SideLink = () => {
  const breadcrumbs = useBreadcrumbs();
  const { t } = useTranslation();

  return (
    <section className="sideLink">
        <div className="container">
            <div className={styles.sideLinkWrapper}>
              <Link to="/" className={styles.sideLink}>{t('sidelink.home')}</Link>
              {breadcrumbs.length > 0 && (
                <img src={icons.arrowSideIcon} className={styles.sideLinkIcon} alt="arrowSideIcon" />
              )}
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.path}>
                  <Link to={breadcrumb.path} className={styles.sideLink}>
                    {breadcrumb.name}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <img src={icons.arrowSideIcon} className={styles.sideLinkIcon} alt="arrowSideIcon" />
                  )}
                </React.Fragment>
              ))}
            </div>
        </div>
    </section>

  );
};

export default SideLink;
