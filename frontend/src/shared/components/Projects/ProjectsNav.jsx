import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProjectsNav.module.css';
import { useTranslation } from '../../../hooks/useTranslation';

const ProjectsNav = ({ current }) => {
  const { t } = useTranslation();
  const items = [
    { to: '/our-projects/social-projects', key: 'social' },
    { to: '/our-projects/online-projects', key: 'online' },
    { to: '/our-projects/educational-projects', key: 'educational' },
    { to: '/our-projects/researches-projects', key: 'researches' },
    { to: '/our-projects/spefs-projects', key: 'spefs' }
  ];

  return (
    <nav className={styles.nav}>
      {items.map(item => (
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) =>
            [styles.link, (isActive || current === item.key) ? styles.active : ''].join(' ')
          }
        >
          {t(`projects.nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProjectsNav;
