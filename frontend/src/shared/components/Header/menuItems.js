export const menuItems = [
    {
        label: 'О нас',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Создатели', link: '/' },
            { label: 'СЗ ЦЛГАЗ', link: '/' },
            { label: 'Документы', link: '/' },
            { label: 'Партнёры', link: '/' },
            { label: 'Сотрудничество', link: '/' },
            { label: 'Отзывы пациентов', link: '/' },
            { label: 'Фотогалерея', link: '/' }
        ]
    },
    {
        label: 'Консультанты',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Гастроэнтерологи', link: '/' },
            { label: 'Диетологи', link: '/' },
            { label: 'Психологи', link: '/' }
        ]
    },
    { label: 'Услуги и цены', link: '/', hasDropdown: false, dropdownItems: [] },
    {
        label: 'О заболеваниях',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Целиакия', link: '/' },
            { label: 'Нецелиакийная чувствительность к глютену', link: '/' },
            { label: 'Аллергия на глютен', link: '/' },
            { label: 'Герпетиформный дерматит', link: '/' },
            { label: 'Глютеновая атаксия', link: '/' },
            { label: 'Другие внекишечные проявления непереносимости глютена', link: '/' },
            { label: 'Библиотека пациента', link: '/' }
        ]
    },
    {
        label: 'Безглютеновая диета',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'О диете', link: '/' },
            { label: 'Библиотека пациента', link: '/' },
            { label: 'Аллергия на глютен', link: '/' },
            { label: 'Ассортимент безглютеновой продукции', link: '/' },
            { label: 'Заведения с gluten-free меню', link: '/' },
            { label: 'Безглютеновая кухня', link: '/' },
            { label: 'Внеси свой вклад', link: '/' }
        ]
    },
    {
        label: 'Наши проекты',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Социальные проекты', link: '/' },
            { label: 'Онлайн-проекты', link: '/' },
            { label: 'Школы для пациентов', link: '/' },
            { label: 'Исследования', link: '/' },
            { label: 'Мероприятия', link: '/' }
        ]
    },
    {
        label: 'Информация для специалистов',
        link: '/',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Сотрудничество', link: '/' },
            { label: 'Личный кабинет консультанта', link: '/profile-consultant' },
            { label: 'Мероприятия', link: '/' },
            { label: 'Библиотека врача', link: '/' }
        ]
    },
    { label: 'Контакты', link: '/', hasDropdown: false, dropdownItems: [] }
];
