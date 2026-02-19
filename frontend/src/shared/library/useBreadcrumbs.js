import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import breadcrumbMap from '../config/breadcrumbs';

const splitPath = (value) => value.split('/').filter(Boolean);

const isPatternMatch = (path, pattern) => {
  if (!pattern) {
    return false;
  }
  if (pattern === path) {
    return true;
  }
  const pathParts = splitPath(path);
  const patternParts = splitPath(pattern);
  if (pathParts.length !== patternParts.length) {
    return false;
  }
  return patternParts.every((part, index) => part.startsWith(':') || part === pathParts[index]);
};

function findBreadcrumbName(path, map, t) {
  for (const item of map) {
    if (item.link && isPatternMatch(path, item.link)) {
      return t(`breadcrumbs.${item.name}`) || item.label;
    }
    if (item.children) {
      const nestedResult = findBreadcrumbName(path, item.children, t);
      if (nestedResult) {
        return nestedResult;
      }
    }
  }
  return null;
}

const formatFallbackName = (path) => {
  const segments = splitPath(path);
  if (segments.length === 0) {
    return '';
  }
  return decodeURIComponent(segments[segments.length - 1]).replace(/[-_]/g, ' ');
};

export function useBreadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();
  const paths = splitPath(location.pathname);

  const navigationOverrides = {
    '/gluten-free-diet': '/about-diet/gluten-diet',
    '/about-diet': '/about-diet/gluten-diet',
  };

  const breadcrumbs = paths.map((_, index) => {
    const fullPath = `/${paths.slice(0, index + 1).join('/')}`;
    const breadcrumbName =
      findBreadcrumbName(fullPath, breadcrumbMap, t) || formatFallbackName(fullPath);

    return {
      path: navigationOverrides[fullPath] || fullPath,
      name: breadcrumbName,
    };
  });

  return breadcrumbs;
}
