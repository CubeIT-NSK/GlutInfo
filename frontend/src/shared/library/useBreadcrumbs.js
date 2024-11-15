import { useLocation } from 'react-router-dom';
import breadcrumbMap from '../config/breadcrumbs';

function findBreadcrumbName(path, map) {
  for (let item of map) {
    if (item.link === path) {
      return item.label;
    } else if (item.children) {
      const nestedResult = findBreadcrumbName(path, item.children);
      if (nestedResult) return nestedResult;
    }
  }
  return null;
}

export function useBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((_, index) => {
    const fullPath = `/${paths.slice(0, index + 1).join('/')}`;

    const breadcrumbName = findBreadcrumbName(fullPath, breadcrumbMap) || fullPath.replace('-', ' ');

    return {
      path: fullPath,
      name: breadcrumbName,
    };
  });

  return breadcrumbs;
}
