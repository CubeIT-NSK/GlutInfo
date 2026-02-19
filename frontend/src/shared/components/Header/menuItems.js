export const getMenuItems = (t) => [
    {
        label: t('menu.aboutUs'),
        link: '/about-us',
        hasDropdown: true,
        dropdownItems: [
            { label: t('menu.creators'), link: '/about-us#creators' },
            { label: t('menu.szClgaz'), link: '/about-us#sz-clgaz' },
            { label: t('menu.documents'), link: '/about-us#documents' },
            { label: t('menu.partners'), link: '/about-us#partners' },
            { label: t('menu.cooperation'), link: '/about-us#cooperation' },
            { label: t('menu.photoGallery'), link: '/about-us/photo-gallery' }
        ]
    },
    {
        label: t('menu.consultants'),
        link: '/consultants',
        hasDropdown: true,
        dropdownItems: [
            { label: t('menu.gastroenterologists'), link: '#' },
            { label: t('menu.nutritionists'), link: '#' },
            { label: t('menu.psychologists'), link: '#' }
        ]
    },
    { label: t('menu.services'), link: '#', hasDropdown: false, dropdownItems: [] },
    {
        label: t('menu.aboutIllness'),
        link: null,
        hasDropdown: true,
        disableLink: true,
        dropdownItems: [
            { label: t('menu.glutenAssociated'), link: '/about-illness/gluten-associated' },
            { label: t('menu.celiac'), link: '/about-illness/celiac' },
        ]
    },
    {
        label: t('menu.glutenFreeDiet'),
        link: '/about-diet/gluten-diet',
        hasDropdown: true,
        dropdownItems: [
            { label: t('menu.aboutDiet'), link: '/about-diet/gluten-diet' },
            { label: t('menu.restaurants'), link: '/gluten-free-diet/restaurants' },
            { label: t('menu.shopsWith'), link: '/gluten-free-diet/shops-with' },
            { label: t('menu.shopsWithout'), link: '/gluten-free-diet/shops-without' }
        ]
    },
    {
        label: t('menu.ourProjects'),
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: t('menu.socialProjects'), link: '/our-projects/social-projects' },
            { label: t('menu.onlineProjects'), link: '/our-projects/online-projects' },
            { label: t('menu.educationalProjects'), link: '/our-projects/educational-projects' },
            { label: t('menu.researches'), link: '/our-projects/researches-projects' },
            { label: t('menu.events'), link: '/our-projects/spefs-projects' }
        ]
    },
    {
        label: t('menu.specialistsInfo'),
        link: '#',
        hasDropdown: true,
        dropdownItems: [
            { label: t('menu.cooperation'), link: '/#cooperation' },
            { label: t('menu.clinicalRecommendations'), link: '/information-for-specialists/clinical-recommendations' },
            { label: t('menu.consultantAccount'), link: '/profile-consultant' },
            { label: t('menu.events'), link: '/events-for-specialists' },
            { label: t('menu.doctorLibrary'), link: '#' }
        ]
    },
    { label: t('menu.contacts'), link: '#contacts', hasDropdown: false, dropdownItems: [] }
];
