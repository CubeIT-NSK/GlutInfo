const breadcrumbMap = [
  { name: 'home', label: 'Главная страница', link: '/' },
  { name: 'registration', label: 'Регистрация', link: '/registration' },
  { name: 'success', label: 'Успех', link: '/success' },
  { name: '404', label: 'Ошибка 404', link: '/404' },
  { name: 'pattern', label: 'Шаблон', link: '/pattern' },

  {
    name: 'profiles',
    label: 'Профили',
    children: [
      {
        name: 'patient',
        label: 'Пациент',
        children: [
          { name: 'profile-patient', label: 'Профиль пациента', link: '/profile-patient' },
          { name: 'fill-patient', label: 'Заполнение профиля пациента', link: '/profile-patient/fill' },
          { name: 'edit-profile-patient', label: 'Редактирование профиля пациента', link: '/profile-patient/edit' },
          { name: 'my-consultations', label: 'Мои консультации', link: '/profile-patient/my-consultations' },
          { name: 'make-appointment', label: 'Записаться на консультацию', link: '/profile-patient/make-appointment' },
          { name: 'documents', label: 'Документы', link: '/profile-patient/my-documents' },
          { name: 'messages', label: 'Сообщения', link: '/profile-patient/messages' },
        ],
      },
      {
        name: 'consultant',
        label: 'Консультант',
        children: [
          { name: 'profile-consultant', label: 'Профиль консультанта', link: '/profile-consultant' },
          { name: 'fill-consultant', label: 'Заполнение профиля консультанта', link: '/profile-consultant/fill' },
          { name: 'edit-profile-consultant', label: 'Редактирование профиля консультанта', link: '/profile-consultant/edit' },
          { name: 'my-consultations', label: 'Мои консультации', link: '/profile-consultant/my-consultations' },
          { name: 'messages', label: 'Сообщения', link: '/profile-consultant/messages' },
        ],
      },
    ],
  },

  {
    name: 'questionnaires',
    label: 'Анкеты',
    link: '/questionnairies',
    children: [
      { name: 'quality-of-life-questionnaire', label: 'Анкета качества жизни', link: '/quality-of-life-questionnaire' },
      { name: 'gastro-questionnaire', label: 'Анкета гастроинтестинальных расстройств', link: '/gastro-questionnaire' },
      { name: 'anxiety-questionnaire', label: 'Анкета тревожности', link: '/anxiety-questionnaire' },
      { name: 'screening-questionnaire', label: 'Анкета скрининга', link: '/screening-questionnaire' },
      { name: 'weakness-questionnaire', label: 'Анкета усталости', link: '/weakness-questionnaire' },
      { name: 'tesq', label: 'Анкета TESQ', link: '/tesq' },
    ],
  },

  {
    name: 'consultations',
    label: 'Консультации',
    children: [
      { name: 'consultants', label: 'Консультанты', link: '/consultants' },
    ],
  },

  {
    name: 'aboutUs',
    label: 'О нас',
    children: [
      { name: 'about-us', label: 'О нас', link: '/about-us' },
      { name: 'photo-gallery', label: 'Фотогаллерея', link: '/about-us/photo-gallery' },
    ],
  },

  {
    name: 'ourProjects',
    label: 'Наши проекты',
    children: [
      { name: 'our-projects', label: 'Наши проекты', link: '/our-projects' },
      { name: 'educational-projects', label: 'Образовательные проекты', link: '/our-projects/educational-projects' },
      { name: 'online-projects', label: 'Онлайн проекты', link: '/our-projects/online-projects' },
      { name: 'researches-projects', label: 'Исследовательские проекты', link: '/our-projects/researches-projects' },
      { name: 'social-projects', label: 'Социальные проекты', link: '/our-projects/social-projects' },
      { name: 'spefs-projects', label: 'Научно-практические мероприятия для специалистов', link: '/our-projects/spefs-projects' },
    ],
  },

  {
    name: 'calendarEvents',
    label: 'Календарь мероприятий',
    children: [
      { name: 'calendar-events', label: 'Календарь мероприятий', link: '/calendar-events' },
      {
        name: 'pastEvents',
        label: 'Прошедшие события',
        link: '/calendar-events/past-events',
        children: [
          { name: 'winter-school', label: '«Зимняя школа воспалительных заболеваний кишечника»', link: '/calendar-events/past-events/winter-school' },
          { name: 'peter-spring', label: '«Петербургская весна гепатологии»', link: '/calendar-events/past-events/peter-spring' },
          { name: 'emerald-city', label: '«Волшебники Изумрудного города»', link: '/calendar-events/past-events/emerald-city' },
        ],
      },
      {
        name: 'heldEvents',
        label: 'Проведенные события',
        link: '/calendar-events/held-events',
        children: [
          { name: 'gluten-focus', label: '«Дни медицинской науки. Фокус на глютен!»', link: '/calendar-events/held-events/gluten-focus' },
          { name: 'homa-event', label: '«О глютене для самых маленьких от хомячка Хомы!»', link: '/calendar-events/held-events/homa-event' },
          { name: 'about-gluten', label: '«Всё о глютене»', link: '/calendar-events/held-events/about-gluten' },
        ],
      },
      { name: 'onlineSchool', label: 'Онлайн школа для пациентов', link: '/calendar-events/online-school-patient' },
    ],
  },

  {
    name: 'illness',
    label: 'О Заболеваниях',
    children: [
      { name: 'about-illness', label: 'О Заболеваниях', link: '/about-illness' },
      { name: 'gluten-associated', label: 'Глютен-ассоциированные заболевания', link: '/about-illness/gluten-associated' },
      { name: 'celiac', label: 'Целиакия', link: '/about-illness/celiac' },
    ],
  },

  {
    name: 'diet',
    label: 'Безглютеновая диета',
    children: [
      { name: 'about-diet', label: 'Безглютеновая диета', link: '/about-diet' },
      { name: 'gluten-diet', label: 'О диете', link: '/about-diet/gluten-diet' },
      {
        name: 'glutenFreeOptions',
        label: 'Безглютеновые заведения',
        children: [
          { name: 'gluten-free-diet', label: 'Безглютеновая диета', link: '/gluten-free-diet' },
          { name: 'restaurants', label: 'Заведения с gluten-free меню', link: '/gluten-free-diet/restaurants' },
          { name: 'shops-without', label: 'Заведения c gluten-free меню', link: '/gluten-free-diet/shops-without' },
          { name: 'shops-with', label: 'Заведения с gluten-free меню', link: '/gluten-free-diet/shops-with' },
        ],
      },
    ],
  },

  {
    name: 'specialistInfo',
    label: 'Информация для специалистов',
    children: [
      { name: 'information-for-specialists', label: 'Информация для специалистов', link: '/information-for-specialists' },
      { name: 'clinical-recommendations', label: 'Клинические рекомендации', link: '/information-for-specialists/clinical-recommendations' },
      { name: 'events-for-specialists', label: 'Мероприятия для специалистов', link: '/events-for-specialists' },
    ],
  },

];

export default breadcrumbMap;
