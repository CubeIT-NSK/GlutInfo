export const buildPatientProfileRoute = (userId, suffix = '') => {
  if (!userId) {
    return '/profile-patient';
  }
  return `/profile-patient/${userId}${suffix}`;
};

export const buildConsultantProfileRoute = (userId, suffix = '') => {
  // Для кабинета консультанта пока используется статический маршрут
  return `/profile-consultant${suffix}`;
};
