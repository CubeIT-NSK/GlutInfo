export const menuItems = [
    {
        label: 'О нас',
        link: '/about-us',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Создатели', link: '/about-us#creators' },
            { label: 'СЗ ЦЛГАЗ', link: '/about-us#sz-clgaz' },
            { label: 'Документы', link: '/about-us#documents' },
            { label: 'Партнёры', link: '/about-us#partners' },
            { label: 'Сотрудничество', link: '/about-us#cooperation' },
            { label: 'Отзывы пациентов', link: '/about-us#feedback' },
            { label: 'Фотогалерея', link: '/about-us/photo-gallery' }
        ]
    },
    {
        label: 'Консультанты',
        link: '/consultants',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Гастроэнтерологи', link: '#' },
            { label: 'Диетологи', link: '#' },
            { label: 'Психологи', link: '#' }
        ]
    },
    { label: 'Услуги и цены', link: '#', hasDropdown: false, dropdownItems: [] },
    {
        label: 'О заболеваниях',
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Целиакия', link: '/about-illness/celiac' },
            { label: 'Глютен-ассоциированные заболевания', link: '/about-illness/gluten-associated' },
            { label: 'Нецелиакийная чувствительность к глютену', link: '#' },
            { label: 'Аллергия на глютен', link: '#' },
            { label: 'Герпетиформный дерматит', link: '#' },
            { label: 'Глютеновая атаксия', link: '#' },
            { label: 'Другие внекишечные проявления непереносимости глютена', link: '#' },
            { label: 'Библиотека пациента', link: '#' }
        ]
    },
    {
        label: 'Безглютеновая диета',
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: 'О диете', link: '/about-diet/gluten-diet' },
            { label: 'Библиотека пациента', link: '#' },
            { label: 'Аллергия на глютен', link: '#' },
            { label: 'Ассортимент безглютеновой продукции', link: '#' },
            { label: 'Рестораны с gluten-free меню', link: '/gluten-free-diet/restaurants' },
            { label: 'Магазины с gluten-free меню', link: '/gluten-free-diet/shops-with' },
            { label: 'Магазины полностью с gluten-free меню', link: '/gluten-free-diet/shops-without' },
            { label: 'Безглютеновая кухня', link: '#' },
            { label: 'Внеси свой вклад', link: '#' }
        ]
    },
    {
        label: 'Наши проекты',
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Социальные проекты', link: '/our-projects/social-projects' },
            { label: 'Онлайн-проекты', link: '/our-projects/online-projects' },
            { label: 'Школы для пациентов', link: '/our-projects/educational-projects' },
            { label: 'Исследования', link: '/our-projects/researches-projects' },
            { label: 'Мероприятия', link: '/our-projects/spefs-projects' }
        ]
    },
    {
        label: 'Информация для специалистов',
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Сотрудничество', link: '/#cooperation' },
            { label: 'Клинические рекомендации', link: '/information-for-specialists/clinical-recommendations' },
            { label: 'Личный кабинет консультанта', link: '/profile-consultant' },
            { label: 'Мероприятия', link: '/events-for-specialists' },
            { label: 'Библиотека врача', link: '#' }
        ]
    },
    { label: 'Контакты', link: '/#contacts', hasDropdown: false, dropdownItems: [] }
];
